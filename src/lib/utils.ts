import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date,
  day: boolean = false,
  year: boolean = false,
): string {
  if (year) return date.toLocaleDateString("pt-BR", { year: "numeric" });

  return day
    ? date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : date
        .toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        })
        .replace(". de", ",");
}

export const terminalTitles: string[] = [
  "[ Vitor Dev ]",
  "[ Full Stack ]",
  "[ Available for projects ]",
];

export const commands = ["/last-post", "/last-project"];
