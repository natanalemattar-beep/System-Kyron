
import createMiddleware from 'next-intl/middleware';
import { i18n } from './lib/i18n-config';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,
 
  // Used when no locale prefix is present
  defaultLocale: i18n.defaultLocale
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
