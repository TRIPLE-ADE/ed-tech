import { useState } from "react";
import { toast } from "sonner";

export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Succesfully copied text to clipboard!");

      setTimeout(() => setCopied(false), timeout);
    } catch (error) {
      toast.error("Failed to copy text!");
      console.error("Clipboard copy error:", error);
    }
  };

  return { copied, handleCopy };
};
