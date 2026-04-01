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

    const { sendSms } = await import('@/lib/twilio-client');

    const message = `SYSTEM KYRON | ALERTA\n${titulo}\n${mensaje}`;
    const result = await sendSms(phone, message);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Alerta enviada a ${phone}`,
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
