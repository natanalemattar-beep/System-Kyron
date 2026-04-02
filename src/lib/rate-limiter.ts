const attempts = new Map<string, { count: number; resetAt: number }>();
const bruteForceTracker = new Map<string, { failures: number; lockedUntil: number }>();

const MAX_MAP_SIZE = 10000;

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of attempts) {
    if (val.resetAt <= now) attempts.delete(key);
  }
  for (const [key, val] of bruteForceTracker) {
    if (val.lockedUntil <= now && val.failures <= 0) bruteForceTracker.delete(key);
  }
  if (attempts.size > MAX_MAP_SIZE) attempts.clear();
  if (bruteForceTracker.size > MAX_MAP_SIZE) bruteForceTracker.clear();
}, 60_000);

export function rateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterMs: 0 };
  }

  if (entry.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count++;
  return { allowed: true, remaining: maxAttempts - entry.count, retryAfterMs: 0 };
}

export function recordLoginFailure(identifier: string): { locked: boolean; lockDurationMs: number } {
  const now = Date.now();
  const entry = bruteForceTracker.get(identifier) || { failures: 0, lockedUntil: 0 };

  if (entry.lockedUntil > now) {
    return { locked: true, lockDurationMs: entry.lockedUntil - now };
  }

  entry.failures++;

  let lockDurationMs = 0;
  if (entry.failures >= 10) {
    lockDurationMs = 30 * 60 * 1000;
  } else if (entry.failures >= 7) {
    lockDurationMs = 10 * 60 * 1000;
  } else if (entry.failures >= 5) {
    lockDurationMs = 3 * 60 * 1000;
  }

  if (lockDurationMs > 0) {
    entry.lockedUntil = now + lockDurationMs;
  }

  bruteForceTracker.set(identifier, entry);
  return { locked: lockDurationMs > 0, lockDurationMs };
}

export function checkBruteForce(identifier: string): { locked: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = bruteForceTracker.get(identifier);
  if (!entry || entry.lockedUntil <= now) {
    return { locked: false, retryAfterMs: 0 };
  }
  return { locked: true, retryAfterMs: entry.lockedUntil - now };
}

export function clearLoginFailures(identifier: string): void {
  bruteForceTracker.delete(identifier);
}

export function getClientIP(req: Request): string {
  const cfIP = req.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP.trim();

  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP.trim();

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',');
    return parts[parts.length - 1].trim();
  }

  return '0.0.0.0';
}

export function rateLimitResponse(retryAfterMs: number) {
  const retryAfterSec = Math.ceil(retryAfterMs / 1000);
  return new Response(
    JSON.stringify({ error: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfterSec} segundos.` }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSec),
      },
    }
  );
}
