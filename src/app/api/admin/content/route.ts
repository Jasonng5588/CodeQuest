import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function isAdminAuthorized(request: NextRequest): boolean {
  return request.headers.get("x-admin-token") === "admin_session_valid";
}

// GET /api/admin/content — track list with lesson counts and completion stats
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Get tracks with unit/lesson counts
    const { data: tracks, error: tracksError } = await supabase
      .from("tracks")
      .select(`
        id, title, icon, color, category, difficulty_curve, is_published, estimated_hours, learner_count, created_at,
        units(id),
        lessons(id)
      `)
      .order("order_index", { ascending: true });

    if (tracksError) throw tracksError;

    // Get completion counts from user_progress
    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("track_id, status");

    if (progressError) throw progressError;

    // Build stats per track
    const progressByTrack: Record<string, { completed: number; total: number }> = {};
    progressData?.forEach((p) => {
      if (!progressByTrack[p.track_id]) progressByTrack[p.track_id] = { completed: 0, total: 0 };
      progressByTrack[p.track_id].total++;
      if (p.status === "completed") progressByTrack[p.track_id].completed++;
    });

    const result = (tracks ?? []).map((t: Record<string, unknown>) => {
      const prog = progressByTrack[t.id as string] ?? { completed: 0, total: 0 };
      const units = (t.units as unknown[]) ?? [];
      const lessons = (t.lessons as unknown[]) ?? [];
      return {
        id: t.id,
        title: t.title,
        icon: t.icon,
        color: t.color,
        category: t.category,
        difficulty_curve: t.difficulty_curve,
        is_published: t.is_published,
        estimated_hours: t.estimated_hours,
        learner_count: t.learner_count,
        created_at: t.created_at,
        unit_count: units.length,
        lesson_count: lessons.length,
        completions: prog.completed,
        total_attempts: prog.total,
        completion_rate: prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0,
      };
    });

    return NextResponse.json({ tracks: result });
  } catch (err) {
    console.error("Admin content GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PATCH /api/admin/content — toggle track published state
export async function PATCH(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { trackId, is_published } = await request.json();
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("tracks")
      .update({ is_published })
      .eq("id", trackId);

    if (error) throw error;
    return NextResponse.json({ success: true, message: `Track ${is_published ? "published" : "unpublished"}` });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
