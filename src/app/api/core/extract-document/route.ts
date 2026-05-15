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

        const mimeMatch = image.match(/^data:([a-z]+\/[a-z0-9+.-]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        if (!mimeType.startsWith('image/')) {
            return NextResponse.json({ error: 'Solo se admiten imágenes (JPG, PNG, WebP). Los archivos PDF no son compatibles con el escáner de documentos.' }, { status: 400 });
        }
        const imageData = image.includes('base64,') ? image.split('base64,')[1] : image;

        // 1. ANALIZAR DOCUMENTO CON GEMINI (extraer número + verificar autenticidad)
        const analysisPrompt = type === 'cedula'
            ? `Eres un perito en documentoscopia del SAIME. Analiza esta imagen de una cédula de identidad venezolana.

Tareas:
1. Extrae el número de cédula y su letra (V o E)
2. Evalúa la autenticidad del documento buscando: bordes cortados, alteraciones digitales, texto distorsionado, colores incorrectos, falta de elementos de seguridad, fondos irregulares
3. Determina si es ORIGINAL, SOSPECHOSO o FALSO

Responde ÚNICAMENTE en este JSON (sin texto adicional):
{
  "number": "12345678",
  "prefix": "V",
  "autenticidad": "ORIGINAL" | "SOSPECHOSO" | "FALSO",
  "confianza": 0-100,
  "hallazgos": ["lista de anomalías detectadas o vacío si es original"],
  "nombre_completo": "nombre visible en el documento si se puede leer",
  "fecha_nacimiento": "fecha si visible"
}`
            : `Eres un perito en documentoscopia del SENIAT. Analiza esta imagen de un RIF venezolano.

Tareas:
1. Extrae el número de RIF y su letra (J, G, C, F, V, E)
2. Evalúa la autenticidad del documento buscando: bordes cortados, alteraciones digitales, texto distorsionado, colores incorrectos, falta de elementos de seguridad, fondos irregulares
3. Determina si es ORIGINAL, SOSPECHOSO o FALSO

Responde ÚNICAMENTE en este JSON (sin texto adicional):
{
  "number": "123456789",
  "prefix": "J",
  "autenticidad": "ORIGINAL" | "SOSPECHOSO" | "FALSO",
  "confianza": 0-100,
  "hallazgos": ["lista de anomalías detectadas o vacío si es original"],
  "razon_social": "razón social visible si se puede leer"
}`;

        const result = await model.generateContent([
            { text: analysisPrompt },
            { inlineData: { mimeType, data: imageData } },
        ]);

        const response = await result.response;
        const text = response.text().trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return NextResponse.json({ error: 'No se pudo analizar el documento' }, { status: 422 });
        }

        const analysis = JSON.parse(jsonMatch[0]);
        const cleanNumber = (analysis.number || '').replace(/\D/g, '');
        const prefix = analysis.prefix || (type === 'cedula' ? 'V' : 'J');

        if (!cleanNumber) {
            return NextResponse.json({ error: 'No se detectó número en la imagen' }, { status: 422 });
        }

        const fullDoc = `${prefix}-${cleanNumber}`;

        // 2. CONSULTAR BASE DE DATOS (SAIME para cédula, SENIAT para RIF)
        let dbData: any = null;
        let dbError: string | null = null;

        try {
            if (type === 'cedula') {
                const saimeRes = await fetch(`${req.nextUrl.origin}/api/cedula/consulta?cedula=${encodeURIComponent(fullDoc)}`);
                if (saimeRes.ok) {
                    dbData = await saimeRes.json();
                } else {
                    dbError = 'SAIME no disponible en este momento';
                }
            } else {
                const seniatRes = await fetch(`${req.nextUrl.origin}/api/rif/consulta?rif=${encodeURIComponent(fullDoc)}`);
                if (seniatRes.ok) {
                    dbData = await seniatRes.json();
                } else {
                    dbError = 'SENIAT no disponible en este momento';
                }
            }
        } catch {
            dbError = 'Error de conexión con la base de datos';
        }

        // 3. CONSTRUIR RESPUESTA
        const responseData: any = {
            number: cleanNumber,
            prefix,
            fullDocument: fullDoc,
            autenticidad: analysis.autenticidad || 'NO_VERIFICADO',
            confianza: analysis.confianza || 0,
            hallazgos: analysis.hallazgos || [],
        };

        if (analysis.nombre_completo) responseData.nombreCompleto = analysis.nombre_completo;
        if (analysis.razon_social) responseData.razonSocial = analysis.razon_social;
        if (analysis.fecha_nacimiento) responseData.fechaNacimiento = analysis.fecha_nacimiento;

        if (dbData) {
            responseData.db = dbData;
        }
        if (dbError) {
            responseData.dbError = dbError;
        }

        return NextResponse.json(responseData);
    } catch (error) {
        console.error('[extract-document] Error:', error);
        return NextResponse.json({ error: 'Error al procesar el documento' }, { status: 500 });
    }
}