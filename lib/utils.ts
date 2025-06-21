import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTwoInitials(name: string) {
  const nameParts = name.split(" ");
  const capitalised = nameParts.map((name) => name.charAt(0).toUpperCase());
  const initials = capitalised.map((name) => name.charAt(0)).join("").slice(0, 2);
  return initials;
}