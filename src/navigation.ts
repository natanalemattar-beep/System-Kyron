import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'as-needed';

export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  '/ecosistema': '/ecosistema',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});