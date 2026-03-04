
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - static files (e.g. /favicon.ico, /images/*)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
