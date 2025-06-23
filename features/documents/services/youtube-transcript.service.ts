import axios, { AxiosProgressEvent } from 'axios';
import { getYouTubeId } from '../utils';

export interface TranscriptResponse {
  transcript: string;
  videoId: string;
  title?: string;
  duration?: number;
}

export interface TranscriptProcessingOptions {
  onProgress?: (progress: AxiosProgressEvent) => void;
  onProcessingUpdate?: (stage: string, progress: number) => void;
}

export class YouTubeTranscriptService {
  /**
   * Validate YouTube URL and extract video ID
   */
  static validateUrl(url: string): { isValid: boolean; videoId?: string; error?: string } {
    if (!url.trim()) {
      return { isValid: false, error: 'YouTube URL is required' };
    }

    const videoId = getYouTubeId(url);
    if (!videoId) {
      return { 
        isValid: false, 
        error: 'Invalid YouTube URL. Please enter a valid YouTube video URL.' 
      };
    }

    return { isValid: true, videoId };
  }

  /**
   * Fetch transcript from YouTube video
   */
  static async fetchTranscript(
    videoId: string,
    options?: TranscriptProcessingOptions
  ): Promise<TranscriptResponse> {
    try {
      options?.onProcessingUpdate?.('Connecting to transcript service', 10);

      const response = await axios.post('/api/youtube-transcript', 
        { videoId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          onDownloadProgress: (progressEvent) => {
            if (options?.onProgress) {
              options.onProgress(progressEvent);
            }

            if (options?.onProcessingUpdate && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              options.onProcessingUpdate('Fetching transcript', percentCompleted);
            }
          }
        }
      );

      if (!response.data.transcript) {
        throw new Error('No transcript found for this video');
      }

      options?.onProcessingUpdate?.('Processing complete', 100);

      return {
        transcript: response.data.transcript,
        videoId,
        title: response.data.title,
        duration: response.data.duration,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Video not found or transcript not available');
      }
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later');
      }
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error(error.message || 'Failed to fetch transcript');
    }
  }

  /**
   * Create a text file from transcript
   */
  static createTranscriptFile(
    transcript: string, 
    videoId: string, 
    title?: string
  ): File {
    const filename = title 
      ? `youtube-transcript-${title.replace(/[^a-zA-Z0-9]/g, '-')}-${videoId}.txt`
      : `youtube-transcript-${videoId}.txt`;

    const content = title 
      ? `YouTube Video: ${title}\nVideo ID: ${videoId}\n\n${transcript}`
      : `Video ID: ${videoId}\n\n${transcript}`;

    const blob = new Blob([content], { type: 'text/plain' });
    return new File([blob], filename, { type: 'text/plain' });
  }

  /**
   * Process YouTube URL to file - complete workflow
   */
  static async processYouTubeToFile(
    url: string,
    options?: TranscriptProcessingOptions
  ): Promise<{ file: File; metadata: TranscriptResponse }> {
    // Validate URL
    const validation = this.validateUrl(url);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Fetch transcript
    const transcriptData = await this.fetchTranscript(
      validation.videoId!,
      options
    );

    // Create file
    const file = this.createTranscriptFile(
      transcriptData.transcript,
      transcriptData.videoId,
      transcriptData.title
    );

    return {
      file,
      metadata: transcriptData
    };
  }

  /**
   * Get video metadata without fetching transcript
   */
  static async getVideoMetadata(videoId: string): Promise<{
    title?: string;
    duration?: number;
    thumbnailUrl?: string;
  }> {
    try {
      // This could be extended to use YouTube API for metadata
      // For now, return basic info
      return {
        title: `YouTube Video ${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      };
    } catch (error) {
      console.warn('Failed to fetch video metadata:', error);
      return {};
    }
  }
}
