"use client";
import { useMemo, useState } from "react";

// lib
import { experimental_useObject } from "@ai-sdk/react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// utilities
import { questionsSchema } from "@/lib/schemas";
import { generateQuizTitle } from "../actions";

// Components
import { Progress, Button, Card, CardContent } from "@/components/ui";
import Quiz from "@/components/quiz";
import Summary from "@/components/summary";
import { WorkflowSteps } from "@/components/workflow-steps";
import FileUpload from "@/components/file-upload";
import ModeCustomization from "@/components/mode-customization";

// Custom Hooks
import { useDragAndDrop, useFileHandler } from "@/hooks";
import { useSummarizer } from "@/hooks/useSummarizer";

// Types
import { DifficultyLevel, QuestionType } from "@/types/question";

export default function ChatWithFiles() {
  const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
    []
  );
  const [title, setTitle] = useState<string>();
  const [mode, setMode] = useState<"quiz" | "summary" | null>(null);
  const [questionType, setQuestionType] =
    useState<QuestionType>("Multiple Choice");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
  const [questionCount, setQuestionCount] = useState<number | "">(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const { files, handleFileChange, clearFiles, getFiles, fileInputRef } =
    useFileHandler();

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop((files: FileList) =>
      handleFileChange({
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>)
    );
  
  const {
    summary,
    isSummarizing,
    summarizeFiles,
    resetSummary,
    cancelSummarizing,
  } = useSummarizer();

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (files.length === 0) {
        toast.error("Please upload a PDF file first");
        return;
      }
      
      if (mode === "quiz") {
        // Generate a title for the quiz
        const generatedTitle = await generateQuizTitle(files[0].name);
        setTitle(generatedTitle);
        
        // Create a FormData object to send the file directly
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("questionCount", questionCount.toString());
        formData.append("difficulty", difficulty);
        formData.append("questionType", questionType);
        
        // Track progress with a simple incrementing counter
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 2;
            return newProgress >= 95 ? 95 : newProgress;
          });
        }, 500);
        
        // Send the request
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          body: formData,
        });
        
        clearInterval(progressInterval);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate quiz");
        }
        
        const data = await response.json();
        setQuestions(data);
        setProgress(100);
      } 
      else if (mode === "summary") {
        summarizeFiles(files);
      }
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearPDF = () => {
    clearFiles();
    setTitle("");
    setQuestions([]);
    resetSummary();
    setMode(null);
    setProgress(0);
  };

  if (summary) {
    return <Summary summary={summary} onClear={clearPDF} />;
  }

  if (questions.length > 0) {
    return (
      <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
    );
  }

  return (
    <div
      className="min-h-[100dvh] w-full flex justify-center"
      onDragOver={handleDragOver}
      onDragExit={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(PDFs only)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="w-full max-w-md h-full border-0 sm:border sm:h-fit mt-12">
        <WorkflowSteps />
        <CardContent>
          <form onSubmit={handleSubmitWithFiles} className="space-y-4">
            <FileUpload
              files={files}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
            {/* Mode Selection */}
            <ModeCustomization
              mode={mode}
              setMode={setMode}
              questionType={questionType}
              setQuestionType={setQuestionType}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              disabled={isSubmitting || isSummarizing}
            />
            
            {isSubmitting && (
              <div className="flex flex-col space-y-4">
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="w-full space-y-2">
                  <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isSubmitting
                          ? "bg-yellow-500/50 animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                      {progress > 0
                        ? `Generating quiz...`
                        : "Analyzing PDF content"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={
                files.length === 0 || !mode || isSubmitting || isSummarizing
              }
            >
              {isSubmitting || isSummarizing ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {mode === "quiz" ? "Generating Quiz..." : "Summarizing..."}
                  </span>
                </span>
              ) : mode === "quiz" ? (
                "Generate Quiz"
              ) : (
                "Summarize PDF"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
