"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadQueueItem } from "./UploadQueueItem"
import type { UploadedFile } from "../types"

interface UploadQueueProps {
  files: UploadedFile[]
  onRemoveFile: (fileId: string) => void
}

export function UploadQueue({ files, onRemoveFile }: UploadQueueProps) {
  if (files.length === 0) return null

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle>Upload Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.map((file) => (
          <UploadQueueItem key={file.id} file={file} onRemove={onRemoveFile} />
        ))}
      </CardContent>
    </Card>
  )
}
