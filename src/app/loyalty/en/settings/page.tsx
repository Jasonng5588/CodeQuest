
"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "CodeQuest",
    maintenanceMode: false,
    registrationOpen: true,
    maxStreak: 365,
    xpMultiplier: 1.0,
    certThreshold: 100,
    adminEmail: "admin@codequest.dev",
    sessionTimeout: 30,
  });
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function save(e: React.FormEvent) {
    e.preventDefault();
    showToast("✅ Settings saved successfully");
  }

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>⚙️ System Settings</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>Configure platform-wide settings</p>
      </div>

      <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>
        {[
          { section: "General", fields: [
            { key: "siteName", label: "Platform Name", type: "text" },
            { key: "adminEmail", label: "Admin Email", type: "email" },
            { key: "sessionTimeout", label: "Admin Session Timeout (minutes)", type: "number" },
          ]},
          { section: "Gamification", fields: [
            { key: "xpMultiplier", label: "Global XP Multiplier", type: "number" },
            { key: "maxStreak", label: "Max Streak Days (display)", type: "number" },
            { key: "certThreshold", label: "Lessons Required for Certificate (%)", type: "number" },
          ]},
        ].map(section => (
          <div key={section.section} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
            <h2 style={{ color: "#fff", fontSize: "15px", fontWeight: "700", margin: "0 0 20px" }}>{section.section}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {section.fields.map(field => (
                <div key={field.key}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" }}>{field.label}</label>
                  <input
                    type={field.type}
                    step={field.key === "xpMultiplier" ? "0.1" : undefined}
                    value={settings[field.key as keyof typeof settings] as string | number}
                    onChange={e => setSettings(prev => ({ ...prev, [field.key]: field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Toggles */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ color: "#fff", fontSize: "15px", fontWeight: "700", margin: "0 0 20px" }}>Feature Flags</h2>
          {[
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to all users", color: "#ef4444" },
            { key: "registrationOpen", label: "Open Registration", desc: "Allow new users to sign up", color: "#22c55e" },
          ].map(toggle => (
            <div key={toggle.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{toggle.label}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "2px" }}>{toggle.desc}</div>
              </div>
              <button type="button" onClick={() => setSettings(prev => ({ ...prev, [toggle.key]: !prev[toggle.key as keyof typeof prev] }))}
                style={{
                  width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer",
                  background: settings[toggle.key as keyof typeof settings] ? toggle.color : "rgba(255,255,255,0.15)",
                  position: "relative", transition: "background 0.2s",
                }}>
                <div style={{ position: "absolute", top: "3px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "left 0.2s", left: settings[toggle.key as keyof typeof settings] ? "25px" : "3px" }} />
              </button>
            </div>
          ))}
        </div>

        <button type="submit" style={{ padding: "14px 32px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "12px", color: "#fff", fontWeight: "700", fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.35)", alignSelf: "flex-start" }}>
          Save Settings
        </button>
      </form>
    </div>
  );
}
