import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface ModuleStatus {
  module: string;
  label: string;
  level: "verde" | "amarillo" | "rojo";
  criticas: number;
  advertencias: number;
  total: number;
  detalle: string;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const uid = session.userId;

  try {
    const now = new Date();
    const modules: ModuleStatus[] = [];

    const [
      inventarioRows,
      cxcRows,
      cxpRows,
      contratosLaboralesRows,
      nominaRows,
      presupuestoRows,
      contratosLegalesRows,
      securityRows,
      clientesRows,
    ] = await Promise.all([
      query<{ bajo: string; agotado: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE stock_actual <= stock_minimo AND stock_actual > 0) AS bajo,
          COUNT(*) FILTER (WHERE stock_actual <= 0) AS agotado
        FROM inventario WHERE user_id = $1`,
        [uid]
      ),
      query<{ vencidas: string; proximas: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE fecha_vencimiento < NOW() AND estado IN ('pendiente','parcial')) AS vencidas,
          COUNT(*) FILTER (WHERE fecha_vencimiento BETWEEN NOW() AND NOW() + INTERVAL '7 days' AND estado IN ('pendiente','parcial')) AS proximas
        FROM cuentas_por_cobrar WHERE user_id = $1`,
        [uid]
      ),
      query<{ vencidas: string; proximas: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE fecha_vencimiento < NOW() AND estado IN ('pendiente','parcial')) AS vencidas,
          COUNT(*) FILTER (WHERE fecha_vencimiento BETWEEN NOW() AND NOW() + INTERVAL '7 days' AND estado IN ('pendiente','parcial')) AS proximas
        FROM cuentas_por_pagar WHERE user_id = $1`,
        [uid]
      ),
      query<{ vencidos: string; proximos: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE fecha_fin < NOW() AND estado IN ('vigente','firmado')) AS vencidos,
          COUNT(*) FILTER (WHERE fecha_fin BETWEEN NOW() AND NOW() + INTERVAL '30 days' AND estado IN ('vigente','firmado')) AS proximos
        FROM contratos_laborales WHERE user_id = $1`,
        [uid]
      ),
      query<{ pendientes: string }>(
        `SELECT COUNT(*) AS pendientes FROM nominas WHERE user_id = $1 AND estado = 'pendiente'`,
        [uid]
      ),
      query<{ excedidos: string; cerca: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE monto_ejecutado > monto_presupuestado) AS excedidos,
          COUNT(*) FILTER (WHERE monto_ejecutado > monto_presupuestado * 0.85 AND monto_ejecutado <= monto_presupuestado) AS cerca
        FROM presupuestos WHERE user_id = $1 AND estado = 'activo'`,
        [uid]
      ),
      query<{ vencidos: string; proximos: string }>(
        `SELECT
          COUNT(*) FILTER (WHERE fecha_fin < NOW() AND estado = 'activo') AS vencidos,
          COUNT(*) FILTER (WHERE fecha_fin BETWEEN NOW() AND NOW() + INTERVAL '30 days' AND estado = 'activo') AS proximos
        FROM contratos_legales WHERE user_id = $1`,
        [uid]
      ),
      query<{ intentos: string }>(
        `SELECT COUNT(*) AS intentos FROM activity_log
         WHERE evento LIKE '%fallido%' AND creado_en > NOW() - INTERVAL '24 hours'
         AND user_id = $1`,
        [uid]
      ),
      query<{ inactivos: string }>(
        `SELECT COUNT(*) AS inactivos FROM clientes
         WHERE user_id = $1 AND (ultima_compra IS NULL OR ultima_compra < NOW() - INTERVAL '90 days')`,
        [uid]
      ),
    ]);

    const inv = inventarioRows[0];
    const invAgotado = parseInt(inv?.agotado || "0");
    const invBajo = parseInt(inv?.bajo || "0");
    modules.push({
      module: "inventario",
      label: "Inventario",
      level: invAgotado > 0 ? "rojo" : invBajo > 0 ? "amarillo" : "verde",
      criticas: invAgotado,
      advertencias: invBajo,
      total: invAgotado + invBajo,
      detalle: invAgotado > 0 ? `${invAgotado} agotado(s)` : invBajo > 0 ? `${invBajo} stock bajo` : "Stock OK",
    });

    const cxc = cxcRows[0];
    const cxcV = parseInt(cxc?.vencidas || "0");
    const cxcP = parseInt(cxc?.proximas || "0");
    modules.push({
      module: "cuentas_por_cobrar",
      label: "Ctas. por Cobrar",
      level: cxcV > 0 ? "rojo" : cxcP > 0 ? "amarillo" : "verde",
      criticas: cxcV,
      advertencias: cxcP,
      total: cxcV + cxcP,
      detalle: cxcV > 0 ? `${cxcV} vencida(s)` : cxcP > 0 ? `${cxcP} próxima(s)` : "Al día",
    });

    const cxp = cxpRows[0];
    const cxpV = parseInt(cxp?.vencidas || "0");
    const cxpP = parseInt(cxp?.proximas || "0");
    modules.push({
      module: "cuentas_por_pagar",
      label: "Ctas. por Pagar",
      level: cxpV > 0 ? "rojo" : cxpP > 0 ? "amarillo" : "verde",
      criticas: cxpV,
      advertencias: cxpP,
      total: cxpV + cxpP,
      detalle: cxpV > 0 ? `${cxpV} vencida(s)` : cxpP > 0 ? `${cxpP} próxima(s)` : "Al día",
    });

    const cl = contratosLaboralesRows[0];
    const clV = parseInt(cl?.vencidos || "0");
    const clP = parseInt(cl?.proximos || "0");
    modules.push({
      module: "rrhh",
      label: "RRHH",
      level: clV > 0 ? "rojo" : clP > 0 ? "amarillo" : "verde",
      criticas: clV,
      advertencias: clP,
      total: clV + clP,
      detalle: clV > 0 ? `${clV} contrato(s) vencido(s)` : clP > 0 ? `${clP} por vencer` : "Sin alertas",
    });

    const nom = nominaRows[0];
    const nomP = parseInt(nom?.pendientes || "0");
    modules.push({
      module: "nomina",
      label: "Nómina",
      level: nomP > 3 ? "rojo" : nomP > 0 ? "amarillo" : "verde",
      criticas: nomP > 3 ? nomP : 0,
      advertencias: nomP > 0 && nomP <= 3 ? nomP : 0,
      total: nomP,
      detalle: nomP > 0 ? `${nomP} pendiente(s)` : "Procesada",
    });

    const pres = presupuestoRows[0];
    const presE = parseInt(pres?.excedidos || "0");
    const presC = parseInt(pres?.cerca || "0");
    modules.push({
      module: "presupuestos",
      label: "Presupuestos",
      level: presE > 0 ? "rojo" : presC > 0 ? "amarillo" : "verde",
      criticas: presE,
      advertencias: presC,
      total: presE + presC,
      detalle: presE > 0 ? `${presE} excedido(s)` : presC > 0 ? `${presC} cerca del límite` : "Dentro del rango",
    });

    const leg = contratosLegalesRows[0];
    const legV = parseInt(leg?.vencidos || "0");
    const legP = parseInt(leg?.proximos || "0");
    modules.push({
      module: "legal",
      label: "Legal",
      level: legV > 0 ? "rojo" : legP > 0 ? "amarillo" : "verde",
      criticas: legV,
      advertencias: legP,
      total: legV + legP,
      detalle: legV > 0 ? `${legV} contrato(s) vencido(s)` : legP > 0 ? `${legP} por vencer` : "Sin alertas",
    });

    const sec = securityRows[0];
    const secI = parseInt(sec?.intentos || "0");
    modules.push({
      module: "seguridad",
      label: "Seguridad",
      level: secI > 10 ? "rojo" : secI > 3 ? "amarillo" : "verde",
      criticas: secI > 10 ? secI : 0,
      advertencias: secI > 3 && secI <= 10 ? secI : 0,
      total: secI,
      detalle: secI > 10 ? `${secI} intentos fallidos` : secI > 3 ? `${secI} intentos sospechosos` : "Sin amenazas",
    });

    const cli = clientesRows[0];
    const cliI = parseInt(cli?.inactivos || "0");
    modules.push({
      module: "clientes",
      label: "Clientes",
      level: cliI > 10 ? "rojo" : cliI > 0 ? "amarillo" : "verde",
      criticas: cliI > 10 ? cliI : 0,
      advertencias: cliI > 0 && cliI <= 10 ? cliI : 0,
      total: cliI,
      detalle: cliI > 0 ? `${cliI} inactivo(s) 90d+` : "Todos activos",
    });

    const totalCriticas = modules.reduce((s, m) => s + m.criticas, 0);
    const totalAdvertencias = modules.reduce((s, m) => s + m.advertencias, 0);
    const globalLevel: "verde" | "amarillo" | "rojo" =
      totalCriticas > 0 ? "rojo" : totalAdvertencias > 0 ? "amarillo" : "verde";

    return NextResponse.json({
      global: { level: globalLevel, criticas: totalCriticas, advertencias: totalAdvertencias },
      modules,
      timestamp: now.toISOString(),
    });
  } catch (err: unknown) {
    console.error("[semaforo-alertas]", err);
    return NextResponse.json({ error: "Error al obtener estado" }, { status: 500 });
  }
}
