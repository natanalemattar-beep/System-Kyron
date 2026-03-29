import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const alertas = await query(
    `SELECT id, nombre_permiso, organismo, fecha_vencimiento, estado, alertar_dias_antes,
            (fecha_vencimiento - CURRENT_DATE) AS dias_restantes,
            CASE
              WHEN fecha_vencimiento IS NULL THEN 'sin_vencimiento'
              WHEN (fecha_vencimiento - CURRENT_DATE) < 0 THEN 'vencido'
              WHEN (fecha_vencimiento - CURRENT_DATE) <= COALESCE(alertar_dias_antes, 30) THEN 'critico'
              WHEN (fecha_vencimiento - CURRENT_DATE) <= 60 THEN 'advertencia'
              ELSE 'ok'
            END AS nivel_alerta
     FROM permisos_legales
     WHERE user_id = $1
       AND fecha_vencimiento IS NOT NULL
       AND (fecha_vencimiento - CURRENT_DATE) <= 90
     ORDER BY fecha_vencimiento ASC`,
    [session.userId]
  );

  const resumen = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'vigente')::int AS vigentes,
       COUNT(*) FILTER (WHERE estado = 'vencido')::int AS vencidos,
       COUNT(*) FILTER (WHERE estado = 'en_tramite')::int AS en_tramite,
       COUNT(*) FILTER (WHERE estado = 'renovacion')::int AS en_renovacion,
       COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL
                          AND fecha_vencimiento <= CURRENT_DATE AND estado = 'vigente')::int AS vencidos_sin_actualizar,
       COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL
                          AND (fecha_vencimiento - CURRENT_DATE) BETWEEN 0 AND 30
                          AND estado = 'vigente')::int AS por_vencer_30,
       COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL
                          AND (fecha_vencimiento - CURRENT_DATE) BETWEEN 31 AND 60
                          AND estado = 'vigente')::int AS por_vencer_60,
       COUNT(*)::int AS total
     FROM permisos_legales WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ alertas, resumen: resumen[0] ?? {} });
}
