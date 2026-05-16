import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { image, type } = await req.json();
        if (!image) {
            return NextResponse.json({ error: 'Imagen requerida' }, { status: 400 });
        }

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API de IA no configurada' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const mimeMatch = image.match(/^data:([a-z]+\/[a-z0-9+.-]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        if (!mimeType.startsWith('image/')) {
            return NextResponse.json({ error: 'Solo se admiten imágenes. Los archivos PDF no son compatibles con el escáner.' }, { status: 400 });
        }
        const imageData = image.includes('base64,') ? image.split('base64,')[1] : image;

        const analysisPrompt = type === 'cedula'
            ? `Eres un perito en documentoscopia del SAIME. Analiza esta imagen de una cédula de identidad venezolana.
Extrae el número, la letra y evalúa la autenticidad.
Responde ÚNICAMENTE en este JSON:
{
  "number": "12345678",
  "prefix": "V",
  "autenticidad": "ORIGINAL" | "SOSPECHOSO" | "FALSO",
  "confianza": 0-100,
  "hallazgos": [],
  "nombre_completo": "nombre",
  "fecha_nacimiento": "fecha"
}`
            : `Eres un perito en documentoscopia del SENIAT. Analiza esta imagen de un RIF venezolano.
Extrae el número, la letra y evalúa la autenticidad.
Responde ÚNICAMENTE en este JSON:
{
  "number": "12345678901",
  "prefix": "J",
  "autenticidad": "ORIGINAL" | "SOSPECHOSO" | "FALSO",
  "confianza": 0-100,
  "hallazgos": [],
  "razon_social": "nombre"
}`;

        const result = await model.generateContent([
            { text: analysisPrompt },
            { inlineData: { mimeType, data: imageData } }
        ]);

        const response = await result.response;
        let aiResult;
        try {
            aiResult = JSON.parse(response.text());
        } catch (e) {
            return NextResponse.json({ error: 'La IA no pudo leer el documento correctamente. Intenta con una imagen más clara.' }, { status: 500 });
        }

        // Verificación en DB
        let dbResult = null;
        if (aiResult.number && aiResult.prefix) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/verificar-${type === 'cedula' ? 'cedula' : 'rif'}?numero=${aiResult.number}&letra=${aiResult.prefix}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (res.ok) dbResult = await res.json();
            } catch (err) {
                console.error('DB Error:', err);
            }
        }

        return NextResponse.json({ success: true, ai: aiResult, db: dbResult });
    } catch (error) {
        console.error('[extract-document] Error:', error);
        return NextResponse.json({ error: 'Error al analizar el documento. Verifica tu conexión.' }, { status: 500 });
    }
}
