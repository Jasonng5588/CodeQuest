"use client";
import { useState, useEffect, useCallback } from "react";

interface RankUser {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  level: number;
  total_xp: number;
  current_streak: number;
  title: string;
}

const RANK_TIERS = [
  { min: 0,     max: 999,   name: "Newcomer",    color: "#6b7280", icon: "🌱" },
  { min: 1000,  max: 2499,  name: "Apprentice",  color: "#22c55e", icon: "🔰" },
  { min: 2500,  max: 4999,  name: "Warrior",     color: "#06b6d4", icon: "🗡️" },
  { min: 5000,  max: 7499,  name: "Champion",    color: "#7c3aed", icon: "🏆" },
  { min: 7500,  max: 9999,  name: "Legend",      color: "#f59e0b", icon: "⚡" },
  { min: 10000, max: 999999,name: "Grandmaster", color: "#ef4444", icon: "👑" },
];

function getTier(xp: number) {
  return RANK_TIERS.find((t) => xp >= t.min && xp <= t.max) ?? RANK_TIERS[0];
}

export default function RanksPage() {
  const [users, setUsers] = useState<RankUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState<RankUser | null>(null);
  const [xpAdjust, setXpAdjust] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: { "x-admin-token": "admin_session_valid" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  async function saveRankEdit() {
    if (!editing) return;
    setSaving(true);
    const newXP = Math.max(0, editing.total_xp + xpAdjust);
    const newLevel = Math.max(1, Math.floor(Math.cbrt(newXP / 100)) + 1);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "x-admin-token": "admin_session_valid", "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editing.id,
          action: "update_profile",
          data: { display_name: editing.display_name, total_xp: newXP, level: newLevel, current_streak: editing.current_streak },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast("✅ " + json.message);
      await loadUsers();
    } catch (err) {
      showToast("❌ " + String(err));
    } finally {
      setSaving(false);
      setEditing(null);
    }
  }

  const sorted = [...users].sort((a, b) => b.total_xp - a.total_xp);

  // Tier distribution counts
  const tierCounts = RANK_TIERS.map((tier) => ({
    ...tier,
    count: users.filter((u) => u.total_xp >= tier.min && u.total_xp <= tier.max).length,
  }));

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      {editing && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px", width: "480px", maxWidth: "90vw" }}>
            <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "800", margin: "0 0 8px" }}>Edit Rank: {editing.display_name}</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: "0 0 24px" }}>
              Current: {editing.total_xp.toLocaleString()} XP · {getTier(editing.total_xp).icon} {getTier(editing.total_xp).name}
            </p>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>XP Adjustment (+/-)</label>
              <input
                type="number"
                value={xpAdjust}
                onChange={(e) => setXpAdjust(parseInt(e.target.value) || 0)}
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginTop: "4px" }}>
                New XP: {Math.max(0, editing.total_xp + xpAdjust).toLocaleString()} → {getTier(Math.max(0, editing.total_xp + xpAdjust)).icon} {getTier(Math.max(0, editing.total_xp + xpAdjust)).name}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button onClick={saveRankEdit} disabled={saving} style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", fontSize: "15px", cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditing(null)} style={{ padding: "12px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "rgba(255,255,255,0.7)", fontSize: "15px", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>🏆 Rank Management</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>Live leaderboard from Supabase · {users.length} users</p>
        </div>
        <button onClick={loadUsers} disabled={loading} style={{ padding: "8px 16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", color: "#a78bfa", fontSize: "13px", cursor: "pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Tier Distribution */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
        <h2 style={{ color: "#fff", fontSize: "15px", fontWeight: "700", margin: "0 0 16px" }}>Rank Distribution</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {tierCounts.map((tier) => (
            <div key={tier.name} style={{ padding: "8px 14px", background: `${tier.color}15`, border: `1px solid ${tier.color}40`, borderRadius: "10px" }}>
              <span style={{ fontSize: "16px" }}>{tier.icon}</span>
              <span style={{ color: tier.color, fontWeight: "700", fontSize: "13px", marginLeft: "6px" }}>{tier.name}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginLeft: "8px" }}>{tier.count} users</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: 0 }}>Live Leaderboard</h2>
        </div>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Loading from database...</div>
        ) : sorted.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No users yet</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                {["Rank", "User", "Tier", "XP", "Level", "Streak", "Actions"].map((col) => (
                  <th key={col} style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.4)", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((u, idx) => {
                const tier = getTier(u.total_xp);
                const rankIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: idx < 3 ? `${tier.color}08` : "transparent" }}>
                    <td style={{ padding: "14px 16px", color: idx < 3 ? tier.color : "rgba(255,255,255,0.4)", fontWeight: "700", fontSize: idx < 3 ? "18px" : "15px" }}>{rankIcon}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={u.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${u.id}`} alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
                        <div>
                          <div style={{ color: "#fff", fontWeight: "600" }}>{u.display_name || u.username}</div>
                          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>@{u.username}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", background: `${tier.color}22`, border: `1px solid ${tier.color}44`, color: tier.color }}>
                        {tier.icon} {tier.name}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#c4b5fd", fontWeight: "800" }}>{u.total_xp.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.75)" }}>Lv.{u.level}</td>
                    <td style={{ padding: "14px 16px", color: u.current_streak > 0 ? "#f97316" : "rgba(255,255,255,0.3)", fontWeight: u.current_streak > 0 ? "700" : "400" }}>
                      {u.current_streak > 0 ? `🔥 ${u.current_streak}d` : "—"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => { setEditing(u); setXpAdjust(0); setNewTitle(u.title ?? ""); }} style={{ padding: "5px 12px", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "6px", color: "#c4b5fd", fontSize: "12px", cursor: "pointer" }}>
                        Edit XP
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
