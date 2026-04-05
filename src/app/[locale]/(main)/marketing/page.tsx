"use client";

import { useState, useEffect, useCallback } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    Megaphone,
    TrendingUp,
    BarChart3,
    Bell,
    RefreshCw,
    CheckCircle,
    Target,
    DollarSign,
    Users,
    Mail,
    Globe,
    Loader2,
    ArrowRight,
} from "lucide-react";

interface DashboardData {
    campanas: { total: string; activas: string; total_alcance: string; total_conversiones: string; total_presupuesto: string; total_gastado: string } | null;
    clientes: { total: string; activos: string; avg_satisfaccion: string; total_valor: string } | null;
    email: { total: string; total_enviados: string; total_abiertos: string; total_clicks: string } | null;
    redes: { total_seguidores: string; total_alcance: string; avg_engagement: string } | null;
    recentCampanas: { id: number; nombre: string; tipo: string; estado: string; alcance: number; conversiones: number; roi: number; created_at: string }[];
    topRedes: { nombre: string; seguidores: number; crecimiento: number; engagement: number; color: string; bg: string }[];
}

export default function MarketingDashboardPage() {
    const { toast } = useToast();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboard = useCallback(async () => {
        try {
            const res = await fetch("/api/marketing/dashboard");
            if (!res.ok) {
                setError(true);
                toast({ variant: "destructive", title: "Error al cargar dashboard" });
                return;
            }
            const d = await res.json();
            setData(d);
            setError(false);
        } catch {
            setError(true);
            toast({ variant: "destructive", title: "Error al cargar dashboard" });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchDashboard();
        setRefreshing(false);
        toast({ title: "DATOS ACTUALIZADOS", description: "Dashboard sincronizado exitosamente.", action: <CheckCircle className="text-emerald-500 h-4 w-4" /> });
    };

    const fmt = (val: string | undefined, fallback = "0") => {
        const n = Number(val ?? fallback);
        if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
        return n.toLocaleString();
    };

    const totalCampanas = Number(data?.campanas?.total ?? 0);
    const campanasActivas = Number(data?.campanas?.activas ?? 0);
    const totalClientes = Number(data?.clientes?.total ?? 0);
    const clientesActivos = Number(data?.clientes?.activos ?? 0);
    const totalEmailEnviados = Number(data?.email?.total_enviados ?? 0);
    const totalEmailAbiertos = Number(data?.email?.total_abiertos ?? 0);
    const totalSeguidores = Number(data?.redes?.total_seguidores ?? 0);
    const avgEngagement = Number(data?.redes?.avg_engagement ?? 0);

    const emailOpenRate = totalEmailEnviados > 0 ? ((totalEmailAbiertos / totalEmailEnviados) * 100).toFixed(1) + "%" : "—";
    const totalPresupuesto = Number(data?.campanas?.total_presupuesto ?? 0);
    const totalGastado = Number(data?.campanas?.total_gastado ?? 0);

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20">
            <ModuleTutorial config={moduleTutorials["marketing"]} />

            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary-sm mb-4">
                    <Megaphone className="h-3 w-3" /> MARKETING IA — CENTRO DE CONTROL
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase italic text-foreground">
                    Dashboard de <span className="text-primary">Marketing</span>
                </h1>
                <div className="flex items-center gap-4 mt-2">
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">
                        KPIs en tiempo real • Campañas • CRM • System Kyron 2026
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        className="h-8 rounded-xl text-[11px] font-semibold uppercase tracking-widest border-border ml-auto"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                        Actualizar
                    </Button>
                </div>
            </header>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
                    <BarChart3 className="h-12 w-12" />
                    <p className="text-xs font-semibold uppercase tracking-widest">Error al cargar dashboard</p>
                    <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchDashboard(); }} className="rounded-xl text-[11px] font-semibold uppercase tracking-widest">
                        Reintentar
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Campañas Activas", value: campanasActivas.toString(), icon: Target, color: "text-primary", bg: "bg-primary/10" },
                            { label: "Clientes CRM", value: fmt(data?.clientes?.total), icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                            { label: "Emails Enviados", value: fmt(data?.email?.total_enviados), icon: Mail, color: "text-cyan-400", bg: "bg-cyan-400/10" },
                            { label: "Seguidores Totales", value: fmt(data?.redes?.total_seguidores), icon: Globe, color: "text-amber-400", bg: "bg-amber-400/10" },
                        ].map((kpi, i) => (
                            <Card key={i} className="glass-card border-none p-6 rounded-xl bg-card/50 relative overflow-hidden group">
                                <div className={`p-3 ${kpi.bg} rounded-xl w-fit mb-4 border border-white/5`}>
                                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                                </div>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">{kpi.label}</p>
                                <p className={`text-3xl font-bold tracking-tight ${kpi.color}`}>{kpi.value}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="glass-card border-border/50 bg-card/40 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Target className="h-4 w-4 text-primary" />
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Campañas</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="font-bold">{totalCampanas}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Alcance Total</span>
                                    <span className="font-bold">{fmt(data?.campanas?.total_alcance)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Conversiones</span>
                                    <span className="font-bold text-emerald-500">{fmt(data?.campanas?.total_conversiones)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Presupuesto</span>
                                    <span className="font-bold">USD {totalPresupuesto.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Gastado</span>
                                    <span className="font-bold">USD {totalGastado.toLocaleString()}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-card border-border/50 bg-card/40 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="h-4 w-4 text-emerald-400" />
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">CRM</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Clientes Totales</span>
                                    <span className="font-bold">{totalClientes}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Activos</span>
                                    <span className="font-bold text-emerald-500">{clientesActivos}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Satisfacción</span>
                                    <span className="font-bold">{Number(data?.clientes?.avg_satisfaccion ?? 0).toFixed(1)}/5</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Valor Total</span>
                                    <span className="font-bold text-primary">USD {fmt(data?.clientes?.total_valor)}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-card border-border/50 bg-card/40 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Mail className="h-4 w-4 text-cyan-400" />
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Email Marketing</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Campañas Email</span>
                                    <span className="font-bold">{Number(data?.email?.total ?? 0)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Enviados</span>
                                    <span className="font-bold">{fmt(data?.email?.total_enviados)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Tasa Apertura</span>
                                    <span className="font-bold text-emerald-500">{emailOpenRate}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Clicks</span>
                                    <span className="font-bold">{fmt(data?.email?.total_clicks)}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="glass-card border-border/50 bg-card/40 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="h-4 w-4 text-amber-400" />
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Redes Sociales</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Seguidores</span>
                                    <span className="font-bold">{fmt(data?.redes?.total_seguidores)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Alcance</span>
                                    <span className="font-bold">{fmt(data?.redes?.total_alcance)}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-muted-foreground">Engagement</span>
                                    <span className="font-bold text-rose-400">{avgEngagement.toFixed(1)}%</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {(data?.recentCampanas ?? []).length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                                <h2 className="text-[11px] font-semibold uppercase tracking-wide text-primary italic flex items-center gap-2">
                                    <Megaphone className="h-3.5 w-3.5" /> Campañas Recientes
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(data?.recentCampanas ?? []).map((campaign) => {
                                    const roiStr = Number(campaign.roi) !== 0 ? `${Number(campaign.roi) > 0 ? "+" : ""}${Number(campaign.roi)}%` : "—";
                                    return (
                                        <Card key={campaign.id} className="glass-card border-border/50 bg-card/40 rounded-xl p-6 group hover:border-primary/30 transition-all duration-300">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase italic tracking-tight text-foreground/90">{campaign.nombre}</p>
                                                    <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-1">{campaign.tipo}</p>
                                                </div>
                                                <Badge variant="outline" className={cn("text-[10px] font-semibold uppercase tracking-widest rounded-lg",
                                                    campaign.estado === "activa" ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" :
                                                    campaign.estado === "completada" ? "bg-primary/10 text-primary border-primary/20" :
                                                    "bg-muted/50 text-muted-foreground border-border"
                                                )}>
                                                    {campaign.estado}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="p-2 rounded-lg bg-muted/10">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Alcance</p>
                                                    <p className="text-lg font-bold text-foreground">{Number(campaign.alcance).toLocaleString()}</p>
                                                </div>
                                                <div className="p-2 rounded-lg bg-muted/10">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Conv.</p>
                                                    <p className="text-lg font-bold text-foreground">{Number(campaign.conversiones).toLocaleString()}</p>
                                                </div>
                                                <div className="p-2 rounded-lg bg-muted/10">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">ROI</p>
                                                    <p className={cn("text-lg font-bold", Number(campaign.roi) > 0 ? "text-emerald-400" : "text-muted-foreground/30")}>{roiStr}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {(data?.topRedes ?? []).length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                                <h2 className="text-[11px] font-semibold uppercase tracking-wide text-primary italic flex items-center gap-2">
                                    <Globe className="h-3.5 w-3.5" /> Rendimiento en Redes Sociales
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {(data?.topRedes ?? []).map((social, i) => (
                                    <Card key={i} className="glass-card border-border/50 bg-card/40 rounded-xl p-5 text-center group hover:border-primary/30 transition-all">
                                        <div className={cn("mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-3", social.bg || "bg-primary/10")}>
                                            <Globe className={cn("h-4 w-4", social.color || "text-primary")} />
                                        </div>
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-1">{social.nombre}</p>
                                        <p className="text-2xl font-bold text-foreground mb-1">{Number(social.seguidores).toLocaleString()}</p>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-[11px] font-bold text-emerald-400">
                                                {Number(social.crecimiento) > 0 ? "+" : ""}{Number(social.crecimiento).toFixed(1)}%
                                            </span>
                                            <span className="text-[10px] text-muted-foreground/30">·</span>
                                            <span className="text-[11px] font-bold text-muted-foreground/60">
                                                Eng: {Number(social.engagement).toFixed(1)}%
                                            </span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {totalCampanas === 0 && totalClientes === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 gap-6 text-muted-foreground/30">
                            <BarChart3 className="h-16 w-16" />
                            <div className="text-center space-y-2">
                                <p className="text-sm font-semibold uppercase tracking-widest">Dashboard Vacío</p>
                                <p className="text-xs text-muted-foreground/50 max-w-md">
                                    Comienza creando campañas, registrando clientes o añadiendo tus redes sociales para ver los KPIs de marketing en tiempo real.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="rounded-xl text-[11px] font-semibold uppercase tracking-widest gap-1" asChild>
                                    <a href="/es/marketing/crm"><Users className="h-3 w-3" /> CRM <ArrowRight className="h-3 w-3" /></a>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl text-[11px] font-semibold uppercase tracking-widest gap-1" asChild>
                                    <a href="/es/marketing/campanas"><Target className="h-3 w-3" /> Campañas <ArrowRight className="h-3 w-3" /></a>
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
