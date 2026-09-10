import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UserHeroCard from "@/components/dashboard/UserHeroCard";
import TrackGrid from "@/components/dashboard/TrackGrid";
import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Zap, Trophy, Flame } from "lucide-react";

export const metadata: Metadata = { title: "Home — CodeQuest" };

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  let progressMap: Record<string, { percentage: number; completed_lessons: number; total_lessons: number; total_xp_earned: number; track_id: string }> = {};
  let lessonsCompleted = 0;
  let tracksStarted = 0;

  if (user) {
    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = profileData;

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
        if (total > 0) tracksStarted++;
        lessonsCompleted += completed;
      }
    }
  }

  const STATS = [
    { Icon: Code2,  stat: "40+",    label: "Languages",  color: "#818cf8" },
    { Icon: Zap,    stat: "500+",   label: "Challenges", color: "#06b6d4" },
    { Icon: Trophy, stat: "Weekly", label: "Leaderboard",color: "#f59e0b" },
    { Icon: Flame,  stat: "Streaks",label: "& Rewards",  color: "#ef4444" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Hero — logged out */}
      {!profile && (
        <section style={{ textAlign: "center", padding: "60px 0 48px", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "999px", marginBottom: "20px",
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
            fontSize: "13px", fontWeight: "600", color: "#a78bfa",
          }}>
            <Code2 size={14} strokeWidth={2.5} />
            40+ Programming Courses · Free to Start
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: "900",
            letterSpacing: "-0.04em", lineHeight: "1.05", marginBottom: "16px",
          }}>
            <span className="text-gradient">Code.</span>{" "}
            <span style={{ color: "var(--text-primary)" }}>Level up.</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>Conquer.</span>
          </h1>

          <p style={{
            fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px",
            margin: "0 auto 32px", lineHeight: "1.7",
          }}>
            Learn programming by <strong style={{ color: "var(--text-primary)" }}>writing real code</strong>.
            Get instant feedback. Unlock achievements. The most fun way to become a developer.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn-primary" style={{ padding: "14px 32px", fontSize: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} fill="white" />
              Start for Free
            </Link>
            <Link href="/tracks" className="btn-secondary" style={{ padding: "14px 32px", fontSize: "16px" }}>
              Browse Courses →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "48px", flexWrap: "wrap" }}>
            {STATS.map(({ Icon, stat, label, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 8px",
                }}>
                  <Icon size={20} color={color} strokeWidth={2} />
                </div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)" }}>{stat}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Logged in: user hero card */}
      {profile && (
        <>
          <div style={{ marginBottom: "8px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Welcome back, <span style={{ color: "var(--text-primary)" }}>{profile.display_name || profile.username}</span>
            </h1>
          </div>
          <UserHeroCard
            profile={profile}
            lessonsCompleted={lessonsCompleted}
            tracksStarted={tracksStarted}
          />
        </>
      )}

      {/* Section title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800" }}>
          {profile ? "Continue Learning" : "Explore Courses"}
        </h2>
        <Link href="/tracks" style={{ fontSize: "14px", color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>
          View all →
        </Link>
      </div>

      <TrackGrid trackProgress={progressMap} />
    </div>
  );
}
