import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';

export const dynamic = 'force-dynamic';

function generateOTP(): string {
  const crypto = require('crypto');
  return crypto.randomInt(100000, 1000000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`send-code:${ip}`, 5, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    const body = await req.json();

    let destino: string;
    let tipo: 'email' | 'sms';

    if (body.destino && body.tipo) {
      destino = body.destino;
      tipo = body.tipo;
    } else if (body.method) {
      tipo = body.method === 'sms' ? 'sms' : 'email';
      destino = tipo === 'email' ? (body.email || '') : (body.phone || '');
    } else {
      return NextResponse.json({ error: 'Destino y tipo son requeridos' }, { status: 400 });
    }

    if (!destino || !tipo) {
      return NextResponse.json({ error: 'Destino y tipo son requeridos' }, { status: 400 });
    }
    if (!['email', 'sms'].includes(tipo)) {
      return NextResponse.json({ error: 'Tipo debe ser "email" o "sms"' }, { status: 400 });
    }

    if (tipo === 'email') {
      destino = sanitizeEmail(destino);
      if (!isValidEmail(destino)) {
        return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
      }
    }

    const recentCheck = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM verification_codes
       WHERE destino = $1 AND created_at > NOW() - INTERVAL '1 minute'`,
      [destino]
    );
    if (parseInt(recentCheck[0]?.count ?? '0') >= 3) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera 1 minuto antes de solicitar otro código.' },
        { status: 429 }
      );
    }

    const codigo = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO verification_codes (destino, tipo, codigo, expires_at) VALUES ($1, $2, $3, $4)`,
      [destino, tipo, codigo, expiresAt]
    );

    if (tipo === 'email') {
      const html = buildKyronEmailTemplate({
        title: 'Verificación de Correo Electrónico',
        body: 'Usa el siguiente código para verificar tu cuenta en System Kyron.',
        code: codigo,
        footer: 'Si no solicitaste este código, ignora este correo.',
      });

      const result = await sendEmail({
        to: destino,
        subject: `${codigo} — Código de Verificación · System Kyron`,
        html,
        module: 'auth',
      });

      if (!result.success) {
        console.error(`[send-code] Email failed via all providers:`, result.error);
        return NextResponse.json(
          { error: 'No se pudo enviar el correo. Verifica tu dirección e intenta de nuevo.' },
          { status: 502 }
        );
      }
    } else {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;

      if (accountSid && authToken && fromNumber) {
        try {
          const twilio = (await import('twilio')).default;
          const client = twilio(accountSid, authToken);
          await client.messages.create({
            body: `System Kyron: Tu código de verificación es ${codigo}. Válido por 10 minutos.`,
            from: fromNumber,
            to: destino,
          });
        } catch (smsErr) {
          console.error('[send-code] SMS sending failed:', smsErr);
          return NextResponse.json(
            { error: 'No se pudo enviar el SMS. Verifica el número e intenta de nuevo.' },
            { status: 502 }
          );
        }
      } else {
        console.error(`[send-code] Twilio not configured. Cannot send SMS.`);
        return NextResponse.json(
          { error: 'El envío por SMS no está disponible. Usa verificación por correo electrónico.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: tipo === 'email'
        ? `Código enviado a ${destino}`
        : `Código enviado al número ${destino}`,
    });
  } catch (err) {
    console.error('[send-code] error:', err);
    return NextResponse.json({ error: 'Error al enviar código de verificación. Intenta de nuevo.' }, { status: 500 });
  }
}
