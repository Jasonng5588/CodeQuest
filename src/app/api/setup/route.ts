import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, key);

  const results: string[] = [];

  // Fix auth trigger via Supabase's built-in SQL execution via pg functions
  // We create a helper function first, then call it
  const triggerSQL = `
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE plpgsql
    SECURITY DEFINER SET search_path = public
    AS $$
    BEGIN
      INSERT INTO public.user_profiles (id, username, display_name, email, avatar_url)
      VALUES (
        NEW.id,
        COALESCE(
          NEW.raw_user_meta_data->>'username',
          SPLIT_PART(NEW.email, '@', 1)
        ),
        COALESCE(
          NEW.raw_user_meta_data->>'display_name',
          NEW.raw_user_meta_data->>'full_name',
          SPLIT_PART(NEW.email, '@', 1)
        ),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
      )
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.user_profiles.avatar_url);
      RETURN NEW;
    EXCEPTION WHEN OTHERS THEN
      RETURN NEW;
    END;
    $$;

    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  `;

  // Try to create the leaderboard views if they don't exist
  const viewsSQL = `
    CREATE OR REPLACE VIEW public.all_time_leaderboard AS
    SELECT
      p.id AS user_id,
      p.username,
      p.display_name,
      p.avatar_url,
      p.total_xp,
      p.current_streak,
      COALESCE(
        (SELECT COUNT(*)::int FROM user_progress up WHERE up.user_id = p.id AND up.status = 'completed'),
        0
      ) AS lessons_completed,
      ROW_NUMBER() OVER (ORDER BY p.total_xp DESC) AS rank,
      1 AS level
    FROM user_profiles p
    WHERE p.total_xp > 0 OR p.id IN (SELECT DISTINCT user_id FROM user_progress)
    ORDER BY p.total_xp DESC;

    CREATE OR REPLACE VIEW public.weekly_leaderboard AS
    SELECT
      p.id AS user_id,
      p.username,
      p.display_name,
      p.avatar_url,
      p.current_streak,
      COALESCE(
        (SELECT SUM(up.xp_earned) FROM user_progress up
         WHERE up.user_id = p.id
         AND up.completed_at >= NOW() - INTERVAL '7 days'),
        0
      ) AS weekly_xp,
      0 AS total_xp,
      ROW_NUMBER() OVER (
        ORDER BY COALESCE(
          (SELECT SUM(up.xp_earned) FROM user_progress up
           WHERE up.user_id = p.id
           AND up.completed_at >= NOW() - INTERVAL '7 days'),
          0
        ) DESC
      ) AS rank,
      1 AS level
    FROM user_profiles p
    ORDER BY weekly_xp DESC;
  `;

  try {
    const { error: trigErr } = await supabase.rpc("exec_sql" as never, { sql: triggerSQL });
    if (trigErr) {
      results.push(`Trigger: SKIPPED (${trigErr.message}) - run manually in Supabase SQL editor`);
    } else {
      results.push("Trigger: OK");
    }
  } catch {
    results.push("Trigger: SKIPPED - run 002_fix_auth_trigger.sql manually");
  }

  try {
    const { error: viewErr } = await supabase.rpc("exec_sql" as never, { sql: viewsSQL });
    if (viewErr) {
      results.push(`Views: SKIPPED (${viewErr.message})`);
    } else {
      results.push("Views: OK");
    }
  } catch {
    results.push("Views: SKIPPED");
  }

  return NextResponse.json({ success: true, results }, { status: 200 });
}
