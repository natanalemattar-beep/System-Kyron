import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { verifyLoginChallenge } from '@/lib/login-challenge';
import { generateCode, generateMagicToken, storeMagicToken, storeCode } from '@/lib/verification-codes';

export const dynamic = 'force-dynamic';



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

    let destino: string = '';
    let tipo: 'email' | 'sms' | 'whatsapp' = 'email';

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

    const codigo = generateCode();
    console.log(`[send-code] Iniciando flujo para: ${destino} (${tipo})`);

    // FLUJO EMAIL
    if (tipo === 'email') {
      try {
        // 1. Obtener configuración de usuario (email alternativo)
        const [userConfig, user] = await Promise.all([
          query<{ email_verificacion: string | null }>(
            `SELECT cu.email_verificacion FROM configuracion_usuario cu
             JOIN users u ON u.id = cu.user_id
             WHERE u.email = $1`,
            [destino]
          ),
          queryOne<{ id: number }>(`SELECT id FROM users WHERE email = $1`, [destino]),
        ]);

        const emailDestino = userConfig[0]?.email_verificacion || destino;

        // 2. GUARDAR EN DB (Crítico: Debe ocurrir antes del envío)
        await storeCode(destino, codigo, proposito, 'email');

        // 3. Generar Magic Link
        const token = generateMagicToken();
        // Forzar dominio de producción si no hay variable de entorno establecida
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://system-kyron.vercel.app';
        
        const magicLink = `${baseUrl}/es/verify-link/${token}`;
        
        // Guardar magic token
        await storeMagicToken(destino, token, user?.id);


        // 4. Construir y Enviar Email
        const html = buildKyronEmailTemplate({
          title: 'Verificación de Seguridad',
          body: 'Has solicitado acceder a tu ecosistema Kyron. Utiliza el código a continuación o haz clic en el botón de acceso rápido.',
          code: codigo,
          magicLink,
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
      let phoneNumber = destino;
      // Si el destino parece un correo pero el tipo es teléfono, buscar el teléfono del usuario
      if (destino.includes('@')) {
        const userPhone = await queryOne<{ telefono: string | null }>(
          `SELECT telefono FROM users WHERE email = $1`, [destino]
        );
        if (!userPhone?.telefono) {
          return NextResponse.json({ error: 'No existe un teléfono vinculado a esta cuenta.' }, { status: 400 });
        }
        phoneNumber = normalizePhone(userPhone.telefono);
      }

      await storeCode(destino, codigo, proposito, tipo);
      const twilioResult = await trySendViaTwilio(tipo, phoneNumber, codigo);

      if (!twilioResult.sent) {
        throw new Error(twilioResult.error);
      }

      const masked = maskPhone(phoneNumber);
      return NextResponse.json({
        success: true,
        message: `Código enviado vía ${tipo.toUpperCase()}`,
        channel: tipo,
        destination: masked,
        expiresIn: 600,
      });

    } catch (err: any) {
      console.error('[send-code] Fallo en flujo móvil:', err);
      return NextResponse.json(
        { error: `Error al enviar por ${tipo}. Por favor, use la verificación por correo.` },
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

