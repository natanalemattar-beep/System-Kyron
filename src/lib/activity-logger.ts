import { query } from '@/lib/db';

export interface LogActivityParams {
  userId?: number | null;
  evento: string;
  categoria: 'auth' | 'contabilidad' | 'rrhh' | 'banco' | 'clientes' | 'documentos' | 'ia' | 'sistema' | 'telecom' | 'eco' | 'legal' | 'nomina';
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
  } catch (err) {
    console.error('[activity-logger] Error al registrar actividad:', err);
  }
}
