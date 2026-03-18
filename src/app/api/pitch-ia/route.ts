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
Genera un GUIÓN DE PITCH para System Kyron — plataforma de gestión empresarial todo-en-uno para Venezuela y LATAM.

PRODUCTO:
- ERP venezolano: Contabilidad VEN-NIF, SENIAT automático (IVA 16%/IGTF 3%/ISLR 34%), Facturación electrónica, RRHH/Nómina LOTTT, Telecomunicaciones 5G, Sostenibilidad IA (Ameru), Legal IA con Gemini, Verificación pago móvil en tiempo real (3 segundos), WhatsApp Business IA 24/7
- Ronda Seed: $500.000 USD | Mercado: 120.000 empresas Venezuela, 94K PYMEs | Precio: $99–$399 USD/mes
- Tracción: 96.4% retención, NPS 72, 240+ empresas en lista de espera, 11 días demo→contrato

ESTRUCTURA DEL GUIÓN (exactamente en este orden, sin secciones extra):
1. GANCHO (30 seg): Estadística impactante + pregunta que sacude al auditorio
2. EL PROBLEMA (45 seg): El caos operativo real del empresario venezolano (fiscal, cambiario, digital)
3. LA SOLUCIÓN (90 seg): System Kyron + las 3 innovaciones más disruptivas
4. TRACCIÓN (45 seg): Números reales + lista de espera + alianzas
5. MERCADO & MODELO (30 seg): TAM/SAM/SOM + precios $99/$199/$399
6. EL EQUIPO (20 seg): Credibilidad en dos líneas
7. ASK + CIERRE (30 seg): $500K seed + llamado a la acción memorable e inspiracional

FORMATO:
- Usa [PAUSA DRAMÁTICA], [MOSTRAR PANTALLA], [ÉNFASIS] como acotaciones
- Tono: poderoso, seguro, urgente, con visión de futuro
- Longitud: 700-750 palabras exactas
- El cierre debe ser memorable — que el inversor quiera invertir YA

Genera el guión completo listo para presentar en vivo.`;

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
      config: {
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingBudget: 0 },
      },
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
