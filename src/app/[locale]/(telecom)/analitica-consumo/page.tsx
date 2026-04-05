"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, BrainCircuit, Wifi, Bell, Zap, Target, Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Linea {
  id: number;
  numero: string;
  plan: string;
  limite_gb: string | null;
  consumo_actual_gb: string | null;
  costo_mensual: string | null;
}

export default function AnaliticaConsumoPage() {
  const { toast } = useToast();
  const [linea, setLinea] = useState<Linea | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState<"semana" | "mes" | "trimestre">("mes");

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/telecom')
      .then(r => r.ok ? r.json() : { lineas: [] })
      .then(d => {
        const lineas: Linea[] = d.lineas ?? [];
        const personal = lineas.find(l => l.plan && !l.plan.toLowerCase().includes('empresa')) ?? lineas[0] ?? null;
        setLinea(personal);
      })
      .catch(() => setLinea(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const consumo = parseFloat(linea?.consumo_actual_gb ?? '0') || 0;
  const limite = parseFloat(linea?.limite_gb ?? '0') || 0;
  const pct = limite > 0 ? (consumo / limite) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Cargando datos de consumo...</span>
      </div>
    );
  }

  if (!linea) {
    return (
      <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
        <header className="pt-6 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Analítica de Consumo</h1>
        </header>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
          <Inbox className="h-12 w-12 opacity-30" />
          <p className="text-sm font-bold">Sin líneas registradas</p>
          <p className="text-xs text-center max-w-xs">Registra tu línea telefónica personal en Gestión de Flota para ver el análisis de consumo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Analítica de Consumo</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Análisis de consumo de la línea {linea.numero}.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Consumo Actual", val: `${consumo.toFixed(1)} GB`, icon: Wifi, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Límite del Plan", val: limite > 0 ? `${limite.toFixed(0)} GB` : "Sin límite", icon: Target, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Uso del Plan", val: `${pct.toFixed(1)}%`, icon: TrendingUp, color: pct >= 80 ? "text-rose-500" : "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Plan Activo", val: linea.plan ?? "N/A", icon: Zap, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight truncate", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {limite > 0 && (
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <CardTitle className="text-sm font-semibold text-foreground">Uso del Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">{consumo.toFixed(1)} GB usados</span>
              <span className="text-muted-foreground">{limite.toFixed(0)} GB total</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-3">
              <div
                className={cn("h-3 rounded-full transition-all", pct >= 90 ? "bg-rose-500" : pct >= 70 ? "bg-amber-500" : "bg-primary")}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{(limite - consumo).toFixed(1)} GB restantes en el plan</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg"><BrainCircuit className="h-4 w-4 text-cyan-500" /></div>
            <CardTitle className="text-sm font-semibold text-foreground">Información del Plan</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-3.5 w-3.5 text-cyan-500" />
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">Detalles de la Línea</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número</span>
                <span className="font-bold">{linea.numero}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-bold">{linea.plan}</span>
              </div>
              {linea.costo_mensual && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo mensual</span>
                  <span className="font-bold text-primary">${parseFloat(linea.costo_mensual).toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => toast({ title: "Alertas configuradas", description: "Las notificaciones de consumo están activas." })}>
            <Bell className="mr-2 h-3 w-3" /> Configurar Alertas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
