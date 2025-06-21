"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Document, QuizConfig, StudySession } from "../types"

export function useQuickActions() {
  const router = useRouter()
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)
  const [isStudyDialogOpen, setIsStudyDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const uploadDocument = () => {
    router.push("/dashboard/upload")
  }

  const generateQuiz = (document?: Document) => {
    if (document) {
      setSelectedDocument(document)
    }
    setIsQuizDialogOpen(true)
  }

  const startStudySession = (document?: Document) => {
    if (document) {
      setSelectedDocument(document)
    }
    setIsStudyDialogOpen(true)
  }

  const continueLearning = (documents: Document[]) => {
    const recentDoc = documents.find((doc) => doc.status === "processed")
    if (recentDoc) {
      startStudySession(recentDoc)
    } else {
      toast.error("No documents ready", {
        description: "Upload and process a document first to start learning",
        action: {
          label: "Upload",
          onClick: () => router.push("/dashboard/upload"),
        },
      })
    }
  }

  const createQuiz = (config: QuizConfig) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve(config), 1500)
      }),
      {
        loading: "Generating quiz...",
        success: `Quiz generated with ${config.questionCount} questions`,
        error: "Failed to generate quiz",
      },
    )

    setIsQuizDialogOpen(false)
    setTimeout(() => {
      router.push("/dashboard/quiz/new")
    }, 1500)
  }

  const startStudy = (session: Partial<StudySession>) => {
    toast.success("Study session started", {
      description: `Starting ${session.duration}-minute ${session.mode} session`,
    })

    setIsStudyDialogOpen(false)
    router.push("/dashboard/study/session")
  }

  return {
    // Actions
    uploadDocument,
    generateQuiz,
    startStudySession,
    continueLearning,
    createQuiz,
    startStudy,

    // State
    isQuizDialogOpen,
    setIsQuizDialogOpen,
    isStudyDialogOpen,
    setIsStudyDialogOpen,
    selectedDocument,
    setSelectedDocument,
  }
}
