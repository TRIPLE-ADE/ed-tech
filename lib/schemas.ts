import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths.",
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on.",
    ),
});

export type Question = z.infer<typeof questionSchema>;
export const questionsSchema = z.array(questionSchema);

// True/False Schema
export const trueFalseSchema = z.object({
  question: z.string(),
  answer: z.boolean().describe("The correct answer: true for True, false for False."),
});
export type TrueFalseQuestion = z.infer<typeof trueFalseSchema>;
export const trueFalseQuestionsSchema = z.array(trueFalseSchema);

// Short Answer Schema
export const shortAnswerSchema = z.object({
  question: z.string(),
  answer: z.string().describe("The correct answer in free text."),
});
export type ShortAnswerQuestion = z.infer<typeof shortAnswerSchema>;
export const shortAnswerQuestionsSchema = z.array(shortAnswerSchema);