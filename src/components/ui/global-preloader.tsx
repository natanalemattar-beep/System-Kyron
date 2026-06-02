"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/logo';

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      if (!fadeOut) setFadeOut(true);
      setTimeout(() => setIsLoading(false), 400);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      const t = setTimeout(() => { if (!fadeOut) setFadeOut(true); setTimeout(() => setIsLoading(false), 400); }, 0);
      return () => clearTimeout(t);
    } else {
      const onReady = () => dismiss();
      document.addEventListener('DOMContentLoaded', onReady);
      const onLoad = () => dismiss();
      window.addEventListener('load', onLoad);
      const timeout = setTimeout(dismiss, 4000);
      return () => {
        document.removeEventListener('DOMContentLoaded', onReady);
        window.removeEventListener('load', onLoad);
        clearTimeout(timeout);
      };
    }
  }, [fadeOut]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] pointer-events-none"
        >
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
              <motion.div 
                animate={fadeOut ? { rotate: 360, opacity: 0 } : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full"
              />
              <motion.div 
                animate={fadeOut ? { rotate: -360, opacity: 0 } : { rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-blue-500/30 rounded-full"
              />
              <motion.div 
                animate={fadeOut ? { rotate: 360, opacity: 0 } : { rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-[1px] border-cyan-500/10 rounded-full"
              />
            </div>

            <div className="relative z-10 h-24 w-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
              <Logo className="w-12 h-12 text-white relative z-10" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: fadeOut ? 0 : 1, y: fadeOut ? -10 : 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-full mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400/60">
                System Kyron
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: fadeOut ? 0 : [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="h-1 w-1 rounded-full bg-cyan-500"
                  />
                ))}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mt-2">
                Cargando...
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
