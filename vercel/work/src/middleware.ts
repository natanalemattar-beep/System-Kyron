import createMiddleware from 'next-intl/middleware';
import { i18n } from './lib/i18n-config';
 
export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'never'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
