"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";

const BannerCtx = createContext(false);
export const useBannerVisible = () => useContext(BannerCtx);

export function DemoBannerProvider({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <BannerCtx.Provider value={!dismissed}>
      {!dismissed && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-amber-950 py-2 px-4 flex items-center justify-center gap-3 shadow-lg text-center">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p className="text-[11px] font-black uppercase tracking-[0.15em]">
            Fase de Demostración — Los datos mostrados son ilustrativos. Plataforma en desarrollo activo.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-1 rounded-full hover:bg-amber-600/20 transition-colors flex-shrink-0"
            aria-label="Cerrar banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {children}
    </BannerCtx.Provider>
  );
}
