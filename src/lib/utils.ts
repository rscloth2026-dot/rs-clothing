import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian currency with ₹ symbol and Indian grouping system (lakhs, thousands)
 * e.g., 1499 -> "₹1,499", 125000 -> "₹1,25,000"
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "₹0";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(basePrice: number, comparePrice?: number | null): number {
  if (!comparePrice || comparePrice <= basePrice) return 0;
  return Math.round(((comparePrice - basePrice) / comparePrice) * 100);
}

export function formatDate(dateInput: string | Date): string {
  const d = new Date(dateInput);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
