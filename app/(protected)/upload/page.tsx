"use client";
import { UploadTabs, UploadQueue } from "@/features/documents/components";
import { useUploadManager } from "@/features/documents/hooks";

export default function UploadPage() {
  const {
    files,
    youtubeUrl,
    textContent,
    setYoutubeUrl,
    setTextContent,
    addFiles,
    removeFile,
    addYoutubeVideo,
    addTextContent,
  } = useUploadManager();
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
          Upload Content
        </h1>
        <p className='text-slate-600 dark:text-slate-400 mt-1'>
          Upload documents, add YouTube videos, or paste text to start learning
          with AI
        </p>
      </div>

      <UploadTabs
        youtubeUrl={youtubeUrl}
        textContent={textContent}
        onFilesAccepted={addFiles}
        onYoutubeUrlChange={setYoutubeUrl}
        onTextContentChange={setTextContent}
        onYoutubeSubmit={addYoutubeVideo}
        onTextSubmit={addTextContent}
      />

      <UploadQueue files={files} onRemoveFile={removeFile} />
    </div>
  );
}
