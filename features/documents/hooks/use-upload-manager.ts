"use client";
import { useState, useCallback, useMemo } from "react";
import { ID } from "appwrite";
import { 
  DocumentStorageService, 
  YouTubeTranscriptService, 
  TextContentService,
  NotificationService 
} from "../services";
import type { 
  UploadedFile, 
  UploadManagerState, 
  UploadManagerActions,
  ProcessingStage 
} from "../types";
import { BUCKET_ID } from "@/lib/appwrite/config";

export function useUploadManager(): UploadManagerState & UploadManagerActions {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Computed properties
  const totalProgress = useMemo(() => {
    if (files.length === 0) return 0;
    const totalProgress = files.reduce((sum, file) => sum + file.progress, 0);
    return Math.round(totalProgress / files.length);
  }, [files]);
  // Helper function to update file state
  const updateFile = useCallback((fileId: string, updates: Partial<UploadedFile>) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, ...updates } : file
      )
    );
  }, []);

  // Helper function to update processing stage
  const updateProcessingStage = useCallback((
    fileId: string, 
    stage: ProcessingStage, 
    progress?: number
  ) => {
    updateFile(fileId, { 
      processingStage: stage,
      ...(progress !== undefined && { progress })
    });
  }, [updateFile]);

  /**
   * Upload file to Appwrite with progress tracking
   */
  const uploadFileToAppwrite = useCallback(
    async (file: File, fileId: string): Promise<void> => {
      try {
        updateProcessingStage(fileId, 'uploading', 0);
        NotificationService.fileUpload.start(file.name, fileId);

        const uploadedFile = await DocumentStorageService.uploadFile(file, {
          bucketId: BUCKET_ID,
          onProgress: (progress) => {
            updateFile(fileId, { progress: progress.progress });
            NotificationService.fileUpload.update(file.name, progress.progress, fileId);
          },
        });

        updateFile(fileId, {
          status: "completed",
          appwriteId: uploadedFile.$id,
          processingStage: 'completed',
          progress: 100
        });

        NotificationService.fileUpload.complete(file.name, fileId);
      } catch (error: any) {
        const errorMessage = error.message || "Upload failed";
        updateFile(fileId, {
          status: "error",
          error: errorMessage,
        });
        NotificationService.fileUpload.error(file.name, errorMessage, fileId);
        throw error;
      }
    },
    [updateFile, updateProcessingStage]
  );
  /**
   * Add multiple files for upload
   */
  const addFiles = useCallback(
    async (acceptedFiles: File[]): Promise<void> => {
      if (acceptedFiles.length === 0) return;

      setIsProcessing(true);
      setError("");

      // Validate files
      const validatedFiles = acceptedFiles.map(file => {
        const validation = DocumentStorageService.validateFile(file);
        return { file, validation };
      });

      const invalidFiles = validatedFiles.filter(({ validation }) => !validation.isValid);
      if (invalidFiles.length > 0) {
        const errorMessage = invalidFiles
          .map(({ file, validation }) => `${file.name}: ${validation.error}`)
          .join(', ');
        setError(errorMessage);
        NotificationService.error('Some files are invalid', { description: errorMessage });
        setIsProcessing(false);
        return;
      }

      // Create file entries
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: ID.unique(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
        processingStage: 'preparing',
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Upload files concurrently
      const uploadPromises = newFiles.map(async (uploadedFile) => {
        const actualFile = acceptedFiles.find(f => f.name === uploadedFile.name);
        if (!actualFile) return;

        try {
          await uploadFileToAppwrite(actualFile, uploadedFile.id);
        } catch (error: any) {
          console.error(`Failed to upload ${uploadedFile.name}:`, error);
          setError(prev => prev ? `${prev}\n${error.message}` : error.message);
        }
      });

      await Promise.allSettled(uploadPromises);
      setIsProcessing(false);
    },
    [uploadFileToAppwrite]
  );
  /**
   * Remove file from list and storage
   */
  const removeFile = useCallback(
    async (fileId: string): Promise<void> => {
      const file = files.find((f) => f.id === fileId);
      
      // Remove from local state first for immediate UI feedback
      setFiles((prev) => prev.filter((file) => file.id !== fileId));

      // Delete from Appwrite if uploaded
      if (file?.status === "completed" && file.appwriteId) {
        try {
          await DocumentStorageService.deleteFile(BUCKET_ID, file.appwriteId);
          NotificationService.success(`${file.name} deleted successfully`);
        } catch (error: any) {
          console.error("Failed to delete file from storage:", error);
          const errorMessage = `Failed to delete file: ${error.message}`;
          setError(errorMessage);
          NotificationService.error("Delete failed", { description: errorMessage });
        }
      }
    },
    [files]
  );
  /**
   * Add YouTube video transcript
   */
  const addYoutubeVideo = useCallback(async (): Promise<void> => {
    if (!youtubeUrl.trim()) return;

    // Validate URL
    const validation = YouTubeTranscriptService.validateUrl(youtubeUrl);
    if (!validation.isValid) {
      setError(validation.error!);
      NotificationService.error(validation.error!);
      return;
    }

    const fileId = ID.unique();
    setIsProcessing(true);
    setError("");

    // Create initial file entry
    const newFile: UploadedFile = {
      id: fileId,
      name: `YouTube Video: ${youtubeUrl}`,
      size: 0,
      type: "video/youtube",
      status: "processing",
      progress: 0,
      processingStage: 'validating',
      metadata: { videoId: validation.videoId }
    };

    setFiles((prev) => [...prev, newFile]);

    try {
      // Process YouTube video to file
      NotificationService.youtube.startProcessing(youtubeUrl, fileId);
      updateProcessingStage(fileId, 'fetching', 0);

      const result = await YouTubeTranscriptService.processYouTubeToFile(
        youtubeUrl,
        {
          onProcessingUpdate: (stage, progress) => {
            updateFile(fileId, { progress });
            NotificationService.youtube.updateProcessing(progress, stage, fileId);
          }
        }
      );

      // Update file with transcript metadata
      updateFile(fileId, {
        name: `YouTube Transcript: ${result.metadata.videoId}`,
        size: result.file.size,
        type: "text/plain",
        progress: 100,
        metadata: {
          ...result.metadata,
          wordCount: result.metadata.transcript.split(/\s+/).length,
          charCount: result.metadata.transcript.length
        }
      });

      NotificationService.youtube.processingComplete(fileId);

      // Start upload phase
      updateFile(fileId, { 
        status: "uploading", 
        progress: 0,
        processingStage: 'uploading'
      });

      NotificationService.youtube.startUpload(fileId);

      const uploadedFile = await DocumentStorageService.uploadFile(result.file, {
        bucketId: BUCKET_ID,
        onProgress: (progress) => {
          updateFile(fileId, { progress: progress.progress });
          NotificationService.youtube.updateUpload(progress.progress, fileId);
        },
      });

      // Upload complete
      updateFile(fileId, {
        status: "completed",
        appwriteId: uploadedFile.$id,
        processingStage: 'completed',
        progress: 100
      });

      NotificationService.youtube.uploadComplete(fileId);
      setYoutubeUrl("");

    } catch (error: any) {
      console.error("Failed to process YouTube video:", error);
      const errorMessage = error.message || "Failed to process YouTube video";

      updateFile(fileId, {
        status: "error",
        error: errorMessage,
      });

      NotificationService.youtube.error(errorMessage, fileId);
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [youtubeUrl, updateFile, updateProcessingStage]);
  /**
   * Add text content as file
   */
  const addTextContent = useCallback(async (): Promise<void> => {
    if (!textContent.trim()) return;

    // Validate content
    const validation = TextContentService.validateContent(textContent);
    if (!validation.isValid) {
      setError(validation.error!);
      NotificationService.error(validation.error!);
      return;
    }

    const fileId = ID.unique();
    setIsProcessing(true);
    setError("");

    try {
      // Process text to file
      const result = TextContentService.processTextToFile(textContent, {
        addTimestamp: true
      });

      // Create file entry
      const newFile: UploadedFile = {
        id: fileId,
        name: result.file.name,
        size: result.file.size,
        type: "text/plain",
        status: "uploading",
        progress: 0,
        processingStage: 'uploading',
        metadata: {
          wordCount: result.stats.wordCount,
          charCount: result.stats.charCount
        }
      };

      setFiles((prev) => [...prev, newFile]);

      // Start upload
      NotificationService.textContent.startUpload(fileId);

      const uploadedFile = await DocumentStorageService.uploadFile(result.file, {
        bucketId: BUCKET_ID,
        onProgress: (progress) => {
          updateFile(fileId, { progress: progress.progress });
          NotificationService.textContent.updateUpload(progress.progress, fileId);
        },
      });

      // Upload complete
      updateFile(fileId, {
        status: "completed",
        appwriteId: uploadedFile.$id,
        processingStage: 'completed',
        progress: 100
      });

      NotificationService.textContent.uploadComplete(fileId);
      setTextContent("");

    } catch (error: any) {
      console.error("Failed to process text content:", error);
      const errorMessage = error.message || "Failed to process text content";

      if (files.find(f => f.id === fileId)) {
        updateFile(fileId, {
          status: "error",
          error: errorMessage,
        });
      }

      NotificationService.textContent.error(errorMessage, fileId);
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [textContent, updateFile, files]);
  /**
   * Clear all files
   */
  const clearAll = useCallback((): void => {
    setFiles([]);
    setError("");
    setYoutubeUrl("");
    setTextContent("");
    setIsProcessing(false);
  }, []);

  /**
   * Retry failed upload
   */
  const retry = useCallback(async (fileId: string): Promise<void> => {
    const file = files.find(f => f.id === fileId);
    if (!file || file.status !== 'error') return;

    // Reset file status
    updateFile(fileId, { 
      status: 'uploading', 
      progress: 0, 
      error: undefined,
      processingStage: 'uploading'
    });

    // TODO: Implement retry logic based on file type
    // This would require storing original file data or re-processing
    NotificationService.info(`Retry functionality for ${file.name} not yet implemented`);
  }, [files, updateFile]);

  return {
    // State
    files,
    youtubeUrl,
    textContent,
    error,
    isProcessing,
    totalProgress,
    
    // Actions
    setYoutubeUrl,
    setTextContent,
    setError,
    addFiles,
    removeFile,
    addYoutubeVideo,
    addTextContent,
    clearAll,
    retry,
  };
}
