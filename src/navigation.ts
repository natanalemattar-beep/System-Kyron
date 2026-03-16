
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
  '/contabilidad/libros/control-licores': '/contabilidad/libros/control-licores',
  '/contabilidad/libros/nomina': '/contabilidad/libros/nomina',
  '/contabilidad/libros/horas-extras': '/contabilidad/libros/horas-extras',
  '/contabilidad/libros/cesta-ticket': '/contabilidad/libros/cesta-ticket',
  '/contabilidad/libros/compra-venta': '/contabilidad/libros/compra-venta',
  '/contabilidad/libros/inventario': '/contabilidad/libros/inventario',

  // TRIBUTOS SUB-PORTAL
  '/contabilidad/tributos': '/contabilidad/tributos',
  '/contabilidad/tributos/aportes-parafiscales': '/contabilidad/tributos/aportes-parafiscales',
  '/contabilidad/tributos/proteccion-pensiones': '/contabilidad/tributos/proteccion-pensiones',
  '/contabilidad/tributos/retenciones-iva': '/contabilidad/tributos/retenciones-iva',
  '/contabilidad/tributos/retenciones-islr': '/contabilidad/tributos/retenciones-islr',
  '/contabilidad/tributos/igtf': '/contabilidad/tributos/igtf',
  '/contabilidad/tributos/declaraciones-anteriores': '/contabilidad/tributos/declaraciones-anteriores',
  '/contabilidad/tributos/calendario-fiscal': '/contabilidad/tributos/calendario-fiscal',
  '/contabilidad/tributos/municipales': '/contabilidad/tributos/municipales',
  '/contabilidad/tributos/multas': '/contabilidad/tributos/multas',
  '/contabilidad/tributos/homologacion': '/contabilidad/tributos/homologacion',

  // CUENTAS SUB-PORTAL
  '/contabilidad/cuentas': '/contabilidad/cuentas',
  '/contabilidad/cuentas/conciliacion': '/contabilidad/cuentas/conciliacion',
  '/contabilidad/cuentas/libro-bancos': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/cheques': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/depositos': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/transferencias': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/anticipos-proveedores': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/anticipos-clientes': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/flujo-caja-proyectado': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/antiguedad-saldos': '/contabilidad/cuentas/libro-bancos',
  '/contabilidad/cuentas/todas': '/contabilidad/cuentas/todas',

  // ANALISIS SUB-PORTAL
  '/contabilidad/analisis': '/contabilidad/analisis',
  '/contabilidad/analisis/factibilidad': '/estudio-factibilidad-economica',
  '/contabilidad/analisis/por-producto': '/contabilidad/analisis/por-producto',
  '/contabilidad/analisis/por-cliente': '/contabilidad/analisis/por-cliente',
  '/contabilidad/analisis/ratios': '/contabilidad/analisis/ratios',
  '/contabilidad/analisis/sensibilidad': '/contabilidad/analisis/sensibilidad',
  '/contabilidad/analisis/benchmarking': '/contabilidad/analisis/benchmarking',
  '/contabilidad/analisis/todos': '/contabilidad/analisis/todos',

  // CERTIFICACIONES
  '/contabilidad/certificaciones/empresa': '/contabilidad/certificaciones/empresa',
  '/contabilidad/certificaciones/socios': '/contabilidad/certificaciones/socios',
  '/contabilidad/certificaciones/trabajo': '/contabilidad/certificaciones/trabajo',
  '/contabilidad/rrhh/certificados-laborales': '/contabilidad/rrhh/certificados-laborales',

  // CUENTA PERSONAL EXTRAS
  '/cuenta-personal/certificados-ingreso': '/cuenta-personal/certificados-ingreso',

  // ANALISIS RENTABILIDAD
  '/analisis-rentabilidad': '/analisis-rentabilidad',

  // LEGACY ROUTES COMPATIBILITY
  '/analisis-ventas': '/ventas/analisis-comercial',
  '/facturacion': '/ventas/facturacion',
  '/punto-de-venta': '/ventas/punto-de-venta',
  '/gaceta-6952': '/gaceta-6952',
  '/declaracion-iva': '/declaracion-iva',
  '/islr-arc': '/islr-arc',
  '/libro-compra-venta': '/libro-compra-venta',
  '/ajuste-por-inflacion': '/ajuste-por-inflacion',
  '/acta-asamblea': '/acta-asamblea',
  '/poderes-representacion': '/poderes-representacion',
  '/activos-inmobiliarios': '/activos-inmobiliarios',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
