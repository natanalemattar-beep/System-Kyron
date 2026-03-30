import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const tipo = req.nextUrl.searchParams.get("tipo");
  const uid = session.userId;

  try {
    if (tipo === "manuales") {
      const manuales = await query(`SELECT * FROM manuales_procedimientos WHERE user_id = $1 ORDER BY created_at DESC`, [uid]);
      return NextResponse.json({ manuales });
    }
    if (tipo === "organigrama") {
      const nodos = await query(
        `SELECT o.*, e.nombre || ' ' || e.apellido AS empleado_nombre
         FROM organigrama_nodos o
         LEFT JOIN empleados e ON o.empleado_id = e.id
         WHERE o.user_id = $1 AND o.activo = true
         ORDER BY o.nivel ASC, o.departamento ASC`, [uid]
      );
      return NextResponse.json({ nodos });
    }
    if (tipo === "contratos") {
      const contratos = await query(
        `SELECT c.*, e.nombre || ' ' || e.apellido AS empleado_nombre
         FROM contratos_laborales c
         LEFT JOIN empleados e ON c.empleado_id = e.id
         WHERE c.user_id = $1
         ORDER BY c.created_at DESC`, [uid]
      );
      return NextResponse.json({ contratos });
    }

    const [manuales, nodos, contratos] = await Promise.all([
      query(`SELECT * FROM manuales_procedimientos WHERE user_id = $1 ORDER BY created_at DESC`, [uid]),
      query(`SELECT o.*, e.nombre || ' ' || e.apellido AS empleado_nombre FROM organigrama_nodos o LEFT JOIN empleados e ON o.empleado_id = e.id WHERE o.user_id = $1 AND o.activo = true ORDER BY o.nivel ASC`, [uid]),
      query(`SELECT c.*, e.nombre || ' ' || e.apellido AS empleado_nombre FROM contratos_laborales c LEFT JOIN empleados e ON c.empleado_id = e.id WHERE c.user_id = $1 ORDER BY c.created_at DESC`, [uid]),
    ]);
    return NextResponse.json({ manuales, nodos, contratos });
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

    if (accion === "manual") {
      const { titulo, departamento, cargo_destino, contenido, procedimientos, prohibiciones, version } = body;
      if (!titulo || !departamento || !contenido) {
        return NextResponse.json({ error: "Título, departamento y contenido son requeridos" }, { status: 400 });
      }
      const rows = await query(
        `INSERT INTO manuales_procedimientos (user_id, titulo, departamento, cargo_destino, contenido, procedimientos, prohibiciones, version)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [uid, titulo, departamento, cargo_destino || '', contenido, JSON.stringify(procedimientos || []), JSON.stringify(prohibiciones || []), version || '1.0']
      );
      return NextResponse.json({ manual: rows[0] });
    }

    if (accion === "nodo_organigrama") {
      const { nombre_cargo, departamento, nivel, padre_id, titular, empleado_id, tipo, color } = body;
      if (!nombre_cargo || !departamento) {
        return NextResponse.json({ error: "Cargo y departamento son requeridos" }, { status: 400 });
      }
      const rows = await query(
        `INSERT INTO organigrama_nodos (user_id, nombre_cargo, departamento, nivel, padre_id, titular, empleado_id, tipo, color)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [uid, nombre_cargo, departamento, nivel || 0, padre_id || null, titular || '', empleado_id || null, tipo || 'cargo', color || '#3b82f6']
      );
      return NextResponse.json({ nodo: rows[0] });
    }

    if (accion === "contrato") {
      const { empleado_id, titulo, tipo_contrato, fecha_inicio, fecha_fin, cargo, departamento, salario, beneficios, prohibiciones, clausulas, horario } = body;
      if (!titulo || !fecha_inicio || !cargo || !departamento) {
        return NextResponse.json({ error: "Título, fecha inicio, cargo y departamento son requeridos" }, { status: 400 });
      }
      const rows = await query(
        `INSERT INTO contratos_laborales (user_id, empleado_id, titulo, tipo_contrato, fecha_inicio, fecha_fin, cargo, departamento, salario, beneficios, prohibiciones, clausulas, horario)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [uid, empleado_id || null, titulo, tipo_contrato || 'indefinido', fecha_inicio, fecha_fin || null, cargo, departamento, salario || 0, JSON.stringify(beneficios || []), JSON.stringify(prohibiciones || []), JSON.stringify(clausulas || []), horario || 'Lunes a Viernes 8:00 AM - 5:00 PM']
      );
      return NextResponse.json({ contrato: rows[0] });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
