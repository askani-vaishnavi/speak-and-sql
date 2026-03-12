import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

interface ResultChartProps {
  data: { label: string; value: number }[];
}

export function ResultChart({ data }: ResultChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(240 3.8% 46.1%)", fontSize: 12, fontFamily: "Figtree" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(240 3.8% 46.1%)", fontSize: 12, fontFamily: "Figtree" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(240 5.9% 90%)",
              borderRadius: "8px",
              fontSize: "12px",
              fontFamily: "Figtree",
              boxShadow: "0 4px 12px -4px rgba(0,0,0,.08)",
            }}
            cursor={false}
          />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  hoveredIndex === index
                    ? "hsl(240 10% 60%)"
                    : "hsl(240 10% 80%)"
                }
                style={{ transition: "fill 0.15s ease" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
