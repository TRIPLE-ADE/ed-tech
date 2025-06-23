import {  UploadProgress } from 'appwrite';

export type FileStatus = 'uploading' | 'processing' | 'completed' | 'error';

export type ProcessingStage = 
  | 'validating'
  | 'connecting'
  | 'fetching'
  | 'processing'
  | 'preparing'
  | 'uploading'
  | 'completed';

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: FileStatus
  progress: number
  error?: string
  appwriteId?: string
  processingStage?: ProcessingStage
  metadata?: {
    wordCount?: number
    charCount?: number
    videoId?: string
    title?: string
    duration?: number
  }
}

export interface FileUploadOptions {
  bucketId: string;
  fileId?: string;
  permissions?: string[];
  onProgress?: (progress: UploadProgress) => void;
}

export interface FileListOptions {
  bucketId: string;
  queries?: string[];
  search?: string;
}

export interface UploadManagerState {
  files: UploadedFile[];
  youtubeUrl: string;
  textContent: string;
  error: string;
  isProcessing: boolean;
  totalProgress: number;
}

export interface UploadManagerActions {
  setYoutubeUrl: (url: string) => void;
  setTextContent: (content: string) => void;
  setError: (error: string) => void;
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (fileId: string) => Promise<void>;
  addYoutubeVideo: () => Promise<void>;
  addTextContent: () => Promise<void>;
  clearAll: () => void;
  retry: (fileId: string) => Promise<void>;
}