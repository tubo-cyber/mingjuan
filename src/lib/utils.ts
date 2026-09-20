import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padChap(bookId: string, chap: number): string {
  if (bookId === "19") return String(chap).padStart(3, "0");
  return String(chap).padStart(2, "0");
}
