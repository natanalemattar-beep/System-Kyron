"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowUpFromLine, ArrowDownFromLine, PiggyBank, Vault,
  Landmark, Users, History, Box, Receipt, Loader as Loader2,
  RefreshCw, Calendar, Lock, Search, FileText, Sparkles,
  Shield, Scale, Briefcase, Leaf, Globe, TriangleAlert, Wifi,
  PercentCircle, Building2, Gavel, CreditCard, Banknote,
  CircleCheck as CircleCheck, Calculator, Bell, Package, DollarSign,
  ChartColumn, PieChart, ChevronRight, Sun, Moon, Sunrise, Clock,
  Coins, TrendingUpDown, WalletCards, UsersRound, BadgeDollarSign,
  ReceiptText, BellRing, ArrowUpRight, ArrowDownRight, Activity,
  Warehouse, FileBarChart2, BarChartBig, Building, ShieldCheck,
  TrendingUp, TrendingDown, Zap, Megaphone, LayoutGrid, CalendarDays
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import { cn, isNetworkError, parseSafeNumber } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ModuleTutorial } from "@/components/module-tutorial";
import { useCurrency } from "@/lib/currency-context";
import { AiInspectionDropdown } from "@/components/ai-inspection-dropdown";
import { CurrencySelector } from "@/components/currency-selector";
import { moduleTutorials } from "@/lib/module-tutorials";
import { useAuth } from "@/lib/auth/context";
import { useLocale, useTranslations } from "next-intl";
import { SeasonalBanner } from "@/components/seasonal-decorations";
import { useSeasonalTheme } from "@/components/seasonal-theme-provider";
import { ActivityTimeline } from "@/components/activity-timeline";
import {
  Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  PieChart as RPieChart, Pie, Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ErrorBoundary } from "@/components/error-boundary";
import { ChartErrorBoundary } from "@/components/chart-error-boundary";

const motion = {
  div: dynamic(() => import('framer-motion').then(m => ({ default: m.motion.div })), { ssr: false, loading: () => <div className="animate-pulse bg-white/5 rounded-2xl h-32" /> }) as any,
  header: dynamic(() => import('framer-motion').then(m => ({ default: m.motion.header })), { ssr: false, loading: () => <div className="animate-pulse bg-white/5 rounded-2xl h-48" /> }) as any,
};

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

interface ActivityLog { id: number; evento: string; categoria: string; descripcion: string | null; creado_en: string; }
interface CierrePeriodo { id?: number; periodo: string; ingresos: number; gastos: number; utilidad: number; facturas_emitidas: number; facturas_cobradas: number; }

function getGreeting(hour: number): { text: string; icon: typeof Sun } {
  if (hour >= 5 && hour < 12) return { text: "Buenos días", icon: Sunrise };
  if (hour >= 12 && hour < 18) return { text: "Buenas tardes", icon: Sun };
  return { text: "Buenas noches", icon: Moon };
}

function getHealthScore(data: DashboardData): { score: number; label: string; color: string } {
  let score = 50;
  if ((data.utilidadNeta ?? 0) > 0) score += 15;
  if ((data.variaciones?.ingresos ?? 0) > 0) score += 10;
  if ((data.variaciones?.gastos ?? 0) < 0) score += 5;
  if ((data.facturas?.vencidas ?? 0) === 0) score += 10;
  if ((data.liquidezTotal ?? 0) > 0) score += 5;
  if ((data.inventarioBajoStock ?? 0) === 0) score += 5;
  score = Math.min(100, Math.max(0, score));
  if (score >= 80) return { score, label: "Excelente", color: "text-emerald-400" };
  if (score >= 60) return { score, label: "Bueno", color: "text-blue-400" };
  if (score >= 40) return { score, label: "Regular", color: "text-amber-400" };
  return { score, label: "Atención", color: "text-rose-400" };
}

const CAT_COLOR: Record<string, string> = {
  contabilidad: "text-blue-400", rrhh: "text-emerald-400", legal: "text-purple-400",
  banco: "text-amber-400", auth: "text-rose-400", sistema: "text-slate-400",
  clientes: "text-cyan-400", core: "text-primary", nomina: "text-orange-400",
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
  const currentLocale = useLocale();
  const t = useTranslations('Dashboard');
  const { activeEvent } = useSeasonalTheme();
  const { format: fmtCur, convert, config: curConfig, formatRaw } = useCurrency();
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
  const [clientDateStr, setClientDateStr] = useState<string | null>(null);
  const [clientTimeStr, setClientTimeStr] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<{ text: string; icon: typeof Sun } | null>(null);
  const [clientClosingForm, setClientClosingForm] = useState<{ periodo: string; fecha_inicio: string; fecha_fin: string } | null>(null);
  const [fiscalDeadlines, setFiscalDeadlines] = useState<Array<{ label: string; diff: number; dateStr: string; iconKey: string; color: string; bg: string }>>([]);
  const [semaforo, setSemaforo] = useState<{
    global: { level: string; vencidos: number; urgentes: number; proximos: number };
    alertas: Array<{ categoria: string; label: string; item: string; dias: number; nivel: string; fecha: string; href: string }>;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const loc = currentLocale || 'es';
    setClientTimeStr(now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }));
    setClientDateStr(now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
    setGreeting(getGreeting(now.getHours()));
    const periodoStr = now.toLocaleString(loc, { month: "long", year: "numeric" }).toUpperCase();
    const fechaInicio = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const fechaFin = now.toISOString().split("T")[0];
    setClientClosingForm({ periodo: periodoStr, fecha_inicio: fechaInicio, fecha_fin: fechaFin });
    setClosingForm(f => ({ ...f, periodo: periodoStr, fecha_inicio: fechaInicio, fecha_fin: fechaFin }));
    const m = now.getMonth();
    const y = now.getFullYear();
    const rawDeadlines = [
      { label: "IVA — Declaración mensual", date: new Date(y, m + 1, 15), iconKey: "iva", color: "text-blue-400", bg: "bg-blue-500/10" },
      { label: "Retenciones IVA — Quincenal", date: new Date(y, m, now.getDate() <= 15 ? 15 : new Date(y, m + 1, 0).getDate()), iconKey: "ret", color: "text-cyan-400", bg: "bg-cyan-500/10" },
      { label: "ISLR — Anticipo trimestral", date: new Date(y, Math.ceil((m + 1) / 3) * 3, 15), iconKey: "islr", color: "text-purple-400", bg: "bg-purple-500/10" },
      { label: "Contribuciones parafiscales", date: new Date(y, m + 1, 5), iconKey: "para", color: "text-emerald-400", bg: "bg-emerald-500/10" },
      { label: "FAOV / BANAVIH", date: new Date(y, m + 1, 5), iconKey: "faov", color: "text-teal-400", bg: "bg-teal-500/10" },
    ].map(d => {
      const diff = Math.ceil((d.date.getTime() - now.getTime()) / 86400000);
      return { label: d.label, diff, dateStr: d.date.toLocaleDateString(loc, { day: "2-digit", month: "short" }), iconKey: d.iconKey, color: d.color, bg: d.bg };
    }).sort((a, b) => a.diff - b.diff);
    setFiscalDeadlines(rawDeadlines);
  }, [currentLocale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClientTimeStr(new Date().toLocaleTimeString(currentLocale || 'es', { hour: "2-digit", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(interval);
  }, [currentLocale]);

  const fetchDashboard = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const res = await fetch("/api/dashboard", { cache: "no-store" });
      if (res.ok) { setData(await res.json()); }
      else { toast({ variant: "destructive", title: "Error al cargar dashboard", description: "No se pudieron obtener los datos. Intente nuevamente." }); }
    } catch (err) {
      toast({
        variant: "destructive",
        title: isNetworkError(err) ? "Error de conexión" : "Error al cargar",
        description: isNetworkError(err) ? "No se pudo conectar al servidor. Verifique su conexión." : "Ocurrió un error inesperado. Intente nuevamente."
      });
    }
    finally { setLoading(false); setRefreshing(false); }
  }, [toast]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  useEffect(() => {
    fetch("/api/semaforo-alertas").then(r => r.ok ? r.json() : null).then(d => {
      if (d && typeof d === 'object') {
        setSemaforo({
          global: d.global || { level: "verde", vencidos: 0, urgentes: 0, proximos: 0 },
          alertas: Array.isArray(d.alertas) ? d.alertas : []
        });
      }
    }).catch((err) => { console.warn('[semaforo-alertas]', err.message); });
  }, []);

  const sparklineData = useMemo(() => {
    if (!data?.chartMensual?.length || !Array.isArray(data.chartMensual)) return { ingresos: [], gastos: [] };
    const ingresos = data.chartMensual.map(d => d.ingresos ?? 0);
    const gastos = data.chartMensual.map(d => d.gastos ?? 0);
    return { ingresos, gastos };
  }, [data]);

  const handlePreviewCierre = useCallback(async () => {
    if (!closingForm.periodo.trim()) {
      toast({ variant: "destructive", title: "Campo requerido", description: "Indica el nombre del período fiscal." });
      return;
    }
    setIsClosing(true);
    try {
      const qs = `?periodo=${encodeURIComponent(closingForm.periodo)}&fecha_inicio=${closingForm.fecha_inicio}&fecha_fin=${closingForm.fecha_fin}&preview=true`;
      const res = await fetch(`/api/periodo-cierre${qs}`);
      if (res.ok) {
        const json = await res.json();
        if (json.cierres && json.cierres.length > 0) {
          toast({ title: "Cierre existente", description: "Este período ya tiene un cierre registrado." });
        } else {
          const ing = data?.ingresos ?? 0; const gas = data?.gastos ?? 0;
          setClosingData({ periodo: closingForm.periodo, ingresos: ing, gastos: gas, utilidad: ing - gas, facturas_emitidas: data?.facturas?.emitidas ?? 0, facturas_cobradas: data?.facturas?.cobradas ?? 0 });
        }
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo previsualizar el cierre." });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Error de conexión", description: e instanceof Error ? e.message : "Error inesperado" });
    } finally { setIsClosing(false); }
  }, [closingForm, data, toast]);

  const handleConfirmCierre = useCallback(async () => {
    if (!closingForm.periodo.trim() || !closingForm.fecha_inicio || !closingForm.fecha_fin) {
      toast({ variant: "destructive", title: "Campos incompletos", description: "Completa período, fecha inicio y fecha fin." });
      return;
    }
    setIsClosing(true);
    try {
      const res = await fetch("/api/periodo-cierre", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...closingForm, cerrado_por: user?.nombre ?? "Usuario" }) });
      const json = await res.json();
      if (res.ok) { setClosingData(json.cierre); toast({ title: "PERIODO FISCAL CERRADO", description: `${closingForm.periodo} — Utilidad: ${fmtCur(json.cierre?.utilidad ?? 0)}` }); setShowCierre(false); fetchDashboard(); }
      else toast({ title: "Error", description: json.error ?? "No se pudo cerrar el periodo fiscal.", variant: "destructive" });
    } catch (e) { toast({ title: "Error de conexión", description: e instanceof Error ? e.message : "Ocurrió un error al intentar cerrar el periodo.", variant: "destructive" }); }
    setIsClosing(false);
  }, [closingForm, user, toast, fmtCur, fetchDashboard]);

  const handleAuditoria = useCallback(async () => {
    setShowAuditoria(true); setAuditLoading(true);
    try { 
      const res = await fetch("/api/activity-log?limit=100"); 
      if (res.ok) { 
        const json = await res.json(); 
        setAuditLogs(json.logs ?? []); 
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los logs de auditoría." });
      }
    } catch (e) { 
      toast({ variant: "destructive", title: "Error de conexión", description: e instanceof Error ? e.message : "Error inesperado" });
    } finally { setAuditLoading(false); }
  }, [toast]);

  const filteredLogs = useMemo(() => 
    auditLogs.filter(l => !auditSearch || l.evento.toLowerCase().includes(auditSearch.toLowerCase()) || (l.descripcion ?? "").toLowerCase().includes(auditSearch.toLowerCase()) || l.categoria.toLowerCase().includes(auditSearch.toLowerCase())),
    [auditLogs, auditSearch]
  );

  const variacionColor = useCallback((v: number, invert = false) => { if (v === 0) return "text-muted-foreground"; return (invert ? v < 0 : v > 0) ? "text-emerald-400" : "text-rose-400"; }, []);
  const facturasPie = useMemo(() => {
    if (!data?.facturas || typeof data.facturas !== 'object') return [];
    const f = data.facturas as Record<string, unknown>;
    const result = [
      { name: "Cobradas", value: Number(f.cobradas) || 0 },
      { name: "Pagadas", value: Number(f.pagadas) || 0 },
      { name: "Vencidas", value: Number(f.vencidas) || 0 }
    ].filter(d => d.value > 0);
    return Array.isArray(result) ? result : [];
  }, [data]);

  const GreetingIcon = greeting?.icon ?? Sun;

  return (
    <ErrorBoundary>
    <div className="relative min-h-screen pb-20">
      <div className="ds-container">
        <ModuleTutorial config={moduleTutorials["dashboard-empresas"]} />
        <SeasonalBanner />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6"
        >
          <div className="ds-header border-t-2 border-t-primary/20">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                  <Building className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    <GreetingIcon className="h-6 w-6 text-primary inline-block mr-2 -mt-0.5" />
                    {activeEvent ? activeEvent.saludo : (greeting?.text ?? t('greeting_fallback'))}{user?.nombre ? `, ${user.nombre.trim().split(" ")[0]}` : ""}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {clientDateStr ?? ""}
                    </div>
                    <span className="text-muted-foreground/30">·</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {clientTimeStr ?? ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                {data?.tasaBCV && (
                  <div className="ds-card flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUpDown className="h-3.5 w-3.5" />
                    BCV: {data.tasaBCV.usd_ves.toFixed(2)} BS/$
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2 py-1 backdrop-blur-sm">
                  <CurrencySelector className="border-none bg-transparent h-9 rounded-lg text-xs font-semibold px-3" />
                  <div className="h-5 w-px bg-border" />
                  <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => fetchDashboard(true)} disabled={refreshing}>
                    <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                  </Button>
                </div>
                <Button onClick={() => { setClosingData(null); setShowCierre(true); }} variant="outline" size="sm" className="rounded-lg text-xs font-semibold gap-2">
                  <Vault className="h-4 w-4" /> Cierre Fiscal
                </Button>
                <AiInspectionDropdown />
              </div>
            </div>
          </div>
        </motion.header>

        {/* KPIs Grid */}
        <div className="ds-section">
          <div className="ds-grid-4">
            {(() => {
              const utilSpark = sparklineData.ingresos.map((v, i) => v - (sparklineData.gastos[i] || 0));
              return [
                { label: t('kpi_ingresos'), value: data ? fmtCur(data.ingresos) : "—", variacion: data?.variaciones?.ingresos, icon: ArrowUpFromLine, color: "text-emerald-500", border: "border-t-emerald-500/30", sparkData: sparklineData.ingresos, iconBg: "ds-kpi-icon bg-emerald-500/10 text-emerald-500" },
                { label: t('kpi_gastos'), value: data ? fmtCur(data.gastos) : "—", variacion: data?.variaciones?.gastos, invertVariacion: true, icon: ArrowDownFromLine, color: "text-rose-500", border: "border-t-rose-500/30", sparkData: sparklineData.gastos, iconBg: "ds-kpi-icon bg-rose-500/10 text-rose-500" },
                { label: t('kpi_utilidad'), value: data ? fmtCur(data.utilidadNeta) : "—", variacion: data?.variaciones?.utilidad, icon: PiggyBank, color: "text-amber-500", border: "border-t-amber-500/30", sparkData: utilSpark, iconBg: "ds-kpi-icon bg-amber-500/10 text-amber-500" },
                { label: t('kpi_liquidez'), value: data ? fmtCur(data.liquidezTotal) : "—", icon: Vault, color: "text-primary", border: "border-t-primary/30", sparkData: [], iconBg: "ds-kpi-icon bg-primary/10 text-primary" },
              ];
            })().map((kpi, i) => (
              <div key={i} className={cn("ds-card-accent h-full", kpi.border)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={kpi.iconBg}>
                      <kpi.icon className="h-4 w-4" />
                    </div>
                    <span className="ds-label">{kpi.label}</span>
                  </div>
                  {kpi.variacion !== undefined && (
                    <div className={cn("ds-badge bg-current/10", variacionColor(kpi.variacion, kpi.invertVariacion))}>
                      {kpi.variacion > 0 ? "+" : ""}{kpi.variacion}%
                    </div>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="ds-kpi-value">
                    {loading ? <div className="h-8 w-28 rounded bg-muted animate-pulse" /> : kpi.value}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground/60">{t('flujo_mensual')}</p>
                    {kpi.sparkData && kpi.sparkData.length > 1 && <MiniSparkline data={kpi.sparkData} color={kpi.color.includes('emerald') ? '#10b981' : kpi.color.includes('rose') ? '#f43f5e' : kpi.color.includes('amber') ? '#f59e0b' : '#3b82f6'} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="ds-section">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(() => {
              const unread = data?.notificacionesNoLeidas ?? 0;
              return [
                { label: "Clientes", value: data?.clientesActivos ?? 0, icon: UsersRound, color: "text-cyan-500", href: "/fidelizacion-clientes" },
                { label: "Empleados", value: data?.empleados ?? 0, icon: BadgeDollarSign, color: "text-emerald-500", href: "/dashboard-rrhh" },
                { label: "Facturas", value: data?.facturasEsteMes?.count ?? 0, icon: ReceiptText, color: "text-amber-500", extra: data?.facturasEsteMes?.monto ? formatRaw(convert(data.facturasEsteMes.monto)) : null, href: "/facturacion" },
                { label: "Alertas", value: unread, icon: BellRing, color: "text-indigo-500", href: "/notificaciones", alert: unread > 0 },
              ];
            })().map((stat, i) => (
              <Link key={i} href={stat.href as never}>
                <div className="ds-card flex items-center gap-3 group cursor-pointer">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0 bg-current/10 group-hover:bg-current/20 transition-all group-hover:scale-110", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-bold tracking-tight text-foreground">{loading ? "—" : stat.value}</p>
                    <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                  {stat.extra && <span className="ml-auto text-xs font-semibold text-muted-foreground/40 hidden xl:block">{curConfig.symbol}{stat.extra}</span>}
                  {stat.alert && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />}
                </div>
              </Link>
            ))}
          </div>
        </div>

      <div className="ds-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="ds-card overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Flujo Financiero</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Últimos 12 meses</p>
                </div>
              </div>
              <BarChartBig className="h-5 w-5 text-muted-foreground/20" />
            </div>
            <div className="p-5">
              <div className="h-[280px] w-full">
                {loading ? (
                  <div className="h-full flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground/20" /></div>
                ) : !Array.isArray(data?.chartMensual) || data.chartMensual.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
                    <BarChartBig className="h-10 w-10" />
                    <p className="text-xs font-medium">Sin datos históricos</p>
                  </div>
                ) : (
                  <ChartErrorBoundary fallbackLabel="Error al cargar flujo financiero">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.chartMensual} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gIng" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="gGas" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-gastos)" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="var(--color-gastos)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                          <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={10} fontWeight="500" axisLine={false} tickLine={false} tickMargin={8} opacity={0.5} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} fontWeight="500" axisLine={false} tickLine={false} tickFormatter={(v) => `${curConfig.symbol}${formatRaw(convert(v as number))}`} width={50} opacity={0.5} />
                          <ChartTooltip 
                            cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }} 
                            content={<ChartTooltipContent indicator="line" formatter={(v) => fmtCur(v as number)} />} 
                          />
                          <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" strokeWidth={2} fillOpacity={1} fill="url(#gIng)" activeDot={{ r: 5, fill: "var(--color-ingresos)", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
                          <Area type="monotone" dataKey="gastos" stroke="var(--color-gastos)" strokeWidth={2} fillOpacity={1} fill="url(#gGas)" activeDot={{ r: 5, fill: "var(--color-gastos)", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </ChartErrorBoundary>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="ds-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                <span className="text-sm font-semibold text-foreground">Facturación</span>
              </div>
              <FileBarChart2 className="h-4 w-4 text-muted-foreground/20" />
            </div>
            {loading ? (
              <div className="h-32 flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground/20" /></div>
            ) : facturasPie.length === 0 ? (
              <div className="ds-empty-state">
                <ReceiptText className="h-8 w-8" />
                <p className="text-xs font-medium">Sin facturas</p>
              </div>
            ) : (
              <ChartErrorBoundary fallbackLabel="Error al cargar facturación">
                <div className="flex items-center gap-5">
                  <div className="w-28 h-28 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart><Pie data={facturasPie} innerRadius={28} outerRadius={48} dataKey="value" stroke="none" paddingAngle={3}>{facturasPie.map((_, idx) => <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />)}</Pie></RPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    {facturasPie.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                        <span className="text-xs text-muted-foreground truncate">{d.name}</span>
                        <span className="text-sm font-semibold ml-auto">{d.value}</span>
                      </div>
                    ))}
                      <div className="pt-2 ds-divider">
                        <span className="text-xs text-muted-foreground">Total: <span className="font-semibold text-foreground">{data?.facturas?.total ?? 0}</span></span>
                      </div>
                    </div>
                    </div>
                  </ChartErrorBoundary>
                 )}
              </div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="ds-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                    <span className="text-sm font-semibold text-foreground">Cuentas</span>
                  </div>
                  <Coins className="h-4 w-4 text-muted-foreground/20" />
                </div>
                <div className="space-y-3">
                  <Link href="/cuentas-por-cobrar" className="block">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10 hover:bg-emerald-500/[0.08] transition-all hover:shadow-sm">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-medium text-foreground/70">Por Cobrar</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold ds-metric-up">{loading ? "—" : fmtCur(data?.cuentasCobrar?.total ?? 0)}</p>
                        <p className="text-[11px] text-muted-foreground/40">{data?.cuentasCobrar?.count ?? 0} pendientes</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/cuentas-por-pagar" className="block">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/10 hover:bg-rose-500/[0.08] transition-all hover:shadow-sm">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="h-4 w-4 text-rose-400" />
                        <span className="text-sm font-medium text-foreground/70">Por Pagar</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold ds-metric-down">{loading ? "—" : fmtCur(data?.cuentasPagar?.total ?? 0)}</p>
                        <p className="text-[11px] text-muted-foreground/40">{data?.cuentasPagar?.count ?? 0} pendientes</p>
                      </div>
                    </div>
                  </Link>
              {(data?.inventarioBajoStock ?? 0) > 0 && (
                <Link href="/inventario" className="block">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/10 hover:bg-amber-500/[0.08] transition-all hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <Warehouse className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-medium text-foreground/70">Stock Bajo</span>
                    </div>
                    <span className="text-sm font-bold text-amber-400">{data?.inventarioBajoStock} items</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="ds-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <div className="ds-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
              <span className="text-sm font-semibold text-foreground">Últimos Movimientos</span>
              <Link href="/contabilidad/libros" className="ml-auto text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1">Ver todos <ChevronRight className="h-3.5 w-3.5" /></Link>
            </div>
            {loading ? (
              <div className="space-y-2">{[1, 2, 3, 4].map(n => <div key={n} className="h-12 rounded-lg bg-muted animate-pulse" />)}</div>
            ) : Array.isArray(data?.movimientosRecientes) && data.movimientosRecientes.length > 0 ? (
              <div className="space-y-1">
                {data.movimientosRecientes.slice(0, 6).map((mov) => (
                  <div key={mov.id} className="flex items-center gap-3 py-2.5 px-2.5 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className={cn("h-7 w-7 rounded-md flex items-center justify-center shrink-0", mov.tipo === "credito" ? "bg-emerald-500/10" : "bg-rose-500/10")}>
                      {mov.tipo === "credito" ? <ArrowUpFromLine className="h-3.5 w-3.5 text-emerald-500" /> : <ArrowDownFromLine className="h-3.5 w-3.5 text-rose-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">{mov.concepto}</p>
                      <p className="text-xs text-muted-foreground">{mov.fecha_operacion}{mov.categoria ? ` · ${mov.categoria}` : ""}</p>
                    </div>
                    <span className={cn("text-sm font-semibold tabular-nums shrink-0", mov.tipo === "credito" ? "ds-metric-up" : "ds-metric-down")}>
                      {mov.tipo === "credito" ? "+" : "-"}{fmtCur(parseSafeNumber(mov.monto))}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ds-empty-state">
                <Coins className="h-10 w-10" />
                <p className="text-xs text-muted-foreground/60">Sin movimientos registrados</p>
                <Link href="/contabilidad/conciliacion-bancaria"><Button variant="outline" size="sm" className="mt-4 text-xs rounded-lg">Registrar</Button></Link>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="ds-card border-emerald-500/20 h-full">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-semibold text-foreground">Fiscal</span>
              <Badge className="ml-auto bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium h-5 rounded-md">Correcto</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "IVA 16%", status: "Al día" },
                { label: "IGTF 3%", status: "Configurado" },
                { label: "ISLR 34%", status: "Retenciones OK" },
                { label: "SENIAT", status: "Sincronizado" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/[0.08]">
                  <CircleCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground/65">{item.label}</p>
                    <p className="text-[11px] text-emerald-400/60">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
                 {[
                   { text: "Declaración IVA", date: clientClosingForm ? `Vence ${String(new Date(clientClosingForm.fecha_fin).getMonth() + 1).padStart(2, "0")}/${new Date(clientClosingForm.fecha_fin).getFullYear()}` : "Vence próximo mes", color: "text-amber-400", icon: PercentCircle },
                    { text: "Conciliación bancaria", date: "Antes de cierre", color: "text-blue-400", icon: WalletCards },
                 ].map((a, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/5 border border-border/15">
                  <a.icon className={cn("h-4 w-4 shrink-0", a.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium truncate">{a.text}</p>
                    <p className={cn("text-[11px] font-medium", a.color)}>{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="ds-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                <h3 className="text-sm font-semibold text-foreground">Proyecciones</h3>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground/20" />
            </div>
            <div className="space-y-2.5">
              <Button size="sm" variant="outline" className="w-full justify-start text-xs font-medium rounded-lg h-10 gap-3"
                onClick={() => { const a = data ? data.ingresos * 1.2 : 0; toast({ title: "Proyección: Ventas +20%", description: `Ingresos: ${fmtCur(a)} · Utilidad: ${fmtCur(a - (data?.gastos ?? 0))}` }); }}>
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Proyectar Ventas +20%
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start text-xs font-medium rounded-lg h-10 gap-3"
                onClick={() => { const inf = data ? data.gastos * 1.35 : 0; toast({ title: "Simulación: Inflación 35%", description: `Gastos: ${fmtCur(inf)} · Utilidad: ${fmtCur((data?.ingresos ?? 0) - inf)}` }); }}>
                <TriangleAlert className="h-4 w-4 text-amber-500" /> Simular Inflación 35%
              </Button>
            </div>
          </div>

          <div className="ds-card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-muted-foreground">Suscripción</p>
                <h3 className="text-sm font-semibold text-foreground mt-0.5">Plan Professional</h3>
              </div>
              <Sparkles className="h-5 w-5 text-primary/60" />
            </div>
            <div className="space-y-4">
              {[
                { label: "Empleados", current: data?.empleados ?? 0, total: 15, color: "bg-primary" },
                { label: "Consultas Core", current: 124, total: 250, color: "bg-cyan-500" },
                { label: "Almacenamiento", current: 4.2, total: 25, color: "bg-emerald-500", suffix: " GB" }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{stat.label}</span>
                    <span className="text-foreground font-medium">{stat.current} / {stat.total}{stat.suffix}</span>
                  </div>
                  <div className="ds-progress">
                    <div className={cn("ds-progress-bar animate-progress", stat.color)} style={{ width: `${Math.min((stat.current / stat.total) * 100, 100)}%`, "--progress-target": `${Math.min((stat.current / stat.total) * 100, 100)}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
              <p className="text-sm font-semibold text-foreground">Nómina</p>
            </div>
            <div className="flex items-baseline gap-1 mb-1.5">
              <span className="text-xl font-bold tracking-tight">{loading ? "—" : fmtCur(data?.nominaMensual ?? 0)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/45">{data?.empleados ?? 0} empleados activos</p>
            <Link href="/contabilidad/libros/nomina"><Button variant="outline" size="sm" className="mt-3 w-full text-[11px] font-medium rounded-xl border-border/25">Ver Nómina</Button></Link>
          </div>
        </div>
      </div>
      </div>

      <div className="ds-grid-2">
        <div className="ds-card border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-amber-500/20" />
              <CalendarDays className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">Calendario Fiscal SENIAT</h3>
            </div>
            <Link href="/contabilidad/tributos/calendario-fiscal"><span className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1">Ver todo <ChevronRight className="h-3.5 w-3.5" /></span></Link>
          </div>
          <div className="space-y-2">
            {!Array.isArray(fiscalDeadlines) || fiscalDeadlines.length === 0 ? (
              <div className="py-5 text-center"><p className="text-xs text-muted-foreground/60">Cargando calendario...</p></div>
            ) : (fiscalDeadlines || []).map((d, i) => {
              const FISCAL_ICONS: Record<string, any> = { iva: PercentCircle, ret: ReceiptText, islr: Landmark, para: UsersRound, faov: Building };
              const IconComp = FISCAL_ICONS[d.iconKey] ?? Calendar;
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-accent/50 transition-colors">
                  <div className={cn("h-7 w-7 rounded-md flex items-center justify-center shrink-0", d.bg)}>
                    <IconComp className={cn("h-3.5 w-3.5", d.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-foreground">{d.label}</p>
                    <p className="text-xs text-muted-foreground">{d.dateStr}</p>
                  </div>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-md", d.diff <= 5 ? "bg-rose-500/10 ds-metric-down" : d.diff <= 15 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 ds-metric-up")}>
                    {d.diff < 0 ? "VENCIDO" : d.diff === 0 ? "HOY" : d.diff === 1 ? "Mañana" : `${d.diff}d`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ds-card border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-500/20" />
              <WalletCards className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-foreground">Cuentas por Cobrar</h3>
            </div>
          </div>
          {data?.cuentasCobrar && data?.cuentasPagar && (data.cuentasCobrar.count > 0 || data.cuentasPagar.count > 0) ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-sm font-medium text-foreground/80">Por cobrar</span>
                <div className="text-right">
                  <span className="text-base font-semibold ds-metric-up">{fmtCur(data.cuentasCobrar.total)}</span>
                  <span className="text-xs text-muted-foreground ml-2">{data.cuentasCobrar.count} pendientes</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
                <span className="text-sm font-medium text-foreground/80">Por pagar</span>
                <div className="text-right">
                  <span className="text-base font-semibold ds-metric-down">{fmtCur(data.cuentasPagar.total)}</span>
                  <span className="text-xs text-muted-foreground ml-2">{data.cuentasPagar.count} pendientes</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="ds-empty-state">
              <ShieldCheck className="h-8 w-8" />
              <p className="text-xs text-muted-foreground/60">Sin cuentas pendientes</p>
            </div>
          )}
          <div className="mt-4 pt-3 ds-divider flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Datos en tiempo real</span>
            <Link href="/cuentas-por-cobrar"><span className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1">Detalle <ChevronRight className="h-3.5 w-3.5" /></span></Link>
          </div>
        </div>
      </div>

      {semaforo && semaforo.global && (
        <div className="ds-card overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className={cn(
              "flex flex-row lg:flex-col items-center justify-center gap-2 p-5 lg:p-6 lg:w-[90px] shrink-0",
              semaforo.global.level === "rojo" ? "bg-rose-500/10" :
              semaforo.global.level === "amarillo" ? "bg-amber-500/10" :
              "bg-emerald-500/10"
            )}>
              {(["rojo", "amarillo", "verde"] as const).map((color) => {
                const isActive = semaforo.global.level === color;
                const colorMap: Record<string, string> = {
                  rojo: "bg-rose-500",
                  amarillo: "bg-amber-400",
                  verde: "bg-emerald-500",
                };
                return (
                  <div key={color} className={cn("ds-dot !w-5 !h-5 transition-all", isActive ? colorMap[color] : "bg-muted-foreground/20")} />
                );
              })}
              <span className={cn(
                "text-xs font-semibold",
                semaforo.global.level === "rojo" ? "ds-metric-down" :
                semaforo.global.level === "amarillo" ? "text-amber-600 dark:text-amber-400" :
                "ds-metric-up"
              )}>
                {semaforo.global.level === "rojo" ? "Alerta" :
                 semaforo.global.level === "amarillo" ? "Atención" :
                 "OK"}
              </span>
            </div>

            <div className="flex-1 p-5 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BellRing className={cn("h-4 w-4", semaforo.global.level === "rojo" ? "ds-metric-down" :
                    semaforo.global.level === "amarillo" ? "text-amber-500" : "ds-metric-up")} />
                  <span className="text-sm font-semibold text-foreground">Vencimientos y Plazos</span>
                </div>
                <div className="flex items-center gap-2">
                  {(semaforo.global.vencidos ?? 0) > 0 && (
                    <span className="ds-badge bg-rose-500/10 ds-metric-down">
                      {semaforo.global.vencidos} vencido{(semaforo.global.vencidos ?? 0) !== 1 ? "s" : ""}
                    </span>
                  )}
                  {(semaforo.global.urgentes ?? 0) > 0 && (
                    <span className="ds-badge bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {semaforo.global.urgentes} urgente{(semaforo.global.urgentes ?? 0) !== 1 ? "s" : ""}
                    </span>
                  )}
                  {(semaforo.global.proximos ?? 0) > 0 && (
                    <span className="ds-badge bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {semaforo.global.proximos} próximo{(semaforo.global.proximos ?? 0) !== 1 ? "s" : ""}
                    </span>
                  )}
                  {(!semaforo.alertas || semaforo.alertas.length === 0) && (
                    <span className="ds-badge bg-emerald-500/10 ds-metric-up">
                      Sin vencimientos
                    </span>
                  )}
                </div>
              </div>

              {!Array.isArray(semaforo?.alertas) || semaforo.alertas.length === 0 ? (
                <div className="ds-empty-state">
                  <ShieldCheck className="h-10 w-10" />
                  <p className="text-xs text-muted-foreground/60">No hay vencimientos próximos ni pendientes</p>
                </div>
              ) : (
                <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
                  {(semaforo.alertas || []).map((alerta, idx) => (
                    <Link key={idx} href={alerta.href as never}>
                      <div className={cn(
                        "flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer",
                        alerta.nivel === "vencido" ? "bg-rose-500/5 border-rose-500/10 hover:bg-rose-500/10" :
                        alerta.nivel === "urgente" ? "bg-amber-500/5 border-amber-500/10 hover:bg-amber-500/10" :
                        "bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10"
                      )}>
                        <div className={cn("ds-dot !w-2.5 !h-2.5 shrink-0",
                          alerta.nivel === "vencido" ? "bg-rose-500" :
                          alerta.nivel === "urgente" ? "bg-amber-500" : "bg-blue-500")} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground truncate">{alerta.label}</span>
                            <span className="text-xs text-muted-foreground/50 border border-border/50 px-1.5 py-0.5 rounded">{alerta.categoria}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{alerta.item}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={cn("text-sm font-semibold",
                            alerta.nivel === "vencido" ? "ds-metric-down" :
                            alerta.nivel === "urgente" ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"
                          )}>
                            {alerta.dias < 0 ? `${Math.abs(alerta.dias)}d vencido` :
                             alerta.dias === 0 ? "HOY" :
                             alerta.dias === 1 ? "Mañana" :
                             `${alerta.dias}d`}
                          </p>
                          <p className="text-xs text-muted-foreground/50">{alerta.fecha}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="ds-section">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Módulos</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Facturación", href: "/facturacion", icon: ReceiptText, color: "text-amber-500" },
            { label: "Legal", href: "/escritorio-juridico", icon: Gavel, color: "text-purple-500" },
            { label: "Inventario", href: "/inventario", icon: Warehouse, color: "text-amber-600" },
            { label: "Telecom", href: "/venta-linea", icon: Wifi, color: "text-teal-500" },
            { label: "Reportes", href: "/reportes", icon: BarChartBig, color: "text-rose-500" },
            { label: "Marketing", href: "/marketing", icon: Megaphone, color: "text-indigo-500" },
            { label: "ECO", href: "/sostenibilidad", icon: Leaf, color: "text-green-500" },
          ].map((mod, i) => (
            <Link key={i} href={mod.href as never}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border/60 bg-card/30 hover:bg-card hover:border-primary/30 transition-all cursor-pointer hover:-translate-y-0.5">
                <div className={cn("ds-module-icon bg-current/10", mod.color)}>
                  <mod.icon className={cn("h-4 w-4", mod.color)} />
                </div>
                <p className="text-xs font-medium text-muted-foreground">{mod.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ActivityTimeline limit={10} />

      <Dialog open={showCierre} onOpenChange={setShowCierre}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2"><Vault className="h-4 w-4 text-amber-400" /> Cierre de Período Fiscal</DialogTitle>
          </DialogHeader>
          {closingData ? (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Resumen: {closingData.periodo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-[11px] text-muted-foreground">Ingresos</p><p className="text-base font-bold text-emerald-400">{fmtCur(closingData.ingresos)}</p></div>
                  <div><p className="text-[11px] text-muted-foreground">Gastos</p><p className="text-base font-bold text-rose-400">{fmtCur(closingData.gastos)}</p></div>
                  <div><p className="text-[11px] text-muted-foreground">Utilidad</p><p className={cn("text-lg font-bold", closingData.utilidad >= 0 ? "text-amber-400" : "text-rose-400")}>{fmtCur(closingData.utilidad)}</p></div>
                  <div><p className="text-[11px] text-muted-foreground">Facturas</p><p className="text-base font-bold">{closingData.facturas_emitidas} / {closingData.facturas_cobradas}</p></div>
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
            <Button variant="outline" size="sm" onClick={() => setShowCierre(false)} className="rounded-xl text-xs">Cancelar</Button>
            {closingData ? (
              <Button onClick={handleConfirmCierre} disabled={isClosing} size="sm" className="rounded-xl text-xs bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                {isClosing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <CircleCheck className="mr-1.5 h-3.5 w-3.5" />} {isClosing ? "Procesando..." : "Confirmar Cierre"}
              </Button>
            ) : (
              <Button onClick={handlePreviewCierre} disabled={isClosing} size="sm" className="rounded-xl text-xs bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                {isClosing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Calculator className="mr-1.5 h-3.5 w-3.5" />} {isClosing ? "Calculando..." : "Calcular"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAuditoria} onOpenChange={setShowAuditoria}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col rounded-2xl">
          <DialogHeader><DialogTitle className="text-sm font-bold flex items-center gap-2"><History className="h-4 w-4 text-cyan-400" /> Registro de Auditoría</DialogTitle></DialogHeader>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input placeholder="Buscar eventos..." className="pl-9 h-8 rounded-xl text-xs" value={auditSearch} onChange={e => setAuditSearch(e.target.value)} />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {auditLoading ? (
              <div className="space-y-1.5">{[1, 2, 3, 4, 5].map(n => <div key={n} className="h-12 bg-muted/10 rounded-lg animate-pulse" />)}</div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-16"><FileBarChart2 className="h-8 w-8 text-muted-foreground/10 mx-auto mb-2" /><p className="text-[10px] text-muted-foreground/30">Sin registros</p></div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/5 border border-border/10 hover:bg-muted/10 transition-all">
                  <Badge variant="outline" className={cn("text-[10px] font-semibold border-border/15 shrink-0", CAT_COLOR[log.categoria] ?? "text-muted-foreground")}>{log.categoria}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium truncate">{log.evento}</p>
                    {log.descripcion && <p className="text-[11px] text-muted-foreground/50 mt-0.5 line-clamp-1">{log.descripcion}</p>}
                  </div>
                  <p className="text-[11px] text-muted-foreground/30 shrink-0 tabular-nums">{new Date(log.creado_en).toLocaleString(currentLocale || 'es', { dateStyle: "short", timeStyle: "short" })}</p>
                </div>
              ))
            )}
          </div>
          <DialogFooter className="mt-3">
            <p className="text-[11px] text-muted-foreground/30 mr-auto">{filteredLogs.length} eventos</p>
            <Button variant="outline" size="sm" onClick={() => setShowAuditoria(false)} className="rounded-xl text-xs">Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </div>
  </div>
  </ErrorBoundary>
);
}
