import { NextRequest, NextResponse } from 'next/server';
import { createModel, getAiStatus } from "@/lib/ai-client";
import { KYRON_SYSTEM_PROMPT } from "@/lib/ai-context";

const SYSTEM_PROMPT = KYRON_SYSTEM_PROMPT;

export async function POST(req: NextRequest) {
  try {
    const { messages, stream = false, context = "" } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ content: "Detecto un error en la transmisión. ¿Puedes repetir tu consulta?", status: 'error' });
    }

    const lastMessage = messages[messages.length - 1].content;
    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const model = createModel("gemini-2.0-flash");
        if (!model) {
          return NextResponse.json({ content: "La IA de Kyron no está configurada. Contacta al administrador.", status: 'error' });
        }

        // Prepare history
        const history = messages.slice(0, -1).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

        // Ensure history starts with a 'user' message
        const firstUserIndex = history.findIndex(m => m.role === 'user');
        const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

        if (stream) {
          const chat = model.startChat({
            history: validHistory,
          });

          const result = await chat.sendMessageStream(
            (context ? `Contexto Operativo: ${context}\n\n` : '') +
            SYSTEM_PROMPT + "\n\nUsuario: " + lastMessage
          );

          const encoder = new TextEncoder();
          const readableStream = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of result.stream) {
                  const text = chunk.text();
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                controller.close();
              } catch (e: any) {
                console.error('[AI-Stream-Error]', e);
                controller.close();
              }
            },
          });

          return new NextResponse(readableStream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        } else {
          const chat = model.startChat({
            history: validHistory,
          });
          const result = await chat.sendMessage(
            (context ? `Contexto Operativo: ${context}\n\n` : '') +
            SYSTEM_PROMPT + "\n\nUsuario: " + lastMessage
          );
          const response = await result.response;
          return NextResponse.json({ content: response.text(), provider: 'gemini-2.0-flash', status: 'success' });
        }

      } catch (error: any) {
        lastError = error;
        // If it's a quota error (429), retry with a new key
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`[AI-Engine-Retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
          // Wait a small amount of time before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        // For other errors, don't retry
        break;
      }
    }

    // If we reach here, it means all attempts failed or it was a non-quota error
    console.error('[AI-Engine-Critical-Error]', lastError);
    return NextResponse.json({ 
      content: `Hubo un error al conectar con la IA. Error: ${lastError instanceof Error ? lastError.message : String(lastError)}`, 
      status: 'offline' 
    });

  } catch (error) {
    console.error('[AI-Engine-Unexpected-Error]', error);
    return NextResponse.json({ content: "Error inesperado en el servidor.", status: 'error' });
  }
}
