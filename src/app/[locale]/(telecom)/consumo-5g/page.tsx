"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gauge, Wifi, Signal, Activity, TrendingUp, Zap,
  ArrowUp, ArrowDown, Clock, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CONSUMO_DIARIO = [
  { dia: "Lun", gb: 1.2 }, { dia: "Mar", gb: 0.8 }, { dia: "Mié", gb: 2.1 },
  { dia: "Jue", gb: 1.5 }, { dia: "Vie", gb: 3.2 }, { dia: "Sáb", gb: 4.1 }, { dia: "Dom", gb: 2.8 },
];

const APPS_CONSUMO = [
  { app: "YouTube", gb: 4.2, pct: 28, color: "bg-red-500" },
  { app: "WhatsApp", gb: 1.8, pct: 12, color: "bg-emerald-500" },
  { app: "Instagram", gb: 2.5, pct: 17, color: "bg-pink-500" },
  { app: "Spotify", gb: 1.2, pct: 8, color: "bg-green-500" },
  { app: "Chrome", gb: 3.1, pct: 21, color: "bg-blue-500" },
  { app: "Otros", gb: 2.2, pct: 14, color: "bg-gray-400" },
];

const SESIONES_5G = [
  { hora: "08:15", duracion: "45 min", velocidad: "1.2 Gbps", datos: "2.3 GB", tipo: "5G SA" },
  { hora: "12:30", duracion: "1h 20min", velocidad: "890 Mbps", datos: "4.1 GB", tipo: "5G NSA" },
  { hora: "16:45", duracion: "30 min", velocidad: "1.5 Gbps", datos: "1.8 GB", tipo: "5G SA" },
  { hora: "20:00", duracion: "2h 10min", velocidad: "750 Mbps", datos: "5.6 GB", tipo: "5G NSA" },
];

export default function Consumo5GPage() {
  const usoTotal = 15.0;
  const limite = 30;
  const pctUso = (usoTotal / limite) * 100;
  const maxDia = Math.max(...CONSUMO_DIARIO.map(d => d.gb));

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Consumo 5G</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Monitoreo en tiempo real de tu consumo de datos y conectividad 5G.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Datos Usados", val: `${usoTotal} / ${limite} GB`, icon: Wifi, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Velocidad Actual", val: "1.2 Gbps", icon: Zap, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Tipo de Red", val: "5G SA", icon: Signal, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Sesiones Hoy", val: "4", icon: Activity, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative group", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className={cn("h-3 w-3", stat.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Consumo Semanal</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Últimos 7 días</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-2 h-40">
              {CONSUMO_DIARIO.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-foreground tabular-nums">{d.gb}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.gb / maxDia) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={cn(
                      "w-full rounded-t-lg min-h-[4px]",
                      d.gb === maxDia ? "bg-primary" : "bg-primary/30"
                    )}
                  />
                  <span className="text-[9px] font-semibold text-muted-foreground">{d.dia}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <CardTitle className="text-sm font-semibold text-foreground">Medidor de Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${(pctUso / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-foreground">{pctUso.toFixed(0)}%</span>
                <span className="text-[10px] text-muted-foreground">consumido</span>
              </div>
            </div>
            <div className="mt-4 text-center space-y-1">
              <p className="text-sm font-bold text-foreground">{usoTotal} GB de {limite} GB</p>
              <p className="text-[10px] text-muted-foreground">Renueva el 01/04/2026</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold text-foreground">Consumo por App</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {APPS_CONSUMO.map((app, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{app.app}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{app.gb} GB ({app.pct}%)</span>
                </div>
                <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${app.pct}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={cn("h-full rounded-full", app.color)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <CardTitle className="text-sm font-semibold text-foreground">Sesiones 5G Recientes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {SESIONES_5G.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground tabular-nums">{s.hora}</p>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-emerald-500/20 bg-emerald-500/10 text-emerald-500">{s.tipo}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{s.duracion} · {s.datos}</p>
                </div>
                <div className="flex items-center gap-1.5 text-right">
                  <ArrowDown className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500 tabular-nums">{s.velocidad}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
