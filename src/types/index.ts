// =========================================================
// CodeQuest — Global TypeScript Types
// =========================================================

// ─── Execution Engines ────────────────────────────────────
export type ExecutionEngine =
  | "browser"       // HTML/CSS/JS in sandboxed iframe
  | "webcontainer"  // Node.js via WebContainer API
  | "judge0"        // Remote: Python, Java, C++, etc.
  | "db-sandbox"    // SQL: in-memory PostgreSQL/SQLite
  | "custom-vm"     // Assembly: custom JS-based CPU sim
  | "file-sim";     // Laravel/Docker/Git: file tree simulation

// ─── Track Categories ─────────────────────────────────────
export type TrackCategory =
  | "fundamentals"
  | "web"
  | "backend"
  | "database"
  | "devops"
  | "security"
  | "cs-theory"
  | "data-science"
  | "ai";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type LessonType = "concept" | "challenge" | "boss" | "project";
export type ProgressStatus = "not_started" | "in_progress" | "completed";

// ─── Track (full course path) ─────────────────────────────
export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;           // emoji or SVG identifier
  color: string;          // hex color for theming
  difficulty_curve: DifficultyLevel;
  execution_engine: ExecutionEngine;
  category: TrackCategory;
  order_index: number;
  is_published: boolean;
  estimated_hours: number;
  learner_count: number;
  units?: Unit[];
}

// ─── Unit (chapter) ───────────────────────────────────────
export interface Unit {
  id: string;
  track_id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  unlock_requirements: string[];
  lessons?: Lesson[];
}

// ─── Hint (graded hints system) ───────────────────────────
export interface Hint {
  level: 1 | 2 | 3;   // 1=direction, 2=pseudocode, 3=full answer (costs star)
  content: string;
}

// ─── Test Case ────────────────────────────────────────────
export interface TestCase {
  id: string;
  input: unknown;
  expected_output: unknown;
  description: string;
  hidden: boolean;       // hidden test cases prevent hard-coding
}

// ─── Lesson (challenge/concept) ───────────────────────────
export interface Lesson {
  id: string;
  unit_id: string;
  track_id: string;
  type: LessonType;
  title: string;
  explanation_md: string;
  starter_code: string;
  reference_solution: string;
  hints: Hint[];
  test_cases: TestCase[];
  xp_reward: number;
  order_index: number;
  execution_engine?: ExecutionEngine;
  language_override?: string;
}

// ─── User Profile ─────────────────────────────────────────
export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio?: string;
  level: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  title: string;
  avatar_frame: string;
  created_at: string;
}

// ─── User Progress ────────────────────────────────────────
export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  track_id: string;
  unit_id: string;
  status: ProgressStatus;
  stars: number;
  attempts: number;
  best_time_seconds?: number;
  xp_earned: number;
  last_code?: string;
  completed_at?: string;
}

// ─── Track Progress (aggregated) ──────────────────────────
export interface TrackProgress {
  track_id: string;
  total_lessons: number;
  completed_lessons: number;
  total_xp_earned: number;
  percentage: number;
}

// ─── Leaderboard Entry ────────────────────────────────────
export interface LeaderboardEntry {
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  level: number;
  current_streak: number;
  weekly_xp?: number;
  total_xp?: number;
  rank: number;
}

// ─── Achievement ──────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  criteria: Record<string, unknown>;
  earned_at?: string;
}

// ─── XP Event ─────────────────────────────────────────────
export type XpSource =
  | "lesson_complete"
  | "boss_clear"
  | "streak_bonus"
  | "first_login"
  | "achievement";

export interface XpEvent {
  id: string;
  user_id: string;
  amount: number;
  source: XpSource;
  lesson_id?: string;
  track_id?: string;
  created_at: string;
}

// ─── XP Level Thresholds ──────────────────────────────────
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000,
  20000, 26000, 33000, 41000, 50000
];

export const LEVEL_TITLES = [
  "Beginner", "Novice", "Apprentice", "Developer", "Engineer",
  "Senior Dev", "Tech Lead", "Architect", "Principal", "Distinguished",
  "Fellow", "Sage", "Wizard", "Grandmaster", "Legend", "Transcendent"
];

export function getLevelFromXp(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getXpForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}
