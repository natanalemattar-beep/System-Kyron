import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';
 
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'as-needed';
 
export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;
 
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
