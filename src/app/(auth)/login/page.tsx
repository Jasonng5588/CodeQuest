"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Code2 } from "lucide-react";

const SNIPPETS = [
  "const x = 42;", "def hello():", "SELECT *", "git commit",
  "npm install", "console.log()", "return true;", "for i in range",
  "import React", "docker run", "function()", "git push origin",
  "<div>", "</div>", "useState()", "async/await",
  "{ }", "=>", "===", "&&", "||", "null",
];

function safeError(err: unknown): string {
  if (!err) return "An error occurred. Please try again.";
  if (typeof err === "string") return err || "An error occurred.";
  if (err instanceof Error) {
    const msg = err.message;
    if (!msg || msg === "{}") return "Sign in failed. Please check your credentials.";
    if (msg.toLowerCase().includes("invalid")) return "Invalid email or password.";
    if (msg.toLowerCase().includes("not confirmed")) return "Please confirm your email first. Check your inbox.";
    return msg;
  }
  return "Sign in failed. Please try again.";
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const errorParam = searchParams.get("error");

  // Demo credentials pre-filled for testing (not visible as a UI button)
  const DEMO_EMAIL = "demo@gmail.com";
  const DEMO_PASSWORD = "demo123";
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(errorParam ? "Authentication failed. Please try again." : "");
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ snippet: string; left: string; dur: string; delay: string; size: string }>>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        snippet: SNIPPETS[i % SNIPPETS.length],
        left: `${(Math.random() * 90 + 5).toFixed(2)}%`,
        dur: `${(12 + Math.random() * 8).toFixed(1)}s`,
        delay: `${(Math.random() * 10).toFixed(1)}s`,
        size: `${(10 + Math.random() * 6).toFixed(1)}px`,
      }))
    );
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(safeError(signInError));
        return;
      }
      router.push(redirectTo);
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
          redirectTo: `${window.location.origin}/api/auth/callback?next=${redirectTo}`,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (oauthError) {
        setError("Google sign-in is not set up yet. Enable it in Supabase → Auth → Providers.");
        setGoogleLoading(false);
      }
    } catch {
      setError("Google sign-in unavailable. Use email + password.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="auth-container">
      {mounted && particles.map((p, i) => (
        <div key={i} className="code-particle" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay, fontSize: p.size }}>
          {p.snippet}
        </div>
      ))}

      <div className="auth-card glass-card fade-in">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
          <h1 style={{ fontSize: "22px", fontWeight: "700", marginTop: "12px", marginBottom: "4px" }}>Welcome back, hero</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Continue your coding quest</p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
          className="btn-secondary"
          style={{ width: "100%", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: googleLoading ? 0.7 : 1 }}
        >
          {googleLoading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
              Connecting...
            </span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="divider" style={{ marginBottom: "16px" }}>or sign in with email</div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "12px 16px", marginBottom: "14px",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "10px", color: "#ef4444", fontSize: "14px",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "6px" }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input-field" placeholder="you@example.com" required
              autoComplete="email" autoFocus
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "6px" }}>
              Password
              <Link href="/forgot-password" style={{ float: "right", fontSize: "12px", color: "var(--accent-primary)", fontWeight: "500", textDecoration: "none" }}>
                Forgot?
              </Link>
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="input-field" placeholder="••••••••" required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading || googleLoading}
            style={{ width: "100%", marginTop: "4px", opacity: loading ? 0.7 : 1 }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                Signing in...
              </span>
            ) : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
          New here?{" "}
          <Link href="/register" style={{ color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>Create account</Link>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-muted)" }}>Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
