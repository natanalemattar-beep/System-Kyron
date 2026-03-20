import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOTP(destino: string, codigo: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'System Kyron <onboarding@resend.dev>',
    to: destino,
    subject: `${codigo} — Código de Verificación · System Kyron`,
    html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 520px; margin: 0 auto; background: #060D1F; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0EA5E9, #22C55E); padding: 2px;">
          <div style="background: #060D1F; border-radius: 14px; padding: 40px 36px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; background: #0EA5E918; border: 2px solid #0EA5E9; border-radius: 12px; padding: 14px 20px;">
                <span style="font-size: 28px; font-weight: 900; color: #0EA5E9; letter-spacing: 4px;">SK</span>
              </div>
              <p style="color: #94A3B8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 10px 0 0 0;">CORPORATE INTELLIGENCE · ZERO RISK</p>
            </div>

            <h1 style="color: #F1F5F9; font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 8px 0;">
              Verificación de Correo Electrónico
            </h1>
            <p style="color: #94A3B8; font-size: 14px; text-align: center; margin: 0 0 36px 0;">
              Usa el siguiente código para verificar tu cuenta en System Kyron.
            </p>

            <div style="background: #0A1530; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
              <p style="color: #94A3B8; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px 0;">Tu código de verificación</p>
              <p style="color: #0EA5E9; font-size: 42px; font-weight: 900; letter-spacing: 12px; margin: 0; font-family: 'Courier New', monospace;">${codigo}</p>
              <p style="color: #475569; font-size: 12px; margin: 12px 0 0 0;">⏱ Válido por <strong style="color: #F59E0B;">10 minutos</strong></p>
            </div>

            <div style="background: #0A1530; border-left: 3px solid #F59E0B; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
              <p style="color: #94A3B8; font-size: 12px; margin: 0;">
                <strong style="color: #F59E0B;">⚠ Seguridad:</strong> Si no solicitaste este código, ignora este correo. Nunca compartiremos tu código con nadie.
              </p>
            </div>

            <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">
              System Kyron · Inteligencia Corporativa · Venezuela<br/>
              <span style="color: #1E3A5F;">Este es un mensaje automático, no respondas a este correo.</span>
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

async function sendSMSOTP(destino: string, codigo: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('SMS_NOT_CONFIGURED');
  }

  const twilio = (await import('twilio')).default;
  const client = twilio(accountSid, authToken);
  await client.messages.create({
    body: `System Kyron: Tu código de verificación es ${codigo}. Válido por 10 minutos. No lo compartas con nadie.`,
    from: fromNumber,
    to: destino,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destino, tipo } = body as { destino: string; tipo: 'email' | 'sms' };

    if (!destino || !tipo) {
      return NextResponse.json({ error: 'Destino y tipo son requeridos' }, { status: 400 });
    }
    if (!['email', 'sms'].includes(tipo)) {
      return NextResponse.json({ error: 'Tipo debe ser "email" o "sms"' }, { status: 400 });
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
      if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({ error: 'El servicio de correo no está configurado. Contacta al administrador.' }, { status: 503 });
      }
      await sendEmailOTP(destino, codigo);
    } else {
      try {
        await sendSMSOTP(destino, codigo);
      } catch (err) {
        if ((err as Error).message === 'SMS_NOT_CONFIGURED') {
          return NextResponse.json({ error: 'El servicio de SMS no está configurado. Usa verificación por correo.' }, { status: 503 });
        }
        throw err;
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
