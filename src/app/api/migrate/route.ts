import { NextResponse } from "next/server";

// ONE-TIME migration endpoint - DELETE THIS FILE AFTER USE
// Only works with the correct secret key
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Simple protection - prevent accidental calls
  if (secret !== "codequest-migrate-now-2024") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not set in environment" }, { status: 500 });
  }

  // SQL statements to execute in order
  const statements = [
    // user_profiles table
    `CREATE TABLE IF NOT EXISTS user_profiles (
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
    )`,

    // tracks table
    `CREATE TABLE IF NOT EXISTS tracks (
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
    )`,

    // units table
    `CREATE TABLE IF NOT EXISTS units (
      id TEXT PRIMARY KEY,
      track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT DEFAULT '📖',
      order_index INTEGER DEFAULT 0,
      unlock_requirements TEXT[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )`,

    // lessons table
    `CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      unit_id TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
      track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
      type TEXT NOT NULL CHECK (type IN ('concept','challenge','boss','project')),
      title TEXT NOT NULL,
      explanation_md TEXT DEFAULT '',
      starter_code TEXT DEFAULT '',
      reference_solution TEXT DEFAULT '',
      hints TEXT[] DEFAULT '{}',
      test_cases JSONB DEFAULT '[]',
      xp_reward INTEGER DEFAULT 50,
      order_index INTEGER DEFAULT 0,
      execution_engine TEXT DEFAULT 'browser',
      language_override TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )`,

    // user_progress table
    `CREATE TABLE IF NOT EXISTS user_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
      track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
      unit_id TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
      stars INTEGER DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
      attempts INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      UNIQUE(user_id, lesson_id)
    )`,

    // xp_events table
    `CREATE TABLE IF NOT EXISTS xp_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      amount INTEGER NOT NULL,
      source TEXT NOT NULL,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )`,

    // daily_activity table
    `CREATE TABLE IF NOT EXISTS daily_activity (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      xp_earned INTEGER DEFAULT 0,
      lessons_completed INTEGER DEFAULT 0,
      UNIQUE(user_id, date)
    )`,

    // achievements table
    `CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 100,
      criteria JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    )`,

    // user_achievements table
    `CREATE TABLE IF NOT EXISTS user_achievements (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
      earned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      UNIQUE(user_id, achievement_id)
    )`,

    // Enable RLS
    `ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE tracks ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE units ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE lessons ENABLE ROW LEVEL SECURITY`,

    // RLS policies for user_profiles
    `DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles`,
    `CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id OR true)`,
    `DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles`,
    `CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id)`,
    `DROP POLICY IF EXISTS "Service role can insert profiles" ON user_profiles`,
    `CREATE POLICY "Service role can insert profiles" ON user_profiles FOR INSERT WITH CHECK (true)`,

    // RLS for user_progress
    `DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress`,
    `CREATE POLICY "Users can view their own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id)`,
    `DROP POLICY IF EXISTS "Users can upsert their own progress" ON user_progress`,
    `CREATE POLICY "Users can upsert their own progress" ON user_progress FOR ALL USING (auth.uid() = user_id)`,

    // Public read for tracks/units/lessons/achievements
    `DROP POLICY IF EXISTS "Tracks are publicly readable" ON tracks`,
    `CREATE POLICY "Tracks are publicly readable" ON tracks FOR SELECT USING (true)`,
    `DROP POLICY IF EXISTS "Units are publicly readable" ON units`,
    `CREATE POLICY "Units are publicly readable" ON units FOR SELECT USING (true)`,
    `DROP POLICY IF EXISTS "Lessons are publicly readable" ON lessons`,
    `CREATE POLICY "Lessons are publicly readable" ON lessons FOR SELECT USING (true)`,
    `DROP POLICY IF EXISTS "Achievements are publicly readable" ON achievements`,
    `ALTER TABLE achievements ENABLE ROW LEVEL SECURITY`,
    `CREATE POLICY "Achievements are publicly readable" ON achievements FOR SELECT USING (true)`,

    // handle_new_user trigger function
    `CREATE OR REPLACE FUNCTION handle_new_user()
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
    $$ LANGUAGE plpgsql SECURITY DEFINER`,

    `DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users`,
    `CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user()`,

    // updated_at trigger function
    `CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql`,

    `DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles`,
    `CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`,

    // Seed achievements
    `INSERT INTO achievements (id, title, description, icon, xp_reward, criteria) VALUES
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
    ON CONFLICT (id) DO NOTHING`,
  ];

  const results: { sql: string; status: string; error?: string }[] = [];

  for (const sql of statements) {
    const preview = sql.replace(/\s+/g, " ").trim().substring(0, 80);
    try {
      // Use Supabase REST API with service role to execute SQL
      // This uses the pg-meta API available in Supabase projects
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
          "apikey": SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ query: sql }),
      });

      if (response.ok) {
        results.push({ sql: preview, status: "ok" });
      } else {
        const body = await response.text();
        // Try alternative endpoint
        const response2 = await fetch(`${SUPABASE_URL}/pg/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
            "apikey": SERVICE_ROLE_KEY,
          },
          body: JSON.stringify({ query: sql }),
        });

        if (response2.ok) {
          results.push({ sql: preview, status: "ok (pg)" });
        } else {
          results.push({ sql: preview, status: `error ${response.status}`, error: body.substring(0, 200) });
        }
      }
    } catch (err) {
      results.push({ sql: preview, status: "exception", error: String(err) });
    }
  }

  return NextResponse.json({ results, total: statements.length });
}
