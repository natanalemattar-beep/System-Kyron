import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phone, titulo, mensaje } = await req.json();

    if (!phone || !titulo || !mensaje) {
      return NextResponse.json(
        { success: false, error: 'Teléfono, título y mensaje requeridos' },
        { status: 400 }
      );
    }

    const { sendWhatsAppMessage } = await import('@/lib/whatsapp-service');

    const body = `*SYSTEM KYRON*\n🚨 ALERTA\n\n*${titulo}*\n${mensaje}`;
    const result = await sendWhatsAppMessage(phone, body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Alerta WhatsApp enviada a ${phone}`,
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
