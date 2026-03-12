interface ResultTableProps {
  columns: string[];
  rows: Record<string, string | number>[];
}

export function ResultTable({ columns, rows }: ResultTableProps) {
  const isNumeric = (val: string | number) => typeof val === "number" || !isNaN(Number(val));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left py-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td
                  key={col}
                  className={`py-2.5 px-3 text-foreground ${
                    isNumeric(row[col]) ? "text-right tabular-nums" : ""
                  }`}
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
