"use client";
import { useState, useEffect, useCallback } from "react";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import CertificateView from "@/components/certificate/CertificateView";

interface Certificate {
  id: string;
  user_id: string;
  user: string;
  track: string;
  issued: string;
  status: "valid" | "revoked";
  xp: number;
  lessons_completed: number;
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const [showGrantModal, setShowGrantModal] = useState(false);
  const [users, setUsers] = useState<{ id: string; display_name: string; email: string }[]>([]);
  const [grantUserId, setGrantUserId] = useState("");
  const [grantTrackId, setGrantTrackId] = useState("");
  const [granting, setGranting] = useState(false);

  useEffect(() => {
    if (showGrantModal && users.length === 0) {
      fetch("/api/admin/users", { headers: { "x-admin-token": "admin_session_valid" } })
        .then(res => res.json())
        .then(data => setUsers(data.users ?? []))
        .catch(err => console.error("Failed to load users:", err));
    }
  }, [showGrantModal, users.length]);

  async function handleGrant() {
    if (!grantUserId || !grantTrackId) return showToast("⚠️ Select user and track");
    setGranting(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": "admin_session_valid" },
        body: JSON.stringify({ userId: grantUserId, trackId: grantTrackId }),
      });
      if (!res.ok) throw new Error(await res.text());
      showToast("✅ Certificate granted");
      setShowGrantModal(false);
      setGrantUserId("");
      setGrantTrackId("");
      loadCerts();
    } catch (err) {
      showToast(`❌ Error: ${err}`);
    } finally {
      setGranting(false);
    }
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const loadCerts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/certificates", {
        headers: { "x-admin-token": "admin_session_valid" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setCerts(data.certificates ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCerts(); }, [loadCerts]);

  function toggleRevoke(id: string) {
    setCerts((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: c.status === "revoked" ? "valid" : "revoked" } : c)
    );
    showToast("✅ Certificate status updated");
  }

  const filtered = certs.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.user.toLowerCase().includes(q) || c.track.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
  });

  const validCount = certs.filter((c) => c.status === "valid").length;
  const revokedCount = certs.filter((c) => c.status === "revoked").length;

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>🎓 Certificate Management</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            {validCount} valid · {revokedCount} revoked · {certs.length} total
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setShowGrantModal(true)} style={{ padding: "8px 16px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
            + Grant Certificate
          </button>
          <button onClick={loadCerts} disabled={loading} style={{ padding: "8px 16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", color: "#a78bfa", fontSize: "13px", cursor: "pointer" }}>
            ↻ Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      <input
        placeholder="Search by name, track, or certificate ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", marginBottom: "20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          Loading certificates from database...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
          {search
            ? "No certificates match your search"
            : "No certificates issued yet — users need to complete tracks to earn them"}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((cert) => (
            <div key={cert.id} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${cert.status === "revoked" ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "14px", padding: "18px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              opacity: cert.status === "revoked" ? 0.6 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ fontSize: "28px" }}>🎓</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>{cert.user}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                    {cert.track} Certificate · Issued {cert.issued} · {cert.lessons_completed} lessons · {cert.xp.toLocaleString()} XP
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontFamily: "monospace", marginTop: "2px" }}>{cert.id}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                  background: cert.status === "valid" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                  border: `1px solid ${cert.status === "valid" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                  color: cert.status === "valid" ? "#4ade80" : "#f87171",
                }}>
                  {cert.status === "valid" ? "✓ Valid" : "✗ Revoked"}
                </span>
                <button
                  onClick={() => setPreviewCert(cert)}
                  style={{
                    padding: "6px 14px",
                    background: "rgba(6,182,212,0.15)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    borderRadius: "8px",
                    color: "#22d3ee",
                    fontSize: "13px", cursor: "pointer",
                  }}
                >
                  Preview
                </button>
                <button
                  onClick={() => toggleRevoke(cert.id)}
                  style={{
                    padding: "6px 14px",
                    background: cert.status === "revoked" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                    border: `1px solid ${cert.status === "revoked" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                    borderRadius: "8px",
                    color: cert.status === "revoked" ? "#4ade80" : "#f87171",
                    fontSize: "13px", cursor: "pointer",
                  }}
                >
                  {cert.status === "revoked" ? "Reinstate" : "Revoke"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grant Modal */}
      {showGrantModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1e293b", padding: "32px", borderRadius: "16px", width: "400px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <h2 style={{ margin: "0 0 20px", color: "#fff", fontSize: "20px" }}>Grant Certificate</h2>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Select User</label>
              <select value={grantUserId} onChange={(e) => setGrantUserId(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }}>
                <option value="" style={{ color: "#000" }}>-- Choose User --</option>
                {users.map(u => <option key={u.id} value={u.id} style={{ color: "#000" }}>{u.display_name} ({u.email})</option>)}
              </select>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Select Track</label>
              <select value={grantTrackId} onChange={(e) => setGrantTrackId(e.target.value)} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }}>
                <option value="" style={{ color: "#000" }}>-- Choose Track --</option>
                {ALL_TRACKS.map(t => <option key={t.id} value={t.id} style={{ color: "#000" }}>{t.title}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowGrantModal(false)} style={{ padding: "10px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleGrant} disabled={granting} style={{ padding: "10px 16px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer" }}>{granting ? "Granting..." : "Grant"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewCert && (() => {
        const trackObj = ALL_TRACKS.find(t => t.title.toLowerCase() === previewCert.track.toLowerCase() || t.id.toLowerCase() === previewCert.track.toLowerCase()) || ALL_TRACKS[0];
        return (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "40px" }}>
            <div style={{ position: "relative", background: "#0f172a", borderRadius: "24px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)", transform: "scale(0.8)", transformOrigin: "center" }}>
              <button onClick={() => setPreviewCert(null)} style={{ position: "absolute", top: "10px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer", zIndex: 10 }}>×</button>
              <CertificateView
                trackId={trackObj.id}
                trackTitle={previewCert.track}
                trackIcon={trackObj.icon}
                trackColor={trackObj.color}
                userName={previewCert.user}
                certId={previewCert.id}
                issuedDate={previewCert.issued}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
