import React from "react";
import { CardDescription, CardHeader, CardTitle } from "./ui";
import { CheckCircle2, FileUp, Loader2, Plus } from "lucide-react";

export const WorkflowSteps = () => {
  return (
    <CardHeader className="text-center space-y-6">
      <p className="text-sm text-muted-foreground">Workflow breakdown</p>
      <div className="mx-auto flex items-center justify-center space-x-6 text-muted-foreground">
        {/* Step 1: File Upload */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-2">
            <FileUp className="h-6 w-6" />
          </div>
          <span className="text-xs text-muted-foreground">Upload File</span>
          <p className="text-xs text-muted-foreground">
            Drag & drop or select a PDF
          </p>
        </div>

        {/* Separator between steps */}
        <Plus className="h-4 w-4 text-muted-foreground" />

        {/* Step 2: Processing */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-2">
            <Loader2 className="h-6 w-6" />
          </div>
          <span className="text-xs text-muted-foreground">Processing</span>
          <p className="text-xs text-muted-foreground">
            AI is generating the quiz/summary
          </p>
        </div>

        {/* Separator between steps */}
        <Plus className="h-4 w-4 text-muted-foreground" />

        {/* Step 3: Success */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <span className="text-xs text-muted-foreground">Complete</span>
          <p className="text-xs text-muted-foreground">Your result is ready!</p>
        </div>
      </div>

      <div className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          AI-Powered PDF Learning Assistant
        </CardTitle>
        <CardDescription className="text-base">
          Upload a PDF and choose between quiz generation or content
          summarization. Enhance learning with AI-driven insights
        </CardDescription>
      </div>
    </CardHeader>
  );
};
