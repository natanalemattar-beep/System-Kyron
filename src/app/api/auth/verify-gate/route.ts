import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = rateLimit(`verify-gate:${ip}`, 30, 60 * 1000);
  if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

  const { password } = await req.json();
  if (!password) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  let gatePassword = process.env.GATE_PASSWORD;
  if (!gatePassword) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[verify-gate] GATE_PASSWORD env var not set — denying all requests');
      return NextResponse.json({ valid: false }, { status: 403 });
    }
    gatePassword = 'Carlos123';
  }

  const valid = password === gatePassword;
  return NextResponse.json({ valid });
}
