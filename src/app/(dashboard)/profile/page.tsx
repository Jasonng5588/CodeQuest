
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UserHeroCard from "@/components/dashboard/UserHeroCard";
import type { Metadata } from "next";
import { formatRelativeTime } from "@/lib/utils";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import { getTrackWithFallback, countTrackLessons } from "@/lib/data/lesson-content";
import { Trophy, Zap, Lock, Star, BookOpen, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Profile — CodeQuest" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single();
  if (!profile) redirect("/login");

  const { data: progressData } = await supabase
    .from("user_progress")
    .select("track_id, lesson_id, status, xp_earned, stars, completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(200);

  // Also fetch recent xp_events for richer activity feed
  const { data: xpEvents } = await supabase
    .from("xp_events")
    .select("amount, source, lesson_id, track_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: achievements } = await supabase
    .from("user_achievements")
    .select("achievement_id, earned_at, achievements(title, description, icon, xp_reward)")
    .eq("user_id", user.id);

  const progressList = progressData ?? [];
  const lessonsCompleted = progressList.filter((p: { status: string }) => p.status === "completed").length;

  // Build per-track progress
  const trackProgress: Record<string, { completed: number; total: number }> = {};
  for (const p of progressList) {
    if (p.status === "completed") {
      const tid = p.track_id as string;
      if (!trackProgress[tid]) {
        const track = ALL_TRACKS.find(t => t.id === tid);
        const staticTrack = track ? getTrackWithFallback(tid, track.title) : null;
        const total = staticTrack ? countTrackLessons(staticTrack) : 16;
        trackProgress[tid] = { completed: 0, total };
      }
      trackProgress[tid].completed++;
    }
  }

  // Build lesson title lookup from static data
  const lessonTitleMap: Record<string, string> = {};
  for (const p of progressList) {
    if (p.lesson_id && p.track_id) {
      const track = ALL_TRACKS.find(t => t.id === p.track_id);
      if (track) {
        const staticTrack = getTrackWithFallback(p.track_id, track.title);
        for (const unit of staticTrack.units) {
          for (const lesson of unit.lessons) {
            if (lesson.id === p.lesson_id) {
              lessonTitleMap[p.lesson_id] = lesson.title;
            }
          }
        }
      }
    }
  }

  void xpEvents; // available for future use in activity feed
  const tracksStarted = Object.keys(trackProgress).length;
  const tracksCompleted = Object.entries(trackProgress).filter(([, v]) => v.completed >= v.total);
  const recentActivity = progressList
    .filter((p: { status: string; completed_at?: string }) => p.status === "completed" && p.completed_at)
    .slice(0, 10);

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "24px" }}>My Profile</h1>
      <UserHeroCard profile={profile} lessonsCompleted={lessonsCompleted} tracksStarted={tracksStarted} />

      {/* Language Progress */}
      {Object.entries(trackProgress).length > 0 && (
        <div className="glass-card" style={{ padding: "24px", marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <BookOpen size={16} color="#06b6d4" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Language Progress</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {Object.entries(trackProgress).map(([trackId, prog]) => {
              const track = ALL_TRACKS.find(t => t.id === trackId);
              if (!track) return null;
              const pct = Math.min(100, Math.round((prog.completed / prog.total) * 100));
              const isComplete = pct >= 100;
              return (
                <div key={trackId} style={{
                  padding: "16px", background: "var(--surface-2)", borderRadius: "12px",
                  border: isComplete ? "1px solid rgba(34,197,94,0.4)" : "1px solid var(--border)",
                  position: "relative", overflow: "hidden",
                }}>
                  {isComplete && (
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                      <span style={{ fontSize: "18px" }}>🏆</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${track.color}22`, border: `1px solid ${track.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                      {track.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>{track.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{prog.completed}/{prog.total} lessons</div>
                    </div>
                  </div>
                  <div style={{ height: "6px", background: "var(--surface-3, rgba(255,255,255,0.08))", borderRadius: "3px", marginBottom: "8px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: isComplete ? "linear-gradient(90deg, #22c55e, #4ade80)" : `linear-gradient(90deg, ${track.color}, ${track.color}cc)`, borderRadius: "3px", transition: "width 0.5s" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: isComplete ? "#4ade80" : "var(--text-muted)", fontWeight: isComplete ? "700" : "400" }}>
                      {isComplete ? "✅ Complete!" : `${pct}%`}
                    </span>
                    {isComplete && (
                      <Link href={`/certificate/${trackId}`} style={{
                        fontSize: "11px", padding: "3px 10px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)",
                        borderRadius: "12px", color: "#4ade80", textDecoration: "none", fontWeight: "600",
                      }}>
                        🎓 View Certificate
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Languages Certificates */}
      {tracksCompleted.length > 0 && (
        <div className="glass-card" style={{ padding: "24px", marginTop: "24px", border: "1px solid rgba(245,158,11,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Award size={16} color="#f59e0b" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Your Certificates</h2>
            <span style={{ padding: "2px 8px", borderRadius: "12px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", fontSize: "12px", fontWeight: "700" }}>
              {tracksCompleted.length}
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {tracksCompleted.map(([trackId]) => {
              const track = ALL_TRACKS.find(t => t.id === trackId);
              if (!track) return null;
              return (
                <Link key={trackId} href={`/certificate/${trackId}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "12px 18px", background: `${track.color}15`, border: `1px solid ${track.color}40`,
                    borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px",
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <span style={{ fontSize: "18px" }}>{track.icon}</span>
                    <span style={{ color: track.color, fontWeight: "700", fontSize: "13px" }}>{track.title}</span>
                    <span style={{ fontSize: "12px" }}>🎓</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "24px" }}>
        {/* Achievements */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Trophy size={16} color="#f59e0b" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Achievements</h2>
          </div>
          {achievements && achievements.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {achievements.map((a: { achievement_id: string; earned_at: string; achievements: { title: string; description: string; icon: string; xp_reward: number }[] | null }) => {
                const ach = Array.isArray(a.achievements) ? a.achievements[0] : a.achievements;
                return (
                  <div key={a.achievement_id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface-2)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Star size={18} color="#f59e0b" fill="#f59e0b" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "14px" }}>{ach?.title}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{ach?.description}</div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "700", flexShrink: 0 }}>+{ach?.xp_reward} XP</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-muted)" }}>
              <Lock size={22} color="var(--text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>No achievements yet</div>
              <div style={{ fontSize: "13px" }}>Complete lessons to unlock them!</div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Zap size={16} color="#6366f1" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>Recent Activity</h2>
          </div>
          {recentActivity.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(recentActivity as Array<{ track_id: string; lesson_id?: string; stars: number; xp_earned: number; completed_at?: string }>).map((p, i) => {
                const track = ALL_TRACKS.find(t => t.id === p.track_id);
                const lessonTitle = p.lesson_id ? lessonTitleMap[p.lesson_id] : undefined;
                return (
                  <Link key={i} href={`/tracks/${p.track_id}`} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--surface-2)", borderRadius: "10px", border: "1px solid var(--border)", fontSize: "13px", transition: "all 0.15s", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: track ? `${track.color}22` : "rgba(22,163,74,0.15)", border: `1px solid ${track ? track.color + "44" : "rgba(22,163,74,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "15px" }}>
                          {track?.icon ?? "✅"}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600", color: "var(--text-primary)", fontSize: "13px" }}>{lessonTitle ?? (track?.title ?? p.track_id)}</div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px" }}>
                            {track?.title} · lesson completed
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <span style={{ color: "#f59e0b", fontWeight: "700", fontSize: "12px" }}>+{p.xp_earned} XP</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>{p.completed_at ? formatRelativeTime(p.completed_at) : ""}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-muted)" }}>
              <BookOpen size={22} color="var(--text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>No activity yet</div>
              <div style={{ fontSize: "13px" }}>Start a lesson to see your progress!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
