import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './lib/i18n-config';
 
export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'never'
});
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};