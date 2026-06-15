import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { generateCode, storeCode, normalizePhone } from '@/lib/verification-codes';
import { createLoginChallenge } from '@/lib/login-challenge';
import { decryptIfEncrypted } from '@/lib/encryption';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`login-phone:${ip}`, 5, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    const { phone, method } = await req.json();
    if (!phone) {
      return NextResponse.json({ error: 'Número de teléfono requerido' }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);
    const user = await queryOne<{ id: number; email: string; nombre: string; telefono: string; telefono_verificado: boolean }>(
      `SELECT id, email, nombre, telefono, COALESCE(telefono_verificado, false) as telefono_verificado
       FROM users WHERE telefono = $1`,
      [normalizedPhone]
    );

    if (!user) {
      return NextResponse.json({ error: 'No hay cuenta asociada a este número' }, { status: 404 });
    }

    if (!user.telefono_verificado) {
      return NextResponse.json({ error: 'Este teléfono no está verificado en tu cuenta. Usa el correo electrónico.' }, { status: 403 });
    }

    const code = generateCode();
    const tipo = method === 'whatsapp' ? 'whatsapp' : 'sms';
    await storeCode(normalizedPhone, code, 'verification', tipo);

    const challengeToken = createLoginChallenge(user.email, user.id);
    const maskedPhone = '****' + normalizedPhone.slice(-4);

    console.log(`[login-phone] Código ${code} enviado (simulado) a ${normalizedPhone} vía ${tipo}`);

    const isDev = process.env.NODE_ENV === 'development' || !!process.env.NEXT_PUBLIC_DEV_CODE;

    return NextResponse.json({
      requiresVerification: true,
      maskedPhone,
      challengeToken,
      email: user.email,
      nombre: user.nombre,
      ...(isDev ? { devCode: code } : {}),
    });
  } catch (err) {
    console.error('[login-phone] error:', err);
    return NextResponse.json({ error: 'Error al procesar solicitud telefónica' }, { status: 500 });
  }
}
