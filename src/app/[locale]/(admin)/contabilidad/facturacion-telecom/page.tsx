"use client";

import React, { useState } from "react";
import { Wifi, Receipt, Phone, Globe, Zap, TrendingUp, Clock, CheckCircle, Download, Users, Activity, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const planes = [
  {
    nombre: "Básico Empresarial",
    precio: "Bs. 1.200/mes",
    internet: "100 Mbps",
    llamadas: "500 min",
    sms: "Ilimitado",
    facturas: "50/mes",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    activo: false,
  },
  {
    nombre: "Profesional",
    precio: "Bs. 2.800/mes",
    internet: "500 Mbps",
    llamadas: "2.000 min",
    sms: "Ilimitado",
    facturas: "500/mes",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    activo: true,
    destacado: true,
  },
  {
    nombre: "Corporativo Total",
    precio: "Bs. 5.500/mes",
    internet: "Ilimitado ∞",
    llamadas: "Ilimitado ∞",
    sms: "Ilimitado",
    facturas: "Ilimitado ∞",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    activo: false,
  },
];

const facturasRecientes = [
  { numero: "FAC-2026-4421", cliente: "Distribuidora El Sol C.A.", monto: "Bs. 8.450,00", fecha: "18/03/2026", estado: "EMITIDA", tipo: "SERVICIO" },
  { numero: "FAC-2026-4420", cliente: "Tech Solutions S.A.", monto: "Bs. 3.200,00", fecha: "17/03/2026", estado: "COBRADA", tipo: "TELECOM" },
  { numero: "FAC-2026-4419", cliente: "Grupo Comercial Pérez", monto: "Bs. 12.000,00", fecha: "17/03/2026", estado: "COBRADA", tipo: "SERVICIO" },
  { numero: "FAC-2026-4418", cliente: "Farmacia San José C.A.", monto: "Bs. 1.800,00", fecha: "16/03/2026", estado: "PENDIENTE", tipo: "INTERNET" },
];

export default function FacturacionTelecomPage() {
  const { toast } = useToast();

  const emitirFactura = () => {
    toast({ title: "FACTURA EMITIDA", description: "FAC-2026-4422 generada y enviada al cliente por WhatsApp y correo." });
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-cyan-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-3">
            <Wifi className="h-3 w-3" /> SISTEMA DE FACTURACIÓN + TELECOM
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            FACTURACIÓN <span className="text-cyan-500 italic">ILIMITADA</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Integrado con Línea Telefónica • Internet Ilimitado según Mensualidad
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-cyan-600 hover:bg-cyan-700 text-white" onClick={emitirFactura}>
            <Receipt className="h-4 w-4" /> EMITIR FACTURA
          </Button>
        </div>
      </header>

      <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 flex items-start gap-5">
        <div className="p-3 bg-cyan-500/10 rounded-xl shrink-0">
          <Globe className="h-6 w-6 text-cyan-500" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-cyan-500 tracking-widest mb-1">Alianza Línea Telefónica – Internet Integrado</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            En alianza con nuestra línea telefónica corporativa, el sistema de facturación opera con internet ilimitado incluido en la mensualidad. Emite, gestiona y envía facturas sin límite de volumen, directamente desde la plataforma.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Facturas Este Mes", val: "342 Emitidas", icon: Receipt, color: "text-cyan-500" },
          { label: "Monto Facturado", val: "Bs. 289.430,00", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Cobradas", val: "94.5%", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Plan Activo", val: "Profesional", icon: Wifi, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tight text-foreground">{kpi.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-xl"><Wifi className="h-5 w-5 text-cyan-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Planes Disponibles</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {planes.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-8 space-y-6 hover:shadow-xl transition-all relative", p.border, p.activo && "ring-2 ring-emerald-500/40")}>
                {p.activo && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black px-4 py-1 uppercase tracking-widest shadow-lg">PLAN ACTIVO</Badge>
                  </div>
                )}
                <div>
                  <p className={cn("text-[11px] font-black uppercase italic tracking-tight", p.color)}>{p.nombre}</p>
                  <p className="text-2xl font-black italic text-foreground mt-2">{p.precio}</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Internet", val: p.internet },
                    { label: "Llamadas", val: p.llamadas },
                    { label: "SMS", val: p.sms },
                    { label: "Facturas", val: p.facturas },
                  ].map((f, j) => (
                    <div key={j} className="flex justify-between items-center">
                      <p className="text-[9px] font-black uppercase text-muted-foreground/60">{f.label}</p>
                      <p className={cn("text-[10px] font-black uppercase", p.color)}>{f.val}</p>
                    </div>
                  ))}
                </div>
                <Button variant={p.activo ? "secondary" : "outline"} className="w-full h-10 rounded-xl font-black text-[9px] uppercase tracking-widest">
                  {p.activo ? "PLAN ACTUAL" : "CONTRATAR"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Receipt className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Facturas Recientes</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {facturasRecientes.map((f, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{f.numero}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{f.cliente} · {f.fecha}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", f.tipo === "TELECOM" ? "bg-cyan-500/10 text-cyan-600" : f.tipo === "INTERNET" ? "bg-blue-500/10 text-blue-600" : "bg-primary/10 text-primary")}>
                    {f.tipo}
                  </Badge>
                  <p className="text-[11px] font-black italic text-emerald-600">{f.monto}</p>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", f.estado === "COBRADA" ? "bg-emerald-500/10 text-emerald-600" : f.estado === "EMITIDA" ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600")}>
                    {f.estado}
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
