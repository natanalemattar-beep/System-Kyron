'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, CheckCircle2, X, SignalLow, Wifi } from 'lucide-react';

type ConnectionState = 'good' | 'slow' | 'offline' | 'recovered';

function detectSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  if (conn.effectiveType === 'slow-2g') return true;
  if (typeof conn.downlink === 'number' && conn.downlink <= 0.25) return true;
  if (typeof conn.rtt === 'number' && conn.rtt > 10000) return true;
  return false;
}

const STATE_TOKENS = {
  offline: {
    glow:    'rgba(239,68,68,0.18)',
    glass:   'rgba(239,68,68,0.08)',
    border:  'rgba(239,68,68,0.25)',
    shine:   'rgba(254,202,202,0.10)',
    bar:     '#f87171',
    barBg:   'rgba(239,68,68,0.12)',
    iconBg:  'rgba(239,68,68,0.15)',
    iconRing:'rgba(239,68,68,0.30)',
    icon:    '#f87171',
    label:   'rgba(254,226,226,0.92)',
    sub:     'rgba(252,165,165,0.70)',
    close:   'rgba(248,113,113,0.80)',
    closeHov:'rgba(239,68,68,0.20)',
  },
  recovered: {
    glow:    'rgba(34,197,94,0.18)',
    glass:   'rgba(34,197,94,0.08)',
    border:  'rgba(34,197,94,0.28)',
    shine:   'rgba(187,247,208,0.10)',
    bar:     '#4ade80',
    barBg:   'rgba(34,197,94,0.12)',
    iconBg:  'rgba(34,197,94,0.15)',
    iconRing:'rgba(34,197,94,0.30)',
    icon:    '#4ade80',
    label:   'rgba(220,252,231,0.92)',
    sub:     'rgba(134,239,172,0.70)',
    close:   'rgba(74,222,128,0.80)',
    closeHov:'rgba(34,197,94,0.20)',
  },
  slow: {
    glow:    'rgba(245,158,11,0.18)',
    glass:   'rgba(245,158,11,0.07)',
    border:  'rgba(245,158,11,0.25)',
    shine:   'rgba(253,230,138,0.10)',
    bar:     '#fbbf24',
    barBg:   'rgba(245,158,11,0.12)',
    iconBg:  'rgba(245,158,11,0.14)',
    iconRing:'rgba(245,158,11,0.28)',
    icon:    '#fbbf24',
    label:   'rgba(255,251,235,0.92)',
    sub:     'rgba(252,211,77,0.70)',
    close:   'rgba(251,191,36,0.80)',
    closeHov:'rgba(245,158,11,0.20)',
  },
};

const SLOW_THRESHOLD_MS = 20000;
const CONSECUTIVE_SLOW_REQUIRED = 3;
const INITIAL_DELAY_MS = 45000;
const CHECK_INTERVAL_MS = 120000;
const PING_TIMEOUT_MS = 25000;

export function SlowConnectionBanner() {
  const [state, setState] = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);
  const mountedRef = useRef(true);
  const prevStateRef = useRef<ConnectionState>('good');
  const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slowCountRef = useRef(0);
  const checkCountRef = useRef(0);

  const checkConnection = useCallback(() => {
    if (!mountedRef.current) return;
    const wasOfflineOrSlow = prevStateRef.current === 'offline' || prevStateRef.current === 'slow';

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      prevStateRef.current = 'offline';
      setState('offline');
      setDismissed(false);
      return;
    }

    if (detectSlowConnection()) {
      slowCountRef.current++;
      if (slowCountRef.current >= CONSECUTIVE_SLOW_REQUIRED) {
        prevStateRef.current = 'slow';
        setState('slow');
        setDismissed(false);
      }
      return;
    }

    const start = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

    fetch('/api/ping', { method: 'HEAD', cache: 'no-store', signal: controller.signal })
      .then(() => {
        clearTimeout(timeout);
        const elapsed = performance.now() - start;
        if (!mountedRef.current) return;
        checkCountRef.current++;

        if (elapsed > SLOW_THRESHOLD_MS && checkCountRef.current > 1) {
          slowCountRef.current++;
          if (slowCountRef.current >= CONSECUTIVE_SLOW_REQUIRED) {
            prevStateRef.current = 'slow';
            setState('slow');
            setDismissed(false);
          }
        } else {
          if (slowCountRef.current > 0) slowCountRef.current = Math.max(0, slowCountRef.current - 1);

          if (wasOfflineOrSlow && checkCountRef.current > 1) {
            setState('recovered');
            setDismissed(false);
            if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
            recoveryTimerRef.current = setTimeout(() => {
              if (mountedRef.current) { prevStateRef.current = 'good'; setState('good'); }
            }, 4000);
          } else {
            prevStateRef.current = 'good';
            setState('good');
          }
        }
      })
      .catch((err: unknown) => {
        clearTimeout(timeout);
        if (!mountedRef.current) return;
        checkCountRef.current++;

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          prevStateRef.current = 'offline'; setState('offline'); setDismissed(false);
        } else {
          slowCountRef.current++;
          if (slowCountRef.current >= CONSECUTIVE_SLOW_REQUIRED && checkCountRef.current > 1) {
            prevStateRef.current = 'slow'; setState('slow'); setDismissed(false);
          }
        }
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const initialDelay = setTimeout(checkConnection, INITIAL_DELAY_MS);
    const interval = setInterval(checkConnection, CHECK_INTERVAL_MS);
    const handleOnline = () => {
      if (!mountedRef.current) return;
      slowCountRef.current = 0;
      setTimeout(() => { if (mountedRef.current) checkConnection(); }, 2000);
    };
    const handleOffline = () => {
      if (!mountedRef.current) return;
      prevStateRef.current = 'offline';
      setState('offline');
      setDismissed(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    const conn = (navigator as any).connection;
    const handleChange = () => {
      if (!mountedRef.current) return;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        if (mountedRef.current) checkConnection();
      }, 3000);
    };
    conn?.addEventListener?.('change', handleChange);
    return () => {
      mountedRef.current = false;
      clearTimeout(initialDelay);
      clearInterval(interval);
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
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
  if (dismissed && state !== 'recovered') return null;

  const isOffline   = state === 'offline';
  const isRecovered = state === 'recovered';
  const isSlow      = state === 'slow';
  const t = isOffline ? STATE_TOKENS.offline : isRecovered ? STATE_TOKENS.recovered : STATE_TOKENS.slow;

  const label = isOffline ? 'Sin conexión' : isRecovered ? 'Conexión restaurada' : 'Conexión lenta';
  const sub   = isOffline ? 'Verifica tu red o Wi-Fi' : isRecovered ? 'Todo vuelve a la normalidad' : 'La red está respondiendo despacio';

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-[300] flex items-center justify-center pointer-events-none
        transition-all duration-500 ease-out
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
      `}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="pointer-events-auto mt-3 mx-4 max-w-md w-full relative">

        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-60 pointer-events-none -z-10"
          style={{ background: t.glow, transform: 'scale(1.08) translateY(4px)' }}
        />

        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${t.glass} 0%, rgba(255,255,255,0.03) 50%, ${t.glass} 100%)`,
            backdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.05)',
            border: `1px solid ${t.border}`,
            boxShadow: `
              0 0 0 0.5px rgba(255,255,255,0.06) inset,
              0 1px 0 rgba(255,255,255,0.12) inset,
              0 -1px 0 rgba(0,0,0,0.08) inset,
              0 8px 32px -8px rgba(0,0,0,0.35),
              0 2px 8px rgba(0,0,0,0.15)
            `,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${t.shine}, rgba(255,255,255,0.14), ${t.shine}, transparent)` }}
          />

          <div className="relative flex items-center gap-3 px-4 py-3">

            <div
              className="flex-shrink-0"
              style={{
                width: 36, height: 36,
                borderRadius: 12,
                background: t.iconBg,
                border: `1px solid ${t.iconRing}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {isOffline   && <WifiOff    className="h-4 w-4 animate-pulse" style={{ color: t.icon }} />}
              {isRecovered && <Wifi       className="h-4 w-4" style={{ color: t.icon }} />}
              {isSlow      && <SignalLow  className="h-4 w-4" style={{ color: t.icon }} />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold leading-tight truncate" style={{ color: t.label }}>
                {label}
              </p>
              <p className="text-[11px] leading-tight mt-0.5 truncate" style={{ color: t.sub }}>
                {sub}
              </p>
            </div>

            {!isRecovered && (
              <button
                onClick={() => setDismissed(true)}
                className="flex-shrink-0 transition-all duration-200 border-none bg-transparent cursor-pointer rounded-lg p-1.5"
                aria-label="Cerrar aviso"
                style={{ color: t.close }}
                onMouseEnter={e => (e.currentTarget.style.background = t.closeHov)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden"
            style={{ height: 2, background: t.barBg }}
          >
            {(isSlow || isOffline) && (
              <div
                className="h-full rounded-full"
                style={{
                  width: '35%',
                  background: `linear-gradient(90deg, transparent, ${t.bar}, transparent)`,
                  animation: 'scb-slide 2.2s ease-in-out infinite',
                  boxShadow: `0 0 6px ${t.bar}`,
                }}
              />
            )}
            {isRecovered && (
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${t.bar}99, ${t.bar})`,
                  animation: 'scb-fill 1s ease-out forwards',
                  boxShadow: `0 0 6px ${t.bar}`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
