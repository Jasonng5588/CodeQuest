
"use client";
import { useRef } from "react";

interface Props {
  trackId: string; trackTitle: string; trackIcon: string; trackColor: string;
  userName: string; certId: string; issuedDate: string;
}

export default function CertificateView({ trackTitle, trackIcon, trackColor, userName, certId, issuedDate }: Props) {
  const certRef = useRef<HTMLDivElement>(null);

  function handlePrint() { window.print(); }

  async function handleDownload() {
    const el = certRef.current;
    if (!el) return;
    // Use html2canvas-like approach with browser print
    window.print();
  }

  return (
    <div>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px" }}>🎓 Your Certificate</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>Congratulations on completing {trackTitle}!</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handlePrint} style={{
            padding: "10px 20px", background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "10px", color: "var(--text-primary)", fontWeight: "600", fontSize: "14px", cursor: "pointer",
          }}>🖨️ Print</button>
          <button onClick={handleDownload} style={{
            padding: "10px 20px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            border: "none", borderRadius: "10px", color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer",
          }}>⬇️ Download PDF</button>
        </div>
      </div>

      <div ref={certRef} id="certificate" style={{
        width: "800px", maxWidth: "100%", margin: "0 auto",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        border: `3px solid ${trackColor}`,
        borderRadius: "24px", padding: "60px",
        position: "relative", overflow: "hidden",
        boxShadow: `0 0 60px ${trackColor}40, 0 40px 80px rgba(0,0,0,0.5)`,
        fontFamily: "'Georgia', serif",
      }}>
        {/* Decorative corners */}
        {["top:20px;left:20px", "top:20px;right:20px", "bottom:20px;left:20px", "bottom:20px;right:20px"].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", width: "40px", height: "40px",
            borderTop: i < 2 ? `2px solid ${trackColor}88` : "none",
            borderBottom: i >= 2 ? `2px solid ${trackColor}88` : "none",
            borderLeft: i % 2 === 0 ? `2px solid ${trackColor}88` : "none",
            borderRight: i % 2 === 1 ? `2px solid ${trackColor}88` : "none",
            ...(i === 0 ? { top: "20px", left: "20px" } : i === 1 ? { top: "20px", right: "20px" } : i === 2 ? { bottom: "20px", left: "20px" } : { bottom: "20px", right: "20px" }),
          }} />
        ))}

        {/* Background glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${trackColor}15 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>⚔️</div>
            <span style={{ fontSize: "28px", fontWeight: "900", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px", fontFamily: "Inter, sans-serif" }}>CodeQuest</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Certificate of Completion</div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${trackColor}88, transparent)`, marginBottom: "40px" }} />

        {/* Main content */}
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>This certifies that</div>
          <div style={{ fontSize: "44px", fontWeight: "700", color: "#fff", marginBottom: "16px", fontFamily: "Georgia, serif", textShadow: `0 0 30px ${trackColor}80` }}>{userName}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>has successfully mastered</div>

          {/* Track Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", padding: "16px 32px", background: `${trackColor}15`, border: `2px solid ${trackColor}60`, borderRadius: "16px", marginBottom: "32px" }}>
            <span style={{ fontSize: "32px" }}>{trackIcon}</span>
            <span style={{ fontSize: "28px", fontWeight: "800", color: trackColor, fontFamily: "Inter, sans-serif" }}>{trackTitle}</span>
          </div>

          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.7", maxWidth: "500px", margin: "0 auto 40px", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Demonstrating proficiency in programming concepts, problem-solving skills, and real-world coding challenges through the CodeQuest learning platform.
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${trackColor}88, transparent)`, marginBottom: "32px" }} />

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.3)", marginBottom: "8px" }} />
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontFamily: "Inter, sans-serif" }}>Date Issued</div>
            <div style={{ color: "#fff", fontSize: "13px", fontWeight: "600", fontFamily: "Inter, sans-serif" }}>{issuedDate}</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "4px" }}>🏆</div>
            <div style={{ color: trackColor, fontWeight: "800", fontSize: "13px", letterSpacing: "1px", fontFamily: "Inter, sans-serif" }}>CERTIFIED</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ width: "120px", height: "1px", background: "rgba(255,255,255,0.3)", marginBottom: "8px" }} />
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", fontFamily: "Inter, sans-serif" }}>Certificate ID</div>
            <div style={{ color: "#fff", fontSize: "11px", fontWeight: "600", fontFamily: "monospace" }}>{certId}</div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #certificate, #certificate * { visibility: visible !important; }
          #certificate { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
