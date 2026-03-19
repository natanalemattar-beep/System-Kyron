import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, empresa, asunto, mensaje } = body;

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    await query(
      `INSERT INTO contact_messages (nombre, email, telefono, empresa, asunto, mensaje)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, email, telefono || null, empresa || null, asunto, mensaje]
    );

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Error al procesar el mensaje' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await query(
      `SELECT id, nombre, email, empresa, asunto, leido, created_at
       FROM contact_messages ORDER BY created_at DESC LIMIT 50`
    );
    return NextResponse.json({ messages: result });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
