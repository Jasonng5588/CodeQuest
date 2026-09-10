"use client";
import { useState, useEffect, useCallback } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  criteria: Record<string, unknown>;
}

interface AchievementWithStats extends Achievement {
  earned_count: number;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const loadAchievements = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/achievements", {
        headers: { "x-admin-token": "admin_session_valid" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAchievements(data.achievements ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAchievements(); }, [loadAchievements]);

  const totalEarned = achievements.reduce((sum, a) => sum + a.earned_count, 0);

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>⭐ Achievement Management</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            {achievements.length} achievements · {totalEarned} total earned
          </p>
        </div>
        <button onClick={loadAchievements} disabled={loading} style={{ padding: "8px 16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", color: "#a78bfa", fontSize: "13px", cursor: "pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px", height: "120px", animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      ) : achievements.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
          No achievements found in database
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
          {achievements.map((ach) => (
            <div key={ach.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ fontSize: "28px" }}>{ach.icon}</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{ach.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>{ach.description}</div>
                  </div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "700", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24", flexShrink: 0 }}>
                  +{ach.xp_reward} XP
                </span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Earned by {ach.earned_count} users</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontFamily: "monospace" }}>{ach.id}</span>
                </div>
                <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
                  <div style={{ height: "100%", width: ach.earned_count > 0 ? "100%" : "0%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "3px", opacity: Math.min(0.3 + ach.earned_count * 0.1, 1) }} />
                </div>
              </div>
              {Object.keys(ach.criteria).length > 0 && (
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", background: "rgba(0,0,0,0.2)", borderRadius: "6px", padding: "6px 8px" }}>
                  {JSON.stringify(ach.criteria)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
