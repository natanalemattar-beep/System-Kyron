import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/lib/ai/client';
import { setupToolImplementations } from '@/lib/ai/tool-implementations';
import { coreTools } from '@/lib/ai/tools';

const MAX_INPUT_LENGTH = 8000;
const MAX_HISTORY_LENGTH = 16000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, systemPrompt: clientPrompt, history, context } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }
    if (message.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: `Mensaje demasiado largo (máx. ${MAX_INPUT_LENGTH} caracteres)` },
        { status: 400 }
      );
    }

    await setupToolImplementations();

    const moduleName = context || 'kyron-chat';
    const moduleLabels: Record<string, string> = {
      'kyron-chat': 'Kyron Core',
      'dashboard-asesoria-contable': 'Contabilidad y Fiscal',
      rrhh: 'RRHH y Nómina',
      legal: 'Jurídico',
      ventas: 'Ventas y Marketing',
      telecom: 'Telecomunicaciones',
      sostenibilidad: 'Sostenibilidad',
      socios: 'Socios',
      informatica: 'Informática',
    };

    const toolRules = `\n\nINSTRUCCIONES DE ACCIÓN (obligatorio):
- Si el usuario pide UNA ACCIÓN CONCRETA (cerrar período, calcular nómina, listar empleados, consultar declaraciones, ver alertas, métricas del dashboard), USA LAS HERRAMIENTAS DISPONIBLES.
- Si faltan parámetros, pídelos amablemente antes de ejecutar.
- Si la petición es MÚLTIPLE ("haz el cierre fiscal y mándame la nómina"), ejecuta CADA PASO secuencialmente.
- Siempre confirma lo que hiciste.
- Responde en español, sé conciso. Usa markdown ligero (**negrita**, listas).`;

    const basePrompt = clientPrompt
      ? `${clientPrompt}${toolRules}`
      : `Eres el asistente inteligente de System Kyron, un sistema operativo empresarial venezolano.
Módulo actual: ${moduleLabels[moduleName] || moduleName}

CAPACIDADES:
- Responder preguntas sobre el módulo actual y la plataforma en general
- Ejecutar acciones usando las herramientas disponibles (cerrar períodos fiscales, calcular nóminas, consultar empleados, etc.)
- Analizar datos y dar recomendaciones${toolRules}`;

    const conversationHistory = history || [];
    let historyText = conversationHistory
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`
      )
      .join('\n');

    if (historyText.length > MAX_HISTORY_LENGTH) {
      historyText = historyText.slice(-MAX_HISTORY_LENGTH);
    }

    // Use agenticGenerate so the AI can call tools to perform actions
    const result = await ai.agenticGenerate(
      historyText ? `${historyText}\nUsuario: ${message}` : message,
      {
        model: 'gemini-1.5-flash',
        temperature: 0.7,
        maxTokens: 4096,
        systemInstruction: basePrompt,
        tools: coreTools,
        timeout: 60000,
      }
    );

    const responseText = result.text;
    const acciones = result.toolCalls;

    return NextResponse.json({
      response: responseText,
      acciones: acciones.length > 0 ? acciones : undefined,
    });
  } catch (error: any) {
    const msg = error?.message || '';
    const isKeyExhausted = msg.includes('All keys rate limited');
    const isQuota = msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');
    const status = isKeyExhausted ? 503 : isQuota ? 429 : 500;
    console.warn(`[agent-chat] ${status}`, msg);
    return NextResponse.json(
      {
        error: isKeyExhausted
          ? 'Agente temporalmente no disponible. Intenta de nuevo en unos segundos.'
          : msg || 'Error interno del agente',
      },
      { status }
    );
  }
}
