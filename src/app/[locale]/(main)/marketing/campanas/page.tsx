"use client";

import React from "react";
import { Target, Plus, Users, TrendingUp, Eye, BarChart3, DollarSign, CheckCircle, Clock, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const campanas = [
  {
    id: "CMP-001",
    nombre: "Black Friday Venezuela 2026",
    tipo: "Multi-canal",
    canales: ["Email", "SMS", "WhatsApp", "Redes Sociales"],
    estado: "activa",
    fechaInicio: "20/11/2026",
    fechaFin: "30/11/2026",
    presupuesto: "USD 2,500",
    gastado: "USD 1,890",
    alcance: 45200,
    impresiones: 128400,
    clicks: 8760,
    conversiones: 342,
    tasaConversion: "3.9%",
    roi: "+245%",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "CMP-002",
    nombre: "Lanzamiento Plan Empresarial 5G",
    tipo: "Digital",
    canales: ["Redes Sociales", "Google Ads", "Email"],
    estado: "activa",
    fechaInicio: "01/04/2026",
    fechaFin: "30/04/2026",
    presupuesto: "USD 5,000",
    gastado: "USD 1,200",
    alcance: 22100,
    impresiones: 67800,
    clicks: 4520,
    conversiones: 89,
    tasaConversion: "2.0%",
    roi: "+120%",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "CMP-003",
    nombre: "Retención Clientes Q1 2026",
    tipo: "Automatizada",
    canales: ["WhatsApp", "Email"],
    estado: "completada",
    fechaInicio: "01/01/2026",
    fechaFin: "31/03/2026",
    presupuesto: "USD 800",
    gastado: "USD 780",
    alcance: 12300,
    impresiones: 34500,
    clicks: 3420,
    conversiones: 298,
    tasaConversion: "8.7%",
    roi: "+380%",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: "CMP-004",
    nombre: "Día de las Madres — Promo Especial",
    tipo: "Email + SMS",
    canales: ["Email", "SMS"],
    estado: "programada",
    fechaInicio: "01/05/2026",
    fechaFin: "10/05/2026",
    presupuesto: "USD 1,200",
    gastado: "USD 0",
    alcance: 0,
    impresiones: 0,
    clicks: 0,
    conversiones: 0,
    tasaConversion: "—",
    roi: "—",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  activa: { label: "Activa", badge: "bg-emerald-500/10 text-emerald-500", icon: <Play className="h-3 w-3" /> },
  completada: { label: "Completada", badge: "bg-primary/10 text-primary", icon: <CheckCircle className="h-3 w-3" /> },
  programada: { label: "Programada", badge: "bg-amber-500/10 text-amber-500", icon: <Clock className="h-3 w-3" /> },
  pausada: { label: "Pausada", badge: "bg-rose-500/10 text-rose-500", icon: <Pause className="h-3 w-3" /> },
};

export default function CampanasPage() {

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Target className="h-3 w-3" /> CAMPAÑAS MARKETING
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Gestión de <span className="text-primary italic">Campañas</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Multi-canal • Automatización IA • ROI en Tiempo Real • A/B Testing
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
          <Plus className="h-4 w-4" /> NUEVA CAMPAÑA
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Campañas Activas", val: campanas.filter(c => c.estado === "activa").length.toString(), icon: Target, color: "text-primary" },
          { label: "Alcance Total", val: "79.6K", icon: Users, color: "text-emerald-500" },
          { label: "Conversiones", val: "729", icon: TrendingUp, color: "text-cyan-500" },
          { label: "ROI Promedio", val: "+248%", icon: DollarSign, color: "text-amber-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-5">
        {campanas.map((camp, i) => {
          const est = estadoConfig[camp.estado];
          return (
            <motion.div key={camp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="rounded-2xl overflow-hidden">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-muted-foreground">{camp.id}</span>
                        <Badge className={cn("text-[8px] font-bold gap-1", est.badge)}>{est.icon} {est.label}</Badge>
                        <Badge className={cn("text-[8px] font-bold", camp.bg, camp.color)}>{camp.tipo}</Badge>
                      </div>
                      <CardTitle className="text-sm font-bold">{camp.nombre}</CardTitle>
                      <div className="flex gap-2 mt-1.5">
                        {camp.canales.map(c => (
                          <span key={c} className="text-[8px] font-bold uppercase bg-muted/50 px-2 py-0.5 rounded">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground">
                      <p>{camp.fechaInicio} — {camp.fechaFin}</p>
                      <p className="font-bold">{camp.presupuesto}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {[
                      { label: "Alcance", val: camp.alcance.toLocaleString() },
                      { label: "Impresiones", val: camp.impresiones.toLocaleString() },
                      { label: "Clicks", val: camp.clicks.toLocaleString() },
                      { label: "Conversiones", val: camp.conversiones.toLocaleString() },
                      { label: "ROI", val: camp.roi },
                    ].map((m, j) => (
                      <div key={j} className="p-3 rounded-lg bg-muted/20 border border-border/30 text-center">
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{m.label}</p>
                        <p className="text-sm font-bold">{m.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                      <BarChart3 className="h-3 w-3" /> Analítica
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                      <Eye className="h-3 w-3" /> Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
