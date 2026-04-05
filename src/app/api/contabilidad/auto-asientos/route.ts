import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, transaction } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PlanCuenta {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
}

async function getPlanCuentas(userId: number): Promise<PlanCuenta[]> {
  return query('SELECT id, codigo, nombre, tipo FROM plan_cuentas WHERE user_id = $1 AND activa = true ORDER BY codigo', [userId]);
}

function findCuenta(plan: PlanCuenta[], keywords: string[], tipo?: string): PlanCuenta | null {
  for (const kw of keywords) {
    const lower = kw.toLowerCase();
    const match = plan.find(c => {
      const n = c.nombre.toLowerCase();
      return n.includes(lower) && (!tipo || c.tipo === tipo);
    });
    if (match) return match;
  }
  return null;
}

function categorizarMovimiento(concepto: string, tipo: string, plan: PlanCuenta[]): { debe: PlanCuenta; haber: PlanCuenta } | null {
  const lower = concepto.toLowerCase();

  const cuentaBanco = findCuenta(plan, ['banco', 'bancos', 'caja'], 'activo')
    || plan.find(c => c.tipo === 'activo' && c.codigo.startsWith('1.1'));

  if (!cuentaBanco) return null;

  if (tipo === 'credito') {
    let contrapartida: PlanCuenta | null = null;

    if (lower.includes('venta') || lower.includes('factura') || lower.includes('cobro')) {
      contrapartida = findCuenta(plan, ['ventas', 'ingresos por ventas', 'ingreso'], 'ingreso');
    } else if (lower.includes('interes') || lower.includes('interés') || lower.includes('rendimiento')) {
      contrapartida = findCuenta(plan, ['intereses', 'ingresos financieros', 'rendimientos'], 'ingreso');
    } else if (lower.includes('deposito') || lower.includes('depósito') || lower.includes('transferencia recibida')) {
      contrapartida = findCuenta(plan, ['cuentas por cobrar', 'clientes', 'deudores'], 'activo');
    } else if (lower.includes('prestamo') || lower.includes('préstamo')) {
      contrapartida = findCuenta(plan, ['préstamos', 'prestamos', 'obligaciones'], 'pasivo');
    }

    if (!contrapartida) {
      contrapartida = findCuenta(plan, ['otros ingresos', 'ingresos diversos', 'ingreso'], 'ingreso')
        || plan.find(c => c.tipo === 'ingreso');
    }

    if (!contrapartida) return null;

    return { debe: cuentaBanco, haber: contrapartida };
  } else {
    let contrapartida: PlanCuenta | null = null;

    if (lower.includes('nomina') || lower.includes('nómina') || lower.includes('salario') || lower.includes('sueldo')) {
      contrapartida = findCuenta(plan, ['sueldos', 'salarios', 'gastos de personal', 'nómina'], 'gasto');
    } else if (lower.includes('alquiler') || lower.includes('arriendo')) {
      contrapartida = findCuenta(plan, ['alquiler', 'arrendamiento', 'gastos de alquiler'], 'gasto');
    } else if (lower.includes('servicio') || lower.includes('luz') || lower.includes('agua') || lower.includes('telefon') || lower.includes('internet')) {
      contrapartida = findCuenta(plan, ['servicios', 'servicios públicos', 'gastos generales'], 'gasto');
    } else if (lower.includes('compra') || lower.includes('proveedor') || lower.includes('mercancia') || lower.includes('mercancía') || lower.includes('inventario')) {
      contrapartida = findCuenta(plan, ['compras', 'costo de venta', 'mercancía', 'inventario'], 'costo')
        || findCuenta(plan, ['compras', 'costo de venta'], 'gasto');
    } else if (lower.includes('impuesto') || lower.includes('iva') || lower.includes('islr') || lower.includes('seniat') || lower.includes('tributo')) {
      contrapartida = findCuenta(plan, ['impuestos', 'tributos', 'iva', 'islr'], 'gasto')
        || findCuenta(plan, ['impuestos por pagar', 'iva por pagar'], 'pasivo');
    } else if (lower.includes('comision') || lower.includes('comisión') || lower.includes('banco')) {
      contrapartida = findCuenta(plan, ['comisiones bancarias', 'gastos bancarios', 'gastos financieros'], 'gasto');
    } else if (lower.includes('seguro') || lower.includes('póliza')) {
      contrapartida = findCuenta(plan, ['seguros', 'gastos de seguros', 'pólizas'], 'gasto');
    } else if (lower.includes('transferencia enviada') || lower.includes('pago')) {
      contrapartida = findCuenta(plan, ['cuentas por pagar', 'proveedores', 'acreedores'], 'pasivo');
    }

    if (!contrapartida) {
      contrapartida = findCuenta(plan, ['otros gastos', 'gastos diversos', 'gastos generales'], 'gasto')
        || plan.find(c => c.tipo === 'gasto');
    }

    if (!contrapartida) return null;

    return { debe: contrapartida, haber: cuentaBanco };
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const pendientesMovimientos = await query(
      `SELECT COUNT(*) AS count FROM movimientos_bancarios mb
       WHERE mb.user_id = $1
       AND NOT EXISTS (
         SELECT 1 FROM libro_diario_asientos a
         WHERE a.user_id = $1 AND a.referencia_doc = CONCAT('mov_bancario:', mb.id::text)
       )`,
      [session.userId]
    );

    const pendientesFacturas = await query(
      `SELECT COUNT(*) AS count FROM facturas f
       WHERE f.user_id = $1
       AND NOT EXISTS (
         SELECT 1 FROM libro_diario_asientos a
         WHERE a.user_id = $1 AND a.referencia_doc = CONCAT('factura:', f.id::text)
       )`,
      [session.userId]
    );

    const planCount = await query('SELECT COUNT(*) AS count FROM plan_cuentas WHERE user_id = $1 AND activa = true', [session.userId]);

    return NextResponse.json({
      pendientes: {
        movimientos: parseInt(pendientesMovimientos[0]?.count || '0'),
        facturas: parseInt(pendientesFacturas[0]?.count || '0'),
      },
      plan_cuentas: parseInt(planCount[0]?.count || '0'),
    });
  } catch (err) {
    console.error('[auto-asientos] GET error:', err);
    return NextResponse.json({ error: 'Error al consultar pendientes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fuente } = body;

    const plan = await getPlanCuentas(session.userId);
    if (plan.length < 2) {
      return NextResponse.json({
        error: 'Necesita al menos 2 cuentas en su Plan de Cuentas para generar asientos automáticos. Configure su catálogo contable primero.',
        requiere_plan: true,
      }, { status: 400 });
    }

    let creados = 0;
    let omitidos = 0;
    let errores: string[] = [];

    if (fuente === 'movimientos' || fuente === 'todo') {
      const movimientos = await query(
        `SELECT mb.id, mb.fecha_operacion::text AS fecha, mb.concepto, mb.monto::text, mb.tipo, mb.referencia,
                COALESCE(cb.banco, '') AS banco
         FROM movimientos_bancarios mb
         LEFT JOIN cuentas_bancarias cb ON cb.id = mb.cuenta_id AND cb.user_id = $1
         WHERE mb.user_id = $1
         AND NOT EXISTS (
           SELECT 1 FROM libro_diario_asientos a
           WHERE a.user_id = $1 AND a.referencia_doc = CONCAT('mov_bancario:', mb.id::text)
         )
         ORDER BY mb.fecha_operacion
         LIMIT 500`,
        [session.userId]
      );

      for (const mov of movimientos) {
        const monto = parseFloat(mov.monto);
        if (!monto || monto <= 0) {
          omitidos++;
          continue;
        }

        const clasificacion = categorizarMovimiento(mov.concepto, mov.tipo, plan);
        if (!clasificacion) {
          errores.push(`Mov #${mov.id}: No se encontró cuenta contable para "${mov.concepto.substring(0, 40)}"`);
          omitidos++;
          continue;
        }

        try {
          await transaction(async (client) => {
            const numero = `AUTO-${Date.now().toString(36).toUpperCase()}-${mov.id}`;
            const conceptoAsiento = `${mov.tipo === 'credito' ? 'Ingreso' : 'Egreso'}: ${mov.concepto}${mov.banco ? ` (${mov.banco})` : ''}`;

            const refDoc = `mov_bancario:${mov.id}`;
            const existing = await client.query(
              'SELECT id FROM libro_diario_asientos WHERE user_id = $1 AND referencia_doc = $2',
              [session.userId, refDoc]
            );
            if (existing.rows.length > 0) return;

            const headerRes = await client.query(
              `INSERT INTO libro_diario_asientos (user_id, numero_asiento, fecha_asiento, concepto, tipo_operacion, referencia_doc, total_debito, total_credito, estado)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'activo') RETURNING id`,
              [
                session.userId, numero, mov.fecha, conceptoAsiento,
                mov.tipo === 'credito' ? 'Ingreso' : 'Gasto',
                refDoc,
                monto, monto,
              ]
            );
            const asientoId = headerRes.rows[0].id;

            await client.query(
              `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [asientoId, clasificacion.debe.codigo, clasificacion.debe.nombre, mov.concepto, monto, 0]
            );

            await client.query(
              `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [asientoId, clasificacion.haber.codigo, clasificacion.haber.nombre, mov.concepto, 0, monto]
            );
          });
          creados++;
        } catch (err: any) {
          errores.push(`Mov #${mov.id}: ${err.message}`);
        }
      }
    }

    if (fuente === 'facturas' || fuente === 'todo') {
      const facturas = await query(
        `SELECT f.id, f.fecha_emision::text AS fecha, f.numero_factura, f.tipo,
                f.subtotal::text, f.monto_iva::text AS iva, f.total::text,
                COALESCE(c.razon_social, c.nombre_contacto, 'Cliente') AS cliente
         FROM facturas f
         LEFT JOIN clientes c ON c.id = f.cliente_id AND c.user_id = $1
         WHERE f.user_id = $1
         AND f.tipo IN ('venta', 'credito', 'debito')
         AND NOT EXISTS (
           SELECT 1 FROM libro_diario_asientos a
           WHERE a.user_id = $1 AND a.referencia_doc = CONCAT('factura:', f.id::text)
         )
         ORDER BY f.fecha_emision
         LIMIT 500`,
        [session.userId]
      );

      for (const fac of facturas) {
        const total = parseFloat(fac.total);
        const iva = parseFloat(fac.iva || '0');
        const subtotal = parseFloat(fac.subtotal || String(total));
        if (!total || total <= 0) { omitidos++; continue; }

        const cuentaCxC = findCuenta(plan, ['cuentas por cobrar', 'clientes', 'deudores'], 'activo')
          || plan.find(c => c.tipo === 'activo' && c.nombre.toLowerCase().includes('cobrar'));
        const cuentaIngreso = findCuenta(plan, ['ventas', 'ingresos por ventas', 'ingreso'], 'ingreso')
          || plan.find(c => c.tipo === 'ingreso');
        const cuentaIva = iva > 0 ? (findCuenta(plan, ['iva', 'iva por pagar', 'débito fiscal'], 'pasivo') || null) : null;

        if (!cuentaCxC || !cuentaIngreso) {
          errores.push(`Factura ${fac.numero_factura}: No se encontraron cuentas CxC o Ingresos en el plan`);
          omitidos++;
          continue;
        }

        try {
          await transaction(async (client) => {
            const numero = `AUTO-F-${Date.now().toString(36).toUpperCase()}-${fac.id}`;
            const concepto = `Factura ${fac.numero_factura} — ${fac.cliente} (${fac.tipo || 'venta'})`;
            const refDoc = `factura:${fac.id}`;

            const existing = await client.query(
              'SELECT id FROM libro_diario_asientos WHERE user_id = $1 AND referencia_doc = $2',
              [session.userId, refDoc]
            );
            if (existing.rows.length > 0) return;

            const headerRes = await client.query(
              `INSERT INTO libro_diario_asientos (user_id, numero_asiento, fecha_asiento, concepto, tipo_operacion, referencia_doc, total_debito, total_credito, estado)
               VALUES ($1, $2, $3, $4, 'Ingreso', $5, $6, $7, 'activo') RETURNING id`,
              [session.userId, numero, fac.fecha, concepto, refDoc, total, total]
            );
            const asientoId = headerRes.rows[0].id;

            await client.query(
              `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [asientoId, cuentaCxC.codigo, cuentaCxC.nombre, concepto, total, 0]
            );

            if (cuentaIva && iva > 0) {
              await client.query(
                `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [asientoId, cuentaIngreso.codigo, cuentaIngreso.nombre, `Venta neta — ${fac.numero_factura}`, 0, subtotal]
              );
              await client.query(
                `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [asientoId, cuentaIva.codigo, cuentaIva.nombre, `IVA — ${fac.numero_factura}`, 0, iva]
              );
            } else {
              await client.query(
                `INSERT INTO libro_diario_lineas (asiento_id, cuenta_codigo, cuenta_nombre, descripcion, debe, haber)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [asientoId, cuentaIngreso.codigo, cuentaIngreso.nombre, concepto, 0, total]
              );
            }
          });
          creados++;
        } catch (err: any) {
          errores.push(`Factura ${fac.numero_factura}: ${err.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      asientos_creados: creados,
      omitidos,
      errores: errores.length,
      detalle_errores: errores.slice(0, 20),
      fuente,
    });
  } catch (err: any) {
    console.error('[auto-asientos] POST error:', err);
    return NextResponse.json({ error: 'Error al generar asientos automáticos' }, { status: 500 });
  }
}
