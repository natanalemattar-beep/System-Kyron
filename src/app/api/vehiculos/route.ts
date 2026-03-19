import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const vehiculos = await query(
    `SELECT v.id, v.placa, v.marca, v.modelo, v.ano, v.color, v.tipo_vehiculo,
            v.vin, v.asignado_a, v.cedula_asignado, v.departamento,
            v.kilometraje, v.estado, v.seguro_empresa, v.poliza_numero,
            v.poliza_vencimiento, v.intt_vencimiento, v.created_at,
            (SELECT COUNT(*) FROM mantenimientos_vehiculo WHERE vehiculo_id = v.id)::int AS num_mantenimientos,
            (SELECT fecha FROM mantenimientos_vehiculo WHERE vehiculo_id = v.id ORDER BY fecha DESC LIMIT 1) AS ultimo_mantenimiento
     FROM vehiculos_flota v
     WHERE v.user_id = $1
     ORDER BY v.estado ASC, v.marca ASC`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'activo')::int AS activos,
       COUNT(*) FILTER (WHERE estado = 'mantenimiento')::int AS en_mantenimiento,
       COUNT(*) FILTER (WHERE intt_vencimiento < CURRENT_DATE + INTERVAL '30 days' AND estado != 'vendido')::int AS por_vencer_intt,
       COUNT(*) FILTER (WHERE poliza_vencimiento < CURRENT_DATE + INTERVAL '30 days' AND estado != 'vendido')::int AS por_vencer_poliza
     FROM vehiculos_flota WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ vehiculos, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    placa, marca, modelo, ano, color, tipo_vehiculo,
    vin, numero_motor, asignado_a, cedula_asignado, departamento,
    kilometraje, seguro_empresa, poliza_numero, poliza_vencimiento, intt_vencimiento
  } = body;

  if (!placa || !marca || !modelo || !ano) {
    return NextResponse.json({ error: 'Placa, marca, modelo y año son requeridos' }, { status: 400 });
  }

  const [vehiculo] = await query<{ id: number }>(
    `INSERT INTO vehiculos_flota (user_id, placa, marca, modelo, ano, color, tipo_vehiculo,
                                   vin, numero_motor, asignado_a, cedula_asignado, departamento,
                                   kilometraje, seguro_empresa, poliza_numero, poliza_vencimiento, intt_vencimiento)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     RETURNING id`,
    [
      session.userId,
      placa.toUpperCase(), marca, modelo,
      parseInt(ano), color ?? null,
      tipo_vehiculo ?? 'sedan',
      vin ?? null, numero_motor ?? null,
      asignado_a ?? null, cedula_asignado ?? null,
      departamento ?? null,
      parseInt(kilometraje ?? '0'),
      seguro_empresa ?? null, poliza_numero ?? null,
      poliza_vencimiento ?? null, intt_vencimiento ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_VEHICULO',
    categoria: 'sistema',
    descripcion: `Vehículo registrado: ${marca} ${modelo} — Placa: ${placa.toUpperCase()}`,
    entidadTipo: 'vehiculo',
    entidadId: vehiculo.id,
  });

  return NextResponse.json({ success: true, id: vehiculo.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado, kilometraje, asignado_a, departamento } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  const updates: string[] = ['updated_at = NOW()'];
  const params: unknown[] = [];
  let i = 1;

  if (estado)       { updates.push(`estado = $${i++}`);       params.push(estado); }
  if (kilometraje)  { updates.push(`kilometraje = $${i++}`);  params.push(parseInt(kilometraje)); }
  if (asignado_a !== undefined) { updates.push(`asignado_a = $${i++}`); params.push(asignado_a); }
  if (departamento !== undefined) { updates.push(`departamento = $${i++}`); params.push(departamento); }

  params.push(id, session.userId);
  await query(
    `UPDATE vehiculos_flota SET ${updates.join(', ')} WHERE id = $${i++} AND user_id = $${i++}`,
    params
  );

  return NextResponse.json({ success: true });
}
