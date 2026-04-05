import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const userId = session.id;

  const [topRows, totalRow, activeRow] = await Promise.all([
    query(
      `SELECT c.id, COALESCE(c.razon_social, c.nombre_contacto, 'Sin nombre') as name,
              COALESCE(SUM(f.total), 0)::numeric as total_purchases,
              COUNT(f.id)::int as invoice_count
       FROM clientes c
       LEFT JOIN facturas f ON f.cliente_id = c.id AND f.user_id = $1 AND f.estado NOT IN ('anulada','borrador')
       WHERE c.user_id = $1 AND c.activo = true
       GROUP BY c.id, c.razon_social, c.nombre_contacto
       ORDER BY total_purchases DESC
       LIMIT 10`,
      [userId]
    ),
    queryOne<{ cnt: string }>(
      `SELECT COUNT(*) as cnt FROM clientes WHERE user_id = $1 AND activo = true`,
      [userId]
    ),
    queryOne<{ cnt: string }>(
      `SELECT COUNT(DISTINCT c.id) as cnt FROM clientes c
       JOIN facturas f ON f.cliente_id = c.id AND f.user_id = $1
       WHERE c.user_id = $1 AND c.activo = true
         AND f.fecha_emision >= CURRENT_DATE - INTERVAL '90 days'
         AND f.estado NOT IN ('anulada','borrador')`,
      [userId]
    ),
  ]);

  const totalClientes = parseInt(totalRow?.cnt || '0');
  const activosRecientes = parseInt(activeRow?.cnt || '0');
  const retencion = totalClientes > 0
    ? `${((activosRecientes / totalClientes) * 100).toFixed(1)}%`
    : '—';

  const customers = topRows.map((r: Record<string, unknown>, i: number) => {
    const row = r as Record<string, string>;
    const invoices = parseInt(row.invoice_count || '0');
    const total = parseFloat(row.total_purchases || '0');
    const score = Math.min(100, Math.round((invoices * 3) + (total / 5000)));
    return {
      id: `CLI-${String(i + 1).padStart(3, '0')}`,
      name: row.name,
      totalPurchases: total,
      invoiceCount: invoices,
      score,
    };
  });

  return NextResponse.json({
    customers,
    stats: {
      retencion,
      churnRate: totalClientes > 0
        ? `${(((totalClientes - activosRecientes) / totalClientes) * 100).toFixed(1)}%`
        : '—',
    },
  });
}
