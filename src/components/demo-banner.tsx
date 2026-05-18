"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Link } from "@/navigation";

const BannerCtx = createContext(false);
export const useBannerVisible = () => useContext(BannerCtx);

export function DemoBannerProvider({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (sessionStorage.getItem('demo-banner-dismissed') === '1') {
      setDismissed(true);
    }
    setHydrated(true);
  }, []);

  const t = useTranslations('DemoBanner');

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLeaving(true);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem('demo-banner-dismissed', '1');
    }, 450);
  }, []);

  if (!hydrated) return <>{children}</>;

  const isVisible = !dismissed && !isScrolled;

  return (
    <BannerCtx.Provider value={isVisible}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -44, opacity: 0 }}
            animate={
              isLeaving
                ? { y: -44, opacity: 0, height: 0 }
                : { y: 0, opacity: 1 }
            }
            exit={{ y: -44, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[200] h-9 sm:h-10 flex items-center justify-center bg-[#060a14] border-b border-amber-500/20 overflow-hidden"
          >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-cyan-500/5 to-amber-500/10 animate-pulse" />
            
            <div className="container max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 relative z-10">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/90 whitespace-nowrap">
                  Página en construcción
                </p>
              </div>

              <Link 
                href="/login" 
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all group"
              >
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">{t('cta')}</span>
                <ArrowRight className="h-2.5 w-2.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={handleDismiss}
                className="p-1 rounded-full hover:bg-white/5 transition-colors ml-2"
                aria-label={t('dismiss')}
              >
                <X className="h-3 w-3 text-white/40 hover:text-white/60" />
              </button>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </BannerCtx.Provider>
  );
}


