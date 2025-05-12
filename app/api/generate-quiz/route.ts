import { questionSchema, questionsSchema } from "@/lib/schemas";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract data from the request body
  const { fileMetadata, questionCount, difficulty, questionType } = await req.json();
  
  const fileUri = fileMetadata.uri;
  const fileMimeType = fileMetadata.mimeType || "application/pdf";

  console.log(fileMimeType)

  console.log("Generating quiz using file URI:", fileUri);

  // Call the AI model to generate questions based on the provided document.
  const result = streamObject({
    model: google("gemini-2.0-flash-001"),
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
            data: fileUri,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    // Validate the output from the AI model
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}