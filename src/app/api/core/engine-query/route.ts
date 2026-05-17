import { NextRequest, NextResponse } from 'next/server';
import { AiClient } from '@/lib/ai';
import { KYRON_SYSTEM_PROMPT } from '@/lib/ai-context';

export async function POST(req: NextRequest) {
  try {
    const { messages, stream = false, context = "" } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ content: 'Detecto un error en la transmisión.', status: 'error' });
    }

    const client = new AiClient('gemini-2.0-flash-lite');
    if (!client.isConfigured()) {
      return NextResponse.json({ content: 'IA de Kyron no configurada.', status: 'error' });
    }

    const systemPrompt = context ? `${KYRON_SYSTEM_PROMPT}\n\nContexto: ${context}` : KYRON_SYSTEM_PROMPT;

    if (stream) {
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            const streamIter = client.chatStream(messages, systemPrompt);
            for await (const chunk of streamIter) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          } catch (e: any) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: e.message || 'Error de streaming' })}\n\n`));
          } finally { controller.close(); }
        },
      });
      return new NextResponse(readableStream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
      });
    }

    const content = await client.chat(messages, systemPrompt);
    return NextResponse.json({ content, provider: 'gemini-2.0-flash-lite', status: 'success' });
  } catch (error) {
    console.error('[AI-Engine-Error]', error);
    return NextResponse.json({ content: 'Error inesperado en el servidor.', status: 'error' });
  }
}
