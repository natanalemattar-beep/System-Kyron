'use client';

import { useEffect } from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Critical System Crash:', error);
  }, [error]);

  return (
    <html lang="es">
      <body className="bg-[#030711] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative h-20 w-20 rounded-3xl bg-slate-950 border border-red-500/40 flex items-center justify-center shadow-2xl">
              <ShieldAlert className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Fallo Crítico del <span className="text-red-500">Sistema</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              El núcleo de Kyron ha experimentado una interrupción inesperada. Se han activado los protocolos de recuperación de emergencia.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 font-mono text-[10px] text-red-400/60 break-all">
            ID-CRITICAL: {error.digest || 'ERR-CORE-FATAL'}
          </div>

          <button
            onClick={() => reset()}
            className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Reintentar Inicialización
          </button>
          
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
            Protocolo de Emergencia Kyron v2.0
          </p>
        </div>
      </body>
    </html>
  );
}
