// import { useRef, useState } from "react";
// import { toast } from "sonner";
// import { encodeFileAsBase64 } from "@/utils/fileEncoder";

// const MAX_FILE_SIZE = 20 * 1024 * 1024; // 2MB

// export const useFileHandler = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   /**
//    * Handle file selection from an input event.
//    */
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const validFiles = selectedFiles.filter(
//       (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
//     );

//     if (validFiles.length !== selectedFiles.length) {
//       toast.error("Only PDF files under 2MB are allowed.");
//     } else if (validFiles.length > 0) {
//       toast.success("PDF file uploaded successfully");
//       setFiles(validFiles);
//     }

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//   };

//   /**
//    * Clear the current file selection.
//    */
//   const clearFiles = () => {
//     setFiles([]);
//   };

//   /**
//    * Encode selected files to Base64 format.
//    */
//   const getEncodedFiles = async () => {
//     return Promise.all(
//       files.map(async (file) => ({
//         name: file.name,
//         type: file.type,
//         data: await encodeFileAsBase64(file),
//       }))
//     );
//   };

//   return { files, handleFileChange, clearFiles, getEncodedFiles, fileInputRef  };
// };


// import { useRef, useState } from "react";
// import { toast } from "sonner";

// export const useFileHandler = () => {

//   const [files, setFiles] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Increase max file size to 30MB
//   const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

//   /**
//    * Handle file selection from an input event.
//    */
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const validFiles = selectedFiles.filter(
//       (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
//     );

//     if (validFiles.length !== selectedFiles.length) {
//       // Check which constraint failed
//       const oversizedFiles = selectedFiles.filter(file => file.type === "application/pdf" && file.size > MAX_FILE_SIZE);
//       const nonPdfFiles = selectedFiles.filter(file => file.type !== "application/pdf");
      
//       if (oversizedFiles.length > 0) {
//         toast.error(`Files must be under 30MB. Found ${oversizedFiles.length} oversized files.`);
//       }
      
//       if (nonPdfFiles.length > 0) {
//         toast.error(`Only PDF files are allowed. Found ${nonPdfFiles.length} non-PDF files.`);
//       }
//     } else if (validFiles.length > 0) {
//       toast.success(`${validFiles.length} PDF file(s) uploaded successfully`);
//       setFiles(validFiles);
//     }

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   /**
//    * Clear the current file selection.
//    */
//   const clearFiles = () => {
//     setFiles([]);
//   };

//   /**
//    * Get the selected files for submission.
//    */
//   const getFiles = () => {
//     return files.map(file => ({
//       name: file.name,
//       type: file.type,
//       file: file, // Return the actual File object
//     }));
//   };

//   return { files, handleFileChange, clearFiles, getFiles, fileInputRef };
// };


// useFileHandler.ts - Modified to handle direct uploads to backend
import { useRef, useState } from "react";
import { toast } from "sonner";

// Increased to 30MB
const MAX_FILE_SIZE = 30 * 1024 * 1024; 

export const useFileHandler = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUris, setFileUris] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, uri: string, mimeType: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Upload a file to the backend immediately after selection
   */
  const uploadFileToBackend = async (file: File) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Show toast for upload start
      const toastId = toast.loading(`Uploading ${file.name}...`);
      
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate the response has the expected structure
      if (!data.metadata?.uri) {
        throw new Error('Invalid response format from server');
      }
      
      const fileMetadata = {
        name: file.name,
        uri: data.metadata.uri,
        mimeType: file.type
      };
      
      setFileUris(prev => [...prev, fileMetadata.uri]);
      setUploadedFiles(prev => [...prev, fileMetadata]);
      
      // Update toast to show success
      toast.success(`${file.name} uploaded successfully`, {
        id: toastId
      });
      
      return fileMetadata;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handle file selection from an input event.
   * Now also uploads the file immediately.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= MAX_FILE_SIZE
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error(`Only PDF files under ${MAX_FILE_SIZE / (1024 * 1024)}MB are allowed.`);
    } else if (validFiles.length > 0) {
      toast.success("PDF file selected");
      
      // Only add successfully uploaded files
      const successfullyUploadedFiles: File[] = [];
      
      // Upload each file immediately
      for (const file of validFiles) {
        try {
          await uploadFileToBackend(file);
          successfullyUploadedFiles.push(file);
        } catch (error) {
          // Error is already handled in uploadFileToBackend
          console.error("File upload failed:", file.name);
        }
      }
      
      // Only set files that were successfully uploaded
      if (successfullyUploadedFiles.length > 0) {
        setFiles(successfullyUploadedFiles);
      }
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
    isUploading
  };
};