"use client"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { getStatusIcon, getStatusBadge } from "../utils/status"
import type { UploadedFile } from "../types"
import { DocumentStorageService } from "../services"


interface UploadQueueItemProps {
  file: UploadedFile
  onRemove: (fileId: string) => void
}

export function UploadQueueItem({ file, onRemove }: UploadQueueItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex-shrink-0">{getStatusIcon(file.status)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">{file.name}</h3>
          <div className="flex items-center gap-2">
            {getStatusBadge(file.status)}
            <Button variant="ghost" size="icon" onClick={() => onRemove(file.id)} className="flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
          <span>{DocumentStorageService.formatFileSize(file.size)}</span>
          {file.status === "uploading" && <span>{file.progress}%</span>}
        </div>
        {file.status === "uploading" && <Progress value={file.progress} className="h-2" />}
        {file.error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{file.error}</p>}
      </div>
    </div>
  )
}
