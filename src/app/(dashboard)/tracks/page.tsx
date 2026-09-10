import { createClient } from "@/lib/supabase/server";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import TrackGrid from "@/components/dashboard/TrackGrid";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Tracks — CodeQuest" };

export default async function TracksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let progressMap: Record<string, { percentage: number; completed_lessons: number; total_lessons: number; total_xp_earned: number; track_id: string }> = {};

  if (user) {
    const { data: progressData } = await supabase
      .from("user_progress")
      .select("track_id, status, xp_earned")
      .eq("user_id", user.id);

    if (progressData) {
      const trackMap: Record<string, { completed: number; total: number; xp: number }> = {};
      for (const p of progressData) {
        if (!trackMap[p.track_id]) trackMap[p.track_id] = { completed: 0, total: 0, xp: 0 };
        trackMap[p.track_id].total++;
        trackMap[p.track_id].xp += p.xp_earned || 0;
        if (p.status === "completed") trackMap[p.track_id].completed++;
      }
      for (const [trackId, { completed, total, xp }] of Object.entries(trackMap)) {
        progressMap[trackId] = {
          track_id: trackId, completed_lessons: completed,
          total_lessons: total, total_xp_earned: xp,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      }
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>
          All Learning Tracks
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
          {ALL_TRACKS.length} courses covering every major language and technology. Pick your path.
        </p>
      </div>
      <TrackGrid trackProgress={progressMap} />
    </div>
  );
}
