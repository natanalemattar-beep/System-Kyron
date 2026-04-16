import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { verifyLoginChallenge } from '@/lib/login-challenge';
import { generateMagicToken, storeMagicToken } from '@/lib/verification-codes';

export const dynamic = 'force-dynamic';

function generateOTP(): string {
  const crypto = require('crypto');
  return crypto.randomInt(100000, 1000000).toString();
}

function normalizePhone(phone: string): string {
  let normalized = phone.replace(/[\s\-\(\)]/g, '');
  if (normalized.startsWith('0')) normalized = `+58${normalized.slice(1)}`;
  else if (normalized.startsWith('58')) normalized = `+${normalized}`;
  else if (!normalized.startsWith('+')) normalized = `+${normalized}`;
  return normalized;
}

function maskPhone(phone: string): string {
  const clean = phone.replace(/[^\d]/g, '');
  if (clean.length >= 10) {
    return `****${clean.slice(-4)}`;
  }
  return `****${clean.slice(-3)}`;
}

async function trySendViaTwilio(tipo: 'sms' | 'whatsapp', phone: string, codigo: string): Promise<{ sent: boolean; error?: string }> {
  try {
    if (tipo === 'sms') {
      const { sendSms } = await import('@/lib/twilio-client');
      const smsBody = `System Kyron - Codigo de verificacion: ${codigo} - Valido por 10 minutos.`;
      const result = await sendSms(phone, smsBody);
      if (result.success) return { sent: true };
      return { sent: false, error: result.error };
    } else {
      const { sendWhatsAppMessage } = await import('@/lib/whatsapp-service');
      const waBody = `*System Kyron*\n\n_Codigo de Verificacion_\n\n*${codigo}*\n\nValido por 10 minutos.`;
      const result = await sendWhatsAppMessage(phone, waBody);
      if (result.success) return { sent: true };
      return { sent: false, error: result.error };
    }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
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
          { error: 'Sesion de verificacion expirada. Inicia sesion nuevamente.' },
          { status: 403 }
        );
      }
    }

    if (tipo === 'email') {
      destino = sanitizeEmail(destino);
      if (!isValidEmail(destino)) {
        return NextResponse.json({ error: 'Formato de correo invalido' }, { status: 400 });
      }

      // Chequeo de rate limit por destino (además del chequeo por IP de arriba)
      let recentCount = 0;
      try {
        const recentCheck = await query<{ count: string }>(
          `SELECT COUNT(*) as count FROM verification_codes
           WHERE destino = $1 AND created_at > NOW() - INTERVAL '1 minute'`,
          [destino]
        );
        recentCount = parseInt(recentCheck[0]?.count ?? '0');
      } catch (dbErr) {
        console.error('[send-code] Error al verificar rate limit en DB:', dbErr);
        return NextResponse.json(
          { error: 'El servicio de verificación no está disponible. Verifica tu conexión o contacta soporte.' },
          { status: 503 }
        );
      }

      if (recentCount >= 3) {
        return NextResponse.json(
          { error: 'Demasiados intentos. Espera 1 minuto antes de solicitar otro codigo.' },
          { status: 429 }
        );
      }

      // Obtener email de verificación alternativo si el usuario lo tiene configurado
      let emailDestino = destino;
      let originalEmail = destino;
      try {
        const [userConfig, user] = await Promise.all([
          query<{ email_verificacion: string | null }>(
            `SELECT cu.email_verificacion FROM configuracion_usuario cu
             JOIN users u ON u.id = cu.user_id
             WHERE u.email = $1`,
            [destino]
          ),
          queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [destino.toLowerCase()]),
        ]);
        if (userConfig[0]?.email_verificacion) {
          emailDestino = userConfig[0].email_verificacion;
        }

        const codigo = generateOTP();
        console.log(`[send-code] Generando código para ${originalEmail} (vía ${emailDestino})`);

        // PASO 1: Guardar en DB PRIMERO — si falla aquí, el email no se envía
        await query(
          `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito) 
           VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes', 'verification')`,
          [originalEmail.toLowerCase(), tipo, codigo]
        );

        // PASO 2: Generar magic link y guardarlo
        const token = generateMagicToken();
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('localhost')
          ? process.env.NEXT_PUBLIC_APP_URL
          : 'https://system-kyron.vercel.app';
        const magicLink = `${baseUrl}/es/verify-link/${token}`;
        storeMagicToken(originalEmail.toLowerCase(), token, user?.id).catch(() => {});

        // PASO 3: Construir y enviar email
        const html = buildKyronEmailTemplate({
          title: 'Verificacion de Identidad',
          body: 'Verifica tu identidad haciendo clic en el boton o ingresando el codigo de verificacion.',
          code: codigo,
          magicLink,
          footer: 'Si no solicitaste este codigo, ignora este correo. El enlace y el codigo expiran en 10 minutos.',
          type: 'verification',
        });

        const result = await sendEmail({
          to: emailDestino,
          subject: `${codigo} — Verificacion de Identidad · System Kyron`,
          html,
          module: 'auth',
          purpose: 'verification',
        }).catch(err => {
          console.error('[send-code] Email send error:', err);
          return { success: false, provider: 'none' as const, error: String(err) };
        });

        if (!result.success) {
          console.error(`[send-code] Fallo al enviar correo a ${emailDestino}:`, result.error);
          return NextResponse.json(
            { error: 'No se pudo enviar el correo de verificacion. Revisa tu direccion de correo e intenta de nuevo.' },
            { status: 502 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Codigo de verificacion enviado a tu correo electronico',
          channel: tipo,
          destination: emailDestino,
          expiresIn: 600,
        });

      } catch (dbErr: any) {
        console.error('[send-code] Error de DB en flujo de email:', dbErr);
        if (dbErr.message?.includes('verification_codes')) {
          return NextResponse.json(
            { error: 'El sistema de verificación está siendo inicializado. Intenta en unos segundos.' },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: 'Error interno al procesar la solicitud de verificacion. Intenta de nuevo.' },
          { status: 500 }
        );
      }
    }

    const recentCheck = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM verification_codes
       WHERE destino = $1 AND created_at > NOW() - INTERVAL '1 minute'`,
      [destino]
    );
    if (parseInt(recentCheck[0]?.count ?? '0') >= 3) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera 1 minuto antes de solicitar otro codigo.' },
        { status: 429 }
      );
    }

    let phoneNumber = destino;
    if (destino.includes('@')) {
      const userPhone = await query<{ telefono: string | null }>(
        `SELECT telefono FROM users WHERE email = $1`,
        [destino]
      );
      if (!userPhone || userPhone.length === 0 || !userPhone[0]?.telefono) {
        console.warn(`[send-code] Intento de verificación por teléfono para usuario sin número o inexistente: ${destino}`);
        return NextResponse.json(
          { error: 'No tienes un numero de telefono registrado o la cuenta no existe. Usa verificacion por correo.' },
          { status: 400 }
        );
      }
      phoneNumber = userPhone[0].telefono;
    }

    const normalized = normalizePhone(phoneNumber);
    if (!/^\+\d{10,15}$/.test(normalized)) {
      return NextResponse.json(
        { error: 'Formato de numero de telefono invalido.' },
        { status: 400 }
      );
    }

    const codigo = generateOTP();

    await query(
      `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito) 
       VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes', 'verification')`,
      [destino, tipo, codigo]
    );

    const channelLabel = tipo === 'sms' ? 'SMS' : 'WhatsApp';
    const masked = maskPhone(normalized);

    const twilioResult = await trySendViaTwilio(tipo, normalized, codigo);

    if (twilioResult.sent) {
      console.log(`[send-code] ${channelLabel} enviado exitosamente a ${masked}`);
      return NextResponse.json({
        success: true,
        message: `Codigo de verificacion enviado a tu ${channelLabel}`,
        channel: tipo,
        destination: masked,
        expiresIn: 600,
      });
    }

    console.log(`[send-code] ${channelLabel} no disponible: ${twilioResult.error}`);
    return NextResponse.json(
      { error: `No se pudo enviar el codigo por ${channelLabel}. Intenta con otro metodo de verificacion.` },
      { status: 502 }
    );

  } catch (err: any) {
    console.error('[send-code] CRITICAL ERROR:', err);
    // Si el error es que la tabla no existe, dar un mensaje más útil en logs
    if (err.message && err.message.includes('relation "verification_codes" does not exist')) {
      console.error('[send-code] Error: La tabla verification_codes no existe. Ejecuta la inicialización de DB.');
    }
    return NextResponse.json(
      { error: 'Error interno al procesar la solicitud de verificacion. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
