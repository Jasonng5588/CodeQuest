"use client";
import Link from "next/link";
import { Track, TrackProgress } from "@/types";
import { TRACK_ICONS } from "@/components/icons";
import { Lock, Clock, Users, CheckCircle, ChevronRight } from "lucide-react";

interface TrackCardProps {
  track: Omit<Track, "units">;
  progress?: TrackProgress;
  isLocked?: boolean;
}

const DIFFICULTY_CONFIG = {
  beginner:     { label: "Beginner",     color: "#10b981" },
  intermediate: { label: "Intermediate", color: "#f59e0b" },
  advanced:     { label: "Advanced",     color: "#ef4444" },
};

export default function TrackCard({ track, progress, isLocked }: TrackCardProps) {
  const pct = progress?.percentage ?? 0;
  const completed = progress?.completed_lessons ?? 0;
  const total = progress?.total_lessons ?? 0;
  const difficulty = DIFFICULTY_CONFIG[track.difficulty_curve] ?? DIFFICULTY_CONFIG.beginner;

  // Get the Lucide icon for this track
  const IconComponent = TRACK_ICONS[track.id] ?? TRACK_ICONS["javascript"];

  return (
    <Link
      href={isLocked ? "#" : `/tracks/${track.id}`}
      style={{ textDecoration: "none", display: "block" }}
      onClick={isLocked ? (e) => e.preventDefault() : undefined}
    >
      <div
        className={`glass-card track-card ${isLocked ? "locked" : ""}`}
        style={{ padding: "20px", height: "100%", boxSizing: "border-box" }}
        title={isLocked ? "Complete prerequisites to unlock" : track.title}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Icon */}
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
              background: isLocked ? "var(--surface-2)" : `${track.color}18`,
              border: `1px solid ${isLocked ? "var(--border)" : `${track.color}40`}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isLocked ? "none" : `0 0 16px ${track.color}25`,
              transition: "box-shadow 0.3s",
            }}>
              {isLocked
                ? <span style={{ color: "var(--text-muted)" }}><Lock size={20} /></span>
                : <span style={{ color: track.color }}><IconComponent size={22} strokeWidth={1.75} /></span>
              }
            </div>

            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "4px", color: "var(--text-primary)" }}>
                {track.title}
              </h3>
              <span style={{
                display: "inline-block", padding: "2px 8px", borderRadius: "999px",
                fontSize: "10px", fontWeight: "700",
                background: `${difficulty.color}15`,
                color: difficulty.color,
                border: `1px solid ${difficulty.color}35`,
              }}>
                {difficulty.label}
              </span>
            </div>
          </div>

          {/* Completion badge */}
          {pct === 100 && (
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "999px", padding: "3px 10px", fontSize: "11px",
              color: "#10b981", fontWeight: "700", flexShrink: 0,
            }}>
              <CheckCircle size={12} />
              Done
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.55",
          marginBottom: "14px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {track.description}
        </p>

        {/* Progress bar */}
        {total > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{completed}/{total} lessons</span>
              <span style={{ fontSize: "11px", color: track.color, fontWeight: "700" }}>{pct}%</span>
            </div>
            <div className="xp-bar-track" style={{ height: "4px", borderRadius: "2px" }}>
              <div
                className="xp-bar-fill"
                style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${track.color}, ${track.color}90)` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "14px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-muted)" }}>
              <Clock size={12} strokeWidth={2} />
              ~{track.estimated_hours}h
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-muted)" }}>
              <Users size={12} strokeWidth={2} />
              {track.learner_count.toLocaleString()}
            </span>
          </div>

          {!isLocked && !track.is_published && (
            <span style={{
              fontSize: "11px", padding: "2px 8px", borderRadius: "4px",
              background: "rgba(245,158,11,0.1)", color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.2)",
            }}>Coming Soon</span>
          )}
          {!isLocked && track.is_published && pct === 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "var(--accent-primary)", fontWeight: "700" }}>
              Start <ChevronRight size={14} />
            </span>
          )}
          {!isLocked && track.is_published && pct > 0 && pct < 100 && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "var(--accent-secondary)", fontWeight: "700" }}>
              Continue <ChevronRight size={14} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
