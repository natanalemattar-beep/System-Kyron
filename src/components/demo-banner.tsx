"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Construction, X } from "lucide-react";

const BannerCtx = createContext(false);
export const useBannerVisible = () => useContext(BannerCtx);

export function DemoBannerProvider({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <BannerCtx.Provider value={!dismissed}>
      {!dismissed && (
        <div className="fixed top-0 left-0 right-0 z-[9999] py-2.5 px-4 flex items-center justify-center gap-3 text-center backdrop-blur-2xl bg-white/40 dark:bg-white/[0.06] border-b border-white/30 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/[0.08] via-violet-400/[0.06] to-cyan-400/[0.08] dark:from-sky-400/[0.04] dark:via-violet-400/[0.03] dark:to-cyan-400/[0.04] pointer-events-none" />
          <Construction className="h-3.5 w-3.5 flex-shrink-0 text-foreground/60 relative z-10" />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 relative z-10">
            Plataforma en construcción — Pueden ocurrir cambios y caídas temporales del servicio.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-1 rounded-full hover:bg-foreground/5 transition-colors flex-shrink-0 relative z-10"
            aria-label="Cerrar banner"
          >
            <X className="h-3 w-3 text-foreground/40" />
          </button>
        </div>
      )}
      {children}
    </BannerCtx.Provider>
  );
}
