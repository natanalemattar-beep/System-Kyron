import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

const QUERIES: Record<string, { sql: string; countSql?: string }> = {
    retenciones: {
        sql: `SELECT id, fecha_retencion::text AS fecha, proveedor_nombre AS proveedor, proveedor_rif AS rif, tipo, base_imponible::text AS base, porcentaje::text AS pct, monto_retenido::text AS monto, numero_comprobante AS comprobante
              FROM retenciones WHERE user_id = $1 ORDER BY fecha_retencion DESC LIMIT 50`,
        countSql: `SELECT
            COALESCE(SUM(monto_retenido) FILTER (WHERE tipo = 'iva'), 0)::text AS total_iva,
            COALESCE(SUM(monto_retenido) FILTER (WHERE tipo = 'islr'), 0)::text AS total_islr
            FROM retenciones WHERE user_id = $1 AND date_trunc('month', fecha_retencion) = date_trunc('month', CURRENT_DATE)`,
    },
    facturas: {
        sql: `SELECT f.id, f.numero_factura AS factura, f.fecha_emision::text AS fecha, 
              COALESCE(c.razon_social, c.nombre_contacto, 'Cliente General') AS cliente, 
              COALESCE(c.rif, '') AS rif,
              f.tipo, f.subtotal::text, f.monto_iva::text AS iva, 
              f.monto_igtf::text AS igtf, f.total::text, f.estado,
              f.numero_factura AS "nroControl"
              FROM facturas f LEFT JOIN clientes c ON c.id = f.cliente_id 
              WHERE f.user_id = $1 ORDER BY f.fecha_emision DESC LIMIT 50`,
    },
    inventario: {
        sql: `SELECT id, codigo, nombre, categoria, stock_actual::text AS cantidad, precio_venta::text AS precio, unidad_medida AS unidad
              FROM inventario WHERE user_id = $1 ORDER BY nombre LIMIT 50`,
    },
    nominas: {
        sql: `SELECT n.id, n.periodo, n.fecha_pago::text AS fecha, n.total_asignaciones::text AS bruto, n.total_deducciones::text AS deducciones, n.total_neto::text AS neto, n.estado
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
        sql: `SELECT id, periodo, fecha_declaracion::text AS fecha, base_imponible::text AS base, iva_neto::text AS iva, iva_credito::text AS credito, iva_debito::text AS debito, estado
              FROM declaraciones_iva WHERE user_id = $1 ORDER BY fecha_declaracion DESC LIMIT 50`,
    },
    declaraciones_islr: {
        sql: `SELECT id, ejercicio_fiscal AS periodo, fecha_declaracion::text AS fecha, enriquecimiento_neto::text AS enriquecimiento, impuesto_causado::text AS impuesto, anticipo_pagado::text AS anticipo, impuesto_a_pagar::text AS a_pagar, estado
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
