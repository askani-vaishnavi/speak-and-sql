import { QueryResult } from "@/types/query";
import { Clock } from "lucide-react";

interface QuerySidebarProps {
  queries: QueryResult[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function QuerySidebar({ queries, activeId, onSelect }: QuerySidebarProps) {
  return (
    <aside className="w-[280px] h-screen bg-muted border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">Query History</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {queries.length === 0 ? (
          <p className="text-sm text-muted-foreground p-2">No queries yet.</p>
        ) : (
          queries.map((q) => (
            <button
              key={q.id}
              onClick={() => onSelect(q.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors duration-150 ${
                activeId === q.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <p className="text-sm font-medium truncate">{q.question}</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {q.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
