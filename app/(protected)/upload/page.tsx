"use client"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Video, Link, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [textContent, setTextContent] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024, 
  })

  const simulateUpload = (fileId: string) => {
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
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleYoutubeSubmit = () => {
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
  }

  const handleTextSubmit = () => {
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
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploading":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Uploading</Badge>
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Processing</Badge>
        )
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Completed</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Error</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Upload Content</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Upload documents, add YouTube videos, or paste text to start learning with AI
        </p>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 gap-1">
          <TabsTrigger value="files" className="flex items-center gap-2 ">
            <FileText className="w-4 h-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="youtube" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files">
          <Card className="border-slate-200 dark:border-slate-700">
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
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {isDragActive ? "Drop files here" : "Upload your documents"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Supports PDF, DOC, DOCX, TXT files up to 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Add YouTube Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="youtube-url">YouTube URL</Label>
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
              <Button
                onClick={handleYoutubeSubmit}
                disabled={!youtubeUrl}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Video className="w-4 h-4 mr-2" />
                Process Video
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Add Text Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="text-content">Text Content</Label>
                <Textarea
                  id="text-content"
                  placeholder="Paste your text content here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={8}
                />
              </div>
              <Button
                onClick={handleTextSubmit}
                disabled={!textContent.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Process Text
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Queue */}
      {files.length > 0 && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Upload Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">{file.name}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(file.status)}
                      <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} className="flex-shrink-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span>{formatFileSize(file.size)}</span>
                    {file.status === "uploading" && <span>{file.progress}%</span>}
                  </div>
                  {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
                  {file.error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{file.error}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
