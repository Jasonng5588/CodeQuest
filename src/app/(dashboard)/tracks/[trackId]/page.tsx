import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import { getTrackWithFallback } from "@/lib/data/lesson-content";
import UnitPathMap from "@/components/tracks/UnitPathMap";
import Link from "next/link";
import type { Metadata } from "next";
import { TRACK_ICONS } from "@/components/icons";
import { Clock, BookOpen, Layers, Users, Play, CheckCircle } from "lucide-react";

interface Props {
  params: Promise<{ trackId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackId } = await params;
  const track = ALL_TRACKS.find((t) => t.id === trackId);
  return { title: track ? `${track.title} — CodeQuest` : "Track — CodeQuest" };
}

export default async function TrackDetailPage({ params }: Props) {
  const { trackId } = await params;
  const trackMeta = ALL_TRACKS.find((t) => t.id === trackId);
  if (!trackMeta) notFound();

  const supabase = await createClient();

  // Always use static data as source of truth for lesson IDs and ordering
  const staticTrack = getTrackWithFallback(trackId, trackMeta.title);

  const sortedUnits = staticTrack.units
    .sort((a, b) => a.order_index - b.order_index)
    .map((u) => ({
      id: u.id,
      title: u.title,
      description: u.description,
      icon: u.icon,
      order_index: u.order_index,
      unlock_requirements: [] as string[],
      lessons: [...u.lessons]
        .sort((a, b) => a.order_index - b.order_index)
        .map((l) => ({ id: l.id, type: l.type, title: l.title, xp_reward: l.xp_reward, order_index: l.order_index })),
    }));

  // Always fetch user progress (works for both DB and static data)
  const { data: { user } } = await supabase.auth.getUser();
  let progressMap: Record<string, { status: string; stars: number; xp_earned: number }> = {};

  if (user) {
    const allLessonIds = sortedUnits.flatMap((u) => u.lessons.map((l) => l.id));
    if (allLessonIds.length > 0) {
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("lesson_id, status, stars, xp_earned")
        .eq("user_id", user.id)
        .in("lesson_id", allLessonIds);

      if (progressData) {
        for (const p of progressData) {
          progressMap[p.lesson_id] = { status: p.status, stars: p.stars, xp_earned: p.xp_earned };
        }
      }
    }
  }

  const totalLessons = sortedUnits.reduce((sum, u) => sum + u.lessons.length, 0);
  const completedLessons = Object.values(progressMap).filter((p) => p.status === "completed").length;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const difficultyColors: Record<string, string> = {
    beginner: "#10b981",
    intermediate: "#f59e0b",
    advanced: "#ef4444",
  };
  const trackColor = trackMeta.color;
  const TrackIcon = TRACK_ICONS[trackId] ?? TRACK_ICONS["javascript"];

  // Find the first unlocked + incomplete lesson for Continue/Start button
  function findFirstAvailableLesson(): string | null {
    let prevCompleted = true; // First lesson of first unit is always available
    for (const unit of sortedUnits) {
      let unitPrevCompleted = true;
      for (const lesson of unit.lessons) {
        const p = progressMap[lesson.id];
        const isCompleted = p?.status === "completed";
        const isAvailable = unitPrevCompleted; // can attempt if previous is done
        if (isAvailable && !isCompleted) return lesson.id;
        unitPrevCompleted = isCompleted;
      }
      // To unlock next unit, last lesson of current unit must be complete
      const lastLesson = unit.lessons[unit.lessons.length - 1];
      prevCompleted = lastLesson ? (progressMap[lastLesson.id]?.status === "completed") : false;
      if (!prevCompleted) break;
    }
    return null;
  }

  const firstAvailableLessonId = findFirstAvailableLesson();
  // Continue goes to first available; if all done, go to first lesson
  const ctaLessonId = firstAvailableLessonId ?? sortedUnits[0]?.lessons[0]?.id;

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <Link href="/tracks" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Tracks</Link>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{trackMeta.title}</span>
      </div>

      {/* Track hero */}
      <div className="glass-card" style={{
        padding: "32px 36px", marginBottom: "40px",
        background: `linear-gradient(145deg, ${trackColor}10, ${trackColor}05)`,
        border: `1px solid ${trackColor}30`,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
          {/* Icon */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "18px", flexShrink: 0,
            background: `${trackColor}20`, border: `2px solid ${trackColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 24px ${trackColor}30`,
          }}>
            <span style={{ color: trackColor }}><TrackIcon size={36} strokeWidth={1.5} /></span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "900" }}>{trackMeta.title}</h1>
              <span style={{
                padding: "3px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700",
                background: `${difficultyColors[trackMeta.difficulty_curve]}20`,
                color: difficultyColors[trackMeta.difficulty_curve],
                border: `1px solid ${difficultyColors[trackMeta.difficulty_curve]}40`,
              }}>
                {trackMeta.difficulty_curve.charAt(0).toUpperCase() + trackMeta.difficulty_curve.slice(1)}
              </span>
            </div>

            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "16px", maxWidth: "600px" }}>
              {trackMeta.description}
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "var(--text-muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Clock size={13} /> ~{trackMeta.estimated_hours}h</span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><BookOpen size={13} /> {totalLessons} lessons</span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Layers size={13} /> {sortedUnits.length} units</span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Users size={13} /> {trackMeta.learner_count.toLocaleString()} learners</span>
            </div>
          </div>

          {/* Progress ring + CTA */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            {totalLessons > 0 && (
              <>
                <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 12px" }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--surface-3)" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={trackColor} strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPct / 100)}`}
                      style={{ transition: "stroke-dashoffset 0.5s ease", transform: "rotate(-90deg)", transformOrigin: "center" }}
                    />
                  </svg>
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: "800",
                  }}>{progressPct}%</div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {completedLessons}/{totalLessons} done
                </div>
              </>
            )}
            {ctaLessonId && (
              <div style={{ marginTop: "12px" }}>
                <Link
                  href={`/tracks/${trackId}/${ctaLessonId}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "8px 20px", background: trackColor, borderRadius: "8px",
                    color: "white", fontWeight: "700", fontSize: "14px", textDecoration: "none",
                    boxShadow: `0 4px 16px ${trackColor}50`,
                  }}
                >
                  {completedLessons === totalLessons && totalLessons > 0
                    ? <><CheckCircle size={14} /> Completed</>
                    : <><Play size={14} fill="white" /> {completedLessons === 0 ? "Start" : "Continue"}</>
                  }
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unit path map */}
      <UnitPathMap
        trackId={trackId}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        units={sortedUnits as any[]}
        progressMap={progressMap as Record<string, { status: string; stars: number; xp_earned: number }>}
      />
    </div>
  );
}
