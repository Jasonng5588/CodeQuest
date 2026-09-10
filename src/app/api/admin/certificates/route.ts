import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-token");
  return authHeader === "admin_session_valid";
}

// GET /api/admin/certificates — list all certificates (completed tracks)
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Find all track completions: users who completed 100% of a track
    // A "certificate" is earned when all lessons in a track are marked completed
    const { data: completions, error } = await supabase
      .from("user_progress")
      .select("user_id, track_id, completed_at, xp_earned, updated_at")
      .eq("status", "completed")
      .order("completed_at", { ascending: false });

    if (error) throw error;

    // Group by user+track to find track completions
    // Count lessons completed per user per track
    const trackCompletionMap = new Map<string, { user_id: string; track_id: string; count: number; latest: string; totalXP: number }>();
    
    completions?.forEach((c) => {
      const key = `${c.user_id}::${c.track_id}`;
      const existing = trackCompletionMap.get(key);
      if (existing) {
        existing.count++;
        existing.totalXP += c.xp_earned ?? 0;
        if (c.completed_at > existing.latest) existing.latest = c.completed_at;
      } else {
        trackCompletionMap.set(key, {
          user_id: c.user_id,
          track_id: c.track_id,
          count: 1,
          latest: c.completed_at ?? c.updated_at,
          totalXP: c.xp_earned ?? 0,
        });
      }
    });

    // Fetch profiles for display names
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, username, display_name");

    const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

    // Build certificate list (entries with 3+ completed lessons = certificate eligible)
    const certificates = Array.from(trackCompletionMap.values())
      .filter((t) => t.count >= 3)
      .map((t, i) => {
        const profile = profileMap.get(t.user_id);
        const certId = `CQ-${t.latest?.slice(0, 10).replace(/-/g, "")}-${String(i + 1).padStart(3, "0")}`;
        return {
          id: certId,
          user_id: t.user_id,
          user: profile?.display_name || profile?.username || "Unknown",
          track: t.track_id.charAt(0).toUpperCase() + t.track_id.slice(1),
          issued: t.latest?.slice(0, 10) ?? "—",
          status: "valid",
          xp: t.totalXP,
          lessons_completed: t.count,
        };
      })
      .sort((a, b) => b.issued.localeCompare(a.issued));

    return NextResponse.json({ certificates });
  } catch (err) {
    console.error("Admin certificates GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/admin/certificates — manually grant a certificate to a user
export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, trackId } = await request.json();

    if (!userId || !trackId) {
      return NextResponse.json({ error: "Missing userId or trackId" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // To grant a certificate, the user needs at least 3 completed lessons in the track.
    // We insert 3 dummy progress records.
    const now = new Date().toISOString();
    const progressRecords = [
      { user_id: userId, track_id: trackId, lesson_id: `manual_grant_${trackId}_1`, status: "completed", xp_earned: 0, completed_at: now },
      { user_id: userId, track_id: trackId, lesson_id: `manual_grant_${trackId}_2`, status: "completed", xp_earned: 0, completed_at: now },
      { user_id: userId, track_id: trackId, lesson_id: `manual_grant_${trackId}_3`, status: "completed", xp_earned: 0, completed_at: now },
    ];

    const { error } = await supabase
      .from("user_progress")
      .upsert(progressRecords, { onConflict: "user_id, track_id, lesson_id" });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Certificate granted successfully" });
  } catch (err) {
    console.error("Admin certificates POST error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
