import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const permisos = await query(
    `SELECT id, tipo, nombre_permiso, numero_permiso, organismo,
            fecha_emision, fecha_vencimiento, estado, descripcion, responsable,
            costo_tramite::text, moneda_costo, alertar_dias_antes, notas, created_at,
            CASE WHEN fecha_vencimiento IS NOT NULL
                 THEN (fecha_vencimiento - CURRENT_DATE)
                 ELSE NULL END AS dias_para_vencer
     FROM permisos_legales
     WHERE user_id = $1
     ORDER BY estado ASC, fecha_vencimiento ASC NULLS LAST`,
    [session.userId]
  );

  const stats = await query(
    `SELECT
       COUNT(*) FILTER (WHERE estado = 'vigente')::int AS vigentes,
       COUNT(*) FILTER (WHERE estado = 'vencido')::int AS vencidos,
       COUNT(*) FILTER (WHERE estado = 'en_tramite')::int AS en_tramite,
       COUNT(*) FILTER (WHERE fecha_vencimiento IS NOT NULL
                          AND fecha_vencimiento <= CURRENT_DATE + INTERVAL '30 days'
                          AND estado = 'vigente')::int AS por_vencer
     FROM permisos_legales WHERE user_id = $1`,
    [session.userId]
  );

  return NextResponse.json({ permisos, stats: stats[0] ?? {} });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    tipo, nombre_permiso, numero_permiso, organismo,
    fecha_emision, fecha_vencimiento, estado,
    descripcion, responsable, costo_tramite, moneda_costo,
    alertar_dias_antes, notas
  } = body;

  if (!tipo || !nombre_permiso || !organismo) {
    return NextResponse.json({ error: 'Tipo, nombre del permiso y organismo son requeridos' }, { status: 400 });
  }

  const [permiso] = await query<{ id: number }>(
    `INSERT INTO permisos_legales
     (user_id, tipo, nombre_permiso, numero_permiso, organismo,
      fecha_emision, fecha_vencimiento, estado, descripcion, responsable,
      costo_tramite, moneda_costo, alertar_dias_antes, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING id`,
    [
      session.userId,
      tipo, nombre_permiso, numero_permiso ?? null, organismo,
      fecha_emision ?? null, fecha_vencimiento ?? null,
      estado ?? 'vigente',
      descripcion ?? null, responsable ?? null,
      parseFloat(costo_tramite ?? '0'),
      moneda_costo ?? 'USD',
      parseInt(alertar_dias_antes ?? '30'),
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'NUEVO_PERMISO_LEGAL',
    categoria: 'legal',
    descripcion: `Permiso legal registrado: ${nombre_permiso} — ${organismo}`,
    entidadTipo: 'permiso_legal',
    entidadId: permiso.id,
  });

  return NextResponse.json({ success: true, id: permiso.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado, numero_permiso, fecha_vencimiento } = body;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  const updates: string[] = ['updated_at = NOW()'];
  const params: unknown[] = [];
  let i = 1;

  if (estado)           { updates.push(`estado = $${i++}`);           params.push(estado); }
  if (numero_permiso)   { updates.push(`numero_permiso = $${i++}`);   params.push(numero_permiso); }
  if (fecha_vencimiento){ updates.push(`fecha_vencimiento = $${i++}`);params.push(fecha_vencimiento); }

  params.push(id, session.userId);
  await query(
    `UPDATE permisos_legales SET ${updates.join(', ')} WHERE id = $${i++} AND user_id = $${i++}`,
    params
  );

  return NextResponse.json({ success: true });
}
