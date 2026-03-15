import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'always';

/**
 * @fileOverview Mapa de Navegación del Ecosistema Kyron.
 * Organizado por Áreas Lógicas para una navegación de alta fidelidad.
 * Se han unificado las rutas para evitar errores 404.
 */
export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  
  // ÁREA MAESTRA
  '/dashboard-empresa': '/dashboard-empresa',
  
  // FINANZAS Y CONTABILIDAD
  '/contabilidad': '/contabilidad',
  '/cuentas-por-cobrar': '/contabilidad/cuentas-por-cobrar',
  '/cuentas-por-pagar': '/contabilidad/cuentas-por-pagar',
  '/ajuste-por-inflacion': '/contabilidad/ajuste-inflacion',
  '/analisis-caja': '/contabilidad/analisis-caja',
  '/analisis-rentabilidad': '/contabilidad/analisis-rentabilidad',
  '/analisis-riesgo': '/contabilidad/analisis-riesgo',
  '/billetera-cambio': '/contabilidad/billetera-cambio',
  '/estudio-factibilidad-economica': '/contabilidad/factibilidad-economica',
  '/libro-licores': '/contabilidad/libro-licores',

  // LIBROS CONTABLES
  '/contabilidad/libros/compra-venta': '/contabilidad/libros/compra-venta',
  '/contabilidad/libros/nomina': '/contabilidad/libros/nomina',
  '/contabilidad/libros/inventario': '/contabilidad/libros/inventario',
  '/contabilidad/libros/cesta-ticket': '/contabilidad/libros/cesta-ticket',
  '/contabilidad/libros/horas-extras': '/contabilidad/libros/horas-extras',
  '/contabilidad/libros/control-licores': '/contabilidad/libros/control-licores',

  // TRIBUTOS E IMPUESTOS
  '/declaracion-iva': '/contabilidad/impuestos/iva',
  '/islr-arc': '/contabilidad/impuestos/islr-arc',
  '/contabilidad/impuestos/retenciones': '/contabilidad/impuestos/retenciones',
  '/contabilidad/impuestos/calendario': '/contabilidad/impuestos/calendario',
  '/contabilidad/impuestos/municipales': '/contabilidad/impuestos/municipales',
  '/contabilidad/impuestos/multas': '/contabilidad/impuestos/multas',
  '/contabilidad/impuestos/homologacion': '/contabilidad/impuestos/homologacion',
  '/contabilidad/impuestos/reportes': '/contabilidad/impuestos/reportes',
  
  // VENTAS Y FACTURACIÓN
  '/facturacion': '/ventas/facturacion',
  '/punto-de-venta': '/ventas/punto-de-venta',
  '/facturacion-credito': '/ventas/facturacion-credito',
  '/proformas': '/ventas/proformas',
  '/invoices': '/ventas/invoices',
  '/estrategias-ventas': '/ventas/estrategias-ia',
  '/fidelizacion-clientes': '/ventas/fidelizacion',
  '/analisis-ventas': '/ventas/analisis-comercial',
  '/analisis-mercado': '/ventas/analisis-mercado',
  
  // LEGAL Y CUMPLIMIENTO
  '/escritorio-juridico': '/legal/escritorio-juridico',
  '/acta-asamblea': '/legal/acta-asamblea',
  '/contratos': '/legal/contratos',
  '/autorizaciones': '/legal/autorizaciones',
  '/permisos': '/legal/permisos-y-licencias',
  '/recursos-fiscales': '/legal/recursos-fiscales',
  '/gaceta-6952': '/legal/consulta-gaceta',
  '/poderes-representacion': '/legal/poderes-holding',
  '/generador-documentos': '/legal/crear-contratos',
  '/zero-risk': '/legal/blindaje-total',
  
  // RECURSOS HUMANOS
  '/dashboard-rrhh': '/rrhh/dashboard',
  '/nominas': '/rrhh/pagos-nomina',
  '/prestaciones-sociales': '/rrhh/liquidaciones',
  '/reclutamiento': '/rrhh/vacantes',
  '/libro-horario-nocturno': '/rrhh/libro-nocturno',
  '/carnet-personal': '/rrhh/id-biometrica',
  
  // TECNOLOGÍA E INGENIERÍA
  '/dashboard-informatica': '/it/dashboard',
  '/ingenieria-ia': '/it/ingenieria-ia',
  '/mi-linea': '/telecom/mi-linea-5g',
  '/venta-linea': '/telecom/activar-linea',
  '/dashboard-telecom': '/telecom/dashboard',
  '/sostenibilidad': '/ambiente/sostenibilidad',
  '/tarjeta-reciclaje': '/ambiente/mis-puntos',
  '/mercado-ecocreditos': '/ambiente/canje-puntos',
  
  // PERSONAL Y CIUDADANO
  '/dashboard': '/personal/inicio',
  '/tarjeta-digital': '/personal/mi-perfil',
  '/documentos': '/personal/mis-documentos',
  '/partidas-nacimiento': '/personal/partidas-nacimiento',
  '/actas-matrimonio': '/personal/actas-matrimonio',
  '/documentos-judiciales': '/personal/documentos-judiciales',
  '/antecedentes-penales': '/personal/antecedentes-penales',
  '/manutencion': '/personal/pago-manutencion',
  '/registro-rif': '/personal/registro-rif-familia',
  '/seguridad': '/personal/ajustes-seguridad',
  '/notificaciones': '/personal/avisos',
  
  // OTROS
  '/estudio-poblacion': '/analisis-demografico',
  '/manual-usuario': '/manual-usuario',
  '/identidad-marca': '/identidad-marca',
  '/academia-kyron': '/formacion',
  '/reports': '/reportes-maestros',
} as const;

export const {Link, redirect, usePathname, useRouter} = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames
});
