
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, localePrefix} from './navigation';
 
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});
 
export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - static files (e.g. /favicon.ico, /images/*)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
