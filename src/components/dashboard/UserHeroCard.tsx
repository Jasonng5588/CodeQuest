"use client";
import Link from "next/link";
import { UserProfile } from "@/types";
import { formatXp, getLevelFromXp, getXpForNextLevel } from "@/lib/utils";
import { LEVEL_THRESHOLDS, getLevelTitle } from "@/types";
import { Zap, BookOpen, Map, Flame, Swords } from "lucide-react";

interface UserHeroCardProps {
  profile: UserProfile;
  lessonsCompleted?: number;
  tracksStarted?: number;
}

const STAT_ICONS = [
  { Icon: Zap,      color: "#f59e0b", label: "Total XP" },
  { Icon: BookOpen, color: "#6366f1", label: "Lessons Done" },
  { Icon: Map,      color: "#06b6d4", label: "Tracks Started" },
  { Icon: Flame,    color: "#ef4444", label: "Day Streak" },
];

export default function UserHeroCard({ profile, lessonsCompleted = 0, tracksStarted = 0 }: UserHeroCardProps) {
  const xp = profile.total_xp;
  const level = getLevelFromXp(xp);
  const title = getLevelTitle(level);
  const nextLevelXp = getXpForNextLevel(level);
  const prevLevelXp = LEVEL_THRESHOLDS[Math.max(0, level - 1)] ?? 0;
  const progress = nextLevelXp > prevLevelXp
    ? Math.round(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100)
    : 100;
  const xpToNext = nextLevelXp - xp;

  const statValues = [formatXp(xp), lessonsCompleted.toString(), tracksStarted.toString(), profile.current_streak.toString()];

  return (
    <div className="glass-card" style={{
      padding: "28px 32px", marginBottom: "32px",
      background: "linear-gradient(145deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05))",
      border: "1px solid rgba(124,58,237,0.2)",
    }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={profile.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.id}`}
            alt={profile.username}
            style={{
              width: "80px", height: "80px", borderRadius: "20px", objectFit: "cover",
              border: "2px solid rgba(124,58,237,0.4)",
              boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            }}
          />
          <div className="level-badge" style={{
            position: "absolute", bottom: "-8px", right: "-8px",
            width: "28px", height: "28px", fontSize: "12px",
          }}>
            {level}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800" }}>
              {profile.display_name || profile.username}
            </h2>
            {profile.current_streak >= 7 && (
              <span className="streak-badge" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Flame size={13} />
                {profile.current_streak} day streak
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>@{profile.username}</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontSize: "12px", padding: "2px 10px", borderRadius: "999px",
              background: "rgba(124,58,237,0.15)", color: "#a78bfa",
              border: "1px solid rgba(124,58,237,0.3)", fontWeight: "600",
            }}>
              <Swords size={11} />
              {title}
            </span>
          </div>

          {/* XP Progress bar */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>
                Level {level} → {level + 1}
              </span>
              <span style={{ fontSize: "12px", color: "var(--accent-secondary)" }}>
                {formatXp(xpToNext)} XP to go
              </span>
            </div>
            <div className="xp-bar-track">
              <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{formatXp(prevLevelXp)}</span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{formatXp(nextLevelXp)}</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flexShrink: 0 }}>
          {STAT_ICONS.map(({ Icon, color, label }, i) => (
            <div key={label} style={{
              padding: "12px 16px", borderRadius: "12px",
              background: "var(--surface-2)", border: "1px solid var(--border)",
              textAlign: "center", minWidth: "90px",
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "4px",
              }}>
                <Icon size={18} color={color} strokeWidth={2} />
              </div>
              <div style={{ fontSize: "18px", fontWeight: "800", lineHeight: "1" }}>{statValues[i]}</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
