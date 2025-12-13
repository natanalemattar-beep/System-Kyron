
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: "Bs." | "USD" | "EUR" = "Bs.") {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "Bs.";
  const formattedAmount = new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol} ${formattedAmount}`;
}

export function formatDate(date: string | Date | null) {
  if (!date) return "N/A";
  
  let dateObj: Date;

  if (typeof date === 'string') {
    // Attempt to handle 'DD/MM/YYYY' format if present
    if (date.includes('/')) {
      const parts = date.split('/');
      if (parts.length === 3) {
        // Assuming DD/MM/YYYY
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

   // Add timezone offset to prevent date from changing due to browser's timezone
  const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(dateObj.getTime() + userTimezoneOffset);

  return adjustedDate.toLocaleDateString('es-VE', {
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
