import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

function safeFloat(val: unknown, fallback = 0): number {
  const n = parseFloat(String(val ?? fallback));
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const impuesto = searchParams.get('impuesto') ?? 'iva';
    const rawLimit = parseInt(searchParams.get('limit') ?? '20', 10);
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 200) : 20;

    if (impuesto === 'islr') {
      const rows = await query(
        `SELECT id, ejercicio_fiscal, fecha_declaracion,
                enriquecimiento_neto::text, impuesto_causado::text,
                anticipo_pagado::text, impuesto_a_pagar::text,
                estado, numero_declaracion, notas, created_at
         FROM declaraciones_islr
         WHERE user_id = $1
         ORDER BY created_at DESC LIMIT $2`,
        [session.userId, limit]
      );
      return NextResponse.json({ declaraciones: rows, tipo: 'islr' });
    }

    const rows = await query(
      `SELECT id, periodo, fecha_inicio, fecha_fin, fecha_declaracion,
              base_imponible::text, iva_debito::text, iva_credito::text,
              iva_neto::text, estado, numero_forma, notas, created_at
       FROM declaraciones_iva
       WHERE user_id = $1
       ORDER BY created_at DESC LIMIT $2`,
      [session.userId, limit]
    );
    return NextResponse.json({ declaraciones: rows, tipo: 'iva' });
  } catch (err) {
    console.error('[declaraciones] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener declaraciones' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { impuesto } = body;

    if (impuesto === 'islr') {
      const {
        ejercicio_fiscal, fecha_declaracion, enriquecimiento_neto,
        impuesto_causado, anticipo_pagado, impuesto_a_pagar,
        estado, numero_declaracion, notas
      } = body;

      if (!ejercicio_fiscal) {
        return NextResponse.json({ error: 'Ejercicio fiscal requerido' }, { status: 400 });
      }

      const [decl] = await query(
        `INSERT INTO declaraciones_islr
         (user_id, ejercicio_fiscal, fecha_declaracion, enriquecimiento_neto,
          impuesto_causado, anticipo_pagado, impuesto_a_pagar, estado, numero_declaracion, notas)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING id, ejercicio_fiscal, estado`,
        [
          session.userId,
          ejercicio_fiscal,
          fecha_declaracion ?? null,
          safeFloat(enriquecimiento_neto),
          safeFloat(impuesto_causado),
          safeFloat(anticipo_pagado),
          safeFloat(impuesto_a_pagar),
          estado ?? 'pendiente',
          numero_declaracion ?? null,
          notas ?? null,
        ]
      );

      await logActivity({
        userId: session.userId,
        evento: 'DECLARACION_ISLR',
        categoria: 'contabilidad',
        descripcion: `Declaración ISLR: ejercicio ${ejercicio_fiscal}`,
        entidadTipo: 'declaracion_islr',
        entidadId: (decl as { id: number }).id,
        metadata: { ejercicio_fiscal, estado: estado ?? 'pendiente' },
      });

      return NextResponse.json({ success: true, declaracion: decl });
    }

    const {
      periodo, fecha_inicio, fecha_fin, fecha_declaracion,
      base_imponible, iva_debito, iva_credito,
      estado, numero_forma, notas
    } = body;

    if (!periodo || !fecha_inicio || !fecha_fin) {
      return NextResponse.json({ error: 'Período y fechas son requeridos' }, { status: 400 });
    }

    const debitoNum  = safeFloat(iva_debito);
    const creditoNum = safeFloat(iva_credito);
    const netoNum    = debitoNum - creditoNum;

    const [decl] = await query(
      `INSERT INTO declaraciones_iva
       (user_id, periodo, fecha_inicio, fecha_fin, fecha_declaracion,
        base_imponible, iva_debito, iva_credito, iva_neto, estado, numero_forma, notas)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id, periodo, estado`,
      [
        session.userId,
        periodo,
        fecha_inicio,
        fecha_fin,
        fecha_declaracion ?? null,
        safeFloat(base_imponible),
        debitoNum,
        creditoNum,
        netoNum,
        estado ?? 'pendiente',
        numero_forma ?? null,
        notas ?? null,
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'DECLARACION_IVA',
      categoria: 'contabilidad',
      descripcion: `Declaración IVA: período ${periodo} — Neto: ${netoNum}`,
      entidadTipo: 'declaracion_iva',
      entidadId: (decl as { id: number }).id,
      metadata: { periodo, estado: estado ?? 'pendiente', iva_neto: netoNum },
    });

    return NextResponse.json({ success: true, declaracion: decl });
  } catch (err) {
    console.error('[declaraciones] POST error:', err);
    return NextResponse.json({ error: 'Error al registrar declaración' }, { status: 500 });
  }
}
