// components/SummaryView.tsx
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CopyIcon, FileText } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { useClipboard } from "@/hooks";
import { motion } from "framer-motion";

interface SummaryViewProps {
  summary: string;
  onClear: () => void;
}

const Summary: React.FC<SummaryViewProps> = ({ summary, onClear }) => {
  const { copied, handleCopy } = useClipboard();
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom (dummy element) whenever the summary updates
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [summary]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full p-6 bg-background border rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Document Summary</h1>
          <Button variant="ghost" size="sm" onClick={() => handleCopy(summary)}>
            {copied ? (
              <>
                Copied! <CheckCircle2 className="h-4 w-4 text-green-500" />
              </>
            ) : (
              <>
                Copy <CopyIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Markdown>{summary}</Markdown>
          {/* Dummy element to scroll into view */}
          <div ref={endRef} />
        </motion.div>
      </div>
      <Button onClick={onClear} className="mt-8">
        <FileText className="mr-2" /> Try Another PDF
      </Button>
    </div>
  );
};

export default Summary;
