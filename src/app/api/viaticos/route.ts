import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const uid = session.userId;
  const tipo = req.nextUrl.searchParams.get("tipo_viaje");
  const estado = req.nextUrl.searchParams.get("estado");
  const socios = req.nextUrl.searchParams.get("socios");

  try {
    let sql = `SELECT v.*, e.nombre AS empleado_nombre, e.apellido AS empleado_apellido, e.cargo AS empleado_cargo, e.departamento AS empleado_departamento
               FROM viaticos v
               LEFT JOIN empleados e ON v.empleado_id = e.id
               WHERE v.user_id = $1`;
    const params: (string | number | boolean)[] = [uid];
    let idx = 2;

    if (tipo) {
      sql += ` AND v.tipo_viaje = $${idx}`;
      params.push(tipo);
      idx++;
    }

    if (estado) {
      sql += ` AND v.estado = $${idx}`;
      params.push(estado);
      idx++;
    }

    if (socios === "true") {
      sql += ` AND v.es_socio = true`;
    } else if (socios === "false") {
      sql += ` AND v.es_socio = false`;
    }

    sql += ` ORDER BY v.created_at DESC`;

    const rows = await query(sql, params);

    const statsRows = await query(
      `SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE estado = 'pendiente') AS pendientes,
        COUNT(*) FILTER (WHERE estado = 'aprobado') AS aprobados,
        COUNT(*) FILTER (WHERE estado = 'pagado') AS pagados,
        COUNT(*) FILTER (WHERE estado = 'rendido') AS rendidos,
        COUNT(*) FILTER (WHERE estado = 'rechazado') AS rechazados,
        COALESCE(SUM(monto) FILTER (WHERE estado IN ('aprobado','pagado','rendido')), 0) AS total_aprobado,
        COALESCE(SUM(monto) FILTER (WHERE estado = 'pendiente'), 0) AS total_pendiente,
        COALESCE(SUM(monto) FILTER (WHERE tipo_viaje = 'internacional' AND estado IN ('aprobado','pagado','rendido')), 0) AS total_internacional,
        COALESCE(SUM(monto) FILTER (WHERE tipo_viaje = 'nacional' AND estado IN ('aprobado','pagado','rendido')), 0) AS total_nacional,
        COALESCE(SUM(monto) FILTER (WHERE es_socio = true AND estado IN ('aprobado','pagado','rendido')), 0) AS total_socios,
        COUNT(*) FILTER (WHERE tiene_factura = false) AS sin_factura,
        COUNT(*) FILTER (WHERE es_bono = true) AS total_bonos
      FROM viaticos WHERE user_id = $1`,
      [uid]
    );

    return NextResponse.json({ viaticos: rows, stats: statsRows[0] || {} });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const uid = session.userId;

  try {
    const body = await req.json();
    const {
      empleado_id, tipo_viaje, destino_pais, destino_ciudad, motivo,
      fecha_salida, fecha_retorno, dias, categoria, descripcion,
      proveedor, numero_factura, tiene_factura, monto, moneda,
      tasa_cambio, monto_ves, notas, es_socio, es_bono
    } = body;

    if (!tipo_viaje || !destino_ciudad || !motivo || !fecha_salida || !fecha_retorno || !categoria) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const parsedMonto = parseFloat(String(monto || 0));
    if (isNaN(parsedMonto) || parsedMonto < 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const rows = await query(
      `INSERT INTO viaticos (
        user_id, empleado_id, tipo_viaje, destino_pais, destino_ciudad, motivo,
        fecha_salida, fecha_retorno, dias, categoria, descripcion,
        proveedor, numero_factura, tiene_factura, monto, moneda,
        tasa_cambio, monto_ves, notas, es_socio, es_bono
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
      RETURNING *`,
      [
        uid,
        empleado_id || null,
        tipo_viaje,
        destino_pais || null,
        destino_ciudad,
        motivo,
        fecha_salida,
        fecha_retorno,
        parseInt(String(dias || 1)),
        categoria,
        descripcion || null,
        proveedor || null,
        numero_factura || null,
        tiene_factura !== false,
        parsedMonto,
        moneda || "USD",
        tasa_cambio ? parseFloat(String(tasa_cambio)) : null,
        monto_ves ? parseFloat(String(monto_ves)) : null,
        notas || null,
        es_socio === true,
        es_bono === true
      ]
    );

    return NextResponse.json({ viatico: rows[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const uid = session.userId;

  try {
    const body = await req.json();
    const { id, estado, aprobado_por, notas } = body;

    if (!id || !estado) {
      return NextResponse.json({ error: "ID y estado requeridos" }, { status: 400 });
    }

    const TRANSITIONS: Record<string, string[]> = {
      pendiente: ["aprobado", "rechazado"],
      aprobado: ["pagado"],
      pagado: ["rendido"],
    };

    const current = await query(`SELECT estado FROM viaticos WHERE id = $1 AND user_id = $2`, [id, uid]);
    if (current.length === 0) {
      return NextResponse.json({ error: "Viático no encontrado" }, { status: 404 });
    }

    const estadoActual = current[0].estado;
    const allowed = TRANSITIONS[estadoActual] || [];
    if (!allowed.includes(estado)) {
      return NextResponse.json({ error: `No se puede cambiar de '${estadoActual}' a '${estado}'. Transiciones válidas: ${allowed.join(", ") || "ninguna"}` }, { status: 400 });
    }

    const rows = await query(
      `UPDATE viaticos SET estado = $1, aprobado_por = $2, fecha_aprobacion = CASE WHEN $1 = 'aprobado' THEN NOW()::date ELSE fecha_aprobacion END, notas = COALESCE($3, notas), updated_at = NOW()
       WHERE id = $4 AND user_id = $5 RETURNING *`,
      [estado, aprobado_por || null, notas || null, id, uid]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Viático no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ viatico: rows[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const uid = session.userId;
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  try {
    const rows = await query(
      `DELETE FROM viaticos WHERE id = $1 AND user_id = $2 AND estado = 'pendiente' RETURNING id`,
      [parseInt(id), uid]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Solo se pueden eliminar viáticos en estado pendiente" }, { status: 400 });
    }

    return NextResponse.json({ eliminado: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
