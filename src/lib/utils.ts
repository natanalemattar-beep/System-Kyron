
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNetworkError(err: unknown): boolean {
  return err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('Failed to fetch'));
}

// Caching formatters for performance
const numberFormatters = new Map<string, Intl.NumberFormat>();
const dateFormatters = new Map<string, Intl.DateTimeFormat>();

function getNumberFormatter(locale: string, options: Intl.NumberFormatOptions = {}) {
  const key = `${locale}-${JSON.stringify(options)}`;
  if (!numberFormatters.has(key)) {
    numberFormatters.set(key, new Intl.NumberFormat(locale, options));
  }
  return numberFormatters.get(key)!;
}

function getDateFormatter(locale: string, options: Intl.DateTimeFormatOptions = {}) {
  const key = `${locale}-${JSON.stringify(options)}`;
  if (!dateFormatters.has(key)) {
    dateFormatters.set(key, new Intl.DateTimeFormat(locale, options));
  }
  return dateFormatters.get(key)!;
}

export function formatCurrency(amount: number, currency: string = "Bs.", locale?: string) {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "Bs.";
  const safe = Number.isFinite(amount) ? amount : 0;
  const loc = locale || "es-VE";
  
  const formattedAmount = getNumberFormatter(loc, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);

  return `${symbol} ${formattedAmount}`;
}

export function formatDate(date: string | Date | null, locale?: string) {
  if (!date) return "N/A";
  
  let dateObj: Date;

  if (typeof date === 'string') {
    if (date.includes('/')) {
      const parts = date.split('/');
      if (parts.length === 3) {
        dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  
  if (isNaN(dateObj.getTime())) {
    return "Fecha inválida";
  }

  const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(dateObj.getTime() + userTimezoneOffset);

  return getDateFormatter(locale || 'es-VE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(adjustedDate);
}

export function formatPercentage(value: number, locale?: string): string {
  return getNumberFormatter(locale || 'es-VE', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};
