import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface AlertaVencimiento {
  categoria: string;
  label: string;
  item: string;
  dias: number;
  nivel: "vencido" | "urgente" | "proximo" | "ok";
  fecha: string;
  href: string;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const uid = session.userId;

  try {
    const alertas: AlertaVencimiento[] = [];

    const [cxcRows, cxpRows, clRows, legRows, nomRows, presRows] = await Promise.all([
      query<{ id: number; descripcion: string; fecha_vencimiento: string; monto: string; estado: string }>(
        `SELECT id, COALESCE(concepto, 'CxC #' || id) AS descripcion, fecha_vencimiento::text, monto::text, estado
         FROM cuentas_por_cobrar
         WHERE user_id = $1 AND estado IN ('pendiente','parcial') AND fecha_vencimiento IS NOT NULL
         ORDER BY fecha_vencimiento ASC LIMIT 20`,
        [uid]
      ),
      query<{ id: number; descripcion: string; fecha_vencimiento: string; monto: string; estado: string }>(
        `SELECT id, COALESCE(concepto, 'CxP #' || id) AS descripcion, fecha_vencimiento::text, monto::text, estado
         FROM cuentas_por_pagar
         WHERE user_id = $1 AND estado IN ('pendiente','parcial') AND fecha_vencimiento IS NOT NULL
         ORDER BY fecha_vencimiento ASC LIMIT 20`,
        [uid]
      ),
      query<{ id: number; titulo: string; fecha_fin: string; cargo: string }>(
        `SELECT id, titulo, fecha_fin::text, cargo
         FROM contratos_laborales
         WHERE user_id = $1 AND estado IN ('vigente','firmado') AND fecha_fin IS NOT NULL
         ORDER BY fecha_fin ASC LIMIT 15`,
        [uid]
      ),
      query<{ id: number; titulo: string; fecha_fin: string; contraparte: string }>(
        `SELECT id, titulo, fecha_fin::text, COALESCE(contraparte, '') AS contraparte
         FROM contratos_legales
         WHERE user_id = $1 AND estado = 'activo' AND fecha_fin IS NOT NULL
         ORDER BY fecha_fin ASC LIMIT 15`,
        [uid]
      ),
      query<{ id: number; periodo: string; fecha_pago: string; tipo: string; estado: string }>(
        `SELECT id, periodo, COALESCE(fecha_pago, fecha_fin)::text AS fecha_pago, tipo, estado
         FROM nominas
         WHERE user_id = $1 AND estado = 'pendiente' AND (fecha_pago IS NOT NULL OR fecha_fin IS NOT NULL)
         ORDER BY COALESCE(fecha_pago, fecha_fin) ASC LIMIT 10`,
        [uid]
      ),
      query<{ id: number; nombre: string; periodo_fin: string; pct: string }>(
        `SELECT id, nombre, periodo_fin::text,
           CASE WHEN monto_presupuestado > 0 THEN ROUND((monto_ejecutado / monto_presupuestado) * 100)::text ELSE '0' END AS pct
         FROM presupuestos
         WHERE user_id = $1 AND estado = 'activo' AND periodo_fin IS NOT NULL
         ORDER BY periodo_fin ASC LIMIT 10`,
        [uid]
      ),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function diasHasta(fechaStr: string): number {
      const f = new Date(fechaStr);
      f.setHours(0, 0, 0, 0);
      return Math.ceil((f.getTime() - today.getTime()) / 86400000);
    }

    function nivel(dias: number): "vencido" | "urgente" | "proximo" | "ok" {
      if (dias < 0) return "vencido";
      if (dias <= 7) return "urgente";
      if (dias <= 30) return "proximo";
      return "ok";
    }

    for (const r of cxcRows) {
      const d = diasHasta(r.fecha_vencimiento);
      if (d > 30) continue;
      alertas.push({
        categoria: "Ctas. por Cobrar",
        label: r.descripcion,
        item: `Bs ${parseFloat(r.monto).toLocaleString("es-VE")}`,
        dias: d,
        nivel: nivel(d),
        fecha: r.fecha_vencimiento,
        href: "/cuentas-por-cobrar",
      });
    }

    for (const r of cxpRows) {
      const d = diasHasta(r.fecha_vencimiento);
      if (d > 30) continue;
      alertas.push({
        categoria: "Ctas. por Pagar",
        label: r.descripcion,
        item: `Bs ${parseFloat(r.monto).toLocaleString("es-VE")}`,
        dias: d,
        nivel: nivel(d),
        fecha: r.fecha_vencimiento,
        href: "/cuentas-por-pagar",
      });
    }

    for (const r of clRows) {
      const d = diasHasta(r.fecha_fin);
      if (d > 60) continue;
      alertas.push({
        categoria: "Contrato Laboral",
        label: r.titulo,
        item: r.cargo,
        dias: d,
        nivel: nivel(d),
        fecha: r.fecha_fin,
        href: "/contratos-laborales",
      });
    }

    for (const r of legRows) {
      const d = diasHasta(r.fecha_fin);
      if (d > 60) continue;
      alertas.push({
        categoria: "Contrato Legal",
        label: r.titulo,
        item: r.contraparte,
        dias: d,
        nivel: nivel(d),
        fecha: r.fecha_fin,
        href: "/escritorio-juridico",
      });
    }

    for (const r of nomRows) {
      const d = diasHasta(r.fecha_pago);
      alertas.push({
        categoria: "Nómina",
        label: `${r.tipo} — ${r.periodo}`,
        item: "Pendiente de pago",
        dias: d,
        nivel: d < 0 ? "vencido" : d <= 3 ? "urgente" : "proximo",
        fecha: r.fecha_pago,
        href: "/contabilidad/libros/nomina",
      });
    }

    for (const r of presRows) {
      const d = diasHasta(r.periodo_fin);
      const pct = parseInt(r.pct);
      if (d > 30 && pct < 85) continue;
      alertas.push({
        categoria: "Presupuesto",
        label: r.nombre,
        item: `${pct}% ejecutado`,
        dias: d,
        nivel: pct > 100 ? "vencido" : pct >= 85 ? "urgente" : nivel(d),
        fecha: r.periodo_fin,
        href: "/presupuestos",
      });
    }

    alertas.sort((a, b) => a.dias - b.dias);

    const vencidos = alertas.filter(a => a.nivel === "vencido").length;
    const urgentes = alertas.filter(a => a.nivel === "urgente").length;
    const proximos = alertas.filter(a => a.nivel === "proximo").length;

    const globalLevel: "rojo" | "amarillo" | "verde" =
      vencidos > 0 ? "rojo" : urgentes > 0 ? "amarillo" : "verde";

    return NextResponse.json({
      global: { level: globalLevel, vencidos, urgentes, proximos },
      alertas: alertas.slice(0, 25),
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("[semaforo-alertas]", err);
    return NextResponse.json({ error: "Error al obtener estado" }, { status: 500 });
  }
}
