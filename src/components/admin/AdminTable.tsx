
export function AdminTable({ columns, rows }: {
  columns: string[];
  rows: (string | number | React.ReactNode)[][];
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: "12px 16px", textAlign: "left",
                color: "rgba(255,255,255,0.4)", fontWeight: "600", fontSize: "12px",
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "14px 16px", color: "rgba(255,255,255,0.85)", verticalAlign: "middle" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
          No data found
        </div>
      )}
    </div>
  );
}
