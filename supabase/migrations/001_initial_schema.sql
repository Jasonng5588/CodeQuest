-- =========================================================
-- CodeQuest — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- =========================================================

-- User extended profiles (Supabase Auth handles email/password)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  level INTEGER DEFAULT 1 NOT NULL,
  total_xp INTEGER DEFAULT 0 NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_activity_date DATE,
  title TEXT DEFAULT 'Beginner',
  avatar_frame TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Tracks (course paths, e.g. "javascript", "python")
CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#6366f1',
  difficulty_curve TEXT NOT NULL CHECK (difficulty_curve IN ('beginner','intermediate','advanced')),
  execution_engine TEXT NOT NULL CHECK (execution_engine IN ('browser','webcontainer','judge0','db-sandbox','custom-vm','file-sim')),
  category TEXT CHECK (category IN ('fundamentals','web','backend','database','devops','security','cs-theory','data-science','ai')),
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  estimated_hours INTEGER DEFAULT 10,
  learner_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Units (chapters within a track)
CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '📖',
  order_index INTEGER DEFAULT 0,
  unlock_requirements TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Lessons (individual challenges/concepts within a unit)
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('concept','challenge','boss','project')),
  title TEXT NOT NULL,
  explanation_md TEXT DEFAULT '',
  starter_code TEXT DEFAULT '',
  reference_solution TEXT DEFAULT '',
  hints JSONB DEFAULT '[]',
  test_cases JSONB DEFAULT '[]',
  xp_reward INTEGER DEFAULT 10,
  order_index INTEGER DEFAULT 0,
  execution_engine TEXT,
  language_override TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- User progress per lesson
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  unit_id TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  stars INTEGER DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
  attempts INTEGER DEFAULT 0,
  best_time_seconds INTEGER,
  xp_earned INTEGER DEFAULT 0,
  last_code TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- XP event log (for leaderboard, charts, history)
CREATE TABLE IF NOT EXISTS xp_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('lesson_complete','boss_clear','streak_bonus','first_login','achievement')),
  lesson_id TEXT REFERENCES lessons(id),
  track_id TEXT REFERENCES tracks(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Daily activity / streak tracking
CREATE TABLE IF NOT EXISTS daily_activity (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  xp_earned INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, activity_date)
);

-- User achievements
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '🏆',
  xp_reward INTEGER DEFAULT 50,
  criteria JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES achievements(id),
  earned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, achievement_id)
);

-- =========================================================
-- Indexes for performance
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_track_id ON user_progress(track_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_user_id ON xp_events(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_created_at ON xp_events(created_at);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_lessons_track_id ON lessons(track_id);
CREATE INDEX IF NOT EXISTS idx_units_track_id ON units(track_id);

-- =========================================================
-- Weekly Leaderboard View
-- =========================================================
CREATE OR REPLACE VIEW weekly_leaderboard AS
  SELECT 
    up.id AS user_id,
    up.username,
    up.display_name,
    up.avatar_url,
    up.level,
    up.current_streak,
    COALESCE(SUM(xe.amount), 0) AS weekly_xp,
    RANK() OVER (ORDER BY COALESCE(SUM(xe.amount), 0) DESC) AS rank
  FROM user_profiles up
  LEFT JOIN xp_events xe ON xe.user_id = up.id 
    AND xe.created_at >= DATE_TRUNC('week', NOW() AT TIME ZONE 'UTC')
  GROUP BY up.id, up.username, up.display_name, up.avatar_url, up.level, up.current_streak
  ORDER BY weekly_xp DESC;

-- All-time leaderboard view
CREATE OR REPLACE VIEW all_time_leaderboard AS
  SELECT
    id AS user_id,
    username,
    display_name,
    avatar_url,
    level,
    total_xp,
    current_streak,
    RANK() OVER (ORDER BY total_xp DESC) AS rank
  FROM user_profiles
  ORDER BY total_xp DESC;

-- =========================================================
-- Row Level Security
-- =========================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- user_profiles: everyone can read, only owner can update
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
  ON user_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- user_progress: only owner
DROP POLICY IF EXISTS "Users can manage own progress" ON user_progress;
CREATE POLICY "Users can manage own progress" 
  ON user_progress FOR ALL USING (auth.uid() = user_id);

-- xp_events: owner reads own, leaderboard view handles public
DROP POLICY IF EXISTS "Users can view own xp events" ON xp_events;
CREATE POLICY "Users can view own xp events" 
  ON xp_events FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own xp events" ON xp_events;
CREATE POLICY "Users can insert own xp events" 
  ON xp_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- daily_activity: owner only
DROP POLICY IF EXISTS "Users can manage own daily activity" ON daily_activity;
CREATE POLICY "Users can manage own daily activity" 
  ON daily_activity FOR ALL USING (auth.uid() = user_id);

-- user_achievements: owner reads
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements" 
  ON user_achievements FOR SELECT USING (auth.uid() = user_id);

-- Tracks, units, lessons are public (read-only)
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tracks are publicly readable" ON tracks;
CREATE POLICY "Tracks are publicly readable" ON tracks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Units are publicly readable" ON units;
CREATE POLICY "Units are publicly readable" ON units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lessons are publicly readable" ON lessons;
CREATE POLICY "Lessons are publicly readable" ON lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Achievements are publicly readable" ON achievements;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are publicly readable" ON achievements FOR SELECT USING (true);

-- =========================================================
-- Trigger: Auto-create user profile on signup
-- =========================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      LOWER(REPLACE(split_part(NEW.email, '@', 1), '.', '_'))
    ),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://api.dicebear.com/7.x/pixel-art/svg?seed=' || NEW.id
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =========================================================
-- Trigger: Auto-update updated_at timestamp
-- =========================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================
-- Seed: Default achievements
-- =========================================================
INSERT INTO achievements (id, title, description, icon, xp_reward, criteria) VALUES
  ('first_lesson', 'First Step', 'Complete your very first lesson', '🎯', 50, '{"lessons_completed": 1}'),
  ('streak_7', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 100, '{"streak_days": 7}'),
  ('streak_30', 'Month Master', 'Maintain a 30-day streak', '⚡', 500, '{"streak_days": 30}'),
  ('xp_1000', 'Rising Star', 'Earn 1,000 total XP', '⭐', 100, '{"total_xp": 1000}'),
  ('xp_10000', 'Code Legend', 'Earn 10,000 total XP', '👑', 500, '{"total_xp": 10000}'),
  ('js_complete', 'JavaScript Jedi', 'Complete the JavaScript track', '⚔️', 300, '{"track_complete": "javascript"}'),
  ('python_complete', 'Python Wizard', 'Complete the Python track', '🧙', 300, '{"track_complete": "python"}'),
  ('boss_first', 'Boss Slayer', 'Defeat your first Boss challenge', '🐉', 150, '{"boss_cleared": 1}'),
  ('perfect_lesson', 'Perfectionist', 'Complete a lesson with 3 stars', '💎', 75, '{"three_star_lesson": 1}'),
  ('night_owl', 'Night Owl', 'Complete a lesson after midnight', '🦉', 50, '{"night_coding": true}')
ON CONFLICT (id) DO NOTHING;
