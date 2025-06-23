// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { url } = await req.json();

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     const apiUrl = `https://youtube-transcript3.p.rapidapi.com/api/transcript-with-url?url=${encodeURIComponent(
//       url
//     )}&flat_text=true&lang=en`;

//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY as string, // Use an env variable
//         "x-rapidapi-host": "youtube-transcript3.p.rapidapi.com",
//       },
//     });

//     const data = await response.json();

//     // Create a ReadableStream that sends transcript chunks one by one
//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         const words = data.transcript.split(" "); // Stream word by word

//         for (const word of words) {
//           controller.enqueue(encoder.encode(word + " "));
//           await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate streaming
//         }

//         controller.close();
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
//   } catch (error) {
//     console.error("Error fetching YouTube transcript:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch transcript" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  
  const body = await req.json();
  const videoId = body.videoId;
  const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;

  let transcriptData;

  try {
    const transcript = await fetch(url);
    transcriptData = await transcript.text();
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }

  return new Response(JSON.stringify({ transcript: transcriptData }));
}