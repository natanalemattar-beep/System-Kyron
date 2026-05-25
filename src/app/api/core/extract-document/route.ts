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

    const prompt = `Eres un perito documentológico experto en documentos de identidad venezolanos. Analiza la imagen con el máximo rigor forense y EXTRAE TODOS LOS DATOS VISIBLES.

DOCUMENTO A ANALIZAR: ${docType}

INSTRUCCIONES — SIGUE CADA PASO OBLIGATORIAMENTE:

1. **ESCANEO VISUAL**: Identifica tipo, formato, colores, sellos, hologramas.

2. **EXTRACCIÓN DEL NÚMERO**: Lee cada dígito con precisión quirúrgica.

3. **PREFIJO**:
   - V = Venezolano | E = Extranjero | J = Jurídico | G = Gobierno
   - C = Comunal | F = Firma Personal | P = Pasaporte

4. **AUTENTICIDAD**: ORIGINAL / SOSPECHOSO / FALSO con análisis forense.

5. **CONFIANZA** (0-100).

6. **EXTRACCIÓN DE DATOS PERSONALES/EMPRESARIALES** (PARTE CLAVE):
   Lee TODOS los textos visibles en el documento. Para CÉDULA extrae:
   - primerNombre, segundoNombre, primerApellido, segundoApellido
   - fechaNacimiento (YYYY-MM-DD)
   - sexo (M/F según el código del documento)
   - estadoCivil (Soltero/a, Casado/a, etc.)
   - nacionalidad
   - fechaEmision (YYYY-MM-DD), fechaVencimiento (YYYY-MM-DD)

   Para RIF extrae:
   - razonSocial (nombre de la empresa)
   - tipoEmpresa (si aparece)
   - direccion (si aparece)
   - estatus (ACTIVO/SUSPENDIDO si aparece)

7. **HALLAZGOS**: Reporta anomalías de seguridad, calidad, manipulación.

Responde EXACTAMENTE este JSON, sin texto adicional:
{
  "prefix": "V|E|J|G|C|F|P",
  "number": "solo_digitos",
  "fullDocument": "prefijo-numero",
  "autenticidad": "ORIGINAL|SOSPECHOSO|FALSO",
  "confianza": 0-100,
  "hallazgos": ["hallazgo"],
  "primerNombre": "string o null",
  "segundoNombre": "string o null",
  "primerApellido": "string o null",
  "segundoApellido": "string o null",
  "fechaNacimiento": "YYYY-MM-DD o null",
  "sexo": "M|F|null",
  "estadoCivil": "string o null",
  "nacionalidad": "string o null",
  "fechaEmision": "YYYY-MM-DD o null",
  "fechaVencimiento": "YYYY-MM-DD o null",
  "razonSocial": "string o null",
  "tipoEmpresa": "string o null",
  "direccion": "string o null",
  "estatus": "string o null"
}`;

    const text = await ai.generateText(prompt, {
      model: "gemini-1.5-flash",
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
      primerNombre: aiData.primerNombre || null,
      segundoNombre: aiData.segundoNombre || null,
      primerApellido: aiData.primerApellido || null,
      segundoApellido: aiData.segundoApellido || null,
      fechaNacimiento: aiData.fechaNacimiento || null,
      sexo: aiData.sexo || null,
      estadoCivil: aiData.estadoCivil || null,
      nacionalidad: aiData.nacionalidad || null,
      fechaEmision: aiData.fechaEmision || null,
      fechaVencimiento: aiData.fechaVencimiento || null,
      razonSocial: aiData.razonSocial || null,
      tipoEmpresa: aiData.tipoEmpresa || null,
      direccion: aiData.direccion || null,
      estatus: aiData.estatus || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error interno" }, { status: 500 });
  }
}
