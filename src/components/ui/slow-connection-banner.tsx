'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, X, SignalLow, Wifi } from 'lucide-react';

type ConnectionState = 'good' | 'slow' | 'offline' | 'recovered';

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

// Tiempo que debe tardar un ping para considerarse "lento" (ms)
const SLOW_THRESHOLD_MS    = 4000;
// Cuántos pings lentos consecutivos antes de mostrar el aviso
const CONSECUTIVE_SLOW     = 2;
// Primera verificación: 30 segundos tras cargar la página (evita falsos positivos de carga)
const INITIAL_DELAY_MS     = 30000;
// Verificación periódica cada 90 segundos
const CHECK_INTERVAL_MS    = 90000;
// Timeout máximo del ping
const PING_TIMEOUT_MS      = 8000;
// Cuánto tiempo se muestra el banner "Conexión restaurada" antes de desaparecer
const RECOVERED_SHOW_MS    = 4500;

export function SlowConnectionBanner() {
  const [state, setState]       = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow]         = useState(false);

  const mountedRef       = useRef(true);
  const hadIssueRef      = useRef(false);   // true si alguna vez hubo offline o slow
  const slowCountRef     = useRef(0);
  const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef   = useRef(false);   // true después del primer check periódico

  const setGood = useCallback(() => {
    if (!mountedRef.current) return;
    if (hadIssueRef.current) {
      // Solo muestra "restaurada" si realmente hubo un problema antes
      hadIssueRef.current = false;
      slowCountRef.current = 0;
      setState('recovered');
      setDismissed(false);
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      recoveryTimerRef.current = setTimeout(() => {
        if (mountedRef.current) setState('good');
      }, RECOVERED_SHOW_MS);
    } else {
      slowCountRef.current = Math.max(0, slowCountRef.current - 1);
      setState('good');
    }
  }, []);

  const checkConnection = useCallback(async () => {
    if (!mountedRef.current) return;

    // Sin internet según el navegador → banner rojo inmediato
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      hadIssueRef.current = true;
      setState('offline');
      setDismissed(false);
      return;
    }

    // Comprueba también la API network information
    const conn = (navigator as any).connection;
    if (conn?.effectiveType === 'slow-2g' || (typeof conn?.downlink === 'number' && conn.downlink <= 0.15)) {
      slowCountRef.current++;
      if (slowCountRef.current >= CONSECUTIVE_SLOW) {
        hadIssueRef.current = true;
        setState('slow');
        setDismissed(false);
      }
      return;
    }

    // Ping real al servidor
    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);
    const start      = performance.now();

    try {
      await fetch('/api/ping', { method: 'HEAD', cache: 'no-store', signal: controller.signal });
      clearTimeout(timeoutId);
      const elapsed = performance.now() - start;

      if (!mountedRef.current) return;

      if (elapsed > SLOW_THRESHOLD_MS) {
        slowCountRef.current++;
        if (slowCountRef.current >= CONSECUTIVE_SLOW) {
          hadIssueRef.current = true;
          setState('slow');
          setDismissed(false);
        }
      } else {
        setGood();
      }
    } catch {
      clearTimeout(timeoutId);
      if (!mountedRef.current) return;

      if (!navigator.onLine) {
        hadIssueRef.current = true;
        setState('offline');
        setDismissed(false);
      } else {
        // El ping fue abortado (timeout) → conexión muy lenta
        slowCountRef.current++;
        if (slowCountRef.current >= CONSECUTIVE_SLOW) {
          hadIssueRef.current = true;
          setState('slow');
          setDismissed(false);
        }
      }
    }
  }, [setGood]);

  useEffect(() => {
    mountedRef.current = true;

    const handleOffline = () => {
      if (!mountedRef.current) return;
      hadIssueRef.current = true;
      setState('offline');
      setDismissed(false);
    };

    const handleOnline = () => {
      if (!mountedRef.current) return;
      slowCountRef.current = 0;
      // Espera 1.5s para que la conexión se estabilice y verifica
      setTimeout(() => {
        if (mountedRef.current) checkConnection();
      }, 1500);
    };

    const handleNetworkChange = () => {
      if (!mountedRef.current) return;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        if (mountedRef.current) checkConnection();
      }, 2000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    const conn = (navigator as any).connection;
    conn?.addEventListener?.('change', handleNetworkChange);

    // Primer chequeo después del delay inicial (evita falsos positivos durante la carga)
    const initialTimer = setTimeout(() => {
      initializedRef.current = true;
      checkConnection();
    }, INITIAL_DELAY_MS);

    // Chequeos periódicos
    const interval = setInterval(checkConnection, CHECK_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      conn?.removeEventListener?.('change', handleNetworkChange);
    };
  }, [checkConnection]);

  // Controla la animación de entrada/salida
  useEffect(() => {
    if (state !== 'good' && !dismissed) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [state, dismissed]);

  if (state === 'good') return null;
  if (dismissed) return null;

  const isOffline   = state === 'offline';
  const isRecovered = state === 'recovered';
  const isSlow      = state === 'slow';
  const t = isOffline ? STATE_TOKENS.offline : isRecovered ? STATE_TOKENS.recovered : STATE_TOKENS.slow;

  const label = isOffline ? 'Sin conexión a internet' : isRecovered ? 'Conexión restaurada' : 'Conexión lenta';
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
              {isOffline   && <WifiOff   className="h-4 w-4 animate-pulse" style={{ color: t.icon }} />}
              {isRecovered && <Wifi      className="h-4 w-4"               style={{ color: t.icon }} />}
              {isSlow      && <SignalLow className="h-4 w-4"               style={{ color: t.icon }} />}
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
