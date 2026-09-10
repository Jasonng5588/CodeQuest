
export function StatCard({ icon, label, value, sub, color = "#7c3aed" }: {
  icon: string; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: "500", marginBottom: "8px" }}>{label}</div>
          <div style={{ color: "#fff", fontSize: "32px", fontWeight: "800", lineHeight: "1" }}>{value}</div>
          {sub && <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginTop: "6px" }}>{sub}</div>}
        </div>
        <div style={{
          width: "48px", height: "48px", borderRadius: "12px",
          background: `${color}22`, border: `1px solid ${color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "22px",
        }}>{icon}</div>
      </div>
    </div>
  );
}
