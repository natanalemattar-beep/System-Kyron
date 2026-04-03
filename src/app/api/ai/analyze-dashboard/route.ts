import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
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

    const sysPrompt = `Eres el analista financiero y de negocios de System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

ANÁLISIS REQUERIDO:
1. Un resumen ejecutivo en 2-3 líneas
2. Los 3 puntos más críticos o destacados
3. Recomendaciones accionables (indica la ruta del módulo relevante cuando sea posible, ej: "Revisa en /analisis-caja")
4. Alertas o riesgos importantes

CONTEXTO DE LA PLATAFORMA:
- Módulos disponibles: /contabilidad, /facturacion, /inventario, /analisis, /analisis-caja, /analisis-ventas, /analisis-rentabilidad, /analisis-riesgo, /analisis-mercado, /cuentas-por-cobrar, /cuentas-por-pagar, /nominas, /declaracion-iva, /islr-arc
- Las alertas críticas se envían automáticamente por email desde alertas_systemkyron@hotmail.com
- La tasa BCV se actualiza en tiempo real desde el API

REGLAS:
- Responde siempre en español, de forma concisa y profesional
- Cita cifras específicas cuando estén disponibles
- Considera el contexto económico venezolano (inflación, tipo de cambio BCV, normativa SENIAT)
- Si detectas anomalías, sugiere los módulos específicos donde el usuario puede investigar más`;

    const userPrompt = `Módulo: ${module || 'Dashboard General'}
${context ? `Contexto adicional: ${context}` : ''}

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
