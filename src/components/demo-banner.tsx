'use client';

import { useState } from 'react';
import { X, Rocket } from 'lucide-react';

export function DemoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-[300] w-full bg-primary/5 border-b border-primary/15 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4 max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="shrink-0 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-md bg-primary/10 border border-primary/20">
            <Rocket className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
          </div>
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide sm:tracking-widest text-primary/80 leading-snug">
            <span className="font-black mr-1">Acceso Anticipado</span>
            <span className="hidden xs:inline">— Estás entre los primeros en usar System Kyron.</span>
            <span className="xs:hidden">— Acceso exclusivo.</span>
            <span className="hidden sm:inline"> Nuevas funciones se agregan constantemente.</span>
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar aviso"
          className="shrink-0 text-primary/40 hover:text-primary transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
