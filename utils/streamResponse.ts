export async function streamResponse(
  response: Response,
  onChunk: (chunk: string) => void
) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("ReadableStream not supported");

  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { done: streamDone, value } = await reader.read();
    done = streamDone;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  }
  // Flush the decoder to capture any remaining text
  const finalChunk = decoder.decode();
  if (finalChunk) {
    onChunk(finalChunk);
  }
}
