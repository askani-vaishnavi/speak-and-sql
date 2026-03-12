import { QueryResult } from "@/types/query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download, Copy } from "lucide-react";
import { useState } from "react";
import { ResultTable } from "./ResultTable";
import { ResultChart } from "./ResultChart";
import { toast } from "sonner";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface ResultCardProps {
  result: QueryResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [showSql, setShowSql] = useState(false);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(result.sql);
    toast.success("SQL copied to clipboard");
  };

  const handleExportCSV = () => {
    if (result.rows.length === 0) return;
    const headers = result.columns.join(",");
    const rows = result.rows.map((r) => result.columns.map((c) => r[c]).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query-result.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="rounded-2xl bg-card p-6"
      style={{ boxShadow: "var(--result-shadow)" }}
    >
      {/* Question */}
      <p className="text-muted-foreground text-sm font-medium mb-2">You asked</p>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
        "{result.question}"
      </h3>

      {/* SQL Toggle */}
      <button
        onClick={() => setShowSql(!showSql)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 mb-4"
      >
        {showSql ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {showSql ? "Hide SQL" : "View SQL"}
      </button>

      <AnimatePresence>
        {showSql && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden mb-4"
          >
            <pre className="bg-muted rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
              {result.sql}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {result.rows.length > 0 && (
        <>
          {result.chartData && result.chartData.length > 0 && (
            <div className="mb-6">
              <ResultChart data={result.chartData} />
            </div>
          )}
          <ResultTable columns={result.columns} rows={result.rows} />
        </>
      )}

      {result.rows.length === 0 && (
        <p className="text-sm text-muted-foreground py-4">No results returned.</p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCopySQL}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Copy className="w-3 h-3" /> Copy SQL
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Download className="w-3 h-3" /> Export CSV
        </motion.button>
      </div>
    </motion.div>
  );
}
