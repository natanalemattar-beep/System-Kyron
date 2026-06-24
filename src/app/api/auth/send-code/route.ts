import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { verifyLoginChallenge } from '@/lib/login-challenge';
import { generateCode, generateMagicToken, storeMagicToken, storeCode, normalizePhone, maskPhone } from '@/lib/verification-codes';
import { getBaseUrl } from '@/lib/server-url';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`send-code:${ip}`, 5, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    const body = await req.json();

    let destino: string = '';
    let tipo: 'email' | 'sms' | 'whatsapp' = 'email';
    const redirectPath: string = body.redirect || '';

    // Unificación de parámetros de entrada
    if (body.destino) {
      destino = body.destino;
      tipo = body.tipo || 'email';
    } else if (body.email) {
      destino = body.email;
      tipo = 'email';
    } else if (body.phone) {
      destino = body.phone;
      tipo = body.method === 'whatsapp' ? 'whatsapp' : 'sms';
    } else if (body.method) {
      tipo = body.method === 'whatsapp' ? 'whatsapp' : body.method === 'sms' ? 'sms' : 'email';
      destino = tipo === 'email' ? body.email : body.phone;
    }

    if (!destino) {
      return NextResponse.json({ error: 'Destino de verificación no proporcionado' }, { status: 400 });
    }

    const proposito = body.proposito || 'verification';

    // Verificación de sesión si es por teléfono (Seguridad Extra)
    if ((tipo === 'sms' || tipo === 'whatsapp') && body.challengeToken) {
      const challenge = verifyLoginChallenge(body.challengeToken, destino);
      if (!challenge.valid) {
        return NextResponse.json(
          { error: 'Sesión de verificación expirada. Por favor, reintente el inicio de sesión.' },
          { status: 403 }
        );
      }
    }

    // Normalización por tipo
    if (tipo === 'email') {
      destino = sanitizeEmail(destino).toLowerCase();
      if (!isValidEmail(destino)) {
        return NextResponse.json({ error: 'Formato de correo electrónico no válido' }, { status: 400 });
      }
    } else {
      destino = normalizePhone(destino);
      if (!/^\+\d{10,15}$/.test(destino)) {
        return NextResponse.json({ error: 'Formato de número telefónico no válido' }, { status: 400 });
      }
    }

    // Rate Limit Centralizado en DB
    let recentCount = 0;
    try {
      const recentCheck = await query<{ count: string }>(
        `SELECT COUNT(*) as count FROM verification_codes
         WHERE destino = $1 AND created_at > NOW() - INTERVAL '1 minute'`,
        [destino]
      );
      recentCount = parseInt(recentCheck[0]?.count ?? '0');
    } catch (dbErr) {
      console.error('[send-code] Error DB RateLimit:', dbErr);
      return NextResponse.json({ error: 'Servicio de verificación temporalmente fuera de línea' }, { status: 503 });
    }

    if (recentCount >= 3) {
      return NextResponse.json({ error: 'Demasiados intentos. Por favor, espere 60 segundos.' }, { status: 429 });
    }

    // FLUJO EMAIL
    if (tipo === 'email') {
      try {
        const codigo = generateCode();
        const userConfigRows = await query<{ email_verificacion: string | null; user_id: number }>(
          `SELECT cu.email_verificacion, cu.user_id FROM configuracion_usuario cu
           JOIN users u ON u.id = cu.user_id
           WHERE u.email = $1`,
          [destino]
        );
        const userConfig = userConfigRows?.[0];
        const emailDestino = userConfig?.email_verificacion || destino;

        const token = generateMagicToken();
        const baseUrl = getBaseUrl(req);
        const redirectQuery = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : '';
        const magicLink = `${baseUrl}/es/verify-link/${token}${redirectQuery}${redirectQuery ? '&' : '?'}token=${token}`;

        await storeCode(destino, codigo, proposito, 'email');
        await storeMagicToken(destino, token, userConfig?.user_id);

        const html = buildKyronEmailTemplate({
          title: 'Verificación de Seguridad',
          body: 'Has solicitado acceder a tu ecosistema Kyron. Utiliza el código a continuación o haz clic en el botón de acceso rápido.',
          code: codigo,
          magicLink,
          appUrl: baseUrl,
          footer: 'Si no reconoces esta actividad, por favor ignora este mensaje. El código es válido por 10 minutos.',
          type: 'verification',
        });

        const emailResult = await sendEmail({
          to: emailDestino,
          subject: `${codigo} es tu código de verificación Kyron`,
          html,
          module: 'auth',
          purpose: 'verification',
        });

        if (!emailResult.success) {
          throw new Error(emailResult.error || 'Error en proveedor de correo');
        }

        return NextResponse.json({
          success: true,
          message: 'Código enviado exitosamente',
          channel: 'email',
          destination: emailDestino,
          expiresIn: 600,
        });

      } catch (err: any) {
        console.error('[send-code] Fallo en flujo de email:', err);
        return NextResponse.json(
          { error: 'No se pudo entregar el código de verificación. Reintente en unos momentos.' },
          { status: 502 }
        );
      }
    }

    // FLUJO TELÉFONO (SMS / WhatsApp)
    try {
      if (tipo === 'sms' || tipo === 'whatsapp') {
        // Ensure a code is generated for phone flows as well.
        const codigoPhone = generateCode();
        await storeCode(destino, codigoPhone, proposito, tipo);
        const isDev = process.env.NODE_ENV === 'development' || !!process.env.NEXT_PUBLIC_DEV_CODE;

        // Only log codes in non-production to avoid leaking them in logs.
        if (isDev) console.info('[send-code] dev code', { code: codigoPhone, destino, channel: tipo });

        return NextResponse.json({
          success: true,
          message: `Código enviado por ${tipo === 'sms' ? 'SMS' : 'WhatsApp'}`,
          channel: tipo,
          destination: maskPhone(destino),
          expiresIn: 600,
          ...(isDev ? { devCode: codigoPhone } : {}),
        });
      }
    } catch (phoneErr) {
      console.error(`[send-code] Fallo en flujo ${tipo}:`, phoneErr);
      return NextResponse.json(
        { error: `No se pudo enviar el código por ${tipo === 'sms' ? 'SMS' : 'WhatsApp'}` },
        { status: 502 }
      );
    }


  } catch (err: any) {
    console.error('[send-code] CRITICAL ERROR:', err);
    return NextResponse.json(
      { error: 'Error interno al procesar la solicitud de verificación. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}

