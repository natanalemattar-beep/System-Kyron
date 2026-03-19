"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Target, BrainCircuit, ArrowRight, Star, RefreshCw, ChartBar as BarChart3, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const strategies = [
    {
        id: 1,
        titulo: "Aumento de Ticket Promedio",
        descripcion: "Implementar upselling y cross-selling en el punto de venta para incrementar el ticket medio por cliente en un 25-30%.",
        impacto: "Alto",
        plazo: "1-2 meses",
        roi: "+28%",
        icon: DollarSign,
        color: "text-emerald-400",
        bg: "from-emerald-500/10 to-emerald-500/5",
        border: "border-emerald-500/20",
    },
    {
        id: 2,
        titulo: "Programa de Fidelización VIP",
        descripcion: "Crear un club de clientes frecuentes con beneficios escalonados. Clientes fidelizados generan 3x más ingresos que nuevos clientes.",
        impacto: "Alto",
        plazo: "2-3 meses",
        roi: "+42%",
        icon: Star,
        color: "text-amber-400",
        bg: "from-amber-500/10 to-amber-500/5",
        border: "border-amber-500/20",
    },
    {
        id: 3,
        titulo: "Expansión Digital WhatsApp",
        descripcion: "Canal de ventas automatizado vía WhatsApp Business con catálogo digital y pagos móviles integrados.",
        impacto: "Medio",
        plazo: "2-4 semanas",
        roi: "+18%",
        icon: Users,
        color: "text-blue-400",
        bg: "from-blue-500/10 to-blue-500/5",
        border: "border-blue-500/20",
    },
    {
        id: 4,
        titulo: "Optimización de Precios IA",
        descripcion: "Análisis dinámico de precios basado en demanda, competencia y margen objetivo. Incrementa rentabilidad sin perder volumen.",
        impacto: "Alto",
        plazo: "3-6 semanas",
        roi: "+35%",
        icon: BrainCircuit,
        color: "text-violet-400",
        bg: "from-violet-500/10 to-violet-500/5",
        border: "border-violet-500/20",
    },
    {
        id: 5,
        titulo: "Gestión de Cobranza Proactiva",
        descripcion: "Sistema de recordatorios automáticos y gestión de cuentas por cobrar para reducir cartera vencida y mejorar flujo de caja.",
        impacto: "Crítico",
        plazo: "Inmediato",
        roi: "+22%",
        icon: Target,
        color: "text-rose-400",
        bg: "from-rose-500/10 to-rose-500/5",
        border: "border-rose-500/20",
    },
    {
        id: 6,
        titulo: "Análisis de Estacionalidad",
        descripcion: "Identificar picos y valles de demanda para planificar stock, personal y campañas en momentos de mayor rentabilidad.",
        impacto: "Medio",
        plazo: "Permanente",
        roi: "+15%",
        icon: TrendingUp,
        color: "text-cyan-400",
        bg: "from-cyan-500/10 to-cyan-500/5",
        border: "border-cyan-500/20",
    },
];

const impactoColor: Record<string, string> = {
    "Alto": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Medio": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Crítico": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function EstrategiasVentasPage() {
    const { toast } = useToast();
    const [activating, setActivating] = useState<number | null>(null);

    const handleActivar = async (id: number, titulo: string) => {
        setActivating(id);
        await new Promise(r => setTimeout(r, 1200));
        setActivating(null);
        toast({
            title: "✔ ESTRATEGIA ACTIVADA",
            description: `${titulo} — En ejecución. Revisa el módulo de analítica para seguimiento.`,
        });
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                        <Zap className="h-3 w-3" /> MOTOR ESTRATÉGICO IA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                        Estrategias <span className="text-primary italic">Comerciales</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                        Inteligencia Artificial • Optimización de Ventas 2026
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50"
                    onClick={() => toast({ title: "ANÁLISIS ACTUALIZADO", description: "Estrategias regeneradas con datos en tiempo real." })}
                >
                    <RefreshCw className="mr-2 h-4 w-4" /> REGENERAR CON IA
                </Button>
            </motion.header>

            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Estrategias Activas", value: "6", icon: Target, color: "text-primary" },
                    { label: "ROI Promedio", value: "+27%", icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Tiempo Retorno", value: "6 sem.", icon: BarChart3, color: "text-blue-400" },
                    { label: "Impacto Global", value: "Alto", icon: Zap, color: "text-amber-400" },
                ].map((kpi, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Card className="glass-card border-none bg-card/40 p-4 rounded-2xl">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</p>
                                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                            </div>
                            <p className={`text-2xl font-black italic tracking-tighter ${kpi.color}`}>{kpi.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Strategy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategies.map((s, i) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Card className={`glass-card border-none bg-gradient-to-br h-full flex flex-col rounded-2xl overflow-hidden ${s.bg} border ${s.border}`}>
                            <CardHeader className="p-6 pb-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${s.color}`}>
                                        <s.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className={`text-[8px] font-black uppercase tracking-widest border ${impactoColor[s.impacto] ?? ""} h-6`}>
                                            {s.impacto}
                                        </Badge>
                                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 border-border/40">
                                            {s.roi}
                                        </Badge>
                                    </div>
                                </div>
                                <CardTitle className="text-sm font-black uppercase tracking-tight text-foreground/90 mt-3">{s.titulo}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between gap-4">
                                <p className="text-[11px] text-muted-foreground/70 font-medium leading-relaxed">{s.descripcion}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Plazo: {s.plazo}</p>
                                    <Button
                                        size="sm"
                                        className="h-8 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest btn-3d-primary"
                                        onClick={() => handleActivar(s.id, s.titulo)}
                                        disabled={activating === s.id}
                                    >
                                        {activating === s.id ? (
                                            <RefreshCw className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <><ArrowRight className="mr-1.5 h-3 w-3" /> ACTIVAR</>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
