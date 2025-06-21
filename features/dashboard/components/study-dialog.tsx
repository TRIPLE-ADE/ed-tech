"use client"

import type React from "react"

import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Document, StudySession } from "../types"

interface StudyDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedDocument: Document | null
  onStartStudy: (session: Partial<StudySession>) => void
}

export function StudyDialog({ isOpen, onClose, selectedDocument, onStartStudy }: StudyDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const session: Partial<StudySession> = {
      documentId: selectedDocument?.id,
      duration: Number(formData.get("duration")) || 25,
      mode: (formData.get("mode") as StudySession["mode"]) || "practice",
      startTime: new Date(),
    }

    onStartStudy(session)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Study Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="study-source">Study Material</Label>
            <Input
              id="study-source"
              value={selectedDocument?.title || "Mixed content"}
              disabled
              className="bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div>
            <Label htmlFor="duration">Session Duration (minutes)</Label>
            <Input id="duration" name="duration" type="number" defaultValue="25" min="5" max="120" required />
          </div>
          <div>
            <Label htmlFor="mode">Study Mode</Label>
            <Select name="mode" defaultValue="practice">
              <SelectTrigger>
                <SelectValue placeholder="Select study mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="review">Review Mode</SelectItem>
                <SelectItem value="practice">Practice Questions</SelectItem>
                <SelectItem value="flashcards">Flashcards</SelectItem>
                <SelectItem value="summary">Summary Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Play className="w-4 h-4 mr-2" />
              Start Session
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
