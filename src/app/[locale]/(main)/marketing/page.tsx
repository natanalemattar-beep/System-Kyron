
"use client";

import { useState } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    Megaphone,
    TrendingUp,
    TrendingDown,
    Building2,
    Landmark,
    BarChart3,
    Bell,
    BellRing,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck,
    AlertTriangle,
    Banknote,
    Home,
    Car,
    Zap,
    RefreshCw,
    CheckCircle,
    Clock,
    Target,
    DollarSign,
    Activity,
    PieChart,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const marketAlerts = [
    {
        id: "ALT-001",
        category: "Bolsa de Valores",
        asset: "Acciones Bancarias VE",
        signal: "COMPRA",
        price: "USD 14.20",
        change: "+3.8%",
        positive: true,
        urgency: "ALTA",
        description: "Ruptura técnica alcista confirmada. Volumen 3x promedio.",
        icon: BarChart3,
        color: "text-emerald-400",
    },
    {
        id: "ALT-002",
        category: "Índice Bursátil",
        asset: "IBVC (Índice Bursátil VE)",
        signal: "MANTENER",
        price: "34,520 pts",
        change: "+1.2%",
        positive: true,
        urgency: "MEDIA",
        description: "Tendencia alcista consolidada. Soporte en 33,800 pts.",
        icon: TrendingUp,
        color: "text-primary",
    },
    {
        id: "ALT-003",
        category: "Bienes Inmuebles",
        asset: "Locales Comerciales Caracas",
        signal: "OPORTUNIDAD",
        price: "USD 85,000",
        change: "-12%",
        positive: false,
        urgency: "ALTA",
        description: "Precios en corrección. Retorno de alquiler estimado 8% anual.",
        icon: Home,
        color: "text-secondary",
    },
    {
        id: "ALT-004",
        category: "Bienes Muebles",
        asset: "Vehículos Comerciales",
        signal: "VENTA",
        price: "USD 22,500",
        change: "+6.1%",
        positive: true,
        urgency: "MEDIA",
        description: "Pico de valorización. Momento óptimo para liquidar activos vehiculares.",
        icon: Car,
        color: "text-amber-400",
    },
    {
        id: "ALT-005",
        category: "Crédito Bancario",
        asset: "Crédito Empresarial BDV",
        signal: "FAVORABLE",
        price: "15% TNA",
        change: "-2.5% vs mes",
        positive: true,
        urgency: "ALTA",
        description: "Tasa preferencial para empresas. Cuota desde USD 420/mes por USD 30k.",
        icon: Landmark,
        color: "text-primary",
    },
    {
        id: "ALT-006",
        category: "Crédito Bancario",
        asset: "Microcrédito Banesco",
        signal: "FAVORABLE",
        price: "18% TNA",
        change: "Nuevo Producto",
        positive: true,
        urgency: "BAJA",
        description: "Hasta USD 15,000 sin garantía real. Aprobación en 48h.",
        icon: Banknote,
        color: "text-emerald-400",
    },
];

const companyAnalysis = [
    { metric: "Flujo de Caja Mensual", value: "USD 48,500", status: "ok", note: "Cubre obligaciones por 3.2 meses" },
    { metric: "Deuda Vigente Total", value: "USD 120,000", status: "warning", note: "Ratio deuda/activos: 34%" },
    { metric: "Cuota de Mora (actual)", value: "USD 0", status: "ok", note: "Sin atrasos registrados" },
    { metric: "Capacidad de Pago", value: "USD 22,000 / mes", status: "ok", note: "Margen disponible para nuevas obligaciones" },
    { metric: "Score Crediticio", value: "820 / 1000", status: "ok", note: "Perfil de bajo riesgo" },
    { metric: "Próximo Vencimiento", value: "15 Abr 2026", status: "warning", note: "Bono BANDES — USD 8,400" },
];

const paymentAlternatives = [
    { name: "Refinanciamiento BDV 36m", monthly: "USD 890", totalCost: "USD 32,040", interest: "12%", recommended: true },
    { name: "Leasing Financiero Banesco", monthly: "USD 1,100", totalCost: "USD 39,600", interest: "15%", recommended: false },
    { name: "Pagaré Corporativo Mercantil", monthly: "USD 1,380", totalCost: "USD 24,840", interest: "18%", recommended: false },
    { name: "Capital de Trabajo BANDES", monthly: "USD 760", totalCost: "USD 27,360", interest: "9% (subsidiado)", recommended: true },
];

export default function MarketingDashboardPage() {
    const { toast } = useToast();
    const [activeAlerts, setActiveAlerts] = useState(marketAlerts.map(a => a.id));
    const [refreshing, setRefreshing] = useState(false);

    const handleSubscribeAlert = (alert: typeof marketAlerts[0]) => {
        toast({
            title: "ALERTA ACTIVADA",
            description: `Se activó monitoreo en tiempo real para: ${alert.asset}.`,
            action: <BellRing className="text-primary h-4 w-4" />
        });
    };

    const handleDismiss = (id: string) => {
        setActiveAlerts(prev => prev.filter(a => a !== id));
        toast({
            title: "Alerta Descartada",
            description: "La alerta fue removida del panel de monitoreo.",
        });
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            toast({
                title: "DATOS ACTUALIZADOS",
                description: "Mercados sincronizados — 18 Mar 2026, 14:35 VET",
                action: <CheckCircle className="text-emerald-500 h-4 w-4" />
            });
        }, 1200);
    };

    const visibleAlerts = marketAlerts.filter(a => activeAlerts.includes(a.id));

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20">
            <ModuleTutorial config={moduleTutorials["marketing"]} />

            {/* Header */}
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow-sm mb-4">
                    <Megaphone className="h-3 w-3" /> MARKETING IA — CENTRO DE MERCADO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-foreground italic-shadow">
                    Dashboard de <span className="text-primary">Inversión</span>
                </h1>
                <div className="flex items-center gap-4 mt-2">
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">
                        Alertas en tiempo real • Análisis financiero • System Kyron 2026
                    </p>
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRefresh}
                        className="h-8 rounded-xl text-[9px] font-black uppercase tracking-widest border-border ml-auto"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                        Actualizar
                    </Button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: "Alertas Activas", value: String(visibleAlerts.length), icon: Bell, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Señales de Compra", value: String(visibleAlerts.filter(a => a.signal === "COMPRA" || a.signal === "FAVORABLE" || a.signal === "OPORTUNIDAD").length), icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                    { label: "Índice IBVC", value: "34,520", icon: BarChart3, color: "text-secondary", bg: "bg-secondary/10" },
                    { label: "Score Empresa", value: "820", icon: Target, color: "text-amber-400", bg: "bg-amber-400/10" },
                ].map((kpi, i) => (
                    <Card key={i} className="glass-card border-none p-6 rounded-[2rem] bg-card/50 relative overflow-hidden group">
                        <div className={`p-3 ${kpi.bg} rounded-xl w-fit mb-4 border border-white/5`}>
                            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">{kpi.label}</p>
                        <p className={`text-3xl font-black italic tracking-tight ${kpi.color}`}>{kpi.value}</p>
                    </Card>
                ))}
            </div>

            {/* Alertas de Inversión */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <BellRing className="h-3.5 w-3.5" /> Alertas de Mercado
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleAlerts.map((alert) => (
                        <Card key={alert.id} className="glass-card border-border/50 bg-card/40 rounded-[2rem] overflow-hidden flex flex-col group hover:border-primary/30 transition-all duration-300">
                            <CardHeader className="p-6 pb-3">
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 group-hover:bg-primary/10 transition-all">
                                        <alert.icon className={`h-5 w-5 ${alert.color}`} />
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <Badge variant={alert.signal === "VENTA" ? "destructive" : "default"} className="text-[8px] font-black uppercase tracking-widest rounded-lg px-2 py-0.5">
                                            {alert.signal}
                                        </Badge>
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                            alert.urgency === "ALTA" ? "text-rose-400 bg-rose-400/10" :
                                            alert.urgency === "MEDIA" ? "text-amber-400 bg-amber-400/10" :
                                            "text-muted-foreground bg-muted/30"
                                        }`}>
                                            {alert.urgency}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-1">{alert.category}</p>
                                <CardTitle className="text-sm font-black uppercase italic tracking-tight leading-tight">{alert.asset}</CardTitle>
                            </CardHeader>

                            <CardContent className="px-6 pb-4 flex-grow space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-black text-foreground tracking-tight">{alert.price}</p>
                                    <span className={`text-[10px] font-black uppercase tracking-wide flex items-center gap-1 ${alert.positive ? "text-emerald-400" : "text-rose-400"}`}>
                                        {alert.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                                        {alert.change}
                                    </span>
                                </div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight leading-relaxed">{alert.description}</p>
                            </CardContent>

                            <CardFooter className="px-6 py-4 border-t border-border/20 flex gap-2">
                                <Button 
                                    size="sm" 
                                    className="flex-1 h-9 rounded-xl text-[9px] font-black uppercase tracking-widest"
                                    onClick={() => handleSubscribeAlert(alert)}
                                >
                                    <Bell className="h-3 w-3 mr-1.5" /> Monitorear
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-9 rounded-xl text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground"
                                    onClick={() => handleDismiss(alert.id)}
                                >
                                    Descartar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {visibleAlerts.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/30">
                            <BellRing className="h-12 w-12" />
                            <p className="text-xs font-black uppercase tracking-widest">No hay alertas activas</p>
                            <Button variant="outline" size="sm" onClick={() => setActiveAlerts(marketAlerts.map(a => a.id))} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
                                Restaurar Alertas
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Análisis de la Empresa */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5" /> Análisis Financiero de la Empresa
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <Card className="glass-card border-border/50 bg-card/40 rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                <PieChart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-black uppercase italic tracking-tight">Cobertura de Pagos Sin Incurrir en Mora</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase tracking-widest opacity-50 mt-1">Sistema Kyron — Análisis en Tiempo Real</CardDescription>
                            </div>
                            <Badge className="ml-auto text-[8px] font-black uppercase tracking-widest bg-emerald-400/10 text-emerald-400 border-emerald-400/20 rounded-lg px-2">
                                <ShieldCheck className="h-3 w-3 mr-1" /> SIN MORA
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-border/30 hover:bg-transparent">
                                    <TableHead className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 pl-8">Indicador</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Valor</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Estado</TableHead>
                                    <TableHead className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 pr-8">Nota</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companyAnalysis.map((row, i) => (
                                    <TableRow key={i} className="border-border/20 hover:bg-primary/2">
                                        <TableCell className="pl-8 py-4 text-[10px] font-black uppercase tracking-tight text-foreground/80">{row.metric}</TableCell>
                                        <TableCell className="py-4 text-sm font-black text-foreground">{row.value}</TableCell>
                                        <TableCell className="py-4">
                                            {row.status === "ok" ? (
                                                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-emerald-400">
                                                    <CheckCircle className="h-3 w-3" /> Óptimo
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-amber-400">
                                                    <Clock className="h-3 w-3" /> Atención
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="pr-8 py-4 text-[9px] text-muted-foreground font-bold uppercase tracking-tight">{row.note}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>

            {/* Alternativas de Pago */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <DollarSign className="h-3.5 w-3.5" /> Alternativas de Pago y Crédito
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentAlternatives.map((alt, i) => (
                        <Card key={i} className={`glass-card rounded-[2rem] border ${alt.recommended ? "border-primary/30 bg-primary/5" : "border-border/40 bg-card/30"} p-6 relative overflow-hidden group hover:border-primary/40 transition-all duration-300`}>
                            {alt.recommended && (
                                <div className="absolute top-4 right-4">
                                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                        ★ Recomendado
                                    </span>
                                </div>
                            )}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                    <Landmark className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase italic tracking-tight text-foreground/90">{alt.name}</h3>
                                    <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-1">Tasa: {alt.interest}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Cuota Mensual</p>
                                    <p className="text-lg font-black text-foreground">{alt.monthly}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Costo Total</p>
                                    <p className="text-lg font-black text-foreground">{alt.totalCost}</p>
                                </div>
                            </div>
                            <Button 
                                className="w-full mt-4 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest" 
                                variant={alt.recommended ? "default" : "outline"}
                                onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'marketing', subcategoria: 'solicitud_iniciada', descripcion: "SOLICITUD INICIADA" }) }); if (res.ok) toast({ title: "SOLICITUD INICIADA", description: `Se abrió el proceso de solicitud para: ${alt.name}` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}
                            >
                                Solicitar Financiamiento
                            </Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Campañas de Marketing */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <Megaphone className="h-3.5 w-3.5" /> Campañas Activas
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "Black Friday VE", type: "Email + SMS", status: "Activa", sent: 4520, opened: 2890, clicks: 876, conversion: "12.4%", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
                        { name: "Lanzamiento 5G", type: "Redes Sociales", status: "Programada", sent: 0, opened: 0, clicks: 0, conversion: "—", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                        { name: "Retención Clientes Q1", type: "WhatsApp + Email", status: "Activa", sent: 1230, opened: 980, clicks: 342, conversion: "8.7%", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
                    ].map((campaign, i) => (
                        <Card key={i} className="glass-card border-border/50 bg-card/40 rounded-[2rem] p-6 group hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm font-black uppercase italic tracking-tight text-foreground/90">{campaign.name}</p>
                                    <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-1">{campaign.type}</p>
                                </div>
                                <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest rounded-lg", campaign.bg, campaign.color, campaign.border)}>
                                    {campaign.status}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-muted/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Enviados</p>
                                    <p className="text-lg font-black text-foreground">{campaign.sent.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-muted/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Abiertos</p>
                                    <p className="text-lg font-black text-foreground">{campaign.opened.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-muted/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Clicks</p>
                                    <p className="text-lg font-black text-foreground">{campaign.clicks.toLocaleString()}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-muted/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Conversión</p>
                                    <p className={cn("text-lg font-black", campaign.conversion !== "—" ? "text-emerald-400" : "text-muted-foreground/30")}>{campaign.conversion}</p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-9 rounded-xl text-[9px] font-black uppercase tracking-widest"
                                onClick={() => toast({ title: campaign.name, description: `Abriendo detalles de la campaña "${campaign.name}"` })}
                            >
                                Ver Detalles
                            </Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Redes Sociales */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <Target className="h-3.5 w-3.5" /> Rendimiento en Redes Sociales
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { platform: "Instagram", followers: "12.4K", growth: "+8.2%", engagement: "4.7%", color: "text-pink-400", bg: "bg-pink-400/10" },
                        { platform: "LinkedIn", followers: "5.8K", growth: "+12.1%", engagement: "6.2%", color: "text-blue-400", bg: "bg-blue-400/10" },
                        { platform: "X (Twitter)", followers: "3.2K", growth: "+3.5%", engagement: "2.1%", color: "text-foreground", bg: "bg-foreground/10" },
                        { platform: "TikTok", followers: "8.9K", growth: "+22.4%", engagement: "8.9%", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                    ].map((social, i) => (
                        <Card key={i} className="glass-card border-border/50 bg-card/40 rounded-[2rem] p-5 text-center group hover:border-primary/30 transition-all">
                            <div className={cn("mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-3", social.bg)}>
                                <Megaphone className={cn("h-4 w-4", social.color)} />
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">{social.platform}</p>
                            <p className="text-2xl font-black text-foreground mb-1">{social.followers}</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-[9px] font-bold text-emerald-400">{social.growth}</span>
                                <span className="text-[8px] text-muted-foreground/30">·</span>
                                <span className="text-[9px] font-bold text-muted-foreground/60">Eng: {social.engagement}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* SEO & ROI */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
                    <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary italic flex items-center gap-2">
                        <BarChart3 className="h-3.5 w-3.5" /> ROI de Marketing & SEO
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-border/50 bg-card/40 rounded-[2rem] p-6">
                        <h3 className="text-sm font-black uppercase italic tracking-tight text-foreground/90 mb-4">Retorno de Inversión</h3>
                        <div className="space-y-3">
                            {[
                                { channel: "Email Marketing", invested: "$450", revenue: "$3,200", roi: "611%", color: "text-emerald-400" },
                                { channel: "Redes Sociales", invested: "$1,200", revenue: "$4,800", roi: "300%", color: "text-blue-400" },
                                { channel: "Google Ads", invested: "$800", revenue: "$2,100", roi: "163%", color: "text-amber-400" },
                                { channel: "WhatsApp Business", invested: "$150", revenue: "$1,400", roi: "833%", color: "text-emerald-400" },
                            ].map((ch, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/10">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-foreground/80">{ch.channel}</p>
                                        <p className="text-[8px] text-muted-foreground/40">Invertido: {ch.invested} · Retorno: {ch.revenue}</p>
                                    </div>
                                    <span className={cn("text-sm font-black", ch.color)}>{ch.roi}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-card border-border/50 bg-card/40 rounded-[2rem] p-6">
                        <h3 className="text-sm font-black uppercase italic tracking-tight text-foreground/90 mb-4">SEO & Tráfico Web</h3>
                        <div className="space-y-3">
                            {[
                                { metric: "Visitas Mensuales", value: "24,580", change: "+18%", positive: true },
                                { metric: "Posición Google (promedio)", value: "#4.2", change: "+2 pos", positive: true },
                                { metric: "Palabras Clave Rankeadas", value: "156", change: "+23", positive: true },
                                { metric: "Tasa de Rebote", value: "32%", change: "-5%", positive: true },
                                { metric: "Tiempo en Sitio", value: "4:32 min", change: "+0:45", positive: true },
                                { metric: "Leads Generados", value: "342", change: "+67", positive: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/10">
                                    <span className="text-[10px] text-muted-foreground">{item.metric}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-foreground">{item.value}</span>
                                        <span className={cn("text-[9px] font-bold", item.positive ? "text-emerald-400" : "text-rose-400")}>
                                            {item.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            {/* Aviso Legal */}
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Aviso de Riesgo</p>
                    <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tight leading-relaxed">
                        Las alertas e indicadores presentados son de carácter informativo y no constituyen asesoría financiera formal. 
                        Las inversiones en bolsa, bienes raíces y créditos implican riesgo de pérdida de capital. 
                        Consulte siempre a un asesor financiero certificado antes de tomar decisiones de inversión.
                    </p>
                </div>
            </div>
        </div>
    );
}
