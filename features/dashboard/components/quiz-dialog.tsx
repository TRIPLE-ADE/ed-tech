"use client"

import type React from "react"

import { Brain } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Document, QuizConfig } from "../types"

interface QuizDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedDocument: Document | null
  onCreateQuiz: (config: QuizConfig) => void
}

export function QuizDialog({ isOpen, onClose, selectedDocument, onCreateQuiz }: QuizDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const config: QuizConfig = {
      documentId: selectedDocument?.id,
      questionCount: Number(formData.get("questionCount")) || 10,
      difficulty: (formData.get("difficulty") as QuizConfig["difficulty"]) || "medium",
    }

    onCreateQuiz(config)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="quiz-source">Source Document</Label>
            <Input
              id="quiz-source"
              value={selectedDocument?.title || "All recent documents"}
              disabled
              className="bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div>
            <Label htmlFor="questionCount">Number of Questions</Label>
            <Input id="questionCount" name="questionCount" type="number" defaultValue="10" min="5" max="50" required />
          </div>
          <div>
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select name="difficulty" defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Brain className="w-4 h-4 mr-2" />
              Generate Quiz
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
