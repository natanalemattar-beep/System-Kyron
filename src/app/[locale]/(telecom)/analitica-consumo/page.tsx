"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, TrendingUp, BrainCircuit, Wifi, Bell,
  Zap, Target, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const CONSUMO_MENSUAL = [
  { mes: "Oct", gb: 12.3 }, { mes: "Nov", gb: 15.1 }, { mes: "Dic", gb: 18.7 },
  { mes: "Ene", gb: 14.2 }, { mes: "Feb", gb: 16.8 }, { mes: "Mar", gb: 15.0 },
];

const CONSUMO_POR_APP = [
  { app: "YouTube", gb: 5.2, pct: 35, color: "bg-red-500", trend: "+12%" },
  { app: "Instagram", gb: 2.8, pct: 19, color: "bg-pink-500", trend: "+5%" },
  { app: "Chrome", gb: 2.5, pct: 17, color: "bg-blue-500", trend: "-3%" },
  { app: "WhatsApp", gb: 1.9, pct: 13, color: "bg-emerald-500", trend: "+2%" },
  { app: "Spotify", gb: 1.4, pct: 9, color: "bg-green-500", trend: "0%" },
  { app: "Otros", gb: 1.2, pct: 7, color: "bg-gray-400", trend: "-1%" },
];

const PREDICCION_IA = {
  consumoEstimado: 16.5,
  limiteActual: 30,
  fechaAgotamiento: "No se agotará este ciclo",
  recomendacion: "Tu consumo se mantiene estable. A este ritmo usarás ~16.5 GB este mes, bien dentro de tu límite de 30 GB.",
  ahorroPotencial: "$5.00",
  planOptimo: "Plan Global 40GB → Plan Conecta 20GB (ahorro de $10/mes)",
};

const UMBRALES_NOTIFICACION = [
  { nombre: "50% del plan consumido", activo: true, tipo: "consumo" },
  { nombre: "80% del plan consumido", activo: true, tipo: "consumo" },
  { nombre: "95% del plan consumido", activo: true, tipo: "consumo" },
  { nombre: "3 días antes del vencimiento", activo: true, tipo: "vencimiento" },
  { nombre: "Nueva promoción disponible", activo: false, tipo: "promocion" },
  { nombre: "Velocidad degradada detectada", activo: true, tipo: "calidad" },
];

export default function AnaliticaConsumoPage() {
  const { toast } = useToast();
  const maxMes = Math.max(...CONSUMO_MENSUAL.map(m => m.gb));
  const [periodo, setPeriodo] = useState<"semana" | "mes" | "trimestre">("mes");

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Analítica de Consumo</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Historial detallado con gráficos interactivos y predicción de uso mediante IA.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Consumo Mes", val: "15.0 GB", icon: Wifi, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Predicción IA", val: "16.5 GB", icon: BrainCircuit, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Tendencia", val: "+8.2%", icon: TrendingUp, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Ahorro Potencial", val: "$5.00", icon: Target, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><BarChart3 className="h-4 w-4 text-primary" /></div>
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Historial de Consumo</CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground">Últimos 6 meses</CardDescription>
                </div>
              </div>
              <div className="flex gap-1">
                {(["semana", "mes", "trimestre"] as const).map(p => (
                  <Button key={p} variant={periodo === p ? "default" : "outline"} size="sm" className="h-6 px-2 rounded text-[9px]"
                    onClick={() => setPeriodo(p)}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-3 h-44">
              {CONSUMO_MENSUAL.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-foreground tabular-nums">{m.gb}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.gb / maxMes) * 100}%` }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className={cn("w-full rounded-t-lg min-h-[4px]", i === CONSUMO_MENSUAL.length - 1 ? "bg-primary" : "bg-primary/30")}
                  />
                  <span className="text-[9px] font-semibold text-muted-foreground">{m.mes}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg"><BrainCircuit className="h-4 w-4 text-cyan-500" /></div>
              <CardTitle className="text-sm font-semibold text-foreground">Predicción IA</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">Análisis Predictivo</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{PREDICCION_IA.recomendacion}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded-lg bg-muted/10 text-xs">
                <span className="text-muted-foreground">Consumo estimado</span>
                <span className="font-bold text-foreground">{PREDICCION_IA.consumoEstimado} GB</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-muted/10 text-xs">
                <span className="text-muted-foreground">Límite del plan</span>
                <span className="font-bold text-foreground">{PREDICCION_IA.limiteActual} GB</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-muted/10 text-xs">
                <span className="text-muted-foreground">Agotamiento</span>
                <span className="font-bold text-emerald-500">{PREDICCION_IA.fechaAgotamiento}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-bold text-amber-500">Recomendación</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{PREDICCION_IA.planOptimo}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <CardTitle className="text-sm font-semibold text-foreground">Consumo por Aplicación</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          {CONSUMO_POR_APP.map((app, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">{app.app}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground tabular-nums">{app.gb} GB ({app.pct}%)</span>
                  <Badge variant="outline" className={cn("text-[8px] px-1", app.trend.startsWith('+') ? "text-rose-500 border-rose-500/20" : app.trend.startsWith('-') ? "text-emerald-500 border-emerald-500/20" : "text-muted-foreground border-border")}>
                    {app.trend}
                  </Badge>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${app.pct}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className={cn("h-full rounded-full", app.color)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg"><Bell className="h-4 w-4 text-amber-500" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Notificaciones Configurables</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Alertas por umbrales de consumo, vencimiento y promociones</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px]"
              onClick={() => toast({ title: "Configuración guardada", description: "Tus preferencias de notificación han sido actualizadas." })}>
              <Settings className="mr-1.5 h-3 w-3" /> Guardar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-2">
          {UMBRALES_NOTIFICACION.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30">
              <div className="flex items-center gap-3">
                <Bell className={cn("h-3.5 w-3.5", u.activo ? "text-primary" : "text-muted-foreground")} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{u.nombre}</p>
                  <p className="text-[9px] text-muted-foreground capitalize">{u.tipo}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("text-[9px]", u.activo ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-muted-foreground border-border")}>
                {u.activo ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
