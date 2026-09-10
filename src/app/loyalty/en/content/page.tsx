"use client";
import { useState, useEffect, useCallback } from "react";

interface TrackData {
  id: string;
  title: string;
  icon: string;
  color: string;
  category: string;
  difficulty_curve: string;
  is_published: boolean;
  estimated_hours: number;
  learner_count: number;
  unit_count: number;
  lesson_count: number;
  completions: number;
  total_attempts: number;
  completion_rate: number;
}

export default function ContentPage() {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        headers: { "x-admin-token": "admin_session_valid" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setTracks(data.tracks ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadContent(); }, [loadContent]);

  async function togglePublish(trackId: string, currentState: boolean) {
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "x-admin-token": "admin_session_valid", "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, is_published: !currentState }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      showToast("✅ " + json.message);
      setTracks((prev) => prev.map((t) => t.id === trackId ? { ...t, is_published: !currentState } : t));
    } catch (err) {
      showToast("❌ " + String(err));
    }
  }

  const publishedCount = tracks.filter((t) => t.is_published).length;
  const totalLessons = tracks.reduce((s, t) => s + t.lesson_count, 0);
  const totalAttempts = tracks.reduce((s, t) => s + t.total_attempts, 0);

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 999, background: "#1e293b", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "10px", padding: "12px 20px", color: "#4ade80", fontSize: "14px", fontWeight: "600" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px" }}>📚 Content Management</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            {tracks.length} tracks · {totalLessons} lessons · {publishedCount} published · {totalAttempts.toLocaleString()} lesson attempts
          </p>
        </div>
        <button onClick={loadContent} disabled={loading} style={{ padding: "8px 16px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", color: "#a78bfa", fontSize: "13px", cursor: "pointer" }}>
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: "180px", background: "rgba(255,255,255,0.03)", borderRadius: "16px", animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      ) : tracks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", color: "rgba(255,255,255,0.3)" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📚</div>
          <div style={{ fontSize: "16px", marginBottom: "8px" }}>No tracks in database yet</div>
          <div style={{ fontSize: "13px" }}>Tracks are loaded from seed data — check your migration</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
          {tracks.map((track) => (
            <div key={track.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `${track.color ?? "#7c3aed"}22`,
                    border: `1px solid ${track.color ?? "#7c3aed"}44`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
                  }}>
                    {track.icon ?? "📘"}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px" }}>{track.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                      {track.unit_count} units · {track.lesson_count} lessons · {track.difficulty_curve}
                    </div>
                  </div>
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
                  background: track.is_published ? "rgba(34,197,94,0.15)" : "rgba(107,114,128,0.15)",
                  border: `1px solid ${track.is_published ? "rgba(34,197,94,0.35)" : "rgba(107,114,128,0.35)"}`,
                  color: track.is_published ? "#4ade80" : "#9ca3af",
                }}>
                  {track.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                {[
                  { label: "Completions", val: track.completions.toLocaleString() },
                  { label: "Attempts", val: track.total_attempts.toLocaleString() },
                  { label: "Rate", val: `${track.completion_rate}%` },
                ].map((s) => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 10px" }}>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>{s.val}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {track.total_attempts > 0 && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
                    <div style={{ height: "100%", width: `${track.completion_rate}%`, background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "3px" }} />
                  </div>
                </div>
              )}

              <button
                onClick={() => togglePublish(track.id, track.is_published)}
                style={{
                  width: "100%", padding: "8px 12px",
                  background: track.is_published ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)",
                  border: `1px solid ${track.is_published ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
                  borderRadius: "8px",
                  color: track.is_published ? "#f87171" : "#4ade80",
                  fontSize: "13px", fontWeight: "600", cursor: "pointer",
                }}
              >
                {track.is_published ? "Unpublish Track" : "Publish Track"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
