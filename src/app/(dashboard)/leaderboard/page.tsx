import { createClient } from "@/lib/supabase/server";
import { formatXp } from "@/lib/utils";
import { getLevelFromXp, getLevelTitle } from "@/types";
import type { Metadata } from "next";
import { Trophy, Zap, Medal, Crown, Flame, UserCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Leaderboard — CodeQuest" };

type LeaderEntry = {
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  level: number;
  current_streak: number;
  weekly_xp?: number;
  total_xp?: number;
  rank: number;
};

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Crown size={16} color="#fbbf24" fill="#fbbf24" />
    </div>
  );
  if (rank === 2) return (
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(148,163,184,0.15)", border: "1px solid rgba(148,163,184,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Medal size={15} color="#94a3b8" />
    </div>
  );
  if (rank === 3) return (
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(180,120,60,0.15)", border: "1px solid rgba(180,120,60,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Medal size={15} color="#b4783c" />
    </div>
  );
  return (
    <div style={{ width: "32px", textAlign: "center", fontSize: "13px", fontWeight: "700", color: "var(--text-muted)" }}>
      #{rank}
    </div>
  );
}

function LeaderboardRow({ entry, currentUserId, xp }: { entry: LeaderEntry; currentUserId?: string; xp: number }) {
  const level = getLevelFromXp(xp);
  const title = getLevelTitle(level);
  const isMe = entry.user_id === currentUserId;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      padding: "10px 14px", borderRadius: "12px",
      border: isMe ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
      background: isMe ? "rgba(124,58,237,0.08)" : "transparent",
      transition: "background 0.15s",
    }}>
      <RankDisplay rank={entry.rank} />

      <img
        src={entry.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${entry.user_id}`}
        alt={entry.username}
        style={{ width: "36px", height: "36px", borderRadius: "9px", objectFit: "cover", flexShrink: 0 }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontWeight: "700", fontSize: "14px" }}>
            {entry.display_name || entry.username}
          </span>
          {isMe && (
            <span style={{
              fontSize: "10px", padding: "1px 6px", borderRadius: "999px",
              background: "rgba(124,58,237,0.2)", color: "#a78bfa",
              border: "1px solid rgba(124,58,237,0.3)", fontWeight: "600",
            }}>You</span>
          )}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
          Lv.{level} {title}
          {entry.current_streak > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              · <Flame size={10} color="#ef4444" fill="#ef4444" style={{ display: "inline" }} /> {entry.current_streak}d
            </span>
          )}
        </div>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{
          fontSize: "17px", fontWeight: "800",
          background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {formatXp(xp)}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>XP</div>
      </div>
    </div>
  );
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try the leaderboard views; gracefully fallback if they don't exist
  const { data: weekly, error: weeklyErr } = await supabase
    .from("weekly_leaderboard")
    .select("*")
    .limit(50);

  const { data: allTime, error: allTimeErr } = await supabase
    .from("all_time_leaderboard")
    .select("*")
    .limit(50);

  // Fallback: query user_profiles directly if views don't exist
  const viewsFailed = weeklyErr || allTimeErr;
  let weeklyList: LeaderEntry[] = weekly ?? [];
  let allTimeList: LeaderEntry[] = allTime ?? [];

  if (viewsFailed) {
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, username, display_name, avatar_url, total_xp, current_streak")
      .order("total_xp", { ascending: false })
      .limit(50);

    if (profiles) {
      allTimeList = profiles.map((p, i) => ({
        user_id: p.id,
        username: p.username,
        display_name: p.display_name,
        avatar_url: p.avatar_url,
        total_xp: p.total_xp,
        weekly_xp: 0,
        current_streak: p.current_streak,
        level: getLevelFromXp(p.total_xp),
        rank: i + 1,
      }));
      weeklyList = allTimeList; // best effort
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Trophy size={20} color="#f59e0b" />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800" }}>Leaderboard</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Weekly rankings reset every Monday. Compete for the top spot!
        </p>
        {!user && (
          <div style={{ marginTop: "12px" }}>
            <Link href="/register" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", fontSize: "14px" }}>
              <Zap size={14} fill="white" /> Join & Compete
            </Link>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Weekly */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Zap size={16} color="#6366f1" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>This Week</h2>
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "18px" }}>
            Resets Monday at midnight UTC
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {weeklyList.length > 0 ? weeklyList.map(entry => (
              <LeaderboardRow
                key={entry.user_id}
                entry={entry}
                currentUserId={user?.id}
                xp={entry.weekly_xp ?? entry.total_xp ?? 0}
              />
            )) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <Zap size={24} color="var(--text-muted)" />
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>No entries yet</div>
                <div style={{ fontSize: "13px" }}>Complete lessons to appear here!</div>
              </div>
            )}
          </div>
        </div>

        {/* All-time */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Crown size={16} color="#f59e0b" fill="#f59e0b" />
            <h2 style={{ fontSize: "17px", fontWeight: "700" }}>All Time</h2>
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "18px" }}>
            Total XP earned since joining
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {allTimeList.length > 0 ? allTimeList.map(entry => (
              <LeaderboardRow
                key={entry.user_id}
                entry={entry}
                currentUserId={user?.id}
                xp={entry.total_xp ?? 0}
              />
            )) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <UserCircle size={24} color="var(--text-muted)" />
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>No legends yet</div>
                <div style={{ fontSize: "13px" }}>Be the first to claim a spot!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
