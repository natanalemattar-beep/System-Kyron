
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';
export const localePrefix = 'always';

/**
 * @fileOverview Mapa de Navegación del Ecosistema Kyron.
 * Organizado por Áreas Lógicas para una navegación de alta fidelidad.
 */
export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  
  // ÁREA MAESTRA
  '/dashboard-empresa': '/dashboard-empresa',
  
  // FINANZAS Y CONTABILIDAD
  '/contabilidad': '/finanzas/contabilidad',
  '/cuentas-por-cobrar': '/finanzas/cuentas-por-cobrar',
  '/cuentas-por-pagar': '/finanzas/cuentas-por-pagar',
  '/ajuste-por-inflacion': '/finanzas/ajuste-inflacion',
  '/analisis-caja': '/finanzas/analisis-caja',
  '/analisis-rentabilidad': '/finanzas/rentabilidad-pro',
  '/analisis-riesgo': '/finanzas/analisis-riesgo',
  '/billetera-cambio': '/finanzas/billetera-cambio',
  '/estudio-factibilidad-economica': '/finanzas/factibilidad-economica',
  '/libro-licores': '/finanzas/libro-licores',
  
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
  '/sector-privado-system-kyron': '/dossier-corporativo',
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
