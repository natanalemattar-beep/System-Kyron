import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { sendNotificationEmail } from '@/lib/alert-email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const soloNoLeidas = searchParams.get('no_leidas') === 'true';
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  const conditions: string[] = ['user_id = $1'];
  const params: unknown[] = [session.userId];
  let i = 2;

  if (soloNoLeidas) { conditions.push(`leida = false`); }
  params.push(limit);

  const notificaciones = await query(
    `SELECT id, tipo, titulo, mensaje, leida, accion_url, metadata, created_at
     FROM notificaciones
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC
     LIMIT $${i}`,
    params
  );

  const [{ total_no_leidas }] = await query<{ total_no_leidas: string }>(
    `SELECT COUNT(*)::text AS total_no_leidas
     FROM notificaciones WHERE user_id = $1 AND leida = false`,
    [session.userId]
  );

  return NextResponse.json({
    notificaciones,
    total_no_leidas: parseInt(total_no_leidas ?? '0', 10),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { id, todas } = body;

  if (todas) {
    await query(
      `UPDATE notificaciones SET leida = true WHERE user_id = $1 AND leida = false`,
      [session.userId]
    );
    return NextResponse.json({ success: true, message: 'Todas las notificaciones marcadas como leídas' });
  }

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const existing = await queryOne(
    `SELECT id FROM notificaciones WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );
  if (!existing) return NextResponse.json({ error: 'Notificación no encontrada' }, { status: 404 });

  await query(
    `UPDATE notificaciones SET leida = true WHERE id = $1 AND user_id = $2`,
    [id, session.userId]
  );

  return NextResponse.json({ success: true });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { tipo, titulo, mensaje, accion_url, metadata } = body;

  if (!tipo || !titulo || !mensaje) {
    return NextResponse.json({ error: 'Tipo, título y mensaje son requeridos' }, { status: 400 });
  }

  const [notif] = await query(
    `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, accion_url, metadata)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id, tipo, titulo, leida, created_at`,
    [
      session.userId,
      tipo,
      titulo,
      mensaje,
      accion_url ?? null,
      metadata ? JSON.stringify(metadata) : null,
    ]
  );

  sendNotificationEmail(session.userId, { tipo, titulo, mensaje, accion_url }).catch(() => {});
  sendWhatsAppNotification(session.userId, { tipo, titulo, mensaje }).catch(() => {});
  sendSmsNotification(session.userId, { tipo, titulo, mensaje }).catch(() => {});

  return NextResponse.json({ success: true, notificacion: notif });
}
