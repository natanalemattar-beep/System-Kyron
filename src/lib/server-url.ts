import type { NextRequest } from 'next/server';

export function getBaseUrl(req: NextRequest): string {
  const forwardedHost = req.headers.get('x-forwarded-host');
  const host = req.headers.get('host');
  const origin = req.headers.get('origin');

  const resolvedHost = forwardedHost
    || host
    || (origin ? origin.replace(/^https?:\/\//, '') : null)
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_VERCEL_URL
    || 'system-kyron.vercel.app';

  const protocol = req.headers.get('x-forwarded-proto')
    || (resolvedHost.includes('localhost') || resolvedHost.includes('127.0.0.1') ? 'http' : 'https');

  return process.env.NEXT_PUBLIC_APP_URL
    || process.env.NEXT_PUBLIC_SITE_URL
    || process.env.APP_URL
    || `${protocol}://${resolvedHost}`;
}
