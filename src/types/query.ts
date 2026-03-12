export interface QueryResult {
  id: string;
  question: string;
  sql: string;
  columns: string[];
  rows: Record<string, string | number>[];
  chartData?: { label: string; value: number }[];
  timestamp: Date;
}
