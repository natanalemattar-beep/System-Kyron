'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Zap } from 'lucide-react';
import { useIsOffline } from '@/hooks/use-is-offline';

export function OfflineIndicator() {
  const isOffline = useIsOffline();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-3xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[320px] max-w-[90vw]"
        >
          <div className="relative flex items-center justify-center h-10 w-10 shrink-0 bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <WifiOff className="h-5 w-5 text-amber-500" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-[13px] font-black text-white leading-tight">
              Te quedaste sin internet
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Pero puedes seguir usando algunos módulos
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
             <Zap className="h-3 w-3 text-emerald-400 animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Activo</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
