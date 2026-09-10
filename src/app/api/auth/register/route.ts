import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json() as { email: string; password: string; username: string };

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use admin client to create user without email confirmation
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Create user with admin API (bypasses email confirmation)
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm email
      user_metadata: {
        username: username.toLowerCase(),
        display_name: username,
      },
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    // Ensure profile row exists
    if (newUser.user) {
      await adminClient.from("user_profiles").upsert({
        id: newUser.user.id,
        username: username.toLowerCase(),
        display_name: username,
        email,
        avatar_url: "",
      }, { onConflict: "id" });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
