'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConstructionBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('kyron-construction-banner-dismissed');
    if (dismissed) setVisible(false);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('kyron-construction-banner-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className={cn(
      'relative w-full py-3 px-4 text-center',
      'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500',
      'text-amber-950 font-bold text-xs sm:text-sm',
      'shadow-lg shadow-amber-500/20',
      'animate-pulse-slow'
    )}>
      <div className="container mx-auto flex items-center justify-center gap-3 relative">
        <Hammer className="h-4 w-4 animate-bounce" />
        <span className="uppercase tracking-wider">
          ⚠️ Página en construcción — Puede tener errores • Pasarela de pago en desarrollo
        </span>
        <button
          onClick={handleDismiss}
          className="absolute right-4 p-1 hover:bg-amber-600/20 rounded-full transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
