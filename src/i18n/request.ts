
import {getRequestConfig} from 'next-intl/server';
import {locales} from '../navigation';

/**
 * @fileOverview Configuración de i18n para Next.js 15.
 * Utiliza await requestLocale para cumplir con los requerimientos de APIs asíncronas.
 */

export default getRequestConfig(async ({requestLocale}) => {
  // Await the locale context to avoid Next.js 15 sync dynamic API errors
  const locale = await requestLocale;
  
  // Basic validation or fallback to default
  const validLocale = locales.includes(locale as any) ? locale : 'es';
 
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
