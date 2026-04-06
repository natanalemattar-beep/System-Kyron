"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Construction, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

const BannerCtx = createContext(false);
export const useBannerVisible = () => useContext(BannerCtx);

export function DemoBannerProvider({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('demo-banner-dismissed') === '1';
    }
    return false;
  });
  const [isLeaving, setIsLeaving] = useState(false);
  const t = useTranslations('DemoBanner');

  const handleDismiss = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem('demo-banner-dismissed', '1');
    }, 450);
  }, []);

  return (
    <BannerCtx.Provider value={!dismissed}>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: -44, opacity: 0 }}
            animate={
              isLeaving
                ? { y: -44, opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={
              isLeaving
                ? { y: { duration: 0.35, ease: [0.32, 0, 0.67, 0] }, opacity: { duration: 0.25 }, height: { duration: 0.25, delay: 0.15 }, paddingTop: { duration: 0.25, delay: 0.15 }, paddingBottom: { duration: 0.25, delay: 0.15 } }
                : { y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4, delay: 0.1 } }
            }
            className="fixed top-0 left-0 right-0 z-[9999] py-2.5 px-4 flex items-center justify-center gap-3 text-center backdrop-blur-2xl bg-white/40 dark:bg-white/[0.06] border-b border-white/30 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/[0.08] via-violet-400/[0.06] to-cyan-400/[0.08] dark:from-sky-400/[0.04] dark:via-violet-400/[0.03] dark:to-cyan-400/[0.04] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={isLeaving ? { opacity: 0, scale: 0.5, rotate: 90 } : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: isLeaving ? 0 : 0.2 }}
            >
              <Construction className="h-3.5 w-3.5 flex-shrink-0 text-foreground/60 relative z-10" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isLeaving ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: isLeaving ? 0 : 0.25 }}
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 relative z-10"
            >
              {t('message')}
            </motion.p>
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.85 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLeaving ? 0 : 1 }}
              transition={{ duration: 0.3, delay: isLeaving ? 0 : 0.35 }}
              className="ml-2 p-1 rounded-full transition-colors flex-shrink-0 relative z-10"
              aria-label={t('dismiss')}
            >
              <X className="h-3 w-3 text-foreground/40" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </BannerCtx.Provider>
  );
}
