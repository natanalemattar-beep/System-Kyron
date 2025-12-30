
export const i18n = {
  locales: ['en', 'es'],
  defaultLocale: 'es',
} as const;

export type Locale = (typeof i18n)['locales'][number];
