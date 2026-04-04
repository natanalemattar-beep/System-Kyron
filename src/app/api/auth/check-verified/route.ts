import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`check-verified:${ip}`, 30, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    const destino = req.nextUrl.searchParams.get('destino');
    if (!destino) {
      return NextResponse.json({ error: 'Destino requerido' }, { status: 400 });
    }

    if (!destino.includes('@') || !isValidEmail(destino)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    const normalized = sanitizeEmail(destino);

    const record = await queryOne<{ id: number }>(
      `SELECT id FROM verification_codes
       WHERE destino = $1 AND usado = true AND tipo = 'email' AND proposito = 'verification'
       AND expires_at > NOW() - INTERVAL '30 minutes'
       ORDER BY created_at DESC LIMIT 1`,
      [normalized]
    );

    return NextResponse.json({ verified: !!record });
  } catch (err) {
    console.error('[check-verified] error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
