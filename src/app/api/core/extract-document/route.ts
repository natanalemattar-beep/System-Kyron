import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/client";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, type } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Imagen requerida en base64" }, { status: 400 });
    }

    const rawSize = Math.round((image.length * 3) / 4);
    if (rawSize > MAX_IMAGE_SIZE) {
      return NextResponse.json({ error: "La imagen excede el tamaño máximo de 20MB" }, { status: 400 });
    }

    const docType = type === "rif" ? "RIF (Registro de Información Fiscal)" : "Cédula de Identidad Venezolana";

    const prompt = `Eres un perito documentológico experto en documentos de identidad venezolanos. Analiza la imagen con el máximo rigor forense y extrae la información.

DOCUMENTO A ANALIZAR: ${docType}

INSTRUCCIONES DE ANÁLISIS — SIGUE CADA PASO OBLIGATORIAMENTE:

1. **ESCANEO VISUAL DETALLADO**: Examina la imagen píxel por píxel. Identifica el tipo de documento (cédula laminada, cédula verde, RIF, pasaporte), el formato, los colores, las tipografías, los sellos de seguridad y los hologramas.

2. **EXTRACCIÓN EXACTA DEL NÚMERO**: Lee el número de documento con precisión quirúrgica. Revisa cada dígito individualmente. Si hay alguna ambigüedad, repórtala en hallazgos.

3. **DETERMINACIÓN DEL PREFIJO**: Identifica el prefijo exacto:
   - V = Venezolano (cédula verde o laminada, fondo tricolor)
   - E = Extranjero (cédula de residente, fondo rosado/beige)
   - J = Jurídico (RIF de empresa, fondo blanco con borde azul)
   - G = Gobierno (RIF de organismo público)
   - C = Comunal (RIF de consejo comunal)
   - F = Firma Personal (RIF de persona natural con actividad comercial)
   - P = Pasaporte (documento de viaje, formato internacional)

4. **ANÁLISIS DE AUTENTICIDAD** (muy riguroso):
   - ORIGINAL: El documento tiene todos los elementos de seguridad visibles (hologramas, microtextos, fondos degradados, sellos oficiales, tipografía correcta del SAIME/SENIAT, foto con sello troquelado). Sin signos de alteración.
   - SOSPECHOSO: Hay dudas razonables. La calidad de imagen es baja, algún elemento de seguridad no se distingue bien, el formato no coincide exactamente con el oficial, o hay datos inconsistentes.
   - FALSO: Se detectan signos claros de falsificación: tipografía incorrecta, Photoshop/manipulación digital visible, sellos falsos, datos inventados, formato que no corresponde al oficial venezolano, números mal alineados, bordes cortados irregularmente.

5. **CÁLCULO DE CONFIANZA** (0-100):
   - 90-100: Lectura perfecta, todos los elementos de seguridad verificados
   - 70-89: Lectura clara pero algún elemento menor no verificable
   - 50-69: Lectura posible pero con limitaciones (imagen borrosa, ángulo, reflejos)
   - 25-49: Lectura dudosa, muchos elementos no verificables
   - 0-24: No se puede leer el documento

6. **HALLAZGOS**: Reporta en español TODAS las observaciones:
   - Anomalías de seguridad (ausencia de hologramas, fondos incorrectos)
   - Inconsistencias en datos
   - Problemas de calidad de imagen (borroso, reflejos, cortado)
   - Signos de manipulación digital
   - Cualquier detalle sospechoso

Responde EXACTAMENTE en este formato JSON, sin ningún texto adicional:
{
  "prefix": "V" | "E" | "J" | "G" | "C" | "F" | "P",
  "number": "solo_digitos_sin_guion",
  "fullDocument": "prefijo-numero",
  "autenticidad": "ORIGINAL" | "SOSPECHOSO" | "FALSO",
  "confianza": 0-100,
  "hallazgos": ["hallazgo_1", "hallazgo_2"]
}`;

    const text = await ai.generateText(prompt, {
      model: "gemini-2.5-flash",
      temperature: 0.05,
      systemInstruction: "Eres un perito forense documentológico experto en documentos de identidad venezolanos. Tu trabajo es analizar con máxima precisión y rigor. Responde SOLO con JSON válido.",
      images: [image],
    });

    let aiData;
    try {
      const cleaned = text.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
      aiData = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "No se pudo interpretar el documento.", raw: text }, { status: 422 });
    }

    if (!aiData.number) {
      return NextResponse.json({ error: "No se pudo leer el número de documento." }, { status: 422 });
    }

    return NextResponse.json({
      ai: aiData,
      number: aiData.number,
      prefix: aiData.prefix || "V",
      fullDocument: aiData.fullDocument || `${aiData.prefix || "V"}-${aiData.number}`,
      autenticidad: aiData.autenticidad || "SOSPECHOSO",
      confianza: aiData.confianza || 50,
      hallazgos: aiData.hallazgos || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}
