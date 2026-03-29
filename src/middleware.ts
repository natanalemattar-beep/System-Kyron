
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { locales, defaultLocale, localePrefix } from './navigation';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-DNS-Prefetch-Control': 'on',
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
  'identidad-marca',
  'ecosistema',
  'faq',
]);

// Public API path prefixes — these routes handle their own logic
const PUBLIC_API_PREFIXES = [
  '/api/auth/',
  '/api/cedula/',
  '/api/rif/',
  '/api/stats',
  '/api/visits',
  '/api/contact',
];

function isPublicPage(pathname: string): boolean {
  const parts = pathname.split('/');
  // parts[0] = '', parts[1] = locale, parts[2] = page segment
  const segment = parts[2] ?? '';
  if (PUBLIC_SEGMENTS.has(segment)) return true;
  // Allow all /register/* paths
  if (segment === 'register') return true;
  return false;
}

async function verifySession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    const isPublicApi = PUBLIC_API_PREFIXES.some(p => pathname.startsWith(p));
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(key, value);
    }
    if (!isPublicApi) {
      // Protected API routes handle their own getSession() auth check.
      // We pass through here — they return 401 if no valid session.
    }
    return response;
  }

  // Page routes: protect everything not in the public list
  if (!isPublicPage(pathname)) {
    const authed = await verifySession(req);
    if (!authed) {
      const parts = pathname.split('/');
      const locale = parts[1] && locales.includes(parts[1] as 'en' | 'es') ? parts[1] : defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = intlMiddleware(req);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\..*).*)'
  ]
};
