"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { useGameStore } from "@/store/gameStore";
import { formatXp, getLevelFromXp, getXpForNextLevel } from "@/lib/utils";
import { LEVEL_THRESHOLDS } from "@/types";
import { Home, BookOpen, Trophy, User, Flame, ChevronDown, LogOut, Code2 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/",            label: "Home",        Icon: Home     },
  { href: "/tracks",      label: "Tracks",      Icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", Icon: Trophy   },
  { href: "/profile",     label: "Profile",     Icon: User     },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useUser();
  const reset = useGameStore((s) => s.reset);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const xp = profile?.total_xp ?? 0;
  const level = getLevelFromXp(xp);
  const nextLevelXp = getXpForNextLevel(level);
  const prevLevelXp = LEVEL_THRESHOLDS[Math.max(0, level - 1)] ?? 0;
  const progress = nextLevelXp > prevLevelXp
    ? Math.round(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100)
    : 100;

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    reset();
    router.push("/login");
    router.refresh();
  }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10, 10, 15, 0.88)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      height: "64px",
    }}>
      <nav style={{
        maxWidth: "1400px", margin: "0 auto", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "9px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(124,58,237,0.5)",
          }}>
            <Code2 size={18} color="white" strokeWidth={2.5} />
          </div>
          <span style={{
            fontSize: "20px", fontWeight: "800", letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>CodeQuest</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "8px", textDecoration: "none",
                fontSize: "14px", fontWeight: active ? "600" : "500",
                color: active ? "white" : "var(--text-secondary)",
                background: active ? "rgba(124, 58, 237, 0.2)" : "transparent",
                border: active ? "1px solid rgba(124, 58, 237, 0.3)" : "1px solid transparent",
                transition: "all 0.2s ease",
              }}>
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* User area */}
        {profile && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* Streak */}
            {profile.current_streak > 0 && (
              <div className="streak-badge" style={{ fontSize: "13px", padding: "4px 10px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Flame size={13} fill="currentColor" />
                {profile.current_streak}
              </div>
            )}

            {/* XP + Level */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="level-badge" style={{ width: "30px", height: "30px", fontSize: "12px" }}>{level}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                  {formatXp(xp)} XP
                </div>
                <div className="xp-bar-track" style={{ width: "80px", height: "4px" }}>
                  <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* Avatar + dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "10px", padding: "5px 10px 5px 5px",
                  cursor: "pointer", color: "var(--text-primary)",
                  transition: "all 0.2s ease",
                }}
              >
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.id}`}
                  alt={profile.username}
                  style={{ width: "26px", height: "26px", borderRadius: "6px", objectFit: "cover" }}
                />
                <span style={{ fontSize: "13px", fontWeight: "600", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {profile.username}
                </span>
                <ChevronDown size={12} color="var(--text-muted)" />
              </button>

              {menuOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "12px", padding: "8px", minWidth: "160px",
                  boxShadow: "var(--shadow-lg)", zIndex: 200,
                  animation: "scale-in 0.15s ease",
                }}>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "9px 12px", borderRadius: "8px", textDecoration: "none",
                    color: "var(--text-primary)", fontSize: "14px",
                    transition: "background 0.15s ease",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <User size={14} />
                    Profile
                  </Link>
                  <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
                  <button onClick={handleLogout} disabled={loggingOut} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "9px 12px", borderRadius: "8px",
                    color: "#ef4444", fontSize: "14px", width: "100%",
                    background: "transparent", border: "none", cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut size={14} />
                    {loggingOut ? "Logging out..." : "Log out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!profile && (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link href="/login" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "14px" }}>Log in</Link>
            <Link href="/register" className="btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>Start Free</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
