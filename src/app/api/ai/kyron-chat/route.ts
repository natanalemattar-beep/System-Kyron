import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_MAP = new Map<number, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 60_000;

function checkRateLimit(userId: number): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(userId);
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `Eres "Kyron Chat", la inteligencia artificial central del ecosistema System Kyron — una plataforma corporativa integral diseñada para el mercado venezolano.

ÁREAS DE DOMINIO:
- Contabilidad VEN-NIF: IVA, ISLR, IGTF, libros fiscales, cumplimiento SENIAT
- RRHH y Nómina: legislación LOTTT, prestaciones, vacaciones, liquidaciones
- Telecomunicaciones: líneas 5G, provisión eSIM, gestión de flota móvil
- Facturación Fiscal: notas crédito/débito, validación IGTF, tasa BCV
- Legal: redacción de contratos, registros mercantiles, SAREN/SAPI
- Sostenibilidad: economía circular, Eco-Créditos, reciclaje tecnológico
- Portal Ciudadano: trámites civiles, documentos de identidad

REGLAS:
- Responde siempre en español, tono profesional y técnico pero accesible
- Sé conciso y directo — máximo 3-4 oraciones por respuesta salvo que el usuario pida más detalle
- Cita normativa venezolana cuando sea relevante
- No uses la palabra "nodo"; usa Área, Centro o Portal
- Si la pregunta no corresponde al ecosistema, redirige amablemente`;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (!checkRateLimit(session.userId)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes. Espera un momento.' }, { status: 429 });
    }

    const body = await req.json();
    const { message, context } = body as { message: string; context?: string };

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Mensaje demasiado largo (máx 2000 caracteres)' }, { status: 400 });
    }

    const ctx = (context || 'Asistente general del ecosistema Kyron').substring(0, 500);
    const trimmed = message.trim();

    const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: 'El chat IA no está disponible en este momento. Contacta al administrador.',
      });
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({
      apiKey,
      baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL || undefined,
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `${SYSTEM_PROMPT}\n\nCONTEXTO: ${ctx}`,
      messages: [{ role: 'user', content: trimmed }],
    });

    const block = response.content[0];
    const reply = block.type === 'text' ? block.text : 'Sin respuesta del modelo.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[kyron-chat] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
