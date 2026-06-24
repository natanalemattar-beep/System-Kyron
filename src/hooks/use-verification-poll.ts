import { useEffect, useRef } from 'react';

function getStorageKey(destino: string): string {
  return `kyron-poll-verified:${destino}`;
}

function isPersistedVerified(destino: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(getStorageKey(destino)) === 'true';
  } catch {
    return false;
  }
}

function persistVerified(destino: string): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(getStorageKey(destino), 'true');
  } catch {}
}

export function useVerificationPoll(
  destino: string,
  isActive: boolean,
  onVerified: () => void,
  intervalMs = 3000,
) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const verifiedRef = useRef(false);
  const onVerifiedRef = useRef(onVerified);
  onVerifiedRef.current = onVerified;

  useEffect(() => {
    if (!destino || verifiedRef.current) return;

    if (isPersistedVerified(destino)) {
      verifiedRef.current = true;
      onVerifiedRef.current();
      return;
    }

    if (!isActive) return;

    const check = async () => {
      try {
        const res = await fetch(
          `/api/auth/check-verified?destino=${encodeURIComponent(destino)}`,
        );
        if (!res.ok) return;
        const json = await res.json();
        if (json.verified && !verifiedRef.current) {
          verifiedRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          persistVerified(destino);
          onVerifiedRef.current();
        }
      } catch {
        // ignore network errors
      }
    };

    check();
    timerRef.current = setInterval(check, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [destino, isActive, intervalMs]);
}
