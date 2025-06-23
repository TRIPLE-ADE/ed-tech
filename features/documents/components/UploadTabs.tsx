"use client"
import { FileText, Video, Link } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploadTab } from "./FileUploadTab"
import { YoutubeUploadTab } from "./YoutubeUploadTab"
import { TextUploadTab } from "./TextUploadTab"

interface UploadTabsProps {
  youtubeUrl: string
  textContent: string
  onFilesAccepted: (files: File[]) => void
  onYoutubeUrlChange: (url: string) => void
  onTextContentChange: (text: string) => void
  onYoutubeSubmit: () => void
  onTextSubmit: () => void
}

export function UploadTabs({
  youtubeUrl,
  textContent,
  onFilesAccepted,
  onYoutubeUrlChange,
  onTextContentChange,
  onYoutubeSubmit,
  onTextSubmit,
}: UploadTabsProps) {
  return (
    <Tabs defaultValue="files" className="space-y-1">
      <TabsList className="grid w-full grid-cols-3 gap-1">
        <TabsTrigger value="files" className="flex items-center gap-2">
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
        <FileUploadTab onFilesAccepted={onFilesAccepted} />
      </TabsContent>

      <TabsContent value="youtube">
        <YoutubeUploadTab
          youtubeUrl={youtubeUrl}
          onUrlChange={onYoutubeUrlChange}
          onSubmit={onYoutubeSubmit}
        />
      </TabsContent>

      <TabsContent value="text">
        <TextUploadTab
          textContent={textContent}
          onTextChange={onTextContentChange}
          onSubmit={onTextSubmit}
        />
      </TabsContent>
    </Tabs>
  )
}
