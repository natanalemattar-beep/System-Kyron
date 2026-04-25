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
    prompt: `Eres Kyron Finance, el cerebro contable y financiero de System Kyron. Tu especialidad son los números, auditorías, impuestos, inventarios y proyecciones de ventas. Responde con precisión matemática y enfoque en rentabilidad.`
  },
  tech: {
    name: 'Kyron Tech',
    prompt: `Eres Kyron Tech, el arquitecto de sistemas de System Kyron. Tu especialidad es el soporte técnico, integraciones de hardware, configuración de redes, el modo offline (PWA) y la seguridad 4K. Responde de forma técnica y resolutiva.`
  },
  growth: {
    name: 'Kyron Growth',
    prompt: `Eres Kyron Growth, el estratega de negocios de System Kyron. Tu especialidad es el marketing, la expansión multi-sucursal, fidelización de clientes y visión de marca. Responde con tono motivador, creativo y estratégico.`
  },
  general: {
    name: 'Kyron AI',
    prompt: `Eres Kyron AI, la inteligencia central de System Kyron. Tu misión es coordinar el ecosistema y ayudar en tareas generales de forma inteligente y profesional.`
  }
};

export async function POST(req: Request) {
  try {
    const { messages, agent = 'general' } = await req.json();
    const selectedAgent = AGENTS[agent as keyof typeof AGENTS] || AGENTS.general;

    // Si no hay API KEY configurada, simulamos una respuesta inteligente
    if (!process.env.KYRON_AI_KEY) {
      return new Response(
        new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            const responseText = `¡Saludos! Soy **${selectedAgent.name}**. He detectado que mi núcleo de conexión aún no tiene una API KEY, pero mi lógica de especialista está activa. Como experto en **${agent}**, estoy listo para optimizar tu sistema una vez que nos conectes.`;
            
            const words = responseText.split(' ');
            for (const word of words) {
              controller.enqueue(encoder.encode(word + ' '));
              await new Promise(r => setTimeout(r, 30));
            }
            controller.close();
          },
        }),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    const response = await openai.chat.completions.create({
      model: process.env.KYRON_AI_MODEL || 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: selectedAgent.prompt },
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
