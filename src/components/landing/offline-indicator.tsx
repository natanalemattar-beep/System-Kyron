'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Activity } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    if (typeof window !== 'undefined') {
      setIsOffline(!window.navigator.onLine);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md shadow-2xl"
        >
          <div className="relative flex items-center justify-center">
            <WifiOff className="h-4 w-4 text-amber-400" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-20 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-wide">Modo Offline Kyron</span>
            <span className="text-[10px] text-slate-300">Funciones PWA activas</span>
          </div>
          <Activity className="h-4 w-4 text-emerald-400 ml-2" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
