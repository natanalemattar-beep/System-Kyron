
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'always';

export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  
  // ÁREA MAESTRA
  '/dashboard-empresa': '/dashboard-empresa',
  '/resumen-negocio': '/dashboard-empresa',
  
  // GLOBAL MODULES
  '/automatizaciones': '/automatizaciones',
  '/notificaciones': '/notificaciones',
  '/reportes': '/reportes',
  '/configuracion': '/configuracion',
  '/perfil': '/perfil',

  // CONTABILIDAD BASE
  '/contabilidad': '/contabilidad',
  
  // LIBROS SUB-PORTAL
  '/contabilidad/libros': '/contabilidad/libros',
  '/contabilidad/libros/diario': '/contabilidad/libros/diario',
  '/contabilidad/libros/mayor': '/contabilidad/libros/mayor',
  '/contabilidad/libros/balance': '/contabilidad/libros/balance',
  '/contabilidad/libros/activos-fijos': '/contabilidad/libros/activos-fijos',
  '/contabilidad/libros/retenciones': '/contabilidad/libros/retenciones',
  '/contabilidad/libros/aportes-parafiscales': '/contabilidad/libros/aportes-parafiscales',
  '/contabilidad/libros/vacaciones': '/contabilidad/libros/vacaciones',
  '/contabilidad/libros/utilidades': '/contabilidad/libros/utilidades',
  '/contabilidad/libros/prestaciones': '/contabilidad/libros/prestaciones',

  // TRIBUTOS SUB-PORTAL
  '/contabilidad/tributos': '/contabilidad/tributos',
  '/contabilidad/tributos/retenciones-iva': '/contabilidad/tributos/retenciones-iva',
  '/contabilidad/tributos/retenciones-islr': '/contabilidad/tributos/retenciones-islr',
  '/contabilidad/tributos/declaraciones-anteriores': '/contabilidad/tributos/declaraciones-anteriores',
  '/contabilidad/tributos/calendario-fiscal': '/contabilidad/tributos/calendario-fiscal',
  '/contabilidad/tributos/municipales': '/contabilidad/tributos/municipales',
  '/contabilidad/tributos/multas': '/contabilidad/tributos/multas',
  '/contabilidad/tributos/homologacion': '/contabilidad/tributos/homologacion',

  // CUENTAS SUB-PORTAL
  '/contabilidad/cuentas': '/contabilidad/cuentas',
  '/contabilidad/cuentas/conciliacion': '/contabilidad/cuentas/conciliacion',
  '/contabilidad/cuentas/libro-bancos': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/cheques': '/contabilidad/cuentas/cheques',
  '/contabilidad/cuentas/depositos': '/contabilidad/cuentas/depositos',
  '/contabilidad/cuentas/transferencias': '/contabilidad/cuentas/transferencias',
  '/contabilidad/cuentas/anticipos-proveedores': '/contabilidad/cuentas/anticipos-proveedores',
  '/contabilidad/cuentas/anticipos-clientes': '/contabilidad/cuentas/anticipos-clientes',
  '/contabilidad/cuentas/flujo-caja-proyectado': '/contabilidad/cuentas/flujo-caja-proyectado',
  '/contabilidad/cuentas/antiguedad-saldos': '/contabilidad/cuentas/antiguedad-saldos',

  // ANALISIS SUB-PORTAL
  '/contabilidad/analisis': '/contabilidad/analisis',
  '/contabilidad/analisis/por-producto': '/contabilidad/analisis/por-producto',
  '/contabilidad/analisis/por-cliente': '/contabilidad/analisis/por-cliente',
  '/contabilidad/analisis/ratios': '/contabilidad/analisis/ratios',
  '/contabilidad/analisis/sensibilidad': '/contabilidad/analisis/sensibilidad',
  '/contabilidad/analisis/benchmarking': '/contabilidad/analisis/benchmarking',

  // LEGACY ROUTES COMPATIBILITY
  '/analisis-ventas': '/ventas/analisis-comercial',
  '/facturacion': '/ventas/facturacion',
  '/punto-de-venta': '/ventas/punto-de-venta',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
