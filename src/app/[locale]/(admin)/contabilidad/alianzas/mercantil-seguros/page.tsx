"use client";

import React from "react";
import { Shield, Building2, FileText, CheckCircle, TrendingUp, Clock, Download, Activity, Users, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const polizas = [
  {
    numero: "MRC-2026-001",
    tipo: "Responsabilidad Civil",
    cobertura: "Bs. 500.000,00",
    prima: "Bs. 2.400/año",
    vencimiento: "15/12/2026",
    estado: "VIGENTE",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
  {
    numero: "MRC-2026-002",
    tipo: "Activos y Bienes",
    cobertura: "Bs. 1.200.000,00",
    prima: "Bs. 5.800/año",
    vencimiento: "15/12/2026",
    estado: "VIGENTE",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
  {
    numero: "MRC-2026-003",
    tipo: "Riesgo Laboral",
    cobertura: "Bs. 200.000,00",
    prima: "Bs. 1.200/año",
    vencimiento: "30/06/2026",
    estado: "PRÓXIMO A VENCER",
    color: "text-amber-600",
    bg: "bg-amber-600/10",
    border: "border-amber-600/20",
  },
  {
    numero: "MRC-2026-004",
    tipo: "Seguro de Salud Colectivo",
    cobertura: "Bs. 800.000,00",
    prima: "Bs. 18.000/año",
    vencimiento: "31/12/2026",
    estado: "VIGENTE",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
];

export default function MercantilSegurosPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-blue-600 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border border-blue-600/20 text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
            <Shield className="h-3 w-3" /> ALIANZA ESTRATÉGICA • SEGUROS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            MERCANTIL <span className="text-blue-600 italic">SEGUROS</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Responsabilidad Civil • Activos • Riesgo Laboral • Salud Colectiva
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> PÓLIZAS PDF
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Shield className="h-4 w-4" /> NUEVA PÓLIZA
          </Button>
        </div>
      </header>

      <div className="p-6 rounded-2xl border border-blue-600/20 bg-blue-600/5 flex items-start gap-5">
        <div className="p-3 bg-blue-600/10 rounded-xl shrink-0">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-blue-600 tracking-widest mb-1">Alianza Mercantil Seguros – Protección Patrimonial Empresarial</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            A través de nuestra alianza con Mercantil Seguros, accedes a pólizas empresariales de responsabilidad civil, protección de activos y bienes, riesgo laboral y salud colectiva. Todas las primas y coberturas se gestionan e integran directamente en el módulo contable de la empresa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Pólizas Activas", val: "4 Vigentes", icon: Shield, color: "text-blue-600" },
          { label: "Cobertura Total", val: "Bs. 2.700.000", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Prima Anual", val: "Bs. 27.400,00", icon: FileText, color: "text-primary" },
          { label: "Próx. Vencimiento", val: "30/06/2026", icon: Clock, color: "text-amber-500" },
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
          <div className="p-2 bg-blue-600/10 rounded-xl"><Shield className="h-5 w-5 text-blue-600" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Pólizas Contratadas</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {polizas.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all", p.border)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.numero}</p>
                    <p className={cn("text-sm font-black uppercase italic tracking-tight mt-1", p.color)}>{p.tipo}</p>
                  </div>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", p.estado === "VIGENTE" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600")}>
                    {p.estado}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] font-black uppercase text-muted-foreground/60">Cobertura</p>
                    <p className="text-[11px] font-black text-foreground italic mt-0.5">{p.cobertura}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-muted-foreground/60">Prima</p>
                    <p className={cn("text-[11px] font-black italic mt-0.5", p.color)}>{p.prima}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-muted-foreground/60" />
                    <p className="text-[8px] font-black uppercase text-muted-foreground/60">Vence: {p.vencimiento}</p>
                  </div>
                  {p.estado !== "VIGENTE" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
