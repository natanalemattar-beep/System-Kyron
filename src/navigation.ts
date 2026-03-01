
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'as-needed';

export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  '/ecosistema': '/ecosistema',
  '/dashboard': '/dashboard',
  '/contabilidad': '/contabilidad',
  '/dashboard-empresa': '/dashboard-empresa',
  '/dashboard-rrhh': '/dashboard-rrhh',
  '/escritorio-juridico': '/escritorio-juridico',
  '/analisis-ventas': '/analisis-ventas',
  '/punto-de-venta': '/punto-de-venta',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
