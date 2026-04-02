"use client";

import { useCurrency, CURRENCIES, type CurrencyCode } from "@/lib/currency-context";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={cn("inline-flex items-center gap-1 p-1 rounded-xl bg-card/50 border border-border/20 backdrop-blur-sm", className)}>
      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
        const c = CURRENCIES[code];
        const isActive = currency === code;
        return (
          <button
            key={code}
            onClick={() => setCurrency(code)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300",
              isActive
                ? "bg-primary/15 text-primary border border-primary/20 shadow-[0_0_12px_-3px_rgba(14,165,233,0.3)]"
                : "text-muted-foreground/40 hover:text-muted-foreground/60 hover:bg-muted/20"
            )}
          >
            <span className="text-xs">{c.flag}</span>
            <span>{c.symbol}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CurrencySelectorCompact({ className }: { className?: string }) {
  const { currency, setCurrency, config } = useCurrency();
  const codes: CurrencyCode[] = ["VES", "USD", "EUR"];

  const nextCurrency = () => {
    const idx = codes.indexOf(currency);
    setCurrency(codes[(idx + 1) % codes.length]);
  };

  return (
    <button
      onClick={nextCurrency}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/20 bg-card/50 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <DollarSign className="h-3 w-3" />
      <span>{config.flag}</span>
      <span>{config.symbol}</span>
    </button>
  );
}
