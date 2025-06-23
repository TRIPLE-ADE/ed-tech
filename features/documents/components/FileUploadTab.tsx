"use client";
import { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatFileSize } from "../utils";

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 10 MB

interface FileUploadTabProps {
  onFilesAccepted: (files: File[]) => void;
}

export function FileUploadTab({ onFilesAccepted }: FileUploadTabProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAccepted(acceptedFiles);
    },
    [onFilesAccepted]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        let errorMessage = error.message;

        if (error.code === "file-too-large") {
          const fileSize = formatFileSize(file.size);
          const maxSize = formatFileSize(MAX_FILE_SIZE);

          errorMessage = `File size (${fileSize}) exceeds the maximum limit of ${maxSize}`;
        }

        toast.error(`${file.name}: ${errorMessage}`);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <Card className='border-slate-200 dark:border-slate-700'>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className='w-12 h-12 text-slate-400 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2'>
            {isDragActive ? "Drop files here" : "Upload your documents"}
          </h3>
          <p className='text-slate-600 dark:text-slate-400 mb-4'>
            Drag and drop files here, or click to browse
          </p>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Supports PDF, DOC, DOCX, TXT files up to 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
