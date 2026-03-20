import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destino, codigo } = body as { destino: string; codigo: string };

    if (!destino || !codigo) {
      return NextResponse.json({ error: 'Destino y código son requeridos' }, { status: 400 });
    }

    const record = await queryOne<{ id: number; usado: boolean; expires_at: string; intentos: number }>(
      `SELECT id, usado, expires_at, intentos FROM verification_codes
       WHERE destino = $1 AND codigo = $2
       ORDER BY created_at DESC LIMIT 1`,
      [destino, codigo.trim()]
    );

    if (!record) {
      await query(
        `UPDATE verification_codes SET intentos = intentos + 1
         WHERE destino = $1 AND usado = false AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [destino]
      );
      return NextResponse.json({ error: 'Código incorrecto. Verifica e intenta de nuevo.' }, { status: 400 });
    }

    if (record.intentos >= 5) {
      return NextResponse.json({ error: 'Demasiados intentos fallidos. Solicita un nuevo código.' }, { status: 429 });
    }

    if (record.usado) {
      return NextResponse.json({ error: 'Este código ya fue utilizado. Solicita uno nuevo.' }, { status: 400 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'El código ha expirado. Solicita uno nuevo.' }, { status: 400 });
    }

    await query(`UPDATE verification_codes SET usado = true WHERE id = $1`, [record.id]);

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error('[verify-code] error:', err);
    return NextResponse.json({ error: 'Error al verificar el código.' }, { status: 500 });
  }
}
