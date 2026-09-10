import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Simple admin token check — matches the session-based admin auth
function isAdminAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-token");
  return authHeader === process.env.ADMIN_SECRET_TOKEN || authHeader === "admin_session_valid";
}

// GET /api/admin/users — list all users with profile data
export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Fetch all users from user_profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("user_profiles")
      .select("id, username, display_name, avatar_url, level, total_xp, current_streak, longest_streak, created_at, title")
      .order("total_xp", { ascending: false });

    if (profilesError) throw profilesError;

    // Fetch auth users for email info
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    });

    if (authError) throw authError;

    // Merge profiles with auth data
    const emailMap = new Map(authData.users.map((u) => [u.id, u]));

    const users = (profiles ?? []).map((p) => {
      const authUser = emailMap.get(p.id);
      return {
        id: p.id,
        username: p.username,
        display_name: p.display_name || p.username,
        email: authUser?.email ?? "—",
        avatar_url: p.avatar_url,
        level: p.level,
        total_xp: p.total_xp,
        current_streak: p.current_streak,
        longest_streak: p.longest_streak,
        title: p.title,
        created_at: p.created_at,
        banned: authUser?.banned_until != null,
        email_confirmed: authUser?.email_confirmed_at != null,
        last_sign_in: authUser?.last_sign_in_at,
      };
    });

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Admin users GET error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// PATCH /api/admin/users — update a user's profile
export async function PATCH(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, action, data } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: "Missing userId or action" }, { status: 400 });
    }

    const supabase = createAdminClient();

    switch (action) {
      case "update_profile": {
        const { error } = await supabase
          .from("user_profiles")
          .update({
            display_name: data.display_name,
            total_xp: data.total_xp,
            level: data.level,
            current_streak: data.current_streak,
          })
          .eq("id", userId);
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Profile updated" });
      }

      case "ban": {
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          ban_duration: "876600h", // ~100 years
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "User banned" });
      }

      case "unban": {
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          ban_duration: "none",
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "User unbanned" });
      }

      case "reset_password": {
        const { data: authUser } = await supabase.auth.admin.getUserById(userId);
        if (!authUser.user?.email) throw new Error("User email not found");
        
        const { error } = await supabase.auth.resetPasswordForEmail(authUser.user.email, {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
        });
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Password reset email sent" });
      }

      case "delete": {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;
        return NextResponse.json({ success: true, message: "User deleted" });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("Admin users PATCH error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
