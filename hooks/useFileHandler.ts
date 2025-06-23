import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

export const useFileHandler = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUris, setFileUris] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; uri: string; mimeType: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFileToBackend = async (file: File) => {
    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name}...`);
    const formData = new FormData();
    formData.append("file", file);

    const startTime = Date.now();

    try {
      const response = await axios.post("https://thryx-backend.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            toast.loading(`Uploading ${file.name} (${percent}%)`, { id: toastId });
          }
        },
      });

      const data = response.data;

      if (!data.metadata?.uri) {
        throw new Error("Invalid response format from server");
      }

      const fileMetadata = {
        name: file.name,
        uri: data.metadata.uri,
        mimeType: file.type,
      };

      setFileUris((prev) => [...prev, fileMetadata.uri]);
      setUploadedFiles((prev) => [...prev, fileMetadata]);

      toast.success(`${file.name} uploaded successfully`, { id: toastId });

      return fileMetadata;
    } catch (error: any) {
      toast.error(`Failed to upload ${file.name}: ${error.message || "Unknown error"}`, { id: toastId });
      throw error;
    } finally {
      const endTime = Date.now();
      const durationInSeconds = (endTime - startTime) / 1000;
      console.log(`Upload for ${file.name} took ${durationInSeconds.toFixed(2)} seconds.`);
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error(`Only PDF files under ${MAX_FILE_SIZE / (1024 * 1024)}MB are allowed.`);
    } else if (validFiles.length > 0) {
      toast.success("PDF file selected");

      const successfullyUploadedFiles: File[] = [];

      for (const file of validFiles) {
        try {
          console.log("Uploading file:", validFiles);
          await uploadFileToBackend(file);
          successfullyUploadedFiles.push(file);
        } catch {
          // Errors are already handled
          console.error("File upload failed:", file.name);
        }
      }

      if (successfullyUploadedFiles.length > 0) {
        setFiles(successfullyUploadedFiles);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setFileUris([]);
    setUploadedFiles([]);
  };

  return {
    files,
    fileUris,
    uploadedFiles,
    handleFileChange,
    clearFiles,
    fileInputRef,
    isUploading,
  };
};
