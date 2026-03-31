"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TrendingUp, TrendingDown, Activity, Zap, ArrowRight, ArrowUpRight, ArrowDownRight,
  BookOpen, Landmark, Users, History, Box, Receipt, Loader as Loader2,
  RefreshCw, Calendar, Lock, Search, FileText, BrainCircuit, Sparkles,
  Shield, Scale, Briefcase, Leaf, Globe, AlertTriangle, Wifi,
  PercentCircle, Building2, Gavel, Wallet, CreditCard, Banknote,
  CircleCheck as CheckCircle, Calculator, Bell, Package, DollarSign,
  BarChart3, PieChart, Eye, ChevronRight, Sun, Moon, Sunrise, Clock
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth/context";
import {
  Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  PieChart as RPieChart, Pie, Cell, Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ChartErrorBoundary } from "@/components/chart-error-boundary";

interface DashboardData {
  ingresos: number;
  gastos: number;
  utilidadNeta: number;
  liquidezTotal: number;
  cuentasCobrar: { total: number; count: number };
  cuentasPagar: { total: number; count: number };
  facturas: { emitidas: number; cobradas: number; vencidas: number; pagadas: number; total: number };
  empleados: number;
  nominaMensual: number;
  clientesActivos: number;
  facturasEsteMes: { count: number; monto: number };
  inventarioBajoStock: number;
  notificacionesNoLeidas: number;
  variaciones: { ingresos: number; gastos: number; utilidad: number };
  tasaBCV: { usd_ves: number; fecha: string } | null;
  movimientosRecientes: Array<{
    id: number; fecha_operacion: string; concepto: string; monto: string;
    tipo: string; referencia: string | null; categoria: string | null;
  }>;
  chartMensual: Array<{ mes: string; ingresos: number; gastos: number }>;
}

interface ActivityLog { id: number; evento: string; categoria: string; descripcion: string | null; created_at: string; }
interface CierrePeriodo { id?: number; periodo: string; ingresos: number; gastos: number; utilidad: number; facturas_emitidas: number; facturas_cobradas: number; }

function fmtBs(n: number): string {
  return new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return fmtBs(n);
}

function getGreeting(hour: number): { text: string; icon: typeof Sun } {
  if (hour >= 5 && hour < 12) return { text: "Buenos días", icon: Sunrise };
  if (hour >= 12 && hour < 18) return { text: "Buenas tardes", icon: Sun };
  return { text: "Buenas noches", icon: Moon };
}

function getHealthScore(data: DashboardData): { score: number; label: string; color: string } {
  let score = 50;
  if (data.utilidadNeta > 0) score += 15;
  if (data.variaciones.ingresos > 0) score += 10;
  if (data.variaciones.gastos < 0) score += 5;
  if (data.facturas.vencidas === 0) score += 10;
  if (data.liquidezTotal > 0) score += 5;
  if (data.inventarioBajoStock === 0) score += 5;
  score = Math.min(100, Math.max(0, score));
  if (score >= 80) return { score, label: "Excelente", color: "text-emerald-400" };
  if (score >= 60) return { score, label: "Bueno", color: "text-blue-400" };
  if (score >= 40) return { score, label: "Regular", color: "text-amber-400" };
  return { score, label: "Atención", color: "text-rose-400" };
}

const CAT_COLOR: Record<string, string> = {
  contabilidad: "text-blue-400", rrhh: "text-emerald-400", legal: "text-purple-400",
  banco: "text-amber-400", auth: "text-rose-400", sistema: "text-slate-400",
  clientes: "text-cyan-400", ia: "text-primary", nomina: "text-orange-400",
  telecom: "text-teal-400", eco: "text-green-400", documentos: "text-indigo-400",
};

const chartConfig = {
  ingresos: { label: "Ingresos", color: "hsl(142.1 76.2% 36.3%)" },
  gastos: { label: "Gastos", color: "hsl(346.8 77.2% 49.8%)" },
} satisfies ChartConfig;

const DONUT_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 56;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="opacity-30 group-hover:opacity-60 transition-opacity">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardEmpresaPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCierre, setShowCierre] = useState(false);
  const [closingData, setClosingData] = useState<CierrePeriodo | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [closingForm, setClosingForm] = useState({ periodo: "", fecha_inicio: "", fecha_fin: "", notas: "" });
  const [showAuditoria, setShowAuditoria] = useState(false);
  const [auditLogs, setAuditLogs] = useState<ActivityLog[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditSearch, setAuditSearch] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [clientDateStr, setClientDateStr] = useState<string | null>(null);
  const [clientTimeStr, setClientTimeStr] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<{ text: string; icon: typeof Sun } | null>(null);
  const [clientClosingForm, setClientClosingForm] = useState<{ periodo: string; fecha_inicio: string; fecha_fin: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    setClientTimeStr(now.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" }));
    setClientDateStr(now.toLocaleDateString("es-VE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
    setGreeting(getGreeting(now.getHours()));
    const periodoStr = now.toLocaleString("es-VE", { month: "long", year: "numeric" }).toUpperCase();
    const fechaInicio = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const fechaFin = now.toISOString().split("T")[0];
    setClientClosingForm({ periodo: periodoStr, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
    setClosingForm(f => ({ ...f, periodo: periodoStr, fecha_inicio: fechaInicio, fecha_fin: fechaFin }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClientTimeStr(new Date().toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try { const res = await fetch("/api/dashboard", { cache: "no-store" }); if (res.ok) setData(await res.json()); }
    catch {} finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const healthScore = useMemo(() => data ? getHealthScore(data) : null, [data]);
  const sparklineData = useMemo(() => {
    if (!data?.chartMensual?.length) return { ingresos: [], gastos: [] };
    return { ingresos: data.chartMensual.map(d => d.ingresos), gastos: data.chartMensual.map(d => d.gastos) };
  }, [data]);

  const handlePreviewCierre = async () => {
    setIsClosing(true);
    try {
      const qs = `?periodo=${encodeURIComponent(closingForm.periodo)}&fecha_inicio=${closingForm.fecha_inicio}&fecha_fin=${closingForm.fecha_fin}&preview=true`;
      const res = await fetch(`/api/periodo-cierre${qs}`);
      if (res.ok) {
        const json = await res.json();
        if (json.cierres && json.cierres.length === 0) {
          const ing = data?.ingresos ?? 0; const gas = data?.gastos ?? 0;
          setClosingData({ periodo: closingForm.periodo, ingresos: ing, gastos: gas, utilidad: ing - gas, facturas_emitidas: data?.facturas.emitidas ?? 0, facturas_cobradas: data?.facturas.cobradas ?? 0 });
        }
      }
    } finally { setIsClosing(false); }
  };

  const handleConfirmCierre = async () => {
    setIsClosing(true);
    try {
      const res = await fetch("/api/periodo-cierre", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...closingForm, cerrado_por: user?.nombre ?? "Usuario" }) });
      const json = await res.json();
      if (res.ok) { setClosingData(json.cierre); toast({ title: "PERIODO FISCAL CERRADO", description: `${closingForm.periodo} — Utilidad: Bs. ${fmtBs(json.cierre?.utilidad ?? 0)}` }); setShowCierre(false); fetchDashboard(); }
      else toast({ title: "Error", description: json.error ?? "No se pudo cerrar", variant: "destructive" });
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    setIsClosing(false);
  };

  const handleAuditoria = async () => {
    setShowAuditoria(true); setAuditLoading(true);
    try { const res = await fetch("/api/activity-log?limit=100"); if (res.ok) { const json = await res.json(); setAuditLogs(json.logs ?? []); } }
    catch {} finally { setAuditLoading(false); }
  };

  const filteredLogs = auditLogs.filter(l => !auditSearch || l.evento.toLowerCase().includes(auditSearch.toLowerCase()) || (l.descripcion ?? "").toLowerCase().includes(auditSearch.toLowerCase()) || l.categoria.toLowerCase().includes(auditSearch.toLowerCase()));

  const handleAIAnalysis = async () => {
    setShowAI(true);
    if (!data) { toast({ title: "Sin datos", description: "Carga el dashboard primero.", variant: "destructive" }); return; }
    setAiLoading(true); setAiAnalysis(null);
    try {
      const res = await fetch("/api/ai/analyze-dashboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ module: "Dashboard Empresarial", data: { ingresos: data.ingresos, gastos: data.gastos, utilidadNeta: data.utilidadNeta, liquidezTotal: data.liquidezTotal, cuentasCobrar: data.cuentasCobrar, cuentasPagar: data.cuentasPagar, facturas: data.facturas, empleados: data.empleados, movimientosRecientes: data.movimientosRecientes?.slice(0, 5) }, context: `Empresa: ${user?.nombre ?? "N/A"}. Fecha: ${clientDateStr ?? ""}` }) });
      const json = await res.json();
      if (res.ok) setAiAnalysis(json.analysis);
      else { toast({ title: "Error", description: json.error, variant: "destructive" }); setShowAI(false); }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); setShowAI(false); }
    finally { setAiLoading(false); }
  };

  const variacionIcon = (v: number) => v > 0 ? <ArrowUpRight className="h-3 w-3" /> : v < 0 ? <ArrowDownRight className="h-3 w-3" /> : null;
  const variacionColor = (v: number, invert = false) => { if (v === 0) return "text-muted-foreground"; return (invert ? v < 0 : v > 0) ? "text-emerald-400" : "text-rose-400"; };
  const facturasPie = data ? [{ name: "Cobradas", value: data.facturas.cobradas }, { name: "Emitidas", value: data.facturas.emitidas }, { name: "Pagadas", value: data.facturas.pagadas }, { name: "Vencidas", value: data.facturas.vencidas }].filter(d => d.value > 0) : [];
  const GreetingIcon = greeting?.icon ?? Sun;

  return (
    <div className="space-y-5 pb-16 max-w-6xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a1225] via-[#101d38] to-[#0d162c] p-6 md:p-8 text-white mt-4 md:mt-6"
      >
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-indigo-500/[0.04] blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/15">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {greeting && <GreetingIcon className="h-4 w-4 text-amber-300/60" />}
                  <h1 className="text-lg md:text-xl font-bold tracking-tight">
                    {greeting?.text ?? "Hola"}{user?.nombre ? `, ${user.nombre.split(" ")[0]}` : ""}
                  </h1>
                </div>
                <p className="text-[11px] text-white/35 font-medium capitalize">{clientDateStr ?? ""} · {clientTimeStr ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400/80 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> En línea
              </span>
              {data?.tasaBCV && (
                <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/45 font-mono">
                  USD/VES {data.tasaBCV.usd_ves.toFixed(2)}
                </span>
              )}
              {healthScore && !loading && (
                <span className={cn("text-[10px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] font-semibold flex items-center gap-1.5", healthScore.color)}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {healthScore.score}% · {healthScore.label}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap no-print">
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-medium text-white/40 hover:text-white hover:bg-white/[0.05]" onClick={() => fetchDashboard(true)} disabled={refreshing}>
              <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", refreshing && "animate-spin")} /> Actualizar
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[10px] font-medium text-white/40 hover:text-white hover:bg-white/[0.05]" onClick={handleAuditoria}>
              <History className="h-3.5 w-3.5 mr-1.5" /> Auditoría
            </Button>
            <Button size="sm" className="h-8 px-4 rounded-lg text-[10px] font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-md shadow-cyan-500/15" onClick={handleAIAnalysis} disabled={aiLoading || loading}>
              <BrainCircuit className="h-3.5 w-3.5 mr-1.5" /> IA
            </Button>
            <Button size="sm" className="h-8 px-4 rounded-lg text-[10px] font-medium bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]" onClick={() => { setClosingData(null); setShowCierre(true); }}>
              <Lock className="h-3.5 w-3.5 mr-1.5" /> Cerrar Período
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Ingresos", value: data ? fmtBs(data.ingresos) : "—", variacion: data?.variaciones.ingresos, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/8", ring: "ring-emerald-500/10", sparkColor: "#10b981", sparkData: sparklineData.ingresos },
          { label: "Gastos", value: data ? fmtBs(data.gastos) : "—", variacion: data?.variaciones.gastos, invertVariacion: true, icon: TrendingDown, color: "text-rose-500", bg: "bg-rose-500/8", ring: "ring-rose-500/10", sparkColor: "#f43f5e", sparkData: sparklineData.gastos },
          { label: "Utilidad Neta", value: data ? fmtBs(data.utilidadNeta) : "—", variacion: data?.variaciones.utilidad, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10", sparkColor: "#f59e0b", sparkData: sparklineData.ingresos.map((v, i) => v - (sparklineData.gastos[i] || 0)) },
          { label: "Liquidez", value: data ? fmtBs(data.liquidezTotal) : "—", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/8", ring: "ring-blue-500/10", sparkColor: "#3b82f6", sparkData: [] as number[] },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}>
            <Card className={cn("group border border-border/30 rounded-xl overflow-hidden h-full bg-card/80 transition-all hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5 duration-300 ring-0 hover:ring-4", kpi.ring)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold text-muted-foreground/60">{kpi.label}</span>
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300", kpi.bg)}>
                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                  </div>
                </div>
                {loading ? (
                  <div className="h-7 w-28 bg-muted/20 rounded-lg animate-pulse" />
                ) : (
                  <div className="flex items-end justify-between gap-2">
                    <p className="text-lg md:text-xl font-bold tracking-tight text-foreground">{kpi.value}</p>
                    {kpi.sparkData && kpi.sparkData.length > 1 && <MiniSparkline data={kpi.sparkData} color={kpi.sparkColor || "#888"} />}
                  </div>
                )}
                {kpi.variacion !== undefined && !loading && (
                  <div className={cn("flex items-center gap-1 mt-1.5 text-[10px] font-semibold", variacionColor(kpi.variacion, kpi.invertVariacion))}>
                    {variacionIcon(kpi.variacion)}
                    <span>{kpi.variacion > 0 ? "+" : ""}{kpi.variacion}% vs mes anterior</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Clientes Activos", value: data?.clientesActivos ?? 0, icon: Users, color: "text-cyan-500", bg: "bg-cyan-500/8", ring: "ring-cyan-500/10", href: "/fidelizacion-clientes" },
          { label: "Empleados", value: data?.empleados ?? 0, icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/8", ring: "ring-emerald-500/10", href: "/dashboard-rrhh" },
          { label: "Facturas del Mes", value: data?.facturasEsteMes.count ?? 0, icon: Receipt, color: "text-amber-500", bg: "bg-amber-500/8", ring: "ring-amber-500/10", extra: data?.facturasEsteMes.monto ? `Bs. ${fmtCompact(data.facturasEsteMes.monto)}` : undefined, href: "/facturacion" },
          { label: "Notificaciones", value: data?.notificacionesNoLeidas ?? 0, icon: Bell, color: "text-indigo-500", bg: "bg-indigo-500/8", ring: "ring-indigo-500/10", alert: (data?.notificacionesNoLeidas ?? 0) > 0, href: "/notificaciones" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
            <Link href={stat.href as never}>
              <div className={cn("flex items-center gap-3 p-3.5 rounded-xl border border-border/30 bg-card/60 hover:bg-card hover:shadow-md hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group ring-0 hover:ring-4", stat.ring)}>
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300", stat.bg)}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-base font-bold tracking-tight">{loading ? "—" : stat.value}</p>
                    {stat.extra && !loading && <span className="text-[9px] text-muted-foreground/35">{stat.extra}</span>}
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground/50 truncate">{stat.label}</p>
                </div>
                {stat.alert && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />}
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/15 group-hover:text-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div className="lg:col-span-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="border border-border/30 rounded-xl overflow-hidden bg-card/80">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground/70">Flujo Financiero</CardTitle>
                <p className="text-[10px] text-muted-foreground/40 mt-0.5">Últimos 12 meses</p>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground/20" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-[260px] w-full">
                {loading ? (
                  <div className="h-full flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground/20" /></div>
                ) : (data?.chartMensual?.length ?? 0) === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/20">
                    <BarChart3 className="h-10 w-10" />
                    <p className="text-[10px] font-semibold">Sin datos históricos</p>
                  </div>
                ) : (
                  <ChartErrorBoundary fallbackLabel="Error al cargar flujo financiero">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data!.chartMensual} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gIng" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.2}/><stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0}/></linearGradient>
                            <linearGradient id="gGas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-gastos)" stopOpacity={0.15}/><stop offset="95%" stopColor="var(--color-gastos)" stopOpacity={0}/></linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <XAxis dataKey="mes" stroke="#475569" fontSize={9} fontWeight="600" axisLine={false} tickLine={false} tickMargin={10} />
                          <YAxis stroke="#475569" fontSize={9} fontWeight="600" axisLine={false} tickLine={false} tickFormatter={(v) => fmtCompact(v as number)} width={45} />
                          <ChartTooltip cursor={{ stroke: "rgba(255,255,255,0.06)" }} content={<ChartTooltipContent indicator="dot" formatter={(v) => `Bs. ${fmtBs(v as number)}`} />} />
                          <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" strokeWidth={2} fillOpacity={1} fill="url(#gIng)" />
                          <Area type="monotone" dataKey="gastos" stroke="var(--color-gastos)" strokeWidth={2} fillOpacity={1} fill="url(#gGas)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </ChartErrorBoundary>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-4 space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border border-border/30 rounded-xl bg-card/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-foreground/60">Facturación</span>
              <PieChart className="h-3.5 w-3.5 text-muted-foreground/20" />
            </div>
            {loading ? (
              <div className="h-28 flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground/20" /></div>
            ) : facturasPie.length === 0 ? (
              <div className="h-28 flex flex-col items-center justify-center gap-1 text-muted-foreground/20">
                <Receipt className="h-7 w-7" />
                <p className="text-[10px] font-medium">Sin facturas</p>
              </div>
            ) : (
              <ChartErrorBoundary fallbackLabel="Error al cargar facturación">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart><Pie data={facturasPie} innerRadius={24} outerRadius={44} dataKey="value" stroke="none" paddingAngle={3}>{facturasPie.map((_, idx) => <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />)}</Pie></RPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {facturasPie.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                        <span className="text-[10px] text-muted-foreground/60 truncate">{d.name}</span>
                        <span className="text-[11px] font-bold ml-auto">{d.value}</span>
                      </div>
                    ))}
                    <div className="pt-1 border-t border-border/15">
                      <span className="text-[10px] text-muted-foreground/40">Total: <span className="font-bold text-foreground">{data?.facturas.total ?? 0}</span></span>
                    </div>
                  </div>
                </div>
              </ChartErrorBoundary>
            )}
          </Card>

          <Card className="border border-border/30 rounded-xl bg-card/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-foreground/60">Cuentas</span>
              <Scale className="h-3.5 w-3.5 text-muted-foreground/20" />
            </div>
            <div className="space-y-2.5">
              <Link href="/cuentas-por-cobrar" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/8 hover:bg-emerald-500/[0.07] transition-colors">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[11px] font-medium text-foreground/60">Por Cobrar</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-400">{loading ? "—" : `Bs. ${fmtBs(data?.cuentasCobrar.total ?? 0)}`}</p>
                    <p className="text-[9px] text-muted-foreground/35">{data?.cuentasCobrar.count ?? 0} pendientes</p>
                  </div>
                </div>
              </Link>
              <Link href="/cuentas-por-pagar" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg bg-rose-500/[0.04] border border-rose-500/8 hover:bg-rose-500/[0.07] transition-colors">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />
                    <span className="text-[11px] font-medium text-foreground/60">Por Pagar</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-400">{loading ? "—" : `Bs. ${fmtBs(data?.cuentasPagar.total ?? 0)}`}</p>
                    <p className="text-[9px] text-muted-foreground/35">{data?.cuentasPagar.count ?? 0} pendientes</p>
                  </div>
                </div>
              </Link>
              {(data?.inventarioBajoStock ?? 0) > 0 && (
                <Link href="/inventario" className="block">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/[0.04] border border-amber-500/8 hover:bg-amber-500/[0.07] transition-colors">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-[11px] font-medium text-foreground/60">Stock Bajo</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">{data?.inventarioBajoStock} items</span>
                  </div>
                </Link>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="border border-border/30 rounded-xl bg-card/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-foreground/60">Últimos Movimientos</span>
              <Link href="/contabilidad/conciliacion-bancaria">
                <span className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1">Ver todos <ChevronRight className="h-3 w-3" /></span>
              </Link>
            </div>
            {loading ? (
              <div className="space-y-2">{[1, 2, 3, 4].map(n => <div key={n} className="h-10 bg-muted/10 rounded-lg animate-pulse" />)}</div>
            ) : data?.movimientosRecientes?.length ? (
              <div className="space-y-1">
                {data.movimientosRecientes.slice(0, 6).map((mov) => (
                  <div key={mov.id} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/10 transition-all">
                    <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", mov.tipo === "credito" ? "bg-emerald-500/8" : "bg-rose-500/8")}>
                      {mov.tipo === "credito" ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" /> : <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium truncate text-foreground/70">{mov.concepto}</p>
                      <p className="text-[9px] text-muted-foreground/35">{mov.fecha_operacion}{mov.categoria ? ` · ${mov.categoria}` : ""}</p>
                    </div>
                    <span className={cn("text-[11px] font-bold tabular-nums shrink-0", mov.tipo === "credito" ? "text-emerald-400" : "text-rose-400")}>
                      {mov.tipo === "credito" ? "+" : "-"}{fmtBs(parseFloat(mov.monto))}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <DollarSign className="h-8 w-8 text-muted-foreground/10 mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground/30">Sin movimientos registrados</p>
                <Link href="/contabilidad/conciliacion-bancaria"><Button variant="outline" size="sm" className="mt-3 text-[10px] font-medium rounded-lg h-7 border-border/30">Registrar</Button></Link>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border border-emerald-500/10 rounded-xl bg-card/80 p-4 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] font-semibold text-foreground/60">Fiscal</span>
              <Badge className="ml-auto bg-emerald-500/8 text-emerald-400 border-emerald-500/15 text-[9px] font-semibold h-5 rounded-md">OK</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "IVA 16%", status: "Al día" },
                { label: "IGTF 3%", status: "Configurado" },
                { label: "ISLR 34%", status: "Retenciones OK" },
                { label: "SENIAT", status: "Sincronizado" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/[0.06]">
                  <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-foreground/60">{item.label}</p>
                    <p className="text-[8px] text-emerald-400/60">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {[
                { text: "Declaración IVA", date: clientClosingForm ? `Vence ${String(new Date(clientClosingForm.fecha_fin).getMonth() + 2).padStart(2, "0")}/${new Date(clientClosingForm.fecha_fin).getFullYear()}` : "Vence próximo mes", color: "text-amber-400", icon: PercentCircle },
                { text: "Conciliación bancaria", date: "Antes de cierre", color: "text-blue-400", icon: CreditCard },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/5 border border-border/10">
                  <a.icon className={cn("h-3.5 w-3.5 shrink-0", a.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium truncate">{a.text}</p>
                    <p className={cn("text-[8px] font-medium", a.color)}>{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-3 space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <Card className="border border-border/30 rounded-xl bg-gradient-to-b from-[#0a1225] to-card/90 p-4 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-500/[0.06] blur-[40px]" />
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-1 text-white/90">Escenarios IA</h3>
              <p className="text-[9px] text-white/30 mb-3">Modelado predictivo</p>
              <div className="space-y-1.5">
                <Button size="sm" variant="outline" className="w-full h-8 text-[10px] font-medium rounded-lg border-white/8 bg-white/[0.02] text-white/60 hover:bg-emerald-500/15 hover:border-emerald-500/15 hover:text-emerald-300 justify-start"
                  onClick={() => { const a = data ? data.ingresos * 1.2 : 0; toast({ title: "Ventas +20%", description: `Ingresos: Bs. ${fmtBs(a)} · Utilidad: Bs. ${fmtBs(a - (data?.gastos ?? 0))}` }); }}>
                  <TrendingUp className="h-3 w-3 mr-2 text-emerald-400" /> Ventas +20%
                </Button>
                <Button size="sm" variant="outline" className="w-full h-8 text-[10px] font-medium rounded-lg border-white/8 bg-white/[0.02] text-white/60 hover:bg-rose-500/15 hover:border-rose-500/15 hover:text-rose-300 justify-start"
                  onClick={() => { const inf = data ? data.gastos * 1.35 : 0; toast({ title: "Inflación 35%", description: `Gastos: Bs. ${fmtBs(inf)} · Utilidad: Bs. ${fmtBs((data?.ingresos ?? 0) - inf)}` }); }}>
                  <AlertTriangle className="h-3 w-3 mr-2 text-rose-400" /> Inflación 35%
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border border-border/30 rounded-xl bg-card/80 p-4">
            <span className="text-[11px] font-semibold text-foreground/60 mb-3 block">Nómina</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold tracking-tight">{loading ? "—" : `Bs. ${fmtBs(data?.nominaMensual ?? 0)}`}</span>
            </div>
            <p className="text-[10px] text-muted-foreground/40">{data?.empleados ?? 0} empleados activos</p>
            <Link href="/contabilidad/libros/nomina"><Button variant="outline" size="sm" className="mt-2 w-full h-7 text-[10px] font-medium rounded-lg border-border/25">Ver Nómina</Button></Link>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center gap-2 mb-3 ml-1">
          <Globe className="h-4 w-4 text-muted-foreground/30" />
          <span className="text-[11px] font-semibold text-foreground/60">Módulos</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { label: "Contabilidad", href: "/contabilidad", icon: Calculator, color: "text-blue-500", bg: "bg-blue-500/8" },
            { label: "Facturación", href: "/facturacion", icon: Receipt, color: "text-amber-500", bg: "bg-amber-500/8" },
            { label: "Legal", href: "/escritorio-juridico", icon: Gavel, color: "text-purple-500", bg: "bg-purple-500/8" },
            { label: "Inventario", href: "/inventario", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-600/8" },
            { label: "Telecom", href: "/venta-linea", icon: Wifi, color: "text-teal-500", bg: "bg-teal-500/8" },
            { label: "Reportes", href: "/reportes", icon: BarChart3, color: "text-rose-500", bg: "bg-rose-500/8" },
            { label: "Marketing", href: "/marketing", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/8" },
            { label: "ECO", href: "/sostenibilidad", icon: Leaf, color: "text-green-500", bg: "bg-green-500/8" },
          ].map((mod, i) => (
            <Link key={i} href={mod.href as never}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/25 bg-card/50 hover:bg-card hover:shadow-md hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300", mod.bg)}>
                  <mod.icon className={cn("h-4 w-4", mod.color)} />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground/50 group-hover:text-foreground transition-colors">{mod.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <Dialog open={showCierre} onOpenChange={setShowCierre}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2"><Lock className="h-4 w-4 text-amber-400" /> Cierre de Período Fiscal</DialogTitle>
          </DialogHeader>
          {closingData ? (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Resumen: {closingData.periodo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-[9px] text-muted-foreground">Ingresos</p><p className="text-base font-bold text-emerald-400">Bs. {fmtBs(closingData.ingresos)}</p></div>
                  <div><p className="text-[9px] text-muted-foreground">Gastos</p><p className="text-base font-bold text-rose-400">Bs. {fmtBs(closingData.gastos)}</p></div>
                  <div><p className="text-[9px] text-muted-foreground">Utilidad</p><p className={cn("text-lg font-bold", closingData.utilidad >= 0 ? "text-amber-400" : "text-rose-400")}>Bs. {fmtBs(closingData.utilidad)}</p></div>
                  <div><p className="text-[9px] text-muted-foreground">Facturas</p><p className="text-base font-bold">{closingData.facturas_emitidas} / {closingData.facturas_cobradas}</p></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 py-2">
              <div className="space-y-1.5"><Label className="text-[10px] font-semibold">Período *</Label><Input value={closingForm.periodo} onChange={e => setClosingForm(f => ({ ...f, periodo: e.target.value }))} placeholder="MARZO 2026" className="h-9 rounded-xl text-xs" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-[10px] font-semibold">Desde *</Label><Input type="date" value={closingForm.fecha_inicio} onChange={e => setClosingForm(f => ({ ...f, fecha_inicio: e.target.value }))} className="h-9 rounded-xl text-xs" /></div>
                <div className="space-y-1.5"><Label className="text-[10px] font-semibold">Hasta *</Label><Input type="date" value={closingForm.fecha_fin} onChange={e => setClosingForm(f => ({ ...f, fecha_fin: e.target.value }))} className="h-9 rounded-xl text-xs" /></div>
              </div>
              <div className="space-y-1.5"><Label className="text-[10px] font-semibold">Notas</Label><Textarea placeholder="Observaciones..." value={closingForm.notas} onChange={e => setClosingForm(f => ({ ...f, notas: e.target.value }))} className="rounded-xl text-xs" /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCierre(false)} className="rounded-xl text-xs h-8">Cancelar</Button>
            {closingData ? (
              <Button onClick={handleConfirmCierre} disabled={isClosing} className="rounded-xl text-xs h-8 bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                {isClosing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="mr-1.5 h-3.5 w-3.5" />} {isClosing ? "Procesando..." : "Confirmar Cierre"}
              </Button>
            ) : (
              <Button onClick={handlePreviewCierre} disabled={isClosing} className="rounded-xl text-xs h-8 bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                {isClosing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Calendar className="mr-1.5 h-3.5 w-3.5" />} {isClosing ? "Calculando..." : "Calcular"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAuditoria} onOpenChange={setShowAuditoria}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col rounded-2xl">
          <DialogHeader><DialogTitle className="text-sm font-bold flex items-center gap-2"><History className="h-4 w-4 text-cyan-400" /> Registro de Auditoría</DialogTitle></DialogHeader>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Buscar eventos..." className="pl-9 h-8 rounded-xl text-xs" value={auditSearch} onChange={e => setAuditSearch(e.target.value)} />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {auditLoading ? (
              <div className="space-y-1.5">{[1, 2, 3, 4, 5].map(n => <div key={n} className="h-12 bg-muted/10 rounded-lg animate-pulse" />)}</div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-16"><FileText className="h-8 w-8 text-muted-foreground/10 mx-auto mb-2" /><p className="text-[10px] text-muted-foreground/30">Sin registros</p></div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/5 border border-border/10 hover:bg-muted/10 transition-all">
                  <Badge variant="outline" className={cn("text-[8px] font-semibold border-border/15 shrink-0", CAT_COLOR[log.categoria] ?? "text-muted-foreground")}>{log.categoria}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium truncate">{log.evento}</p>
                    {log.descripcion && <p className="text-[9px] text-muted-foreground/50 mt-0.5 line-clamp-1">{log.descripcion}</p>}
                  </div>
                  <p className="text-[9px] text-muted-foreground/30 shrink-0 tabular-nums">{new Date(log.created_at).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" })}</p>
                </div>
              ))
            )}
          </div>
          <DialogFooter className="mt-3">
            <p className="text-[9px] text-muted-foreground/30 mr-auto">{filteredLogs.length} eventos</p>
            <Button variant="outline" onClick={() => setShowAuditoria(false)} className="rounded-xl text-xs h-8">Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAI} onOpenChange={setShowAI}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col rounded-2xl">
          <DialogHeader><DialogTitle className="text-sm font-bold flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-cyan-400" /> Análisis IA</DialogTitle></DialogHeader>
          <div className="flex-1 overflow-y-auto py-2">
            {aiLoading ? (
              <div className="space-y-4 py-8 text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 flex items-center justify-center mx-auto"><Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" /></div>
                <p className="text-[10px] text-muted-foreground/50 animate-pulse">Analizando datos...</p>
                <div className="max-w-xs mx-auto space-y-2">{[90, 70, 80, 55].map((w, n) => <div key={n} className="h-3 bg-muted/10 rounded animate-pulse" style={{ width: `${w}%` }} />)}</div>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-3">
                <div className="p-4 bg-cyan-500/[0.03] rounded-xl border border-cyan-500/8">
                  <div className="flex items-center gap-2 mb-2"><Sparkles className="h-3.5 w-3.5 text-cyan-400" /><span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-400">Análisis Generado</span></div>
                  <div className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</div>
                </div>
                <p className="text-[9px] text-muted-foreground/30 flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> Datos en tiempo real · {clientDateStr ?? ""}</p>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            {aiAnalysis && <Button variant="outline" onClick={handleAIAnalysis} disabled={aiLoading} className="rounded-xl text-xs h-8 mr-auto"><RefreshCw className="mr-1.5 h-3 w-3" /> Regenerar</Button>}
            <Button variant="outline" onClick={() => setShowAI(false)} className="rounded-xl text-xs h-8">Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
