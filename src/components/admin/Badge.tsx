
export function Badge({ label, color = "#7c3aed" }: { label: string; color?: string }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
      background: `${color}22`, border: `1px solid ${color}55`, color,
    }}>{label}</span>
  );
}
