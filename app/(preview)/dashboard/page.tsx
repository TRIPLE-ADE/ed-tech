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

  const { files, handleFileChange, clearFiles, getEncodedFiles, fileInputRef } =
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

  const {
    submit,
    object: partialQuestions,
    isLoading,
  } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again." + error);
      clearFiles();
    },
    onFinish: ({ object, error }) => {
      if (error) {
        console.error("Error generating quiz:", error);
        toast.error("Failed to generate quiz. Please try again." + error);
        clearFiles();
        return;
      }
      setQuestions(object ?? []);
    },
  });

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedFiles = await getEncodedFiles();

    console.log("Encoded files:", encodedFiles);

    if (mode === "quiz") {
      submit({ files: encodedFiles, questionType, questionCount, difficulty });
      const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
      setTitle(generatedTitle);
    } else if (mode === "summary") {
      summarizeFiles(encodedFiles);
    }
  };

  const clearPDF = () => {
    clearFiles();
    setTitle("");
    setQuestions([]);
    resetSummary();
    setMode(null);
  };

  const progress = useMemo(() => {
    // If questionCount is empty, default to 5.
    const count = questionCount === "" ? 5 : questionCount;
    return partialQuestions ? (partialQuestions.length / count) * 100 : 0;
  }, [partialQuestions, questionCount]);

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
              disabled={isLoading || isSummarizing}
            />
            {/* {files.length > 0 && (
              <PreviewPdf files={files} />
            )} */}
            {isLoading && (
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
                        isLoading
                          ? "bg-yellow-500/50 animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                      {partialQuestions
                        ? `Generating question ${
                            partialQuestions.length + 1
                          } of ${questionCount}`
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
                files.length === 0 || !mode || isLoading || isSummarizing
              }
            >
              {isLoading || isSummarizing ? (
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
