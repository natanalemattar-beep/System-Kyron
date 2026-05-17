export type PlanTier = 'personal' | 'profesional' | 'empresarial' | 'kyron_max';
export type CicloFacturacion = 'mensual' | 'anual';

export interface PlanMiLinea {
  id: string;
  nombre: string;
  datos: string;
  velocidad: string;
  precioMensualUSD: number;
  popular: boolean;
  color: string;
  minutosNacionales: string;
  mensajesSMS: string;
  llamadasInternacionales: string;
  caracteristicas: string[];
}

export const PLANES_MI_LINEA: PlanMiLinea[] = [
  {
    id: 'basico_2gb',
    nombre: 'Básico',
    datos: '2 GB',
    velocidad: '4G',
    precioMensualUSD: 3,
    popular: false,
    color: 'slate',
    minutosNacionales: '60 min',
    mensajesSMS: '30 SMS',
    llamadasInternacionales: 'No incluidas',
    caracteristicas: ['WhatsApp incluido', 'Redes sociales básicas'],
  },
  {
    id: 'conecta_5gb',
    nombre: 'Conecta',
    datos: '5 GB',
    velocidad: '4G LTE',
    precioMensualUSD: 5,
    popular: false,
    color: 'blue',
    minutosNacionales: '150 min',
    mensajesSMS: '80 SMS',
    llamadasInternacionales: 'No incluidas',
    caracteristicas: ['Redes sociales ilimitadas', 'Música streaming'],
  },
  {
    id: 'plus_10gb',
    nombre: 'Plus',
    datos: '10 GB',
    velocidad: '4G LTE',
    precioMensualUSD: 8,
    popular: false,
    color: 'indigo',
    minutosNacionales: '300 min',
    mensajesSMS: '150 SMS',
    llamadasInternacionales: '15 min',
    caracteristicas: ['Redes sociales ilimitadas', 'Streaming música y video SD', 'Roaming básico'],
  },
  {
    id: 'global_25gb',
    nombre: 'Global',
    datos: '25 GB',
    velocidad: '5G',
    precioMensualUSD: 14,
    popular: true,
    color: 'primary',
    minutosNacionales: 'Ilimitados',
    mensajesSMS: '500 SMS',
    llamadasInternacionales: '60 min',
    caracteristicas: ['Apps ilimitadas', 'Streaming HD', 'Roaming premium', 'Hotspot 10 GB'],
  },
  {
    id: 'ultra_50gb',
    nombre: 'Ultra',
    datos: '50 GB',
    velocidad: '5G',
    precioMensualUSD: 22,
    popular: false,
    color: 'cyan',
    minutosNacionales: 'Ilimitados',
    mensajesSMS: 'Ilimitados',
    llamadasInternacionales: '200 min',
    caracteristicas: ['Streaming 4K', 'Roaming global', 'Hotspot 25 GB', 'VPN incluida', 'Prioridad de red'],
  },
  {
    id: 'infinite',
    nombre: 'Infinite',
    datos: 'Ilimitado',
    velocidad: '5G Ultra',
    precioMensualUSD: 35,
    popular: false,
    color: 'violet',
    minutosNacionales: 'Ilimitados',
    mensajesSMS: 'Ilimitados',
    llamadasInternacionales: 'Ilimitadas',
    caracteristicas: ['Streaming 4K/8K', 'Roaming global premium', 'Hotspot ilimitado', 'VPN + seguridad avanzada', 'Soporte prioritario 24/7', 'eSIM múltiple'],
  },
];

export interface SubPlanModulo {
  id: string;
  nombre: string;
  precioMensualUSD: number;
  popular?: boolean;
  caracteristicas: string[];
}

export interface ModuloIndividual {
  id: string;
  nombre: string;
  descripcion: string;
  precioDesdeUSD: number;
  color: string;
  icono: string;
  subPlanes: SubPlanModulo[];
}

export const MODULOS_INDIVIDUALES: ModuloIndividual[] = [
  {
    id: 'mi_linea_personal',
    nombre: 'Mi Línea Personal',
    descripcion: 'Tu línea móvil con planes desde 2 GB hasta ilimitado.',
    precioDesdeUSD: 3,
    color: '#06B6D4',
    icono: 'phone',
    subPlanes: PLANES_MI_LINEA.map(p => ({
      id: p.id,
      nombre: `${p.nombre} — ${p.datos}`,
      precioMensualUSD: p.precioMensualUSD,
      popular: p.popular,
      caracteristicas: [
        `${p.minutosNacionales} llamadas nacionales`,
        `${p.mensajesSMS}`,
        `Internac.: ${p.llamadasInternacionales}`,
        ...p.caracteristicas,
      ],
    })),
  },
  {
    id: 'mi_linea_juridica',
    nombre: 'Mi Línea Jurídica',
    descripcion: 'Flota corporativa con gestión centralizada de líneas empresariales.',
    precioDesdeUSD: 15,
    color: '#EC4899',
    icono: 'radio-tower',
    subPlanes: [
      { id: 'juridica_basico', nombre: 'Básico — 5 líneas', precioMensualUSD: 15, caracteristicas: ['Hasta 5 líneas corporativas', '10 GB compartidos', 'Panel de administración', 'Facturación consolidada'] },
      { id: 'juridica_plus', nombre: 'Plus — 15 líneas', precioMensualUSD: 35, caracteristicas: ['Hasta 15 líneas', '50 GB compartidos', 'Límites por empleado', 'MDM básico', 'Reportes de consumo'] },
      { id: 'juridica_pro', nombre: 'Pro — 50 líneas', precioMensualUSD: 65, popular: true, caracteristicas: ['Hasta 50 líneas', '200 GB compartidos', 'MDM completo', 'Reportes CONATEL', 'Internet empresarial', 'Soporte prioritario'] },
      { id: 'juridica_max', nombre: 'Enterprise — Ilimitado', precioMensualUSD: 120, caracteristicas: ['Líneas ilimitadas', 'Datos ilimitados', 'MDM avanzado + BYOD', 'Reportes CONATEL premium', 'Internet dedicado', 'VPN corporativa', 'Gerente de cuenta dedicado'] },
    ],
  },
  {
    id: 'asesoria_contable',
    nombre: 'Asesoría Contable',
    descripcion: 'Contabilidad VEN-NIF con libros, tributos y analítica fiscal.',
    precioDesdeUSD: 8,
    color: '#3B82F6',
    icono: 'calculator',
    subPlanes: [
      { id: 'contable_esencial', nombre: 'Esencial', precioMensualUSD: 8, caracteristicas: ['Libros legales básicos (Diario, Mayor)', 'Calendario fiscal con alertas', 'Consulta RIF/Cédula (20/mes)', 'Tasa BCV en vivo', '1 usuario'] },
      { id: 'contable_profesional', nombre: 'Profesional', precioMensualUSD: 18, popular: true, caracteristicas: ['Todo en Esencial +', 'Libro de Inventario', 'Centro Tributario (IVA, ISLR, IGTF)', 'Retenciones automáticas', 'Simulador de multas COT', 'Exportación Excel', '3 usuarios'] },
      { id: 'contable_avanzado', nombre: 'Avanzado', precioMensualUSD: 35, caracteristicas: ['Todo en Profesional +', 'Vigilancia Normativa Automatizada', 'Declaraciones asistidas (12/año)', 'Conciliación bancaria', 'Asientos automáticos', 'Auditoría forense', '5 usuarios'] },
      { id: 'contable_max', nombre: 'MAX', precioMensualUSD: 60, caracteristicas: ['Todo en Avanzado +', 'Dictamen de Contador Público', 'Blockchain audit trail', 'Multi-empresa', 'Usuarios ilimitados', 'Soporte VIP 24/7', 'API de integración'] },
    ],
  },
  {
    id: 'asesoria_legal',
    nombre: 'Asesoría Legal',
    descripcion: 'Documentos sistémicos, contratos, permisos y litigios.',
    precioDesdeUSD: 5,
    color: '#F59E0B',
    icono: 'scale',
    subPlanes: [
      { id: 'legal_basico', nombre: 'Básico', precioMensualUSD: 5, caracteristicas: ['Generador de documentos básico', 'Archivo de hasta 20 contratos', 'Alertas de vencimiento', '1 usuario'] },
      { id: 'legal_profesional', nombre: 'Profesional', precioMensualUSD: 15, popular: true, caracteristicas: ['Todo en Básico +', 'Generador de Documentos Avanzado', 'Contratos ilimitados', 'Gestión de permisos vigentes', 'Poderes de representación', '3 usuarios'] },
      { id: 'legal_escritorio', nombre: 'Escritorio Jurídico', precioMensualUSD: 30, caracteristicas: ['Todo en Profesional +', 'Control de litigios', 'Cumplimiento normativo', 'Marco Legal Venezuela', 'Calendario de audiencias', '5 usuarios'] },
      { id: 'legal_max', nombre: 'MAX', precioMensualUSD: 50, caracteristicas: ['Todo en Escritorio +', 'Gestión Legal Sistematizada', 'Multi-empresa', 'Usuarios ilimitados', 'Due diligence automatizado', 'Soporte legal prioritario'] },
    ],
  },
  {
    id: 'facturacion',
    nombre: 'Facturación',
    descripcion: 'Facturación fiscal SENIAT, POS y ventas.',
    precioDesdeUSD: 6,
    color: '#10B981',
    icono: 'receipt',
    subPlanes: [
      { id: 'fact_basico', nombre: 'Básico', precioMensualUSD: 6, caracteristicas: ['Hasta 50 facturas/mes', 'Facturación fiscal SENIAT', 'Cotizaciones y proformas', 'Notas de débito/crédito', '1 usuario'] },
      { id: 'fact_comercial', nombre: 'Comercial', precioMensualUSD: 15, popular: true, caracteristicas: ['Todo en Básico +', 'Hasta 300 facturas/mes', 'Punto de Venta (POS)', 'Ventas a crédito', 'Análisis comercial', 'Órdenes de compra', '3 usuarios'] },
      { id: 'fact_enterprise', nombre: 'Enterprise', precioMensualUSD: 30, caracteristicas: ['Todo en Comercial +', 'Facturas ilimitadas', 'Multi-sucursal', 'Inventario integrado', 'Pasarelas de pago', 'API de integración', '10 usuarios'] },
      { id: 'fact_max', nombre: 'MAX', precioMensualUSD: 50, caracteristicas: ['Todo en Enterprise +', 'Facturación electrónica avanzada', 'Multi-empresa', 'Usuarios ilimitados', 'Automatización total', 'Soporte VIP'] },
    ],
  },
  {
    id: 'socios_directivos',
    nombre: 'Socios y Directivos',
    descripcion: 'Gestión de accionistas, actas, dividendos y gobierno corporativo.',
    precioDesdeUSD: 10,
    color: '#8B5CF6',
    icono: 'users',
    subPlanes: [
      { id: 'socios_basico', nombre: 'Básico', precioMensualUSD: 10, caracteristicas: ['Registro de hasta 5 socios', 'Actas de asambleas', 'Distribución de dividendos', 'Directorio corporativo básico'] },
      { id: 'socios_profesional', nombre: 'Profesional', precioMensualUSD: 25, popular: true, caracteristicas: ['Todo en Básico +', 'Socios ilimitados', 'Flujo de aprobaciones', 'Gobierno corporativo', 'Reportes para accionistas', 'Calendario de asambleas'] },
      { id: 'socios_enterprise', nombre: 'Enterprise', precioMensualUSD: 45, caracteristicas: ['Todo en Profesional +', 'Multi-empresa', 'Grupos empresariales', 'Auditoría de decisiones', 'Blockchain proof', 'Cumplimiento SOX/BIS', 'Soporte dedicado'] },
    ],
  },
];

export interface PlanKyron {
  id: PlanTier;
  nombre: string;
  nombreCompleto: string;
  precioMensualUSD: number;
  precioAnualUSD: number;
  precioAnualMensualizado: number;
  ahorroAnualUSD: number;
  ahorroAnualPorcentaje: number;
  color: string;
  descripcion: string;
  destacado: boolean;
  limites: PlanLimites;
  modulosIncluidos: string[];
  etiqueta?: string;
}

export interface PlanLimites {
  alertasFiscales: number;
  alertasRegulatorias: number;
  simuladorMultas: number;
  exportacionesExcel: number;
  consultasRIF: number;
  declaracionesAsistidas: number;
  blockchainProofs: number;
  facturasMensuales?: number;
  empleadosNomina?: number;
  clientesCRM?: number;
  documentosLegales?: number;
  lineasTelecom?: number;
  reportesMensuales?: number;
  usuariosConcurrentes?: number;
  almacenamientoGB?: number;
}

export const ILIMITADO = 999999;

export const PLANES: PlanKyron[] = [
  {
    id: 'personal',
    nombre: 'Personal',
    nombreCompleto: 'Kyron Personal',
    precioMensualUSD: 0,
    precioAnualUSD: 0,
    precioAnualMensualizado: 0,
    ahorroAnualUSD: 0,
    ahorroAnualPorcentaje: 0,
    color: '#22C55E',
    descripcion: 'Cuenta personal con herramientas básicas. Totalmente gratis, para siempre.',
    destacado: false,
    etiqueta: 'GRATIS',
    limites: {
      alertasFiscales: 10,
      alertasRegulatorias: 5,
      facturasMensuales: 20,
      empleadosNomina: 0,
      clientesCRM: 25,
      documentosLegales: 5,
      lineasTelecom: 3,
      reportesMensuales: 3,
      usuariosConcurrentes: 1,
      almacenamientoGB: 3,
      simuladorMultas: 5,
      exportacionesExcel: 5,
      consultasRIF: 15,
      declaracionesAsistidas: 0,
      blockchainProofs: 10,
    },
    modulosIncluidos: [
      'Cuenta Personal completa',
      'Tasa BCV en vivo',
      'Soporte Técnico Especializado',
      'Alertas SENIAT (10/mes)',
      'Consulta RIF/Cédula (15/mes)',
      'Documentos personales',
      'Dashboard personal',
      '1 usuario',
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    nombreCompleto: 'Kyron Profesional',
    precioMensualUSD: 34.99,
    precioAnualUSD: 349.9,
    precioAnualMensualizado: 29.16,
    ahorroAnualUSD: 59.88,
    ahorroAnualPorcentaje: 15,
    color: '#0EA5E9',
    descripcion: 'Paquete completo: Contabilidad + Facturación + Mi Línea. El estándar para PyMEs.',
    destacado: false,
    etiqueta: 'EL MEJOR VALOR',
    limites: {
      alertasFiscales: 50,
      alertasRegulatorias: 30,
      facturasMensuales: 500,
      empleadosNomina: 15,
      clientesCRM: 500,
      documentosLegales: 50,
      lineasTelecom: 10,
      reportesMensuales: 20,
      usuariosConcurrentes: 5,
      almacenamientoGB: 25,
      simuladorMultas: 50,
      exportacionesExcel: 50,
      consultasRIF: 100,
      declaracionesAsistidas: 12,
      blockchainProofs: 100,
    },
    modulosIncluidos: [
      'Todo en Personal +',
      'Asesoría Contable VEN-NIF Pro',
      'Facturación SENIAT (500/mes)',
      'Mi Línea (10 líneas)',
      'Bóveda Digital (25GB)',
      'Auditoría Fiscal en Tiempo Real',
      'Simulador de multas COT Pro',
      'Declaraciones asistidas (12/año)',
      '5 usuarios',
    ],
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    nombreCompleto: 'Kyron Empresarial',
    precioMensualUSD: 69.99,
    precioAnualUSD: 699.9,
    precioAnualMensualizado: 58.33,
    ahorroAnualUSD: 159.88,
    ahorroAnualPorcentaje: 15,
    color: '#A78BFA',
    descripcion: 'Todo incluido para empresas en crecimiento y corporaciones.',
    destacado: true,
    etiqueta: 'MÁS POPULAR',
    limites: {
      alertasFiscales: 100,
      alertasRegulatorias: 50,
      facturasMensuales: 1000,
      empleadosNomina: 50,
      clientesCRM: 1000,
      documentosLegales: 100,
      lineasTelecom: 20,
      reportesMensuales: 50,
      usuariosConcurrentes: 10,
      almacenamientoGB: 50,
      simuladorMultas: 100,
      exportacionesExcel: 100,
      consultasRIF: 200,
      declaracionesAsistidas: 24,
      blockchainProofs: 200,
    },
    modulosIncluidos: [
      'TODOS los módulos incluidos',
      'Asesoría Contable avanzada',
      'Asesoría Legal completa',
      'Facturación ilimitada',
      'Socios y Directivos',
      'Mi Línea Jurídica (20 líneas)',
      'Alertas multicanal (Email, WhatsApp, SMS)',
      'Scoring de riesgo fiscal',
      '10 usuarios',
    ],
  },
  {
    id: 'kyron_max',
    nombre: 'Kyron MAX',
    nombreCompleto: 'Kyron MAX — Sin Límites',
    precioMensualUSD: 99.99,
    precioAnualUSD: 999.9,
    precioAnualMensualizado: 83.33,
    ahorroAnualUSD: 199.88,
    ahorroAnualPorcentaje: 15,
    color: '#F59E0B',
    descripcion: 'Todo ilimitado. Automatización total de misión crítica, API dedicada, white-label y soporte VIP.',
    destacado: false,
    etiqueta: 'SIN LÍMITES',
    limites: {
      alertasFiscales: ILIMITADO,
      alertasRegulatorias: ILIMITADO,
      facturasMensuales: ILIMITADO,
      empleadosNomina: ILIMITADO,
      clientesCRM: ILIMITADO,
      documentosLegales: ILIMITADO,
      lineasTelecom: ILIMITADO,
      reportesMensuales: ILIMITADO,
      usuariosConcurrentes: ILIMITADO,
      almacenamientoGB: ILIMITADO,
      simuladorMultas: ILIMITADO,
      exportacionesExcel: ILIMITADO,
      consultasRIF: ILIMITADO,
      declaracionesAsistidas: ILIMITADO,
      blockchainProofs: ILIMITADO,
    },
    modulosIncluidos: [
      'TODOS los módulos sin restricción',
      'Infraestructura de Misión Crítica 24/7',
      'Facturación ilimitada',
      'Mi Línea Jurídica ilimitada',
      'Asesoría Contable MAX',
      'Asesoría Legal MAX',
      'API dedicada + White-label',
      'Soporte prioritario VIP',
      'Usuarios ilimitados',
      'Almacenamiento ilimitado',
    ],
  },
];

export const VALID_PLANS_MAP: Record<string, number> = {
  personal: 0,
  solo: 19.99,
  profesional: 34.99,
  comerciante: 49.99,
  empresarial: 69.99,
  kyron_max: 99.99,
  contable_esencial: 19.99, contable_profesional: 19.99, contable_avanzado: 19.99, contable_max: 19.99,
  basico_2gb: 9.99, conecta_5gb: 9.99, plus_10gb: 9.99, global_25gb: 9.99, ultra_50gb: 9.99, infinite: 9.99,
  juridica_basico: 12.99, juridica_plus: 12.99, juridica_pro: 12.99, juridica_max: 12.99,
  legal_basico: 12.99, legal_profesional: 12.99, legal_escritorio: 12.99, legal_max: 12.99,
  fact_basico: 9.99, fact_comercial: 9.99, fact_enterprise: 9.99, fact_max: 9.99,
  socios_basico: 12.99, socios_profesional: 12.99, socios_enterprise: 12.99,
};

export function obtenerPlan(tier: PlanTier): PlanKyron {
  return PLANES.find(p => p.id === tier) || PLANES[0];
}

export function obtenerTodosLosPlanes(): PlanKyron[] {
  return PLANES;
}

export function esIlimitado(valor: number): boolean {
  return valor >= 999999;
}

export function formatearLimite(valor: number): string {
  if (esIlimitado(valor)) return 'Ilimitado';
  return valor.toLocaleString('es-VE');
}

export type RecursoLimite = keyof PlanLimites;

export function esRecursoValido(recurso: string): recurso is RecursoLimite {
  return Object.keys(PLANES[0].limites).includes(recurso);
}

export function calcularPrecio(plan: PlanKyron, ciclo: CicloFacturacion): {
  precio: number;
  label: string;
  ahorro?: number;
} {
  if (ciclo === 'anual' && plan.precioAnualUSD > 0) {
    return {
      precio: plan.precioAnualMensualizado,
      label: `$${plan.precioAnualMensualizado.toFixed(2)}/mes`,
      ahorro: plan.ahorroAnualUSD,
    };
  }
  return {
    precio: plan.precioMensualUSD,
    label: plan.precioMensualUSD === 0 ? 'Gratis' : `$${plan.precioMensualUSD.toFixed(2)}/mes`,
  };
}
