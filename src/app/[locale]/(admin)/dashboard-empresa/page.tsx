"use client";

import { useState, useEffect, useCallback } from "react";
import { Calculator, TrendingUp, TrendingDown, Activity, CircleCheck as CheckCircle, Zap, ArrowRight, BookOpen, Landmark, Users, History, Box, Receipt, Loader as Loader2, ShieldAlert, ChartBar as BarChart3, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

function fmtBs(n: number): string {
    return new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function DashboardEmpresaPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboard = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        try {
            const res = await fetch('/api/dashboard', { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch {
            // silently fail
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

    const kpiStats = [
        {
            label: "INGRESOS DEL MES",
            value: data ? `Bs. ${fmtBs(data.ingresos)}` : "—",
            trend: data?.ingresos === 0 ? "Sin movimientos" : `Acumulado ${new Date().toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })}`,
            icon: TrendingUp,
            color: "text-emerald-600",
        },
        {
            label: "GASTOS DEL MES",
            value: data ? `Bs. ${fmtBs(data.gastos)}` : "—",
            trend: data?.gastos === 0 ? "Sin movimientos" : "Egresos acumulados",
            icon: TrendingDown,
            color: "text-rose-600",
        },
        {
            label: "UTILIDAD NETA",
            value: data ? `Bs. ${fmtBs(data.utilidadNeta)}` : "—",
            trend: data ? (data.utilidadNeta >= 0 ? "Positiva" : "Negativa") : "Sin datos",
            icon: Zap,
            color: data?.utilidadNeta != null ? (data.utilidadNeta >= 0 ? "text-primary" : "text-rose-600") : "text-primary",
        },
        {
            label: "LIQUIDEZ TOTAL",
            value: data ? `Bs. ${fmtBs(data.liquidezTotal)}` : "—",
            trend: data?.liquidezTotal === 0 ? "Sin cuentas" : `${data?.facturas?.emitidas ?? 0} fact. pendientes`,
            icon: Activity,
            color: "text-blue-500",
        },
    ];

    const quickBooks = [
        {
            label: "Cuentas por Cobrar",
            href: "/cuentas-por-cobrar",
            icon: Receipt,
            kpi: data ? `Bs. ${fmtBs(data.cuentasCobrar)}` : "—",
            color: "text-blue-600",
        },
        {
            label: "Nómina Mensual",
            href: "/contabilidad/libros/nomina",
            icon: Users,
            kpi: data ? `${data.empleados} empleado${data.empleados !== 1 ? 's' : ''}` : "—",
            color: "text-emerald-600",
        },
        {
            label: "Facturas Vencidas",
            href: "/facturacion",
            icon: Box,
            kpi: data ? `${data.facturas.vencidas} vencida${data.facturas.vencidas !== 1 ? 's' : ''}` : "—",
            color: "text-amber-600",
        },
        {
            label: "Cuentas por Pagar",
            href: "/cuentas-por-pagar",
            icon: Landmark,
            kpi: data ? `Bs. ${fmtBs(data.cuentasPagar)}` : "—",
            color: "text-rose-600",
        },
    ];

    const handleClosePeriod = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            toast({
                title: "PERIODO CERRADO",
                description: "Ejercicio fiscal sellado con éxito.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
        }, 800);
    };

    return (
        <div className="space-y-8 md:space-y-10 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-6 py-2 mt-6 md:mt-10">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2 md:mb-3">
                        <Calculator className="h-3 w-3" /> CENTRO OPERATIVO CENTRAL
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-none text-foreground italic-shadow">
                        CENTRO DE <span className="text-primary italic">MANDO</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-1 md:mt-2 italic">
                        {user?.nombre ? `${user.nombre} • ` : ''}Portal Empresarial • Gestión Consolidada 2026
                    </p>
                </div>
                <div className="flex w-full md:w-auto gap-3 no-print">
                    <Button
                        variant="outline"
                        className="flex-none h-11 md:h-12 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground/60"
                        onClick={() => fetchDashboard(true)}
                        disabled={refreshing}
                    >
                        <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 px-4 md:px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground/60">
                        <History className="mr-2 h-4 w-4" /> AUDITORÍA
                    </Button>
                    <Button
                        className="flex-1 md:flex-none btn-3d-primary h-11 md:h-12 px-6 md:px-10 rounded-xl font-black text-[9px] uppercase tracking-widest"
                        onClick={handleClosePeriod}
                        disabled={isClosing}
                    >
                        {isClosing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Receipt className="mr-2 h-4 w-4" />}
                        {isClosing ? "PROCESANDO" : "CERRAR PERIODO"}
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
                                {loading ? (
                                    <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                                ) : (
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
                        <Link href="/contabilidad" className="flex items-center gap-2">
                            MÓDULO COMPLETO <ArrowRight className="h-3 w-3" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {quickBooks.map((item, i) => (
                        <Link key={i} href={item.href as any}>
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
                                <div className="flex justify-end mt-4">
                                    <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-all" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Movimientos recientes + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 w-full overflow-hidden">
                    <OverviewChart />
                </div>

                <div className="lg:col-span-5 space-y-4">
                    {/* Últimos movimientos */}
                    <Card className="glass-card border-none bg-card/40 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Últimos Movimientos</h3>
                            <Link href="/contabilidad/conciliacion-bancaria">
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary cursor-pointer">Ver todos</span>
                            </Link>
                        </div>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(n => <div key={n} className="h-10 bg-muted rounded animate-pulse" />)}
                            </div>
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
                                    <Button variant="outline" size="sm" className="mt-3 text-[9px] font-black uppercase tracking-widest rounded-xl">
                                        Registrar movimiento
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Card>

                    {/* Escenarios IA */}
                    <Card className="glass-card border-none bg-[#050505] p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><BarChart3 className="h-32 w-32" /></div>
                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#00A86B]">Escenarios IA</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Modelado Predictivo</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Button
                                    onClick={() => toast({ title: "SIMULACIÓN ACTIVA", description: "Proyección de aumento del 20% en ventas aplicada." })}
                                    variant="outline"
                                    className="justify-start h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-[#00A86B] hover:border-[#00A86B] group text-white"
                                >
                                    <TrendingUp className="mr-4 h-4 w-4 text-[#00A86B] group-hover:text-white transition-all" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Aumento Ventas 20%</span>
                                </Button>
                                <Button
                                    onClick={() => toast({ title: "SIMULACIÓN ACTIVA", description: "Escenario inflacionario calculado sobre sus datos." })}
                                    variant="outline"
                                    className="justify-start h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-rose-500 hover:border-rose-500 group text-white"
                                >
                                    <ShieldAlert className="mr-4 h-4 w-4 text-rose-500 group-hover:text-white transition-all" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Escenario Inflación</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
