import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useSummarizer = () => {
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Summarizes a file using its metadata (URI)
   * Sends a POST request to the backend and streams the response to update the summary state.
   */
  const summarizeFiles = async (fileMetadata: { name: string; uri: string; mimeType: string }): Promise<void> => {
    setIsSummarizing(true);
    setSummary("");

    // Abort any ongoing request before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Send the file metadata to the backend for summarization
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileMetadata }),
        signal,
      });

      if (!response.ok) {
        toast.error("Failed to generate summary.");
        throw new Error("Failed to generate summary.");
      }

      // Stream the response and update the summary state incrementally
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let lastUpdate = Date.now();
      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Update the summary state every 400ms to avoid excessive re-renders
        if (Date.now() - lastUpdate >= 400) {
          setSummary(accumulatedText);
          lastUpdate = Date.now();
        }
      }
      // Final update to the summary state after streaming is complete
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

  /**
   * Cancels the ongoing summarization process
   * Aborts the fetch request and resets the summarizing state.
   */
  const cancelSummarizing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsSummarizing(false);
      toast.error("PDF processing was cancelled");
    }
  }, []);

  /**
   * Resets the summary state and aborts any ongoing requests
   */
  const resetSummary = useCallback(() => {
    setSummary("");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cleanup function to abort any ongoing requests when the component unmounts
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