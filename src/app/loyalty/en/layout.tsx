
"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/loyalty/en/dashboard",     icon: "🏠", label: "Dashboard" },
  { href: "/loyalty/en/users",         icon: "👥", label: "Users" },
  { href: "/loyalty/en/ranks",         icon: "🏆", label: "Rankings" },
  { href: "/loyalty/en/content",       icon: "📚", label: "Content" },
  { href: "/loyalty/en/certificates",  icon: "🎓", label: "Certificates" },
  { href: "/loyalty/en/achievements",  icon: "⭐", label: "Achievements" },
  { href: "/loyalty/en/analytics",     icon: "📊", label: "Analytics" },
  { href: "/loyalty/en/settings",      icon: "⚙️", label: "Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const isLoginPage = pathname.includes("/auth/");

  useEffect(() => {
    if (isLoginPage) { setAuthed(true); return; }
    const ok = sessionStorage.getItem("cq_admin") === "true";
    if (!ok) { router.replace("/loyalty/en/auth/adminlogin"); return; }
    setAuthed(true);
  }, [isLoginPage, router]);

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
      <div style={{ color: "#7c3aed", fontSize: "18px" }}>Loading...</div>
    </div>
  );

  if (isLoginPage) return <>{children}</>;

  function handleLogout() {
    sessionStorage.removeItem("cq_admin");
    router.push("/loyalty/en/auth/adminlogin");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px", flexShrink: 0,
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column",
        padding: "24px 0",
      }}>
        {/* Logo */}
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", flexShrink: 0,
            }}>🛡️</div>
            <div>
              <div style={{ color: "#fff", fontWeight: "800", fontSize: "15px", lineHeight: "1" }}>CodeQuest</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "2px" }}>Admin Console</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {NAV.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "10px",
                  background: active ? "rgba(124,58,237,0.25)" : "transparent",
                  border: `1px solid ${active ? "rgba(124,58,237,0.4)" : "transparent"}`,
                  color: active ? "#c4b5fd" : "rgba(255,255,255,0.55)",
                  fontSize: "14px", fontWeight: active ? "600" : "400",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}>
                  <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: version + logout */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{
            width: "100%", padding: "10px", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px",
            color: "#f87171", fontSize: "13px", fontWeight: "600", cursor: "pointer",
          }}>
            Sign Out
          </button>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "center", marginTop: "10px" }}>
            Admin v2.0
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}
