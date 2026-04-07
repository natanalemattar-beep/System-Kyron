"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Link } from "@/navigation";
import {
  Calculator, Wallet, TrendingUp, Activity, BookOpen, Receipt, Users, HandCoins, Zap,
  ArrowRight, Book, History, Box, Landmark, BrainCircuit, ShieldCheck, Bot, Loader2,
  ShieldAlert, BarChart3, CircleCheck as CheckCircle, Handshake,
  CreditCard, Smartphone, Building2, Phone, MessageSquare, Heart, Shield, Car,
  Banknote, RefreshCw, Store, Wifi, Globe, Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const frequentAccess = [
  { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, color: "text-primary" },
  { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, color: "text-emerald-600" },
  { label: "ESFL y Condominios", href: "/contabilidad/entidades-sin-fines-lucro", icon: Handshake, color: "text-emerald-600" },
  { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, color: "text-primary" },
];

const serviciosBancarios = [
  {
    label: "Conciliación Bancaria",
    desc: "Gestión contable y conciliación automática",
    href: "/contabilidad/conciliacion-bancaria",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    label: "Punto de Ventas",
    desc: "Terminales POS y reporte diario automático",
    href: "/contabilidad/punto-de-ventas",
    icon: Store,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Pagos Digitales",
    desc: "Tarjetas, billeteras virtuales, Pago Móvil",
    href: "/contabilidad/pagos-digitales",
    icon: CreditCard,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

const serviciosTelecom = [
  {
    label: "Facturación Electrónica",
    desc: "Sistema VEN-NIF con internet ilimitado incluido",
    href: "/contabilidad/facturacion-telecom",
    icon: Wifi,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Telefonía Corporativa",
    desc: "Líneas telefónicas con planes integrados",
    href: "/contabilidad/telefonia-corporativa",
    icon: Phone,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "WhatsApp Empresarial",
    desc: "API WhatsApp Business integrado con facturación",
    href: "/contabilidad/whatsapp-empresarial",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

const alianzas = [
  {
    label: "Chévere Salud",
    desc: "Cobertura médica corporativa para empleados y directivos",
    href: "/contabilidad/alianzas/chevere-salud",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    tag: "SALUD",
  },
  {
    label: "Mercantil Seguros",
    desc: "Pólizas de responsabilidad civil, activos y salud colectiva",
    href: "/contabilidad/alianzas/mercantil-seguros",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
    tag: "SEGUROS",
  },
  {
    label: "Mapfre",
    desc: "Seguro de flota vehicular, accidentes y cobertura patrimonial",
    href: "/contabilidad/alianzas/mapfre",
    icon: Car,
    color: "text-red-600",
    bg: "bg-red-600/10",
    border: "border-red-600/20",
    tag: "SEGUROS",
  },
];

interface DashboardKPI {
  liquidez: number;
  cuentasCobrar: number;
  cuentasPagar: number;
  facturasActivas: number;
  compromisos: number;
}

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [isAuditing, setIsAuditing] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStreaming, setAiStreaming] = useState(false);
  const aiAbortRef = useMemo(() => ({ current: null as AbortController | null }), []);
  const [kpi, setKpi] = useState<DashboardKPI | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setKpi({
            liquidez: d.liquidezTotal ?? 0,
            cuentasCobrar: d.cuentasCobrar?.total ?? d.ingresos ?? 0,
            cuentasPagar: d.cuentasPagar?.total ?? d.gastos ?? 0,
            facturasActivas: d.facturas?.emitidas ?? 0,
            compromisos: d.facturas?.vencidas ?? 0,
          });
        }
      })
      .catch((err) => { console.warn('[contabilidad-kpi]', err.message); })
      .finally(() => setKpiLoading(false));
  }, []);

  const handleAIAnalysis = useCallback(async () => {
    if (aiAbortRef.current) aiAbortRef.current.abort();
    const abort = new AbortController();
    aiAbortRef.current = abort;

    setShowAI(true);
    setAiLoading(true);
    setAiStreaming(false);
    setAiAnalysis("");
    try {
      const res = await fetch("/api/ai/analyze-dashboard", {
        method: "POST",
        signal: abort.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: "Centro Contable — VEN-NIF",
          stream: true,
          data: kpi ?? {},
          context: "Dashboard contable empresarial Venezuela. Normas VEN-NIF, SENIAT, retenciones ISLR/IVA. Fecha: " + new Date().toLocaleDateString("es-VE"),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: json.error, variant: "destructive" });
        setShowAI(false);
        setAiLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setAiLoading(false); return; }

      setAiStreaming(true); setAiLoading(false);

      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.text) {
                  fullText += parsed.text;
                  setAiAnalysis(fullText);
                }
              } catch {}
            }
          }
        }
      } finally {
        setAiStreaming(false);
      }
      if (!fullText) setAiAnalysis("No se pudo generar el análisis. Intente nuevamente.");
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        toast({ title: "Error de conexión", variant: "destructive" });
        setShowAI(false);
      }
    } finally {
      setAiLoading(false); setAiStreaming(false);
    }
  }, [toast, kpi, aiAbortRef]);

  const runForensicAudit = async () => {
    setIsAuditing(true);
    toast({ title: "Iniciando auditoría", description: "Escaneando el Ledger central VEN-NIF..." });
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "auditoria_forense", descripcion: "Auditoría forense del Ledger central VEN-NIF" }),
      });
      if (res.ok) {
        toast({ title: "Análisis completado", description: "Auditoría forense registrada. Resultados disponibles en el panel." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo iniciar la auditoría." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setIsAuditing(false);
    }
  };

  const kpiCards = [
    { label: "Liquidez", val: kpi ? formatCurrency(kpi.liquidez, "Bs.") : "—", color: "text-emerald-600", icon: Wallet },
    { label: "Cuentas por Cobrar", val: kpi ? formatCurrency(kpi.cuentasCobrar, "Bs.") : "—", color: "text-primary", icon: TrendingUp },
    { label: "Cuentas por Pagar", val: kpi ? formatCurrency(kpi.cuentasPagar, "Bs.") : "—", color: "text-rose-600", icon: HandCoins },
    { label: "Facturas Activas", val: kpi ? String(kpi.facturasActivas) : "—", color: "text-amber-600", icon: Receipt },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen bg-background">
      <ModuleTutorial config={moduleTutorials["contabilidad"]} />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-5 w-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Contabilidad
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            VEN-NIF · IVA 16% · IGTF 3% · ISLR 34%
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={runForensicAudit}
            disabled={isAuditing}
          >
            {isAuditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
            Auditoría Forense
          </Button>
          <Button className="rounded-xl" asChild>
            <Link href="/contabilidad/cierre-contable">
              <Receipt className="mr-2 h-4 w-4" /> Cerrar Periodo
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((k, i) => (
          <Card key={i} className="border rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{k.label}</p>
              <k.icon className={cn("h-4 w-4", k.color)} />
            </div>
            <p className={cn("text-2xl font-bold tracking-tight", k.color)}>
              {kpiLoading ? "..." : k.val}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="border rounded-2xl shadow-sm p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold uppercase tracking-tight">Asistente IA</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Análisis contable automatizado con inteligencia artificial sobre los datos reales del período actual.
              </p>
              <Button variant="secondary" className="w-full rounded-xl" onClick={handleAIAnalysis}>
                <Sparkles className="mr-2 h-4 w-4" /> Analizar Dashboard
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <OverviewChart />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Accesos Directos</h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {frequentAccess.map((item, i) => (
                <Link key={i} href={item.href as any}>
                  <Card className="border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[120px] flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                        <item.icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{item.label}</p>
                    </div>
                    <div className="flex justify-end mt-3">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Banknote className="h-5 w-5 text-blue-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Servicios Bancarios y Pagos</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {serviciosBancarios.map((s, i) => (
            <Link key={i} href={s.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", s.border)}>
                <div className={cn("p-3 rounded-xl w-fit", s.bg)}>
                  <s.icon className={cn("h-5 w-5", s.color)} />
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", s.color)}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Globe className="h-5 w-5 text-cyan-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Línea Corporativa</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {serviciosTelecom.map((s, i) => (
            <Link key={i} href={s.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", s.border)}>
                <div className={cn("p-3 rounded-xl w-fit", s.bg)}>
                  <s.icon className={cn("h-5 w-5", s.color)} />
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", s.color)}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Handshake className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Alianzas Estratégicas</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {alianzas.map((a, i) => (
            <Link key={i} href={a.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", a.border)}>
                <div className="flex items-start justify-between">
                  <div className={cn("p-3 rounded-xl", a.bg)}>
                    <a.icon className={cn("h-5 w-5", a.color)} />
                  </div>
                  <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide border", a.bg, a.color, a.border)}>{a.tag}</span>
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", a.color)}>{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Dialog open={showAI} onOpenChange={setShowAI}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <span>KYRON Analytics — Contabilidad</span>
                <p className="text-[11px] font-normal text-muted-foreground/50 mt-0.5">Análisis contable VEN-NIF en tiempo real</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-2 min-h-0">
            {aiLoading && !aiAnalysis ? (
              <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">Procesando análisis contable...</span>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-3">
                <div className="p-5 bg-gradient-to-br from-cyan-500/[0.02] to-blue-500/[0.02] rounded-xl border border-cyan-500/8">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">Análisis Ejecutivo</span>
                    {aiStreaming && <span className="text-[11px] text-muted-foreground/40 animate-pulse ml-auto">● Generando...</span>}
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-sm prose-headings:font-bold prose-p:text-xs prose-p:leading-relaxed prose-li:text-xs prose-li:leading-relaxed prose-strong:text-foreground">
                    <MarkdownRenderer content={aiAnalysis} />
                  </div>
                </div>
                {!aiLoading && !aiStreaming && (
                  <p className="text-[11px] text-muted-foreground/30 px-1">Powered by KYRON AI</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">No se pudo generar el análisis.</p>
            )}
          </div>
          <DialogFooter className="flex-row gap-2">
            {(aiAnalysis && !aiLoading && !aiStreaming) && (
              <Button variant="outline" onClick={handleAIAnalysis} disabled={aiLoading || aiStreaming} className="rounded-xl text-xs h-8 mr-auto">
                <RefreshCw className="mr-1.5 h-3 w-3" /> Regenerar
              </Button>
            )}
            <Button variant="outline" className="rounded-xl text-xs h-8" onClick={() => setShowAI(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
