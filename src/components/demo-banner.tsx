'use client';

import { useState } from 'react';
import { X, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DemoBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-[300] w-full bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4 max-w-7xl">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="shrink-0 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-md bg-amber-500/15 border border-amber-500/30">
                <FlaskConical className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
              </div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wide sm:tracking-widest text-amber-600 dark:text-amber-400 leading-snug">
                <span className="text-amber-500 mr-1">DEMO —</span>
                <span className="hidden xs:inline">Esta plataforma está en fase de demostración.</span>
                <span className="xs:hidden">Plataforma en demo.</span>
                <span className="hidden sm:inline"> Pueden existir cambios sin previo aviso.</span>
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              aria-label="Cerrar aviso"
              className="shrink-0 text-amber-500/60 hover:text-amber-500 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
