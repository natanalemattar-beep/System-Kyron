"use client";

import React from "react";
import { Globe, Users, Heart, Share2, Eye, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const redes = [
  {
    nombre: "Instagram",
    handle: "@systemkyron",
    seguidores: 12400,
    crecimiento: "+8.2%",
    alcance: 45600,
    engagement: "4.8%",
    publicaciones: 24,
    mejorPost: "Lanzamiento Plan 5G",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    nombre: "LinkedIn",
    handle: "System Kyron Corp",
    seguidores: 8900,
    crecimiento: "+12.4%",
    alcance: 34200,
    engagement: "6.2%",
    publicaciones: 18,
    mejorPost: "Caso de Éxito: Constructora Bolívar",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
  {
    nombre: "Facebook",
    handle: "System Kyron",
    seguidores: 15200,
    crecimiento: "+3.1%",
    alcance: 28900,
    engagement: "2.4%",
    publicaciones: 30,
    mejorPost: "Promoción Black Friday",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    nombre: "X (Twitter)",
    handle: "@kyron_ve",
    seguidores: 5600,
    crecimiento: "+5.7%",
    alcance: 18400,
    engagement: "3.1%",
    publicaciones: 45,
    mejorPost: "Hilo: Cumplimiento SENIAT",
    color: "text-foreground",
    bg: "bg-foreground/10",
    border: "border-foreground/20",
  },
  {
    nombre: "TikTok",
    handle: "@systemkyron",
    seguidores: 3200,
    crecimiento: "+22.8%",
    alcance: 89000,
    engagement: "8.4%",
    publicaciones: 12,
    mejorPost: "Tips Fiscales en 60s",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    nombre: "YouTube",
    handle: "System Kyron",
    seguidores: 2100,
    crecimiento: "+15.3%",
    alcance: 12300,
    engagement: "5.6%",
    publicaciones: 8,
    mejorPost: "Tutorial: Facturación SENIAT",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
];

export default function RedesSocialesPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Globe className="h-3 w-3" /> SOCIAL MEDIA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Redes <span className="text-primary italic">Sociales</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Multi-plataforma • Analítica • Engagement • Publicaciones IA • Calendario
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
          <Calendar className="h-4 w-4" /> PROGRAMAR POST
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Seguidores Total", val: `${(redes.reduce((s, r) => s + r.seguidores, 0) / 1000).toFixed(1)}K`, icon: Users, color: "text-primary" },
          { label: "Alcance Mensual", val: `${(redes.reduce((s, r) => s + r.alcance, 0) / 1000).toFixed(0)}K`, icon: Eye, color: "text-emerald-500" },
          { label: "Engagement Prom.", val: `${(redes.reduce((s, r) => s + parseFloat(r.engagement), 0) / redes.length).toFixed(1)}%`, icon: Heart, color: "text-rose-500" },
          { label: "Publicaciones/Mes", val: redes.reduce((s, r) => s + r.publicaciones, 0).toString(), icon: Share2, color: "text-cyan-500" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {redes.map((red, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className={cn("rounded-2xl overflow-hidden border", red.border)}>
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-sm font-bold", red.color)}>{red.nombre}</CardTitle>
                    <p className="text-[10px] text-muted-foreground">{red.handle}</p>
                  </div>
                  <Badge className={cn("text-[9px] font-bold", "bg-emerald-500/10 text-emerald-500")}>{red.crecimiento}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Seguidores</p>
                    <p className={cn("text-lg font-black", red.color)}>{red.seguidores.toLocaleString()}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Alcance</p>
                    <p className="text-lg font-black">{(red.alcance / 1000).toFixed(1)}K</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">Engagement</span>
                  <span className={cn("text-xs font-bold", red.color)}>{red.engagement}</span>
                </div>
                <Progress value={parseFloat(red.engagement) * 10} className="h-1.5" />
                <div className="p-2.5 rounded-lg bg-muted/10 border border-border/30">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Mejor Post</p>
                  <p className="text-[11px] font-medium">{red.mejorPost}</p>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">{red.publicaciones} publicaciones este mes</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
