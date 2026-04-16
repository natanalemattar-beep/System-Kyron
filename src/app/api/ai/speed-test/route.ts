import { NextRequest } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limiter';
import { PROMPTS } from '@/ai/prompts';
import { generateTextWithFallback } from '@/ai/providers';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const COMPETITORS: Record<string, { base: number; variance: number }> = {
  'SAP Business One': { base: 4100, variance: 900 },
  'Odoo': { base: 2900, variance: 700 },
  'QuickBooks': { base: 2200, variance: 500 },
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`ai:speed:${ip}`, 10, 60 * 60 * 1000);

    if (!rl.allowed) {
      return Response.json(
        { error: 'Límite de pruebas alcanzado. Intenta de nuevo en una hora.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { query: userQuery } = body as { query: string };

    if (!userQuery?.trim()) {
      return Response.json({ error: 'Consulta requerida' }, { status: 400 });
    }

    const startTime = Date.now();

    const text = await generateTextWithFallback(
      ['gemini'],
      { system: PROMPTS.SPEED_TEST, prompt: userQuery.substring(0, 300), maxTokens: 200, temperature: 0.6 },
      'speed-test'
    );

    const kyronTime = Date.now() - startTime;

    const competitors = Object.entries(COMPETITORS).map(([name, cfg]) => ({
      name,
      time: cfg.base + Math.floor(Math.random() * cfg.variance),
    }));

    return Response.json({ text, kyronTime, competitors });
  } catch (err) {
    console.error('[speed-test]', err);
    return Response.json({ error: 'Error ejecutando la prueba. Intenta de nuevo.' }, { status: 500 });
  }
}
