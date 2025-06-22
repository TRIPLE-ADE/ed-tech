
/**
 *
 * If the name has less than two parts, it will return the initials of the available parts.
 * @param name - Full name from which to generate initials
 * @returns A string containing the first two initials of the name, capitalized.
 */

export function generateTwoInitials(name: string) {
  const nameParts = name.split(" ");
  const capitalised = nameParts.map((name) => name.charAt(0).toUpperCase());
  const initials = capitalised
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2);
  return initials;
}

/**
 * Truncates text and adds ellipsis if it exceeds maximum lengtah
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
}