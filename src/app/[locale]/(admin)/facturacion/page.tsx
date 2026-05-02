"use client";

import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TabletSmartphone, CreditCard, Receipt, FilePlus, FileMinus, ShieldAlert, CircleCheck as CheckCircle, Loader as Loader2, Activity, TrendingUp, DollarSign, FileCheck, AlertTriangle, ChartColumn, Users, Wallet, Zap, Shield, Clock, ArrowUpRight, Sparkles, ChevronRight, BadgeCheck, Inbox } from "lucide-react";
import { Link } from "@/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/currency-context";
import { CurrencySelector } from "@/components/currency-selector";

const facturacionModules = [
    {
        title: "Punto de Venta (TPV)",
        description: "Procesa ventas en tiempo real con inventario y facturación sincronizada. Múltiples métodos de pago.",
        icon: TabletSmartphone,
        href: "/punto-de-venta",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10 border-blue-500/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    },
    {
        title: "Facturación a Crédito",
        description: "Ventas con financiamiento, control de cuentas por cobrar, integración con Cashea y pasarelas.",
        icon: CreditCard,
        href: "/facturacion-credito",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 border-emerald-500/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
    },
    {
        title: "Facturas Proforma",
        description: "Cotizaciones y facturas preliminares profesionales antes de la venta final.",
        icon: Receipt,
        href: "/proformas",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10 border-violet-500/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]",
    },
    {
        title: "Modelo de Factura SENIAT",
        description: "Modelo homologado de factura fiscal adaptado a la normativa vigente del SENIAT.",
        icon: FileText,
        href: "/modelo-factura",
        color: "text-primary",
        bgColor: "bg-primary/10 border-primary/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)]",
    },
    {
        title: "Nota de Débito",
        description: "Ajustes por intereses, cargos adicionales o correcciones al alza sobre facturas emitidas.",
        icon: FileMinus,
        href: "/nota-debito",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10 border-amber-500/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    },
    {
        title: "Nota de Crédito",
        description: "Anulaciones o correcciones por devoluciones, descuentos o errores en documentos emitidos.",
        icon: FilePlus,
        href: "/nota-credito",
        color: "text-rose-500",
        bgColor: "bg-rose-500/10 border-rose-500/15",
        glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]",
    },
];

interface KpiData {
  facturadoMes: number;
  documentosEmitidos: number;
  porCobrar: number;
  clientesActivos: number;
}

interface RecentDoc {
  doc: string;
  client: string;
  amount: number;
  status: string;
  date: string;
  type: string;
}

interface BottomStats {
  tasaBcv: string;
  proximaDeclaracion: string;
  estadoFiscal: string;
}

export default function FacturacionPage() {
  const { toast } = useToast();
  const { format: fmtCur } = useCurrency();
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [kpis, setKpis] = useState<KpiData>({ facturadoMes: 0, documentosEmitidos: 0, porCobrar: 0, clientesActivos: 0 });
  const [recentActivity, setRecentActivity] = useState<RecentDoc[]>([]);
  const [bottomStats, setBottomStats] = useState<BottomStats>({ tasaBcv: "—", proximaDeclaracion: "—", estadoFiscal: "—" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/facturacion/stats");
        if (res.ok) {
          const data = await res.json();
          setKpis(data.kpis || { facturadoMes: 0, documentosEmitidos: 0, porCobrar: 0, clientesActivos: 0 });
          setRecentActivity(data.recentActivity || []);
          setBottomStats(data.bottomStats || { tasaBcv: "—", proximaDeclaracion: "—", estadoFiscal: "—" });
        }
      } catch { /* silent */ }
      setLoading(false);
    };
    load();
  }, []);

  const handleAutoCorrect = async () => {
    setIsCorrecting(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "facturacion", subcategoria: "auditoria_fiscal", descripcion: "Auditoría automática de documentos de venta" }),
      });
      if (res.ok) {
        toast({ title: "Revisión Finalizada", description: "Se han auditado los documentos de venta. Resultados registrados.", action: <CheckCircle className="text-emerald-500 h-4 w-4" /> });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo ejecutar la auditoría." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setIsCorrecting(false);
    }
  };

  const kpiItems = [
    { label: "Facturado Este Mes", val: kpis.facturadoMes, isCurrency: true, icon: DollarSign, color: "text-emerald-500", glow: "shadow-emerald-500/20" },
    { label: "Documentos Emitidos", val: kpis.documentosEmitidos, isCurrency: false, icon: FileCheck, color: "text-blue-500", glow: "shadow-blue-500/20" },
    { label: "Cuentas por Cobrar", val: kpis.porCobrar, isCurrency: true, icon: Wallet, color: "text-amber-500", glow: "shadow-amber-500/20" },
    { label: "Clientes Activos", val: kpis.clientesActivos, isCurrency: false, icon: Users, color: "text-violet-500", glow: "shadow-violet-500/20" },
  ];

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
      </div>

      <ModuleTutorial config={moduleTutorials["facturacion"]} />

      <div>
        <BackButton href="/dashboard-empresa" label="Dashboard" />
        <motion.header
          className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wide text-primary mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Activity className="h-3 w-3 animate-pulse" /> CENTRO DE VENTAS
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
              Centro de{' '}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent italic">Facturación</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Ciclo de Vida Documental • Control de Ingresos</p>
          </div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CurrencySelector />
            <Button
              onClick={handleAutoCorrect}
              disabled={isCorrecting}
              className="rounded-2xl h-12 px-8 font-semibold uppercase text-[10px] tracking-[0.15em] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_8px_30px_-5px_rgba(14,165,233,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(14,165,233,0.5)] hover:-translate-y-0.5"
            >
              {isCorrecting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
              AUDITORÍA FISCAL IA
            </Button>
          </motion.div>
        </motion.header>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {kpiItems.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
          >
            <Card className={cn(
              "glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden",
              `hover:${kpi.glow} hover:shadow-lg`
            )}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-transparent to-current opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />
              <div className="flex justify-between items-start mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">{kpi.label}</p>
                <div className={cn("p-2 rounded-xl border transition-all duration-300 group-hover:scale-110",
                  kpi.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/15" :
                  kpi.color === "text-blue-500" ? "bg-blue-500/10 border-blue-500/15" :
                  kpi.color === "text-amber-500" ? "bg-amber-500/10 border-amber-500/15" :
                  "bg-violet-500/10 border-violet-500/15"
                )}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {loading ? <span className="text-muted-foreground/30">—</span> : kpi.isCurrency ? fmtCur(kpi.val) : kpi.val.toLocaleString('es-VE')}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/[0.04] via-blue-500/[0.02] to-cyan-500/[0.04] p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTAgMzZ2LTJoMnYyem0wLTR2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/15">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">Motor de Auditoría Inteligente</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">IA analiza cada documento fiscal en tiempo real contra la Providencia SNAT/2011/00071</p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">SHA-256</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facturacionModules.map((module, idx) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx + 0.3, duration: 0.4 }}
          >
            <Link href={module.href as any} className="group block h-full">
              <Card className={cn(
                "glass-card border-none bg-card/50 p-6 rounded-2xl h-full flex flex-col justify-between transition-all duration-500 relative overflow-hidden",
                module.glowColor
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl border w-fit transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3", module.bgColor)}>
                      <module.icon className={cn("h-5 w-5", module.color)} />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold uppercase tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{module.title}</CardTitle>
                    <CardDescription className="text-[11px] text-muted-foreground leading-relaxed">{module.description}</CardDescription>
                  </div>
                </div>
                <div className="pt-5 mt-auto relative z-10">
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground/30 group-hover:text-primary transition-all duration-300 uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Zap className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Acceder
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Actividad Reciente
                </CardTitle>
                <CardDescription className="text-[10px] mt-1">Últimos documentos fiscales procesados</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
                <ChartColumn className="mr-2 h-3.5 w-3.5" /> Ver Reportes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin h-5 w-5 text-muted-foreground/40" />
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
                  <Inbox className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider">Sin documentos recientes</p>
                <p className="text-[10px] text-muted-foreground/30">Los documentos aparecerán aquí conforme se emitan</p>
              </div>
            ) : (
              <div className="divide-y divide-border/20">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-all group/row cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.7 }}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn(
                        "p-2.5 rounded-xl border shrink-0 transition-all duration-300 group-hover/row:scale-110",
                        item.type === "factura" ? "bg-primary/8 border-primary/10" :
                        item.type === "nota_credito" ? "bg-rose-500/8 border-rose-500/10" :
                        item.type === "nota_debito" ? "bg-amber-500/8 border-amber-500/10" :
                        "bg-violet-500/8 border-violet-500/10"
                      )}>
                        <FileText className={cn(
                          "h-4 w-4",
                          item.type === "factura" ? "text-primary" :
                          item.type === "nota_credito" ? "text-rose-500" :
                          item.type === "nota_debito" ? "text-amber-500" :
                          "text-violet-500"
                        )} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground truncate group-hover/row:text-primary transition-colors">{item.doc}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{item.client}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-4">
                      <div>
                        <p className={cn("text-sm font-bold tabular-nums", item.amount < 0 ? "text-rose-500" : "text-foreground")}>{item.amount < 0 ? '-' : ''}{fmtCur(Math.abs(item.amount))}</p>
                        <div className="flex items-center gap-2 justify-end mt-0.5">
                          <span className={cn(
                            "text-[11px] font-bold uppercase px-2 py-0.5 rounded-md",
                            item.status === "Pagada" ? "bg-emerald-500/10 text-emerald-500" :
                            item.status === "Pendiente" ? "bg-amber-500/10 text-amber-500" :
                            item.status === "Procesada" ? "bg-blue-500/10 text-blue-500" :
                            item.status === "Emitida" ? "bg-cyan-500/10 text-cyan-500" :
                            "bg-violet-500/10 text-violet-500"
                          )}>{item.status}</span>
                          <span className="text-[11px] text-muted-foreground/40">{item.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover/row:text-primary group-hover/row:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.04] to-orange-500/[0.04] p-6 flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/15 shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground mb-0.5">Control de Deberes Formales SENIAT</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Todas las facturas se validan automáticamente antes de emitirse: RIF del cliente, base imponible, IVA 16%, IGTF 3%, retenciones ISLR, y numeración correlativa.</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 shrink-0 transition-all hover:scale-105">
          Ver Normativa
          <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        {[
          { label: "Tasa BCV", value: bottomStats.tasaBcv, icon: DollarSign, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15" },
          { label: "Próxima Declaración", value: bottomStats.proximaDeclaracion, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10 border-amber-500/15" },
          { label: "Estado Fiscal", value: bottomStats.estadoFiscal, icon: BadgeCheck, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15" },
        ].map((info, i) => (
          <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border bg-card/30 hover:bg-card/50 transition-all group">
            <div className={cn("p-2.5 rounded-xl border shrink-0 transition-transform group-hover:scale-110", info.bgColor)}>
              <info.icon className={cn("h-4 w-4", info.color)} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 mb-1">{info.label}</p>
              <p className="text-sm font-bold text-foreground">{info.value}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
