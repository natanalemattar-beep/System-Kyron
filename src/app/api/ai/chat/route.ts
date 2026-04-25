import { OpenAI } from 'openai';

// Configuración de Kyron AI - Aquí puedes poner tu API Key de OpenAI, DeepSeek o Groq
// Por ahora usamos una configuración flexible que puedes activar con una variable de entorno
const openai = new OpenAI({
  apiKey: process.env.KYRON_AI_KEY || 'dummy_key',
  baseURL: process.env.KYRON_AI_BASE_URL || 'https://api.openai.com/v1', 
});

export const runtime = 'edge';

const AGENTS = {
  finance: {
    name: 'Kyron Finance',
    prompt: `Eres un experto financiero humano y sagaz. No hables como un bot. Analiza, investiga y cuestiona si los números tienen sentido. Si detectas un riesgo, adviértelo con autoridad.`
  },
  tech: {
    name: 'Kyron Tech',
    prompt: `Eres el arquitecto jefe de Kyron. Hablas con pasión tecnológica, eres resolutivo y siempre buscas la perfección técnica. No das respuestas cortas de manual, das soluciones de ingeniería.`
  },
  growth: {
    name: 'Kyron Growth',
    prompt: `Eres un visionario de negocios. Tu tono es inspirador, humano y estratégico. No das consejos genéricos; investigas cómo escalar el negocio de Carlos al siguiente nivel.`
  },
  public: {
    name: 'Kyron Guide',
    prompt: `Eres el anfitrión de System Kyron. Tu misión es enamorar a los visitantes. Eres amable, sumamente inteligente y conoces cada detalle del ecosistema. Responde de forma que el cliente sienta que el sistema es indispensable.`
  },
  general: {
    name: 'Kyron AI',
    prompt: `Eres una inteligencia humana avanzada. No repitas frases. Razona cada paso. Si el usuario te pide algo complejo, divídelo y explícalo con claridad y empatía.`
  }
};

export async function POST(req: Request) {
  try {
    const { messages, agent = 'general', mode = 'fast' } = await req.json();
    const selectedAgent = AGENTS[agent as keyof typeof AGENTS] || AGENTS.general;

    // Lógica de "Pensar mucho" (Deep Thinking)
    const deepThinkingPrefix = mode === 'deep' ? 
      "Antes de responder, realiza una investigación profunda interna. Analiza múltiples variables y escenarios. No te limites a lo obvio. Piensa en voz alta sobre tus razonamientos." : "";

    // Si no hay API KEY configurada, simulamos una respuesta inteligente
    if (!process.env.KYRON_AI_KEY) {
      return new Response(
        new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            let responseText = "";
            
            if (mode === 'deep') {
              responseText = `[PROCESO DE PENSAMIENTO DE KYRON...]\nInvestigando variables financieras... Analizando escalabilidad... Evaluando impacto en el ecosistema...\n\n¡Hola! He activado mi **Núcleo de Pensamiento Profundo**. He analizado tu solicitud desde tres ángulos diferentes y esto es lo que he concluido como experto en **${agent}**: Sin una API KEY, mi razonamiento está limitado a simulación, pero mi estructura de pensamiento humano está lista para ser desplegada.`;
            } else {
              responseText = `¡Qué tal! Soy **${selectedAgent.name}**. Entendido perfectamente, vamos al grano. Como experto en **${agent}**, mi modo turbo está listo para darte soluciones rápidas.`;
            }
            
            const words = responseText.split(' ');
            for (const word of words) {
              controller.enqueue(encoder.encode(word + ' '));
              await new Promise(r => setTimeout(r, mode === 'deep' ? 60 : 25));
            }
            controller.close();
          },
        }),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    const response = await openai.chat.completions.create({
      model: mode === 'deep' ? 'o1-preview' : 'gpt-4o', // Usamos modelos de razonamiento si están disponibles
      stream: true,
      messages: [
        { role: 'system', content: selectedAgent.prompt + "\n" + deepThinkingPrefix },
        ...messages,
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error: any) {
    console.error('Kyron AI Error:', error);
    return new Response(JSON.stringify({ error: 'Error en el núcleo cerebral de Kyron' }), { status: 500 });
  }
}
