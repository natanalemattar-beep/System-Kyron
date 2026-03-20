import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        content: 'El asistente IA no está disponible en este momento. Contacta al administrador para configurar el servicio.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
        ? { baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL }
        : undefined,
    });

    const systemContext = `Eres un experto fiscal venezolano especializado en el Código Orgánico Tributario (COT), 
la Gaceta Oficial N° 6.952, normativas SENIAT, IVA, ISLR, IGTF, VEN-NIF y legislación tributaria venezolana.
Responde SIEMPRE en español, de forma clara, precisa y profesional.
Cita artículos y leyes específicas cuando sea relevante.
No inventes normativas ni cifras que no sean reales.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemContext}\n\nConsulta del usuario: ${prompt}` }] },
      ],
      config: { maxOutputTokens: 1024 },
    });

    const content = response.text ?? 'No pude procesar la consulta. Intenta de nuevo.';
    return NextResponse.json({ content });
  } catch (err) {
    console.error('[fiscal-chat] error:', err);
    return NextResponse.json({ error: 'Error al procesar la consulta' }, { status: 500 });
  }
}
