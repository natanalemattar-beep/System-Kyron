import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { isValidEmail } from '@/lib/input-sanitizer';

const MAX_LENGTH = 5000;

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`contact:${ip}`, 5, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const body = await req.json();
    const { nombre, email, telefono, empresa, asunto, mensaje } = body;

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (typeof nombre !== 'string' || nombre.length > 200 ||
        typeof asunto !== 'string' || asunto.length > 200 ||
        typeof mensaje !== 'string' || mensaje.length > MAX_LENGTH) {
      return NextResponse.json({ error: 'Campos exceden longitud máxima' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 });
    }

    await query(
      `INSERT INTO contact_messages (nombre, email, telefono, empresa, asunto, mensaje)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre.trim(), email.toLowerCase().trim(), telefono || null, empresa || null, asunto.trim(), mensaje.trim()]
    );

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Error al procesar el mensaje' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Método no disponible' }, { status: 405 });
}
