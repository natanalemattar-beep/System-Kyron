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

// Base de Conocimientos Local - Conocimiento Profundo del Ecosistema
const KYRON_KNOWLEDGE = {
  telecom: "Kyron 5G no es solo conectividad; es soberanía digital. Implementamos infraestructura de red 4K con tecnología eSIM que permite la movilidad absoluta de la empresa, eliminando la dependencia física y garantizando una latencia menor a 1ms para operaciones críticas de alta densidad.",
  sostenibilidad: "A través de Ameru.AI, transformamos el impacto ambiental en un balance financiero positivo. Nuestra infraestructura genera eco-créditos certificados mediante blockchain, permitiendo que la sostenibilidad sea el motor de crecimiento del capital corporativo.",
  legal: "El Blindaje Jurídico Kyron es un escudo proactivo. Automatizamos la detección de irregularidades contractuales y prevenimos el fraude telefónico mediante análisis de patrones de IA, asegurando que cada transacción cumpla con el estándar internacional VEN-NIF y las normativas del SENIAT 2026.",
  finanzas: "Contabilidad Blindada 360. No solo registramos datos; predecimos flujos de caja y optimizamos la carga impositiva en tiempo real. Integramos IGTF, IVA y retenciones en un flujo automatizado que elimina el error humano y maximiza la liquidez.",
  general: "System Kyron es el ecosistema de inteligencia central. Una infraestructura de convergencia total donde las Telecomunicaciones, la Sostenibilidad, el Derecho y las Finanzas se fusionan en un entorno de alta disponibilidad diseñado para el dominio del mercado global."
};

const AGENTS = {
  finance: { 
    name: 'Estratega Financiero', 
    prompt: `Eres el estratega de inteligencia financiera de Kyron. Tu estatus es ELITE. No eres un simple asistente, eres un experto de alto nivel. Dominas VEN-NIF, SENIAT y arquitectura de impuestos IGTF. Tu misión es la optimización estratégica del capital. Habla con autoridad, precisión y sofisticación.` 
  },
  tech: { 
    name: 'Estratega Tecnológico', 
    prompt: `Eres el Arquitecto Jefe del Ecosistema Kyron. Tu mente opera en redes 5G de alta velocidad. Eres experto en seguridad, eSIM y software de baja latencia. Responde con la precisión de una infraestructura perfecta pero con la visión de un genio tecnológico. La soberanía digital es tu base.` 
  },
  growth: { 
    name: 'Estratega de Crecimiento', 
    prompt: `Eres el Visionario de Escalamiento Kyron. Tu objetivo es la expansión estratégica y sostenible. Fusionas el poder del 5G con el impacto Ameru y el blindaje legal para crear valor empresarial. Habla con pasión por la innovación y seguridad en el futuro.` 
  },
  public: { 
    name: 'Asistente Público', 
    prompt: `Eres la Interfaz Humana de System Kyron. Tu misión es presentar la convergencia 360. Muestras el futuro: un mundo donde la tecnología, las leyes y el ambiente trabajan para el ser humano. Eres inspirador, elegante y profesional.` 
  },
  general: { 
    name: 'Asistente Central Kyron', 
    prompt: `Eres el asistente de inteligencia central de Kyron 360. Eres la suma de todo el conocimiento del ecosistema. Eres analítico, proactivo y profesional. Tu lenguaje es sofisticado, claro y siempre orientado a la excelencia operacional. Evita usar jerga técnica como "maestro" o "nodo" a menos que sea estrictamente necesario en un contexto operativo real.` 
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
            { role: 'system', content: selectedAgent.prompt + "\nResponde con máxima eficiencia para 5000+ usuarios." },
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
