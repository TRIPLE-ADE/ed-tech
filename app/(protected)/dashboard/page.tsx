"use client"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data"
import { useDocumentActions } from "@/features/dashboard/hooks/use-document-actions"
import { useQuickActions } from "@/features/dashboard/hooks/use-quick-actions"
import { StatsGrid } from "@/features/dashboard/components/stats-grid"
import { RecentDocuments } from "@/features/dashboard/components/recent-documents"
import { QuickActionsPanel } from "@/features/dashboard/components/quick-actions-panel"
import { LearningGoals } from "@/features/dashboard/components/learning-goals"
import { AchievementsSection } from "@/features/dashboard/components/achievements-section"
import { QuizDialog } from "@/features/dashboard/components/quiz-dialog"
import { StudyDialog } from "@/features/dashboard/components/study-dialog"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { documents, learningGoals, achievements, isLoading, setDocuments } = useDashboardData()
  const { viewDocument, downloadDocument, shareDocument, deleteDocument } = useDocumentActions()
  const {
    uploadDocument,
    generateQuiz,
    startStudySession,
    continueLearning,
    createQuiz,
    startStudy,
    isQuizDialogOpen,
    setIsQuizDialogOpen,
    isStudyDialogOpen,
    setIsStudyDialogOpen,
    selectedDocument,
  } = useQuickActions()

  // Calculate stats from documents
  const stats = {
    documentsCount: documents.filter((doc) => doc.status === "processed").length,
    questionsCount: documents.reduce((sum, doc) => sum + doc.questions, 0),
    studyHours: Number.parseFloat(documents.reduce((sum, doc) => sum + Number.parseFloat(doc.studyTime), 0).toFixed(1)),
    accuracyRate: Math.round(
      documents.filter((doc) => doc.status === "processed").reduce((sum, doc) => sum + doc.accuracy, 0) /
        Math.max(documents.filter((doc) => doc.status === "processed").length, 1),
    ),
  }

  const handleDeleteDocument = (document: any) => {
    deleteDocument(document, (id: number) => {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome back, John! 👋</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with your learning journey today.
          </p>
        </div>
        <Button
          onClick={() => continueLearning(documents)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="lg:col-span-2">
          <RecentDocuments
            documents={documents}
            onViewDocument={viewDocument}
            onStartStudy={startStudySession}
            onGenerateQuiz={generateQuiz}
            onDownload={downloadDocument}
            onShare={shareDocument}
            onDelete={handleDeleteDocument}
            onViewAll={() => router.push("/dashboard/documents")}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <LearningGoals goals={learningGoals} />
          <QuickActionsPanel
            onUploadDocument={uploadDocument}
            onGenerateQuiz={() => generateQuiz()}
            onStartStudySession={() => startStudySession()}
          />
        </div>
      </div>

      {/* Achievements */}
      <AchievementsSection achievements={achievements} />

      {/* Dialogs */}
      <QuizDialog
        isOpen={isQuizDialogOpen}
        onClose={() => setIsQuizDialogOpen(false)}
        selectedDocument={selectedDocument}
        onCreateQuiz={createQuiz}
      />

      <StudyDialog
        isOpen={isStudyDialogOpen}
        onClose={() => setIsStudyDialogOpen(false)}
        selectedDocument={selectedDocument}
        onStartStudy={startStudy}
      />
    </div>
  )
}
