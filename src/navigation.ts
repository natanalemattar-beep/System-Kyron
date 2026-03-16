
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
  
  // PROYECTOS E INGENIERÍA
  '/contabilidad/proyectos/anteproyecto': '/contabilidad/proyectos/anteproyecto',
  '/contabilidad/proyectos/proyecto-maestro': '/contabilidad/proyectos/proyecto-maestro',
  '/contabilidad/certificaciones/financiera': '/contabilidad/certificaciones/financiera',
  '/contabilidad/certificaciones/contables': '/contabilidad/certificaciones/contables',
  '/estudio-factibilidad-economica': '/estudio-factibilidad-economica',

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
  '/contabilidad/tributos/iva': '/contabilidad/tributos/iva',
  '/contabilidad/tributos/islr': '/contabilidad/tributos/islr',
  '/contabilidad/tributos/igtf': '/contabilidad/tributos/igtf',
  '/contabilidad/tributos/proteccion-pensiones': '/contabilidad/tributos/proteccion-pensiones',
  '/contabilidad/tributos/igp': '/contabilidad/tributos/igp',
  '/contabilidad/tributos/juegos': '/contabilidad/tributos/juegos',
  '/contabilidad/tributos/aporte-70': '/contabilidad/tributos/aporte-70',
  '/contabilidad/tributos/fonacit': '/contabilidad/tributos/fonacit',
  '/contabilidad/tributos/hidrocarburos': '/contabilidad/tributos/hidrocarburos',
  '/contabilidad/tributos/exportadores': '/contabilidad/tributos/exportadores',
  '/contabilidad/tributos/iva-trimestral': '/contabilidad/tributos/iva-trimestral',
  '/contabilidad/tributos/retenciones-iva': '/contabilidad/tributos/retenciones-iva',
  '/contabilidad/tributos/retenciones-islr': '/contabilidad/tributos/retenciones-islr',
  '/contabilidad/tributos/calendario-fiscal': '/contabilidad/tributos/calendario-fiscal',
  '/contabilidad/tributos/municipales': '/contabilidad/tributos/municipales',
  '/contabilidad/tributos/multas': '/contabilidad/tributos/multas',
  '/contabilidad/tributos/homologacion': '/contabilidad/tributos/homologacion',
  '/contabilidad/tributos/poderes-representacion': '/contabilidad/tributos/poderes-representacion',
  '/contabilidad/tributos/permisos': '/contabilidad/tributos/permisos',
  '/contabilidad/tributos/ministerio-industrias': '/contabilidad/tributos/ministerio-industrias',
  '/contabilidad/tributos/ministerio-comercio-exterior': '/contabilidad/tributos/ministerio-comercio-exterior',
  '/contabilidad/tributos/ministerio-transporte': '/contabilidad/tributos/ministerio-transporte',
  '/contabilidad/tributos/ministerio-ecosocialismo': '/contabilidad/tributos/ministerio-ecosocialismo',
  '/contabilidad/tributos/ministerio-turismo': '/contabilidad/tributos/ministerio-turismo',
  '/contabilidad/tributos/comunicaciones': '/contabilidad/tributos/comunicaciones',

  // CUENTAS SUB-PORTAL
  '/contabilidad/cuentas': '/contabilidad/cuentas',
  '/contabilidad/cuentas/todas': '/contabilidad/cuentas/todas',

  // ANALISIS SUB-PORTAL
  '/contabilidad/analisis': '/contabilidad/analisis',
  '/contabilidad/analisis/factibilidad': '/estudio-factibilidad-economica',
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
  '/declaracion-iva': '/contabilidad/tributos/iva',
  '/islr-arc': '/contabilidad/tributos/islr',
  '/libro-compra-venta': '/libro-compra-venta',
  '/ajuste-por-inflacion': '/ajuste-por-inflacion',
  '/acta-asamblea': '/acta-asamblea',
  '/poderes-representacion': '/contabilidad/tributos/poderes-representacion',
  '/activos-inmobiliarios': '/activos-inmobiliarios',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
