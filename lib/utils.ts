import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatIndex(n: number, total?: number): string {
  const padded = n.toString().padStart(2, "0");
  return total ? `${padded} / ${total.toString().padStart(2, "0")}` : padded;
}
