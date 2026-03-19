import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db-schema';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await initializeDatabase();
    return NextResponse.json({ success: true, message: 'Base de datos inicializada correctamente.' });
  } catch (err) {
    console.error('[db-init] Error:', err);
    return NextResponse.json(
      { error: 'Error al inicializar la base de datos', detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ success: true, message: 'Base de datos verificada y lista.' });
  } catch (err) {
    console.error('[db-init] Error:', err);
    return NextResponse.json(
      { error: 'Error al verificar la base de datos', detail: String(err) },
      { status: 500 }
    );
  }
}
