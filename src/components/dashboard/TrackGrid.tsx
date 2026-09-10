"use client";
import { Track, TrackProgress } from "@/types";
import { ALL_TRACKS, CATEGORIES, groupTracksByCategory } from "@/lib/data/tracks-seed";
import TrackCard from "@/components/tracks/TrackCard";
import { CATEGORY_ICONS } from "@/components/icons";
import { LayoutGrid, Map } from "lucide-react";
import { useState } from "react";

interface TrackGridProps {
  trackProgress?: Record<string, TrackProgress>;
}

export default function TrackGrid({ trackProgress = {} }: TrackGridProps) {
  const [filter, setFilter] = useState<string>("all");
  const grouped = groupTracksByCategory(ALL_TRACKS);

  const categories = [
    { key: "all", label: "All Tracks" },
    ...Object.entries(CATEGORIES).map(([key, v]) => ({ key, label: v.label })),
  ];

  const filteredGroups = filter === "all"
    ? grouped
    : grouped.filter((g) => g.category === filter);

  const totalTracks = ALL_TRACKS.length;
  const publishedTracks = ALL_TRACKS.filter((t) => t.is_published).length;

  return (
    <section>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "28px" }}>
        {categories.map(({ key, label }) => {
          const isActive = filter === key;
          const CatIcon = key === "all" ? LayoutGrid : (CATEGORY_ICONS[key] ?? LayoutGrid);
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 14px", borderRadius: "999px", fontSize: "13px",
                fontWeight: isActive ? "600" : "500",
                background: isActive ? "rgba(124,58,237,0.2)" : "var(--surface-2)",
                border: isActive ? "1px solid rgba(124,58,237,0.4)" : "1px solid var(--border)",
                color: isActive ? "white" : "var(--text-secondary)",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >
              <CatIcon size={13} strokeWidth={2} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Groups */}
      {filteredGroups.map(({ category, label, color, tracks }) => (
        tracks.length > 0 && (
          <div key={category} style={{ marginBottom: "40px" }}>
            {/* Category header */}
            <div className="category-header" style={{ marginBottom: "16px" }}>
              {(() => {
                const CatIcon = CATEGORY_ICONS[category] ?? LayoutGrid;
                return (
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ color }}><CatIcon size={14} /></span>
                  </div>
                );
              })()}
              <h2 style={{
                fontSize: "15px", fontWeight: "700", color: "var(--text-secondary)",
                textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap",
              }}>{label}</h2>
              <div className="category-line" />
              <span style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {tracks.length} course{tracks.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "14px",
            }}>
              {tracks.map((track, i) => (
                <div key={track.id} className={`fade-in-delay-${Math.min(i % 3 + 1, 3)}`}>
                  <TrackCard
                    track={track}
                    progress={trackProgress[track.id]}
                    isLocked={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Stats footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        padding: "32px", color: "var(--text-muted)", fontSize: "14px",
      }}>
        <Map size={15} strokeWidth={2} />
        {totalTracks} total courses · {publishedTracks} available now · More unlocking soon
      </div>
    </section>
  );
}
