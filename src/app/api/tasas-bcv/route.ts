import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fecha = searchParams.get('fecha');
  const limit = parseInt(searchParams.get('limit') ?? '30', 10);

  if (fecha) {
    const tasa = await queryOne(
      `SELECT id, fecha, tasa_usd_ves::text, tasa_eur_ves::text,
              tasa_cop_ves::text, tasa_usdt_ves::text, fuente, created_at
       FROM tasas_bcv WHERE fecha = $1`,
      [fecha]
    );
    return NextResponse.json({ tasa });
  }

  const tasas = await query(
    `SELECT id, fecha, tasa_usd_ves::text, tasa_eur_ves::text,
            tasa_cop_ves::text, tasa_usdt_ves::text, fuente, created_at
     FROM tasas_bcv
     ORDER BY fecha DESC
     LIMIT $1`,
    [limit]
  );

  const ultima = tasas[0] ?? null;
  return NextResponse.json({ tasas, ultima });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fecha, tasa_usd_ves, tasa_eur_ves, tasa_cop_ves, tasa_usdt_ves, fuente } = body;

  if (!fecha || !tasa_usd_ves) {
    return NextResponse.json({ error: 'Fecha y tasa USD/VES son requeridas' }, { status: 400 });
  }

  const [tasa] = await query(
    `INSERT INTO tasas_bcv (fecha, tasa_usd_ves, tasa_eur_ves, tasa_cop_ves, tasa_usdt_ves, fuente)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (fecha) DO UPDATE
       SET tasa_usd_ves  = EXCLUDED.tasa_usd_ves,
           tasa_eur_ves  = EXCLUDED.tasa_eur_ves,
           tasa_cop_ves  = EXCLUDED.tasa_cop_ves,
           tasa_usdt_ves = EXCLUDED.tasa_usdt_ves,
           fuente        = EXCLUDED.fuente
     RETURNING id, fecha, tasa_usd_ves::text`,
    [
      fecha,
      parseFloat(tasa_usd_ves),
      tasa_eur_ves ? parseFloat(tasa_eur_ves) : null,
      tasa_cop_ves ? parseFloat(tasa_cop_ves) : null,
      tasa_usdt_ves ? parseFloat(tasa_usdt_ves) : null,
      fuente ?? 'BCV',
    ]
  );

  return NextResponse.json({ success: true, tasa });
}
