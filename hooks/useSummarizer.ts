import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type EncodedFile = { name: string; type: string; data: string };

export const useSummarizer = () => {
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Reads and decodes a stream response in chunks,
   * updating the summary state periodically.
   */
  const summarizeFiles = async (encodedFiles: EncodedFile[]): Promise<void> => {
    setIsSummarizing(true);
    setSummary("");

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: encodedFiles }),
        signal,
      });

      if (!response.ok) {
        toast.error("Failed to generate summary.");
        throw new Error("Failed to generate summary.");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let lastUpdate = Date.now();
      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Accumulate the decoded chunk
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Throttle state updates: update summary every 300ms
        if (Date.now() - lastUpdate >= 400) {
          setSummary(accumulatedText);
          lastUpdate = Date.now();
        }
      }
      // Final flush: decode any remaining bytes
      accumulatedText += decoder.decode();
      setSummary(accumulatedText);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error summarizing document:", error);
        toast.error("Failed to generate summary.");
      }
    } finally {
      setIsSummarizing(false);
      abortControllerRef.current = null;
    }
  };

  const cancelSummarizing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsSummarizing(false);
      toast.error("PDF processing was cancelled");
    }
  }, []);

  const resetSummary = useCallback(() => {
    setSummary("");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Clean up the AbortController on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    summary,
    isSummarizing,
    summarizeFiles,
    resetSummary,
    cancelSummarizing,
  };
};
