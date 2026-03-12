import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { QuerySidebar } from "@/components/QuerySidebar";
import { QueryInput } from "@/components/QueryInput";
import { ResultCard } from "@/components/ResultCard";
import { EmptyState } from "@/components/EmptyState";
import { ProcessingIndicator } from "@/components/ProcessingIndicator";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { executeQuery } from "@/lib/mockQueryEngine";
import { QueryResult } from "@/types/query";
import { toast } from "sonner";

const Index = () => {
  const [queries, setQueries] = useState<QueryResult[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingQuestion, setProcessingQuestion] = useState("");
  const resultsEndRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, startListening, stopListening, error } = useSpeechRecognition();

  useEffect(() => {
    if (error) {
      toast.error(`Speech recognition error: ${error}`);
    }
  }, [error]);

  const handleSubmit = async (text: string) => {
    setIsProcessing(true);
    setProcessingQuestion(text);

    try {
      const result = await executeQuery(text);
      setQueries((prev) => [result, ...prev]);
      setActiveId(result.id);
    } catch {
      toast.error("Failed to process query. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingQuestion("");
    }
  };

  const activeResult = activeId ? queries.find((q) => q.id === activeId) : queries[0];

  return (
    <div className="flex h-screen overflow-hidden">
      <QuerySidebar queries={queries} activeId={activeId} onSelect={setActiveId} />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8">
          {!isProcessing && queries.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="max-w-3xl mx-auto space-y-16">
              <AnimatePresence mode="wait">
                {isProcessing && (
                  <ProcessingIndicator key="processing" question={processingQuestion} />
                )}
              </AnimatePresence>

              {activeResult && !isProcessing && (
                <ResultCard key={activeResult.id} result={activeResult} />
              )}

              <div ref={resultsEndRef} />
            </div>
          )}
        </div>

        <QueryInput
          isListening={isListening}
          transcript={transcript}
          onStartListening={startListening}
          onStopListening={stopListening}
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
        />
      </main>
    </div>
  );
};

export default Index;
