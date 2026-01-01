import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from '@/navigation';
 
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});
 
export const config = {
  matcher: ['/', '/(es|en)/:path*']
};
