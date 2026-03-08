
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
  // Se excluyen rutas específicas y archivos estáticos
  matcher: [
    '/((?!api|_next|sector-privado-system-kyron|favicon.ico|.*\\..*).*)'
  ]
};
