import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  return NextResponse.json(
    { error: 'Este endpoint ha sido descontinuado. Usa /api/ai/kyron-chat en su lugar.' },
    { status: 410 }
  );
}
