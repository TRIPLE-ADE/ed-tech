// components/ModeCustomization.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui";
import { DifficultyLevel, QuestionType } from "@/types/question";

interface ModeCustomizationProps {
  mode: "quiz" | "summary" | null;
  setMode: (mode: "quiz" | "summary") => void;
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  questionCount: number | "";
  setQuestionCount: (count: number | "") => void;
  disabled: boolean;
}

const ModeCustomization: React.FC<ModeCustomizationProps> = ({
  mode,
  setMode,
  questionType,
  setQuestionType,
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
  disabled,
}) => {
  const handleFocus = () => {
    // If the current value is 0, clear the input.
    if (questionCount === 0) {
      setQuestionCount("");
    }
  };

  const handleBlur = () => {
    // If the input is left empty, default to 5.
    if (questionCount === "") {
      setQuestionCount(5);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert to number only if not empty.
    setQuestionCount(value === "" ? "" : Number(value));
  };

  return (
    <>
      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Choose Mode:</label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={mode === "quiz" ? "default" : "outline"}
            onClick={() => setMode("quiz")}
            className="w-1/2"
            disabled={disabled}
          >
            Generate Quiz
          </Button>
          <Button
            type="button"
            variant={mode === "summary" ? "default" : "outline"}
            onClick={() => setMode("summary")}
            className="w-1/2"
            disabled={disabled}
          >
            Summarize PDF
          </Button>
        </div>
      </div>

      {/* Quiz Customization */}
      {mode === "quiz" && (
        <div className="space-y-4">
          {/* Question Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Question Type:</label>
            <div className="flex space-x-2">
              {["Multiple Choice", "Short Answer", "True/False"].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={questionType === type ? "default" : "outline"}
                  onClick={() => setQuestionType(type as QuestionType)}
                  disabled={disabled}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Difficulty:</label>
            <div className="flex space-x-2">
              {["Easy", "Medium", "Hard"].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level as DifficultyLevel)}
                  disabled={disabled}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Questions:</label>
            <input
              type="number"
              className="border p-2 rounded-md w-full"
              value={questionCount}
              min={1}
              max={20}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              If left empty, 5 questions will be generated.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModeCustomization;
