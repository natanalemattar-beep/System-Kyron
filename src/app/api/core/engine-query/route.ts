import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * System Kyron Core AI Engine — Professional Implementation
 * Integrates Gemini AI with a robust deterministic fallback.
 */

const KNOWLEDGE_BASE: Record<string, string[]> = {
  saludo: ["¡Hola! Soy Kyron Core AI, el cerebro central de System Kyron. Monitoreo la eficiencia operativa y la sostenibilidad de tu ecosistema empresarial. ¿En qué puedo asistirte hoy?"],
  equipo: ["El equipo que defiende este proyecto en el Reto Inspira 2026 está liderado por Carlos Mattar (Fundador y Arquitecto de Software), Sebastian Garrido (Director de Operaciones) y Marcos Sousa (Consultor Legal y de Cumplimiento)."],
  sostenibilidad: ["Nuestra visión 'Cero Papel' no es solo digitalizar; es eliminar la burocracia física. Reducimos el 100% del desperdicio de papel administrativo mediante firmas digitales auditadas y gestión en la nube."],
  seguridad: ["Implementamos 'Kyron Shield', una capa de seguridad perimetral que protege tus datos contables y legales. Además, cada transacción importante se registra en un libro contable digital inmutable (estilo Blockchain)."],
  precios: ["Contamos con un modelo modular: puedes empezar con un usuario por $3/mes. Para empresas, tenemos combos desde $60 que incluyen conectividad 5G, contabilidad automatizada y blindaje legal."],
  reto: ["En el Reto Inspira 2026, System Kyron se posiciona como el único ecosistema SaaS venezolano que une la rentabilidad empresarial con un impacto ambiental positivo medible."],
  ayuda: ["Puedo ayudarte a entender nuestros módulos SaaS, los planes de conectividad 5G, o cómo iniciar tu transición al modelo 'Cero Papel'."],
  bcv: ["System Kyron se sincroniza automáticamente con la tasa oficial del Banco Central de Venezuela para garantizar precisión en tu facturación y contabilidad multimoneda."]
};

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

    // 1. Lógica con Gemini
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if (stream) {
          // Versión Streaming
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
          // Versión JSON
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
          return NextResponse.json({ content: response.text(), provider: 'gemini-pro', status: 'success' });
        }
      } catch (aiError) {
        console.error('[AI-Engine-Warning] Failover to Deterministic:', aiError);
      }
    }

    // 2. Fallback Determinístico (No soporta stream real, lo emulamos si se pide)
    const query = lastMessage.toLowerCase();
    let fallback = "Como Kyron Core AI, analizo tu consulta. ¿Deseas saber cómo nuestro modelo 'Cero Papel' optimiza tu sostenibilidad o prefieres ver el área Contable?";
    
    if (query.includes('hola') || query.includes('buenos')) fallback = KNOWLEDGE_BASE.saludo[0];
    else if (query.includes('equipo') || query.includes('carlos') || query.includes('sebastian') || query.includes('marcos')) fallback = KNOWLEDGE_BASE.equipo[0];
    else if (query.includes('papel') || query.includes('sostenib') || query.includes('ecologi') || query.includes('ambiente')) fallback = KNOWLEDGE_BASE.sostenibilidad[0];
    else if (query.includes('seguro') || query.includes('shield')) fallback = KNOWLEDGE_BASE.seguridad[0];
    else if (query.includes('precio') || query.includes('plan')) fallback = KNOWLEDGE_BASE.precios[0];
    else if (query.includes('reto') || query.includes('inspira')) fallback = KNOWLEDGE_BASE.reto[0];
    else if (query.includes('ayuda')) fallback = KNOWLEDGE_BASE.ayuda[0];
    else if (query.includes('bcv') || query.includes('tasa') || query.includes('dolar')) fallback = KNOWLEDGE_BASE.bcv[0];

    if (stream) {
      const encoder = new TextEncoder();
      const s = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: fallback })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        }
      });
      return new NextResponse(s, { headers: { 'Content-Type': 'text/event-stream' } });
    }

    return NextResponse.json({ content: fallback, provider: 'kyron-nexus-v3', status: 'success' });

  } catch (error) {
    console.error('[AI-Engine-Critical-Error]', error);
    return NextResponse.json({ content: "El núcleo de Kyron está en mantenimiento preventivo. Por favor, intenta de nuevo en unos momentos.", status: 'offline' });
  }
}
