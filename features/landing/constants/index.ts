"use client";

import {
  BookOpen,
  Brain,
  FileText,
  PenTool,
  Video,
  BarChart,
  Zap,
  Users,
  Star,
  Lightbulb,
  UploadCloud,
  FlaskConical,
  MessageSquare,
} from "lucide-react";

export const DemoSteps = [
  {
    id: 1,
    title: "Upload Your Content",
    description:
      "Seamlessly upload PDFs, documents, or paste text/YouTube links. Our AI is ready.",
    icon: UploadCloud,
  },
  {
    id: 2,
    title: "AI Processes & Analyzes",
    description:
      "ThryX AI intelligently analyzes your material, identifying key concepts and information.",
    icon: FlaskConical,
  },
  {
    id: 3,
    title: "Learn, Question, & Grow",
    description:
      "Instantly summarize, generate questions, get graded, and track your progress.",
    icon: MessageSquare,
  },
];

export const Features = [
  {
    title: "PDF Analysis",
    description:
      "Extract and analyze text from PDF documents with advanced AI understanding.",
    icon: FileText,
  },
  {
    title: "Smart Summarization",
    description: "Get concise, intelligent summaries of long texts in seconds.",
    icon: BookOpen,
  },
  {
    title: "AI-Generated Questions",
    description: "Create comprehensive quizzes from any content automatically.",
    icon: Brain,
  },
  {
    title: "Intelligent Grading",
    description:
      "Receive instant, detailed feedback on your answers with explanations.",
    icon: PenTool,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and insights.",
    icon: BarChart,
  },
  {
    title: "YouTube Assistant",
    description:
      "Transcribe, summarize, and interact with YouTube video content.",
    icon: Video,
  },
];

export const BenefitsData = [
  {
    icon: Zap,
    title: "10x Faster Learning",
    description: "Accelerate your study sessions with smart tools.",
  },
  {
    icon: Users,
    title: "Collaborative Tools",
    description: "Share and learn together with integrated features.",
  },
  {
    icon: Star,
    title: "Personalized Experience",
    description: "AI adapts to your unique learning style.",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Discover knowledge gaps and strengths instantly.",
  },
];
