"use client"
import { useState, useEffect } from "react"
import type { Document, LearningGoal, Achievement } from "../types"

export function useDashboardData() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true)

      // Mock data - replace with actual API calls
      const mockDocuments: Document[] = [
        {
          id: 1,
          title: "Machine Learning Fundamentals",
          type: "PDF",
          size: "2.4 MB",
          uploadDate: "2024-01-15",
          lastAccessed: "2 hours ago",
          status: "processed",
          questions: 12,
          accuracy: 92,
          studyTime: "3.5h",
          content:
            "Advanced concepts in machine learning including neural networks, deep learning, and model optimization techniques.",
        },
        {
          id: 2,
          title: "Data Structures & Algorithms",
          type: "PDF",
          size: "1.8 MB",
          uploadDate: "2024-01-14",
          lastAccessed: "1 day ago",
          status: "processed",
          questions: 8,
          accuracy: 85,
          studyTime: "2.1h",
          content:
            "Comprehensive guide to data structures, algorithms, and their practical applications in software development.",
        },
        {
          id: 3,
          title: "React Advanced Patterns",
          type: "YouTube",
          size: "45 min",
          uploadDate: "2024-01-13",
          lastAccessed: "Just now",
          status: "processing",
          questions: 0,
          accuracy: 0,
          studyTime: "0h",
          content: "Advanced React patterns including hooks, context, and performance optimization techniques.",
        },
      ]

      const mockGoals: LearningGoal[] = [
        {
          id: "1",
          title: "Complete AI Course",
          progress: 75,
          target: "End of month",
          color: "bg-blue-500",
        },
        {
          id: "2",
          title: "Master Data Science",
          progress: 45,
          target: "Next quarter",
          color: "bg-purple-500",
        },
        {
          id: "3",
          title: "Certification Prep",
          progress: 90,
          target: "This week",
          color: "bg-green-500",
        },
      ]

      const mockAchievements: Achievement[] = [
        {
          id: "1",
          title: "Speed Learner",
          description: "Completed 5 documents in one day",
          date: "2 days ago",
          icon: "⚡",
          type: "speed",
        },
        {
          id: "2",
          title: "Accuracy Master",
          description: "90%+ accuracy for 7 days straight",
          date: "1 week ago",
          icon: "🎯",
          type: "accuracy",
        },
        {
          id: "3",
          title: "Consistent Learner",
          description: "14-day learning streak",
          date: "2 weeks ago",
          icon: "🔥",
          type: "consistency",
        },
      ]

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setDocuments(mockDocuments)
      setLearningGoals(mockGoals)
      setAchievements(mockAchievements)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return {
    documents,
    learningGoals,
    achievements,
    isLoading,
    setDocuments,
    setLearningGoals,
    setAchievements,
  }
}
