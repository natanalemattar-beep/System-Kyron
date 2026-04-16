import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeString } from '@/lib/input-sanitizer';
import { PROMPTS } from '@/ai/prompts';
import { streamResponse } from '@/ai/stream';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const AGENT_PROMPTS: Record<string, string> = {
  personal: PROMPTS.KYRON_PERSONAL,
  saime: PROMPTS.KYRON_SAIME,
  seniat: PROMPTS.KYRON_FISCAL,
  ivss: PROMPTS.KYRON_IVSS,
  legal: PROMPTS.KYRON_LEGAL_EXPERT,
  cfo: PROMPTS.KYRON_ANALYTICS,
};

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { agentId = 'personal', messages: chatHistory, context } = body as {
      agentId?: string;
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      context?: string;
    };

    const promptSystem = AGENT_PROMPTS[agentId] || PROMPTS.KYRON_PERSONAL;

    const rl = rateLimit(`ai:agent:${agentId}:${session.userId}`, 20, 60_000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
      return NextResponse.json({ error: 'Mensajes requeridos' }, { status: 400 });
    }

    const ctx = context ? `\n\nCONTEXTO: ${sanitizeString(context, 500)}` : '';
    const recentHistory = chatHistory.slice(-15).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: sanitizeString(m.content, 3000),
    }));

    return streamResponse({
      system: promptSystem + ctx,
      messages: recentHistory,
      maxTokens: 4096,
      temperature: 0.7,
      providers: ['gemini'],
      label: `agent-chat:${agentId}`,
    });
  } catch (err) {
    console.error('[agent-chat] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
