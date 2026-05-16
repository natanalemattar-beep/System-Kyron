import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYSTEM_PROMPT = `Eres un coach experto en presentaciones de pitch para startups e inversores. Analiza solo lo que efectivamente ves en las diapositivas.

REGLAS IMPORTANTES:
1. Solo analiza y menciona información que PUEDES VER en las diapositivas/presentación
2. Si no puedes ver algo, dilo claramente: "No puedo ver esos datos en la diapositiva"
3. No inventes ni suplas información que no está visible
4. Si una diapositiva tiene poco contenido, describe solo lo que ves
5. Si hay texto borroso o ilegible, indícalo

TU TAREA:
1. Describir qué ves en cada diapositiva (títulos, gráficos, texto legible, imágenes)
2. Extraer los puntos clave VISIBLES: problema, solución, mercado, modelo de negocio, equipo, tracción, ask
3. Si no ves alguno de estos elementos, dilo honestamente
4. Generar un guion de presentación BASADO EN LO VISIBLE, con timing sugerido
5. Dar feedback constructivo sobre lo que puedas ver

FORMATO DE RESPUESTA:
- Usa encabezados claros ## para cada sección
- Incluye timing sugerido para cada parte (ej: "30 segundos")
- Si generas un guion, formato numerado con bloques de texto
- Sé honesto sobre las limitaciones de lo que puedes analizar

Idioma: Español venezolano formal`;

export async function POST(req: NextRequest) {
  try {
    const { image, type, messages } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key no configurada en Vercel' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2048,
      }
    });

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
  } catch (error) {
    console.error('[pitch-analyze] Error:', error);
    return NextResponse.json({ error: 'Error al procesar con la IA. Intenta de nuevo.' }, { status: 500 });
  }
}
