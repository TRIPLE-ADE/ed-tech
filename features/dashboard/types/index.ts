export interface Document {
  id: number
  title: string
  type: "PDF" | "YouTube" | "Text"
  size: string
  uploadDate: string
  lastAccessed: string
  status: "processed" | "processing" | "failed"
  questions: number
  accuracy: number
  studyTime: string
  content?: string
  thumbnail?: string
}

export interface LearningGoal {
  id: string
  title: string
  progress: number
  target: string
  color: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
  type: "speed" | "accuracy" | "consistency" | "milestone"
}

export interface StudySession {
  id: string
  documentId?: number
  duration: number
  mode: "review" | "practice" | "flashcards" | "summary"
  startTime: Date
  endTime?: Date
  questionsAnswered?: number
  accuracy?: number
}

export interface QuizConfig {
  documentId?: number
  questionCount: number
  difficulty: "easy" | "medium" | "hard" | "mixed"
  timeLimit?: number
}
