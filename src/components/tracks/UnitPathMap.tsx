"use client";
import Link from "next/link";
import { BookOpen, Swords, Zap, Wrench, Lock, CheckCircle, Star } from "lucide-react";

interface RawUnit {
  id: string;
  title: string;
  description: string;
  order_index: number;
  unlock_requirements: string[];
  lessons: RawLesson[];
}

interface RawLesson {
  id: string;
  type: string;
  title: string;
  xp_reward: number;
  order_index: number;
}

interface UnitPathMapProps {
  trackId: string;
  units: RawUnit[];
  progressMap: Record<string, { status: string; stars: number; xp_earned: number }>;
}

const LESSON_TYPE_ICONS = {
  concept:   BookOpen,
  challenge: Swords,
  boss:      Zap,
  project:   Wrench,
};

const LESSON_TYPE_COLORS = {
  concept:   "#6366f1",
  challenge: "#06b6d4",
  boss:      "#f59e0b",
  project:   "#10b981",
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3].map((s) => (
        <Star
          key={s}
          size={10}
          fill={stars >= s ? "#f59e0b" : "none"}
          color={stars >= s ? "#f59e0b" : "#444"}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

function LessonNode({
  lesson, progress, trackId, isAvailable,
}: {
  lesson: RawLesson;
  progress?: { status: string; stars: number; xp_earned: number };
  trackId: string;
  isAvailable: boolean;
}) {
  const status = progress?.status ?? "not_started";
  const stars = progress?.stars ?? 0;
  const isCompleted = status === "completed";
  const isBoss = lesson.type === "boss";

  const TypeIcon = LESSON_TYPE_ICONS[lesson.type as keyof typeof LESSON_TYPE_ICONS] ?? Swords;
  const typeColor = LESSON_TYPE_COLORS[lesson.type as keyof typeof LESSON_TYPE_COLORS] ?? "#6366f1";

  const nodeBg = isCompleted
    ? "rgba(22,163,74,0.15)"
    : !isAvailable
    ? "rgba(0,0,0,0.15)"
    : "var(--surface-2)";

  const nodeBorder = isCompleted
    ? "1px solid rgba(22,163,74,0.5)"
    : isBoss && isAvailable
    ? `1px solid ${typeColor}60`
    : isAvailable
    ? "1px solid var(--border)"
    : "1px solid rgba(255,255,255,0.05)";

  const href = isAvailable ? `/tracks/${trackId}/${lesson.id}` : "#";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
      {/* Node circle */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "48px", flexShrink: 0 }}>
        <Link
          href={href}
          style={{
            width: isBoss ? "52px" : "44px",
            height: isBoss ? "52px" : "44px",
            borderRadius: "50%",
            background: isBoss && isAvailable ? `${typeColor}20` : nodeBg,
            border: isBoss && isAvailable ? `2px solid ${typeColor}80` : nodeBorder,
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", flexShrink: 0,
            boxShadow: isCompleted
              ? "0 0 12px rgba(22,163,74,0.2)"
              : isBoss && isAvailable
              ? `0 0 16px ${typeColor}30`
              : "none",
            transition: "all 0.2s",
            cursor: isAvailable ? "pointer" : "not-allowed",
          }}
          onClick={(e) => { if (!isAvailable) e.preventDefault(); }}
        >
          {isCompleted ? (
            <CheckCircle size={20} color="#16a34a" fill="rgba(22,163,74,0.2)" />
          ) : !isAvailable ? (
            <Lock size={16} color="#555" />
          ) : (
            <TypeIcon size={isBoss ? 22 : 18} color={typeColor} />
          )}
        </Link>
      </div>

      {/* Lesson info card */}
      <Link
        href={href}
        style={{ textDecoration: "none", flex: 1 }}
        onClick={(e) => { if (!isAvailable) e.preventDefault(); }}
      >
        <div
          style={{
            padding: "12px 16px",
            background: nodeBg,
            border: nodeBorder,
            borderRadius: "12px",
            transition: "all 0.2s",
            opacity: isAvailable ? 1 : 0.45,
            cursor: isAvailable ? "pointer" : "not-allowed",
          }}
          className={isAvailable ? "lesson-card-hover" : ""}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                display: "flex", alignItems: "center", gap: "4px",
                fontSize: "11px", fontWeight: "600",
                color: isAvailable ? typeColor : "#555",
                padding: "2px 8px", borderRadius: "4px",
                background: isAvailable ? `${typeColor}15` : "rgba(255,255,255,0.05)",
              }}>
                <TypeIcon size={10} />
                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
              </span>
              {isBoss && isAvailable && (
                <span style={{ fontSize: "10px", color: typeColor, fontWeight: "700" }}>BOSS</span>
              )}
              {!isAvailable && (
                <span style={{ fontSize: "10px", color: "#555", fontWeight: "600" }}>🔒 Complete previous lesson</span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isCompleted && <StarRating stars={stars} />}
              {isCompleted && (
                <span style={{ fontSize: "10px", color: "#16a34a", fontWeight: "700" }}>✓ Done</span>
              )}
              <span style={{ fontSize: "11px", color: isCompleted ? "#16a34a" : "#f59e0b", fontWeight: "600" }}>
                +{lesson.xp_reward} XP
              </span>
            </div>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: isAvailable ? "var(--text-primary)" : "#555" }}>
            {lesson.title}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function UnitPathMap({ trackId, units, progressMap }: UnitPathMapProps) {
  const sorted = [...units].sort((a, b) => a.order_index - b.order_index);

  // Build availability map: lesson is available if ALL previous lessons in ALL previous units are completed
  // AND all previous lessons in the same unit are completed
  const availabilityMap: Record<string, boolean> = {};
  let allPreviousUnitsComplete = true;

  for (const unit of sorted) {
    const sortedLessons = [...unit.lessons].sort((a, b) => a.order_index - b.order_index);
    let prevLessonInUnitDone = true; // first lesson in unit is available if all prior units done

    for (let i = 0; i < sortedLessons.length; i++) {
      const lesson = sortedLessons[i];
      // A lesson is available if:
      // 1. All previous units are complete, AND
      // 2. All previous lessons in this unit are complete (sequential within unit)
      const isAvailable: boolean = Boolean(allPreviousUnitsComplete && prevLessonInUnitDone);
      availabilityMap[lesson.id] = isAvailable;

      const isCompleted = progressMap[lesson.id]?.status === "completed";
      prevLessonInUnitDone = isAvailable && isCompleted;
    }

    // For the next unit to be available, ALL lessons in this unit must be completed
    const allLessonsInUnitDone = sortedLessons.every(
      (l) => progressMap[l.id]?.status === "completed"
    );
    allPreviousUnitsComplete = allPreviousUnitsComplete && allLessonsInUnitDone;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {sorted.map((unit) => {
        const sortedLessons = [...unit.lessons].sort((a, b) => a.order_index - b.order_index);
        const completedInUnit = sortedLessons.filter((l) => progressMap[l.id]?.status === "completed").length;
        const unitComplete = completedInUnit === sortedLessons.length && sortedLessons.length > 0;

        return (
          <div key={unit.id}>
            {/* Unit header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: unitComplete
                  ? "rgba(22,163,74,0.15)"
                  : "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
                border: unitComplete
                  ? "1px solid rgba(22,163,74,0.4)"
                  : "1px solid rgba(99,102,241,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {unitComplete
                  ? <CheckCircle size={16} color="#16a34a" />
                  : <BookOpen size={16} color="#818cf8" />
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ fontWeight: "700", fontSize: "15px" }}>{unit.title}</div>
                  {unitComplete && (
                    <span style={{
                      fontSize: "10px", color: "#16a34a", fontWeight: "700",
                      background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)",
                      padding: "1px 8px", borderRadius: "999px",
                    }}>✓ Complete</span>
                  )}
                </div>
                {unit.description && (
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {unit.description}
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                  {completedInUnit}/{sortedLessons.length} lessons complete
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {sortedLessons.map((lesson, idx) => (
                <div key={lesson.id} style={{ position: "relative" }}>
                  {/* Connector line */}
                  {idx > 0 && (
                    <div style={{
                      position: "absolute",
                      left: "23px", top: "-12px",
                      width: "2px", height: "12px",
                      background: progressMap[sortedLessons[idx - 1].id]?.status === "completed"
                        ? "rgba(22,163,74,0.4)"
                        : "var(--border)",
                    }} />
                  )}
                  <div style={{ paddingBottom: "12px" }}>
                    <LessonNode
                      lesson={lesson}
                      progress={progressMap[lesson.id]}
                      trackId={trackId}
                      isAvailable={availabilityMap[lesson.id] ?? false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        .lesson-card-hover:hover {
          background: var(--surface-3) !important;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
