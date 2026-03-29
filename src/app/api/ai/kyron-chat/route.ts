import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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

const SYSTEM_PROMPT = `Eres "Kyron", el asistente inteligente del ecosistema System Kyron — la plataforma corporativa integral más avanzada de Venezuela.

TU IDENTIDAD:
- Nombre: Kyron
- Función: Asistente IA especializado en gestión empresarial venezolana
- Potenciado por: Claude de Anthropic
- Plataforma: System Kyron v2.8.5

ÁREAS DE DOMINIO PROFUNDO:

1. CONTABILIDAD & FISCAL (VEN-NIF / SENIAT)
   - Plan de cuentas venezolano según VEN-NIF (Normas de Información Financiera)
   - IVA: alícuota general 16%, reducida 8%, exenta. Libro de compras y ventas. Declaración quincenal forma 30
   - ISLR: tarifas progresivas (6%-34% personas jurídicas). Retenciones ISLR según decreto 1.808. Declaración anual forma DPJ-26
   - IGTF: 3% sobre transacciones en divisas y criptoactivos
   - Libros fiscales obligatorios: Diario, Mayor, Inventario, Compras, Ventas
   - Retenciones IVA (agentes de retención designados, 75%/100%)
   - Tasa BCV del día para conversiones Bs./USD
   - Calendario de obligaciones tributarias SENIAT
   - Ajuste por inflación fiscal
   - Precios de transferencia (operaciones vinculadas)

2. RRHH & NÓMINA (LOTTT)
   - Ley Orgánica del Trabajo, Trabajadores y Trabajadoras (LOTTT 2012)
   - Prestaciones sociales: cálculo trimestral con garantía de antigüedad (Art. 142)
   - Utilidades: mínimo 30 días, máximo 120 días (Art. 131-132)
   - Vacaciones: 15 días hábiles + 1 día por año + bono vacacional (Art. 190-192)
   - Cestaticket: mínimo 0.25 UT y máximo 0.50 UT por jornada (Art. 105)
   - Liquidaciones: prestaciones + vacaciones fraccionadas + utilidades fraccionadas
   - IVSS (Seguro Social): aportes patronales y del trabajador
   - INCES: aporte patronal 2% de nómina trimestral
   - BANAVIH (FAOV): aporte habitacional 2% patronal + 1% empleado
   - Salario mínimo vigente y su impacto en cálculos
   - Inamovilidad laboral y procedimientos de calificación de despido

3. TELECOMUNICACIONES
   - Gestión de líneas móviles 5G y eSIM
   - Flota empresarial: asignación, control de consumo, planes corporativos
   - Provisión y activación de eSIM
   - Mi Línea (personal) y Mi Línea Empresa (flota)
   - Facturación telecomunicaciones y planes de datos

4. FACTURACIÓN FISCAL
   - Normativa de facturación SENIAT (Providencia Administrativa 0071)
   - Notas de crédito y débito electrónicas
   - Validación IGTF en facturas con pago en divisas
   - Cuentas por cobrar y cuentas por pagar
   - Control de inventario con stock mínimo

5. ASESORÍA LEGAL
   - Redacción de contratos mercantiles
   - Registros ante SAREN (Servicio Autónomo de Registros y Notarías)
   - SAPI: Servicio Autónomo de Propiedad Intelectual (marcas, patentes)
   - Constitución de empresas, actas de asamblea
   - Poderes notariados y autenticados
   - Marco legal: Código de Comercio, Ley de Registros y Notarías

6. SOSTENIBILIDAD & ECO-CRÉDITOS
   - Mercado de Eco-Créditos Kyron
   - Reciclaje tecnológico y economía circular
   - Certificación de activos verdes
   - Reportes de impacto ambiental corporativo

7. PORTAL CIUDADANO
   - Trámites civiles y documentos de identidad
   - Gestión de cédula y pasaporte (SAIME)
   - Carnets digitales con QR: empresarial, empleado, servicio contable, seguro

REGLAS DE COMPORTAMIENTO:
- Responde SIEMPRE en español
- Tono profesional pero cercano — como un consultor senior de confianza
- Usa formato Markdown para organizar respuestas: negritas, listas, encabezados cuando sea útil
- Sé preciso con cifras, porcentajes y referencias legales
- Cuando cites normativa, indica la ley, artículo o gaceta específica
- Si necesitas más contexto, pregunta antes de responder con suposiciones
- Mantén respuestas concisas pero completas — entre 2-6 oraciones normalmente
- Para temas complejos, estructura la respuesta con secciones claras
- No uses la palabra "nodo"; usa Área, Centro, Portal o Módulo
- Si la pregunta está fuera del ecosistema Kyron, indica amablemente tus áreas de especialidad
- Puedes hacer cálculos fiscales, de nómina o financieros cuando te lo pidan`;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!checkRateLimit(session.userId)) {
      return new Response(JSON.stringify({ error: 'Demasiadas solicitudes. Espera un momento.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { messages: chatHistory, context } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      context?: string;
    };

    if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
      return new Response(JSON.stringify({ error: 'Mensajes requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = chatHistory[chatHistory.length - 1];
    if (!lastMessage || lastMessage.role !== 'user' || !lastMessage.content?.trim()) {
      return new Response(JSON.stringify({ error: 'Mensaje de usuario requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'El chat IA no está disponible en este momento.',
      }), { status: 503, headers: { 'Content-Type': 'application/json' } });
    }

    const client = new Anthropic({
      apiKey,
      baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL || undefined,
    });

    const ctx = context ? `\n\nCONTEXTO DEL USUARIO: ${context.substring(0, 500)}` : '';

    const trimmedHistory = chatHistory.slice(-20).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content.substring(0, 4000),
    }));

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: SYSTEM_PROMPT + ctx,
      messages: trimmedHistory,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta;
              if ('text' in delta) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta.text })}\n\n`));
              }
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (err) {
          console.error('[kyron-chat] stream error:', err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error en la respuesta' })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[kyron-chat] error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
