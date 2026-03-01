
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'as-needed';

export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/login-empresa': '/login-empresa',
  '/login-personal': '/login-personal',
  '/login-escritorio-juridico': '/login-escritorio-juridico',
  '/login-ventas': '/login-ventas',
  '/login-rrhh': '/login-rrhh',
  '/login-socios': '/login-socios',
  '/login-marketing': '/login-marketing',
  '/login-telecom': '/login-telecom',
  '/login-informatica': '/login-informatica',
  '/register': '/register',
  '/ecosistema': '/ecosistema',
  '/dashboard': '/dashboard',
  '/contabilidad': '/contabilidad',
  '/dashboard-empresa': '/dashboard-empresa',
  '/dashboard-rrhh': '/dashboard-rrhh',
  '/escritorio-juridico': '/escritorio-juridico',
  '/analisis-ventas': '/analisis-ventas',
  '/punto-de-venta': '/punto-de-venta',
  '/tarjeta-digital': '/tarjeta-digital',
  '/tarjeta-reciclaje': '/tarjeta-reciclaje',
  '/zero-risk': '/zero-risk',
  '/general': '/general',
  '/recursos-fiscales': '/recursos-fiscales',
  '/gaceta-6952': '/gaceta-6952',
  '/poderes-representacion': '/poderes-representacion',
  '/cuentas-por-cobrar': '/cuentas-por-cobrar',
  '/nominas': '/nominas',
  '/seguridad': '/seguridad',
  '/notificaciones': '/notificaciones',
  '/declaracion-iva': '/declaracion-iva',
  '/islr-arc': '/islr-arc',
  '/libro-compra-venta': '/libro-compra-venta',
  '/venta-linea': '/venta-linea',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
