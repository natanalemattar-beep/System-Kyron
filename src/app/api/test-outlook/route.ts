import { NextResponse } from 'next/server';
import { getUncachableOutlookClient } from '@/lib/outlook-client';

export async function GET() {
  try {
    const client = await getUncachableOutlookClient();

    await client.api('/me/sendMail').post({
      message: {
        subject: '[System Kyron] Prueba de conexión Outlook',
        body: {
          contentType: 'HTML',
          content: `
            <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 520px; margin: 0 auto; background: #060D1F; border-radius: 16px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #0EA5E9, #22C55E); padding: 2px;">
                <div style="background: #060D1F; border-radius: 14px; padding: 40px 36px;">
                  <div style="text-align: center; margin-bottom: 32px;">
                    <p style="color: #F1F5F9; font-size: 15px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin: 0;">SYSTEM KYRON</p>
                    <p style="color: #64748B; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin: 4px 0 0 0;">Inteligencia Corporativa</p>
                  </div>
                  <h1 style="color: #22C55E; font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 16px 0;">
                    ✅ Conexión Exitosa
                  </h1>
                  <p style="color: #E2E8F0; font-size: 14px; text-align: center; margin: 0 0 24px 0;">
                    La integración de Outlook está funcionando correctamente.<br/>
                    Los correos de alerta se enviarán desde esta cuenta.
                  </p>
                  <div style="background: #0A1530; border-left: 3px solid #0EA5E9; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                    <p style="color: #94A3B8; font-size: 12px; margin: 0;">
                      <strong style="color: #0EA5E9;">Fecha:</strong> ${new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' })}
                    </p>
                  </div>
                  <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">
                    System Kyron · Inteligencia Corporativa · Venezuela
                  </p>
                </div>
              </div>
            </div>
          `,
        },
        toRecipients: [
          { emailAddress: { address: 'alertas_systemkyron@hotmail.com' } },
        ],
      },
      saveToSentItems: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Email de prueba enviado exitosamente desde Outlook',
      provider: 'outlook',
      from: 'alertas_systemkyron@hotmail.com',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || String(err),
        hint: 'Verifica que la cuenta de Outlook esté conectada en Integrations',
      },
      { status: 500 }
    );
  }
}
