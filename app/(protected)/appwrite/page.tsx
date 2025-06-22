"use client";
import React, { useState, useEffect } from 'react';
import { AppwriteException, ID, Models } from 'appwrite';
import { Upload, LogOut, User, File, Download, Trash2 } from 'lucide-react';

import { storage } from '@/lib/appwrite/config';
import { useAuth } from '@/contexts/auth-context';

const BUCKET_ID = '68492e610025406fb686'; // Replace with your bucket ID

const AppwriteAuthUpload = () => {
   const { user } = useAuth() 
  const [files, setFiles] = useState<Models.File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTime, setUploadTime] = useState<number | null>(null);
  const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
        loadFiles();
    }
}, [user]);

console.log({files})
  const loadFiles = async () => {
    try {
      const response = await storage.listFiles(BUCKET_ID);
      setFiles(response.files);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setError('');
    setUploadTime(null);
    const startTime = Date.now();

    try {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file,
        undefined,
        (progress) => {
          setUploadProgress(progress.progress);
        }
      );
      console.log('File uploaded:', response);
      await loadFiles(); // Refresh file list
      event.target.value = ''; // Clear input
      const endTime = Date.now();
      setUploadTime((endTime - startTime) / 1000);
    } catch (error: any) {
      setError('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileDownload = (fileId: string, fileName: string) => {
    const downloadUrl = storage.getFileDownload(BUCKET_ID, fileId);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
      await loadFiles(); // Refresh file list
    } catch (error: any) {
      setError('Delete failed: ' + error.message);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Files</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 font-medium hover:text-blue-500">
                Choose files to upload
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
                disabled={uploading}
              />
            </label>
            <p className="text-gray-500 mt-2">or drag and drop files here</p>
            {uploading && (
              <div className="mt-4 w-full">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
            {uploadTime !== null && !uploading && (
              <p className="text-sm text-green-600 mt-2">
                Upload finished in {uploadTime.toFixed(2)} seconds.
              </p>
            )}
          </div>
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Files List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your Files ({files.length})</h2>
          </div>
          {files.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <File className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No files uploaded yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {files.map((file) => (
                <div key={file.$id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.sizeOriginal)} • {new Date(file.$createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFileDownload(file.$id, file.name)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleFileDelete(file.$id)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppwriteAuthUpload;