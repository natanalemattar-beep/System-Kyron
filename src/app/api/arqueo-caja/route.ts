import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { total_contado, total_esperado, diferencia, conteo, observaciones } = body;

    if (total_contado === undefined || total_esperado === undefined) {
      return NextResponse.json({ error: 'Datos de cierre incompletos' }, { status: 400 });
    }

    const totalContado = parseFloat(total_contado) || 0;
    const totalEsperado = parseFloat(total_esperado) || 0;
    const diff = parseFloat(diferencia) || 0;

    const [row] = await query(
      `INSERT INTO arqueos_caja (user_id, fecha, turno, saldo_apertura, total_ingresos, total_egresos, saldo_cierre, diferencia, responsable, estado, notas)
       VALUES ($1, CURRENT_DATE, 'completo', $2, $3, 0, $4, $5, $6, 'cerrado', $7)
       RETURNING *`,
      [
        session.userId,
        totalEsperado,
        totalContado,
        totalContado,
        diff,
        session.nombre || 'Usuario',
        observaciones || '',
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'CIERRE_CAJA',
      categoria: 'contabilidad',
      descripcion: `Cierre de caja registrado. Diferencia: ${diferencia}`,
      entidadTipo: 'arqueo',
      entidadId: (row as Record<string, unknown>).id as number,
      metadata: { total_contado, total_esperado, diferencia },
    });

    return NextResponse.json({ success: true, arqueo: row });
  } catch (err) {
    console.error('[api/arqueo-caja] Error:', err);
    return NextResponse.json({ error: 'Error al guardar cierre de caja' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const rows = await query(
      `SELECT * FROM arqueos_caja WHERE user_id = $1 ORDER BY created_at DESC LIMIT 30`,
      [session.userId]
    );
    return NextResponse.json({ arqueos: rows });
  } catch {
    return NextResponse.json({ error: 'Error al obtener cierres' }, { status: 500 });
  }
}
