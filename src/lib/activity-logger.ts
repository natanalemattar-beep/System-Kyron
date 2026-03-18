import { query } from '@/lib/db';

let tableReady = false;

async function ensureTable() {
  if (tableReady) return;
  await query(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id           SERIAL PRIMARY KEY,
      user_id      INTEGER,
      evento       TEXT NOT NULL,
      categoria    TEXT NOT NULL,
      descripcion  TEXT,
      entidad_tipo TEXT,
      entidad_id   INTEGER,
      metadata     JSONB,
      ip           TEXT,
      creado_en    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_activity_log_creado ON activity_log(creado_en DESC)`);
  tableReady = true;
}

export interface LogActivityParams {
  userId?: number | null;
  evento: string;
  categoria: 'auth' | 'contabilidad' | 'rrhh' | 'banco' | 'clientes' | 'documentos' | 'ia' | 'sistema';
  descripcion?: string;
  entidadTipo?: string;
  entidadId?: number | null;
  metadata?: Record<string, unknown>;
  ip?: string;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await ensureTable();
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
