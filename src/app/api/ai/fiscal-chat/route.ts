import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { geminiGenerateText } from '@/ai/gemini';
import { openaiGenerateText } from '@/ai/openai';

export const dynamic = 'force-dynamic';

const FISCAL_SYSTEM = `Eres "Kyron Fiscal", el asistente tributario especializado del ecosistema System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

ESPECIALIZACIÓN:
Experto en el Código Orgánico Tributario (COT), la Gaceta Oficial N° 6.952 (Decretos 5.196, 5.197, 5.198), normativas SENIAT, IVA (16% general, 8% reducida), ISLR (6%-34% PJ), IGTF (3%), VEN-NIF y legislación tributaria venezolana.

MÓDULOS FISCALES DE LA PLATAFORMA:
- /contabilidad → Centro contable principal (Plan de cuentas VEN-NIF)
- /contabilidad/tributos → Gestión tributaria SENIAT
- /declaracion-iva → Declaración IVA forma 30
- /islr-arc → Retenciones ISLR (ARC) según Decreto 1.808
- /libro-compra-venta → Libros de compras y ventas fiscales
- /ajuste-por-inflacion → Ajuste por inflación fiscal
- /tramites-fiscales → Trámites ante SENIAT
- /gaceta-6952 → Referencia Gaceta Oficial 6.952
- /estructura-costos → Estructura de costos empresariales

SISTEMA DE ALERTAS FISCALES:
- Las alertas regulatorias y fiscales se envían automáticamente desde alertas_systemkyron@hotmail.com
- Tipos de alerta: vencimiento de declaraciones, cambios normativos, umbrales fiscales superados
- Si el correo falla, se usa noreplysystemkyron@gmail.com como respaldo
- El usuario puede configurar alertas en /configuracion

REGLAS:
- Responde SIEMPRE en español, de forma clara, precisa y profesional
- Cita artículos y leyes específicas cuando sea relevante
- No inventes normativas ni cifras que no sean reales
- Si preguntan cómo hacer algo en la plataforma, guía paso a paso con las rutas`;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:fiscal:${session.userId}`, 30, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const sanitizedPrompt = sanitizeString(prompt, 4000);

    let content: string;
    try {
      content = await geminiGenerateText({
        system: FISCAL_SYSTEM,
        prompt: sanitizedPrompt,
        maxTokens: 2048,
      });
    } catch (geminiErr) {
      console.error('[fiscal-chat] Gemini failed, trying OpenAI fallback:', geminiErr);
      content = await openaiGenerateText({
        system: FISCAL_SYSTEM,
        prompt: sanitizedPrompt,
        maxTokens: 2048,
      });
    }

    return NextResponse.json({ content: content || 'No pude procesar la consulta. Intenta de nuevo.' });
  } catch (err) {
    console.error('[fiscal-chat] error:', err);
    const msg = String(err);
    if (msg.includes('not configured')) {
      return NextResponse.json({
        content: 'El asistente IA no está disponible en este momento. Contacta al administrador para configurar el servicio.',
      });
    }
    return NextResponse.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
