
import {getRequestConfig} from 'next-intl/server';
import {locales} from '../config';
import type {AbstractIntlMessages} from 'next-intl';
import es from '../messages/es.json';
import en from '../messages/en.json';

const messageStore: Record<string, AbstractIntlMessages> = {es, en};

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const validLocale = locales.includes(locale as any) ? (locale as any) : 'es';
 
  return {
    locale: validLocale,
    messages: messageStore[validLocale]
  };
});
