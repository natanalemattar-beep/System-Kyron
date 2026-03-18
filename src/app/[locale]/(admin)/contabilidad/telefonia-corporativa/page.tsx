"use client";

import React, { useState } from "react";
import { Phone, Users, TrendingUp, Activity, CheckCircle, Zap, Download, Clock, BarChart2, Building2, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const lineas = [
  { numero: "+58 412-111-0001", titular: "Gerencia General", tipo: "EJECUTIVO", minutos: 240, extension: "101", estado: "ACTIVA", plan: "Corp Total" },
  { numero: "+58 412-111-0002", titular: "Contabilidad", tipo: "CONTABLE", minutos: 180, extension: "102", estado: "ACTIVA", plan: "Corp Total" },
  { numero: "+58 412-111-0003", titular: "Ventas", tipo: "VENTAS", minutos: 420, extension: "103", estado: "ACTIVA", plan: "Profesional" },
  { numero: "+58 412-111-0004", titular: "RRHH", tipo: "ADMIN", minutos: 95, extension: "104", estado: "ACTIVA", plan: "Profesional" },
  { numero: "+58 412-111-0005", titular: "Logística", tipo: "OPERATIVO", minutos: 310, extension: "105", estado: "ACTIVA", plan: "Básico" },
  { numero: "+58 412-111-0006", titular: "Soporte Técnico", tipo: "SOPORTE", minutos: 0, extension: "106", estado: "SUSPENDIDA", plan: "Sin plan" },
];

const planesContables = [
  {
    nombre: "Básico Contable",
    precio: "Bs. 450/mes por línea",
    incluye: ["200 min nacionales", "50 min internacionales", "Extensión SIP", "Registro contable mensual"],
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    nombre: "Profesional Contable",
    precio: "Bs. 900/mes por línea",
    incluye: ["1.000 min nacionales", "200 min internacionales", "Extensión SIP + CRM", "Reportes contables automáticos", "IVA incluido"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    destacado: true,
  },
  {
    nombre: "Corporativo Total",
    precio: "Bs. 1.800/mes por línea",
    incluye: ["Minutos ilimitados", "Internacional incluido", "Extensión PBX completa", "Integración contable total", "WhatsApp Business API", "Soporte 24/7"],
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
];

export default function TelefoniaCorporativaPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-indigo-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-3">
            <Phone className="h-3 w-3" /> TELEFONÍA CORPORATIVA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            TELEFONÍA <span className="text-indigo-500 italic">CORPORATIVA</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Planes Contables Integrados • PBX • Extensiones • Reportes Automáticos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> REPORTE
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Phone className="h-4 w-4" /> AGREGAR LÍNEA
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Líneas Activas", val: "5 / 6", icon: Phone, color: "text-indigo-500" },
          { label: "Minutos Usados", val: "1.245 min", icon: Activity, color: "text-emerald-500" },
          { label: "Costo Mes Actual", val: "Bs. 5.400,00", icon: TrendingUp, color: "text-primary" },
          { label: "Extensiones PBX", val: "6 Activas", icon: Building2, color: "text-amber-500" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tighter text-foreground">{kpi.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/10 rounded-xl"><Globe className="h-5 w-5 text-indigo-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Planes Contables</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {planesContables.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-8 space-y-6 hover:shadow-xl transition-all", p.border, p.destacado && "ring-2 ring-emerald-500/30")}>
                {p.destacado && (
                  <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-4 py-1 uppercase tracking-widest w-fit">RECOMENDADO</Badge>
                )}
                <div>
                  <p className={cn("text-[11px] font-black uppercase italic tracking-tight", p.color)}>{p.nombre}</p>
                  <p className="text-xl font-black italic text-foreground mt-2">{p.precio}</p>
                </div>
                <div className="space-y-3">
                  {p.incluye.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className={cn("h-3.5 w-3.5 shrink-0", p.color)} />
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">{item}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className={cn("w-full h-10 rounded-xl font-black text-[9px] uppercase tracking-widest border", p.border, p.color)}>
                  SELECCIONAR
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Users className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Líneas Corporativas</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {lineas.map((l, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-xl", l.estado === "ACTIVA" ? "bg-indigo-500/10" : "bg-rose-500/10")}>
                    <Phone className={cn("h-4 w-4", l.estado === "ACTIVA" ? "text-indigo-500" : "text-rose-500")} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{l.numero}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{l.titular} · Ext. {l.extension}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-[9px] font-black text-muted-foreground uppercase">{l.minutos} min usados</p>
                    <p className="text-[8px] font-bold text-muted-foreground/60 uppercase">{l.plan}</p>
                  </div>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", l.estado === "ACTIVA" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600")}>
                    {l.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
