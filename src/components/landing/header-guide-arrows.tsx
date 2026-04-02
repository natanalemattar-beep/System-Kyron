'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'kyron-header-guide-seen';
const TUTORIAL_KEY = 'kyron-tutorial-seen';

interface ButtonPos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function HeaderGuideArrows() {
  const [show, setShow] = useState(false);
  const [registerPos, setRegisterPos] = useState<ButtonPos | null>(null);
  const [accessPos, setAccessPos] = useState<ButtonPos | null>(null);

  const findButtons = useCallback(() => {
    const regBtn = document.querySelector('[data-guide="register"]');
    const accBtn = document.querySelector('[data-guide="access"]');

    if (regBtn) {
      const rect = regBtn.getBoundingClientRect();
      setRegisterPos({ x: rect.left + rect.width / 2, y: rect.bottom, w: rect.width, h: rect.height });
    }
    if (accBtn) {
      const rect = accBtn.getBoundingClientRect();
      setAccessPos({ x: rect.left + rect.width / 2, y: rect.bottom, w: rect.width, h: rect.height });
    }

    return !!(regBtn && accBtn);
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    let cancelled = false;

    const cleanup = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };

    const tryShow = () => {
      if (cancelled) return;
      const t = setTimeout(() => {
        if (cancelled) return;
        if (findButtons()) {
          setShow(true);
        } else {
          const retry = setInterval(() => {
            if (cancelled) { clearInterval(retry); return; }
            if (findButtons()) {
              setShow(true);
              clearInterval(retry);
            }
          }, 500);
          intervals.push(retry);
          const stop = setTimeout(() => clearInterval(retry), 5000);
          timers.push(stop);
        }
      }, 2000);
      timers.push(t);
    };

    const tutorialAlreadySeen = localStorage.getItem(TUTORIAL_KEY);
    if (tutorialAlreadySeen) {
      tryShow();
    } else {
      const poll = setInterval(() => {
        if (cancelled) { clearInterval(poll); return; }
        if (localStorage.getItem(TUTORIAL_KEY)) {
          clearInterval(poll);
          tryShow();
        }
      }, 500);
      intervals.push(poll);
      const maxWait = setTimeout(() => { clearInterval(poll); tryShow(); }, 60000);
      timers.push(maxWait);
    }

    return cleanup;
  }, [findButtons]);

  const handleDismiss = useCallback(() => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  useEffect(() => {
    if (!show) return;
    const autoHide = setTimeout(handleDismiss, 12000);
    return () => clearTimeout(autoHide);
  }, [show, handleDismiss]);

  useEffect(() => {
    if (!show) return;
    const onScroll = () => handleDismiss();
    window.addEventListener('scroll', onScroll, { passive: true, once: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [show, handleDismiss]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[140] bg-black/50 backdrop-blur-[2px]"
            onClick={handleDismiss}
          />

          {registerPos && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="fixed z-[160] flex flex-col items-end pointer-events-none"
              style={{
                left: registerPos.x - registerPos.w / 2 - 8,
                top: registerPos.y + 8,
                transform: 'translateX(-50%)',
              }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <motion.path
                    d="M12 0 L12 24"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <motion.path
                    d="M5 18 L12 26 L19 18"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 bg-emerald-500/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 pointer-events-auto"
              >
                <p className="text-[11px] font-bold leading-snug text-center whitespace-nowrap">
                  ¿Nuevo? Crea tu cuenta aquí
                </p>
                <p className="text-[9px] font-medium text-emerald-100/80 mt-0.5 text-center">
                  Registro rápido en 2 min
                </p>
              </motion.div>
            </motion.div>
          )}

          {accessPos && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="fixed z-[160] flex flex-col items-start pointer-events-none"
              style={{
                left: accessPos.x + accessPos.w / 2 + 8,
                top: accessPos.y + 8,
                transform: 'translateX(-50%)',
              }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <motion.path
                    d="M12 0 L12 24"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                  <motion.path
                    d="M5 18 L12 26 L19 18"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 bg-blue-500/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 pointer-events-auto"
              >
                <p className="text-[11px] font-bold leading-snug text-center whitespace-nowrap">
                  ¿Ya tienes cuenta? Accede aquí
                </p>
                <p className="text-[9px] font-medium text-blue-100/80 mt-0.5 text-center">
                  Acceso seguro AES-256
                </p>
              </motion.div>
            </motion.div>
          )}

          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[160]"
            >
              <div className="bg-card/95 backdrop-blur-xl border border-border/30 rounded-2xl p-4 shadow-2xl max-w-[300px] text-center">
                <p className="text-sm font-bold text-foreground mb-1">Comienza aquí</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Usa el menú para registrarte o acceder a tu portal
                </p>
                <button
                  onClick={handleDismiss}
                  className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors pointer-events-auto"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleDismiss}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[160] hidden sm:flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border/30 rounded-xl px-5 py-2.5 shadow-lg hover:bg-card transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Entendido
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="fixed top-0 left-0 right-0 h-[80px] z-[155] hidden sm:block"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none',
            }}
          >
            {registerPos && (
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute rounded-xl border-2 border-emerald-400/60"
                style={{
                  left: registerPos.x - registerPos.w / 2 - 4,
                  top: registerPos.y - registerPos.h - 4,
                  width: registerPos.w + 8,
                  height: registerPos.h + 8,
                  boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                }}
              />
            )}
            {accessPos && (
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
                className="absolute rounded-xl border-2 border-blue-400/60"
                style={{
                  left: accessPos.x - accessPos.w / 2 - 4,
                  top: accessPos.y - accessPos.h - 4,
                  width: accessPos.w + 8,
                  height: accessPos.h + 8,
                  boxShadow: '0 0 15px rgba(59,130,246,0.3)',
                }}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
