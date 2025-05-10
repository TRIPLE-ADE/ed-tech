// "use client";
// import { useMemo, useState } from "react";

// // lib
// import { experimental_useObject } from "@ai-sdk/react";
// import { z } from "zod";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// // utilities
// import { questionsSchema } from "@/lib/schemas";
// import { generateQuizTitle } from "../actions";

// // Components
// import { Progress, Button, Card, CardContent } from "@/components/ui";
// import Quiz from "@/components/quiz";
// import Summary from "@/components/summary";
// import { WorkflowSteps } from "@/components/workflow-steps";
// import FileUpload from "@/components/file-upload";
// import ModeCustomization from "@/components/mode-customization";

// // Custom Hooks
// import { useDragAndDrop, useFileHandler } from "@/hooks";
// import { useSummarizer } from "@/hooks/useSummarizer";

// // Types
// import { DifficultyLevel, QuestionType } from "@/types/question";

// export default function ChatWithFiles() {
//   const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
//     []
//   );
//   const [title, setTitle] = useState<string>();
//   const [mode, setMode] = useState<"quiz" | "summary" | null>(null);
//   const [questionType, setQuestionType] =
//     useState<QuestionType>("Multiple Choice");
//   const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
//   const [questionCount, setQuestionCount] = useState<number | "">(5);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const { files, handleFileChange, clearFiles, getFiles, fileInputRef } =
//     useFileHandler();

//   const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
//     useDragAndDrop((files: FileList) =>
//       handleFileChange({
//         target: { files },
//       } as React.ChangeEvent<HTMLInputElement>)
//     );
  
//   const {
//     summary,
//     isSummarizing,
//     summarizeFiles,
//     resetSummary,
//     cancelSummarizing,
//   } = useSummarizer();

//   const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       if (files.length === 0) {
//         toast.error("Please upload a PDF file first");
//         return;
//       }
      
//       if (mode === "quiz") {
//         // Generate a title for the quiz
//         const generatedTitle = await generateQuizTitle(files[0].name);
//         setTitle(generatedTitle);
        
//         // Create a FormData object to send the file directly
//         const formData = new FormData();
//         formData.append("file", files[0]);
//         formData.append("questionCount", questionCount.toString());
//         formData.append("difficulty", difficulty);
//         formData.append("questionType", questionType);
        
//         // Track progress with a simple incrementing counter
//         const progressInterval = setInterval(() => {
//           setProgress(prev => {
//             const newProgress = prev + 2;
//             return newProgress >= 95 ? 95 : newProgress;
//           });
//         }, 500);
        
//         // Send the request
//         const response = await fetch("/api/generate-quiz", {
//           method: "POST",
//           body: formData,
//         });
        
//         clearInterval(progressInterval);
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to generate quiz");
//         }
        
//         const data = await response.json();
//         setQuestions(data);
//         setProgress(100);
//       } 
//       // else if (mode === "summary") {
//       //   summarizeFiles(files);
//       // }
//     } catch (error) {
//       console.error("Error handling submission:", error);
//       toast.error(`Error: ${(error as Error).message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const clearPDF = () => {
//     clearFiles();
//     setTitle("");
//     setQuestions([]);
//     resetSummary();
//     setMode(null);
//     setProgress(0);
//   };

//   if (summary) {
//     return <Summary summary={summary} onClear={clearPDF} />;
//   }

//   if (questions.length > 0) {
//     return (
//       <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
//     );
//   }

//   return (
//     <div
//       className="min-h-[100dvh] w-full flex justify-center"
//       onDragOver={handleDragOver}
//       onDragExit={handleDragLeave}
//       onDragEnd={handleDragLeave}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <AnimatePresence>
//         {isDragging && (
//           <motion.div
//             className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <div>Drag and drop files here</div>
//             <div className="text-sm dark:text-zinc-400 text-zinc-500">
//               {"(PDFs only)"}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <Card className="w-full max-w-md h-full border-0 sm:border sm:h-fit mt-12">
//         <WorkflowSteps />
//         <CardContent>
//           <form onSubmit={handleSubmitWithFiles} className="space-y-4">
//             <FileUpload
//               files={files}
//               handleFileChange={handleFileChange}
//               fileInputRef={fileInputRef}
//             />
//             {/* Mode Selection */}
//             <ModeCustomization
//               mode={mode}
//               setMode={setMode}
//               questionType={questionType}
//               setQuestionType={setQuestionType}
//               difficulty={difficulty}
//               setDifficulty={setDifficulty}
//               questionCount={questionCount}
//               setQuestionCount={setQuestionCount}
//               disabled={isSubmitting || isSummarizing}
//             />
            
//             {isSubmitting && (
//               <div className="flex flex-col space-y-4">
//                 <div className="w-full space-y-1">
//                   <div className="flex justify-between text-sm text-muted-foreground">
//                     <span>Progress</span>
//                     <span>{Math.round(progress)}%</span>
//                   </div>
//                   <Progress value={progress} className="h-2" />
//                 </div>
//                 <div className="w-full space-y-2">
//                   <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
//                     <div
//                       className={`h-2 w-2 rounded-full ${
//                         isSubmitting
//                           ? "bg-yellow-500/50 animate-pulse"
//                           : "bg-muted"
//                       }`}
//                     />
//                     <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
//                       {progress > 0
//                         ? `Generating quiz...`
//                         : "Analyzing PDF content"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={
//                 files.length === 0 || !mode || isSubmitting || isSummarizing
//               }
//             >
//               {isSubmitting || isSummarizing ? (
//                 <span className="flex items-center space-x-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span>
//                     {mode === "quiz" ? "Generating Quiz..." : "Summarizing..."}
//                   </span>
//                 </span>
//               ) : mode === "quiz" ? (
//                 "Generate Quiz"
//               ) : (
//                 "Summarize PDF"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
import { useDragAndDrop } from "@/hooks";
import { useFileHandler } from "@/hooks/useFileHandler";
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
  const [isProcessing, setIsProcessing] = useState(false);

  const { 
    files, 
    uploadedFiles,
    handleFileChange, 
    clearFiles, 
    fileInputRef,
    isUploading 
  } = useFileHandler();

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
      toast.error("Failed to generate quiz. Please try again. " + error);
      setIsProcessing(false);
    },
    onFinish: ({ object, error }) => {
      if (error) {
        console.error("Error generating quiz:", error);
        toast.error("Failed to generate quiz. Please try again. " + error);
        setIsProcessing(false);
        return;
      }
      setQuestions(object ?? []);
      setIsProcessing(false);
    },
  });

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if we have files and that the number of files matches the number of uploaded files
    if (files.length === 0) {
      toast.error("Please select a file first");
      return;
    }
    
    if (uploadedFiles.length === 0) {
      toast.error("No files have been successfully uploaded");
      return;
    }
    
    if (files.length !== uploadedFiles.length) {
      toast.error("Not all files were successfully uploaded. Please try again.");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process the files based on selected mode
      if (mode === "quiz") {
        // Use the first file's metadata for the quiz generation
        submit({ 
          fileMetadata: uploadedFiles[0],
          questionType, 
          questionCount, 
          difficulty 
        });
        
        const generatedTitle = await generateQuizTitle(uploadedFiles[0].name);
        setTitle(generatedTitle);
      } else if (mode === "summary") {
        // Pass the uploaded files to your summarizer
        // summarizeFiles(uploadedFiles);
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error(`Failed to process files: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsProcessing(false);
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

  const isButtonDisabled = files.length === 0 || !mode || isProcessing || isUploading;
  const showProgress = isUploading || isLoading || isSummarizing;

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
              {"(PDFs up to 30MB)"}
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
            <ModeCustomization
              mode={mode}
              setMode={setMode}
              questionType={questionType}
              setQuestionType={setQuestionType}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              disabled={isProcessing}
            />
            
            {showProgress && (
              <div className="flex flex-col space-y-4">
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      {isUploading 
                        ? "Uploading..." 
                        : isLoading && partialQuestions 
                          ? `${Math.round(progress)}%` 
                          : "Processing..."}
                    </span>
                  </div>
                  <Progress 
                    value={isUploading ? 50 : isLoading ? progress : 50} 
                    className="h-2" 
                  />
                </div>
                <div className="w-full space-y-2">
                  <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        showProgress
                          ? "bg-yellow-500/50 animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                      {isUploading 
                        ? "Uploading file to server..."
                        : isLoading && partialQuestions
                          ? `Generating question ${
                              partialQuestions.length + 1
                            } of ${questionCount}`
                          : mode === "quiz" 
                            ? "Analyzing PDF content" 
                            : "Summarizing content"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={isButtonDisabled}
            >
              {showProgress ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {isUploading 
                      ? "Uploading..." 
                      : mode === "quiz" 
                        ? "Generating Quiz..." 
                        : "Summarizing..."}
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