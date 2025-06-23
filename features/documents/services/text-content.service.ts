export interface TextContentOptions {
  filename?: string;
  addTimestamp?: boolean;
  maxLength?: number;
}

export interface TextValidationResult {
  isValid: boolean;
  error?: string;
  wordCount?: number;
  charCount?: number;
}

export class TextContentService {
  private static readonly DEFAULT_MAX_LENGTH = 1000000; // 1MB of text
  private static readonly MIN_LENGTH = 10;

  /**
   * Validate text content
   */
  static validateContent(content: string, options?: { maxLength?: number }): TextValidationResult {
    const trimmedContent = content.trim();
    const maxLength = options?.maxLength || this.DEFAULT_MAX_LENGTH;

    if (!trimmedContent) {
      return { 
        isValid: false, 
        error: 'Content is required' 
      };
    }

    if (trimmedContent.length < this.MIN_LENGTH) {
      return { 
        isValid: false, 
        error: `Content must be at least ${this.MIN_LENGTH} characters` 
      };
    }

    if (trimmedContent.length > maxLength) {
      return { 
        isValid: false, 
        error: `Content exceeds maximum length of ${this.formatContentSize(maxLength)}` 
      };
    }

    const wordCount = trimmedContent.split(/\s+/).length;
    const charCount = trimmedContent.length;

    return { 
      isValid: true, 
      wordCount, 
      charCount 
    };
  }

  /**
   * Generate filename for text content
   */
  static generateFilename(content: string, options?: TextContentOptions): string {
    if (options?.filename) {
      // Ensure .txt extension
      const filename = options.filename;
      return filename.endsWith('.txt') ? filename : `${filename}.txt`;
    }

    // Generate from content preview
    const preview = content.trim().slice(0, 30).replace(/[^a-zA-Z0-9\s]/g, '');
    const sanitizedPreview = preview.replace(/\s+/g, '-').toLowerCase();
    
    if (options?.addTimestamp !== false) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      return `text-content-${sanitizedPreview}-${timestamp}.txt`;
    }

    return `text-content-${sanitizedPreview}.txt`;
  }

  /**
   * Create file from text content
   */
  static createTextFile(content: string, options?: TextContentOptions): File {
    const validation = this.validateContent(content, { 
      maxLength: options?.maxLength 
    });

    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const filename = this.generateFilename(content, options);
    const enhancedContent = this.enhanceContent(content, validation);

    const blob = new Blob([enhancedContent], { type: 'text/plain' });
    return new File([blob], filename, { type: 'text/plain' });
  }

  /**
   * Enhance content with metadata
   */
  private static enhanceContent(content: string, validation: TextValidationResult): string {
    const timestamp = new Date().toISOString();
    const header = [
      `Created: ${timestamp}`,
      `Word Count: ${validation.wordCount}`,
      `Character Count: ${validation.charCount}`,
      '---',
      ''
    ].join('\n');

    return header + content.trim();
  }

  /**
   * Format content size for display
   */
  static formatContentSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get content statistics
   */
  static getContentStats(content: string): {
    wordCount: number;
    charCount: number;
    lineCount: number;
    paragraphCount: number;
    estimatedReadingTime: number; // in minutes
  } {
    const trimmedContent = content.trim();
    const wordCount = trimmedContent.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = trimmedContent.length;
    const lineCount = trimmedContent.split('\n').length;
    const paragraphCount = trimmedContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Average reading speed: 200 words per minute
    const estimatedReadingTime = Math.ceil(wordCount / 200);

    return {
      wordCount,
      charCount,
      lineCount,
      paragraphCount,
      estimatedReadingTime
    };
  }

  /**
   * Clean and format text content
   */
  static cleanContent(content: string): string {
    return content
      .trim()
      // Remove excessive whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Remove trailing spaces
      .replace(/[ \t]+$/gm, '')
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');
  }

  /**
   * Extract preview from content
   */
  static getContentPreview(content: string, maxLength: number = 100): string {
    const cleaned = this.cleanContent(content);
    if (cleaned.length <= maxLength) {
      return cleaned;
    }
    
    return cleaned.slice(0, maxLength).trim() + '...';
  }

  /**
   * Process text content to file - complete workflow
   */
  static processTextToFile(
    content: string, 
    options?: TextContentOptions
  ): { file: File; stats: ReturnType<typeof TextContentService.getContentStats> } {
    // Clean content
    const cleanedContent = this.cleanContent(content);
    
    // Get statistics
    const stats = this.getContentStats(cleanedContent);
    
    // Create file
    const file = this.createTextFile(cleanedContent, options);

    return { file, stats };
  }
}
