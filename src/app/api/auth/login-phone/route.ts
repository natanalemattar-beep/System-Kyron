import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { generateCode, storeCode } from '@/lib/verification-codes';
import { createLoginChallenge } from '@/lib/login-challenge';

interface DbUser {
  id: number;
  email: string;
  tipo: 'natural' | 'juridico';
  nombre: string;
  apellido: string | null;
  razon_social: string | null;
  telefono: string;
  telefono_verificado: boolean;
}

function normalizePhone(raw: string): string {
  let cleaned = raw.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0')) cleaned = `+58${cleaned.slice(1)}`;
  else if (cleaned.startsWith('58')) cleaned = `+${cleaned}`;
  else if (!cleaned.startsWith('+')) cleaned = `+${cleaned}`;
  return cleaned;
}

function maskPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return cleaned.length > 4
    ? '\u2022'.repeat(cleaned.length - 4) + cleaned.slice(-4)
    : '\u2022\u2022\u2022' + cleaned.slice(-2);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`login-phone:${ip}`, 8, 15 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const { phone, method } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Número de teléfono requerido' }, { status: 400 });
    }

    if (!method || !['sms', 'whatsapp'].includes(method)) {
      return NextResponse.json({ error: 'Método debe ser "sms" o "whatsapp"' }, { status: 400 });
    }

    const normalized = normalizePhone(phone);

    if (!/^\+\d{10,15}$/.test(normalized)) {
      return NextResponse.json({ error: 'Formato de número inválido. Usa formato venezolano (04XX-XXXXXXX)' }, { status: 400 });
    }

    const phoneRl = rateLimit(`login-phone:${normalized}`, 5, 15 * 60 * 1000);
    if (!phoneRl.allowed) return rateLimitResponse(phoneRl.retryAfterMs);

    const user = await queryOne<DbUser>(
      `SELECT id, email, tipo, nombre, apellido, razon_social, telefono,
              COALESCE(telefono_verificado, false) as telefono_verificado
       FROM users
       WHERE REPLACE(REPLACE(REPLACE(REPLACE(telefono, ' ', ''), '-', ''), '(', ''), ')', '') LIKE $1
          OR telefono = $2`,
      [`%${normalized.slice(-10)}`, normalized]
    );

    if (!user) {
      await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
      return NextResponse.json({
        error: 'No encontramos una cuenta con ese número. Verifica el número o regístrate.'
      }, { status: 404 });
    }

    const displayName = user.tipo === 'juridico'
      ? (user.razon_social ?? user.nombre)
      : user.nombre;

    const code = generateCode();
    await storeCode(user.email, code, user.id);

    const maskedPhoneStr = maskPhone(normalized);

    try {
      if (method === 'sms') {
        const { sendSms } = await import('@/lib/twilio-client');
        const smsBody = `\u{1F510} System Kyron\n\nTu código de acceso:\n${code}\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendSms(normalized, smsBody);
        if (!result.success) throw new Error(result.error || 'SMS failed');
      } else {
        const { sendWhatsAppMessage } = await import('@/lib/whatsapp-service');
        const waBody = `\u{1F510} *System Kyron*\n\n_Código de Acceso_\n\n*${code}*\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendWhatsAppMessage(normalized, waBody);
        if (!result.success) throw new Error(result.error || 'WhatsApp failed');
      }
    } catch (sendErr) {
      console.error(`[login-phone] ${method.toUpperCase()} send failed:`, sendErr);
      const errorMsg = String(sendErr);
      if (errorMsg.includes('not configured') || errorMsg.includes('not connected')) {
        const channel = method === 'sms' ? 'SMS' : 'WhatsApp';
        return NextResponse.json(
          { error: `El envío por ${channel} no está disponible en este momento.` },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: `No pudimos enviar el código. Verifica el número e intenta de nuevo.` },
        { status: 502 }
      );
    }

    const challengeToken = createLoginChallenge(user.email, user.id);

    await logActivity({
      userId: user.id,
      evento: 'LOGIN_PHONE_OTP',
      categoria: 'auth',
      descripcion: `Código OTP enviado por ${method.toUpperCase()} a ${maskedPhoneStr}`,
      entidadTipo: 'usuario',
      entidadId: user.id,
      metadata: { method, phone: maskedPhoneStr },
    });

    return NextResponse.json({
      requiresVerification: true,
      email: user.email,
      maskedPhone: maskedPhoneStr,
      nombre: displayName,
      method,
      challengeToken,
    });
  } catch (err) {
    console.error('[login-phone] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
