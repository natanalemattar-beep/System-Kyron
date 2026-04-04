import { getAnthropicClient, CLAUDE_MODEL } from '@/ai/anthropic';
import { readFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface AnalysisSection {
  puntaje: number;
  estado: 'ok' | 'advertencia' | 'critico';
  detalles: string[];
}

export interface CalidadImagenSection extends AnalysisSection {
  es_borrosa: boolean;
  nivel_nitidez: 'alta' | 'media' | 'baja' | 'ilegible';
}

export interface VerificationResult {
  veredicto: 'autentico' | 'sospechoso' | 'fraudulento' | 'no_determinado';
  confianza: number;
  puntaje_total: number;
  analisis: {
    integridad_archivo: AnalysisSection;
    consistencia_visual: AnalysisSection;
    calidad_imagen: CalidadImagenSection;
    metadatos: AnalysisSection;
    contenido: AnalysisSection;
  };
  alertas: string[];
  recomendaciones: string[];
  resumen: string;
  hash_sha256: string;
  verificado_at: string;
}

const MAGIC_BYTES: Record<string, Buffer[]> = {
  'application/pdf': [Buffer.from([0x25, 0x50, 0x44, 0x46])],
  'image/jpeg': [Buffer.from([0xFF, 0xD8, 0xFF])],
  'image/png': [Buffer.from([0x89, 0x50, 0x4E, 0x47])],
  'image/webp': [Buffer.from('RIFF')],
};

function checkMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const expected = MAGIC_BYTES[mimeType];
  if (!expected) return true;
  return expected.some(magic => buffer.subarray(0, magic.length).equals(magic));
}

function extractPdfMetadata(buffer: Buffer): Record<string, string> {
  const text = buffer.toString('latin1');
  const meta: Record<string, string> = {};

  const infoMatch = text.match(/\/Info\s+(\d+\s+\d+\s+R)/);
  if (infoMatch) meta._hasInfo = 'true';

  for (const key of ['Producer', 'Creator', 'Author', 'CreationDate', 'ModDate', 'Title']) {
    const re = new RegExp(`\\/${key}\\s*\\(([^)]{0,200})\\)`, 'i');
    const m = text.match(re);
    if (m) meta[key.toLowerCase()] = m[1];
  }

  const pageCount = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
  meta.pages = String(pageCount || 1);

  if (text.includes('/AcroForm')) meta.has_form = 'true';
  if (text.includes('/Sig')) meta.has_signature = 'true';
  if (text.includes('/Encrypt')) meta.encrypted = 'true';

  return meta;
}

function extractImageMetadata(buffer: Buffer, mimeType: string): Record<string, string> {
  const meta: Record<string, string> = {};

  if (mimeType === 'image/jpeg') {
    if (buffer.indexOf(Buffer.from('Exif')) !== -1) meta.has_exif = 'true';
    if (buffer.indexOf(Buffer.from('Adobe')) !== -1) meta.edited_adobe = 'true';
    if (buffer.indexOf(Buffer.from('Photoshop')) !== -1) meta.edited_photoshop = 'true';
    if (buffer.indexOf(Buffer.from('GIMP')) !== -1) meta.edited_gimp = 'true';

    const softwareIdx = buffer.indexOf(Buffer.from('Software'));
    if (softwareIdx !== -1) {
      const slice = buffer.subarray(softwareIdx, Math.min(softwareIdx + 100, buffer.length));
      const softStr = slice.toString('ascii').replace(/[^\x20-\x7E]/g, ' ').trim();
      meta.software = softStr.substring(0, 60);
    }
  }

  if (mimeType === 'image/png') {
    if (buffer.indexOf(Buffer.from('tEXt')) !== -1) meta.has_text_chunks = 'true';
    if (buffer.indexOf(Buffer.from('Software')) !== -1) {
      const idx = buffer.indexOf(Buffer.from('Software'));
      const slice = buffer.subarray(idx, Math.min(idx + 80, buffer.length));
      meta.software = slice.toString('ascii').replace(/[^\x20-\x7E]/g, ' ').trim().substring(0, 60);
    }
  }

  return meta;
}

function computeFileIntegrity(buffer: Buffer, claimedMimeType: string, originalName: string): AnalysisSection {
  const detalles: string[] = [];
  let puntaje = 100;

  const magicOk = checkMagicBytes(buffer, claimedMimeType);
  if (!magicOk) {
    detalles.push('Los bytes mágicos del archivo NO coinciden con el tipo declarado — posible extensión falsa');
    puntaje -= 40;
  } else {
    detalles.push('Firma de archivo (magic bytes) válida');
  }

  const ext = path.extname(originalName).toLowerCase();
  const expectedExts: Record<string, string[]> = {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  };
  const validExts = expectedExts[claimedMimeType] || [];
  if (validExts.length > 0 && !validExts.includes(ext)) {
    detalles.push(`Extensión "${ext}" no coincide con tipo MIME "${claimedMimeType}"`);
    puntaje -= 25;
  }

  if (buffer.length < 500) {
    detalles.push('Archivo extremadamente pequeño — posible archivo vacío o corrupto');
    puntaje -= 30;
  }

  const estado = puntaje >= 80 ? 'ok' : puntaje >= 50 ? 'advertencia' : 'critico';
  return { puntaje: Math.max(0, puntaje), estado, detalles };
}

function analyzeMetadata(buffer: Buffer, mimeType: string): AnalysisSection {
  const detalles: string[] = [];
  let puntaje = 100;

  const isPdf = mimeType === 'application/pdf';
  const meta = isPdf ? extractPdfMetadata(buffer) : extractImageMetadata(buffer, mimeType);

  if (isPdf) {
    const producer = (meta.producer || '').toLowerCase();
    const creator = (meta.creator || '').toLowerCase();

    if (meta.has_signature === 'true') {
      detalles.push('El PDF contiene firma digital — indicador positivo de autenticidad');
      puntaje = Math.min(100, puntaje + 5);
    }
    if (meta.has_form === 'true') {
      detalles.push('Contiene formularios AcroForm — típico de documentos oficiales');
    }
    if (producer) detalles.push(`Productor: ${meta.producer}`);
    if (creator) detalles.push(`Creador: ${meta.creator}`);
    if (meta.creationdate) detalles.push(`Fecha creación: ${meta.creationdate}`);

    const editTools = ['photoshop', 'gimp', 'paint', 'canva', 'foxit editor'];
    if (editTools.some(t => producer.includes(t) || creator.includes(t))) {
      detalles.push('Creado con software de edición de imágenes — requiere mayor escrutinio');
      puntaje -= 20;
    }
    if (meta.moddate && meta.creationdate && meta.moddate !== meta.creationdate) {
      detalles.push('La fecha de modificación difiere de la creación — el documento fue editado después de crearse');
      puntaje -= 10;
    }
  } else {
    if (meta.edited_photoshop === 'true' || meta.edited_adobe === 'true') {
      detalles.push('Imagen procesada con Adobe Photoshop — posible edición');
      puntaje -= 20;
    }
    if (meta.edited_gimp === 'true') {
      detalles.push('Imagen procesada con GIMP — posible edición');
      puntaje -= 15;
    }
    if (meta.software) detalles.push(`Software detectado: ${meta.software}`);
    if (meta.has_exif === 'true') {
      detalles.push('Datos EXIF presentes — indica foto original de cámara');
    } else if (mimeType === 'image/jpeg') {
      detalles.push('Sin datos EXIF — podría ser una captura de pantalla o imagen editada');
      puntaje -= 5;
    }
  }

  if (detalles.length === 0) {
    detalles.push('No se encontraron metadatos significativos para analizar');
    puntaje -= 5;
  }

  const estado = puntaje >= 80 ? 'ok' : puntaje >= 50 ? 'advertencia' : 'critico';
  return { puntaje: Math.max(0, puntaje), estado, detalles };
}

async function analyzeWithVision(
  buffer: Buffer,
  mimeType: string,
  docCategory: string,
  fileName: string
): Promise<{
  visual: AnalysisSection;
  calidad_imagen: CalidadImagenSection;
  contenido: AnalysisSection;
  alertas: string[];
  recomendaciones: string[];
  resumen: string;
}> {
  const isImage = mimeType.startsWith('image/');

  if (!isImage) {
    return {
      visual: {
        puntaje: 70,
        estado: 'advertencia',
        detalles: ['Análisis visual no disponible para archivos PDF — solo se analizaron metadatos'],
      },
      calidad_imagen: {
        puntaje: 70,
        estado: 'advertencia',
        es_borrosa: false,
        nivel_nitidez: 'media',
        detalles: ['No aplica para archivos PDF'],
      },
      contenido: {
        puntaje: 70,
        estado: 'advertencia',
        detalles: ['Se recomienda convertir a imagen para un análisis más profundo'],
      },
      alertas: [],
      recomendaciones: ['Suba una imagen escaneada del documento para un análisis visual completo'],
      resumen: 'Análisis limitado a metadatos. Para una verificación visual completa, suba el documento como imagen escaneada.',
    };
  }

  try {
    const client = getAnthropicClient();
    const base64 = buffer.toString('base64');
    const mediaType = mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2400,
      temperature: 0,
      system: `Eres un perito forense digital especializado en documentos venezolanos. Analizas imágenes de documentos para detectar falsificaciones, alteraciones y problemas de calidad.

Conoces perfectamente los documentos oficiales venezolanos: cédulas (SAIME), RIF (SENIAT), pasaportes, licencias, constancias, títulos, partidas de nacimiento, etc.

CRITERIOS DE ANÁLISIS:

1. CALIDAD DE IMAGEN (prioritario):
   - BORROSIDAD: ¿Está borroso o desenfocado? ¿Es legible el texto principal?
   - NITIDEZ: alta (todo legible y nítido), media (legible con leve pérdida), baja (difícil lectura), ilegible
   - Si está borroso o ilegible, es un problema grave — puede indicar intento de ocultar datos falsos o simplemente mala foto
   - RESOLUCIÓN: ¿Es suficiente para leer los datos clave?

2. CONSISTENCIA VISUAL:
   - Fuentes inconsistentes, tamaños irregulares, alineación incorrecta
   - Artefactos de edición, bordes irregulares, diferencias de resolución entre áreas
   - Corte-pega evidente, sombras artificiales, iluminación inconsistente

3. SELLOS Y FIRMAS: Presencia, calidad, posición correcta para el tipo de documento

4. FORMATO OFICIAL: ¿Sigue el estándar del organismo emisor?

5. DATOS Y MARCAS:
   - Coherencia de fechas, números de serie, códigos QR/barras
   - Hologramas, marcas de agua, fondos de seguridad

Responde SOLO con JSON válido (sin markdown):
{
  "calidad_imagen": {
    "puntaje": <0-100>,
    "es_borrosa": <true/false>,
    "nivel_nitidez": <"alta"|"media"|"baja"|"ilegible">,
    "detalles": ["detalle1", "detalle2"]
  },
  "consistencia_visual": {
    "puntaje": <0-100>,
    "detalles": ["detalle1", "detalle2"]
  },
  "contenido": {
    "puntaje": <0-100>,
    "detalles": ["detalle1", "detalle2"]
  },
  "alertas": ["alerta1"],
  "recomendaciones": ["rec1"],
  "resumen": "resumen en 2-3 oraciones mencionando si está borroso, si es auténtico y cualquier hallazgo clave"
}`,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          {
            type: 'text',
            text: `Analiza este documento. Categoría declarada: "${docCategory}". Nombre: "${fileName}".
            
IMPORTANTE: Evalúa primero si la imagen está borrosa o desenfocada. Luego determina si parece auténtico o hay señales de alteración.`,
          },
        ],
      }],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);

    const calidadPuntaje = Math.min(100, Math.max(0, parsed.calidad_imagen?.puntaje ?? 50));
    const visualPuntaje  = Math.min(100, Math.max(0, parsed.consistencia_visual?.puntaje ?? 50));
    const contenidoPuntaje = Math.min(100, Math.max(0, parsed.contenido?.puntaje ?? 50));

    return {
      visual: {
        puntaje: visualPuntaje,
        estado: visualPuntaje >= 80 ? 'ok' : visualPuntaje >= 50 ? 'advertencia' : 'critico',
        detalles: parsed.consistencia_visual?.detalles ?? ['Análisis visual completado'],
      },
      calidad_imagen: {
        puntaje: calidadPuntaje,
        estado: calidadPuntaje >= 80 ? 'ok' : calidadPuntaje >= 50 ? 'advertencia' : 'critico',
        es_borrosa: parsed.calidad_imagen?.es_borrosa ?? false,
        nivel_nitidez: parsed.calidad_imagen?.nivel_nitidez ?? 'media',
        detalles: parsed.calidad_imagen?.detalles ?? [],
      },
      contenido: {
        puntaje: contenidoPuntaje,
        estado: contenidoPuntaje >= 80 ? 'ok' : contenidoPuntaje >= 50 ? 'advertencia' : 'critico',
        detalles: parsed.contenido?.detalles ?? ['Análisis de contenido completado'],
      },
      alertas: parsed.alertas ?? [],
      recomendaciones: parsed.recomendaciones ?? [],
      resumen: parsed.resumen ?? 'Análisis completado.',
    };
  } catch (err) {
    console.error('[document-verifier] Vision analysis error:', err);
    return {
      visual: { puntaje: 50, estado: 'advertencia', detalles: ['No se pudo completar el análisis visual por IA'] },
      calidad_imagen: {
        puntaje: 50,
        estado: 'advertencia',
        es_borrosa: false,
        nivel_nitidez: 'media',
        detalles: ['Análisis de calidad no disponible'],
      },
      contenido: { puntaje: 50, estado: 'advertencia', detalles: ['Análisis de contenido no disponible'] },
      alertas: ['El análisis por IA no se pudo completar — se usaron solo verificaciones técnicas'],
      recomendaciones: ['Intente nuevamente o solicite verificación manual'],
      resumen: 'Verificación parcial: solo se completaron las validaciones técnicas de archivo.',
    };
  }
}

function computeVerdict(scores: {
  integridad: number;
  visual: number;
  calidad: number;
  metadatos: number;
  contenido: number;
}): { veredicto: VerificationResult['veredicto']; confianza: number; puntaje_total: number } {
  const weights = {
    integridad: 0.25,
    visual:     0.30,
    calidad:    0.15,
    metadatos:  0.15,
    contenido:  0.15,
  };

  const puntaje_total = Math.round(
    scores.integridad * weights.integridad +
    scores.visual     * weights.visual +
    scores.calidad    * weights.calidad +
    scores.metadatos  * weights.metadatos +
    scores.contenido  * weights.contenido
  );

  let veredicto: VerificationResult['veredicto'];
  let confianza: number;

  if (puntaje_total >= 80) {
    veredicto = 'autentico';
    confianza = Math.min(95, puntaje_total);
  } else if (puntaje_total >= 55) {
    veredicto = 'sospechoso';
    confianza = puntaje_total;
  } else if (puntaje_total >= 30) {
    veredicto = 'fraudulento';
    confianza = 100 - puntaje_total;
  } else {
    veredicto = 'fraudulento';
    confianza = 90;
  }

  return { veredicto, confianza, puntaje_total };
}

export async function verifyDocument(
  filePath: string,
  originalName: string,
  mimeType: string,
  docCategory: string
): Promise<VerificationResult> {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  const buffer = await readFile(fullPath);

  const hash = crypto.createHash('sha256').update(buffer).digest('hex');

  const integridad_archivo = computeFileIntegrity(buffer, mimeType, originalName);
  const metadatos = analyzeMetadata(buffer, mimeType);
  const {
    visual: consistencia_visual,
    calidad_imagen,
    contenido,
    alertas,
    recomendaciones,
    resumen,
  } = await analyzeWithVision(buffer, mimeType, docCategory, originalName);

  const { veredicto, confianza, puntaje_total } = computeVerdict({
    integridad: integridad_archivo.puntaje,
    visual:     consistencia_visual.puntaje,
    calidad:    calidad_imagen.puntaje,
    metadatos:  metadatos.puntaje,
    contenido:  contenido.puntaje,
  });

  if (integridad_archivo.estado === 'critico') {
    alertas.unshift('La integridad del archivo está comprometida — tipo MIME no coincide con contenido real');
  }

  if (calidad_imagen.es_borrosa) {
    alertas.unshift('La imagen está borrosa o desenfocada — los datos podrían no ser verificables con precisión');
  }

  if (calidad_imagen.nivel_nitidez === 'ilegible') {
    alertas.unshift('La imagen es ilegible — se requiere volver a subir con mejor calidad');
    recomendaciones.unshift('Capture el documento con mejor iluminación y sin movimiento para evitar el desenfoque');
  }

  return {
    veredicto,
    confianza,
    puntaje_total,
    analisis: {
      integridad_archivo,
      consistencia_visual,
      calidad_imagen,
      metadatos,
      contenido,
    },
    alertas,
    recomendaciones,
    resumen,
    hash_sha256: hash,
    verificado_at: new Date().toISOString(),
  };
}

export function buildAnalysisSummaryText(result: VerificationResult, fileName: string): string {
  const veredictosLabel: Record<string, string> = {
    autentico: 'AUTÉNTICO',
    sospechoso: 'SOSPECHOSO',
    fraudulento: 'FRAUDULENTO',
    no_determinado: 'NO DETERMINADO',
  };

  const nitidezLabel: Record<string, string> = {
    alta: 'Alta',
    media: 'Media',
    baja: 'Baja',
    ilegible: 'Ilegible',
  };

  const lines = [
    `Archivo: ${fileName}`,
    `Veredicto: ${veredictosLabel[result.veredicto]} (${result.puntaje_total}/100, confianza ${result.confianza}%)`,
    `Calidad de imagen: ${nitidezLabel[result.analisis.calidad_imagen.nivel_nitidez]}${result.analisis.calidad_imagen.es_borrosa ? ' — BORROSA' : ''}`,
    `Integridad: ${result.analisis.integridad_archivo.puntaje}% | Visual: ${result.analisis.consistencia_visual.puntaje}% | Metadatos: ${result.analisis.metadatos.puntaje}% | Contenido: ${result.analisis.contenido.puntaje}%`,
    result.resumen,
  ];

  if (result.alertas.length > 0) {
    lines.push(`Alertas: ${result.alertas.join('; ')}`);
  }

  return lines.join('\n');
}
