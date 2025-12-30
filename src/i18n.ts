
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n as i18nConfig } from './lib/i18n-config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18nConfig.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
