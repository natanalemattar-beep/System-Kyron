import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, localePrefix} from './navigation';
 
/**
 * @fileOverview Middleware de i18n optimizado.
 * Se excluye específicamente la ruta 'sector-privado-system-kyron' para permitir una URL limpia sin prefijo.
 */
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});
 
export const config = {
  // Se excluye la ruta de expediente técnico para cumplir con la solicitud de URL limpia
  matcher: ['/((?!api|_next|sector-privado-system-kyron|.*\\..*).*)']
};