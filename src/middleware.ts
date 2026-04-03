
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
  "img-src 'self' data: blob: https://flagcdn.com https://images.unsplash.com https://picsum.photos https://api.qrserver.com https://i.pravatar.cc",
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

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'system-kyron-dev-secret-key-not-for-production'
);

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
]);

// Public API path prefixes — these routes handle their own logic
const PUBLIC_API_SET = new Set([
  '/api/stats',
  '/api/visits',
  '/api/contact',
]);

const PUBLIC_API_PREFIXES = [
  '/api/auth/',
  '/api/cedula/',
  '/api/rif/',
];

function isPublicApi(pathname: string): boolean {
  if (PUBLIC_API_SET.has(pathname)) return true;
  for (let i = 0; i < PUBLIC_API_PREFIXES.length; i++) {
    if (pathname.startsWith(PUBLIC_API_PREFIXES[i])) return true;
  }
  return false;
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
const SESSION_CACHE_TTL = 15_000;
const SESSION_CACHE_MAX = 500;

async function verifySession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const now = Date.now();
  const cached = sessionCache.get(token);
  if (cached && now < cached.expiresAt) return cached.valid;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (sessionCache.size >= SESSION_CACHE_MAX) sessionCache.clear();
    const expMs = typeof payload.exp === 'number' ? payload.exp * 1000 : now + SESSION_CACHE_TTL;
    const cacheUntil = Math.min(now + SESSION_CACHE_TTL, expMs);
    if (cacheUntil <= now) return true;
    sessionCache.set(token, { valid: true, expiresAt: cacheUntil });
    return true;
  } catch {
    sessionCache.set(token, { valid: false, expiresAt: now + 5_000 });
    return false;
  }
}

const securityHeaderEntries = Object.entries(SECURITY_HEADERS);

function applySecurityHeaders(response: NextResponse): void {
  for (let i = 0; i < securityHeaderEntries.length; i++) {
    response.headers.set(securityHeaderEntries[i][0], securityHeaderEntries[i][1]);
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    applySecurityHeaders(response);
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
