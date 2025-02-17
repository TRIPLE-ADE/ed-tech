import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  FileText,
  PenTool,
  Calendar,
  Video,
  BarChart,
  Edit3,
  Sparkles,
  WandSparkles,
  LucideWandSparkles,
  LucideSparkles,
} from "lucide-react";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col container mx-auto items-center justify-center min-h-screen py-2 my-32">
        <section className="text-center mb-16 px-4">
          <p className="rounded-full mb-4 border bg-background/95 px-4 py-2 text-sm shadow-sm backdrop-blur flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Introducing AI-Powered Learning Tools for Everyone</span>
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Welcome to EdTech AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Revolutionize your learning with AI-powered tools
          </p>
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
        </section>

        <section className="mb-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "PDF Analysis",
                description: "Extract and analyze text from PDF documents",
                icon: FileText,
              },
              {
                title: "Smart Summarization",
                description: "Get concise summaries of long texts",
                icon: BookOpen,
              },
              {
                title: "AI-Generated Questions",
                description: "Create quizzes from any content",
                icon: Brain,
              },
              {
                title: "Intelligent Grading",
                description: "Receive instant feedback on your answers",
                icon: PenTool,
              },
              // {
              //   title: "Study Planner",
              //   description:
              //     "Generate personalized study schedules based on uploaded materials",
              //   icon: Calendar,
              // },
              // {
              //   title: "Smart Note Taker",
              //   description:
              //     "Use rich text editing or real-time speech-to-text for your notes",
              //   icon: Edit3,
              // },
              {
                title: "Progress Tracking",
                description:
                  "Monitor your learning progress and receive tailored insights",
                icon: BarChart,
              },
              {
                title: "YouTube Assistant",
                description:
                  "Transcribe, summarize, and ask questions about YouTube videos",
                icon: Video,
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl relative group duration-300">
                <div className="absolute top-0 right-0 w-12 h-12 group-hover:border-t-2 group-hover:border-r-2  group-hover:border-primary rounded-tr-lg"></div>
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to enhance your learning?
          </h2>
          <Link href="/dashboard">
            <Button size="lg">Start Learning Now</Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
