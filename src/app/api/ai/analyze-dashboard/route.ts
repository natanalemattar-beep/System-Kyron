import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { openaiGenerateText } from '@/ai/openai';
import { geminiGenerateText } from '@/ai/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const rl = rateLimit(`ai:dashboard:${session.userId}`, 20, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

  try {
    const body = await req.json();
    const { module, data, context } = body;

    if (!data) {
      return NextResponse.json({ error: 'Datos requeridos para el análisis' }, { status: 400 });
    }

    const dataStr = JSON.stringify(data);
    if (dataStr.length > 50000) {
      return NextResponse.json({ error: 'Datos demasiado grandes para análisis' }, { status: 400 });
    }

    const sanitizedModule = sanitizeString(module || 'Dashboard General', 200);
    const sanitizedContext = context ? sanitizeString(context, 500) : '';

    const sysPrompt = `Eres el analista financiero y de negocios de System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

ANÁLISIS REQUERIDO:
1. Un resumen ejecutivo en 2-3 líneas
2. Los 3 puntos más críticos o destacados
3. Recomendaciones accionables (menciona el módulo relevante por nombre descriptivo, ej: "Revisa en el Centro de Análisis de Caja")
4. Alertas o riesgos importantes

CONTEXTO DE LA PLATAFORMA:
- Módulos disponibles: Centro Contable, Facturación, Inventario, Análisis Financiero, Análisis de Caja, Análisis de Ventas, Análisis de Rentabilidad, Análisis de Riesgo, Análisis de Mercado, Cuentas por Cobrar, Cuentas por Pagar, Nóminas, Declaración IVA, Retenciones ISLR
- Las alertas críticas se envían automáticamente por email
- La tasa BCV se actualiza en tiempo real

REGLAS:
- Responde siempre en español, de forma concisa y profesional
- Usa formato Markdown para organizar la respuesta (negritas, listas, encabezados)
- Cita cifras específicas cuando estén disponibles
- Considera el contexto económico venezolano (inflación, tipo de cambio BCV, normativa SENIAT)
- Si detectas anomalías, sugiere los módulos específicos donde el usuario puede investigar más
- NUNCA muestres rutas técnicas como /contabilidad — usa nombres descriptivos`;

    const userPrompt = `Módulo: ${sanitizedModule}
${sanitizedContext ? `Contexto adicional: ${sanitizedContext}` : ''}

Datos del dashboard:
${dataStr}

Por favor analiza estos datos y proporciona insights accionables.`;

    let analysis: string;
    try {
      analysis = await openaiGenerateText({
        system: sysPrompt,
        prompt: userPrompt,
        maxTokens: 1024,
      });
    } catch (openaiErr) {
      console.error('[analyze-dashboard] OpenAI failed, trying Gemini fallback:', openaiErr);
      analysis = await geminiGenerateText({
        system: sysPrompt,
        prompt: userPrompt,
        maxTokens: 1024,
      });
    }

    return NextResponse.json({ analysis: analysis || 'No se pudo generar el análisis.', module: module || 'Dashboard General' });
  } catch (err) {
    console.error('[analyze-dashboard] error:', err);
    return NextResponse.json({ error: 'Error al procesar el análisis con IA' }, { status: 500 });
  }
}
