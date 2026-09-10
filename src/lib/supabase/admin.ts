import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client using service role key.
 * Bypasses Row Level Security — only use in server-side API routes.
 * Never expose this client or the service role key to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase URL or Service Role Key in environment variables");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
