import 'server-only';
import { query, queryOne } from '@/lib/db';
import {
  PLANES,
  obtenerPlan,
  esIlimitado,
  ILIMITADO,
  type PlanTier,
  type CicloFacturacion,
  type PlanKyron,
  type PlanLimites,
  type RecursoLimite,
  esRecursoValido as esRecursoValidoBase,
} from '@/lib/planes-data';

export type { PlanTier, CicloFacturacion, PlanKyron, PlanLimites, RecursoLimite };
export { PLANES, PLANES_MI_LINEA, MODULOS_INDIVIDUALES, VALID_PLANS_MAP, obtenerPlan, obtenerTodosLosPlanes, esIlimitado, formatearLimite, esRecursoValido, calcularPrecio } from '@/lib/planes-data';

export interface UsoPlan {
  userId: number;
  plan: PlanTier;
  ciclo: CicloFacturacion;
  periodo: string;
  alertas_regulatorias: number;
  facturas: number;
  simulador_multas: number;
  exportaciones: number;
  consultas_rif: number;
  blockchain_proofs: number;
  alertas_fiscales?: number;
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
    alertas_fiscales: 0,
    alertas_regulatorias: 0,
    facturas: 0,
    simulador_multas: 0,
    exportaciones: 0,
    consultas_rif: 0,
    blockchain_proofs: 0,
  };
}

const CAMPO_USO_MAP: Partial<Record<RecursoLimite, string>> = {
  alertasRegulatorias: 'alertas_regulatorias',
  facturasMensuales: 'facturas',
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
  if (!esRecursoValidoBase(recurso)) {
    return { permitido: false, usado: 0, limite: 0, plan: 'personal', porcentaje: 100, trackable: false };
  }

  const uso = await obtenerUsoPlan(userId);
  const plan = obtenerPlan(uso.plan);
  const limite = plan.limites[recurso] ?? 0;

  if (RECURSOS_NO_TRACKABLES.has(recurso)) {
    return { permitido: true, usado: 0, limite, plan: uso.plan, porcentaje: 0, trackable: false };
  }

  const campo = CAMPO_USO_MAP[recurso];
  const usado = campo ? (uso as unknown as Record<string, number>)[campo] || 0 : 0;
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
    { key: 'alertasFiscales' as RecursoLimite, label: 'Alertas Fiscales', icon: 'bell', usado: (uso as any).alertas_fiscales || 0 },
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
