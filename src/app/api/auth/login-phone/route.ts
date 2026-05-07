import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse, checkBruteForce, recordLoginFailure } from '@/lib/rate-limiter';
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
    console.log(`[login-phone] Request from IP: ${ip}`);
    
    const rl = rateLimit(`login-phone:${ip}`, 8, 15 * 60 * 1000);
    if (!rl.allowed) {
      console.warn(`[login-phone] Rate limit exceeded for IP: ${ip}`);
      return rateLimitResponse(rl.retryAfterMs);
    }

    const { phone, method } = await req.json();
    console.log(`[login-phone] Data: phone=${phone}, method=${method}`);

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Número de teléfono requerido' }, { status: 400 });
    }

    if (!method || !['sms', 'whatsapp'].includes(method)) {
      return NextResponse.json({ error: 'Método debe ser "sms" o "whatsapp"' }, { status: 400 });
    }

    const normalized = normalizePhone(phone);
    console.log(`[login-phone] Normalized phone: ${normalized}`);

    if (!/^\+\d{10,15}$/.test(normalized)) {
      console.warn(`[login-phone] Invalid phone format: ${normalized}`);
      return NextResponse.json({ error: 'Formato de número inválido. Usa formato venezolano (04XX-XXXXXXX)' }, { status: 400 });
    }

    const phoneRl = rateLimit(`login-phone:${normalized}`, 5, 15 * 60 * 1000);
    if (!phoneRl.allowed) {
      console.warn(`[login-phone] Rate limit exceeded for phone: ${normalized}`);
      return rateLimitResponse(phoneRl.retryAfterMs);
    }

    const bruteCheck = checkBruteForce(`bf:phone:${normalized}`);
    if (bruteCheck.locked) {
      const mins = Math.ceil(bruteCheck.retryAfterMs / 60000);
      console.warn(`[login-phone] Brute force lock for phone: ${normalized}`);
      return NextResponse.json(
        { error: `Número temporalmente bloqueado por múltiples intentos. Intenta de nuevo en ${mins} minuto${mins > 1 ? 's' : ''}.` },
        { status: 423 }
      );
    }

    console.log(`[login-phone] Searching user for phone: ${normalized}`);
    const user = await queryOne<DbUser>(
      `SELECT id, email, tipo, nombre, apellido, razon_social, telefono,
              COALESCE(telefono_verificado, false) as telefono_verificado
       FROM users
       WHERE REPLACE(REPLACE(REPLACE(REPLACE(telefono, ' ', ''), '-', ''), '(', ''), ')', '') LIKE $1
          OR telefono = $2`,
      [`%${normalized.slice(-10)}`, normalized]
    );

    if (!user) {
      console.log(`[login-phone] User NOT found for phone: ${normalized}`);
      recordLoginFailure(`bf:phone:${normalized}`);
      await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
      return NextResponse.json({
        error: 'No encontramos una cuenta con ese número. Verifica el número o regístrate.'
      }, { status: 404 });
    }

    console.log(`[login-phone] User found: ${user.email} (ID: ${user.id})`);
    const displayName = user.tipo === 'juridico'
      ? (user.razon_social ?? user.nombre)
      : user.nombre;

    const code = generateCode();
    console.log(`[login-phone] Generated code for ${user.email}`);
    
    await storeCode(user.email, code, 'verification', method === 'whatsapp' ? 'whatsapp' : 'sms');

    const maskedPhoneStr = maskPhone(normalized);

    try {
      console.log(`[login-phone] Attempting to send ${method.toUpperCase()} to ${normalized}`);
      if (method === 'sms') {
        const { sendSms } = await import('@/lib/twilio-client');
        const smsBody = `\u{1F510} System Kyron\n\nTu código de acceso:\n${code}\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendSms(normalized, smsBody);
        if (!result.success) throw new Error(result.error || 'SMS failed');
        console.log(`[login-phone] SMS sent successfully to ${normalized}`);
      } else {
        const { sendWhatsAppMessage } = await import('@/lib/whatsapp-service');
        const waBody = `\u{1F510} *System Kyron*\n\_Código de Acceso_\n\n*${code}*\n\nVálido por 10 minutos.\nNo lo compartas con nadie.`;
        const result = await sendWhatsAppMessage(normalized, waBody);
        if (!result.success) throw new Error(result.error || 'WhatsApp failed');
        console.log(`[login-phone] WhatsApp sent successfully to ${normalized}`);
      }
    } catch (sendErr) {
      console.error(`[login-phone] CRITICAL: ${method.toUpperCase()} send failed for ${normalized}:`, sendErr);
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

    console.log(`[login-phone] Success for ${user.email}. requiresVerification=true`);
    return NextResponse.json({
      requiresVerification: true,
      email: user.email,
      maskedPhone: maskedPhoneStr,
      nombre: displayName,
      method,
      challengeToken,
    });
  } catch (err) {
    console.error('[login-phone] UNEXPECTED CRITICAL ERROR:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
