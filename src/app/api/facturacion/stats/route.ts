import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const userId = session.id;

  const [facturadoRow, docsRow, porCobrarRow, clientesRow, recentRows, bcvRow] = await Promise.all([
    queryOne<{ total: string }>(
      `SELECT COALESCE(SUM(total), 0) as total FROM facturas
       WHERE user_id = $1 AND tipo = 'venta' AND estado NOT IN ('anulada','borrador')
         AND fecha_emision >= date_trunc('month', CURRENT_DATE)`,
      [userId]
    ),
    queryOne<{ cnt: string }>(
      `SELECT COUNT(*) as cnt FROM facturas
       WHERE user_id = $1 AND estado NOT IN ('anulada','borrador')
         AND fecha_emision >= date_trunc('month', CURRENT_DATE)`,
      [userId]
    ),
    queryOne<{ total: string }>(
      `SELECT COALESCE(SUM(total_a_pagar), 0) as total FROM facturas
       WHERE user_id = $1 AND estado IN ('pendiente','emitida','vencida')`,
      [userId]
    ),
    queryOne<{ cnt: string }>(
      `SELECT COUNT(*) as cnt FROM clientes WHERE user_id = $1 AND activo = true`,
      [userId]
    ),
    query(
      `SELECT f.numero_factura, f.tipo_documento, f.tipo, f.total, f.estado,
              TO_CHAR(f.fecha_emision, 'DD/MM/YYYY') as fecha,
              COALESCE(c.razon_social, c.nombre_contacto, '—') as cliente
       FROM facturas f
       LEFT JOIN clientes c ON c.id = f.cliente_id AND c.user_id = $1
       WHERE f.user_id = $1 AND f.estado != 'borrador'
       ORDER BY f.created_at DESC LIMIT 10`,
      [userId]
    ),
    queryOne<{ tasa: string; fecha: string }>(
      `SELECT tasa_usd_ves as tasa, TO_CHAR(fecha, 'DD/MM/YYYY') as fecha
       FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`
    ),
  ]);

  const typeLabel: Record<string, string> = {
    FACTURA: 'Factura',
    NOTA_DEBITO: 'N/D',
    NOTA_CREDITO: 'N/C',
    ORDEN_ENTREGA: 'O/E',
    GUIA_DESPACHO: 'G/D',
  };

  const typeMap: Record<string, string> = {
    FACTURA: 'factura',
    NOTA_DEBITO: 'nota_debito',
    NOTA_CREDITO: 'nota_credito',
    ORDEN_ENTREGA: 'proforma',
    GUIA_DESPACHO: 'proforma',
  };

  const recentActivity = recentRows.map((r: Record<string, unknown>) => {
    const row = r as Record<string, string>;
    const tipoDoc = row.tipo_documento || 'FACTURA';
    const prefix = typeLabel[tipoDoc] || 'Doc';
    const amount = parseFloat(row.total || '0');
    return {
      doc: `${prefix} #${row.numero_factura}`,
      client: row.cliente || '—',
      amount: row.tipo === 'nota_credito' ? -amount : amount,
      status: (row.estado || '').charAt(0).toUpperCase() + (row.estado || '').slice(1),
      date: row.fecha,
      type: typeMap[tipoDoc] || 'factura',
    };
  });

  const tasaBcv = bcvRow
    ? `Bs. ${parseFloat(bcvRow.tasa).toFixed(2)} / USD`
    : '—';

  return NextResponse.json({
    kpis: {
      facturadoMes: parseFloat(facturadoRow?.total || '0'),
      documentosEmitidos: parseInt(docsRow?.cnt || '0'),
      porCobrar: parseFloat(porCobrarRow?.total || '0'),
      clientesActivos: parseInt(clientesRow?.cnt || '0'),
    },
    recentActivity,
    bottomStats: {
      tasaBcv,
      proximaDeclaracion: '—',
      estadoFiscal: '—',
    },
  });
}
