
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale prefix is present
  defaultLocale: 'es'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
