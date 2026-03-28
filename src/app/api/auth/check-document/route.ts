import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

const ALLOWED_FIELDS = new Set(['cedula', 'rif']);

export async function GET(req: NextRequest) {
    const ip = getClientIP(req);
    const rl = rateLimit(`check-doc:${ip}`, 15, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    try {
        const { searchParams } = new URL(req.url);
        const field = searchParams.get('field');
        const value = searchParams.get('value');

        if (!field || !value || !ALLOWED_FIELDS.has(field)) {
            return NextResponse.json({ exists: false });
        }

        const sanitizedValue = value.replace(/[^a-zA-Z0-9\-]/g, '').slice(0, 20);
        if (!sanitizedValue) {
            return NextResponse.json({ exists: false });
        }

        const column = field === 'cedula' ? 'cedula' : 'rif';
        const row = await queryOne(
            `SELECT 1 FROM users WHERE ${column} = $1 LIMIT 1`,
            [sanitizedValue]
        );

        await new Promise(r => setTimeout(r, 100 + Math.random() * 150));

        return NextResponse.json({ exists: !!row });
    } catch {
        return NextResponse.json({ exists: false });
    }
}
