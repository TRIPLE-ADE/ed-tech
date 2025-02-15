"use client";

import React from "react";
import { FileUp, FileText, CheckCircle2 } from "lucide-react";

export interface FileUploadAreaProps {
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef : React.RefObject<HTMLInputElement | null>;
}

const FileUpload: React.FC<FileUploadAreaProps> = ({
  files,
  handleFileChange,
  fileInputRef 
}) => {
  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50`}
      >
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="application/pdf"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
        <p
          className="text-sm text-muted-foreground text-center truncate block"
          style={{ maxWidth: "calc(100% - 3rem)" }}
        >
          {files.length > 0 ? (
            <span className="font-medium text-foreground">{files[0].name}</span>
          ) : (
            <>
              <span className="block">Drag & drop a PDF file here, or click to select.</span>
              <span>Max file size: 2MB</span>
            </>
          )}
        </p>
      </div>
      {files.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
          <span className="font-medium text-green-800 dark:text-green-200 w-3/4 block truncate">
            {files[0].name}
          </span>
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      )}
    </>
  );
};

export default FileUpload;
