import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `Eres Kyron Core AI, la inteligencia central de System Kyron. 
Tu misión es actuar como el asesor definitivo para socios y clientes durante el Reto Inspira 2026.
Tus pilares fundamentales son:
1. Sostenibilidad (Cero Papel): Explicar cómo eliminamos el papel y protegemos el ambiente.
2. Conectividad: Detallar nuestra red 5G y reserva de emergencia para empresas.
3. Blindaje Legal: Cómo automatizamos el cumplimiento de leyes venezolanas (LOTTT, SENIAT, etc.).
El equipo directivo: Carlos Mattar (Fundador), Sebastian Garrido y Marcos Sousa.
Sé extremadamente profesional, innovador, directo y amable. Siempre responde en el idioma que el usuario te hable (español o inglés).`;

export async function POST(req: NextRequest) {
  try {
    const { messages, stream = false, context = "" } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ content: "Detecto un error en la transmisión. ¿Puedes repetir tu consulta?", status: 'error' });
    }

    const lastMessage = messages[messages.length - 1].content;
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ content: "La IA de Kyron no está configurada. Contacta al administrador.", status: 'error' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (stream) {
      const chat = model.startChat({
        history: messages.slice(0, -1).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      });

      const result = await chat.sendMessageStream(
        (context ? `Contexto Operativo: ${context}\n\n` : '') + 
        SYSTEM_PROMPT + "\n\nUsuario: " + lastMessage
      );
      
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
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
        history: messages.slice(0, -1).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      });
      const result = await chat.sendMessage(
        (context ? `Contexto Operativo: ${context}\n\n` : '') + 
        SYSTEM_PROMPT + "\n\nUsuario: " + lastMessage
      );
      const response = await result.response;
      return NextResponse.json({ content: response.text(), provider: 'gemini-1.5-flash', status: 'success' });
    }

  } catch (error) {
    console.error('[AI-Engine-Critical-Error]', error);
    return NextResponse.json({ content: "Hubo un error al conectar con la IA. Por favor, intenta de nuevo.", status: 'offline' });
  }
}
