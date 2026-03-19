import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

async function getOrCreateEcoBalance(userId: number) {
  let balance = await queryOne(
    `SELECT id, balance::text, nivel, total_kg_reciclado::text FROM eco_creditos WHERE user_id = $1`,
    [userId]
  );
  if (!balance) {
    const [row] = await query(
      `INSERT INTO eco_creditos (user_id, balance, nivel, total_kg_reciclado)
       VALUES ($1, 0, 'bronce', 0)
       RETURNING id, balance::text, nivel, total_kg_reciclado::text`,
      [userId]
    );
    balance = row;
  }
  return balance as { id: number; balance: string; nivel: string; total_kg_reciclado: string };
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const balance = await getOrCreateEcoBalance(session.userId);

  const transacciones = await query(
    `SELECT id, tipo_material, peso_kg::text, eco_creditos::text,
            punto_ameru, verificado, fecha_reciclaje
     FROM eco_transacciones
     WHERE user_id = $1
     ORDER BY fecha_reciclaje DESC
     LIMIT 50`,
    [session.userId]
  );

  return NextResponse.json({ balance, transacciones });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { tipo_material, peso_kg, punto_ameru, codigo_qr } = body;

  if (!tipo_material || peso_kg === undefined) {
    return NextResponse.json({ error: 'Tipo de material y peso son requeridos' }, { status: 400 });
  }

  const peso     = parseFloat(peso_kg);
  const creditos = Math.round(peso * 20 * 100) / 100;

  const [tx] = await query(
    `INSERT INTO eco_transacciones
     (user_id, tipo_material, peso_kg, eco_creditos, punto_ameru, codigo_qr, verificado)
     VALUES ($1,$2,$3,$4,$5,$6, true)
     RETURNING id, tipo_material, peso_kg::text, eco_creditos::text, fecha_reciclaje`,
    [session.userId, tipo_material, peso, creditos, punto_ameru ?? null, codigo_qr ?? null]
  );

  await getOrCreateEcoBalance(session.userId);
  await query(
    `UPDATE eco_creditos
     SET balance            = balance + $1,
         total_kg_reciclado = total_kg_reciclado + $2,
         nivel = CASE
           WHEN balance + $1 >= 50000 THEN 'platino'
           WHEN balance + $1 >= 20000 THEN 'oro'
           WHEN balance + $1 >= 5000  THEN 'plata'
           ELSE 'bronce'
         END,
         updated_at = NOW()
     WHERE user_id = $3`,
    [creditos, peso, session.userId]
  );

  await logActivity({
    userId: session.userId,
    evento: 'ECO_RECICLAJE',
    categoria: 'eco',
    descripcion: `Reciclaje registrado: ${tipo_material} ${peso} kg → +${creditos} ECR`,
    entidadTipo: 'eco_transaccion',
    entidadId: (tx as { id: number }).id,
    metadata: { tipo_material, peso_kg: peso, eco_creditos: creditos, punto_ameru: punto_ameru ?? null },
  });

  return NextResponse.json({ success: true, transaccion: tx, creditos_ganados: creditos });
}
