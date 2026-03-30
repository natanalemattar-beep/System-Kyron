import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const tipo = req.nextUrl.searchParams.get("tipo");
  const uid = session.userId;

  try {
    if (tipo === "programas") {
      const programas = await query(`SELECT * FROM programas_motivacion WHERE user_id = $1 ORDER BY created_at DESC`, [uid]);
      return NextResponse.json({ programas });
    }
    if (tipo === "reconocimientos") {
      const reconocimientos = await query(
        `SELECT r.*, e.nombre || ' ' || e.apellido AS empleado_nombre, e.departamento, e.cargo
         FROM reconocimientos_empleado r
         LEFT JOIN empleados e ON r.empleado_id = e.id
         WHERE r.user_id = $1 ORDER BY r.fecha DESC`, [uid]
      );
      return NextResponse.json({ reconocimientos });
    }
    if (tipo === "alianzas") {
      const alianzas = await query(`SELECT * FROM alianzas_vacacionales WHERE user_id = $1 AND activa = true ORDER BY descuento_pct DESC`, [uid]);
      return NextResponse.json({ alianzas });
    }
    if (tipo === "planes") {
      const planes = await query(
        `SELECT p.*, e.nombre || ' ' || e.apellido AS empleado_nombre, e.departamento,
                a.nombre_complejo AS resort_nombre
         FROM planes_vacaciones p
         LEFT JOIN empleados e ON p.empleado_id = e.id
         LEFT JOIN alianzas_vacacionales a ON p.alianza_id = a.id
         WHERE p.user_id = $1 ORDER BY p.fecha_salida DESC`, [uid]
      );
      return NextResponse.json({ planes });
    }

    const [programas, reconocimientos, alianzas, planes] = await Promise.all([
      query(`SELECT * FROM programas_motivacion WHERE user_id = $1 ORDER BY created_at DESC`, [uid]),
      query(`SELECT r.*, e.nombre || ' ' || e.apellido AS empleado_nombre FROM reconocimientos_empleado r LEFT JOIN empleados e ON r.empleado_id = e.id WHERE r.user_id = $1 ORDER BY r.fecha DESC LIMIT 20`, [uid]),
      query(`SELECT * FROM alianzas_vacacionales WHERE user_id = $1 AND activa = true ORDER BY descuento_pct DESC`, [uid]),
      query(`SELECT p.*, e.nombre || ' ' || e.apellido AS empleado_nombre, a.nombre_complejo AS resort_nombre FROM planes_vacaciones p LEFT JOIN empleados e ON p.empleado_id = e.id LEFT JOIN alianzas_vacacionales a ON p.alianza_id = a.id WHERE p.user_id = $1 ORDER BY p.fecha_salida DESC LIMIT 20`, [uid]),
    ]);

    return NextResponse.json({ programas, reconocimientos, alianzas, planes });
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
    const { accion } = body;

    if (accion === "programa") {
      const { nombre, categoria, descripcion, puntos_reward, fecha_inicio, fecha_fin, presupuesto } = body;
      if (!nombre || !fecha_inicio) return NextResponse.json({ error: "Nombre y fecha de inicio requeridos" }, { status: 400 });
      const rows = await query(
        `INSERT INTO programas_motivacion (user_id, nombre, categoria, descripcion, puntos_reward, fecha_inicio, fecha_fin, presupuesto)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [uid, nombre, categoria || 'reconocimiento', descripcion || '', puntos_reward || 0, fecha_inicio, fecha_fin || null, presupuesto || 0]
      );
      return NextResponse.json({ programa: rows[0] });
    }

    if (accion === "reconocimiento") {
      const { empleado_id, programa_id, tipo, titulo, descripcion, puntos } = body;
      if (!empleado_id || !titulo) return NextResponse.json({ error: "Empleado y título requeridos" }, { status: 400 });
      const rows = await query(
        `INSERT INTO reconocimientos_empleado (user_id, empleado_id, programa_id, tipo, titulo, descripcion, puntos)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [uid, empleado_id, programa_id || null, tipo || 'logro', titulo, descripcion || '', puntos || 0]
      );
      return NextResponse.json({ reconocimiento: rows[0] });
    }

    if (accion === "alianza") {
      const { nombre_complejo, ubicacion, estado_ve, tipo, estrellas, descuento_pct, precio_base_usd, incluye_familia, max_personas, servicios, contacto_nombre, contacto_telefono, contacto_email, vigencia_inicio, vigencia_fin, imagen_url, notas } = body;
      if (!nombre_complejo || !ubicacion || !estado_ve || !vigencia_inicio || !vigencia_fin) {
        return NextResponse.json({ error: "Datos del complejo y vigencia son requeridos" }, { status: 400 });
      }
      const rows = await query(
        `INSERT INTO alianzas_vacacionales (user_id, nombre_complejo, ubicacion, estado_ve, tipo, estrellas, descuento_pct, precio_base_usd, incluye_familia, max_personas, servicios, contacto_nombre, contacto_telefono, contacto_email, vigencia_inicio, vigencia_fin, imagen_url, notas)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`,
        [uid, nombre_complejo, ubicacion, estado_ve, tipo || 'resort', estrellas || 3, descuento_pct || 0, precio_base_usd || 0, incluye_familia !== false, max_personas || 4, JSON.stringify(servicios || []), contacto_nombre || '', contacto_telefono || '', contacto_email || '', vigencia_inicio, vigencia_fin, imagen_url || '', notas || '']
      );
      return NextResponse.json({ alianza: rows[0] });
    }

    if (accion === "plan_vacaciones") {
      const { empleado_id, alianza_id, anio, fecha_salida, fecha_retorno, dias_solicitados, incluye_familia, num_familiares, destino, costo_estimado, subsidio_empresa, notas } = body;
      if (!empleado_id || !fecha_salida || !fecha_retorno) {
        return NextResponse.json({ error: "Empleado, fecha salida y retorno son requeridos" }, { status: 400 });
      }
      const rows = await query(
        `INSERT INTO planes_vacaciones (user_id, empleado_id, alianza_id, anio, fecha_salida, fecha_retorno, dias_solicitados, incluye_familia, num_familiares, destino, costo_estimado, subsidio_empresa, notas)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        [uid, empleado_id, alianza_id || null, anio || new Date().getFullYear(), fecha_salida, fecha_retorno, dias_solicitados || 15, incluye_familia || false, num_familiares || 0, destino || '', costo_estimado || 0, subsidio_empresa || 0, notas || '']
      );
      return NextResponse.json({ plan: rows[0] });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
