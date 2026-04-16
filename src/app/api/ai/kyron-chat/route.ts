import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { PROMPTS } from '@/ai/prompts';
import { streamResponse } from '@/ai/stream';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rl = rateLimit(`ai:chat:${session.userId}`, 30, 60_000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

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

    const ctx = context ? `\n\nCONTEXTO DEL USUARIO: ${context.substring(0, 500)}` : '';
    const trimmedHistory = chatHistory.slice(-20).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content.substring(0, 4000),
    }));

    return streamResponse({
      system: PROMPTS.KYRON_MASTER + ctx,
      messages: trimmedHistory,
      maxTokens: 8192,
      temperature: 0.7,
      providers: ['gemini'],
      label: 'kyron-chat',
    });
  } catch (err) {
    console.error('[kyron-chat] error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
