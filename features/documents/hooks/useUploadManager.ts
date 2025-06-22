"use client"
import { useState, useCallback } from "react"
import type { UploadedFile } from "../types"

export function useUploadManager() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [textContent, setTextContent] = useState("")

  const simulateUpload = useCallback((fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + 10 }
            } else if (file.status === "uploading") {
              return { ...file, status: "processing" }
            } else if (file.status === "processing") {
              // Simulate random completion or error
              const success = Math.random() > 0.2 // 80% success rate
              return {
                ...file,
                status: success ? "completed" : "error",
                error: success ? undefined : "Failed to process document",
              }
            }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 6000)
  }, [])

  const addFiles = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }, [simulateUpload])

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }, [])

  const addYoutubeVideo = useCallback(() => {
    if (!youtubeUrl) return

    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: `YouTube Video: ${youtubeUrl}`,
      size: 0,
      type: "video/youtube",
      status: "processing",
      progress: 100,
    }

    setFiles((prev) => [...prev, newFile])
    setYoutubeUrl("")

    // Simulate processing
    setTimeout(() => {
      setFiles((prev) => prev.map((file) => (file.id === newFile.id ? { ...file, status: "completed" } : file)))
    }, 3000)
  }, [youtubeUrl])

  const addTextContent = useCallback(() => {
    if (!textContent.trim()) return

    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Text Content (${textContent.slice(0, 30)}...)`,
      size: textContent.length,
      type: "text/plain",
      status: "processing",
      progress: 100,
    }

    setFiles((prev) => [...prev, newFile])
    setTextContent("")

    // Simulate processing
    setTimeout(() => {
      setFiles((prev) => prev.map((file) => (file.id === newFile.id ? { ...file, status: "completed" } : file)))
    }, 2000)
  }, [textContent])

  return {
    files,
    youtubeUrl,
    textContent,
    setYoutubeUrl,
    setTextContent,
    addFiles,
    removeFile,
    addYoutubeVideo,
    addTextContent,
  }
}
