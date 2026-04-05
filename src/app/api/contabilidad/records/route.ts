import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, transaction } from '@/lib/db';

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
    cuentas_bancarias: {
        sql: `SELECT id, banco, numero_cuenta AS cuenta, tipo_cuenta, titular, saldo_actual::text AS saldo, saldo_disponible::text AS saldo_disponible, activa AS estado,
              (SELECT COUNT(*) FROM movimientos_bancarios mb WHERE mb.cuenta_id = cb.id AND date_trunc('month', mb.fecha_operacion) = date_trunc('month', CURRENT_DATE))::int AS movimientos,
              (SELECT COALESCE(ROUND(COUNT(*) FILTER (WHERE mb.conciliado = true) * 100.0 / NULLIF(COUNT(*), 0), 0), 0) FROM movimientos_bancarios mb WHERE mb.cuenta_id = cb.id AND date_trunc('month', mb.fecha_operacion) = date_trunc('month', CURRENT_DATE))::int AS match
              FROM cuentas_bancarias cb WHERE cb.user_id = $1 AND cb.activa = true ORDER BY cb.banco LIMIT 50`,
    },
    movimientos_bancarios: {
        sql: `SELECT mb.id, mb.fecha_operacion::text AS fecha, mb.concepto, mb.monto::text, mb.tipo,
              mb.referencia, mb.conciliado, mb.categoria,
              COALESCE(cb.banco, '') AS banco
              FROM movimientos_bancarios mb
              LEFT JOIN cuentas_bancarias cb ON cb.id = mb.cuenta_id AND cb.user_id = $1
              WHERE mb.user_id = $1 ORDER BY mb.fecha_operacion DESC LIMIT 50`,
    },
    cuentas_cobrar: {
        sql: `SELECT cxc.id, 
              COALESCE(c.razon_social, c.nombre_contacto, 'Cliente') AS cliente,
              COALESCE(c.rif, '') AS rif,
              COALESCE(f.numero_factura, cxc.concepto) AS factura,
              cxc.fecha_emision::text AS fecha,
              cxc.fecha_vencimiento::text AS vencimiento,
              cxc.monto_original::text AS monto,
              cxc.monto_pendiente::text AS saldo,
              cxc.estado
              FROM cuentas_por_cobrar cxc
              LEFT JOIN clientes c ON c.id = cxc.cliente_id AND c.user_id = $1
              LEFT JOIN facturas f ON f.id = cxc.factura_id AND f.user_id = $1
              WHERE cxc.user_id = $1 ORDER BY cxc.fecha_emision DESC LIMIT 50`,
    },
    cuentas_pagar: {
        sql: `SELECT cxp.id,
              COALESCE(p.razon_social, 'Proveedor') AS proveedor,
              COALESCE(p.rif, '') AS rif,
              COALESCE(cxp.numero_factura_proveedor, cxp.concepto) AS factura,
              cxp.fecha_emision::text AS fecha,
              cxp.fecha_vencimiento::text AS "fechaVencimiento",
              cxp.monto_original::text AS monto,
              cxp.monto_pendiente::text AS saldo,
              cxp.estado
              FROM cuentas_por_pagar cxp
              LEFT JOIN proveedores p ON p.id = cxp.proveedor_id AND p.user_id = $1
              WHERE cxp.user_id = $1 ORDER BY cxp.fecha_emision DESC LIMIT 50`,
    },
    asientos: {
        sql: `SELECT a.id, a.numero_asiento AS numero, a.fecha_asiento::text AS fecha,
              a.concepto AS descripcion, COALESCE(a.tipo_operacion, 'Ajuste') AS tipo,
              a.estado, a.total_debito::text AS "totalDebe", a.total_credito::text AS "totalHaber",
              COALESCE(
                (SELECT json_agg(json_build_object(
                  'cuenta', l.cuenta_codigo || ' - ' || l.cuenta_nombre,
                  'debe', l.debe::text,
                  'haber', l.haber::text
                ) ORDER BY l.id)
                FROM libro_diario_lineas l WHERE l.asiento_id = a.id), '[]'::json
              ) AS partidas
              FROM libro_diario_asientos a
              WHERE a.user_id = $1 ORDER BY a.fecha_asiento DESC, a.id DESC LIMIT 50`,
    },
    estados_financieros: {
        sql: `SELECT 
              COALESCE(SUM(CASE WHEN pc.tipo = 'activo' THEN 
                COALESCE((SELECT SUM(l.debe - l.haber) FROM libro_diario_lineas l 
                  JOIN libro_diario_asientos a ON a.id = l.asiento_id 
                  WHERE a.user_id = $1 AND a.estado = 'activo' AND l.cuenta_codigo LIKE pc.codigo || '%'), 0)
              ELSE 0 END), 0)::text AS total_activos,
              COALESCE(SUM(CASE WHEN pc.tipo = 'pasivo' THEN 
                COALESCE((SELECT SUM(l.haber - l.debe) FROM libro_diario_lineas l 
                  JOIN libro_diario_asientos a ON a.id = l.asiento_id 
                  WHERE a.user_id = $1 AND a.estado = 'activo' AND l.cuenta_codigo LIKE pc.codigo || '%'), 0)
              ELSE 0 END), 0)::text AS total_pasivos,
              COALESCE(SUM(CASE WHEN pc.tipo = 'patrimonio' THEN 
                COALESCE((SELECT SUM(l.haber - l.debe) FROM libro_diario_lineas l 
                  JOIN libro_diario_asientos a ON a.id = l.asiento_id 
                  WHERE a.user_id = $1 AND a.estado = 'activo' AND l.cuenta_codigo LIKE pc.codigo || '%'), 0)
              ELSE 0 END), 0)::text AS total_patrimonio,
              COALESCE(SUM(CASE WHEN pc.tipo = 'ingreso' THEN 
                COALESCE((SELECT SUM(l.haber - l.debe) FROM libro_diario_lineas l 
                  JOIN libro_diario_asientos a ON a.id = l.asiento_id 
                  WHERE a.user_id = $1 AND a.estado = 'activo' AND l.cuenta_codigo LIKE pc.codigo || '%'), 0)
              ELSE 0 END), 0)::text AS total_ingresos,
              COALESCE(SUM(CASE WHEN pc.tipo IN ('gasto', 'costo') THEN 
                COALESCE((SELECT SUM(l.debe - l.haber) FROM libro_diario_lineas l 
                  JOIN libro_diario_asientos a ON a.id = l.asiento_id 
                  WHERE a.user_id = $1 AND a.estado = 'activo' AND l.cuenta_codigo LIKE pc.codigo || '%'), 0)
              ELSE 0 END), 0)::text AS total_gastos
              FROM plan_cuentas pc WHERE pc.user_id = $1 AND pc.nivel = 1`,
    },
};

const INSERT_CONFIGS: Record<string, { table: string; columns: string[]; returning: string }> = {
    cuentas_bancarias: {
        table: 'cuentas_bancarias',
        columns: ['user_id', 'banco', 'codigo_banco', 'numero_cuenta', 'tipo_cuenta', 'titular', 'saldo_actual', 'saldo_disponible'],
        returning: 'id',
    },
    movimientos_bancarios: {
        table: 'movimientos_bancarios',
        columns: ['user_id', 'cuenta_id', 'fecha_operacion', 'concepto', 'monto', 'tipo', 'referencia', 'categoria'],
        returning: 'id',
    },
    cuentas_cobrar: {
        table: 'cuentas_por_cobrar',
        columns: ['user_id', 'cliente_id', 'factura_id', 'concepto', 'monto_original', 'monto_pendiente', 'fecha_emision', 'fecha_vencimiento', 'estado'],
        returning: 'id',
    },
    cuentas_pagar: {
        table: 'cuentas_por_pagar',
        columns: ['user_id', 'proveedor_id', 'concepto', 'monto_original', 'monto_pendiente', 'fecha_emision', 'fecha_vencimiento', 'numero_factura_proveedor', 'estado'],
        returning: 'id',
    },
    asientos: {
        table: 'libro_diario_asientos',
        columns: ['user_id', 'numero_asiento', 'fecha_asiento', 'concepto', 'tipo_operacion', 'referencia_doc', 'total_debito', 'total_credito', 'estado'],
        returning: 'id',
    },
    asiento_lineas: {
        table: 'libro_diario_lineas',
        columns: ['asiento_id', 'cuenta_codigo', 'cuenta_nombre', 'descripcion', 'debe', 'haber'],
        returning: 'id',
    },
    declaraciones_iva: {
        table: 'declaraciones_iva',
        columns: ['user_id', 'periodo', 'fecha_inicio', 'fecha_fin', 'fecha_declaracion', 'base_imponible', 'iva_debito', 'iva_credito', 'iva_neto', 'estado'],
        returning: 'id',
    },
    declaraciones_islr: {
        table: 'declaraciones_islr',
        columns: ['user_id', 'ejercicio_fiscal', 'fecha_declaracion', 'enriquecimiento_neto', 'impuesto_causado', 'anticipo_pagado', 'impuesto_a_pagar', 'estado'],
        returning: 'id',
    },
    plan_cuentas: {
        table: 'plan_cuentas',
        columns: ['user_id', 'codigo', 'nombre', 'tipo', 'nivel', 'cuenta_padre', 'activa', 'descripcion'],
        returning: 'id',
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

const FK_OWNERSHIP: Record<string, { table: string; column: string }> = {
    cliente_id: { table: 'clientes', column: 'id' },
    proveedor_id: { table: 'proveedores', column: 'id' },
    factura_id: { table: 'facturas', column: 'id' },
    cuenta_id: { table: 'cuentas_bancarias', column: 'id' },
};

async function validateFkOwnership(data: Record<string, unknown>, userId: number): Promise<string | null> {
    for (const [fkField, config] of Object.entries(FK_OWNERSHIP)) {
        const fkValue = data[fkField];
        if (fkValue != null && fkValue !== '') {
            const rows = await query(
                `SELECT ${config.column} FROM ${config.table} WHERE ${config.column} = $1 AND user_id = $2`,
                [fkValue, userId]
            );
            if (rows.length === 0) {
                return `Referencia inválida: ${fkField}`;
            }
        }
    }
    return null;
}

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { type, data } = body;

        if (!type || !INSERT_CONFIGS[type]) {
            return NextResponse.json({ error: 'Tipo inválido para inserción', types: Object.keys(INSERT_CONFIGS) }, { status: 400 });
        }

        const config = INSERT_CONFIGS[type];
        const record = { ...data };

        if (config.columns.includes('user_id')) {
            record.user_id = session.userId;
        }

        const fkError = await validateFkOwnership(record, session.userId);
        if (fkError) {
            return NextResponse.json({ error: fkError }, { status: 403 });
        }

        if (type === 'asientos') {
            const partidas = data.partidas;
            if (!partidas || !Array.isArray(partidas) || partidas.length === 0) {
                return NextResponse.json({ error: 'El asiento debe tener al menos una línea' }, { status: 400 });
            }
            const totalDebe = partidas.reduce((s: number, l: { debe?: string | number }) => s + (parseFloat(String(l.debe ?? 0)) || 0), 0);
            const totalHaber = partidas.reduce((s: number, l: { haber?: string | number }) => s + (parseFloat(String(l.haber ?? 0)) || 0), 0);
            if (Math.abs(totalDebe - totalHaber) > 0.01) {
                return NextResponse.json({ error: 'El asiento está desbalanceado: Debe ≠ Haber' }, { status: 400 });
            }

            const result = await transaction(async (client) => {
                const cols: string[] = [];
                const vals: unknown[] = [];
                const placeholders: string[] = [];
                let idx = 1;
                for (const col of config.columns) {
                    if (record[col] !== undefined) {
                        cols.push(col);
                        vals.push(record[col]);
                        placeholders.push(`$${idx++}`);
                    }
                }
                const insertSql = `INSERT INTO ${config.table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${config.returning}`;
                const headerResult = await client.query(insertSql, vals);
                const asientoId = headerResult.rows[0]?.id;

                for (const linea of partidas) {
                    await client.query(
                        `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber) VALUES ($1, $2, $3, $4, $5, $6)`,
                        [asientoId, linea.cuenta_codigo || '', linea.cuenta_nombre || '', linea.descripcion || '', linea.debe || 0, linea.haber || 0]
                    );
                }

                return asientoId;
            });

            return NextResponse.json({ success: true, id: result });
        }

        const cols: string[] = [];
        const vals: unknown[] = [];
        const placeholders: string[] = [];
        let idx = 1;

        for (const col of config.columns) {
            if (record[col] !== undefined) {
                cols.push(col);
                vals.push(record[col]);
                placeholders.push(`$${idx++}`);
            }
        }

        if (cols.length === 0) {
            return NextResponse.json({ error: 'No se proporcionaron datos válidos' }, { status: 400 });
        }

        const sql = `INSERT INTO ${config.table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING ${config.returning}`;
        const result = await query(sql, vals);

        return NextResponse.json({ success: true, id: result[0]?.id ?? null });
    } catch (err) {
        console.error(`[contabilidad/records] POST error:`, err);
        return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 });
    }
}

const UPDATE_TABLES: Record<string, string> = {
    cuentas_bancarias: 'cuentas_bancarias',
    movimientos_bancarios: 'movimientos_bancarios',
    cuentas_cobrar: 'cuentas_por_cobrar',
    cuentas_pagar: 'cuentas_por_pagar',
    asientos: 'libro_diario_asientos',
    declaraciones_iva: 'declaraciones_iva',
    declaraciones_islr: 'declaraciones_islr',
    plan_cuentas: 'plan_cuentas',
};

export async function PUT(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { type, id, data } = body;

        if (!type || !UPDATE_TABLES[type]) {
            return NextResponse.json({ error: 'Tipo inválido para actualización' }, { status: 400 });
        }
        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
        }

        const table = UPDATE_TABLES[type];

        const existing = await query(`SELECT id FROM ${table} WHERE id = $1 AND user_id = $2`, [id, session.userId]);
        if (existing.length === 0) {
            return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
        }

        const fkError = await validateFkOwnership(data || {}, session.userId);
        if (fkError) {
            return NextResponse.json({ error: fkError }, { status: 403 });
        }

        const allowedFields = INSERT_CONFIGS[type]?.columns.filter(c => c !== 'user_id') ?? [];
        const sets: string[] = [];
        const vals: unknown[] = [];
        let idx = 1;

        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                sets.push(`${field} = $${idx++}`);
                vals.push(data[field]);
            }
        }

        if (sets.length === 0) {
            return NextResponse.json({ error: 'No se proporcionaron campos para actualizar' }, { status: 400 });
        }

        const tablesWithUpdatedAt = ['cuentas_por_cobrar', 'cuentas_por_pagar'];
        const updatedAtClause = tablesWithUpdatedAt.includes(table) ? ', updated_at = NOW()' : '';
        vals.push(id, session.userId);
        const sql = `UPDATE ${table} SET ${sets.join(', ')}${updatedAtClause} WHERE id = $${idx++} AND user_id = $${idx}`;
        await query(sql, vals);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(`[contabilidad/records] PUT error:`, err);
        return NextResponse.json({ error: 'Error al actualizar registro' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const { searchParams } = request.nextUrl;
        const type = searchParams.get('type');
        const id = searchParams.get('id');

        if (!type || !UPDATE_TABLES[type]) {
            return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
        }
        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
        }

        const table = UPDATE_TABLES[type];
        const result = await query(`DELETE FROM ${table} WHERE id = $1 AND user_id = $2 RETURNING id`, [id, session.userId]);

        if (result.length === 0) {
            return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(`[contabilidad/records] DELETE error:`, err);
        return NextResponse.json({ error: 'Error al eliminar registro' }, { status: 500 });
    }
}
