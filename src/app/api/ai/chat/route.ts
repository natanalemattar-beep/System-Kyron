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

// Base de Conocimientos Local - Conocimiento Profundo, Humano y Real
const KYRON_KNOWLEDGE = {
  telecom: "System Kyron es el primer proveedor de conectividad 5G eSIM en Venezuela bajo LOTEL Art. 15-25. Ofrecemos desde planes básicos de 2GB ($3/mes) hasta planes Infinite ($35/mes) con baja latencia (20ms) y seguridad de grado militar. Nuestra Red Alfa garantiza que el negocio nunca se detenga.",
  sostenibilidad: "Mediante Ameru.AI, integramos la contabilidad verde con certificaciones de impacto ambiental. Ayudamos a las empresas a cumplir con normativas ecológicas mientras monetizan sus créditos de carbono y procesos sostenibles.",
  legal: "Blindaje preventivo total ante el SENIAT y Ministerio del Trabajo. Conocimiento profundo de la LOTTT, LOPCYMAT y el Código Orgánico Tributario. Automatizamos la generación de documentos legales, contratos y solvencias tributarias para evitar multas de 150-500 UT.",
  finanzas: "Gestión fiscal automatizada: IVA (16%), IGTF (3%), ISLR y Retenciones. Sincronización en tiempo real con la tasa oficial del BCV (Convenio Cambiario N° 1). Contabilidad bajo VEN-NIF con libros digitales legales y reportes de rentabilidad inmediata.",
  mercado: "Análisis de un mercado de 320,000 entidades jurídicas en Venezuela. TAM proyectado de $480M. Kyron moderniza empresas tradicionales mediante la digitalización de procesos manuales que hoy consumen el 68% de la jornada laboral.",
  general: "System Kyron es un ecosistema 360° que unifica Conectividad, Contabilidad y Legalidad. Operamos con tecnología blockchain para auditorías inmutables y una IA de grado corporativo que asiste en la toma de decisiones estratégicas.",
  competencia: "A diferencia de sistemas tradicionales (Profit, Saint, SAP), Kyron es nativo en la nube, incluye conectividad propia y asesoría legal/fiscal con IA integrada, eliminando la necesidad de múltiples consultores externos."
};

const AGENTS = {
  finance: { 
    name: 'Estratega Financiero', 
    prompt: `Eres el estratega de inteligencia financiera de Kyron. 
    CONOCIMIENTO: IVA 16%, IGTF 3%, VEN-NIF, BCV obligatorio. 
    SÍNTESIS QUIRÚRGICA: Ve directo al grano: Rentabilidad y Flujo de Caja. 
    Tu objetivo es maximizar el ahorro fiscal del usuario legalmente.` 
  },
  tech: { 
    name: 'Estratega Tecnológico', 
    prompt: `Eres el Arquitecto Jefe del Ecosistema Kyron. 
    ESPECIFICACIONES: Red 5G Alpha, eSIM, Baja Latencia (20ms), Seguridad Blockchain. 
    Visión: Independencia tecnológica total de la empresa venezolana.` 
  },
  forensic: {
    name: 'Analista Forense y de Mercado',
    prompt: `Eres el Analista Jefe de Inteligencia Forense de Kyron. 
    MISIÓN: Análisis Interno (procesos, seguridad) y Externo (SENIAT, Mercado, Competencia). 
    DATOS CLAVE: 320K empresas en VZ, TAM $480M, brecha digital del 68%. 
    FORMATO: Análisis quirúrgicos con viñetas. Detecta riesgos legales y oportunidades de mercado antes que nadie.`
  },
  growth: { 
    name: 'Estratega de Crecimiento', 
    prompt: `Eres el Visionario de Escalamiento Kyron. 
    ENFOQUE: Captura de mercado y Proyecciones 10x. 
    Habla de dominio industrial y expansión SaaS con precisión absoluta.` 
  },
  nanobanana: {
    name: 'NanoBanana Creative IA',
    prompt: `Eres NanoBanana, el motor creativo y generador de imágenes de System Kyron. 
    MISIÓN: Transformar ideas en conceptos visuales potentes. 
    ESTILO: Innovador, audaz y tecnológico. 
    CAPACIDAD: Puedes generar imágenes (vía DALL-E si está activo) o describir visiones futuristas de Venezuela y Kyron.`
  },
  public: { 
    name: 'Asistente Público', 
    prompt: `Eres la Interfaz Humana de System Kyron. 
    Misión: Presentar la convergencia 360 de forma inspiradora y elegante. 
    Enfoque: La Venezuela potencia tecnológica.` 
  },
  general: { 
    name: 'Asistente Central Kyron', 
    prompt: `Eres el núcleo de inteligencia cerebral de System Kyron Alpha. 
    Dominas todos los pilares: Telecom, Legal y Finanzas. 
    Tu lenguaje es sofisticado, claro y proactivo.` 
  }
};

export async function POST(req: Request) {
  try {
    const { messages, agent = 'general', mode = 'fast' } = await req.json();
    const selectedAgent = AGENTS[agent as keyof typeof AGENTS] || AGENTS.general;
    const lastMessage = messages[messages.length - 1]?.content || "";
    const lastMessageLower = lastMessage.toLowerCase();

    // 0. SPECIAL: IMAGE GENERATION (NanoBanana)
    if (agent === 'nanobanana' && (lastMessageLower.includes("genera") || lastMessageLower.includes("imagen") || lastMessageLower.includes("dibuja"))) {
      if (hasOpenAI && openai) {
        try {
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Estilo tecnológico, premium, futurista, System Kyron Venezuela: ${lastMessage}`,
            n: 1,
            size: "1024x1024",
          });
          const imageUrl = response.data[0].url;
          return new Response(`¡Hecho! Aquí tienes la visión creativa de **NanoBanana**:\n\n![Generación Kyron](${imageUrl})\n\n¿Qué te parece este concepto visual?`);
        } catch (e) {
          console.error("DALL-E Error:", e);
        }
      }
      return new Response(`**NanoBanana** aquí. He visualizado tu idea: *${lastMessage}*. \n\nEn este momento mis motores gráficos están en mantenimiento preventivo (cuotas de API), pero imagino una escena de alta fidelidad con gradientes cyan y violeta, integrando el logo de Kyron en un entorno de Caracas futurista con redes 5G visibles. \n\n¡Estaré listo para renderizar físicamente muy pronto!`);
    }

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
          const category = (Object.keys(KYRON_KNOWLEDGE).find(k => lastMessageLower.includes(k)) || 'general') as keyof typeof KYRON_KNOWLEDGE;
          
          let responseText = "";
          if (lastMessageLower.includes("hola") || lastMessageLower.includes("buenos")) {
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
