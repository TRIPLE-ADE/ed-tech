"use client"

import { Upload, Brain, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickActionsPanelProps {
  onUploadDocument: () => void
  onGenerateQuiz: () => void
  onStartStudySession: () => void
}

export function QuickActionsPanel({ onUploadDocument, onGenerateQuiz, onStartStudySession }: QuickActionsPanelProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          onClick={onUploadDocument}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          onClick={onGenerateQuiz}
        >
          <Brain className="w-4 h-4 mr-2" />
          Generate Quiz
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          onClick={onStartStudySession}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Study Session
        </Button>
      </CardContent>
    </Card>
  )
}
