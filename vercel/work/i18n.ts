import {getRequestConfig} from 'next-intl/server';
import {i18n} from './src/lib/i18n-config';
import {notFound} from 'next/navigation';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});