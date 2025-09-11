import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string) {
  // If we're in the browser, relative URLs work (rewrites apply)
  if (typeof window !== "undefined") return `${path}`;

  // If we're on the server, we must use an absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  return `${baseUrl}${path}`;
}
