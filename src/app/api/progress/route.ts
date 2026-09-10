import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { trackId, unitId, lessonId, xpReward } = await request.json() as {
      trackId: string;
      unitId: string;
      lessonId: string;
      xpReward: number;
    };

    if (!trackId || !unitId || !lessonId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Authenticate user via Bearer token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authErr } = await anonClient.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const safeXP = Math.max(0, Math.min(Number(xpReward) || 0, 9999));

    // Use service role client for all DB writes (bypasses RLS)
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // 1. Check if already completed — avoid double-awarding XP
    const { data: existing } = await admin
      .from("user_progress")
      .select("status, xp_earned")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    const alreadyCompleted = existing?.status === "completed";

    // 2. Upsert user_progress
    const { error: progressErr } = await admin.from("user_progress").upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        track_id: trackId,
        unit_id: unitId,
        status: "completed",
        stars: 3,
        xp_earned: safeXP,
        attempts: (existing ? 1 : 0) + 1,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );
    if (progressErr) throw new Error("Progress upsert failed: " + progressErr.message);

    // 3. Only award XP if not already completed
    if (!alreadyCompleted && safeXP > 0) {
      // Insert xp_event
      await admin.from("xp_events").insert({
        user_id: userId,
        amount: safeXP,
        source: "lesson_complete",
        lesson_id: lessonId,
        track_id: trackId,
      });

      // Increment total_xp on user_profiles using a direct update with rpc
      // We fetch current XP then add to it (safe because we checked alreadyCompleted)
      const { data: profile } = await admin
        .from("user_profiles")
        .select("total_xp, level")
        .eq("id", userId)
        .single();

      const currentXP = profile?.total_xp ?? 0;
      const newXP = currentXP + safeXP;
      // Level formula: level = floor(sqrt(newXP / 100)) + 1 (max 99)
      const newLevel = Math.min(99, Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1));

      await admin.from("user_profiles").update({
        total_xp: newXP,
        level: newLevel,
        updated_at: new Date().toISOString(),
      }).eq("id", userId);

      // Update daily_activity
      const today = new Date().toISOString().slice(0, 10);
      const { data: dayRow } = await admin
        .from("daily_activity")
        .select("xp_earned, lessons_completed")
        .eq("user_id", userId)
        .eq("activity_date", today)
        .maybeSingle();

      if (dayRow) {
        await admin.from("daily_activity").update({
          xp_earned: (dayRow.xp_earned ?? 0) + safeXP,
          lessons_completed: (dayRow.lessons_completed ?? 0) + 1,
        }).eq("user_id", userId).eq("activity_date", today);
      } else {
        await admin.from("daily_activity").insert({
          user_id: userId,
          activity_date: today,
          xp_earned: safeXP,
          lessons_completed: 1,
        });
      }

      // Update streak
      await updateStreak(admin, userId);
    }

    return NextResponse.json({
      success: true,
      xpAwarded: alreadyCompleted ? 0 : safeXP,
      alreadyCompleted,
    });
  } catch (err) {
    console.error("Progress API error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

async function updateStreak(admin: any, userId: string) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    const { data: profile } = await admin
      .from("user_profiles")
      .select("current_streak, longest_streak, last_activity_date")
      .eq("id", userId)
      .single();

    if (!profile) return;

    const lastDate = profile.last_activity_date?.slice(0, 10);
    let newStreak = profile.current_streak ?? 0;

    if (lastDate === today) {
      // Already counted today
      return;
    } else if (lastDate === yesterday) {
      // Consecutive day
      newStreak = newStreak + 1;
    } else {
      // Streak broken or first day
      newStreak = 1;
    }

    const longestStreak = Math.max(profile.longest_streak ?? 0, newStreak);

    await admin.from("user_profiles").update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
    }).eq("id", userId);
  } catch (e) {
    console.error("Streak update error:", e);
  }
}

// GET: fetch user's progress for a track
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const trackId = url.searchParams.get("trackId");

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await anonClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let query = admin
      .from("user_progress")
      .select("lesson_id, track_id, status, stars, xp_earned, completed_at")
      .eq("user_id", user.id);

    if (trackId) query = query.eq("track_id", trackId);

    const { data } = await query;
    return NextResponse.json({ progress: data ?? [] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
