import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-token");
  return authHeader === "admin_session_valid";
}

// GET /api/admin/stats — aggregate stats for dashboard
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Total users + XP stats
    const { data: profiles, error: profilesError } = await supabase
      .from("user_profiles")
      .select("id, total_xp, current_streak, level, title, created_at");

    if (profilesError) throw profilesError;

    // Auth users for banned count
    const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 1000 });

    const totalUsers = profiles?.length ?? 0;
    const totalXP = profiles?.reduce((sum, p) => sum + (p.total_xp ?? 0), 0) ?? 0;
    const activeStreaks = profiles?.filter((p) => (p.current_streak ?? 0) > 0).length ?? 0;
    const bannedCount = authData?.users?.filter((u) => u.banned_until != null).length ?? 0;

    // Recent signups (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const recentSignups = profiles?.filter((p) => p.created_at > weekAgo).length ?? 0;

    // Lesson completions (total)
    const { count: lessonsCompleted } = await supabase
      .from("user_progress")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed");

    // XP events this week
    const { data: weeklyXP } = await supabase
      .from("xp_events")
      .select("amount")
      .gte("created_at", weekAgo);

    const weeklyXPTotal = weeklyXP?.reduce((sum, e) => sum + (e.amount ?? 0), 0) ?? 0;

    // Daily signups for the last 14 days
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const recentProfiles = profiles?.filter((p) => p.created_at > twoWeeksAgo) ?? [];
    
    const dailySignups: Record<string, number> = {};
    for (let i = 0; i < 14; i++) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      dailySignups[d.toISOString().slice(0, 10)] = 0;
    }
    recentProfiles.forEach((p) => {
      const day = p.created_at.slice(0, 10);
      if (day in dailySignups) dailySignups[day]++;
    });

    // Top tracks (from user_progress)
    const { data: trackProgress } = await supabase
      .from("user_progress")
      .select("track_id")
      .eq("status", "completed");

    const trackCounts: Record<string, number> = {};
    trackProgress?.forEach((p) => {
      trackCounts[p.track_id] = (trackCounts[p.track_id] ?? 0) + 1;
    });

    const topTracks = Object.entries(trackCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([track, count]) => ({ track, count }));

    // Recent users (last 5 signups)
    const recentUsers = [...(profiles ?? [])]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        title: p.title,
        level: p.level,
        total_xp: p.total_xp,
        created_at: p.created_at,
      }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalXP,
        activeStreaks,
        bannedCount,
        recentSignups,
        lessonsCompleted: lessonsCompleted ?? 0,
        weeklyXPTotal,
      },
      dailySignups: Object.entries(dailySignups)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
      topTracks,
      recentUsers,
    });
  } catch (err) {
    console.error("Admin stats GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
