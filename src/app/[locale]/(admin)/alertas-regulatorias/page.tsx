"use client";

import { useState, useMemo } from "react";
import {
  TriangleAlert, ShieldAlert, Landmark, FileText, Gavel, Bell,
  Search, Filter, ChevronDown, ExternalLink, Calendar, AlertTriangle,
  CheckCircle2, Info, ArrowRight, BrainCircuit, Building2, Scale,
  Globe, Users, Banknote, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AlertaItem {
  id: string;
  tipo: string;
  titulo: string;
  resumen: string;
  fecha: string;
  ente: string;
  urgencia: string;
  accion: string;
  baseLegal: string;
  impacto: string[];
}

const GACETAS: AlertaItem[] = [
  { id: "GO-6970", tipo: "gaceta", titulo: "Ajuste del Ingreso Mínimo Integral Indexado — Mayo 2026", resumen: "Decreto presidencial que establece el nuevo valor del Ingreso Mínimo Integral en $240 USD (indexados). Impacta nómina y costo operativo.", fecha: "2026-05-01", ente: "Presidencia", urgencia: "critica", accion: "Ajustar cálculo de nómina inmediatamente. Actualizar base de cálculo de beneficios laborales.", baseLegal: "Gaceta 6.970 Extraordinario", impacto: ["fiscal", "laboral", "comercial"] },
  { id: "GO-6965", tipo: "gaceta", titulo: "Ley de Protección del Esequibo y Soberanía Territorial", resumen: "Marco legal para defensa del Esequibo, creación del estado Guayana Esequiba. Nuevas regulaciones para empresas en áreas limítrofes.", fecha: "2026-04-30", ente: "Asamblea Nacional", urgencia: "critica", accion: "Revisar impacto en operaciones si aplica. Evaluar incentivos fiscales del nuevo régimen.", baseLegal: "Gaceta 6.965 Extraordinario", impacto: ["fiscal", "comercial", "ambiental"] },
  { id: "GO-6960", tipo: "gaceta", titulo: "Ley de Activos Digitales y Criptofiscalidad", resumen: "Regulación definitiva sobre activos digitales para pago de tributos. Retención para exchanges locales.", fecha: "2026-04-28", ente: "SUNACRIP", urgencia: "critica", accion: "Registrarse ante SUNACRIP. Implementar retención del 5%. Reportar transacciones cripto mensual.", baseLegal: "Gaceta 6.960 Extraordinario", impacto: ["fiscal", "comercial"] },
  { id: "GO-6952", tipo: "gaceta", titulo: "Reforma Tributaria 2026 — Decretos 5.196, 5.197, 5.198", resumen: "Modificaciones al IVA, régimen aduanero y arancel de aduanas. Nuevas alícuotas y exenciones.", fecha: "2025-12-31", ente: "SENIAT", urgencia: "critica", accion: "Actualizar sistemas de facturación y retención de IVA. Revisar clasificación arancelaria.", baseLegal: "Gaceta 6.952 Extraordinario", impacto: ["fiscal", "comercial"] },
  { id: "GO-6950", tipo: "gaceta", titulo: "Ajuste de la Unidad Tributaria (UT) 2026", resumen: "Nuevo valor de la UT. Afecta cálculo de multas, sanciones, tasas y contribuciones de todos los entes.", fecha: "2025-11-15", ente: "SENIAT", urgencia: "critica", accion: "Actualizar sistemas con nuevo valor UT. Recalcular provisiones para multas y sanciones.", baseLegal: "Gaceta 6.950 Extraordinario", impacto: ["fiscal", "laboral", "comercial"] },
  { id: "GO-6948", tipo: "gaceta", titulo: "Reforma Parcial de la LOTTT", resumen: "Modificaciones a la LOTTT. Ajustes en jornada laboral, beneficios sociales y régimen de inamovilidad.", fecha: "2025-10-20", ente: "Asamblea Nacional", urgencia: "alta", accion: "Actualizar contratos laborales. Revisar política de beneficios y jornada.", baseLegal: "Gaceta 6.948 Extraordinario", impacto: ["laboral"] },
  { id: "GO-6938", tipo: "gaceta", titulo: "Reforma del Régimen Cambiario", resumen: "Nuevas normas para operaciones en divisas. Obligaciones de reporte al BCV.", fecha: "2025-07-30", ente: "BCV / AN", urgencia: "alta", accion: "Actualizar sistema de facturación en divisas. Implementar reportes BCV.", baseLegal: "Gaceta 6.938 Extraordinario", impacto: ["fiscal", "comercial"] },
  { id: "GO-6930", tipo: "gaceta", titulo: "Providencia SNAT — Facturación Electrónica Obligatoria", resumen: "Implementación progresiva de facturación electrónica para todos los contribuyentes.", fecha: "2025-05-15", ente: "SENIAT", urgencia: "critica", accion: "Implementar facturación electrónica. Verificar especificaciones técnicas XML.", baseLegal: "Gaceta 6.930 Ordinaria", impacto: ["fiscal", "comercial"] },
  { id: "AN-2025-001", tipo: "asamblea", titulo: "Reforma del Código Orgánico Tributario", resumen: "Nuevo régimen sancionatorio. Multas por evasión incrementadas. Responsabilidad solidaria ampliada.", fecha: "2025-12-15", ente: "Asamblea Nacional", urgencia: "critica", accion: "Auditoría interna de cumplimiento tributario. Actualizar procedimientos de declaración y pago.", baseLegal: "Gaceta pendiente", impacto: ["fiscal"] },
  { id: "AN-2025-003", tipo: "asamblea", titulo: "Ley de Protección de Datos Personales", resumen: "Primera ley integral de protección de datos. Derechos ARCO. Registro de bases de datos obligatorio.", fecha: "2025-10-01", ente: "Asamblea Nacional", urgencia: "critica", accion: "Designar DPO. Auditar bases de datos. Registrar ante autoridad de control.", baseLegal: "Pendiente publicación", impacto: ["comercial"] },
  { id: "AN-2026-001", tipo: "asamblea", titulo: "Ley de Economía Digital y Criptoactivos", resumen: "Marco regulatorio para criptomonedas y fintech. Impuesto 5% sobre ganancias de capital en cripto.", fecha: "2026-01-20", ente: "Asamblea Nacional", urgencia: "critica", accion: "Registrarse ante SUNACRIP. Implementar retención reportes.", baseLegal: "Gaceta pendiente", impacto: ["fiscal", "comercial"] },
  { id: "GO-6945", tipo: "gaceta", titulo: "Providencia SUNDDE — Precios Justos", resumen: "Nuevos márgenes de ganancia. Actualización SISECOMR. Marcaje obligatorio.", fecha: "2025-09-30", ente: "SUNDDE", urgencia: "alta", accion: "Ajustar precios según tabla SUNDDE. Reportar inventarios.", baseLegal: "Gaceta 6.945 Ordinaria", impacto: ["comercial"] },
  { id: "AN-2025-002", tipo: "asamblea", titulo: "Reforma LOTTT — Teletrabajo", resumen: "Regulación del teletrabajo. Derechos y obligaciones. Provisión de equipos y conectividad.", fecha: "2025-11-20", ente: "Asamblea Nacional", urgencia: "alta", accion: "Actualizar contratos. Crear política de teletrabajo. Registrar ante ministerio.", baseLegal: "Gaceta pendiente", impacto: ["laboral"] },
];

const URGENCIA_ORDER: Record<string, number> = { critica: 0, alta: 1, media: 2, informativa: 3 };

export default function AlertasRegulatoriasPage() {
  const [search, setSearch] = useState("");
  const [filtroUrgencia, setFiltroUrgencia] = useState<string | null>(null);
  const [filtroImpacto, setFiltroImpacto] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = [...GACETAS].sort((a, b) => {
      const uDiff = (URGENCIA_ORDER[a.urgencia] ?? 9) - (URGENCIA_ORDER[b.urgencia] ?? 9);
      if (uDiff !== 0) return uDiff;
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    if (filtroUrgencia) items = items.filter(a => a.urgencia === filtroUrgencia);
    if (filtroImpacto) items = items.filter(a => a.impacto.includes(filtroImpacto));
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(a =>
        a.titulo.toLowerCase().includes(q) ||
        a.ente.toLowerCase().includes(q) ||
        a.resumen.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, filtroUrgencia, filtroImpacto]);

  const urgenciaCount = (u: string) => GACETAS.filter(a => a.urgencia === u).length;
  const impactoCount = (i: string) => GACETAS.filter(a => a.impacto.includes(i)).length;

  const getColor = (u: string) => {
    switch (u) {
      case "critica": return { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", card: "border-l-red-500/40" };
      case "alta": return { dot: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", card: "border-l-amber-500/40" };
      case "media": return { dot: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", card: "border-l-blue-500/40" };
      default: return { dot: "bg-muted-foreground", text: "text-muted-foreground", bg: "bg-muted/30", border: "border-border/50", card: "border-l-muted" };
    }
  };

  const getTipoIcon = (t: string) => {
    switch (t) {
      case "gaceta": return <FileText className="h-4 w-4" />;
      case "asamblea": return <Gavel className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/20">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">Alertas Regulatorias</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Monitoreo <span className="text-red-400">Regulatorio</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gacetas Oficiales · Reformas · Providencias · Cambios Legislativos — {GACETAS.filter(a => a.urgencia === "critica").length} críticas, {GACETAS.filter(a => a.urgencia === "alta").length} altas
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: null, label: "Todas", value: GACETAS.length, color: "border-t-muted-foreground/30" },
          { key: "critica", label: "Críticas", value: urgenciaCount("critica"), color: "border-t-red-500/30" },
          { key: "alta", label: "Altas", value: urgenciaCount("alta"), color: "border-t-amber-500/30" },
          { key: "media", label: "Medias", value: urgenciaCount("media"), color: "border-t-blue-500/30" },
        ].map((s, i) => (
          <button key={i} onClick={() => setFiltroUrgencia(s.key)}
            className={`rounded-xl border border-border bg-card p-4 shadow-sm shadow-black/[0.02] border-t-2 ${s.color} text-left transition-all hover:shadow-md ${filtroUrgencia === s.key ? "ring-2 ring-primary/30" : ""}`}>
            <p className="text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar alertas..." className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40" />
        </div>
        <div className="flex gap-1">
          {["fiscal", "laboral", "comercial"].map(imp => (
            <button key={imp} onClick={() => setFiltroImpacto(filtroImpacto === imp ? null : imp)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filtroImpacto === imp ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted/30 text-muted-foreground/50 border border-border/50 hover:text-foreground/70"}`}>
              {imp} ({impactoCount(imp)})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Search className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground/50 font-medium">Sin resultados</p>
          </div>
        ) : filtered.map((alerta) => {
          const c = getColor(alerta.urgencia);
          const isExpanded = expanded === alerta.id;
          return (
            <div key={alerta.id} className={`rounded-xl border border-border bg-card shadow-sm shadow-black/[0.02] ${isExpanded ? "" : "hover:shadow-md"} transition-all overflow-hidden`}>
              <button onClick={() => setExpanded(isExpanded ? null : alerta.id)}
                className="w-full flex items-start gap-4 p-5 text-left">
                <div className={`h-10 w-10 rounded-xl ${c.bg} ${c.border} flex items-center justify-center shrink-0`}>
                  {getTipoIcon(alerta.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <span className={`text-[10px] font-black uppercase tracking-wider ${c.text}`}>
                      {alerta.urgencia === "critica" ? "CRÍTICA" : alerta.urgencia === "alta" ? "ALTA" : "MEDIA"}
                    </span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-border/50 text-muted-foreground">
                      {alerta.tipo === "gaceta" ? "Gaceta" : "Asamblea"}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-foreground">{alerta.titulo}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                    <span>{alerta.ente}</span>
                    <span>·</span>
                    <span>{alerta.fecha}</span>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground/40 mt-2 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed pt-4">{alerta.resumen}</p>
                  <div className="rounded-xl bg-muted/20 border border-border/50 p-4">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Acción Requerida</p>
                    <p className="text-sm text-foreground">{alerta.accion}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground/40" />
                      <span>{alerta.baseLegal}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {alerta.impacto.map(imp => (
                        <Badge key={imp} variant="secondary" className="text-[9px] h-4 px-1.5">
                          {imp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
