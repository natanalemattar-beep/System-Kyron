"use client";

import React from "react";
import { TrendingUp, Users, Eye, ShoppingCart, CreditCard, Star, ArrowDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const etapas = [
  { nombre: "Visitantes", icon: Eye, total: 45200, color: "text-primary", bg: "bg-primary/10", width: "100%" },
  { nombre: "Leads Capturados", icon: Users, total: 12800, color: "text-cyan-500", bg: "bg-cyan-500/10", width: "85%" },
  { nombre: "Leads Calificados", icon: Target, total: 6400, color: "text-violet-500", bg: "bg-violet-500/10", width: "65%" },
  { nombre: "Oportunidades", icon: ShoppingCart, total: 2100, color: "text-amber-500", bg: "bg-amber-500/10", width: "45%" },
  { nombre: "Negociación", icon: TrendingUp, total: 890, color: "text-orange-500", bg: "bg-orange-500/10", width: "30%" },
  { nombre: "Cierre / Venta", icon: CreditCard, total: 342, color: "text-emerald-500", bg: "bg-emerald-500/10", width: "18%" },
  { nombre: "Clientes Fidelizados", icon: Star, total: 298, color: "text-rose-500", bg: "bg-rose-500/10", width: "15%" },
];

const embudos = [
  {
    nombre: "Embudo Principal — Ventas Directas",
    estado: "activo",
    leads: 12800,
    conversionGlobal: "2.7%",
    ticketPromedio: "USD 180",
    ingresoEstimado: "USD 61,560",
    etapas,
  },
  {
    nombre: "Embudo Corporativo — Planes Empresariales",
    estado: "activo",
    leads: 3200,
    conversionGlobal: "8.4%",
    ticketPromedio: "USD 1,200",
    ingresoEstimado: "USD 322,560",
    etapas: [
      { nombre: "Solicitudes", icon: Eye, total: 3200, color: "text-primary", bg: "bg-primary/10", width: "100%" },
      { nombre: "Reunión Agendada", icon: Users, total: 1800, color: "text-cyan-500", bg: "bg-cyan-500/10", width: "75%" },
      { nombre: "Propuesta Enviada", icon: Target, total: 890, color: "text-violet-500", bg: "bg-violet-500/10", width: "50%" },
      { nombre: "Negociación", icon: TrendingUp, total: 420, color: "text-amber-500", bg: "bg-amber-500/10", width: "35%" },
      { nombre: "Contrato Firmado", icon: CreditCard, total: 269, color: "text-emerald-500", bg: "bg-emerald-500/10", width: "20%" },
    ],
  },
];

export default function EmbudosPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <TrendingUp className="h-3 w-3" /> EMBUDO DE VENTAS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Embudos de <span className="text-primary italic">Conversión</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Pipeline • Etapas • Tasa de Conversión • Automatización IA
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Leads Totales", val: "16.0K", icon: Users, color: "text-primary" },
          { label: "En Pipeline", val: "5.2K", icon: TrendingUp, color: "text-cyan-500" },
          { label: "Conversión Global", val: "3.8%", icon: Target, color: "text-emerald-500" },
          { label: "Ingreso Estimado", val: "USD 384K", icon: CreditCard, color: "text-amber-500" },
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

      {embudos.map((embudo, ei) => (
        <motion.div key={ei} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + ei * 0.1 }}>
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b bg-muted/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold">{embudo.nombre}</CardTitle>
                  <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                    <span>Leads: <strong>{embudo.leads.toLocaleString()}</strong></span>
                    <span>Conversión: <strong className="text-emerald-500">{embudo.conversionGlobal}</strong></span>
                    <span>Ticket: <strong>{embudo.ticketPromedio}</strong></span>
                    <span>Ingreso: <strong className="text-primary">{embudo.ingresoEstimado}</strong></span>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold">{embudo.estado}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {embudo.etapas.map((etapa, j) => {
                  const convPct = j > 0
                    ? ((etapa.total / embudo.etapas[j - 1].total) * 100).toFixed(0) + "%"
                    : "100%";
                  return (
                    <div key={j}>
                      {j > 0 && (
                        <div className="flex items-center justify-center py-1">
                          <ArrowDown className="h-4 w-4 text-muted-foreground/30" />
                          <span className="text-[9px] font-bold text-muted-foreground ml-1">{convPct} conversión</span>
                        </div>
                      )}
                      <div
                        className={cn("flex items-center gap-3 p-4 rounded-xl border border-border/30 transition-all mx-auto", etapa.bg)}
                        style={{ width: etapa.width, minWidth: "280px" }}
                      >
                        <div className={cn("p-2 rounded-lg bg-background/50")}>
                          <etapa.icon className={cn("h-4 w-4", etapa.color)} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold">{etapa.nombre}</p>
                        </div>
                        <p className={cn("text-lg font-black", etapa.color)}>{etapa.total.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
