
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cq_admin") === "true") {
      router.replace("/loyalty/en/dashboard");
    }
  }, [router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (user === "admin123" && pass === "admin123") {
        sessionStorage.setItem("cq_admin", "true");
        router.push("/loyalty/en/dashboard");
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: "420px", padding: "48px 40px",
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px", backdropFilter: "blur(20px)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px", margin: "0 auto 16px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", boxShadow: "0 0 30px rgba(124,58,237,0.5)",
          }}>🛡️</div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 6px" }}>Admin Console</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 }}>CodeQuest Loyalty Platform</p>
        </div>

        {error && (
          <div style={{
            padding: "12px 16px", marginBottom: "20px",
            background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
            borderRadius: "10px", color: "#f87171", fontSize: "14px",
          }}>⚠️ {error}</div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Username
            </label>
            <input
              value={user} onChange={e => setUser(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px",
                color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box",
              }}
              autoFocus
            />
          </div>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Password
            </label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px",
                color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "14px", marginTop: "8px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            border: "none", borderRadius: "12px", color: "#fff",
            fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, transition: "all 0.2s",
            boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
          }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
          CodeQuest Admin v2.0 · Restricted Access
        </p>
      </div>
    </div>
  );
}
