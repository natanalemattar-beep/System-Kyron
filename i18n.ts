
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n } from './src/lib/i18n-config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./src/messages/${locale}.json`)).default,
  };
});
