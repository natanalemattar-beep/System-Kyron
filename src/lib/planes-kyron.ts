import { query, queryOne } from '@/lib/db';

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
    descripcion: 'Contabilidad VEN-NIF con libros, tributos e IA fiscal.',
    precioDesdeUSD: 8,
    color: '#3B82F6',
    icono: 'calculator',
    subPlanes: [
      { id: 'contable_esencial', nombre: 'Esencial', precioMensualUSD: 8, caracteristicas: ['Libros legales básicos (Diario, Mayor)', 'Calendario fiscal con alertas', 'Consulta RIF/Cédula (20/mes)', 'Tasa BCV en vivo', '1 usuario'] },
      { id: 'contable_profesional', nombre: 'Profesional', precioMensualUSD: 18, popular: true, caracteristicas: ['Todo en Esencial +', 'Libro de Inventario', 'Centro Tributario (IVA, ISLR, IGTF)', 'Retenciones automáticas', 'Simulador de multas COT', 'Exportación Excel', '3 usuarios'] },
      { id: 'contable_avanzado', nombre: 'Avanzado', precioMensualUSD: 35, caracteristicas: ['Todo en Profesional +', 'IA Fiscal para consultas', 'Declaraciones asistidas (12/año)', 'Conciliación bancaria', 'Asientos automáticos', 'Auditoría forense', '5 usuarios'] },
      { id: 'contable_max', nombre: 'MAX', precioMensualUSD: 60, caracteristicas: ['Todo en Avanzado +', 'Dictamen de Contador Público', 'Blockchain audit trail', 'Multi-empresa', 'Usuarios ilimitados', 'Soporte VIP 24/7', 'API de integración'] },
    ],
  },
  {
    id: 'asesoria_legal',
    nombre: 'Asesoría Legal',
    descripcion: 'Documentos con IA, contratos, permisos y litigios.',
    precioDesdeUSD: 5,
    color: '#F59E0B',
    icono: 'scale',
    subPlanes: [
      { id: 'legal_basico', nombre: 'Básico', precioMensualUSD: 5, caracteristicas: ['Generador de documentos básico', 'Archivo de hasta 20 contratos', 'Alertas de vencimiento', '1 usuario'] },
      { id: 'legal_profesional', nombre: 'Profesional', precioMensualUSD: 15, popular: true, caracteristicas: ['Todo en Básico +', 'Generador con IA avanzada', 'Contratos ilimitados', 'Gestión de permisos vigentes', 'Poderes de representación', '3 usuarios'] },
      { id: 'legal_escritorio', nombre: 'Escritorio Jurídico', precioMensualUSD: 30, caracteristicas: ['Todo en Profesional +', 'Control de litigios', 'Cumplimiento normativo', 'Marco Legal Venezuela', 'Calendario de audiencias', '5 usuarios'] },
      { id: 'legal_max', nombre: 'MAX', precioMensualUSD: 50, caracteristicas: ['Todo en Escritorio +', 'IA Legal avanzada', 'Multi-empresa', 'Usuarios ilimitados', 'Due diligence automatizado', 'Soporte legal prioritario'] },
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
  consultasAI: number;
  alertasFiscales: number;
  alertasRegulatorias: number;
  facturasMensuales: number;
  empleadosNomina: number;
  clientesCRM: number;
  documentosLegales: number;
  lineasTelecom: number;
  reportesMensuales: number;
  usuariosConcurrentes: number;
  almacenamientoGB: number;
  chatAIMensajes: number;
  simuladorMultas: number;
  exportacionesExcel: number;
  consultasRIF: number;
  declaracionesAsistidas: number;
  blockchainProofs: number;
}

const ILIMITADO = 999999;

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
      consultasAI: 30,
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
      chatAIMensajes: 50,
      simuladorMultas: 5,
      exportacionesExcel: 5,
      consultasRIF: 15,
      declaracionesAsistidas: 0,
      blockchainProofs: 10,
    },
    modulosIncluidos: [
      'Cuenta Personal completa',
      'Tasa BCV en vivo',
      'Chat AI (50 msgs/mes)',
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
    precioMensualUSD: 29,
    precioAnualUSD: 278,
    precioAnualMensualizado: 23,
    ahorroAnualUSD: 70,
    ahorroAnualPorcentaje: 20,
    color: '#0EA5E9',
    descripcion: 'Paquete completo: Contabilidad + Facturación + Mi Línea. Ahorra $1/mes vs. individual.',
    destacado: false,
    etiqueta: 'AHORRA 30%',
    limites: {
      consultasAI: 100,
      alertasFiscales: 30,
      alertasRegulatorias: 15,
      facturasMensuales: 200,
      empleadosNomina: 5,
      clientesCRM: 200,
      documentosLegales: 30,
      lineasTelecom: 5,
      reportesMensuales: 10,
      usuariosConcurrentes: 3,
      almacenamientoGB: 10,
      chatAIMensajes: 150,
      simuladorMultas: 20,
      exportacionesExcel: 20,
      consultasRIF: 50,
      declaracionesAsistidas: 6,
      blockchainProofs: 50,
    },
    modulosIncluidos: [
      'Todo en Personal +',
      'Asesoría Contable VEN-NIF',
      'Facturación SENIAT (200/mes)',
      'Mi Línea (5 líneas)',
      'Centro Tributario completo',
      'Simulador de multas COT',
      'Declaraciones asistidas (6/año)',
      'Blockchain audit trail',
      '3 usuarios',
    ],
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    nombreCompleto: 'Kyron Empresarial',
    precioMensualUSD: 59,
    precioAnualUSD: 566,
    precioAnualMensualizado: 47,
    ahorroAnualUSD: 142,
    ahorroAnualPorcentaje: 20,
    color: '#A78BFA',
    descripcion: 'Todo incluido para empresas en crecimiento. Ahorra $6/mes vs. individual.',
    destacado: true,
    etiqueta: 'MÁS POPULAR',
    limites: {
      consultasAI: 500,
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
      chatAIMensajes: 500,
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
      'IA avanzada (500 msgs/mes)',
      'Alertas multicanal (Email, WhatsApp, SMS)',
      'Scoring de riesgo fiscal',
      '10 usuarios',
    ],
  },
  {
    id: 'kyron_max',
    nombre: 'Kyron MAX',
    nombreCompleto: 'Kyron MAX — Sin Límites',
    precioMensualUSD: 149,
    precioAnualUSD: 1430,
    precioAnualMensualizado: 119,
    ahorroAnualUSD: 358,
    ahorroAnualPorcentaje: 20,
    color: '#F59E0B',
    descripcion: 'Todo ilimitado. IA sin restricciones, API dedicada, white-label y soporte VIP.',
    destacado: false,
    etiqueta: 'SIN LÍMITES',
    limites: {
      consultasAI: ILIMITADO,
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
      chatAIMensajes: ILIMITADO,
      simuladorMultas: ILIMITADO,
      exportacionesExcel: ILIMITADO,
      consultasRIF: ILIMITADO,
      declaracionesAsistidas: ILIMITADO,
      blockchainProofs: ILIMITADO,
    },
    modulosIncluidos: [
      'TODOS los módulos sin restricción',
      'IA Claude ilimitado 24/7',
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

export function obtenerPlan(tier: PlanTier): PlanKyron {
  return PLANES.find(p => p.id === tier) || PLANES[0];
}

export function obtenerTodosLosPlanes(): PlanKyron[] {
  return PLANES;
}

export function esIlimitado(valor: number): boolean {
  return valor >= ILIMITADO;
}

export function formatearLimite(valor: number): string {
  if (valor >= ILIMITADO) return 'Ilimitado';
  if (valor === 0) return 'No incluido';
  return valor.toLocaleString('es-VE');
}

export interface UsoPlan {
  userId: number;
  plan: PlanTier;
  ciclo: CicloFacturacion;
  periodo: string;
  consultas_ai: number;
  alertas_fiscales: number;
  alertas_regulatorias: number;
  facturas: number;
  chat_mensajes: number;
  simulador_multas: number;
  exportaciones: number;
  consultas_rif: number;
  blockchain_proofs: number;
}

export async function obtenerUsoPlan(userId: number): Promise<UsoPlan> {
  const ahora = new Date();
  const periodo = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;

  const uso = await queryOne<UsoPlan>(
    `SELECT * FROM uso_plan WHERE user_id = $1 AND periodo = $2`,
    [userId, periodo]
  );

  if (uso) return uso;

  await query(
    `INSERT INTO uso_plan (user_id, plan, ciclo, periodo)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, periodo) DO NOTHING`,
    [userId, 'personal', 'mensual', periodo]
  );

  return {
    userId,
    plan: 'personal',
    ciclo: 'mensual' as CicloFacturacion,
    periodo,
    consultas_ai: 0,
    alertas_fiscales: 0,
    alertas_regulatorias: 0,
    facturas: 0,
    chat_mensajes: 0,
    simulador_multas: 0,
    exportaciones: 0,
    consultas_rif: 0,
    blockchain_proofs: 0,
  };
}

export type RecursoLimite = keyof PlanLimites;

const RECURSOS_VALIDOS = new Set<string>(Object.keys(PLANES[0].limites));

export function esRecursoValido(recurso: string): recurso is RecursoLimite {
  return RECURSOS_VALIDOS.has(recurso);
}

const CAMPO_USO_MAP: Partial<Record<RecursoLimite, string>> = {
  consultasAI: 'consultas_ai',
  alertasFiscales: 'alertas_fiscales',
  alertasRegulatorias: 'alertas_regulatorias',
  facturasMensuales: 'facturas',
  chatAIMensajes: 'chat_mensajes',
  simuladorMultas: 'simulador_multas',
  exportacionesExcel: 'exportaciones',
  consultasRIF: 'consultas_rif',
  blockchainProofs: 'blockchain_proofs',
};

const RECURSOS_NO_TRACKABLES: Set<RecursoLimite> = new Set([
  'empleadosNomina',
  'clientesCRM',
  'documentosLegales',
  'lineasTelecom',
  'reportesMensuales',
  'usuariosConcurrentes',
  'almacenamientoGB',
  'declaracionesAsistidas',
]);

export async function verificarLimite(
  userId: number,
  recurso: RecursoLimite
): Promise<{ permitido: boolean; usado: number; limite: number; plan: PlanTier; porcentaje: number; trackable: boolean }> {
  if (!esRecursoValido(recurso)) {
    return { permitido: false, usado: 0, limite: 0, plan: 'personal', porcentaje: 100, trackable: false };
  }

  const uso = await obtenerUsoPlan(userId);
  const plan = obtenerPlan(uso.plan);
  const limite = plan.limites[recurso] ?? 0;

  if (RECURSOS_NO_TRACKABLES.has(recurso)) {
    return { permitido: true, usado: 0, limite, plan: uso.plan, porcentaje: 0, trackable: false };
  }

  const campo = CAMPO_USO_MAP[recurso];
  const usado = campo ? (uso as Record<string, number>)[campo] || 0 : 0;
  const porcentaje = limite >= ILIMITADO ? 0 : limite > 0 ? Math.round((usado / limite) * 100) : 100;

  return {
    permitido: limite >= ILIMITADO || usado < limite,
    usado,
    limite,
    plan: uso.plan,
    porcentaje: Math.min(porcentaje, 100),
    trackable: true,
  };
}

export async function incrementarUso(
  userId: number,
  recurso: RecursoLimite,
  cantidad: number = 1
): Promise<boolean> {
  const check = await verificarLimite(userId, recurso);
  if (!check.permitido) return false;

  const campo = CAMPO_USO_MAP[recurso];
  if (!campo) return false;

  const ahora = new Date();
  const periodo = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;

  await query(
    `UPDATE uso_plan SET ${campo} = ${campo} + $1 WHERE user_id = $2 AND periodo = $3`,
    [cantidad, userId, periodo]
  );

  return true;
}

export async function obtenerResumenUso(userId: number) {
  const uso = await obtenerUsoPlan(userId);
  const plan = obtenerPlan(uso.plan);

  const recursos = [
    { key: 'consultasAI' as RecursoLimite, label: 'Consultas AI', icon: 'brain', usado: uso.consultas_ai },
    { key: 'chatAIMensajes' as RecursoLimite, label: 'Chat AI', icon: 'message', usado: uso.chat_mensajes },
    { key: 'alertasFiscales' as RecursoLimite, label: 'Alertas Fiscales', icon: 'bell', usado: uso.alertas_fiscales },
    { key: 'alertasRegulatorias' as RecursoLimite, label: 'Alertas Regulatorias', icon: 'gavel', usado: uso.alertas_regulatorias },
    { key: 'facturasMensuales' as RecursoLimite, label: 'Facturas', icon: 'file', usado: uso.facturas },
    { key: 'simuladorMultas' as RecursoLimite, label: 'Simulador Multas', icon: 'calculator', usado: uso.simulador_multas },
    { key: 'exportacionesExcel' as RecursoLimite, label: 'Exportaciones', icon: 'download', usado: uso.exportaciones },
    { key: 'consultasRIF' as RecursoLimite, label: 'Consultas RIF', icon: 'search', usado: uso.consultas_rif },
    { key: 'blockchainProofs' as RecursoLimite, label: 'Blockchain Proofs', icon: 'shield', usado: uso.blockchain_proofs },
  ];

  const precios = calcularPrecio(plan, uso.ciclo || 'mensual');

  return {
    plan: {
      id: plan.id,
      nombre: plan.nombre,
      color: plan.color,
    },
    ciclo: uso.ciclo || 'mensual',
    precios,
    periodo: uso.periodo,
    recursos: recursos.map(r => ({
      ...r,
      limite: plan.limites[r.key],
      ilimitado: plan.limites[r.key] >= ILIMITADO,
      porcentaje: plan.limites[r.key] >= ILIMITADO ? 0 : Math.round((r.usado / plan.limites[r.key]) * 100),
      agotado: r.usado >= plan.limites[r.key] && plan.limites[r.key] < ILIMITADO,
    })),
  };
}

export async function cambiarPlan(userId: number, nuevoPlan: PlanTier, ciclo: CicloFacturacion = 'mensual'): Promise<boolean> {
  const ahora = new Date();
  const periodo = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;

  await query(
    `INSERT INTO uso_plan (user_id, plan, ciclo, periodo)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, periodo)
     DO UPDATE SET plan = EXCLUDED.plan, ciclo = EXCLUDED.ciclo`,
    [userId, nuevoPlan, ciclo, periodo]
  );

  return true;
}

export function calcularPrecio(plan: PlanKyron, ciclo: CicloFacturacion): {
  precioTotal: number;
  precioMensualEfectivo: number;
  ahorro: number;
  ahorroPorc: number;
  etiquetaPrecio: string;
} {
  if (ciclo === 'anual') {
    return {
      precioTotal: plan.precioAnualUSD,
      precioMensualEfectivo: plan.precioAnualMensualizado,
      ahorro: plan.ahorroAnualUSD,
      ahorroPorc: plan.ahorroAnualPorcentaje,
      etiquetaPrecio: plan.precioAnualUSD === 0
        ? 'Gratis'
        : `$${plan.precioAnualUSD}/año ($${plan.precioAnualMensualizado}/mes)`,
    };
  }
  return {
    precioTotal: plan.precioMensualUSD,
    precioMensualEfectivo: plan.precioMensualUSD,
    ahorro: 0,
    ahorroPorc: 0,
    etiquetaPrecio: plan.precioMensualUSD === 0
      ? 'Gratis'
      : `$${plan.precioMensualUSD}/mes`,
  };
}
