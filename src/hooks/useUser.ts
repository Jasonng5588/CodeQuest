"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useGameStore } from "@/store/gameStore";
import type { UserProfile } from "@/types";

export function useUser() {
  const { profile, setProfile } = useGameStore();
  const [loading, setLoading] = useState(!profile);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    const supabase = createClient();
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setProfile(null);
        setLoading(false);
        return null;
      }

      const { data, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(data as UserProfile);
      return data as UserProfile;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load user");
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const supabase = createClient();

    if (!profile) loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          setProfile(null);
          setLoading(false);
          return;
        }
        if (event === "SIGNED_IN") {
          await loadUser();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { profile, loading, error, refreshProfile: loadUser };
}
