// pages/api/summarize.ts
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const systemContent = `You are an expert summarizer. Your task is to read the provided PDF document and produce a concise, informative summary that captures the main points.`;

  // Call the streaming text API.
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
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     const encoder = new TextEncoder()
  //     for await (const chunk of result.textStream) {
  //       const words = chunk.split(" ")
  //       for (const word of words) {
  //         controller.enqueue(encoder.encode(word + " "))
  //         await new Promise((resolve) => setTimeout(resolve, 50)) // Delay between words
  //       }
  //     }
  //     controller.close()
  //   },
  // })

  // return new Response(stream, {
  //   headers: { "Content-Type": "text/plain; charset=utf-8" },
  // })

  return result.toTextStreamResponse();
}
