import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { ai } from "@/lib/ai/client";

const IVSS_RATES = {
  patronal: { base: 0.09, max: 0.11 },
  trabajador: 0.04,
  salarioMinimo: 150,
  topeSalarial: 1300,
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const empleadoId = searchParams.get("empleado_id");

    let sql = `
      SELECT ap.*, e.nombre, e.apellido, e.cedula, e.cargo,
        e.salario_base, e.fecha_ingreso, e.status
      FROM aportes_parafiscales ap
      JOIN empleados e ON e.id = ap.empleado_id
      WHERE ap.tipo = 'ivss'
    `;
    const params: any[] = [];

    if (empleadoId) {
      sql += " AND ap.empleado_id = $1";
      params.push(empleadoId);
    }
    sql += " ORDER BY ap.fecha_pago DESC LIMIT 50";

    const aportes = await query(sql, params);

    const employees = await query(
      `SELECT id, nombre, apellido, cedula, cargo, salario_base, fecha_ingreso, status,
        (SELECT COUNT(*) FROM aportes_parafiscales WHERE empleado_id = e.id AND tipo = 'ivss') as aportes_count,
        (SELECT MAX(fecha_pago) FROM aportes_parafiscales WHERE empleado_id = e.id AND tipo = 'ivss') as ultimo_aporte
      FROM empleados e ORDER BY e.nombre ASC`
    );

    return NextResponse.json({ success: true, aportes, employees, rates: IVSS_RATES });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === "calcular") {
      const { empleado_id, salario_base } = body;
      if (!empleado_id || !salario_base) {
        return NextResponse.json({ success: false, error: "empleado_id y salario_base requeridos" }, { status: 400 });
      }
      const base = Math.min(Math.max(salario_base, IVSS_RATES.salarioMinimo), IVSS_RATES.topeSalarial);
      const pPatronal = +(base * IVSS_RATES.patronal.base).toFixed(2);
      const pTrabajador = +(base * IVSS_RATES.trabajador).toFixed(2);
      return NextResponse.json({ success: true, calculo: { salario_base: base, aporte_patronal: pPatronal, aporte_trabajador: pTrabajador, total: +(pPatronal + pTrabajador).toFixed(2), mes: new Date().toISOString().slice(0, 7) } });
    }

    if (body.action === "ai") {
      const { mensaje, empleados } = body;
      if (!mensaje) {
        return NextResponse.json({ success: false, error: "Mensaje requerido" }, { status: 400 });
      }
      const empleadosInfo = (empleados || []).map((e: any) =>
        `${e.nombre} ${e.apellido} (V-${e.cedula}, cargo: ${e.cargo || "N/A"}, salario: $${e.salario_base || 0})`
      ).join("\n");

      const prompt = `Eres un asistente experto en IVSS (Seguro Social) de Venezuela. Responde de forma clara y profesional.

Contexto actual - empleados de la empresa:
${empleadosInfo || "No hay empleados registrados aún."}

Instrucciones:
- Interpreta lo que el usuario quiere hacer (registrar, calcular, consultar, etc.)
- Si es un registro, extrae los datos del empleado de la conversación
- Si es un cálculo, usa la tasa patronal 9-11% y trabajador 4%
- Responde SIEMPRE en JSON con esta estructura exacta:
{
  "respuesta": "mensaje amigable al usuario",
  "accion": "registrar|calcular|consultar|pagar|certificado|otro",
  "datos": {},
  "exito": true
}

Mensaje del usuario: ${mensaje}`;

      const response = await ai.generateJson<{ respuesta: string; accion: string; datos: any; exito: boolean }>(prompt, {
        model: "gemini-1.5-flash",
        temperature: 0.3,
        maxTokens: 1024,
        systemInstruction: "Eres un asistente de IVSS. Siempre responde en JSON exacto.",
      }, { respuesta: "No pude procesar tu consulta. Intenta de nuevo con otras palabras.", accion: "otro", datos: {}, exito: false });

      return NextResponse.json({ success: true, ...response });
    }

    if (body.action === "registrar") {
      const { empleado_id, periodo, salario_base } = body;
      const base = Math.min(Math.max(salario_base || 0, IVSS_RATES.salarioMinimo), IVSS_RATES.topeSalarial);
      const pPatronal = +(base * IVSS_RATES.patronal.base).toFixed(2);
      const pTrabajador = +(base * IVSS_RATES.trabajador).toFixed(2);
      await query(
        `INSERT INTO aportes_parafiscales (empleado_id, tipo, periodo, base_calculo, pct_patronal, pct_empleado, monto_patronal, monto_empleado, pagado, fecha_pago)
        VALUES ($1, 'ivss', $2, $3, $4, $5, $6, $7, false, NULL)`,
        [empleado_id, periodo || new Date().toISOString().slice(0, 7), base, IVSS_RATES.patronal.base, IVSS_RATES.trabajador, pPatronal, pTrabajador]
      );
      return NextResponse.json({ success: true, message: "Registro IVSS creado exitosamente" });
    }

    return NextResponse.json({ success: false, error: "Acción no reconocida" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
