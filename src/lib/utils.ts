
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "Bs.") {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "Bs.";
  const formattedAmount = new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol} ${formattedAmount}`;
}

export function formatDate(date: string | Date | null) {
  if (!date) return "N/A";
  const dateObj = typeof date === 'string' ? new Date(date) : date;
   // Add timezone offset to prevent date from changing
  const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  return new Date(dateObj.getTime() + userTimezoneOffset).toLocaleDateString('es-VE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('es-VE', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};
