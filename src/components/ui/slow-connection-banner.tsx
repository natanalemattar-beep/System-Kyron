'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type ConnectionState = 'good' | 'slow' | 'offline';

function detectSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
  if (typeof conn.downlink === 'number' && conn.downlink < 0.5) return true;
  if (typeof conn.rtt === 'number' && conn.rtt > 1500) return true;
  return false;
}

export function SlowConnectionBanner() {
  const [state, setState] = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);
  const mountedRef = useRef(true);

  const checkConnection = useCallback(() => {
    if (!mountedRef.current) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setState('offline');
      setDismissed(false);
      return;
    }

    if (detectSlowConnection()) {
      setState('slow');
      setDismissed(false);
      return;
    }

    const start = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch('/api/db-health', {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(() => {
        clearTimeout(timeout);
        const elapsed = performance.now() - start;
        if (!mountedRef.current) return;
        if (elapsed > 5000) {
          setState('slow');
          setDismissed(false);
        } else {
          setState('good');
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!mountedRef.current) return;
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          setState('offline');
          setDismissed(false);
        } else {
          setState('slow');
          setDismissed(false);
        }
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const initialDelay = setTimeout(checkConnection, 4000);
    const interval = setInterval(checkConnection, 30000);

    const handleOnline = () => {
      if (mountedRef.current) {
        setState('good');
        setTimeout(checkConnection, 2000);
      }
    };
    const handleOffline = () => {
      if (mountedRef.current) {
        setState('offline');
        setDismissed(false);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const conn = (navigator as any).connection;
    const handleChange = () => {
      if (mountedRef.current) checkConnection();
    };
    conn?.addEventListener?.('change', handleChange);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialDelay);
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      conn?.removeEventListener?.('change', handleChange);
    };
  }, [checkConnection]);

  useEffect(() => {
    if (state !== 'good' && !dismissed) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [state, dismissed]);

  if (state === 'good') return null;
  if (dismissed) return null;

  const isOffline = state === 'offline';

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-[300] flex items-center justify-center pointer-events-none
        transition-all duration-500 ease-out
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
      `}
    >
      <div className="pointer-events-auto mt-4 mx-4 max-w-lg w-full">
        <div className={`
          relative overflow-hidden rounded-xl border shadow-2xl
          ${isOffline
            ? 'bg-red-950/90 border-red-500/30'
            : 'bg-amber-950/90 border-amber-500/30'
          }
        `}
        style={{ backdropFilter: 'blur(16px)' }}
        >
          <div className={`absolute inset-0 ${
            isOffline
              ? 'bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10'
              : 'bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10'
          }`} />

          {!isOffline && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-900/50 overflow-hidden">
              <div className="h-full w-1/3 bg-amber-400/60 rounded-full animate-[scb-slide_2.5s_ease-in-out_infinite]" />
            </div>
          )}

          <div className="relative flex items-center gap-3 px-4 py-3">
            <div className={`flex-shrink-0 p-2 rounded-lg ${
              isOffline ? 'bg-red-500/20' : 'bg-amber-500/20'
            }`}>
              {isOffline ? (
                <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M3 3l18 18" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${
                isOffline ? 'text-red-200' : 'text-amber-200'
              }`}>
                {isOffline ? 'Sin conexión a Internet' : 'Conexión lenta detectada'}
              </p>
              <p className={`text-xs mt-0.5 ${
                isOffline ? 'text-red-300/70' : 'text-amber-300/70'
              }`}>
                {isOffline
                  ? 'Verifica tu conexión. Algunas funciones no estarán disponibles.'
                  : 'La carga puede tardar más de lo esperado. Te pedimos paciencia.'}
              </p>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className={`flex-shrink-0 p-1.5 rounded-lg transition-colors border-none bg-transparent cursor-pointer ${
                isOffline
                  ? 'hover:bg-red-500/20 text-red-400'
                  : 'hover:bg-amber-500/20 text-amber-400'
              }`}
              aria-label="Cerrar aviso"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
