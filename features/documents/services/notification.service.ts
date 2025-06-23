import { toast } from "sonner";

export interface NotificationOptions {
  id?: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}
export interface ProgressNotificationOptions extends NotificationOptions {
  progress: number;
  stage?: string;
}

export class NotificationService {
  
  /**   * Show success notification   */ 
  static success(
    message: string,
    options?: NotificationOptions
  ): string | number {
    return toast.success(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }
  
  /**   * Show error notification   */ 
  static error(
    message: string,
    options?: NotificationOptions
  ): string | number {
    return toast.error(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }

  /**
   * Show loading notification
   */
  static loading(
    message: string,
    options?: NotificationOptions
  ): string | number {
    return toast.loading(message, {
      id: options?.id,
      description: options?.description,
    });
  }

  /**
   * Show info notification
   */
  static info(message: string, options?: NotificationOptions): string | number {
    return toast.info(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }

  /**
   * Show warning notification
   */
  static warning(
    message: string,
    options?: NotificationOptions
  ): string | number {
    return toast.warning(message, {
      id: options?.id,
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }

  /**
   * Dismiss a notification
   */
  static dismiss(id?: string | number): void {
    toast.dismiss(id);
  }

  /**
   * Update a progress notification
   */
  static updateProgress(
    id: string | number,
    message: string,
    options: ProgressNotificationOptions
  ): void {
    const description = options.stage
      ? `${options.progress}% - ${options.stage}`
      : `${options.progress}%`;

    toast.loading(message, {
      id,
      description,
    });
  }

  /**
   * Show file upload progress
   */
  static showUploadProgress(
    filename: string,
    progress: number,
    id?: string | number
  ): string | number {
    const toastId = id || `upload-${filename}`;

    return toast.loading(`Uploading ${filename}`, {
      id: toastId,
      description: `${progress}% complete`,
    });
  }

  /**
   * Show file processing progress
   */
  static showProcessingProgress(
    filename: string,
    progress: number,
    stage?: string,
    id?: string | number
  ): string | number {
    const toastId = id || `processing-${filename}`;
    const description = stage
      ? `${progress}% - ${stage}`
      : `${progress}% complete`;

    return toast.loading(`Processing ${filename}`, {
      id: toastId,
      description,
    });
  }

  /**
   * Convert upload progress to success
   */
  static uploadSuccess(
    filename: string,
    id?: string | number,
    description?: string
  ): void {
    this.success(`${filename} uploaded successfully`, {
      id: id?.toString(),
      description: description || "Upload complete",
    });
  }

  /**
   * Convert processing to success
   */
  static processingSuccess(
    filename: string,
    id?: string | number,
    description?: string
  ): void {
    this.success(`${filename} processed successfully`, {
      id: id?.toString(),
      description: description || "Processing complete",
    });
  }

  /**
   * Show upload error
   */
  static uploadError(
    filename: string,
    error: string,
    id?: string | number
  ): void {
    this.error(`Failed to upload ${filename}`, {
      id: id?.toString(),
      description: error,
    });
  }

  /**
   * Show processing error
   */
  static processingError(
    filename: string,
    error: string,
    id?: string | number
  ): void {
    this.error(`Failed to process ${filename}`, {
      id: id?.toString(),
      description: error,
    });
  }

  /**
   * Show YouTube video processing notifications
   */
  static youtube = {
    startProcessing: (url: string, id: string) => {
      return NotificationService.loading("Processing YouTube video...", {
        id,
        description: "0% - Fetching transcript",
      });
    },

    updateProcessing: (progress: number, stage: string, id: string) => {
      NotificationService.updateProgress(id, "Processing YouTube video...", {
        progress,
        stage,
      });
    },

    processingComplete: (id: string) => {
      NotificationService.success("Transcript fetched successfully!", {
        id,
        description: "Processing complete",
      });
    },

    startUpload: (id: string) => {
      toast.loading("Uploading transcript to storage...", {
        id,
        description: "0% - Starting upload",
      });
    },

    updateUpload: (progress: number, id: string) => {
      toast.loading("Uploading transcript to storage...", {
        id,
        description: `${progress}% - Uploading to cloud`,
      });
    },

    uploadComplete: (id: string) => {
      NotificationService.success("YouTube transcript saved successfully!", {
        id,
        description: "Upload complete",
      });
    },

    error: (error: string, id: string) => {
      NotificationService.error(`Failed to process YouTube video: ${error}`, {
        id,
      });
    },
  };

  /**
   * Show text content notifications
   */
  static textContent = {
    startUpload: (id: string) => {
      return NotificationService.loading(
        "Uploading text content to storage...",
        {
          id,
          description: "0% - Starting upload",
        }
      );
    },

    updateUpload: (progress: number, id: string) => {
      toast.loading("Uploading text content to storage...", {
        id,
        description: `${progress}% - Uploading to cloud`,
      });
    },

    uploadComplete: (id: string) => {
      NotificationService.success("Text content saved successfully!", {
        id,
        description: "Upload complete",
      });
    },

    error: (error: string, id: string) => {
      NotificationService.error(`Failed to process text content: ${error}`, {
        id,
      });
    },
  };

  /**
   * Show file upload notifications
   */
  static fileUpload = {
    start: (filename: string, id: string) => {
      return NotificationService.loading(`Uploading ${filename}`, {
        id,
        description: "0%",
      });
    },

    update: (filename: string, progress: number, id: string) => {
      toast.loading(`Uploading ${filename}`, {
        id,
        description: `${progress}%`,
      });
    },

    complete: (filename: string, id: string) => {
      NotificationService.success(`${filename} uploaded successfully`, {
        id,
      });
    },

    error: (filename: string, error: string, id: string) => {
      NotificationService.error(`Failed to upload ${filename}`, {
        id,
        description: error,
      });
    },
  };
}
