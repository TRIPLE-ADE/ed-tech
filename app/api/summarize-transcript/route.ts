import { google } from "@ai-sdk/google";
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json()

    if (!transcript) {
      return new Response(JSON.stringify({ error: "Transcript is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = streamText({
      model: google("gemini-2.0-flash-001"),
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant tasked with summarizing YouTube video transcripts. Provide a concise summary that captures the main points and key ideas of the video.",
        },
        {
          role: "user",
          content: `Please summarize the following YouTube video transcript:\n\n${transcript}`,
        },
      ],
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Error in summarize-transcript API:", error)
    return new Response(JSON.stringify({ error: "Failed to summarize transcript" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

