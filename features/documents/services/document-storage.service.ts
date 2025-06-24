import { ID, Models, AppwriteException, Permission, Role } from "appwrite";
import { storage } from "@/lib/appwrite/config";
import { FileListOptions, FileUploadOptions } from "../types";

export class DocumentStorageService {
  /**
   * Upload a file to Appwrite storage
   */
  static async uploadFile(
    file: File,
    options: FileUploadOptions,
    userId?: string
  ): Promise<Models.File> {
    try {
      const fileId = options.fileId || ID.unique();

      //  Set default permissions if none provided and user ID is available
      let permissions = options.permissions;
      if (!permissions && userId) {
        permissions = this.createUserPermissions(userId);
      }

      const response = await storage.createFile(
        options.bucketId,
        fileId,
        file,
        options.permissions,
        options.onProgress
      );

      return response;
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      throw new Error("Upload failed: Unknown error");
    }
  }

  /**
   * Get a list of files from a bucket
   */
  static async listFiles(options: FileListOptions): Promise<Models.FileList> {
    try {
      const response = await storage.listFiles(
        options.bucketId,
        options.queries,
        options.search
      );

      return response;
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(`Failed to load files: ${error.message}`);
      }
      throw new Error("Failed to load files: Unknown error");
    }
  }

  /**
   * Get a specific file by ID
   */
  static async getFile(bucketId: string, fileId: string): Promise<Models.File> {
    try {
      const response = await storage.getFile(bucketId, fileId);
      return response;
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(`Failed to get file: ${error.message}`);
      }
      throw new Error("Failed to get file: Unknown error");
    }
  }

  /**
   * Delete a file from storage
   */
  static async deleteFile(bucketId: string, fileId: string): Promise<void> {
    try {
      await storage.deleteFile(bucketId, fileId);
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(`Delete failed: ${error.message}`);
      }
      throw new Error("Delete failed: Unknown error");
    }
  }

  /**
   * Get download URL for a file
   */
  static getFileDownload(bucketId: string, fileId: string): string {
    return storage.getFileDownload(bucketId, fileId);
  }

  /**
   * Get preview URL for a file (for images, PDFs, etc.)
   */
  static getFilePreview(
    bucketId: string,
    fileId: string,
    width?: number,
    height?: number,
    quality?: number
  ): string {
    return storage.getFilePreview(
      bucketId,
      fileId,
      width,
      height,
      undefined,
      quality
    );
  }

  /**
   * Get file view URL (opens file in browser)
   */
  static getFileView(bucketId: string, fileId: string): string {
    return storage.getFileView(bucketId, fileId);
  }

  /**
   * Update file metadata (name, permissions)
   */
  static async updateFile(
    bucketId: string,
    fileId: string,
    name?: string,
    permissions?: string[]
  ): Promise<Models.File> {
    try {
      const response = await storage.updateFile(
        bucketId,
        fileId,
        name,
        permissions
      );
      return response;
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw new Error(`Update failed: ${error.message}`);
      }
      throw new Error("Update failed: Unknown error");
    }
  }

  /**
   * Format file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + "" + sizes[i];
  }

  /**
   * Get file type icon based on file extension or MIME type
   */
  static getFileTypeIcon(file: Models.File): string {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const mimeType = file.mimeType.toLowerCase();

    if (mimeType.startsWith("image/")) return "🖼️";
    if (mimeType.includes("pdf")) return "📄";
    if (
      mimeType.includes("word") ||
      extension === "doc" ||
      extension === "docx"
    )
      return "📝";
    if (
      mimeType.includes("excel") ||
      extension === "xls" ||
      extension === "xlsx"
    )
      return "📊";
    if (
      mimeType.includes("powerpoint") ||
      extension === "ppt" ||
      extension === "pptx"
    )
      return "📽️";
    if (mimeType.startsWith("video/")) return "🎥";
    if (mimeType.startsWith("audio/")) return "🎵";
    if (mimeType.includes("zip") || mimeType.includes("rar")) return "🗜️";
    if (mimeType.includes("text/")) return "📃";

    return "📁";
  }

  /** * Create user-specific permissions for file access
   */
  static createUserPermissions(userId: string): string[] {
    return [
      Permission.read(Role.user(userId)), // Only this user can read
      Permission.update(Role.user(userId)), // Only this user can update
      Permission.delete(Role.user(userId)), // Only this user can delete
    ];
  }

  /**
   * Create public read permissions with user-specific write access
   */
  static createPublicReadUserWritePermissions(userId: string): string[] {
    return [
      Permission.read(Role.any()), // Anyone can read
      Permission.update(Role.user(userId)), // Only this user can update
      Permission.delete(Role.user(userId)), // Only this user can delete
    ];
  }
}
