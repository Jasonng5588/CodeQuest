"use client";
import { useState, useEffect } from "react";

interface DailyStat { date: string; count: number; }
interface TopTrack { track: string; count: number; }

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dailySignups, setDailySignups] = useState<DailyStat[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalXP: 0,
    lessonsCompleted: 0,
    weeklyXPTotal: 0,
    activeStreaks: 0,
    recentSignups: 0,
    bannedCount: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/stats", {
          headers: { "x-admin-token": "admin_session_valid" },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setStats(data.stats ?? {});
        setDailySignups(data.dailySignups ?? []);
        setTopTracks(data.topTracks ?? []);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const maxSignups = Math.max(...dailySignups.map((d) => d.count), 1);
  const maxTrack = Math.max(...topTracks.map((t) => t.count), 1);

  const kpiCards = [
    { label: "Total Users",           value: stats.totalUsers,                       icon: "👥", color: "#06b6d4", sub: `${stats.recentSignups} this week` },
    { label: "Total XP Earned",        value: stats.totalXP.toLocaleString(),         icon: "⚡", color: "#f59e0b", sub: `${stats.weeklyXPTotal.toLocaleString()} this week` },
    { label: "Lessons Completed",      value: stats.lessonsCompleted.toLocaleString(),icon: "📚", color: "#10b981", sub: "all time" },
    { label: "Active Streaks",         value: stats.activeStreaks,                    icon: "🔥", color: "#ef4444", sub: "users with streak > 0" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>📊 Analytics</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>Live platform metrics from Supabase</p>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "24px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {kpiCards.map((k) => (
          <div key={k.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ fontSize: "24px" }}>{k.icon}</div>
              {loading && <div style={{ width: "60px", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />}
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>{loading ? "—" : k.value}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{k.label}</div>
            <div style={{ fontSize: "11px", color: k.color, marginTop: "4px" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Daily Signups Chart */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>📈 Daily Signups</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: "0 0 20px" }}>Last 14 days</p>
          {loading ? (
            <div style={{ height: "120px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", animation: "pulse 1.5s infinite" }} />
          ) : dailySignups.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No data yet</div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "100px", marginBottom: "8px" }}>
                {dailySignups.map((d, i) => (
                  <div
                    key={d.date}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
                    title={`${d.date}: ${d.count}`}
                  >
                    <div style={{
                      width: "100%",
                      height: `${Math.max((d.count / maxSignups) * 88, 3)}px`,
                      background: i === dailySignups.length - 1 ? "#7c3aed" : `linear-gradient(180deg, #7c3aed, #06b6d4)`,
                      borderRadius: "3px 3px 0 0",
                      opacity: 0.7 + (i / dailySignups.length) * 0.3,
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
                <span>{dailySignups[0]?.date.slice(5)}</span>
                <span>Today</span>
              </div>
            </>
          )}
        </div>

        {/* Track Popularity */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>🏆 Track Completions</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: "0 0 20px" }}>Most completed tracks</p>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ height: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", animation: "pulse 1.5s infinite", width: `${80 - i * 12}%` }} />
              ))}
            </div>
          ) : topTracks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
              No completions yet — users are learning!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {topTracks.map(({ track, count }) => (
                <div key={track} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", minWidth: "80px", textTransform: "capitalize" }}>{track}</span>
                  <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${(count / maxTrack) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "4px" }} />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", minWidth: "24px", textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Platform Health */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 20px" }}>🛡️ Platform Health</h2>
          {[
            { label: "Banned Accounts", value: stats.bannedCount, total: stats.totalUsers, color: "#ef4444" },
            { label: "Email Unconfirmed", value: 0, total: stats.totalUsers, color: "#f59e0b" },
            { label: "Active Learners", value: stats.activeStreaks, total: stats.totalUsers, color: "#10b981" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{item.label}</span>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>{loading ? "—" : item.value}</span>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: loading || !item.total ? "0%" : `${(item.value / item.total) * 100}%`, height: "100%", background: item.color, borderRadius: "3px", transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* XP Economy */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", margin: "0 0 20px" }}>⚡ XP Economy</h2>
          {[
            { label: "Total XP in System", value: stats.totalXP.toLocaleString(), icon: "🏦" },
            { label: "XP This Week", value: stats.weeklyXPTotal.toLocaleString(), icon: "📅" },
            { label: "Avg XP per User", value: stats.totalUsers ? Math.round(stats.totalXP / stats.totalUsers).toLocaleString() : "0", icon: "📊" },
            { label: "Lessons Completed", value: stats.lessonsCompleted.toLocaleString(), icon: "✅" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>{item.icon} {item.label}</span>
              <span style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{loading ? "—" : item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
