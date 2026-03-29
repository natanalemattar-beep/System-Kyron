import { query } from '@/lib/db';

export interface LogActivityParams {
  userId?: number | null;
  evento: string;
  categoria: 'auth' | 'contabilidad' | 'rrhh' | 'banco' | 'clientes' | 'documentos' | 'ia' | 'sistema' | 'telecom' | 'eco' | 'legal' | 'nomina' | 'inventario' | 'ventas' | 'config';
  descripcion?: string;
  entidadTipo?: string;
  entidadId?: number | null;
  metadata?: Record<string, unknown>;
  ip?: string;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await query(
      `INSERT INTO activity_log (user_id, evento, categoria, descripcion, entidad_tipo, entidad_id, metadata, ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        params.userId ?? null,
        params.evento,
        params.categoria,
        params.descripcion ?? null,
        params.entidadTipo ?? null,
        params.entidadId ?? null,
        params.metadata ? JSON.stringify(params.metadata) : null,
        params.ip ?? null,
      ]
    );
  } catch (err: any) {
    console.error('[activity-logger] Error al registrar actividad:', err.message);
  }
}

export interface AuditParams {
  userId?: number | null;
  tablaAfectada: string;
  registroId?: number | null;
  operacion: 'INSERT' | 'UPDATE' | 'DELETE' | 'SELECT' | 'EXPORT' | 'IMPORT' | 'LOGIN' | 'LOGOUT';
  datosAnteriores?: Record<string, unknown> | null;
  datosNuevos?: Record<string, unknown> | null;
  camposModificados?: string[];
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export async function logAudit(params: AuditParams): Promise<void> {
  try {
    await query(
      `INSERT INTO auditoria_detallada 
       (user_id, tabla_afectada, registro_id, operacion, datos_anteriores, datos_nuevos, campos_modificados, ip_address, user_agent, session_id, risk_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        params.userId ?? null,
        params.tablaAfectada,
        params.registroId ?? null,
        params.operacion,
        params.datosAnteriores ? JSON.stringify(params.datosAnteriores) : null,
        params.datosNuevos ? JSON.stringify(params.datosNuevos) : null,
        params.camposModificados ?? null,
        params.ipAddress ?? null,
        params.userAgent ?? null,
        params.sessionId ?? null,
        params.riskLevel ?? 'low',
      ]
    );
  } catch (err: any) {
    console.error('[audit-logger] Error al registrar auditoría:', err.message);
  }
}

export async function logSystemHealth(
  metricType: string,
  value: number,
  unit: string = 'ms',
  context?: Record<string, unknown>
): Promise<void> {
  try {
    await query(
      `INSERT INTO system_health_log (metric_type, value, unit, context) VALUES ($1, $2, $3, $4)`,
      [metricType, value, unit, context ? JSON.stringify(context) : null]
    );
  } catch (err: any) {
    console.error('[health-logger] Error:', err.message);
  }
}
