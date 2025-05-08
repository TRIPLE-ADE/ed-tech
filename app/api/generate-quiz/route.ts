// import { questionSchema, questionsSchema } from "@/lib/schemas";
// import { google } from "@ai-sdk/google";
// import { streamObject } from "ai";

// export const maxDuration = 60;

// export async function POST(req: Request) {
//   const { files, questionCount, difficulty, questionType } = await req.json();
//   const firstFile = files[0].data;

//   console.log("Test")

//   const result = streamObject({
//     model: google("gemini-2.0-flash-001"),
//     messages: [
//       {
//         role: "system",
//         content: `You are a teacher. Your job is to take a document and create a multiple-choice test with ${questionCount} questions based on the content of the document.
//         The difficulty level should be "${difficulty}". Ensure that Easy questions are simple and factual, Medium questions require some reasoning, and Hard questions involve critical thinking.`,
//       },
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: "Create a multiple choice test based on this document.",
//           },
//           {
//             type: "file",
//             data: firstFile,
//             mimeType: "application/pdf",
//           },
//         ],
//       },
//     ],
//     schema: questionSchema,
//     output: "array",
//     onFinish: ({ object }) => {
//       const res = questionsSchema.safeParse(object);
//       console.log("Test 2")
//       if (res.error) {
//         throw new Error(res.error.errors.map((e) => e.message).join("\n"));
//       }
//     },
//   });

//   console.log(result)
//   return result.toTextStreamResponse();
// }

import { questionSchema, questionsSchema } from "@/lib/schemas";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  // We need to handle multipart form data for file uploads
  const formData = await req.formData();

  // Extract parameters from form data
  const file = formData.get("file") as File;
  const questionCount = Number(formData.get("questionCount"));
  const difficulty = formData.get("difficulty") as string;
  const questionType = formData.get("questionType") as string;

  if (!file || !file.type.includes("pdf")) {
    return new Response(
      JSON.stringify({ error: "Invalid or missing PDF file" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Initialize the Google GenAI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
  });

  try {
    // Step 1: Upload the file directly to Google's Files API
    console.log("Uploading file to Google Files API...");

    const myfile = await ai.files.upload({
      file: file,
      config: { mimeType: "application/pdf" },
    });

    console.log("File uploaded successfully with URI:", myfile.uri);

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
          content: JSON.stringify([
            {
              type: "text",
              text: "Create a multiple choice test based on this document.",
            },
            {
              type: "file",
              data: myfile.uri,
              mimeType: "application/pdf",
            },
          ]),
        },
      ],
      schema: questionSchema,
      output: "array",
      onFinish: ({ object }) => {
        const res = questionsSchema.safeParse(object);
        console.log("Test 2");
        if (res.error) {
          throw new Error(res.error.errors.map((e) => e.message).join("\n"));
        }
      },
    });

    console.log(result);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in generate-quiz:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
