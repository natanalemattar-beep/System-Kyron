
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { ChartPie as PieChart, ArrowLeft, TrendingUp, ShieldCheck, Activity, ArrowRight, Calculator, ChartBar as ChartColumn, ChevronRight, Sparkles, Zap, Target, BrainCircuit, Wallet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Centro de Análisis Estratégico - Vista de Acceso Rápido y Insights Ejecutivos.
 * Los datos KPI se cargan en tiempo real desde /api/dashboard.
 */

interface DashboardData {
    liquidezTotal: number;
    ingresos: number;
    gastos: number;
    utilidadNeta: number;
    facturas: { emitidas: number; cobradas: number; vencidas: number };
    empleados: number;
}

function formatBs(value: number) {
    if (value >= 1_000_000) return `Bs. ${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `Bs. ${(value / 1_000).toFixed(1)}k`;
    return `Bs. ${value.toFixed(2)}`;
}

export default function AnalisisPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/dashboard')
            .then(r => r.ok ? r.json() : null)
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const cajaSalud = data ? formatBs(data.liquidezTotal) : '—';
    const eficiencia = data && data.ingresos > 0 
        ? `${Math.min(100, Math.round((data.utilidadNeta / data.ingresos) * 100))}%`
        : '—';
    const riesgoFiscal = data ? `${data.facturas.vencidas} facturas` : '—';
    const riesgoColor = data && data.facturas.vencidas > 0 ? 'text-rose-400' : 'text-emerald-500';
    const riesgoLabel = data && data.facturas.vencidas > 0 ? 'ALERTAS ACTIVAS' : 'BLINDAJE: ACTIVO';

    const quickAccess = [
        { label: "VENTAS E INGRESOS", href: "/analisis-ventas", icon: ChartColumn, color: "text-blue-600", desc: "Análisis de volumen y tendencias comerciales." },
        { label: "RIESGO FINANCIERO", href: "/analisis-riesgo", icon: ShieldCheck, color: "text-rose-600", desc: "Monitor de morosidad y alertas preventivas." },
        { label: "RENTABILIDAD AVANZADA", href: "/analisis-rentabilidad", icon: TrendingUp, color: "text-emerald-600", desc: "Márgenes netos y optimización de ROI." },
        { label: "FACTIBILIDAD", href: "/estudio-factibilidad-economica", icon: Calculator, color: "text-amber-600", desc: "VAN, TIR y escenarios de inversión." },
        { label: "COSTOS", href: "/estructura-costos", icon: Activity, color: "text-slate-600", desc: "Desglose de gastos fijos y variables." },
    ];

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
                        <PieChart className="h-3 w-3" /> ÁREA ESTRATÉGICA
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground uppercase tracking-tight italic">
                        Centro de <span className="text-primary">Análisis</span>
                    </h1>
                    <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">
                        Inteligencia de Negocios y Business Intelligence 2026
                        {!loading && <span className="ml-3 text-emerald-500/60">● Tiempo Real</span>}
                    </p>
                </div>
                <Button variant="ghost" asChild className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    <Link href="/dashboard-empresa"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a Mando</Link>
                </Button>
            </header>

            {/* --- INSIGHTS INSTANTÁNEOS EN TIEMPO REAL --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary/5 border-primary/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Wallet className="h-16 w-16 text-primary" /></div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/60 mb-2">Salud de Caja</p>
                    <p className="text-3xl font-bold text-white tracking-tight mb-4">
                        {loading ? <span className="opacity-40 animate-pulse">Cargando...</span> : cajaSalud}
                        {' '}<span className="text-xs opacity-40 tracking-normal">Disponibles</span>
                    </p>
                    <div className="flex items-center gap-2 text-emerald-500">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-[10px] font-semibold uppercase">
                            {loading ? '...' : data ? 'Suficiencia: REAL' : 'SIN DATOS'}
                        </span>
                    </div>
                </Card>

                <Card className="bg-secondary/5 border-secondary/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Zap className="h-16 w-16 text-secondary" /></div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary/60 mb-2">Margen de Utilidad</p>
                    <p className="text-3xl font-bold text-white tracking-tight mb-4">
                        {loading ? <span className="opacity-40 animate-pulse">Cargando...</span> : eficiencia}
                        {' '}<span className="text-xs opacity-40 tracking-normal">Neto</span>
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                        <Target className="h-3 w-3" />
                        <span className="text-[10px] font-semibold uppercase">
                            {loading ? '...' : data ? `Ingresos: ${formatBs(data.ingresos)}` : 'SIN DATOS'}
                        </span>
                    </div>
                </Card>

                <Card className="bg-rose-500/5 border-rose-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck className="h-16 w-16 text-rose-500" /></div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-500/60 mb-2">Riesgo Fiscal</p>
                    <p className="text-3xl font-bold text-white tracking-tight mb-4">
                        {loading ? <span className="opacity-40 animate-pulse">Cargando...</span> : riesgoFiscal}
                        {' '}<span className="text-xs opacity-40 tracking-normal">Vencidas</span>
                    </p>
                    <div className={cn("flex items-center gap-2", riesgoColor)}>
                        <CheckCircleIcon className="h-3 w-3" />
                        <span className="text-[10px] font-semibold uppercase">{loading ? '...' : riesgoLabel}</span>
                    </div>
                </Card>
            </div>

            {/* --- ACCESOS RÁPIDOS --- */}
            <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 ml-2">Módulos de Prioridad</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {quickAccess.map((item, i) => (
                        <Link key={i} href={item.href as any}>
                            <Card className="glass-card border-none bg-card p-8 flex flex-col justify-between group shadow-sm hover:shadow-lg transition-all duration-500 rounded-xl min-h-[200px]">
                                <div className="space-y-6">
                                    <div className="p-3 bg-muted rounded-xl w-fit group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold uppercase italic tracking-tight text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* --- BANNER MAESTRO --- */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <Card className="bg-[#050505] border-none rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-lg group cursor-pointer">
                    <Link href="/analisis/todos" className="absolute inset-0 z-20" />
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <BrainCircuit className="h-64 w-64 text-primary" />
                    </div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-center md:text-left">
                            <Badge className="bg-primary text-white border-none text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-lg">Inteligencia Maestra</Badge>
                            <h3 className="text-2xl md:text-3xl font-semibold uppercase italic tracking-tight leading-none">EXPLORAR<br /> DIRECTORIO BI</h3>
                            <p className="text-lg font-medium opacity-80 leading-relaxed uppercase">Acceda a la biblioteca completa de métricas corporativas, proyecciones de mercado y KPIs analíticos de misión crítica.</p>
                            <Button size="lg" className="h-16 px-12 rounded-2xl shadow-lg border-none font-semibold uppercase text-[11px] tracking-wide">
                                VER TODO EL CATÁLOGO <ArrowRight className="ml-4 h-5 w-5" />
                            </Button>
                        </div>
                        <div className="hidden md:flex justify-end">
                            <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                                <Sparkles className="h-20 w-20 mx-auto text-primary mb-2 drop-shadow-glow" />
                                <p className="text-5xl font-bold tracking-tight">50+</p>
                                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">Módulos Analíticos</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
