"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Zap, TrendingUp, Target, BrainCircuit, ArrowRight, Star, RefreshCw,
  ChartBar as BarChart3, Users, DollarSign, Inbox, Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Estrategia {
  id: number;
  titulo: string;
  descripcion: string | null;
  impacto: string;
  plazo: string | null;
  icono: string | null;
  activa: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign, Star, Users, BrainCircuit, Target, TrendingUp, Zap,
};

const IMPACTO_COLOR: Record<string, string> = {
  Alto: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medio: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Crítico: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  Bajo: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const CARD_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  DollarSign: { color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/20" },
  Star:       { color: "text-amber-400",   bg: "from-amber-500/10 to-amber-500/5",     border: "border-amber-500/20" },
  Users:      { color: "text-blue-400",    bg: "from-blue-500/10 to-blue-500/5",       border: "border-blue-500/20" },
  BrainCircuit:{ color: "text-violet-400", bg: "from-violet-500/10 to-violet-500/5",   border: "border-violet-500/20" },
  Target:     { color: "text-rose-400",    bg: "from-rose-500/10 to-rose-500/5",       border: "border-rose-500/20" },
  TrendingUp: { color: "text-cyan-400",    bg: "from-cyan-500/10 to-cyan-500/5",       border: "border-cyan-500/20" },
  default:    { color: "text-primary",     bg: "from-primary/10 to-primary/5",         border: "border-primary/20" },
};

export default function EstrategiasVentasPage() {
  const { toast } = useToast();
  const [estrategias, setEstrategias] = useState<Estrategia[]>([]);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState<number | null>(null);
  const [totalIngresos, setTotalIngresos] = useState(0);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/estrategias-ventas').then(r => r.ok ? r.json() : { estrategias: [] }),
      fetch('/api/analisis/cash-flow').then(r => r.ok ? r.json() : { data: [] }),
    ]).then(([estData, cashData]) => {
      setEstrategias(estData.estrategias ?? []);
      const meses: Array<Record<string, unknown>> = cashData.data ?? [];
      setTotalIngresos(meses.reduce((s: number, m) => s + ((m.ingresos as number) || 0), 0));
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleActivar = async (estrategia: Estrategia) => {
    setActivating(estrategia.id);
    try {
      const res = await fetch('/api/estrategias-ventas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: estrategia.id, activa: !estrategia.activa }),
      });
      if (res.ok) {
        setEstrategias(prev => prev.map(e => e.id === estrategia.id ? { ...e, activa: !e.activa } : e));
        toast({
          title: estrategia.activa ? "ESTRATEGIA DESACTIVADA" : "ESTRATEGIA ACTIVADA",
          description: `${estrategia.titulo} — ${estrategia.activa ? "Se ha detenido la ejecución." : "En ejecución. Revisa analítica para seguimiento."}`,
        });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo actualizar la estrategia." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setActivating(null);
    }
  };

  const handleRegenerarIA = async () => {
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria: 'ventas', subcategoria: 'regenerar_estrategias_ia', descripcion: 'Regeneración de estrategias con IA' })
      });
      if (res.ok) toast({ title: "SOLICITUD REGISTRADA", description: "Regeneración de estrategias solicitada." });
      else toast({ title: "Error", variant: "destructive" });
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  const activas = estrategias.filter(e => e.activa).length;
  const altasYCriticas = estrategias.filter(e => e.impacto === 'Alto' || e.impacto === 'Crítico').length;

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Zap className="h-3 w-3" /> MOTOR ESTRATÉGICO
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">
            Estrategias <span className="text-primary italic">Comerciales</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">
            Optimización de Ventas 2026
          </p>
        </div>
        <Button
          variant="outline"
          className="h-12 px-6 rounded-xl text-[11px] font-semibold uppercase tracking-widest border-border bg-card/50"
          onClick={handleRegenerarIA}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> REGENERAR CON IA
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Estrategias", value: loading ? "—" : `${estrategias.length}`, icon: Target, color: "text-primary" },
          { label: "Ingresos Acumulados", value: loading ? "—" : (totalIngresos > 0 ? `Bs. ${totalIngresos.toLocaleString('es-VE', { maximumFractionDigits: 0 })}` : "Sin datos"), icon: TrendingUp, color: "text-emerald-400" },
          { label: "Activas", value: loading ? "—" : `${activas}`, icon: BarChart3, color: "text-blue-400" },
          { label: "Alto Impacto", value: loading ? "—" : `${altasYCriticas}`, icon: Zap, color: "text-amber-400" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="glass-card border-none bg-card/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">{kpi.label}</p>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <p className={`text-2xl font-bold tracking-tight ${kpi.color}`}>{kpi.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm">Cargando estrategias...</span>
        </div>
      ) : estrategias.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Inbox className="h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No hay estrategias configuradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estrategias.map((s, i) => {
            const style = CARD_STYLE[s.icono ?? ''] ?? CARD_STYLE.default;
            const Icon = ICON_MAP[s.icono ?? ''] ?? Zap;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className={`glass-card border-none bg-gradient-to-br h-full flex flex-col rounded-2xl overflow-hidden ${style.bg} border ${style.border} ${s.activa ? 'ring-1 ring-primary/30' : ''}`}>
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className={`p-2.5 rounded-xl bg-black/20 border border-white/5 ${style.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-[10px] font-semibold uppercase tracking-widest border ${IMPACTO_COLOR[s.impacto] ?? ""} h-6`}>
                          {s.impacto}
                        </Badge>
                        {s.activa && (
                          <Badge className="text-[10px] font-semibold uppercase tracking-widest bg-primary/20 text-primary border-primary/30 h-6">
                            ACTIVA
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-sm font-semibold uppercase tracking-tight text-foreground/90 mt-3">{s.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-[11px] text-muted-foreground/70 font-medium leading-relaxed">{s.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">{s.plazo ? `Plazo: ${s.plazo}` : ''}</p>
                      <Button
                        size="sm"
                        variant={s.activa ? "outline" : "default"}
                        className="h-8 px-4 rounded-xl text-[11px] font-semibold uppercase tracking-widest btn-3d-primary"
                        onClick={() => handleActivar(s)}
                        disabled={activating === s.id}
                      >
                        {activating === s.id ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <><ArrowRight className="mr-1.5 h-3 w-3" /> {s.activa ? 'DESACTIVAR' : 'ACTIVAR'}</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
