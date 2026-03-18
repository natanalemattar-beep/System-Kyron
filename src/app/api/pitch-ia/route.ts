import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { query } from '@/lib/db';

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: '',
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const PITCH_PROMPT = `Eres el mejor experto en pitch de startups tecnológicas de América Latina. 
Tu tarea es generar un GUIÓN DE PITCH INNOVADOR para System Kyron — la plataforma de gestión empresarial más avanzada para Venezuela y LATAM.

INFORMACIÓN DEL PRODUCTO:
- Sistema operativo empresarial todo-en-uno para el mercado venezolano
- Módulos: Contabilidad VEN-NIF, SENIAT, IVA 16%/IGTF 3%/ISLR 34%, Facturación electrónica, RRHH, Nómina, Telecomunicaciones 5G, Sostenibilidad IA (Ameru), Legal IA, Verificación de pago móvil en tiempo real, WhatsApp Business IA
- Tech: Next.js 15, IA Generativa (Gemini 1.5 Pro), PostgreSQL, JWT Auth
- Ronda: Seed $500.000 USD
- Mercado: 120.000 empresas registradas en Venezuela, 94.000 PYMEs objetivo
- Precio: $99–$399 USD/mes según plan

INNOVACIONES CLAVE A DESTACAR:
1. ÚNICA plataforma con verificación de pago móvil en tiempo real (pago → confirmado en 3 segundos)
2. IA que extrae datos de facturas por foto (OCR con Gemini)
3. Generador de documentos legales venezolanos con IA (contratos, actas, poderes)
4. Módulo de sostenibilidad con clasificación de residuos IA y mercado de Eco-Créditos
5. Cumplimiento SENIAT 100% automatizado con actualización ante cambios en Gaceta Oficial
6. Ajuste por inflación RIPF automático con índice BCV en tiempo real
7. WhatsApp Business IA que responde clientes 24/7
8. Telecomunicaciones corporativas integradas con contabilidad
9. Tasa BCV sincronizada en todas las transacciones Bs/USD

INSTRUCCIONES PARA EL GUIÓN:
- Duración: exactamente 5 minutos de presentación oral (aprox. 700-800 palabras)
- Tono: poderoso, seguro, con urgencia y visión de futuro
- Estructura obligatoria:
  1. GANCHO (30 seg): Pregunta o estadística impactante que sacude al auditorio
  2. EL PROBLEMA (45 seg): El caos operativo del empresario venezolano
  3. LA SOLUCIÓN (90 seg): System Kyron + sus 3 innovaciones más impactantes
  4. TRACCIÓN (45 seg): Números reales + 240 empresas en lista de espera
  5. MERCADO & MODELO (30 seg): TAM/SAM/SOM + precios
  6. EL EQUIPO (20 seg): Credibilidad en dos líneas
  7. ASK + CIERRE (30 seg): $500K seed + llamado a la acción memorable
- Incluir [PAUSA DRAMÁTICA], [MOSTRAR PANTALLA], [ÉNFASIS] como notas de dirección
- El cierre debe ser memorable e inspiracional — que el inversor quiera unirse YA

Genera el guión completo, listo para ser presentado en vivo.`;

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS pitch_sessions (
      id SERIAL PRIMARY KEY,
      tipo TEXT NOT NULL DEFAULT 'pitch_ia',
      titulo TEXT,
      contenido TEXT,
      usuario_ip TEXT,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS document_records (
      id SERIAL PRIMARY KEY,
      tipo_documento TEXT NOT NULL,
      descripcion TEXT,
      generado_por TEXT DEFAULT 'IA Gemini',
      usuario_ip TEXT,
      metadata JSONB,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function POST(req: Request) {
  try {
    await ensureTable();
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: PITCH_PROMPT }] }],
      config: { maxOutputTokens: 8192 },
    });

    const pitch = response.text ?? '';

    await query(
      `INSERT INTO pitch_sessions (tipo, titulo, contenido, usuario_ip) VALUES ($1, $2, $3, $4)`,
      ['pitch_ia', 'Guión de Pitch — System Kyron 5 min', pitch, ip]
    );

    await query(
      `INSERT INTO document_records (tipo_documento, descripcion, generado_por, usuario_ip, metadata) VALUES ($1, $2, $3, $4, $5)`,
      ['GUION_PITCH', 'Guión de pitch de 5 minutos generado por Gemini IA', 'Gemini 2.5 Flash', ip, JSON.stringify({ palabras: pitch.split(' ').length, modelo: 'gemini-2.5-flash' })]
    );

    return NextResponse.json({ pitch });
  } catch (err) {
    console.error('[pitch-ia]', err);
    return NextResponse.json({ error: 'Error generando el pitch' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureTable();
    const sessions = await query<{ id: number; titulo: string; creado_en: string }>(
      `SELECT id, titulo, creado_en FROM pitch_sessions ORDER BY creado_en DESC LIMIT 20`
    );
    return NextResponse.json({ sessions });
  } catch (err) {
    return NextResponse.json({ error: 'Error obteniendo registros' }, { status: 500 });
  }
}
