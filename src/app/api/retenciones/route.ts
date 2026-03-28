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
    const tipo   = searchParams.get('tipo');
    const rawLimit = parseInt(searchParams.get('limit') ?? '50', 10);
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 200) : 50;

    const conditions: string[] = ['user_id = $1'];
    const params: unknown[] = [session.userId];
    let i = 2;

    if (tipo) { conditions.push(`tipo = $${i++}`); params.push(tipo); }
    params.push(limit);

    const retenciones = await query(
      `SELECT id, tipo, proveedor_rif, proveedor_nombre, fecha_retencion,
              base_imponible::text, porcentaje::text, monto_retenido::text,
              numero_comprobante, factura_ref, periodo, created_at
       FROM retenciones
       WHERE ${conditions.join(' AND ')}
       ORDER BY fecha_retencion DESC
       LIMIT $${i}`,
      params
    );

    return NextResponse.json({ retenciones });
  } catch (err) {
    console.error('[retenciones] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener retenciones' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      tipo, proveedor_rif, proveedor_nombre, fecha_retencion,
      base_imponible, porcentaje, numero_comprobante, factura_ref, periodo
    } = body;

    if (!tipo || !fecha_retencion || base_imponible === undefined) {
      return NextResponse.json({ error: 'Tipo, fecha y base imponible son requeridos' }, { status: 400 });
    }

    const tipoNorm = String(tipo).toLowerCase().trim();
    if (tipoNorm !== 'iva' && tipoNorm !== 'islr') {
      return NextResponse.json({ error: 'Tipo debe ser "iva" o "islr"' }, { status: 400 });
    }

    const base = safeFloat(base_imponible);
    const pct  = safeFloat(porcentaje, tipoNorm === 'iva' ? 75 : 3);
    const monto = base * (pct / 100);

    const [ret] = await query(
      `INSERT INTO retenciones
       (user_id, tipo, proveedor_rif, proveedor_nombre, fecha_retencion,
        base_imponible, porcentaje, monto_retenido, numero_comprobante, factura_ref, periodo)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, tipo, monto_retenido::text, numero_comprobante`,
      [
        session.userId,
        tipoNorm,
        proveedor_rif ?? null,
        proveedor_nombre ?? null,
        fecha_retencion,
        base,
        pct,
        monto,
        numero_comprobante ?? null,
        factura_ref ?? null,
        periodo ?? null,
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'NUEVA_RETENCION',
      categoria: 'contabilidad',
      descripcion: `Retención ${tipo.toUpperCase()} registrada — ${proveedor_nombre ?? proveedor_rif ?? 'Sin proveedor'} · Monto: ${monto}`,
      entidadTipo: 'retencion',
      entidadId: (ret as { id: number }).id,
      metadata: { tipo, base_imponible: base, porcentaje: pct, monto_retenido: monto },
    });

    return NextResponse.json({ success: true, retencion: ret });
  } catch (err) {
    console.error('[retenciones] POST error:', err);
    return NextResponse.json({ error: 'Error al registrar retención' }, { status: 500 });
  }
}
