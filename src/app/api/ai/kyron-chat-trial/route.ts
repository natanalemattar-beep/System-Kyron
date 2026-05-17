import { NextRequest, NextResponse } from 'next/server';
import { AiClient } from '@/lib/ai';

const TRIAL_FALLBACKS: Record<string, string> = {
  'iva': 'El IVA en Venezuela es del 16% (tasa general). Los contribuyentes especiales deben retener el 75% del IVA.',
  'islr': 'El ISLR se declara anualmente. Personas jurídicas: declaración dentro de 3 meses del cierre fiscal. Tarifa máxima: 34%.',
  'igtf': 'El IGTF tiene alícuota del 3% para pagos en bolívares y divisas. Aplica a personas jurídicas.',
  'lottt': 'La LOTTT establece prestaciones sociales de 15 días por trimestre + 2 días adicionales por año.',
};

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ text: 'Por favor, escribe una consulta válida.', responseTime: Date.now() - startTime, remaining: 2, limitReached: false });
    }

    const client = new AiClient();
    if (client.isConfigured()) {
      try {
        const content = await client.generate(`Usuario: ${message}\n\n(Eres versión TRIAL. Responde de forma breve.)`, { temperature: 0.3, maxOutputTokens: 512 });
        return NextResponse.json({ text: content, responseTime: Date.now() - startTime, remaining: 2, limitReached: false });
      } catch {}
    }

    const msg = message.toLowerCase();
    let response = '';
    for (const [keyword, answer] of Object.entries(TRIAL_FALLBACKS)) {
      if (msg.includes(keyword)) { response = answer; break; }
    }
    if (!response) {
      response = 'System Kyron ofrece soluciones completas de gestión fiscal, contable y legal. Para asesoría detallada, regístrate en nuestra plataforma.';
    }

    return NextResponse.json({ text: response, responseTime: Date.now() - startTime, remaining: 2, limitReached: false });
  } catch (error) {
    console.error('[kyron-chat-trial-error]', error);
    return NextResponse.json({ text: 'Error al procesar tu consulta.', responseTime: Date.now() - startTime, remaining: 2, limitReached: false, error: 'Error interno' });
  }
}
