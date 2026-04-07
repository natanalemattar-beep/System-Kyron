import { query, queryOne } from '@/lib/db';

export type PlanTier = 'personal' | 'profesional' | 'empresarial' | 'kyron_max';
export type CicloFacturacion = 'mensual' | 'anual';

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
    precioMensualUSD: 9,
    precioAnualUSD: 90,
    precioAnualMensualizado: 7.50,
    ahorroAnualUSD: 18,
    ahorroAnualPorcentaje: 17,
    color: '#22C55E',
    descripcion: 'Para profesionales independientes. Cuenta personal, sostenibilidad y máximo provecho de cada módulo esencial.',
    destacado: false,
    etiqueta: 'SOSTENIBLE',
    limites: {
      consultasAI: 30,
      alertasFiscales: 10,
      alertasRegulatorias: 5,
      facturasMensuales: 50,
      empleadosNomina: 5,
      clientesCRM: 50,
      documentosLegales: 10,
      lineasTelecom: 2,
      reportesMensuales: 5,
      usuariosConcurrentes: 1,
      almacenamientoGB: 5,
      chatAIMensajes: 50,
      simuladorMultas: 10,
      exportacionesExcel: 10,
      consultasRIF: 15,
      declaracionesAsistidas: 2,
      blockchainProofs: 15,
    },
    modulosIncluidos: [
      'Cuenta Personal completa',
      'Módulo Sostenibilidad',
      'Contabilidad personal',
      'Facturación fiscal (50/mes)',
      'Tasa BCV en vivo',
      'Alertas SENIAT (10/mes)',
      'Chat AI (50 msgs/mes)',
      'Consulta RIF/Cédula (15/mes)',
      '1 usuario',
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    nombreCompleto: 'Kyron Profesional',
    precioMensualUSD: 29,
    precioAnualUSD: 290,
    precioAnualMensualizado: 24.17,
    ahorroAnualUSD: 58,
    ahorroAnualPorcentaje: 17,
    color: '#0EA5E9',
    descripcion: 'Para PYMEs y contadores. Contabilidad completa con AI fiscal y alertas expandidas.',
    destacado: false,
    limites: {
      consultasAI: 100,
      alertasFiscales: 30,
      alertasRegulatorias: 15,
      facturasMensuales: 200,
      empleadosNomina: 15,
      clientesCRM: 200,
      documentosLegales: 30,
      lineasTelecom: 5,
      reportesMensuales: 10,
      usuariosConcurrentes: 3,
      almacenamientoGB: 10,
      chatAIMensajes: 100,
      simuladorMultas: 20,
      exportacionesExcel: 20,
      consultasRIF: 50,
      declaracionesAsistidas: 6,
      blockchainProofs: 50,
    },
    modulosIncluidos: [
      'Todo en Personal +',
      'Contabilidad VEN-NIF completa',
      'Nómina hasta 15 empleados',
      'CRM 200 clientes',
      'Alertas todos los entes (30/mes)',
      'Gacetas y Asamblea Nacional (15/mes)',
      'Chat AI fiscal (100 msgs/mes)',
      'Simulador de multas (20/mes)',
      'Declaraciones asistidas IVA/ISLR (6/año)',
      'Exportación Excel (20/mes)',
      'Blockchain audit trail (50/mes)',
      '3 usuarios',
    ],
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    nombreCompleto: 'Kyron Empresarial',
    precioMensualUSD: 79,
    precioAnualUSD: 790,
    precioAnualMensualizado: 65.83,
    ahorroAnualUSD: 158,
    ahorroAnualPorcentaje: 17,
    color: '#A78BFA',
    descripcion: 'Para empresas medianas. Todos los módulos con AI avanzada y alertas multicanal.',
    destacado: true,
    etiqueta: 'MÁS POPULAR',
    limites: {
      consultasAI: 500,
      alertasFiscales: 100,
      alertasRegulatorias: 50,
      facturasMensuales: 1000,
      empleadosNomina: 75,
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
      'Todo lo del Profesional +',
      'Nómina hasta 75 empleados',
      'CRM 1.000 clientes',
      'RRHH completo + Bienestar Laboral',
      'Módulo Legal + Permisología',
      'Telecom corporativo (20 líneas)',
      'AI avanzada (500 msgs/mes)',
      'Alertas multicanal Email + WhatsApp + SMS',
      'Monitor Gacetas completo (50/mes)',
      'Declaraciones asistidas mensuales',
      'Scoring de riesgo fiscal',
      'Reportes ejecutivos (50/mes)',
      '10 usuarios',
    ],
  },
  {
    id: 'kyron_max',
    nombre: 'Kyron MAX',
    nombreCompleto: 'Kyron MAX — Sin Límites',
    precioMensualUSD: 199,
    precioAnualUSD: 1990,
    precioAnualMensualizado: 165.83,
    ahorroAnualUSD: 398,
    ahorroAnualPorcentaje: 17,
    color: '#F59E0B',
    descripcion: 'Todo ilimitado. AI sin restricciones, alertas 24/7, soporte prioritario, API dedicada.',
    destacado: false,
    etiqueta: 'TODO ILIMITADO',
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
      'AI Claude ilimitado 24/7',
      'Alertas en tiempo real sin tope',
      'Empleados y clientes ilimitados',
      'Facturación ilimitada',
      'Telecom ilimitado',
      'Blockchain immutable ilimitado',
      'API dedicada para integraciones',
      'Soporte prioritario VIP',
      'Usuarios ilimitados',
      'Almacenamiento ilimitado',
      'Generación automática de declaraciones',
      'Conciliación bancaria AI',
      'Portal de clientes personalizado',
      'White-label disponible',
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
