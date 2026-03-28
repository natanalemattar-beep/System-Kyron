import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const estado = searchParams.get('estado');
    const tipo   = searchParams.get('tipo');
    const rawLimit = parseInt(searchParams.get('limit') ?? '20', 10);
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 500) : 20;

    const conditions: string[] = ['n.user_id = $1'];
    const params: unknown[] = [session.userId];
    let i = 2;

    if (estado) { conditions.push(`n.estado = $${i++}`); params.push(estado); }
    if (tipo)   { conditions.push(`n.tipo = $${i++}`);   params.push(tipo); }
    params.push(limit);

    const nominas = await query(
      `SELECT n.id, n.periodo, n.fecha_inicio, n.fecha_fin, n.fecha_pago, n.tipo,
              n.total_asignaciones::text, n.total_deducciones::text, n.total_neto::text,
              n.estado, n.notas, n.created_at,
              COUNT(ni.id)::text AS total_empleados
       FROM nominas n
       LEFT JOIN nomina_items ni ON ni.nomina_id = n.id
       WHERE ${conditions.join(' AND ')}
       GROUP BY n.id
       ORDER BY n.created_at DESC
       LIMIT $${i}`,
      params
    );

    return NextResponse.json({ nominas });
  } catch (err) {
    console.error('[nomina] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener nóminas' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      periodo, fecha_inicio, fecha_fin, fecha_pago, tipo,
      total_asignaciones, total_deducciones, total_neto,
      estado, notas, items
    } = body;

    if (!periodo || !fecha_inicio || !fecha_fin) {
      return NextResponse.json({ error: 'Período, fecha inicio y fecha fin son requeridos' }, { status: 400 });
    }

    const asignaciones = parseFloat(total_asignaciones ?? '0');
    const deducciones = parseFloat(total_deducciones ?? '0');
    const neto = parseFloat(total_neto ?? '0');
    if (!Number.isFinite(asignaciones) || !Number.isFinite(deducciones) || !Number.isFinite(neto)) {
      return NextResponse.json({ error: 'Montos de nómina inválidos' }, { status: 400 });
    }

    const [nomina] = await query<{ id: number; periodo: string }>(
      `INSERT INTO nominas
       (user_id, periodo, fecha_inicio, fecha_fin, fecha_pago, tipo,
        total_asignaciones, total_deducciones, total_neto, estado, notas)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, periodo`,
      [
        session.userId,
        periodo,
        fecha_inicio,
        fecha_fin,
        fecha_pago ?? null,
        tipo ?? 'quincenal',
        asignaciones,
        deducciones,
        neto,
        estado ?? 'pendiente',
        notas ?? null,
      ]
    );

    if (Array.isArray(items) && items.length > 0) {
      for (const item of items as Record<string, unknown>[]) {
        if (!item.empleado_id) continue;
        await query(
          `INSERT INTO nomina_items
           (nomina_id, empleado_id, salario_base, dias_trabajados, horas_extras,
            bono_productividad, cestaticket, utilidades, vacaciones,
            total_asignaciones, sso, lph, faov, rpe, islr_retenido,
            otros_descuentos, total_deducciones, neto)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
          [
            nomina.id,
            item.empleado_id,
            parseFloat((item.salario_base as string) ?? '0') || 0,
            parseFloat((item.dias_trabajados as string) ?? '30') || 30,
            parseFloat((item.horas_extras as string) ?? '0') || 0,
            parseFloat((item.bono_productividad as string) ?? '0') || 0,
            parseFloat((item.cestaticket as string) ?? '0') || 0,
            parseFloat((item.utilidades as string) ?? '0') || 0,
            parseFloat((item.vacaciones as string) ?? '0') || 0,
            parseFloat((item.total_asignaciones as string) ?? '0') || 0,
            parseFloat((item.sso as string) ?? '0') || 0,
            parseFloat((item.lph as string) ?? '0') || 0,
            parseFloat((item.faov as string) ?? '0') || 0,
            parseFloat((item.rpe as string) ?? '0') || 0,
            parseFloat((item.islr_retenido as string) ?? '0') || 0,
            parseFloat((item.otros_descuentos as string) ?? '0') || 0,
            parseFloat((item.total_deducciones as string) ?? '0') || 0,
            parseFloat((item.neto as string) ?? '0') || 0,
          ]
        );
      }
    }

    await logActivity({
      userId: session.userId,
      evento: 'NOMINA_CREADA',
      categoria: 'nomina',
      descripcion: `Nómina creada: ${nomina.periodo} — Tipo: ${tipo ?? 'quincenal'}`,
      entidadTipo: 'nomina',
      entidadId: nomina.id,
      metadata: { periodo, tipo: tipo ?? 'quincenal', estado: estado ?? 'pendiente' },
    });

    return NextResponse.json({ success: true, nomina });
  } catch (err) {
    console.error('[nomina] POST error:', err);
    return NextResponse.json({ error: 'Error al crear nómina' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, estado } = body;

    if (!id || !estado) {
      return NextResponse.json({ error: 'ID y estado son requeridos' }, { status: 400 });
    }

    const [nomina] = await query(
      `UPDATE nominas SET estado = $1 WHERE id = $2 AND user_id = $3 RETURNING id, periodo, estado`,
      [estado, id, session.userId]
    );

    if (!nomina) {
      return NextResponse.json({ error: 'Nómina no encontrada' }, { status: 404 });
    }

    await logActivity({
      userId: session.userId,
      evento: 'NOMINA_ACTUALIZADA',
      categoria: 'nomina',
      descripcion: `Nómina ${(nomina as { periodo: string }).periodo} → estado: ${estado}`,
      entidadTipo: 'nomina',
      entidadId: id,
    });

    return NextResponse.json({ success: true, nomina });
  } catch (err) {
    console.error('[nomina] PATCH error:', err);
    return NextResponse.json({ error: 'Error al actualizar nómina' }, { status: 500 });
  }
}
