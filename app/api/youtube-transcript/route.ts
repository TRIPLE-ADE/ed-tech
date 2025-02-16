import { error } from "console"
import { NextResponse } from "next/server"
import { YoutubeTranscript } from "youtube-transcript"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const transcript = await YoutubeTranscript.fetchTranscript(url)

    console.log(transcript)
   // Create a ReadableStream that sends out transcript chunks one by one.
   const stream = new ReadableStream({
    async start(controller) {
      // For each transcript segment, enqueue its text with a space separator.
      for (const segment of transcript) {
        // Optionally, you can include timestamps or other info here.
        const chunk = segment.text + " ";
        controller.enqueue(new TextEncoder().encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      controller.close();
    },
  });


    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error)
    return NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 })
  }
}

