import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { verifyLoginChallenge } from '@/lib/login-challenge';
import { sendWhatsAppMessage } from '@/lib/whatsapp-service';
import { generateMagicToken, storeMagicToken } from '@/lib/verification-codes';

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
    let tipo: 'email' | 'sms' | 'whatsapp';

    if (body.destino && body.tipo) {
      destino = body.destino;
      tipo = body.tipo;
    } else if (body.method) {
      if (body.method === 'whatsapp') {
        tipo = 'whatsapp';
        destino = body.phone || '';
      } else if (body.method === 'sms') {
        tipo = 'sms';
        destino = body.phone || '';
      } else {
        tipo = 'email';
        destino = body.email || '';
      }
    } else {
      return NextResponse.json({ error: 'Destino y tipo son requeridos' }, { status: 400 });
    }

    if (!destino || !tipo) {
      return NextResponse.json({ error: 'Destino y tipo son requeridos' }, { status: 400 });
    }
    if (!['email', 'sms', 'whatsapp'].includes(tipo)) {
      return NextResponse.json({ error: 'Tipo debe ser "email", "sms" o "whatsapp"' }, { status: 400 });
    }

    if ((tipo === 'sms' || tipo === 'whatsapp') && body.challengeToken) {
      const challenge = verifyLoginChallenge(body.challengeToken, destino);
      if (!challenge.valid) {
        return NextResponse.json(
          { error: 'Sesión de verificación expirada. Inicia sesión nuevamente.' },
          { status: 403 }
        );
      }
    }

    if (tipo === 'email') {
      destino = sanitizeEmail(destino);
      if (!isValidEmail(destino)) {
        return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
      }

      const [userConfig, recentCheck] = await Promise.all([
        query<{ email_verificacion: string | null }>(
          `SELECT cu.email_verificacion FROM configuracion_usuario cu
           JOIN users u ON u.id = cu.user_id
           WHERE u.email = $1`,
          [destino]
        ),
        query<{ count: string }>(
          `SELECT COUNT(*) as count FROM verification_codes
           WHERE destino = $1 AND created_at > NOW() - INTERVAL '1 minute'`,
          [destino]
        ),
      ]);

      const originalEmail = destino;
      if (userConfig[0]?.email_verificacion) {
        destino = userConfig[0].email_verificacion;
      }

      if (parseInt(recentCheck[0]?.count ?? '0') >= 3) {
        return NextResponse.json(
          { error: 'Demasiados intentos. Espera 1 minuto antes de solicitar otro código.' },
          { status: 429 }
        );
      }

      const codigo = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      const [, user] = await Promise.all([
        query(
          `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito) VALUES ($1, $2, $3, $4, 'verification')`,
          [destino, tipo, codigo, expiresAt]
        ),
        queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [originalEmail.toLowerCase()]),
      ]);

      const token = generateMagicToken();
      const baseUrl = process.env.REPLIT_DEPLOYMENT_URL
        ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
        : process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : (process.env.NEXT_PUBLIC_APP_URL || 'https://system-kyron.replit.app');
      const magicLink = `${baseUrl}/es/verify-link/${token}`;
      storeMagicToken(destino, token, user?.id).catch(() => {});

      const html = buildKyronEmailTemplate({
        title: 'Verificación de Identidad',
        body: 'Verifica tu identidad haciendo clic en el botón o ingresando el código de verificación.',
        code: codigo,
        magicLink,
        footer: 'Si no solicitaste este código, ignora este correo. El enlace y el código expiran en 10 minutos.',
      });

      const emailPromise = sendEmail({
        to: destino,
        subject: `${codigo} — Verificación de Identidad · System Kyron`,
        html,
        module: 'auth',
        purpose: 'verification',
      });

      const isDev = !process.env.REPLIT_DEPLOYMENT_URL;

      const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000));
      const result = await Promise.race([emailPromise, timeout]);

      if (result === null) {
        if (isDev) {
          console.log(`[send-code][DEV] Código (timeout): ${codigo}`);
          return NextResponse.json({
            success: true,
            message: 'Código generado (modo desarrollo)',
            channel: tipo,
            destination: destino,
            expiresIn: 600,
            devCode: codigo,
            devMessage: 'Email no disponible. Código mostrado en pantalla (solo desarrollo).',
          });
        }
        return NextResponse.json({
          success: true,
          message: 'Código de verificación enviado a tu correo electrónico',
          channel: tipo,
          destination: destino,
          expiresIn: 600,
        });
      }

      if (!result.success) {
        console.error(`[send-code] Email failed via all providers:`, result.error);
        if (isDev) {
          console.log(`[send-code][DEV] Código de verificación para ${destino}: ${codigo}`);
          return NextResponse.json({
            success: true,
            message: 'Código generado (modo desarrollo)',
            channel: tipo,
            destination: destino,
            expiresIn: 600,
            devCode: codigo,
            devMessage: 'Email no disponible. Código mostrado en pantalla (solo desarrollo).',
          });
        }
        return NextResponse.json(
          { error: 'No se pudo enviar el correo. Verifica tu dirección e intenta de nuevo.' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Código de verificación enviado a tu correo electrónico',
        channel: tipo,
        destination: destino,
        expiresIn: 600,
      });
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
      `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito) VALUES ($1, $2, $3, $4, 'verification')`,
      [destino, tipo, codigo, expiresAt]
    );

    try {
      let phoneNumber = destino;

      if (destino.includes('@')) {
        const userPhone = await query<{ telefono: string | null }>(
          `SELECT telefono FROM users WHERE email = $1`,
          [destino]
        );
        if (!userPhone[0]?.telefono) {
          return NextResponse.json(
            { error: 'No tienes un número de teléfono registrado. Usa verificación por correo.' },
            { status: 400 }
          );
        }
        phoneNumber = userPhone[0].telefono;
      }

      let normalized = phoneNumber.replace(/[\s\-\(\)]/g, '');
      if (normalized.startsWith('0')) normalized = `+58${normalized.slice(1)}`;
      else if (normalized.startsWith('58')) normalized = `+${normalized}`;
      else if (!normalized.startsWith('+')) normalized = `+${normalized}`;

      if (!/^\+\d{10,15}$/.test(normalized)) {
        return NextResponse.json(
          { error: 'Formato de número de teléfono inválido.' },
          { status: 400 }
        );
      }

      if (tipo === 'sms') {
        const { sendSms } = await import('@/lib/twilio-client');
        const smsBody = `🔐 System Kyron\n\nTu código de verificación:\n${codigo}\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendSms(normalized, smsBody);
        if (!result.success) {
          throw new Error(result.error || 'SMS send failed');
        }
      } else if (tipo === 'whatsapp') {
        const waBody = `🔐 *System Kyron*\n\n_Código de Verificación_\n\n*${codigo}*\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendWhatsAppMessage(normalized, waBody);
        if (!result.success) {
          throw new Error(result.error || 'WhatsApp send failed');
        }
      }
    } catch (sendErr) {
      console.error(`[send-code] ${tipo.toUpperCase()} sending failed:`, sendErr);
      const errorMsg = String(sendErr);
      const channel = tipo === 'sms' ? 'SMS' : 'WhatsApp';

      if (errorMsg.includes('not configured') || errorMsg.includes('not connected')) {
        return NextResponse.json({
          success: true,
          message: `${channel} no disponible. Código mostrado en pantalla.`,
          channel: tipo,
          destination: destino.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
          expiresIn: 600,
          devCode: codigo,
          devMessage: `${channel} no configurado. Código mostrado en pantalla.`,
        });
      }

      return NextResponse.json({
        success: true,
        message: `No se pudo enviar por ${channel}. Código mostrado en pantalla.`,
        channel: tipo,
        destination: destino.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
        expiresIn: 600,
        devCode: codigo,
        devMessage: `${channel} temporalmente no disponible (${errorMsg.includes('daily messages limit') ? 'límite diario alcanzado' : 'error de envío'}). Usa el código mostrado en pantalla.`,
      });
    }

    const channelLabel = tipo === 'sms' ? 'SMS' : 'WhatsApp';
    return NextResponse.json({
      success: true,
      message: `Código de verificación enviado a tu ${channelLabel}`,
      channel: tipo,
      destination: destino.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
      expiresIn: 600,
    });
  } catch (err) {
    console.error('[send-code] error:', err);
    return NextResponse.json({ error: 'Error al enviar código de verificación. Intenta de nuevo.' }, { status: 500 });
  }
}
