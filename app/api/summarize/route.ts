// pages/api/summarize.ts
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { fileMetadata } = await req.json();
  
  const fileUri = fileMetadata.uri;
  const fileMimeType = fileMetadata.mimeType || "application/pdf";

  const systemContent = `You are an expert summarizer. Your task is to read the provided PDF document and produce a concise, informative summary that captures the main points.`;

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    system: systemContent,
    abortSignal: req.signal,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please provide a detailed summary of this PDF document. Include the main points, key features, and any important details. Format the response with proper headings and bullet points where appropriate.",
          },
          {
            type: "file",
            data: fileUri,
            mimeType: fileMimeType,
          },
        ],
      },
    ],
  });

  return result.toTextStreamResponse();
}