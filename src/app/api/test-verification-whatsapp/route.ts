import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Teléfono requerido' },
        { status: 400 }
      );
    }

    const { sendWhatsAppMessage } = await import('@/lib/whatsapp-service');

    const code = Math.floor(Math.random() * 900000) + 100000;
    const body = `*SYSTEM KYRON*\n✅ CODIGO DE VERIFICACION\n\n${code}\n\nVálido por 10 minutos`;

    const result = await sendWhatsAppMessage(phone, body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Código de verificación ${code} enviado a ${phone} vía WhatsApp`,
        code,
        sid: result.sid,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
