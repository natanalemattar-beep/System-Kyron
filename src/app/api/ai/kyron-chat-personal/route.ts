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

    const rl = rateLimit(`ai:personal:${session.userId}`, 20, 60_000);
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

    const ctx = context ? `\n\nCONTEXTO: ${context.substring(0, 300)}` : '';
    const recentHistory = chatHistory.slice(-12).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content.substring(0, 2000),
    }));

    return streamResponse({
      system: PROMPTS.KYRON_PERSONAL + ctx,
      messages: recentHistory,
      maxTokens: 4096,
      temperature: 0.7,
      providers: ['gemini'],
      label: 'kyron-chat-personal',
    });
  } catch (err) {
    console.error('[kyron-chat-personal] error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
