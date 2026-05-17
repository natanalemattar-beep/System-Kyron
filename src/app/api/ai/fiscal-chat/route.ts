import { NextRequest, NextResponse } from 'next/server';
import { AiClient } from '@/lib/ai';

const FISCAL_SYSTEM_PROMPT = `Eres un contador senior experto en legislación fiscal venezolana.
Basas tus respuestas en el Código Orgánico Tributario, IVA 16%, IGTF 3%, ISLR y normativa VEN-NIF.
Responde en español venezolano formal. Sé preciso citando artículos cuando sea relevante.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ content: '¿En qué puedo ayudarte con temas fiscales?', status: 'error' });
    }

    const client = new AiClient('gemini-2.0-flash-lite');
    if (!client.isConfigured()) {
      return NextResponse.json({ content: 'Asistente fiscal no disponible en este momento.', status: 'error' });
    }

    const accept = req.headers.get('accept') || '';
    const wantsStream = accept.includes('text/event-stream');

    if (wantsStream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const gen = client.chatStream(messages, FISCAL_SYSTEM_PROMPT, { temperature: 0.2 });
            for await (const chunk of gen) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          } catch (err) {
            const msg = err instanceof Error ? err.message : 'Error';
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
          } finally { controller.close(); }
        },
      });
      return new NextResponse(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
      });
    }

    const content = await client.chat(messages, FISCAL_SYSTEM_PROMPT, { temperature: 0.2 });
    return NextResponse.json({ content, status: 'success' });
  } catch (error) {
    console.error('[fiscal-chat-error]', error);
    return NextResponse.json({ content: 'Error al procesar la consulta fiscal.', status: 'error' }, { status: 500 });
  }
}
