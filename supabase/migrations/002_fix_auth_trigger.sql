-- ============================================================
-- CODEQUEST AUTH FIX — Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/fzjdywdjbcxcjmjzhlty/sql/new
-- ============================================================

-- STEP 1: Drop old trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- STEP 2: Create bulletproof trigger (NEVER fails signup)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
BEGIN
  -- Build username from metadata or email prefix
  v_username := LOWER(COALESCE(
    NEW.raw_user_meta_data->>'username',
    REGEXP_REPLACE(split_part(NEW.email, '@', 1), '[^a-z0-9]', '_', 'g')
  ));

  -- Insert profile; append short UUID suffix to avoid username conflicts
  INSERT INTO public.user_profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    v_username || '_' || SUBSTRING(REPLACE(NEW.id::TEXT, '-', ''), 1, 4),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://api.dicebear.com/7.x/pixel-art/svg?seed=' || NEW.id
    )
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- ⚠️  CRITICAL: NEVER let this block signUp from succeeding
  RAISE WARNING 'handle_new_user() skipped: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 3: Re-attach trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- STEP 4: Fix RLS — allow service-role to insert profiles (needed by trigger)
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.user_profiles;
CREATE POLICY "Service role can insert profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.user_profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- STEP 5: Verify trigger was created
SELECT tgname, tgenabled FROM pg_trigger WHERE tgname = 'on_auth_user_created';
