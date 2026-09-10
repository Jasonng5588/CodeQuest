"use client";
import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/admin/Badge";

interface AdminUser {
  id: string;
  username: string;
  display_name: string;
  email: string;
  avatar_url: string;
  level: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  title: string;
  created_at: string;
  banned: boolean;
  email_confirmed: boolean;
  last_sign_in: string | null;
}

type EditForm = { display_name: string; total_xp: number; level: number; current_streak: number };

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ display_name: "", total_xp: 0, level: 1, current_streak: 0 });
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
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

  async function performAction(userId: string, action: string, data?: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "x-admin-token": "admin_session_valid",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, action, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Unknown error");
      showToast("✅ " + json.message);
      await loadUsers();
    } catch (err) {
      showToast("❌ " + String(err));
    } finally {
      setSaving(false);
      setEditing(null);
    }
  }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      u.display_name?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !u.banned) ||
      (statusFilter === "banned" && u.banned);
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    all: users.length,
    active: users.filter((u) => !u.banned).length,
    banned: users.filter((u) => u.banned).length,
  };

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "32px", width: "420px", maxWidth: "90vw" }}>
            <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 24px" }}>Edit User</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {([
                { key: "display_name", label: "Display Name", type: "text" },
                { key: "total_xp", label: "Total XP", type: "number" },
                { key: "level", label: "Level", type: "number" },
                { key: "current_streak", label: "Current Streak", type: "number" },
              ] as { key: keyof EditForm; label: string; type: string }[]).map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={editForm[f.key]}
                    onChange={(e) => setEditForm((p) => ({ ...p, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => performAction(editing.id, "update_profile", { display_name: editForm.display_name, total_xp: editForm.total_xp, level: editForm.level, current_streak: editForm.current_streak })}
                disabled={saving}
                style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setEditing(null)} style={{ padding: "12px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>👥 User Management</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>{users.length} users total</p>
        </div>
        <button onClick={loadUsers} disabled={loading} style={{ padding: "8px 16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", color: "#a78bfa", fontSize: "13px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          placeholder="Search by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "220px", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" }}
        />
        {(["all", "active", "banned"] as const).map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
            background: statusFilter === s ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${statusFilter === s ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.1)"}`,
            color: statusFilter === s ? "#a78bfa" : "rgba(255,255,255,0.5)",
          }}>
            {s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          Loading users from database...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
              {search ? "No users match your search" : "No users registered yet"}
            </div>
          ) : filtered.map((u) => (
            <div key={u.id} style={{
              background: u.banned ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${u.banned ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "14px", padding: "16px 20px",
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <img
                src={u.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${u.id}`}
                alt={u.display_name}
                style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{u.display_name || u.username}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>@{u.username}</span>
                  {u.banned && <Badge color="red" label="Banned" />}
                  {!u.email_confirmed && <Badge color="yellow" label="Unconfirmed" />}
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "3px" }}>
                  {u.email} · Lv.{u.level} · {u.total_xp.toLocaleString()} XP · 🔥{u.current_streak}d
                </div>
                <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", marginTop: "2px" }}>
                  Joined {u.created_at.slice(0, 10)} {u.last_sign_in ? `· Last seen ${u.last_sign_in.slice(0, 10)}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => { setEditing(u); setEditForm({ display_name: u.display_name || u.username, total_xp: u.total_xp, level: u.level, current_streak: u.current_streak }); }}
                  style={{ padding: "6px 12px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "8px", color: "#818cf8", fontSize: "12px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => performAction(u.id, "reset_password")}
                  disabled={saving}
                  style={{ padding: "6px 12px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "8px", color: "#fbbf24", fontSize: "12px", cursor: "pointer" }}
                >
                  Reset PW
                </button>
                <button
                  onClick={() => performAction(u.id, u.banned ? "unban" : "ban")}
                  disabled={saving}
                  style={{ padding: "6px 12px", background: u.banned ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${u.banned ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: "8px", color: u.banned ? "#4ade80" : "#f87171", fontSize: "12px", cursor: "pointer" }}
                >
                  {u.banned ? "Unban" : "Ban"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
