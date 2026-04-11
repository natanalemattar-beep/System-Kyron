import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const result = await db.execute(sql`
      SELECT id, ente, tipo, estado, fecha
      FROM autorizaciones
      ORDER BY fecha DESC
    `);
    return NextResponse.json(result.rows ?? []);
  } catch {
    return NextResponse.json([]);
  }
}
