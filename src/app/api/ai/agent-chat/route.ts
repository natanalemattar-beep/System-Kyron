import { NextRequest, NextResponse } from 'next/server';
import { AiClient } from '@/lib/ai';

const AGENT_PROMPTS: Record<string, string> = {
  personal: `Eres un asistente personal para ciudadanos venezolanos. Ayudas con trámites (SAIME, SENIAT), citas, documentos y servicios públicos. Responde en español formal.`,
  fiscal: `Eres un contador senior experto en VEN-NIF, SENIAT, IVA, ISLR, IGTF y normativa fiscal venezolana.`,
  legal: `Eres un abogado experto en SAREN, SAPI, contratos y derecho corporativo venezolano.`,
};

export async function POST(req: NextRequest) {
  try {
    const { messages, agentId = 'personal', context = '' } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No se recibieron mensajes' }, { status: 400 });
    }

    const client = new AiClient('gemini-2.0-flash-lite');
    if (!client.isConfigured()) {
      return NextResponse.json({ error: 'IA no configurada' }, { status: 503 });
    }

    const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.personal;
    const fullContext = context ? `${systemPrompt}\n\nContexto: ${context}` : systemPrompt;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const gen = client.chatStream(messages, fullContext, { temperature: 0.2 });
          for await (const chunk of gen) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Error del agente';
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
        } finally { controller.close(); }
      },
    });

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
    });
  } catch (error) {
    console.error('[agent-chat-error]', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
