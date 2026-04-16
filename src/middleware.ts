
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { locales, defaultLocale, localePrefix } from './navigation';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://flagcdn.com https://images.unsplash.com https://picsum.photos https://api.qrserver.com https://i.pravatar.cc https://grainy-gradients.vercel.app",
  "connect-src 'self' https://*.replit.dev https://*.replit.app",
  "frame-ancestors 'self' https://*.replit.dev https://*.replit.app",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ');

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-DNS-Prefetch-Control': 'on',
  ...(IS_PRODUCTION ? { 'Content-Security-Policy': CSP_DIRECTIVES } : {}),
};

const COOKIE_NAME = 'sk_session';

const resolvedSecret = process.env.JWT_SECRET || process.env.SESSION_SECRET || 'kyron_secret_key_fixed_2026';

if (!process.env.JWT_SECRET && IS_PRODUCTION) {
  console.warn('[MIDDLEWARE] WARNING: JWT_SECRET environment variable is missing. Using fallback.');
}

const JWT_SECRET = new TextEncoder().encode(resolvedSecret);

// Page segments (after locale prefix) that are publicly accessible
const PUBLIC_SEGMENTS = new Set([
  '',                          // /es or /en — landing page
  'login',
  'login-empresa',
  'login-personal',
  'login-ventas',
  'login-socios',
  'login-rrhh',
  'login-sostenibilidad',
  'login-marketing',
  'login-linea',
  'login-linea-empresa',
  'login-linea-personal',
  'login-informatica',
  'login-escritorio-juridico',
  'recuperar-cuenta',
  'terms',
  'politica-privacidad',
  'sector-privado-system-kyron',
  'manual-usuario',
  'guia-registro',
  'identidad-marca',
  'ecosistema',
  'faq',
  'verify-link',
  'k7r0n-mail',
  'prueba-gratuita',
  'prueba-velocidad',
]);

// Public API routes — explicit whitelist (fail-closed)
const PUBLIC_API_SET = new Set([
  '/api/stats',
  '/api/visits',
  '/api/contact',
  '/api/ping',
  '/api/integrations-health',
  '/api/tasas-bcv/auto-fetch',
  '/api/auth/login',
  '/api/auth/login-phone',
  '/api/auth/register',
  '/api/auth/reset-password',
  '/api/auth/send-code',
  '/api/auth/verify-code',
  '/api/auth/verify-link',
  '/api/auth/check-document',
  '/api/auth/check-verified',
  '/api/auth/debug-db',
  '/api/plan-popularity',
  '/api/security-status',
  '/api/ai/kyron-chat-trial',
  '/api/ai/speed-test',
  '/api/auth/access-key',
  '/api/cedula/consulta',
  '/api/rif/consulta',
  '/api/budget',
]);

// Routes that handle their own header-based auth (e.g. x-admin-key)
const SELF_AUTH_API_SET = new Set([
  '/api/db-init',
]);

function isPublicApi(pathname: string): boolean {
  return PUBLIC_API_SET.has(pathname) || SELF_AUTH_API_SET.has(pathname);
}

function isPublicPage(pathname: string): boolean {
  const secondSlash = pathname.indexOf('/', 1);
  const thirdSlash = secondSlash > 0 ? pathname.indexOf('/', secondSlash + 1) : -1;
  const segment = secondSlash > 0
    ? (thirdSlash > 0 ? pathname.substring(secondSlash + 1, thirdSlash) : pathname.substring(secondSlash + 1))
    : '';
  if (PUBLIC_SEGMENTS.has(segment)) return true;
  if (segment === 'register') return true;
  return false;
}

const sessionCache = new Map<string, { valid: boolean; expiresAt: number }>();
const SESSION_CACHE_TTL = 20_000;
const SESSION_CACHE_MAX = 500;

function enforceMaxSize(now: number): void {
  if (sessionCache.size < SESSION_CACHE_MAX * 0.8) return;
  const toDelete: string[] = [];
  for (const [key, entry] of sessionCache) {
    if (now >= entry.expiresAt) toDelete.push(key);
  }
  for (const key of toDelete) sessionCache.delete(key);
  while (sessionCache.size >= SESSION_CACHE_MAX) {
    const oldest = sessionCache.keys().next().value;
    if (oldest) sessionCache.delete(oldest); else break;
  }
}

function cacheSet(token: string, valid: boolean, expiresAt: number, now: number): void {
  if (expiresAt <= now) return;
  enforceMaxSize(now);
  sessionCache.delete(token);
  sessionCache.set(token, { valid, expiresAt });
}

async function verifySession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const now = Date.now();
  const cached = sessionCache.get(token);
  if (cached && now < cached.expiresAt) {
    sessionCache.delete(token);
    sessionCache.set(token, cached);
    return cached.valid;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const expMs = typeof payload.exp === 'number' ? payload.exp * 1000 : now + SESSION_CACHE_TTL;
    const cacheUntil = Math.min(now + SESSION_CACHE_TTL, expMs);
    cacheSet(token, true, cacheUntil, now);
    return true;
  } catch {
    cacheSet(token, false, now + 5_000, now);
    return false;
  }
}

const securityHeaderEntries = Object.entries(SECURITY_HEADERS);

function applySecurityHeaders(response: NextResponse): void {
  for (let i = 0; i < securityHeaderEntries.length; i++) {
    response.headers.set(securityHeaderEntries[i][0], securityHeaderEntries[i][1]);
  }
}

function generateRequestId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `req-${ts}-${rand}`;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    const requestId = generateRequestId();
    const start = Date.now();

    if (!isPublicApi(pathname)) {
      const authed = await verifySession(req);
      if (!authed) {
        const response = NextResponse.json(
          { success: false, error: { code: 'AUTHENTICATION_ERROR', message: 'No autenticado' } },
          { status: 401 }
        );
        applySecurityHeaders(response);
        response.headers.set('x-request-id', requestId);
        return response;
      }
    }
    const response = NextResponse.next();
    applySecurityHeaders(response);
    response.headers.set('x-request-id', requestId);
    response.headers.set('x-response-time', `${Date.now() - start}ms`);
    return response;
  }

  if (!isPublicPage(pathname)) {
    const authed = await verifySession(req);
    if (!authed) {
      const secondSlash = pathname.indexOf('/', 1);
      const localeStr = secondSlash > 0 ? pathname.substring(1, secondSlash) : '';
      const locale = locales.includes(localeStr as 'en' | 'es') ? localeStr : defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = intlMiddleware(req);
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\..*).*)'
  ]
};
