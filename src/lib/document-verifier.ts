import { getGeminiClient, MODELS, cleanJSON } from '@/ai/providers';
const GEMINI_MODEL = MODELS.GEMINI;
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

export interface AIProviderResult {
  provider: 'gemini';
  disponible: boolean;
  visual_puntaje: number;
  calidad_puntaje: number;
  contenido_puntaje: number;
  es_borrosa: boolean;
  nivel_nitidez: 'alta' | 'media' | 'baja' | 'ilegible';
  veredicto_individual: 'autentico' | 'sospechoso' | 'fraudulento';
  alertas: string[];
  detalles_clave: string[];
  resumen: string;
  error?: string;
}

export interface VerificationResult {
  veredicto: 'autentico' | 'sospechoso' | 'fraudulento' | 'no_determinado';
  confianza: number;
  puntaje_total: number;
  consenso_ia: {
    total_ias: number;
    ias_coinciden: number;
    nivel: 'unanime' | 'mayoria' | 'dividido' | 'unico';
    proveedores: AIProviderResult[];
  };
  analisis: {
    integridad_archivo: AnalysisSection;
    consistencia_visual: AnalysisSection;
    calidad_imagen: CalidadImagenSection;
    metadatos: AnalysisSection;
    contenido: AnalysisSection;
    forense: AnalysisSection;
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
  if (text.match(/\/Info\s+(\d+\s+\d+\s+R)/)) meta._hasInfo = 'true';
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
      meta.software = slice.toString('ascii').replace(/[^\x20-\x7E]/g, ' ').trim().substring(0, 60);
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

function getImageDimensions(buffer: Buffer, mimeType: string): { width: number; height: number } | null {
  try {
    if (mimeType === 'image/png' && buffer.length > 24) {
      const w = buffer.readUInt32BE(16);
      const h = buffer.readUInt32BE(20);
      if (w > 0 && h > 0 && w < 50000 && h < 50000) return { width: w, height: h };
    }
    if (mimeType === 'image/jpeg') {
      let offset = 2;
      while (offset < buffer.length - 4) {
        if (buffer[offset] !== 0xFF) break;
        const marker = buffer[offset + 1];
        if (marker === 0xC0 || marker === 0xC2) {
          const h = buffer.readUInt16BE(offset + 5);
          const w = buffer.readUInt16BE(offset + 7);
          if (w > 0 && h > 0) return { width: w, height: h };
        }
        const segLen = buffer.readUInt16BE(offset + 2);
        offset += 2 + segLen;
      }
    }
  } catch { /* ignore */ }
  return null;
}

function estimateJpegQuality(buffer: Buffer): number | null {
  if (!buffer.subarray(0, 3).equals(Buffer.from([0xFF, 0xD8, 0xFF]))) return null;
  let offset = 2;
  while (offset < buffer.length - 4) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xDB) {
      const tableData = buffer.subarray(offset + 5, Math.min(offset + 69, buffer.length));
      if (tableData.length >= 64) {
        let sum = 0;
        for (let i = 0; i < 64; i++) sum += tableData[i];
        const avg = sum / 64;
        if (avg <= 2) return 95;
        if (avg <= 5) return 85;
        if (avg <= 10) return 75;
        if (avg <= 20) return 60;
        if (avg <= 40) return 40;
        return 20;
      }
    }
    const segLen = buffer.readUInt16BE(offset + 2);
    offset += 2 + segLen;
  }
  return null;
}

function computeFileIntegrity(buffer: Buffer, claimedMimeType: string, originalName: string): AnalysisSection {
  const detalles: string[] = [];
  let puntaje = 100;

  const magicOk = checkMagicBytes(buffer, claimedMimeType);
  if (!magicOk) {
    detalles.push('Los bytes mágicos NO coinciden con el tipo declarado — posible extensión falsificada');
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
  } else if (buffer.length < 5000) {
    detalles.push('Archivo muy pequeño para un documento — podría ser una miniatura');
    puntaje -= 10;
  }

  const estado = puntaje >= 80 ? 'ok' : puntaje >= 50 ? 'advertencia' : 'critico';
  return { puntaje: Math.max(0, puntaje), estado, detalles };
}

function computeForensicAnalysis(buffer: Buffer, mimeType: string): AnalysisSection {
  const detalles: string[] = [];
  let puntaje = 100;
  const isImage = mimeType.startsWith('image/');

  if (!isImage) {
    return { puntaje: 80, estado: 'ok', detalles: ['Análisis forense limitado para archivos PDF'] };
  }

  const dims = getImageDimensions(buffer, mimeType);
  if (dims) {
    detalles.push(`Resolución: ${dims.width}×${dims.height} px`);
    const megapixels = (dims.width * dims.height) / 1_000_000;

    if (megapixels < 0.1) {
      detalles.push('Resolución extremadamente baja — posible miniatura o captura parcial');
      puntaje -= 25;
    } else if (megapixels < 0.5) {
      detalles.push('Resolución baja — podría dificultar la lectura de datos');
      puntaje -= 10;
    } else if (megapixels > 2) {
      detalles.push('Resolución alta — buena para análisis detallado');
    }

    const ratio = dims.width / dims.height;
    if (ratio > 3 || ratio < 0.3) {
      detalles.push('Proporción inusual — posible recorte o manipulación');
      puntaje -= 10;
    }
  }

  if (mimeType === 'image/jpeg') {
    const quality = estimateJpegQuality(buffer);
    if (quality !== null) {
      detalles.push(`Calidad JPEG estimada: ${quality}%`);
      if (quality < 40) {
        detalles.push('Compresión excesiva — puede indicar múltiples re-guardados o manipulación');
        puntaje -= 15;
      } else if (quality < 60) {
        detalles.push('Compresión moderada-alta — posible pérdida de detalles');
        puntaje -= 5;
      }
    }
  }

  const sizeKB = buffer.length / 1024;
  if (dims) {
    const expectedMinKB = (dims.width * dims.height) / 20000;
    if (sizeKB < expectedMinKB * 0.3) {
      detalles.push('Tamaño de archivo inusualmente pequeño para las dimensiones — compresión agresiva');
      puntaje -= 10;
    }
  }
  detalles.push(`Tamaño: ${sizeKB < 1024 ? `${sizeKB.toFixed(0)} KB` : `${(sizeKB / 1024).toFixed(1)} MB`}`);

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
      detalles.push('El PDF contiene firma digital — indicador positivo');
      puntaje = Math.min(100, puntaje + 5);
    }
    if (meta.has_form === 'true') detalles.push('Contiene formularios AcroForm');
    if (producer) detalles.push(`Productor: ${meta.producer}`);
    if (creator) detalles.push(`Creador: ${meta.creator}`);
    if (meta.creationdate) detalles.push(`Fecha creación: ${meta.creationdate}`);
    const editTools = ['photoshop', 'gimp', 'paint', 'canva', 'foxit editor'];
    if (editTools.some(t => producer.includes(t) || creator.includes(t))) {
      detalles.push('Creado con software de edición — requiere mayor escrutinio');
      puntaje -= 20;
    }
    if (meta.moddate && meta.creationdate && meta.moddate !== meta.creationdate) {
      detalles.push('Documento modificado después de su creación');
      puntaje -= 10;
    }
  } else {
    if (meta.edited_photoshop === 'true' || meta.edited_adobe === 'true') {
      detalles.push('Procesada con Adobe Photoshop — posible edición');
      puntaje -= 20;
    }
    if (meta.edited_gimp === 'true') {
      detalles.push('Procesada con GIMP — posible edición');
      puntaje -= 15;
    }
    if (meta.software) detalles.push(`Software: ${meta.software}`);
    if (meta.has_exif === 'true') {
      detalles.push('Datos EXIF presentes — indica foto original de cámara');
    } else if (mimeType === 'image/jpeg') {
      detalles.push('Sin datos EXIF — captura de pantalla o imagen editada');
      puntaje -= 5;
    }
  }

  if (detalles.length === 0) {
    detalles.push('Sin metadatos significativos');
    puntaje -= 5;
  }

  const estado = puntaje >= 80 ? 'ok' : puntaje >= 50 ? 'advertencia' : 'critico';
  return { puntaje: Math.max(0, puntaje), estado, detalles };
}

const VISION_SYSTEM_PROMPT = `Eres un perito forense digital de élite especializado en documentos venezolanos (cédulas SAIME, RIF SENIAT, pasaportes, licencias, constancias, títulos, partidas, actas). Tu análisis es utilizado en procesos legales y corporativos de alta importancia.

PROTOCOLO DE ANÁLISIS:

1. CALIDAD DE IMAGEN:
   - Nitidez y enfoque general del documento
   - ¿Está borroso, desenfocado, pixelado?
   - ¿Se puede leer el texto principal claramente?
   - Nivel: "alta" (todo nítido), "media" (legible con pérdida leve), "baja" (difícil lectura), "ilegible"

2. AUTENTICIDAD VISUAL:
   - Consistencia tipográfica (fuentes uniformes, alineación correcta)
   - Sellos oficiales, firmas, escudos nacionales (posición y calidad)
   - Formato estándar del organismo emisor venezolano
   - Artefactos de edición digital (bordes irregulares, sombras falsas, diferencias de resolución, clonación, capas visibles)

3. CONTENIDO DEL DOCUMENTO:
   - Coherencia de fechas, números de cédula/RIF, códigos
   - Datos que parezcan inventados o inconsistentes
   - Formato de texto según estándares venezolanos (V-/E- para cédulas, J-/G- para RIF)

4. VEREDICTO:
   - "autentico": El documento parece genuino
   - "sospechoso": Hay señales dudosas pero no concluyentes
   - "fraudulento": Evidencia clara de falsificación o manipulación

Responde SOLO con JSON válido (sin markdown, sin backticks):
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
  "veredicto": <"autentico"|"sospechoso"|"fraudulento">,
  "alertas": ["alerta1"],
  "detalles_clave": ["hallazgo principal 1", "hallazgo principal 2"],
  "resumen": "resumen en 2-3 oraciones"
}`;

const AI_TIMEOUT_MS = 45000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), timeoutMs);
    promise
      .then(val => { clearTimeout(timer); resolve(val); })
      .catch(() => { clearTimeout(timer); resolve(fallback); });
  });
}

function parseAIScore(val: unknown, fallback: number): number {
  const n = typeof val === 'number' ? val : parseInt(String(val), 10);
  if (isNaN(n)) return fallback;
  return Math.min(100, Math.max(0, n));
}

function parseNitidez(val: unknown): 'alta' | 'media' | 'baja' | 'ilegible' {
  const valid = ['alta', 'media', 'baja', 'ilegible'];
  if (typeof val === 'string' && valid.includes(val)) return val as any;
  return 'media';
}

function parseVeredicto(val: unknown): 'autentico' | 'sospechoso' | 'fraudulento' {
  const valid = ['autentico', 'sospechoso', 'fraudulento'];
  if (typeof val === 'string' && valid.includes(val)) return val as any;
  return 'sospechoso';
}


async function analyzeWithGemini(
  base64: string, mediaType: string, docCategory: string, fileName: string
): Promise<AIProviderResult> {
  try {
    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: mediaType, data: base64 } },
            { text: `Analiza este documento. Categoría: "${docCategory}". Archivo: "${fileName}". Evalúa calidad, autenticidad y contenido.` },
          ],
        },
      ],
      config: {
        systemInstruction: VISION_SYSTEM_PROMPT,
        maxOutputTokens: 2400,
        temperature: 0,
      },
    });
    const text = response.text ?? '';
    const parsed = JSON.parse(cleanJSON(text));

    return {
      provider: 'gemini',
      disponible: true,
      visual_puntaje: parseAIScore(parsed.consistencia_visual?.puntaje, 50),
      calidad_puntaje: parseAIScore(parsed.calidad_imagen?.puntaje, 50),
      contenido_puntaje: parseAIScore(parsed.contenido?.puntaje, 50),
      es_borrosa: parsed.calidad_imagen?.es_borrosa === true,
      nivel_nitidez: parseNitidez(parsed.calidad_imagen?.nivel_nitidez),
      veredicto_individual: parseVeredicto(parsed.veredicto),
      alertas: Array.isArray(parsed.alertas) ? parsed.alertas : [],
      detalles_clave: Array.isArray(parsed.detalles_clave) ? parsed.detalles_clave : [],
      resumen: String(parsed.resumen || ''),
    };
  } catch (err) {
    console.error('[verifier] Gemini error:', err);
    return {
      provider: 'gemini', disponible: false,
      visual_puntaje: 0, calidad_puntaje: 0, contenido_puntaje: 0,
      es_borrosa: false, nivel_nitidez: 'media', veredicto_individual: 'sospechoso',
      alertas: [], detalles_clave: [], resumen: '', error: String(err),
    };
  }
}

function computeConsensus(providers: AIProviderResult[]): {
  visual: AnalysisSection;
  calidad_imagen: CalidadImagenSection;
  contenido: AnalysisSection;
  alertas: string[];
  recomendaciones: string[];
  resumen: string;
  consenso: VerificationResult['consenso_ia'];
} {
  const activos = providers.filter(p => p.disponible);
  const total = activos.length;

  if (total === 0) {
    return {
      visual: { puntaje: 50, estado: 'advertencia', detalles: ['Ninguna IA pudo completar el análisis visual'] },
      calidad_imagen: { puntaje: 50, estado: 'advertencia', es_borrosa: false, nivel_nitidez: 'media', detalles: ['Sin datos de calidad'] },
      contenido: { puntaje: 50, estado: 'advertencia', detalles: ['Sin análisis de contenido disponible'] },
      alertas: ['Ningún motor de IA respondió — se usaron solo verificaciones técnicas'],
      recomendaciones: ['Intente de nuevo en unos minutos'],
      resumen: 'Verificación parcial: los motores de IA no estuvieron disponibles.',
      consenso: { total_ias: 0, ias_coinciden: 0, nivel: 'unico', proveedores: providers },
    };
  }

  const avgVisual    = Math.round(activos.reduce((s, p) => s + p.visual_puntaje, 0) / total);
  const avgCalidad   = Math.round(activos.reduce((s, p) => s + p.calidad_puntaje, 0) / total);
  const avgContenido = Math.round(activos.reduce((s, p) => s + p.contenido_puntaje, 0) / total);

  const borrosaVotes = activos.filter(p => p.es_borrosa).length;
  const esBorrosa = borrosaVotes > total / 2;

  const nitidezOrder: Record<string, number> = { alta: 3, media: 2, baja: 1, ilegible: 0 };
  const avgNitidez = activos.reduce((s, p) => s + (nitidezOrder[p.nivel_nitidez] ?? 2), 0) / total;
  const nivelNitidez: CalidadImagenSection['nivel_nitidez'] =
    avgNitidez >= 2.5 ? 'alta' : avgNitidez >= 1.5 ? 'media' : avgNitidez >= 0.5 ? 'baja' : 'ilegible';

  const veredictos = activos.map(p => p.veredicto_individual);
  const verdictCount: Record<string, number> = {};
  for (const v of veredictos) verdictCount[v] = (verdictCount[v] || 0) + 1;
  const maxVerdict = Object.entries(verdictCount).sort((a, b) => b[1] - a[1])[0];
  const coinciden = maxVerdict[1];

  let nivelConsenso: VerificationResult['consenso_ia']['nivel'];
  if (total === 1) nivelConsenso = 'unico';
  else if (coinciden === total) nivelConsenso = 'unanime';
  else if (coinciden > total / 2) nivelConsenso = 'mayoria';
  else nivelConsenso = 'dividido';

  const allAlertas: string[] = [];
  const seenAlertas = new Set<string>();
  for (const p of activos) {
    for (const a of p.alertas) {
      const key = a.toLowerCase().trim();
      if (!seenAlertas.has(key)) { seenAlertas.add(key); allAlertas.push(a); }
    }
  }

  const recomendaciones: string[] = [];
  if (esBorrosa) recomendaciones.push('Suba el documento con mejor iluminación y enfoque para un análisis más preciso');
  if (nivelConsenso === 'dividido') recomendaciones.push('Los motores de IA no coinciden — se recomienda revisión manual por un especialista');
  if (avgVisual < 60) recomendaciones.push('Se detectaron posibles inconsistencias visuales — verifique con el documento original');

  const visualDetalles: string[] = [];
  const calidadDetalles: string[] = [];
  const contenidoDetalles: string[] = [];
  for (const p of activos) {
    const label = p.provider === 'claude' ? 'Claude' : p.provider === 'openai' ? 'OpenAI' : 'Gemini';
    if (p.detalles_clave.length > 0) {
      visualDetalles.push(`[${label}] ${p.detalles_clave[0]}`);
    }
  }

  for (const p of activos) {
    calidadDetalles.push(`Gemini: nitidez ${p.nivel_nitidez}${p.es_borrosa ? ' (borrosa)' : ''} — ${p.calidad_puntaje}%`);
    contenidoDetalles.push(`Gemini: contenido ${p.contenido_puntaje}%`);
  }

  const bestProvider = activos.sort((a, b) =>
    (b.visual_puntaje + b.calidad_puntaje + b.contenido_puntaje) -
    (a.visual_puntaje + a.calidad_puntaje + a.contenido_puntaje)
  )[0];

  let resumen = bestProvider.resumen || 'Análisis completado.';
  if (total > 1) {
    resumen += ` [Consenso: ${coinciden}/${total} IAs coinciden en "${maxVerdict[0]}"]`;
  }

  const calidadPuntaje = Math.max(0, Math.min(100, avgCalidad));
  const visualPuntaje = Math.max(0, Math.min(100, avgVisual));
  const contenidoPuntaje = Math.max(0, Math.min(100, avgContenido));

  return {
    visual: {
      puntaje: visualPuntaje,
      estado: visualPuntaje >= 80 ? 'ok' : visualPuntaje >= 50 ? 'advertencia' : 'critico',
      detalles: visualDetalles.length > 0 ? visualDetalles : ['Análisis visual completado'],
    },
    calidad_imagen: {
      puntaje: calidadPuntaje,
      estado: calidadPuntaje >= 80 ? 'ok' : calidadPuntaje >= 50 ? 'advertencia' : 'critico',
      es_borrosa: esBorrosa,
      nivel_nitidez: nivelNitidez,
      detalles: calidadDetalles,
    },
    contenido: {
      puntaje: contenidoPuntaje,
      estado: contenidoPuntaje >= 80 ? 'ok' : contenidoPuntaje >= 50 ? 'advertencia' : 'critico',
      detalles: contenidoDetalles,
    },
    alertas: allAlertas,
    recomendaciones,
    resumen,
    consenso: { total_ias: total, ias_coinciden: coinciden, nivel: nivelConsenso, proveedores: providers },
  };
}

function computeVerdict(scores: {
  integridad: number;
  visual: number;
  calidad: number;
  metadatos: number;
  contenido: number;
  forense: number;
}, consensoNivel: string, iasCoinciden: number, totalIas: number): {
  veredicto: VerificationResult['veredicto'];
  confianza: number;
  puntaje_total: number;
} {
  const weights = {
    integridad: 0.20,
    visual:     0.25,
    calidad:    0.12,
    metadatos:  0.13,
    contenido:  0.15,
    forense:    0.15,
  };

  let puntaje_total = Math.round(
    scores.integridad * weights.integridad +
    scores.visual     * weights.visual +
    scores.calidad    * weights.calidad +
    scores.metadatos  * weights.metadatos +
    scores.contenido  * weights.contenido +
    scores.forense    * weights.forense
  );

  if (consensoNivel === 'unanime' && totalIas >= 2) puntaje_total = Math.min(100, puntaje_total + 5);
  if (consensoNivel === 'dividido') puntaje_total = Math.max(0, puntaje_total - 5);

  let veredicto: VerificationResult['veredicto'];
  let confianza: number;

  if (puntaje_total >= 80) {
    veredicto = 'autentico';
    confianza = Math.min(98, puntaje_total + (consensoNivel === 'unanime' ? 3 : 0));
  } else if (puntaje_total >= 55) {
    veredicto = 'sospechoso';
    confianza = puntaje_total;
  } else if (puntaje_total >= 30) {
    veredicto = 'fraudulento';
    confianza = 100 - puntaje_total;
  } else {
    veredicto = 'fraudulento';
    confianza = 92;
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
  const forense = computeForensicAnalysis(buffer, mimeType);

  const isImage = mimeType.startsWith('image/');
  let consistencia_visual: AnalysisSection;
  let calidad_imagen: CalidadImagenSection;
  let contenido: AnalysisSection;
  let alertas: string[];
  let recomendaciones: string[];
  let resumen: string;
  let consenso: VerificationResult['consenso_ia'];

  if (isImage) {
    const base64 = buffer.toString('base64');
    const timeoutFallback = (provider: 'gemini'): AIProviderResult => ({
      provider, disponible: false,
      visual_puntaje: 0, calidad_puntaje: 0, contenido_puntaje: 0,
      es_borrosa: false, nivel_nitidez: 'media', veredicto_individual: 'sospechoso',
      alertas: [], detalles_clave: [], resumen: '', error: 'Timeout',
    });

    const gemini = await withTimeout(
      analyzeWithGemini(base64, mimeType, docCategory, originalName), 
      AI_TIMEOUT_MS, 
      timeoutFallback('gemini')
    );

    const result = computeConsensus([gemini]);
    consistencia_visual = result.visual;
    calidad_imagen      = result.calidad_imagen;
    contenido           = result.contenido;
    alertas             = result.alertas;
    recomendaciones     = result.recomendaciones;
    resumen             = result.resumen;
    consenso            = result.consenso;
  } else {
    consistencia_visual = { puntaje: 70, estado: 'advertencia', detalles: ['Análisis visual no disponible para PDF'] };
    calidad_imagen = { puntaje: 70, estado: 'advertencia', es_borrosa: false, nivel_nitidez: 'media', detalles: ['No aplica para PDF'] };
    contenido = { puntaje: 70, estado: 'advertencia', detalles: ['Suba imagen escaneada para análisis visual completo'] };
    alertas = [];
    recomendaciones = ['Suba una imagen del documento para análisis visual por IA'];
    resumen = 'Análisis limitado a metadatos y estructura del archivo PDF.';
    consenso = { total_ias: 0, ias_coinciden: 0, nivel: 'unico', proveedores: [] };
  }

  if (integridad_archivo.estado === 'critico') {
    alertas.unshift('Integridad comprometida — tipo MIME no coincide con contenido real');
  }
  if (calidad_imagen.es_borrosa) {
    alertas.unshift('Imagen borrosa o desenfocada — precisión del análisis reducida');
  }
  if (calidad_imagen.nivel_nitidez === 'ilegible') {
    alertas.unshift('Imagen ilegible — se necesita una foto de mejor calidad');
    recomendaciones.unshift('Capture el documento con buena iluminación, sin movimiento y a corta distancia');
  }
  if (forense.estado === 'critico') {
    alertas.unshift('Anomalías forenses detectadas en la estructura del archivo');
  }

  const { veredicto, confianza, puntaje_total } = computeVerdict(
    {
      integridad: integridad_archivo.puntaje,
      visual: consistencia_visual.puntaje,
      calidad: calidad_imagen.puntaje,
      metadatos: metadatos.puntaje,
      contenido: contenido.puntaje,
      forense: forense.puntaje,
    },
    consenso.nivel,
    consenso.ias_coinciden,
    consenso.total_ias,
  );

  return {
    veredicto,
    confianza,
    puntaje_total,
    consenso_ia: consenso,
    analisis: { integridad_archivo, consistencia_visual, calidad_imagen, metadatos, contenido, forense },
    alertas,
    recomendaciones,
    resumen,
    hash_sha256: hash,
    verificado_at: new Date().toISOString(),
  };
}

export function buildAnalysisSummaryText(result: VerificationResult, fileName: string): string {
  const labels: Record<string, string> = {
    autentico: 'AUTÉNTICO', sospechoso: 'SOSPECHOSO',
    fraudulento: 'FRAUDULENTO', no_determinado: 'NO DETERMINADO',
  };
  const lines = [
    `📄 ${fileName}`,
    `Veredicto: ${labels[result.veredicto]} (${result.puntaje_total}/100, confianza ${result.confianza}%)`,
    `Consenso IA: ${result.consenso_ia.ias_coinciden}/${result.consenso_ia.total_ias} coinciden (${result.consenso_ia.nivel})`,
    `Calidad: ${result.analisis.calidad_imagen.nivel_nitidez}${result.analisis.calidad_imagen.es_borrosa ? ' — BORROSA' : ''}`,
    `Integridad: ${result.analisis.integridad_archivo.puntaje}% | Visual: ${result.analisis.consistencia_visual.puntaje}% | Forense: ${result.analisis.forense.puntaje}%`,
    result.resumen,
  ];
  if (result.alertas.length > 0) lines.push(`Alertas: ${result.alertas.join('; ')}`);
  return lines.join('\n');
}
