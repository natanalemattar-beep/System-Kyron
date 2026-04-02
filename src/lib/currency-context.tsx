"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type CurrencyCode = "VES" | "USD" | "EUR";

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  VES: { code: "VES", symbol: "Bs.", label: "Bolívares", flag: "🇻🇪" },
  USD: { code: "USD", symbol: "$", label: "Dólares", flag: "🇺🇸" },
  EUR: { code: "EUR", symbol: "€", label: "Euros", flag: "🇪🇺" },
};

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  VES: 1,
  USD: 1 / 40.0,
  EUR: 1 / 43.5,
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  config: CurrencyConfig;
  convert: (amountInVes: number) => number;
  format: (amountInVes: number) => string;
  formatRaw: (amount: number) => string;
  rate: number;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("VES");

  const config = CURRENCIES[currency];
  const rate = EXCHANGE_RATES[currency];

  const convert = useCallback((amountInVes: number) => {
    const safe = Number.isFinite(amountInVes) ? amountInVes : 0;
    return safe * rate;
  }, [rate]);

  const formatRaw = useCallback((amount: number) => {
    const safe = Number.isFinite(amount) ? amount : 0;
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe);
  }, []);

  const format = useCallback((amountInVes: number) => {
    const converted = convert(amountInVes);
    return `${config.symbol} ${formatRaw(converted)}`;
  }, [convert, config.symbol, formatRaw]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, config, convert, format, formatRaw, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
