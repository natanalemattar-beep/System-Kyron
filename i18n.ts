
import {getRequestConfig} from 'next-intl/server';
import {locales} from './src/navigation';

/**
 * @fileOverview Punto de entrada de configuración i18n raíz.
 * Redirigido a la lógica asíncrona de src/i18n/request.ts.
 */

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const validLocale = locales.includes(locale as any) ? locale : 'es';
 
  return {
    locale: validLocale,
    messages: (await import(`./src/messages/${validLocale}.json`)).default
  };
});
