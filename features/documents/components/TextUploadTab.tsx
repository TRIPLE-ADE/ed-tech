"use client"
import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TextUploadTabProps {
  textContent: string
  onTextChange: (text: string) => void
  onSubmit: () => void
}

export function TextUploadTab({ textContent, onTextChange, onSubmit }: TextUploadTabProps) {
  return (
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
            onChange={(e) => onTextChange(e.target.value)}
            rows={8}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={!textContent.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Process Text
        </Button>
      </CardContent>
    </Card>
  )
}
