import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db-schema';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const adminKey = req.headers.get('x-admin-key');
  if (adminKey && process.env.DB_INIT_SECRET && adminKey === process.env.DB_INIT_SECRET) return true;
  const session = await getSession();
  return !!session && session.tipo === 'admin';
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    await initializeDatabase();
    return NextResponse.json({ success: true, message: 'Base de datos inicializada correctamente.' });
  } catch (err) {
    console.error('[db-init] Error:', err);
    return NextResponse.json(
      { error: 'Error al inicializar la base de datos' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    await initializeDatabase();
    return NextResponse.json({ success: true, message: 'Base de datos verificada y lista.' });
  } catch (err) {
    console.error('[db-init] Error:', err);
    return NextResponse.json(
      { error: 'Error al verificar la base de datos' },
      { status: 500 }
    );
  }
}
