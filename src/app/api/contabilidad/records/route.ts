import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const QUERIES: Record<string, { sql: string; countSql?: string }> = {
    retenciones: {
        sql: `SELECT id, fecha::text, proveedor, rif_proveedor AS rif, tipo, base_imponible::text AS base, porcentaje::text AS pct, monto_retenido::text AS monto, comprobante
              FROM retenciones WHERE user_id = $1 ORDER BY fecha DESC LIMIT 50`,
        countSql: `SELECT
            COALESCE(SUM(monto_retenido) FILTER (WHERE tipo = 'IVA'), 0)::text AS total_iva,
            COALESCE(SUM(monto_retenido) FILTER (WHERE tipo = 'ISLR'), 0)::text AS total_islr
            FROM retenciones WHERE user_id = $1 AND date_trunc('month', fecha) = date_trunc('month', CURRENT_DATE)`,
    },
    facturas: {
        sql: `SELECT id, numero_factura AS factura, fecha_emision::text AS fecha, 
              COALESCE(c.nombre, 'Cliente General') AS cliente, tipo, subtotal::text, iva::text, total::text, estado
              FROM facturas f LEFT JOIN clientes c ON c.id = f.cliente_id 
              WHERE f.user_id = $1 ORDER BY fecha_emision DESC LIMIT 50`,
    },
    inventario: {
        sql: `SELECT id, codigo, nombre, categoria, cantidad::text, precio_unitario::text AS precio, unidad
              FROM inventario WHERE user_id = $1 ORDER BY nombre LIMIT 50`,
    },
    nominas: {
        sql: `SELECT n.id, n.periodo, n.fecha_pago::text AS fecha, n.total_bruto::text AS bruto, n.total_deducciones::text AS deducciones, n.total_neto::text AS neto, n.estado
              FROM nominas n WHERE n.user_id = $1 ORDER BY n.fecha_pago DESC LIMIT 50`,
    },
    movimientos: {
        sql: `SELECT id, fecha_operacion::text AS fecha, concepto, monto::text, tipo, referencia
              FROM movimientos_bancarios WHERE user_id = $1 ORDER BY fecha_operacion DESC LIMIT 50`,
    },
    empleados: {
        sql: `SELECT id, nombre, apellido, cedula, cargo, departamento, salario_base::text AS salario, activo
              FROM empleados WHERE user_id = $1 ORDER BY nombre LIMIT 50`,
    },
    declaraciones_iva: {
        sql: `SELECT id, periodo, fecha_declaracion::text AS fecha, base_imponible::text AS base, monto_iva::text AS iva, credito_fiscal::text AS credito, debito_fiscal::text AS debito, estado
              FROM declaraciones_iva WHERE user_id = $1 ORDER BY fecha_declaracion DESC LIMIT 50`,
    },
    declaraciones_islr: {
        sql: `SELECT id, ejercicio_fiscal AS periodo, fecha_declaracion::text AS fecha, ingresos_brutos::text AS ingresos, enriquecimiento_neto::text AS enriquecimiento, impuesto_determinado::text AS impuesto, estado
              FROM declaraciones_islr WHERE user_id = $1 ORDER BY fecha_declaracion DESC LIMIT 50`,
    },
};

export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const type = request.nextUrl.searchParams.get('type');
    if (!type || !QUERIES[type]) {
        return NextResponse.json({ error: 'Tipo inválido', types: Object.keys(QUERIES) }, { status: 400 });
    }

    try {
        const uid = session.userId;
        const config = QUERIES[type];

        const [rows, summary] = await Promise.all([
            query(config.sql, [uid]),
            config.countSql ? query(config.countSql, [uid]).then(r => r[0] ?? null) : Promise.resolve(null),
        ]);

        return NextResponse.json({ rows, summary, count: rows.length });
    } catch (err) {
        console.error(`[contabilidad/records] GET error (${type}):`, err);
        return NextResponse.json({ error: 'Error al obtener registros' }, { status: 500 });
    }
}
