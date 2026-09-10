"use client";
import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";

interface AdminStats {
  totalUsers: number;
  totalXP: number;
  activeStreaks: number;
  bannedCount: number;
  recentSignups: number;
  lessonsCompleted: number;
  weeklyXPTotal: number;
}

interface DailyStat { date: string; count: number; }
interface TopTrack { track: string; count: number; }
interface RecentUser { id: string; title: string; level: number; total_xp: number; created_at: string; }

export default function AdminDashboard() {
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [dailySignups, setDailySignups] = useState<DailyStat[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats", {
          headers: { "x-admin-token": "admin_session_valid" },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setStats(data.stats);
        setDailySignups(data.dailySignups ?? []);
        setTopTracks(data.topTracks ?? []);
        setRecentUsers(data.recentUsers ?? []);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const maxSignups = Math.max(...dailySignups.map((d) => d.count), 1);
  const maxTrack = Math.max(...topTracks.map((t) => t.count), 1);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "800", margin: "0 0 4px" }}>Dashboard</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>Welcome back, Administrator</p>
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
          🕐 {time.toLocaleTimeString()}
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "24px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ Failed to load live data: {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", height: "100px", animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <StatCard icon="👥" label="Total Users" value={stats?.totalUsers ?? 0} sub={`${stats?.recentSignups ?? 0} this week`} color="#06b6d4" />
            <StatCard icon="⚡" label="Total XP Awarded" value={(stats?.totalXP ?? 0).toLocaleString()} sub={`+${(stats?.weeklyXPTotal ?? 0).toLocaleString()} this week`} color="#f59e0b" />
            <StatCard icon="📚" label="Lessons Completed" value={(stats?.lessonsCompleted ?? 0).toLocaleString()} sub="across all users" color="#10b981" />
            <StatCard icon="🚫" label="Banned Accounts" value={stats?.bannedCount ?? 0} sub={`${stats?.activeStreaks ?? 0} active streaks`} color="#6b7280" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            {/* Daily Signups Chart */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 20px" }}>📈 Daily Signups (14 days)</h2>
              {dailySignups.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0", fontSize: "14px" }}>No signup data yet</div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "80px" }}>
                  {dailySignups.map((d) => (
                    <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <div
                        style={{
                          width: "100%",
                          height: `${Math.max((d.count / maxSignups) * 64, 4)}px`,
                          background: d.count > 0 ? "linear-gradient(180deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.08)",
                          borderRadius: "3px 3px 0 0",
                          transition: "height 0.3s",
                        }}
                        title={`${d.date}: ${d.count} signups`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Signups */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 20px" }}>🆕 Recent Signups</h2>
              {recentUsers.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0", fontSize: "14px" }}>No users yet</div>
              ) : recentUsers.map((u) => (
                <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "800", fontSize: "13px",
                    }}>Lv{u.level}</div>
                    <div>
                      <div style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>{u.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>{u.total_xp.toLocaleString()} XP</div>
                    </div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{u.created_at.slice(0, 10)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tracks */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
            <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 20px" }}>🏆 Most Popular Tracks</h2>
            {topTracks.length === 0 ? (
              <div style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0", fontSize: "14px" }}>
                No track completions yet — users are still learning!
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {topTracks.map(({ track, count }) => (
                  <div key={track} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>{track}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "100px", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
                        <div style={{ width: `${(count / maxTrack) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "3px" }} />
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", minWidth: "20px" }}>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
