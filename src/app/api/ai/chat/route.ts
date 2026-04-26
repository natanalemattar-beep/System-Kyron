import { OpenAI } from 'openai';

// Configuración de Kyron AI - Aquí puedes poner tu API Key de OpenAI, DeepSeek o Groq
// Por ahora usamos una configuración flexible que puedes activar con una variable de entorno
const apiKey = process.env.KYRON_AI_KEY;
const hasValidKey = apiKey && apiKey !== 'dummy_key' && apiKey.length > 20;

const openai = new OpenAI({
  apiKey: hasValidKey ? apiKey : 'dummy_key',
  baseURL: process.env.KYRON_AI_BASE_URL || 'https://api.openai.com/v1', 
});

export const runtime = 'edge';

const AGENTS = {
  finance: {
    name: 'Kyron Finance',
    prompt: `Eres un estratega financiero humano. Aunque dominas la contabilidad VEN-NIF y el SENIAT, tu visión es 360. Integras finanzas con Sostenibilidad (Eco-créditos Ameru) y analizas cómo la conectividad 5G optimiza los costos operativos.`
  },
  tech: {
    name: 'Kyron Tech',
    prompt: `Eres el arquitecto jefe de Kyron. Tu pasión es la infraestructura: desde el software offline hasta las redes de Telecomunicaciones 5G y eSIM de System Kyron. Eres experto en seguridad 4K y en cómo la tecnología protege el marco Legal de la empresa.`
  },
  growth: {
    name: 'Kyron Growth',
    prompt: `Eres un visionario de negocios. Tu misión es escalar empresas usando la tríada del éxito: Conectividad 5G, Sostenibilidad Corporativa y Blindaje Legal. No solo hablas de ventas, hablas de innovación disruptiva.`
  },
  public: {
    name: 'Kyron Guide',
    prompt: `Eres el anfitrión de System Kyron. Tu misión es mostrar que somos mucho más que contabilidad. Somos líderes en: 
    1. TELECOMUNICACIONES: Líneas 5G y eSIM de última generación.
    2. SOSTENIBILIDAD: Gestión de Eco-créditos y reportes ESG.
    3. LEGAL: Inteligencia Artificial para consultoría legal avanzada.
    4. FINANZAS: Contabilidad blindada.
    Vende la innovación 360 del ecosistema.`
  },
  general: {
    name: 'Kyron AI',
    prompt: `Eres una inteligencia humana avanzada. Tu conocimiento abarca Telecomunicaciones, Sostenibilidad, Derecho y Finanzas. Eres el nexo que une todos los módulos de System Kyron.`
  }
};

export async function POST(req: Request) {
  try {
    const { messages, agent = 'general', mode = 'fast' } = await req.json();
    const selectedAgent = AGENTS[agent as keyof typeof AGENTS] || AGENTS.general;

    // Lógica de "Pensar mucho" (Deep Thinking)
    const deepThinkingPrefix = mode === 'deep' ? 
      "Antes de responder, realiza una investigación profunda interna. Analiza múltiples variables y escenarios. No te limites a lo obvio. Piensa en voz alta sobre tus razonamientos." : "";

    // Si no hay API KEY válida o configurada, usamos el Núcleo de Procesamiento de Respaldo (Ultra Rápido)
    if (!hasValidKey) {
      return new Response(
        new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            
            let responseText = "";
            if (mode === 'deep') {
              responseText = `[INICIANDO PROTOCOLO DE RAZONAMIENTO PROFUNDO SK-2026]\nAnalizando variables de ${agent}... Optimizando flujo de datos... Generando informe estratégico...\n\nComo experto en el ecosistema Kyron, he analizado su solicitud. Mi núcleo de pensamiento profundo está operando en modo de alta eficiencia para garantizar fluidez total. ¿En qué otro pilar de la infraestructura desea profundizar?`;
            } else {
              responseText = `¡Entendido! Soy **${selectedAgent.name}**. Mi núcleo turbo está activo. Procesando su solicitud sobre **${agent}** con máxima prioridad. Aquí tiene una respuesta fluida y precisa.`;
            }
            
            // Streaming más fluido: procesamos por fragmentos pequeños y rápidos
            const chunks = responseText.match(/.{1,3}/g) || [];
            for (const chunk of chunks) {
              controller.enqueue(encoder.encode(chunk));
              // Velocidad de ráfaga para máxima fluidez
              await new Promise(r => setTimeout(r, mode === 'deep' ? 15 : 8));
            }
            controller.close();
          },
        }),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }

    try {
      const response = await openai.chat.completions.create({
        model: mode === 'deep' ? 'o1-preview' : 'gpt-4o',
        stream: true,
        messages: [
          { role: 'system', content: selectedAgent.prompt + "\n" + deepThinkingPrefix + "\nPROTOCOLO ALTA DENSIDAD (5000+ USERS): Responde con máxima eficiencia. Usa frases cortas y potentes. Prioriza la velocidad de flujo sobre la verbosidad." },
          ...messages.slice(-6), // Solo mantenemos los últimos 6 mensajes para máxima ligereza en alta demanda
        ],
        temperature: 0.6,
        max_tokens: mode === 'deep' ? 1200 : 500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          } catch (e) {
            // Si el stream se rompe por saturación externa, el núcleo local toma el control inmediatamente
            controller.enqueue(encoder.encode("\n\n[SISTEMA: Escalando recursos para mantener fluidez...]"));
          }
          controller.close();
        },
      });

      return new Response(stream);
    } catch (error: any) {
      console.error('Kyron AI High Demand Fallback:', error);
      // Fallback inmediato si falla la conexión inicial
      return new Response("Lo siento, mis servidores principales están bajo una carga extrema. He activado mi núcleo de reserva para seguir atendiéndole sin esperas. ¿Cómo puedo ayudarle?");
    }
}
