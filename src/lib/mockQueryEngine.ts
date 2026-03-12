import { QueryResult } from "@/types/query";

// Mock query engine that simulates AI SQL generation and database execution
// This will be replaced with actual Lovable Cloud edge function calls

const MOCK_RESPONSES: Record<string, Omit<QueryResult, "id" | "question" | "timestamp">> = {
  default: {
    sql: "SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary\nFROM employees\nGROUP BY department\nORDER BY employee_count DESC;",
    columns: ["department", "employee_count", "avg_salary"],
    rows: [
      { department: "Engineering", employee_count: 142, avg_salary: 125000 },
      { department: "Sales", employee_count: 98, avg_salary: 85000 },
      { department: "Marketing", employee_count: 67, avg_salary: 78000 },
      { department: "Operations", employee_count: 54, avg_salary: 72000 },
      { department: "HR", employee_count: 23, avg_salary: 68000 },
    ],
    chartData: [
      { label: "Engineering", value: 142 },
      { label: "Sales", value: 98 },
      { label: "Marketing", value: 67 },
      { label: "Operations", value: 54 },
      { label: "HR", value: 23 },
    ],
  },
  sales: {
    sql: "SELECT month, total_revenue\nFROM monthly_sales\nWHERE year = 2024\nORDER BY month;",
    columns: ["month", "total_revenue"],
    rows: [
      { month: "Jan", total_revenue: 234500 },
      { month: "Feb", total_revenue: 198300 },
      { month: "Mar", total_revenue: 312800 },
      { month: "Apr", total_revenue: 287400 },
      { month: "May", total_revenue: 345200 },
      { month: "Jun", total_revenue: 402100 },
    ],
    chartData: [
      { label: "Jan", value: 234500 },
      { label: "Feb", value: 198300 },
      { label: "Mar", value: 312800 },
      { label: "Apr", value: 287400 },
      { label: "May", value: 345200 },
      { label: "Jun", value: 402100 },
    ],
  },
  customers: {
    sql: "SELECT name, city, total_orders, total_spent\nFROM customers\nWHERE city = 'Hyderabad'\nORDER BY total_spent DESC\nLIMIT 10;",
    columns: ["name", "city", "total_orders", "total_spent"],
    rows: [
      { name: "Priya Sharma", city: "Hyderabad", total_orders: 47, total_spent: 125400 },
      { name: "Ravi Kumar", city: "Hyderabad", total_orders: 38, total_spent: 98200 },
      { name: "Anita Reddy", city: "Hyderabad", total_orders: 29, total_spent: 76800 },
      { name: "Vikram Singh", city: "Hyderabad", total_orders: 22, total_spent: 54300 },
      { name: "Deepa Nair", city: "Hyderabad", total_orders: 18, total_spent: 43100 },
    ],
  },
  salary: {
    sql: "SELECT name, department, salary, hire_date\nFROM employees\nWHERE salary > 50000\nORDER BY salary DESC;",
    columns: ["name", "department", "salary", "hire_date"],
    rows: [
      { name: "Alice Chen", department: "Engineering", salary: 185000, hire_date: "2019-03-15" },
      { name: "Bob Martinez", department: "Engineering", salary: 162000, hire_date: "2020-07-22" },
      { name: "Carol Taylor", department: "Sales", salary: 134000, hire_date: "2018-11-01" },
      { name: "David Wilson", department: "Marketing", salary: 98000, hire_date: "2021-01-10" },
      { name: "Eve Johnson", department: "Operations", salary: 72000, hire_date: "2022-05-18" },
    ],
  },
};

function matchQuery(question: string): Omit<QueryResult, "id" | "question" | "timestamp"> {
  const q = question.toLowerCase();
  if (q.includes("sales") || q.includes("revenue")) return MOCK_RESPONSES.sales;
  if (q.includes("customer") || q.includes("hyderabad")) return MOCK_RESPONSES.customers;
  if (q.includes("salary") || q.includes("employee")) return MOCK_RESPONSES.salary;
  return MOCK_RESPONSES.default;
}

export async function executeQuery(question: string): Promise<QueryResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const matched = matchQuery(question);
  return {
    id: crypto.randomUUID(),
    question,
    timestamp: new Date(),
    ...matched,
  };
}
