import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProcessingIndicatorProps {
  question: string;
}

export function ProcessingIndicator({ question }: ProcessingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className="rounded-2xl bg-card p-6"
      style={{ boxShadow: "var(--result-shadow)" }}
    >
      <p className="text-muted-foreground text-sm font-medium mb-2">You asked</p>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
        "{question}"
      </h3>
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Generating query...</span>
      </div>
    </motion.div>
  );
}
