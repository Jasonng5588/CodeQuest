import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-token");
  return authHeader === "admin_session_valid";
}

// GET /api/admin/achievements — list all achievements with earned counts
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Get all achievements
    const { data: achievementsData, error: achError } = await supabase
      .from("achievements")
      .select("id, title, description, icon, xp_reward, criteria")
      .order("xp_reward", { ascending: false });

    if (achError) throw achError;

    // Get earned counts per achievement
    const { data: earnedData, error: earnedError } = await supabase
      .from("user_achievements")
      .select("achievement_id");

    if (earnedError) throw earnedError;

    // Build count map
    const earnedCounts: Record<string, number> = {};
    earnedData?.forEach((row) => {
      earnedCounts[row.achievement_id] = (earnedCounts[row.achievement_id] ?? 0) + 1;
    });

    const achievements = (achievementsData ?? []).map((ach) => ({
      ...ach,
      earned_count: earnedCounts[ach.id] ?? 0,
    }));

    return NextResponse.json({ achievements });
  } catch (err) {
    console.error("Admin achievements GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
