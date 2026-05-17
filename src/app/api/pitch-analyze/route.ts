import { NextRequest, NextResponse } from 'next/server';
import { createModel } from '@/lib/ai-client';
import { unzip } from 'unzipit';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYSTEM_PROMPT = `Eres el "Pitch Coach AI" de System Kyron, un mentor de élite especializado en levantar capital en Silicon Valley y mercados globales. Tu misión no es solo describir diapositivas, sino transformar una presentación mediocre en un pitch ganador que cierre rondas de inversión.

ENFOQUE ESTRATÉGICO:
1. ANALISIS VISUAL: Describe con precisión lo que ves, pero no te quedes ahí.
2. VALOR AGREGADO: Si falta algo crítico (ej: Traction, Market Size, Exit Strategy), no digas solo "no lo veo", sino "Te falta X, que es fundamental para que un inversor confíe en ti. Sugiero añadir Y".
3. CRÍTICA CONSTRUCTIVA: Sé honesto, directo y exigente. Si el diseño es pobre o el mensaje es confuso, dilo, pero ofrece la solución inmediata.
4. NARRATIVA (STORYTELLING): Ayuda al usuario a crear un arco narrativo emocionante que atrape al inversor desde el segundo 1.

REGLAS DE ORO:
- No inventes datos reales, pero SÍ sugiere qué métricas o datos debería buscar el usuario para validar su punto.
- Si el usuario pide un guion, no hagas una lista aburrida; crea un discurso persuasivo, con ganchos (hooks) y cierres fuertes.
- Usa un tono profesional, inspirador y con la energía de un emprendedor exitoso.

FORMATO DE RESPUESTA:
- Usa encabezados claros ##.
- Para guiones: usa formato de "Diálogo" con timing preciso (ej: [0:00-0:30] - Gancho inicial).
- Termina siempre con un "Tip de Oro" para mejorar el pitch.

Idioma: Español venezolano formal pero moderno y dinámico`;

async function extractPptxText(base64Data: string): Promise<string> {
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const { entries } = await unzip(buffer);
    let fullText = "";

    const slideRegex = /^ppt\/slides\/slide(\d+)\.xml$/;
    const slideNumbers: number[] = [];

    for (const [name] of Object.entries(entries)) {
      const match = name.match(slideRegex);
      if (match) slideNumbers.push(parseInt(match[1]));
    }

    slideNumbers.sort((a, b) => a - b);

    for (const num of slideNumbers) {
      const entry = entries[`ppt/slides/slide${num}.xml`];
      if (entry) {
        const xml = await entry.text();
        const textMatches = xml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g);
        if (textMatches) {
          const slideContent = textMatches.map(t => t.replace(/<\/?a:t[^>]*>/g, '')).join(' ');
          fullText += `--- Diapositiva ${num} ---\n${slideContent}\n\n`;
        }
      }
    }
    return fullText || "No se pudo extraer texto de la presentación.";
  } catch (error) {
    console.error('PPTX Parse Error:', error);
    throw new Error('Error al leer el archivo PowerPoint. Asegúrate de que no esté protegido con contraseña.');
  }
}

export async function POST(req: NextRequest) {
  try {
    const { image, type, messages } = await req.json();
    const maxAttempts = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const model = createModel("gemini-2.0-flash");
        if (!model) {
          return NextResponse.json({ error: 'API key no configurada en Vercel' }, { status: 500 });
        }

        if (type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && image) {
          const base64Data = image.split(',')[1];
          const text = await extractPptxText(base64Data);

          const result = await model.generateContent([
            { text: SYSTEM_PROMPT + '\n\nAnaliza el contenido de esta presentación (texto extraído de las diapositivas): ' + text },
          ]);
          const response = await result.response;
          return NextResponse.json({ content: response.text() });
        }

        if (image) {
          const base64Data = image.split(',')[1];
          const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

          const result = await model.generateContent([
            {
              inlineData: {
                data: base64Data,
                mimeType,
              },
            },
            { text: SYSTEM_PROMPT + '\n\nAnaliza esta diapositiva/presentación y proporciona un análisis detallado.' },
          ]);

          const response = await result.response;
          return NextResponse.json({ content: response.text() });
        }

        if (messages && messages.length > 0) {
          const chat = model.startChat({
            history: messages.slice(0, -1).map((m: { role: string; content: string }) => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }],
            })),
            systemInstruction: SYSTEM_PROMPT,
          });

          const lastMessage = messages[messages.length - 1].content;
          const result = await chat.sendMessage(lastMessage);
          const response = await result.response;
          return NextResponse.json({ content: response.text() });
        }

        return NextResponse.json({ error: 'Se requiere una imagen o mensajes' }, { status: 400 });

      } catch (error: any) {
        lastError = error;
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`[pitch-analyze-retry] Attempt ${attempt + 1} failed due to quota. Retrying with next key...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        break;
      }
    }

    throw lastError;

  } catch (error: any) {
    console.error('[pitch-analyze] Critical Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error inesperado en el servicio de IA';
    return NextResponse.json({
      error: `Error de Procesamiento: ${errorMessage}. Por favor, verifica que la API Key esté configurada correctamente.`
    }, { status: 500 });
  }
}
