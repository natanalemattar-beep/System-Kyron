"use client";

import { CurrencyProvider } from "@/lib/currency-context";

export default function VentasLayout({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  );
}
