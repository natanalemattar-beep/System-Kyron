import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const cierres = await query(
    `SELECT id, periodo, fecha_inicio, fecha_fin, fecha_cierre,
            ingresos_total::text, gastos_total::text, utilidad_neta::text,
            facturas_emitidas, facturas_cobradas, estado, cerrado_por, notas, created_at
     FROM periodo_fiscal_cierres
     WHERE user_id = $1
     ORDER BY fecha_cierre DESC`,
    [session.userId]
  );

  return NextResponse.json({ cierres });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { periodo, fecha_inicio, fecha_fin, cerrado_por, notas } = body;

  if (!periodo || !fecha_inicio || !fecha_fin) {
    return NextResponse.json({ error: 'Periodo, fecha inicio y fecha fin son requeridos' }, { status: 400 });
  }

  const ingresos = await queryOne<{ total: string }>(
    `SELECT COALESCE(SUM(monto), 0)::text AS total FROM movimientos_bancarios
     WHERE user_id = $1 AND tipo = 'credito' AND fecha_operacion BETWEEN $2 AND $3`,
    [session.userId, fecha_inicio, fecha_fin]
  );

  const gastos = await queryOne<{ total: string }>(
    `SELECT COALESCE(SUM(monto), 0)::text AS total FROM movimientos_bancarios
     WHERE user_id = $1 AND tipo = 'debito' AND fecha_operacion BETWEEN $2 AND $3`,
    [session.userId, fecha_inicio, fecha_fin]
  );

  const facturas = await queryOne<{ emitidas: string; cobradas: string }>(
    `SELECT
       COUNT(*) FILTER (WHERE tipo = 'venta')::text AS emitidas,
       COUNT(*) FILTER (WHERE estado = 'cobrada')::text AS cobradas
     FROM facturas WHERE user_id = $1 AND fecha_emision BETWEEN $2 AND $3`,
    [session.userId, fecha_inicio, fecha_fin]
  );

  const ingresosNum = parseFloat(ingresos?.total ?? '0');
  const gastosNum   = parseFloat(gastos?.total ?? '0');
  const utilidad    = ingresosNum - gastosNum;

  const [cierre] = await query<{ id: number }>(
    `INSERT INTO periodo_fiscal_cierres
     (user_id, periodo, fecha_inicio, fecha_fin, ingresos_total, gastos_total, utilidad_neta,
      facturas_emitidas, facturas_cobradas, cerrado_por, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING id`,
    [
      session.userId, periodo, fecha_inicio, fecha_fin,
      ingresosNum, gastosNum, utilidad,
      parseInt(facturas?.emitidas ?? '0'),
      parseInt(facturas?.cobradas ?? '0'),
      cerrado_por ?? null, notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'CIERRE_PERIODO_FISCAL',
    categoria: 'contabilidad',
    descripcion: `Período fiscal cerrado: ${periodo} — Utilidad: Bs. ${utilidad.toFixed(2)}`,
    entidadTipo: 'periodo_cierre',
    entidadId: cierre.id,
    metadata: { periodo, ingresosNum, gastosNum, utilidad },
  });

  return NextResponse.json({
    success: true,
    cierre: {
      id: cierre.id, periodo,
      ingresos: ingresosNum, gastos: gastosNum, utilidad,
      facturas_emitidas: parseInt(facturas?.emitidas ?? '0'),
      facturas_cobradas: parseInt(facturas?.cobradas ?? '0'),
    }
  });
}
