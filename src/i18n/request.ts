import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '../navigation';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  // Validar que el locale entrante sea válido
  if (!locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});