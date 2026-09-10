"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Code2, Mail, CheckCircle2, Eye, EyeOff, User, Lock, AtSign } from "lucide-react";

const SNIPPETS = [
  "const x = 42;", "def hello():", "SELECT *", "git commit",
  "npm install", "console.log()", "return true;", "for i in range",
  "import React", "docker run", "function()", "git push origin",
  "<div>", "</div>", "useState()", "async/await",
];

function safeError(err: unknown): string {
  if (!err) return "An error occurred. Please try again.";
  if (typeof err === "string") return err || "An error occurred.";
  if (err instanceof Error) {
    const msg = err.message;
    if (!msg || msg === "{}" || msg === "{}") {
      return "Registration failed. Please check your details and try again.";
    }
    return msg;
  }
  try {
    const obj = err as Record<string, unknown>;
    const msg = obj.message ?? obj.msg ?? obj.error_description;
    if (typeof msg === "string" && msg && msg !== "{}") return msg;
  } catch { /* ignore */ }
  return "Registration failed. Please try again.";
}

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ snippet: string; left: string; dur: string; delay: string; size: string }>>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        snippet: SNIPPETS[i % SNIPPETS.length],
        left: `${(Math.random() * 90 + 5).toFixed(2)}%`,
        dur: `${(12 + Math.random() * 8).toFixed(1)}s`,
        delay: `${(Math.random() * 10).toFixed(1)}s`,
        size: `${(10 + Math.random() * 6).toFixed(1)}px`,
      }))
    );
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimUser = username.trim();
    const trimEmail = email.trim();

    if (trimUser.length < 3) { setError("Username must be at least 3 characters."); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(trimUser)) { setError("Username: letters, numbers, underscores only."); return; }
    if (!trimEmail.includes("@")) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      // Step 1: Create user via admin API (auto-confirms email, no rate limit issues)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimEmail, password, username: trimUser }),
      });
      const data = await res.json() as { error?: string; success?: boolean };

      if (!res.ok || data.error) {
        setError(data.error ?? "Registration failed.");
        return;
      }

      // Step 2: Sign in immediately (email is auto-confirmed)
      const supabase = createClient();
      const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
        email: trimEmail,
        password,
      });

      if (signInErr || !signInData.session) {
        // Signed up but couldn't auto-login — show success and ask to log in
        setSuccess(true);
        return;
      }

      // Signed in! Redirect to dashboard
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(safeError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (oauthError) {
        setError("Google sign-in is not configured. Use email & password below.");
        setGoogleLoading(false);
      }
    } catch {
      setError("Google sign-in unavailable. Use email & password below.");
      setGoogleLoading(false);
    }
  }

  if (success) {
    return (
      <div className="auth-container">
        {mounted && particles.map((p, i) => (
          <div key={i} className="code-particle" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay, fontSize: p.size }}>
            {p.snippet}
          </div>
        ))}
        <div className="auth-card glass-card fade-in" style={{ textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "rgba(22,163,74,0.15)", border: "2px solid rgba(22,163,74,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Mail size={32} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>Account Created!</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
            Your account has been set up. Click below to log in and start coding!
          </p>
          <Link href="/login" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle2 size={16} /> Log in now
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", padding: "12px 14px 12px 40px", borderRadius: "10px",
    background: "var(--surface-2)", border: "1px solid var(--border)",
    color: "var(--text-primary)", fontSize: "15px", outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box" as const,
  };

  return (
    <div className="auth-container">
      {mounted && particles.map((p, i) => (
        <div key={i} className="code-particle" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay, fontSize: p.size }}>
          {p.snippet}
        </div>
      ))}

      <div className="auth-card glass-card fade-in">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}>
              <Code2 size={20} color="white" strokeWidth={2.5} />
            </div>
            <span style={{
              fontSize: "24px", fontWeight: "800",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>CodeQuest</span>
          </Link>
          <h1 style={{ marginTop: "20px", fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
            Start your journey
          </h1>
          <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--text-muted)" }}>
            Free forever · No credit card needed
          </p>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} disabled={googleLoading} style={{
          width: "100%", padding: "12px", borderRadius: "10px", marginBottom: "20px",
          background: "var(--surface-2)", border: "1px solid var(--border)",
          color: "var(--text-primary)", fontSize: "15px", fontWeight: "600",
          cursor: googleLoading ? "not-allowed" : "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.2s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>or with email</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171", fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Username */}
          <div style={{ position: "relative" }}>
            <AtSign size={16} color="var(--text-muted)" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={inputStyle}
              required
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div style={{ position: "relative" }}>
            <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password (8+ chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "40px" }}
              required
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
              position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0,
            }}>
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm */}
          <div style={{ position: "relative" }}>
            <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={inputStyle}
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{
            padding: "13px", fontSize: "15px", fontWeight: "700",
            opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer",
            marginTop: "4px",
          }}>
            {loading ? "Creating account..." : "Create Free Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
