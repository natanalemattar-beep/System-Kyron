import { NextRequest, NextResponse } from 'next/server';
import { analyzeDashboard, analyzeDashboardStream } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { module, stream = false, data = {}, context = "" } = await req.json();

    if (stream) {
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            const gen = analyzeDashboardStream({ module, data, context });
            for await (const chunk of gen) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          } catch (e: any) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: e.message })}\n\n`));
          } finally { controller.close(); }
        },
      });
      return new NextResponse(readableStream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
      });
    }

    const content = await analyzeDashboard({ module, data, context });
    return NextResponse.json({ content, provider: 'gemini-2.0-flash-lite' });
  } catch (error) {
    console.error('[analyze-dashboard-error]', error);
    return NextResponse.json({ error: 'Error al generar el análisis.' }, { status: 500 });
  }
}
