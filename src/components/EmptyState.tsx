import { Mic } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Mic className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          Ask a question to get started.
        </p>
      </motion.div>
    </div>
  );
}
