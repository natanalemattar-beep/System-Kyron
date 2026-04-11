import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const result = await db.execute(sql`
      SELECT 
        COALESCE(SUM(CASE WHEN tipo = 'efectivo' THEN monto ELSE 0 END), 0) as efectivo,
        COALESCE(SUM(CASE WHEN tipo = 'banco' THEN monto ELSE 0 END), 0) as bancos,
        COALESCE(SUM(CASE WHEN tipo = 'inversion' THEN monto ELSE 0 END), 0) as inversiones
      FROM cuentas_contables
      WHERE activo = true
    `);
    
    const row = result.rows?.[0];
    if (!row) {
      return NextResponse.json(null);
    }
    
    const efectivo = Number(row.efectivo ?? 0);
    const bancos = Number(row.bancos ?? 0);
    const inversiones = Number(row.inversiones ?? 0);
    
    if (efectivo === 0 && bancos === 0 && inversiones === 0) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json({ efectivo, bancos, inversiones });
  } catch {
    return NextResponse.json(null);
  }
}
