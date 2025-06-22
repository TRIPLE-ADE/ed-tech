"use client"
import { Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface YoutubeUploadTabProps {
  youtubeUrl: string
  onUrlChange: (url: string) => void
  onSubmit: () => void
}

export function YoutubeUploadTab({ youtubeUrl, onUrlChange, onSubmit }: YoutubeUploadTabProps) {
  return (
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
            onChange={(e) => onUrlChange(e.target.value)}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={!youtubeUrl}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <Video className="w-4 h-4 mr-2" />
          Process Video
        </Button>
      </CardContent>
    </Card>
  )
}
