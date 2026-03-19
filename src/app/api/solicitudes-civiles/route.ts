import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get('tipo');

  const conditions: string[] = ['user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (tipo) { conditions.push(`tipo = $${i++}`); params.push(tipo); }

  const solicitudes = await query(
    `SELECT id, tipo, nombres, acta, folio, tomo, registro_civil,
            ano_evento, estado, notas, created_at, updated_at
     FROM solicitudes_documentos_civiles
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC`,
    params
  );

  return NextResponse.json({ solicitudes });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const {
    tipo, nombres, acta, folio, tomo,
    registro_civil, ano_evento, notas
  } = body;

  if (!tipo || !nombres) {
    return NextResponse.json({ error: 'Tipo y nombres son requeridos' }, { status: 400 });
  }

  const [sol] = await query(
    `INSERT INTO solicitudes_documentos_civiles
     (user_id, tipo, nombres, acta, folio, tomo, registro_civil, ano_evento, notas)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING id, tipo, nombres, estado, created_at`,
    [
      session.userId,
      tipo,
      nombres,
      acta ?? null,
      folio ?? null,
      tomo ?? null,
      registro_civil ?? null,
      ano_evento ? parseInt(ano_evento) : null,
      notas ?? null,
    ]
  );

  await logActivity({
    userId: session.userId,
    evento: 'SOLICITUD_DOCUMENTO_CIVIL',
    categoria: 'documentos',
    descripcion: `Solicitud de ${tipo.replace(/_/g, ' ')}: ${nombres}`,
    entidadTipo: 'solicitud_civil',
    entidadId: (sol as { id: number }).id,
    metadata: { tipo, nombres, acta: acta ?? null },
  });

  return NextResponse.json({ success: true, solicitud: sol });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, estado, notas } = body;

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const [sol] = await query(
    `UPDATE solicitudes_documentos_civiles
     SET estado = COALESCE($1, estado),
         notas  = COALESCE($2, notas),
         updated_at = NOW()
     WHERE id = $3 AND user_id = $4
     RETURNING id, tipo, estado`,
    [estado ?? null, notas ?? null, id, session.userId]
  );

  if (!sol) return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 });

  return NextResponse.json({ success: true, solicitud: sol });
}
