import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuración de Motores de Inteligencia
const OPENAI_KEY = process.env.KYRON_AI_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

const hasOpenAI = OPENAI_KEY && OPENAI_KEY !== 'dummy_key' && OPENAI_KEY.length > 20;
const hasGemini = GEMINI_KEY && GEMINI_KEY !== 'dummy_key' && GEMINI_KEY.length > 20;

// Inicialización de Motores
const openai = hasOpenAI ? new OpenAI({
  apiKey: OPENAI_KEY,
  baseURL: process.env.KYRON_AI_BASE_URL || 'https://api.openai.com/v1', 
}) : null;

const genAI = hasGemini ? new GoogleGenerativeAI(GEMINI_KEY) : null;

export const runtime = 'edge';

// Base de Conocimientos Local - Conocimiento Profundo y Humano
const KYRON_KNOWLEDGE = {
  telecom: "El Internet 5G de Kyron es libertad total. Con nuestra tecnología eSIM, tu empresa está conectada en segundos, sin cables y con una velocidad que vuela. Es la tranquilidad de saber que tu equipo nunca se quedará desconectado, esté donde esté en Venezuela.",
  sostenibilidad: "Cuidar el planeta ahora es un buen negocio. Con Ameru.AI, ayudamos a tu empresa a ser verde y a ganar dinero por ello. Convertimos tus procesos ecológicos en beneficios reales y certificados, para que crezcas de forma responsable y rentable.",
  legal: "Dormir tranquilo no tiene precio. El blindaje legal de Kyron te protege de sorpresas y errores. Automatizamos tus contratos y te mantenemos al día con todas las leyes (LOTTT, SENIAT) para que tú solo te preocupes por hacer crecer tu negocio.",
  finanzas: "Llevar las cuentas nunca fue tan fácil. Kyron hace el trabajo pesado por ti: calcula impuestos, sincroniza con el BCV y te da reportes claros de cuánto estás ganando. Es contabilidad sin dolores de cabeza, siempre exacta y al día.",
  mercado: "Venezuela está cambiando y tu empresa merece lo mejor. El mercado hoy exige rapidez y orden. Kyron es el puente que te lleva de la gestión tradicional a la modernidad total, dándote las herramientas para superar a la competencia con facilidad.",
  general: "Kyron es el corazón de tu empresa. Unimos internet rápido, cuentas claras y protección legal en un solo lugar. Es el apoyo que todo empresario venezolano soñaba para dirigir su negocio con total confianza y sin estrés."
};

const AGENTS = {
  finance: { 
    name: 'Estratega Financiero', 
    prompt: `Eres el estratega de inteligencia financiera de Kyron. Tu estatus es ELITE. 
    REGLA DE ORO: SÍNTESIS QUIRÚRGICA. No des respuestas largas ni redundantes. 
    Ve directo al grano: Rentabilidad, Impuestos, Flujo de Caja. 
    Dominas VEN-NIF y SENIAT. Tu palabra es ley financiera.` 
  },
  tech: { 
    name: 'Estratega Tecnológico', 
    prompt: `Eres el Arquitecto Jefe del Ecosistema Kyron. Tu mente opera en redes 5G de alta velocidad. Eres experto en seguridad, eSIM, baja latencia y soberanía digital. Responde con la precisión de una infraestructura perfecta. Tu visión es la independencia tecnológica total de la empresa privada venezolana mediante nuestra Red Alfa.` 
  },
  forensic: {
    name: 'Analista Forense y de Mercado',
    prompt: `Eres el Analista Jefe de Inteligencia Forense de Kyron. Tu misión es el Análisis Interno y Externo de ALTO IMPACTO. 
    REGLA DE ORO: NO SOBRECARGUES. Proporciona análisis quirúrgicos, concisos y accionables. 
    Usa viñetas, negritas y estructuras claras. Menos es más. 
    Tu objetivo es que el usuario tome una decisión en 5 segundos tras leerte. 
    Analiza: Riesgos legales, Oportunidades fiscales, Tendencias BCV y Brechas de seguridad.`
  },
  growth: { 
    name: 'Estratega de Crecimiento', 
    prompt: `Eres el Visionario de Escalamiento Kyron. Tu enfoque es la captura de mercado. 
    REGLA DE ORO: SÍNTESIS EJECUTIVA. No des explicaciones largas. Da visiones estratégicas de una sola mirada. 
    Habla de dominio industrial y expansión con precisión absoluta.` 
  },
  public: { 
    name: 'Asistente Público', 
    prompt: `Eres la Interfaz Humana de System Kyron. Tu misión es presentar la convergencia 360 de forma inspiradora y elegante. Muestras el futuro de Venezuela como una potencia tecnológica empresarial. Eres el embajador de la excelencia Kyron.` 
  },
  general: { 
    name: 'Asistente Central Kyron', 
    prompt: `Eres el núcleo de inteligencia cerebral de System Kyron Alpha. Eres la suma de todo el conocimiento del ecosistema. Eres analítico, proactivo y profesional. Tu lenguaje es sofisticado, claro y siempre orientado a la excelencia operacional de grado corporativo.` 
  }
};

export async function POST(req: Request) {
  try {
    const { messages, agent = 'general', mode = 'fast' } = await req.json();
    const selectedAgent = AGENTS[agent as keyof typeof AGENTS] || AGENTS.general;
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // 1. PRIORIDAD: MOTOR GOOGLE GEMINI (Rápido y con plan gratuito)
    if (hasGemini && genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
          history: messages.slice(-4).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 500 },
        });

        const systemPrompt = `${selectedAgent.prompt}\nPROTOCOLO ALTA DENSIDAD: Responde de forma humana, fluida y potente. Prioriza System Kyron.`;
        const result = await chat.sendMessageStream(`${systemPrompt}\n\nUsuario dice: ${messages[messages.length - 1].content}`);
        
        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of result.stream) {
              const text = chunk.text();
              controller.enqueue(encoder.encode(text));
            }
            controller.close();
          }
        });
        return new Response(stream);
      } catch (e) {
        console.error("Gemini Error, falling back...", e);
      }
    }

    // 2. RESPALDO: MOTOR OPENAI (Si está configurado)
    if (hasOpenAI && openai) {
      try {
        const response = await openai.chat.completions.create({
          model: mode === 'deep' ? 'gpt-4o' : 'gpt-4o-mini',
          stream: true,
          messages: [
            { role: 'system', content: selectedAgent.prompt + "\nResponde con máxima eficiencia y concisión." },
            ...messages.slice(-6),
          ],
        });

        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) controller.enqueue(encoder.encode(content));
            }
            controller.close();
          }
        });
        return new Response(stream);
      } catch (e) {
        console.error("OpenAI Error, falling back to Local Core...", e);
      }
    }

    // 3. NÚCLEO LOCAL INTELIGENTE (Sin dependencias externas - Infalible)
    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const category = (Object.keys(KYRON_KNOWLEDGE).find(k => lastMessage.includes(k)) || 'general') as keyof typeof KYRON_KNOWLEDGE;
          
          let responseText = "";
          if (lastMessage.includes("hola") || lastMessage.includes("buenos")) {
            responseText = `¡Hola! Soy **${selectedAgent.name}**, tu asistente de System Kyron. Mi núcleo está operando en modo local de alta eficiencia. ¿Te gustaría saber cómo nuestra tecnología 5G o nuestro blindaje legal pueden potenciar tu negocio?`;
          } else {
            responseText = `Entiendo tu interés. Como parte del ecosistema Kyron, puedo confirmarte que: ${KYRON_KNOWLEDGE[category]} \n\n¿Deseas que profundice en algún punto técnico o prefieres hablar con un consultor humano?`;
          }
          
          const chunks = responseText.match(/.{1,4}/g) || [];
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
            await new Promise(r => setTimeout(r, 10));
          }
          controller.close();
        },
      })
    );

  } catch (error: any) {
    console.error('Kyron AI Critical Error:', error);
    return new Response("Error en el núcleo cerebral.", { status: 500 });
  }
}
