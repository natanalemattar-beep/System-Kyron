
import {getRequestConfig} from 'next-intl/server';
import {locales} from '../navigation';

/**
 * @fileOverview Configuración i18n asíncrona para Next.js 15.
 * Garantiza que el locale se resuelva antes de cargar mensajes.
 */
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const validLocale = locales.includes(locale as any) ? (locale as any) : 'es';
 
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
