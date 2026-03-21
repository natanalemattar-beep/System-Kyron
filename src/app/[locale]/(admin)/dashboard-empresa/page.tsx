"use client";

import { useState, useEffect, useCallback } from "react";
import { Calculator, TrendingUp, TrendingDown, Activity, CircleCheck as CheckCircle, Zap, ArrowRight, BookOpen, Landmark, Users, History, Box, Receipt, Loader as Loader2, ShieldAlert, ChartBar as BarChart3, RefreshCw, Calendar, Lock, Search, FileText, BrainCircuit, Sparkles } from "lucide-react";
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
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { useAuth } from "@/lib/auth/context";

interface DashboardData {
    ingresos: number;
    gastos: number;
    utilidadNeta: number;
    liquidezTotal: number;
    cuentasCobrar: number;
    cuentasPagar: number;
    facturas: { emitidas: number; cobradas: number; vencidas: number };
    empleados: number;
    movimientosRecientes: Array<{
        id: number;
        fecha_operacion: string;
        concepto: string;
        monto: string;
        tipo: string;
        referencia: string | null;
    }>;
}

interface ActivityLog {
    id: number;
    evento: string;
    categoria: string;
    descripcion: string | null;
    created_at: string;
}

interface CierrePeriodo {
    id?: number;
    periodo: string;
    ingresos: number;
    gastos: number;
    utilidad: number;
    facturas_emitidas: number;
    facturas_cobradas: number;
}

function fmtBs(n: number): string {
    return new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

const CAT_COLOR: Record<string, string> = {
    contabilidad: "text-blue-400", rrhh: "text-emerald-400", legal: "text-purple-400",
    banco: "text-amber-400", auth: "text-rose-400", sistema: "text-slate-400",
    clientes: "text-cyan-400", ia: "text-primary", nomina: "text-orange-400",
    telecom: "text-teal-400", eco: "text-green-400", documentos: "text-indigo-400",
};

export default function DashboardEmpresaPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [data, setData]           = useState<DashboardData | null>(null);
    const [loading, setLoading]     = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [showCierre, setShowCierre]       = useState(false);
    const [closingData, setClosingData]     = useState<CierrePeriodo | null>(null);
    const [isClosing, setIsClosing]         = useState(false);
    const [closingForm, setClosingForm]     = useState({
        periodo: `${new Date().toLocaleString('es-VE', { month: 'long', year: 'numeric' }).toUpperCase()}`,
        fecha_inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        fecha_fin: new Date().toISOString().split('T')[0],
        notas: "",
    });

    const [showAuditoria, setShowAuditoria] = useState(false);
    const [auditLogs, setAuditLogs]         = useState<ActivityLog[]>([]);
    const [auditLoading, setAuditLoading]   = useState(false);
    const [auditSearch, setAuditSearch]     = useState("");

    const [showAI, setShowAI]           = useState(false);
    const [aiAnalysis, setAiAnalysis]   = useState<string | null>(null);
    const [aiLoading, setAiLoading]     = useState(false);

    const fetchDashboard = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        try {
            const res = await fetch('/api/dashboard', { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch { /* silently fail */ }
        finally { setLoading(false); setRefreshing(false); }
    }, []);

    useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

    const handlePreviewCierre = async () => {
        setIsClosing(true);
        try {
            const qs = `?periodo=${encodeURIComponent(closingForm.periodo)}&fecha_inicio=${closingForm.fecha_inicio}&fecha_fin=${closingForm.fecha_fin}&preview=true`;
            const res = await fetch(`/api/periodo-cierre${qs}`);
            if (res.ok) {
                const json = await res.json();
                if (json.cierres && json.cierres.length === 0) {
                    const ingresos   = data?.ingresos ?? 0;
                    const gastos     = data?.gastos ?? 0;
                    setClosingData({
                        periodo: closingForm.periodo,
                        ingresos,
                        gastos,
                        utilidad: ingresos - gastos,
                        facturas_emitidas: data?.facturas.emitidas ?? 0,
                        facturas_cobradas: data?.facturas.cobradas ?? 0,
                    });
                }
            }
        } finally { setIsClosing(false); }
    };

    const handleConfirmCierre = async () => {
        setIsClosing(true);
        try {
            const res = await fetch('/api/periodo-cierre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...closingForm,
                    cerrado_por: user?.nombre ?? 'Usuario',
                }),
            });
            const json = await res.json();
            if (res.ok) {
                setClosingData(json.cierre);
                toast({
                    title: "✔ PERÍODO FISCAL CERRADO",
                    description: `${closingForm.periodo} — Utilidad: Bs. ${fmtBs(json.cierre?.utilidad ?? 0)}`,
                });
                setShowCierre(false);
                fetchDashboard();
            } else {
                toast({ title: "Error", description: json.error ?? "No se pudo cerrar el período", variant: "destructive" });
            }
        } catch {
            toast({ title: "Error de conexión", variant: "destructive" });
        }
        setIsClosing(false);
    };

    const handleAuditoria = async () => {
        setShowAuditoria(true);
        setAuditLoading(true);
        try {
            const res = await fetch('/api/activity-log?limit=100');
            if (res.ok) {
                const json = await res.json();
                setAuditLogs(json.logs ?? []);
            }
        } catch { /* silently fail */ }
        finally { setAuditLoading(false); }
    };

    const filteredLogs = auditLogs.filter(l =>
        !auditSearch ||
        l.evento.toLowerCase().includes(auditSearch.toLowerCase()) ||
        (l.descripcion ?? '').toLowerCase().includes(auditSearch.toLowerCase()) ||
        l.categoria.toLowerCase().includes(auditSearch.toLowerCase())
    );

    const handleAIAnalysis = async () => {
        setShowAI(true);
        if (!data) {
            toast({ title: 'Sin datos', description: 'Carga el dashboard antes de analizar.', variant: 'destructive' });
            return;
        }
        setAiLoading(true);
        setAiAnalysis(null);
        try {
            const res = await fetch('/api/ai/analyze-dashboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    module: 'Dashboard Empresarial',
                    data: {
                        ingresos: data.ingresos,
                        gastos: data.gastos,
                        utilidadNeta: data.utilidadNeta,
                        liquidezTotal: data.liquidezTotal,
                        cuentasCobrar: data.cuentasCobrar,
                        cuentasPagar: data.cuentasPagar,
                        facturas: data.facturas,
                        empleados: data.empleados,
                        movimientosRecientes: data.movimientosRecientes?.slice(0, 5),
                    },
                    context: `Empresa: ${user?.nombre ?? 'N/A'}. Fecha: ${new Date().toLocaleDateString('es-VE')}`,
                }),
            });
            const json = await res.json();
            if (res.ok) {
                setAiAnalysis(json.analysis);
            } else {
                toast({ title: 'Error', description: json.error, variant: 'destructive' });
                setShowAI(false);
            }
        } catch {
            toast({ title: 'Error de conexión', variant: 'destructive' });
            setShowAI(false);
        } finally {
            setAiLoading(false);
        }
    };

    const kpiStats = [
        {
            label: "INGRESOS DEL MES",
            value: data ? `Bs. ${fmtBs(data.ingresos)}` : "—",
            trend: data?.ingresos === 0 ? "Sin movimientos" : `Acumulado ${new Date().toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })}`,
            icon: TrendingUp, color: "text-emerald-600",
        },
        {
            label: "GASTOS DEL MES",
            value: data ? `Bs. ${fmtBs(data.gastos)}` : "—",
            trend: data?.gastos === 0 ? "Sin movimientos" : "Egresos acumulados",
            icon: TrendingDown, color: "text-rose-600",
        },
        {
            label: "UTILIDAD NETA",
            value: data ? `Bs. ${fmtBs(data.utilidadNeta)}` : "—",
            trend: data ? (data.utilidadNeta >= 0 ? "Positiva" : "Negativa") : "Sin datos",
            icon: Zap, color: data?.utilidadNeta != null ? (data.utilidadNeta >= 0 ? "text-primary" : "text-rose-600") : "text-primary",
        },
        {
            label: "LIQUIDEZ TOTAL",
            value: data ? `Bs. ${fmtBs(data.liquidezTotal)}` : "—",
            trend: data?.liquidezTotal === 0 ? "Sin cuentas" : `${data?.facturas?.emitidas ?? 0} fact. emitidas`,
            icon: Activity, color: "text-blue-500",
        },
    ];

    const quickBooks = [
        { label: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", icon: Receipt, kpi: data ? `Bs. ${fmtBs(data.cuentasCobrar)}` : "—", color: "text-blue-600" },
        { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: data ? `${data.empleados} empleado${data.empleados !== 1 ? 's' : ''}` : "—", color: "text-emerald-600" },
        { label: "Facturas Vencidas", href: "/facturacion", icon: Box, kpi: data ? `${data.facturas.vencidas} vencida${data.facturas.vencidas !== 1 ? 's' : ''}` : "—", color: "text-amber-600" },
        { label: "Cuentas por Pagar", href: "/cuentas-por-pagar", icon: Landmark, kpi: data ? `Bs. ${fmtBs(data.cuentasPagar)}` : "—", color: "text-rose-600" },
    ];

    return (
        <div className="space-y-8 md:space-y-10 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-6 py-2 mt-6 md:mt-10">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2 md:mb-3">
                        <Calculator className="h-3 w-3" /> CENTRO OPERATIVO CENTRAL
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-none text-foreground italic-shadow">
                        PORTAL INTEGRAL DE CONTROL <span className="text-primary italic">CORPORATIVO</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-1 md:mt-2 italic">
                        {user?.nombre ? `${user.nombre} • ` : ''}Portal Empresarial • Gestión Consolidada 2026
                    </p>
                </div>
                <div className="flex w-full md:w-auto gap-3 no-print flex-wrap">
                    <Button variant="outline" className="flex-none h-11 md:h-12 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground/60" onClick={() => fetchDashboard(true)} disabled={refreshing}>
                        <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 px-4 md:px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground/60" onClick={handleAuditoria}>
                        <History className="mr-2 h-4 w-4" /> AUDITORÍA
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 px-4 md:px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-primary/30 bg-primary/5 text-primary hover:bg-primary/10" onClick={handleAIAnalysis} disabled={aiLoading || loading}>
                        <BrainCircuit className="mr-2 h-4 w-4" /> ANALIZAR CON IA
                    </Button>
                    <Button className="flex-1 md:flex-none btn-3d-primary h-11 md:h-12 px-6 md:px-10 rounded-xl font-black text-[9px] uppercase tracking-widest" onClick={() => { setClosingData(null); setShowCierre(true); }}>
                        <Lock className="mr-2 h-4 w-4" /> CERRAR PERIODO
                    </Button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {kpiStats.map((kpi, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Card className="glass-card border-none bg-card/40 p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 md:p-6">
                                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
                                <div className="p-2 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform shadow-inner">
                                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 md:p-6 pt-0">
                                {loading ? <div className="h-8 w-32 bg-muted rounded animate-pulse" /> : (
                                    <div className="text-xl md:text-2xl font-black italic tracking-tighter text-foreground break-words">{kpi.value}</div>
                                )}
                                <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Books */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between ml-2 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-xl"><BookOpen className="h-5 w-5 text-primary" /></div>
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-foreground/60">Resumen Financiero</h3>
                    </div>
                    <Button asChild variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest p-0 h-auto self-start sm:self-auto">
                        <Link href="/contabilidad" className="flex items-center gap-2">MÓDULO COMPLETO <ArrowRight className="h-3 w-3" /></Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {quickBooks.map((item, i) => (
                        <Link key={i} href={item.href as never}>
                            <Card className="glass-card border-none bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-6 md:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors italic">{item.label}</p>
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", loading ? "text-muted-foreground" : item.color)}>
                                            {loading ? "Cargando..." : item.kpi}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4"><ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-all" /></div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Chart + Movimientos + IA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 w-full overflow-hidden"><OverviewChart /></div>
                <div className="lg:col-span-5 space-y-4">
                    <Card className="glass-card border-none bg-card/40 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Últimos Movimientos</h3>
                            <Link href="/contabilidad/conciliacion-bancaria"><span className="text-[9px] font-black uppercase tracking-widest text-primary cursor-pointer">Ver todos</span></Link>
                        </div>
                        {loading ? (
                            <div className="space-y-3">{[1,2,3].map(n => <div key={n} className="h-10 bg-muted rounded animate-pulse" />)}</div>
                        ) : data?.movimientosRecientes?.length ? (
                            <div className="space-y-2">
                                {data.movimientosRecientes.map((mov) => (
                                    <div key={mov.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase truncate">{mov.concepto}</p>
                                            <p className="text-[9px] text-muted-foreground">{mov.fecha_operacion}</p>
                                        </div>
                                        <span className={cn("text-[11px] font-black ml-4 shrink-0", mov.tipo === 'credito' ? "text-emerald-600" : "text-rose-600")}>
                                            {mov.tipo === 'credito' ? '+' : '-'} Bs. {fmtBs(parseFloat(mov.monto))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-[10px] font-bold uppercase text-muted-foreground/50">Sin movimientos registrados</p>
                                <Link href="/contabilidad/conciliacion-bancaria">
                                    <Button variant="outline" size="sm" className="mt-3 text-[9px] font-black uppercase tracking-widest rounded-xl">Registrar movimiento</Button>
                                </Link>
                            </div>
                        )}
                    </Card>

                    <Card className="glass-card border-none bg-[#050505] p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><BarChart3 className="h-32 w-32" /></div>
                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#00A86B]">Escenarios IA</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Modelado Predictivo</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Button
                                    onClick={() => {
                                        const aum = data ? data.ingresos * 1.2 : 0;
                                        toast({ title: "SIMULACIÓN: AUMENTO VENTAS 20%", description: `Proyección de ingresos: Bs. ${fmtBs(aum)} — Utilidad estimada: Bs. ${fmtBs(aum - (data?.gastos ?? 0))}` });
                                    }}
                                    variant="outline"
                                    className="justify-start h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-[#00A86B] hover:border-[#00A86B] group/btn text-white"
                                >
                                    <TrendingUp className="mr-4 h-4 w-4 text-[#00A86B] group-hover/btn:text-white transition-all" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Aumento Ventas 20%</span>
                                </Button>
                                <Button
                                    onClick={() => {
                                        const inf = data ? data.gastos * 1.35 : 0;
                                        toast({ title: "SIMULACIÓN: ESCENARIO INFLACIÓN", description: `Gastos proyectados c/inflación 35%: Bs. ${fmtBs(inf)} — Utilidad ajustada: Bs. ${fmtBs((data?.ingresos ?? 0) - inf)}` });
                                    }}
                                    variant="outline"
                                    className="justify-start h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-rose-500 hover:border-rose-500 group/btn text-white"
                                >
                                    <ShieldAlert className="mr-4 h-4 w-4 text-rose-500 group-hover/btn:text-white transition-all" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Escenario Inflación</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* ─── DIALOG: CERRAR PERÍODO ─── */}
            <Dialog open={showCierre} onOpenChange={setShowCierre}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <Lock className="h-4 w-4 text-primary" /> Cierre de Período Fiscal
                        </DialogTitle>
                    </DialogHeader>
                    {closingData ? (
                        <div className="space-y-6 py-4">
                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Resumen del Período: {closingData.periodo}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><p className="text-[9px] text-muted-foreground uppercase font-bold">Ingresos</p><p className="text-lg font-black text-emerald-500">Bs. {fmtBs(closingData.ingresos)}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase font-bold">Gastos</p><p className="text-lg font-black text-rose-500">Bs. {fmtBs(closingData.gastos)}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase font-bold">Utilidad Neta</p><p className={cn("text-xl font-black", closingData.utilidad >= 0 ? "text-primary" : "text-rose-500")}>Bs. {fmtBs(closingData.utilidad)}</p></div>
                                    <div><p className="text-[9px] text-muted-foreground uppercase font-bold">Facturas</p><p className="text-lg font-black">{closingData.facturas_emitidas} emitidas / {closingData.facturas_cobradas} cobradas</p></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold text-center">¿Confirmas el cierre definitivo de este período?</p>
                        </div>
                    ) : (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest">Nombre del Período *</Label>
                                <Input value={closingForm.periodo} onChange={e => setClosingForm(f => ({...f, periodo: e.target.value}))} placeholder="Ej: MARZO 2026" className="h-11 rounded-xl text-xs" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-widest">Fecha Inicio *</Label>
                                    <Input type="date" value={closingForm.fecha_inicio} onChange={e => setClosingForm(f => ({...f, fecha_inicio: e.target.value}))} className="h-11 rounded-xl text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-widest">Fecha Fin *</Label>
                                    <Input type="date" value={closingForm.fecha_fin} onChange={e => setClosingForm(f => ({...f, fecha_fin: e.target.value}))} className="h-11 rounded-xl text-xs" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-widest">Notas</Label>
                                <Textarea placeholder="Observaciones del cierre..." value={closingForm.notas} onChange={e => setClosingForm(f => ({...f, notas: e.target.value}))} className="rounded-xl text-xs" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCierre(false)} className="rounded-xl text-xs">Cancelar</Button>
                        {closingData ? (
                            <Button onClick={handleConfirmCierre} disabled={isClosing} className="rounded-xl font-black text-[9px] uppercase tracking-widest bg-primary">
                                {isClosing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                {isClosing ? "PROCESANDO..." : "CONFIRMAR CIERRE"}
                            </Button>
                        ) : (
                            <Button onClick={handlePreviewCierre} disabled={isClosing} className="rounded-xl font-black text-[9px] uppercase tracking-widest">
                                {isClosing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-4 w-4" />}
                                {isClosing ? "CALCULANDO..." : "CALCULAR PERÍODO"}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ─── DIALOG: AUDITORÍA ─── */}
            <Dialog open={showAuditoria} onOpenChange={setShowAuditoria}>
                <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <History className="h-4 w-4 text-primary" /> Registro de Auditoría del Sistema
                        </DialogTitle>
                    </DialogHeader>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Filtrar eventos..." className="pl-10 h-10 rounded-xl text-xs" value={auditSearch} onChange={e => setAuditSearch(e.target.value)} />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {auditLoading ? (
                            <div className="space-y-2">{[1,2,3,4,5].map(n => <div key={n} className="h-14 bg-muted/30 rounded-xl animate-pulse" />)}</div>
                        ) : filteredLogs.length === 0 ? (
                            <div className="text-center py-20">
                                <FileText className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
                                <p className="text-[10px] font-bold uppercase text-muted-foreground/40">No hay registros de actividad</p>
                            </div>
                        ) : (
                            filteredLogs.map(log => (
                                <div key={log.id} className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/20 hover:bg-muted/30 transition-all">
                                    <div className="shrink-0">
                                        <Badge variant="outline" className={cn("text-[8px] font-black uppercase border-white/10", CAT_COLOR[log.categoria] ?? "text-muted-foreground")}>
                                            {log.categoria}
                                        </Badge>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-widest truncate">{log.evento}</p>
                                        {log.descripcion && <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2">{log.descripcion}</p>}
                                    </div>
                                    <p className="text-[9px] text-muted-foreground shrink-0">{new Date(log.created_at).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' })}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <DialogFooter className="mt-4">
                        <p className="text-[9px] text-muted-foreground uppercase font-bold mr-auto">{filteredLogs.length} eventos encontrados</p>
                        <Button variant="outline" onClick={() => setShowAuditoria(false)} className="rounded-xl text-xs">Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ─── DIALOG: ANÁLISIS IA ─── */}
            <Dialog open={showAI} onOpenChange={setShowAI}>
                <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                            <BrainCircuit className="h-4 w-4 text-primary" /> Análisis Inteligente del Dashboard
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto py-4">
                        {aiLoading ? (
                            <div className="space-y-4 py-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Analizando datos con IA...</p>
                                </div>
                                <div className="space-y-3">
                                    {[1,2,3,4].map(n => <div key={n} className={`h-4 bg-muted/40 rounded animate-pulse`} style={{ width: `${[90,75,85,60][n-1]}%` }} />)}
                                </div>
                            </div>
                        ) : aiAnalysis ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">Análisis Generado por OpenAI</span>
                                    </div>
                                    <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap font-medium">
                                        {aiAnalysis}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] text-muted-foreground/50 font-bold uppercase">
                                    <CheckCircle className="h-3 w-3" />
                                    Basado en datos en tiempo real del dashboard • {new Date().toLocaleDateString('es-VE')}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <DialogFooter>
                        {aiAnalysis && (
                            <Button variant="outline" onClick={handleAIAnalysis} disabled={aiLoading} className="rounded-xl text-xs mr-auto">
                                <RefreshCw className="mr-2 h-3 w-3" /> Regenerar
                            </Button>
                        )}
                        <Button variant="outline" onClick={() => setShowAI(false)} className="rounded-xl text-xs">Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
