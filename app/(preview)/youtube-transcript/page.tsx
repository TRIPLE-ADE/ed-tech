"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CopyIcon, Loader2 } from "lucide-react";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { Markdown } from "@/components/markdown";
import { useClipboard } from "@/hooks";
import { streamResponse } from "@/utils/streamResponse";

function getVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function decodeHTMLEntities(text: string): string {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html")
    .documentElement.textContent;
  return decodedString || text;
}

export default function YouTubeTranscriptPage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { copied, handleCopy } = useClipboard();

  // Scroll to the bottom (dummy element) whenever the summary updates
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [summary, transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTranscript("");
    setSummary("");
    setVideoId(null);

    const extractedVideoId = getVideoId(url);
    if (!extractedVideoId) {
      setError("Invalid YouTube URL");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/youtube-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transcript");
      }

      setVideoId(extractedVideoId);
      await streamResponse(response, (chunk) =>
        setTranscript((prev) => prev + chunk)
      );
    } catch (err) {
      setError("An error occurred while fetching the transcript");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch("/api/summarize-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize transcript");
      }

      await streamResponse(response, (chunk) =>
        setSummary((prev) => prev + chunk)
      );
    } catch (err) {
      setError("An error occurred while summarizing the transcript");
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-10">
      <h1 className="text-2xl font-bold mb-4">
        YouTube Transcript Extractor and Summarizer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="w-full"
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting Transcript...
            </>
          ) : (
            "Extract Transcript"
          )}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Video:</h2>
        {isLoading && transcript === "" ? (
          <SkeletonLoader lines={10} />
        ) : videoId ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : null}
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-2">Transcript:</h2>
          {transcript && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(transcript)}
            >
              {copied ? (
                <>
                  Copied! <CheckCircle2 className="h-4 w-4 text-green-500" />
                </>
              ) : (
                <>
                  Copy <CopyIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {isLoading && transcript === "" ? (
          <SkeletonLoader lines={10} />
        ) : transcript ? (
          <div className="p-4 rounded-md max-h-96 overflow-y-auto">
            <Markdown>{decodeHTMLEntities(transcript)}</Markdown>
            <div ref={endRef} />
          </div>
        ) : null}

        {transcript && (
          <Button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="mt-4 w-full"
          >
            {isSummarizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              "Summarize Transcript"
            )}
          </Button>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-2">Summary:</h2>
          {summary && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(summary)}
            >
              {copied ? (
                <>
                  Copied! <CheckCircle2 className="h-4 w-4 text-green-500" />
                </>
              ) : (
                <>
                  Copy <CopyIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
        {isSummarizing && summary === "" ? (
          <SkeletonLoader lines={5} />
        ) : summary ? (
          <div className="p-4 rounded-md max-h-96 overflow-y-auto">
            <p>{summary}</p>
            <div ref={endRef} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
