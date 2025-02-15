import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files, questionCount, difficulty, questionType } = await req.json();
  const firstFile = files[0].data;

  console.log("Test")

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content: `You are a teacher. Your job is to take a document and create a multiple-choice test with ${questionCount} questions based on the content of the document. 
        The difficulty level should be "${difficulty}". Ensure that Easy questions are simple and factual, Medium questions require some reasoning, and Hard questions involve critical thinking.`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      console.log("Test 2")
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  console.log(result)
  return result.toTextStreamResponse();
}
