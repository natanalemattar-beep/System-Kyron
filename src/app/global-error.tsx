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
        <div className="max-w-md w-full">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#060a14] border border-rose-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="h-16 w-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-rose-500/20">
                <ShieldAlert className="h-8 w-8 text-rose-500" />
              </div>
              
              <h1 className="text-2xl font-black text-center mb-2 tracking-tight uppercase italic">Fallo Crítico del Sistema</h1>
              <p className="text-rose-200/60 text-center text-sm mb-8 leading-relaxed">
                El núcleo de Kyron ha experimentado una interrupción inesperada. Los protocolos de seguridad han aislado el error para proteger la integridad de sus datos.
              </p>

              <div className="bg-black/40 rounded-xl p-4 mb-8 font-mono text-[10px] border border-white/5 space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-rose-500/50 uppercase font-black tracking-widest">Estado</span>
                  <span className="text-rose-500 uppercase">Fallo_Núcleo_Alfa</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-rose-500/50 uppercase font-black tracking-widest">Digest</span>
                  <span className="text-zinc-500 truncate ml-4 font-bold">{error?.digest || 'ERR-CORE-FATAL'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => reset()}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black uppercase tracking-[0.2em] h-12 rounded-xl shadow-lg shadow-rose-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reiniciar Protocolos
                </button>
                <Link href="/" className="w-full">
                  <button 
                    className="w-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] h-12 rounded-xl transition-all"
                  >
                    Volver al Inicio
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">System Kyron Alpha · v4.0.2</p>
          </div>
        </div>
      </body>
    </html>
  );
}
