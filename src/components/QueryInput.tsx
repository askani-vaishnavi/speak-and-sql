import { Mic, MicOff, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface QueryInputProps {
  isListening: boolean;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

export function QueryInput({
  isListening,
  transcript,
  onStartListening,
  onStopListening,
  onSubmit,
  isProcessing,
}: QueryInputProps) {
  const [textInput, setTextInput] = useState("");

  const displayText = isListening ? transcript : textInput;

  const handleSubmit = () => {
    const text = displayText.trim();
    if (!text || isProcessing) return;
    onSubmit(text);
    setTextInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-8 pb-8 pt-4">
      <div
        className={`relative flex items-center h-14 rounded-full bg-card border border-border px-4 gap-3 transition-shadow duration-300 ${
          isListening ? "animate-pulse-ring" : "shadow-sm"
        }`}
        style={isListening ? { boxShadow: "var(--listening-glow)" } : undefined}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={isListening ? onStopListening : onStartListening}
          className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors ${
            isListening
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
          disabled={isProcessing}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </motion.button>

        <input
          type="text"
          placeholder={isListening ? "Listening..." : "Ask a question about your data..."}
          value={displayText}
          onChange={(e) => !isListening && setTextInput(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={isListening}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-medium outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          disabled={!displayText.trim() || isProcessing}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
