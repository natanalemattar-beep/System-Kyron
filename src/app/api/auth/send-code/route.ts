import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';

export const dynamic = 'force-dynamic';

async function getTwilioCredentials(): Promise<{ accountSid: string; apiKeySecret: string; phoneNumber: string }> {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    return {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      apiKeySecret: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    };
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!hostname || !xReplitToken) {
    throw new Error('Twilio not configured: no connector env vars');
  }

  const res = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=twilio',
    { headers: { 'Accept': 'application/json', 'X-Replit-Token': xReplitToken } }
  );

  if (!res.ok) {
    throw new Error(`Twilio not connected: connector returned ${res.status}`);
  }

  const data = await res.json();
  const conn = data.items?.[0];
  const settings = conn?.settings;

  if (!settings?.account_sid || !settings?.phone_number) {
    throw new Error('Twilio not configured: missing credentials in connector');
  }

  const authSecret = settings.auth_token || settings.api_key || settings.api_key_secret;
  if (!authSecret) {
    throw new Error('Twilio not configured: no auth credentials in connector');
  }

  return {
    accountSid: settings.account_sid,
    apiKeySecret: authSecret,
    phoneNumber: settings.phone_number,
  };
}

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
      try {
        const twilioCredentials = await getTwilioCredentials();
        const twilio = (await import('twilio')).default;
        const client = twilio(twilioCredentials.accountSid, twilioCredentials.apiKeySecret);
        await client.messages.create({
          body: `System Kyron: Tu código de verificación es ${codigo}. Válido por 10 minutos.`,
          from: twilioCredentials.phoneNumber,
          to: destino,
        });
      } catch (smsErr) {
        console.error('[send-code] SMS sending failed:', smsErr);
        const errorMsg = String(smsErr);
        if (errorMsg.includes('not configured') || errorMsg.includes('not connected')) {
          return NextResponse.json(
            { error: 'El envío por SMS no está disponible. Usa verificación por correo electrónico.' },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: 'No se pudo enviar el SMS. Verifica el número e intenta de nuevo.' },
          { status: 502 }
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
