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
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const imageData = image.includes('base64,') ? image.split('base64,')[1] : image;

        const prompt = type === 'cedula'
            ? `Analiza esta imagen de una cédula de identidad venezolana. Extrae ÚNICAMENTE el número de cédula y su letra (V, E). Responde en JSON: {"number": "12345678", "prefix": "V"}. Sin texto adicional.`
            : `Analiza esta imagen de un RIF venezolano. Extrae ÚNICAMENTE el número de RIF y su letra (J, G, C, F, V). Responde en JSON: {"number": "123456789", "prefix": "J"}. Sin texto adicional.`;

        const result = await model.generateContent([
            { text: prompt },
            { inlineData: { mimeType: 'image/jpeg', data: imageData } },
        ]);

        const response = await result.response;
        const text = response.text().trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json({ error: 'No se pudo leer el documento' }, { status: 422 });
        }

        const data = JSON.parse(jsonMatch[0]);
        if (!data.number) {
            return NextResponse.json({ error: 'No se detectó número en la imagen' }, { status: 422 });
        }

        return NextResponse.json({ number: data.number.replace(/\D/g, ''), prefix: data.prefix || (type === 'cedula' ? 'V' : 'J') });
    } catch (error) {
        console.error('[extract-document] Error:', error);
        return NextResponse.json({ error: 'Error al procesar la imagen' }, { status: 500 });
    }
}