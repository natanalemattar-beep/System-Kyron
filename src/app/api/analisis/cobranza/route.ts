import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const uid = session.userId;

  const rows = await query(
    `SELECT
       COALESCE(c.razon_social, c.nombre_contacto, 'Cliente') AS cliente,
       COALESCE(SUM(CASE WHEN cxc.fecha_vencimiento <= CURRENT_DATE + 7 THEN cxc.monto_pendiente ELSE 0 END), 0)::float AS siete_dias,
       COALESCE(SUM(CASE WHEN cxc.fecha_vencimiento <= CURRENT_DATE + 30 THEN cxc.monto_pendiente ELSE 0 END), 0)::float AS treinta_dias
     FROM cuentas_por_cobrar cxc
     LEFT JOIN clientes c ON c.id = cxc.cliente_id AND c.user_id = $1
     WHERE cxc.user_id = $1 AND cxc.estado IN ('pendiente', 'parcial', 'vencida')
     GROUP BY COALESCE(c.razon_social, c.nombre_contacto, 'Cliente')
     HAVING SUM(cxc.monto_pendiente) > 0
     ORDER BY treinta_dias DESC LIMIT 10`,
    [uid]
  );

  return NextResponse.json({
    data: rows.map(r => ({
      cliente: (r as Record<string, unknown>).cliente,
      siete_dias: parseFloat(String((r as Record<string, unknown>).siete_dias)) || 0,
      treinta_dias: parseFloat(String((r as Record<string, unknown>).treinta_dias)) || 0,
    }))
  });
}
