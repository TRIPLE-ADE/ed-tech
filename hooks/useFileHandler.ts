import { useRef, useState } from "react";
import { toast } from "sonner";
import { encodeFileAsBase64 } from "@/utils/fileEncoder";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const useFileHandler = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection from an input event.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    } else if (validFiles.length > 0) {
      toast.success("PDF file uploaded successfully");
      setFiles(validFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };

  /**
   * Clear the current file selection.
   */
  const clearFiles = () => {
    setFiles([]);
  };

  /**
   * Encode selected files to Base64 format.
   */
  const getEncodedFiles = async () => {
    return Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await encodeFileAsBase64(file),
      }))
    );
  };

  return { files, handleFileChange, clearFiles, getEncodedFiles, fileInputRef  };
};
