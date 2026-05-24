import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { ai } from "@/lib/ai/client";

const IVSS_RATES = {
  patronal: { base: 0.09, max: 0.11 },
  trabajador: 0.04,
  salarioMinimo: 150,
  topeSalarial: 1300,
};

export async function GET(req: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(req.url);
    const empleadoId = searchParams.get("empleado_id");

    let query = `
      SELECT ap.*, e.nombre, e.apellido, e.cedula, e.cargo,
        e.salario_base, e.fecha_ingreso, e.status
      FROM aportes_parafiscales ap
      JOIN empleados e ON e.id = ap.empleado_id
      WHERE ap.tipo = 'ivss'
    `;
    const params: any[] = [];

    if (empleadoId) {
      query += " AND ap.empleado_id = ?";
      params.push(empleadoId);
    }
    query += " ORDER BY ap.fecha_pago DESC LIMIT 50";

    const aportes = await db.query(query, params);

    const employees = await db.query(
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
    const db = await getDB();

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

      const prompt = `Eres un asistente experto en IVSS (Seguro Social) de Venezuela. 
Responde de forma clara y profesional.

Contexto actual - empleados de la empresa:
${empleadosInfo || "No hay empleados registrados aún."}

Instrucciones:
1. Interpreta lo que el usuario quiere hacer (registrar, calcular, consultar, etc.)
2. Si es un registro, extrae los datos del empleado de la conversación
3. Si es un cálculo, usa la tasa patronal 9-11% y trabajador 4%
4. Responde SOLO en formato JSON con esta estructura:
{
  "respuesta": "mensaje amigable al usuario",
  "accion": "registrar|calcular|consultar|pagar|certificado|otro",
  "datos": { ... datos relevantes ... },
  "exito": true|false
}

Mensaje del usuario: ${mensaje}`;

      const response = await ai.generateJson(prompt, {
        model: "gemini-2.5-flash",
        temperature: 0.3,
        maxTokens: 1024,
        systemInstruction: "Eres un asistente de IVSS. Siempre responde en JSON.",
      });

      return NextResponse.json({ success: true, ...response });
    }

    if (body.action === "registrar") {
      const { empleado_id, periodo, salario_base } = body;
      const base = Math.min(Math.max(salario_base || 0, IVSS_RATES.salarioMinimo), IVSS_RATES.topeSalarial);
      const pPatronal = +(base * IVSS_RATES.patronal.base).toFixed(2);
      const pTrabajador = +(base * IVSS_RATES.trabajador).toFixed(2);
      const result = await db.query(
        `INSERT INTO aportes_parafiscales (empleado_id, tipo, periodo, base_calculo, pct_patronal, pct_empleado, monto_patronal, monto_empleado, pagado, fecha_pago)
        VALUES (?, 'ivss', ?, ?, ?, ?, ?, ?, false, NULL)`,
        [empleado_id, periodo || new Date().toISOString().slice(0, 7), base, IVSS_RATES.patronal.base, IVSS_RATES.trabajador, pPatronal, pTrabajador]
      );
      return NextResponse.json({ success: true, id: result.insertId, message: "Registro IVSS creado exitosamente" });
    }

    return NextResponse.json({ success: false, error: "Acción no reconocida" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
