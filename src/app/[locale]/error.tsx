'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Server Error Captured:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="relative h-20 w-20 rounded-3xl bg-slate-950 border border-rose-500/20 flex items-center justify-center shadow-2xl shadow-rose-500/10">
            <ShieldAlert className="h-10 w-10 text-rose-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase font-impact italic">
            Interferencia en el <span className="text-rose-500">Nexo</span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Se ha detectado una anomalía crítica en el flujo de datos del servidor. Los protocolos de seguridad han aislado el error para proteger tu sesión.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-[10px] text-rose-500/60 break-all">
          ID-ERROR: {error.digest || 'SK-UNKNOWN-FAIL'}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => reset()}
            className="rounded-xl h-12 px-6 font-bold text-[11px] uppercase tracking-widest bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Reiniciar Protocolos
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="rounded-xl h-12 px-6 font-bold text-[11px] uppercase tracking-widest border-white/10 hover:bg-white/5"
          >
            <Home className="mr-2 h-4 w-4" /> Nodo Central
          </Button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-2 opacity-20">
          <div className="h-px w-8 bg-current" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] font-tech">Kyron Safe-Core 2026</span>
          <div className="h-px w-8 bg-current" />
        </div>
      </motion.div>
    </div>
  );
}
