"use client";

import React from "react";
import { Mail, Plus, Send, Users, Eye, MousePointer } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const campanas = [
  {
    nombre: "Newsletter Semanal — Actualización Fiscal",
    estado: "enviada",
    fecha: "01/04/2026",
    destinatarios: 4520,
    entregados: 4380,
    abiertos: 2890,
    clicks: 876,
    bajas: 12,
    tasaApertura: "66.0%",
    tasaClicks: "20.0%",
  },
  {
    nombre: "Promo Plan Empresarial 5G — Early Adopters",
    estado: "enviada",
    fecha: "28/03/2026",
    destinatarios: 1200,
    entregados: 1180,
    abiertos: 890,
    clicks: 342,
    bajas: 3,
    tasaApertura: "75.4%",
    tasaClicks: "29.0%",
  },
  {
    nombre: "Bienvenida — Nuevos Clientes Q1",
    estado: "automatizada",
    fecha: "Continua",
    destinatarios: 298,
    entregados: 298,
    abiertos: 267,
    clicks: 189,
    bajas: 0,
    tasaApertura: "89.6%",
    tasaClicks: "63.4%",
  },
  {
    nombre: "Recordatorio — Declaración IVA Abril",
    estado: "programada",
    fecha: "10/04/2026",
    destinatarios: 3800,
    entregados: 0,
    abiertos: 0,
    clicks: 0,
    bajas: 0,
    tasaApertura: "—",
    tasaClicks: "—",
  },
  {
    nombre: "Re-engagement — Clientes Inactivos 90d",
    estado: "borrador",
    fecha: "—",
    destinatarios: 420,
    entregados: 0,
    abiertos: 0,
    clicks: 0,
    bajas: 0,
    tasaApertura: "—",
    tasaClicks: "—",
  },
];

const listas = [
  { nombre: "Todos los Contactos", total: 12800, activos: 11200 },
  { nombre: "Clientes Corporativos", total: 3200, activos: 3100 },
  { nombre: "Leads Calificados", total: 6400, activos: 5800 },
  { nombre: "Suscriptores Newsletter", total: 4520, activos: 4380 },
];

const estadoConfig: Record<string, { label: string; badge: string }> = {
  enviada: { label: "Enviada", badge: "bg-emerald-500/10 text-emerald-500" },
  automatizada: { label: "Automatizada", badge: "bg-cyan-500/10 text-cyan-500" },
  programada: { label: "Programada", badge: "bg-amber-500/10 text-amber-500" },
  borrador: { label: "Borrador", badge: "bg-muted/50 text-muted-foreground" },
};

export default function EmailMarketingPage() {

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Mail className="h-3 w-3" /> EMAIL MARKETING
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Email <span className="text-primary italic">Marketing</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Campañas • Automatización • Listas • A/B Testing • Analítica
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
          <Plus className="h-4 w-4" /> NUEVA CAMPAÑA
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Emails Enviados", val: "10.3K", icon: Send, color: "text-primary" },
          { label: "Tasa Apertura", val: "68.2%", icon: Eye, color: "text-emerald-500" },
          { label: "Tasa de Clicks", val: "24.8%", icon: MousePointer, color: "text-cyan-500" },
          { label: "Contactos", val: "12.8K", icon: Users, color: "text-amber-500" },
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {listas.map((lista, i) => (
          <Card key={i} className="p-4 rounded-xl">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{lista.nombre}</p>
            <p className="text-lg font-black text-foreground">{lista.total.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-500 font-medium">{lista.activos.toLocaleString()} activos</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {campanas.map((camp, i) => {
          const est = estadoConfig[camp.estado];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="rounded-xl overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold truncate">{camp.nombre}</p>
                      <Badge className={cn("text-[8px] font-bold", est.badge)}>{est.label}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{camp.fecha} • {camp.destinatarios.toLocaleString()} destinatarios</p>
                    {camp.estado === "enviada" || camp.estado === "automatizada" ? (
                      <div className="grid grid-cols-4 gap-3 mt-3">
                        {[
                          { label: "Entregados", val: camp.entregados.toLocaleString() },
                          { label: "Abiertos", val: `${camp.abiertos.toLocaleString()} (${camp.tasaApertura})` },
                          { label: "Clicks", val: `${camp.clicks.toLocaleString()} (${camp.tasaClicks})` },
                          { label: "Bajas", val: camp.bajas.toString() },
                        ].map((m, j) => (
                          <div key={j} className="text-center p-2 rounded-lg bg-muted/20">
                            <p className="text-[9px] text-muted-foreground uppercase">{m.label}</p>
                            <p className="text-xs font-bold">{m.val}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5 shrink-0">
                    <Eye className="h-3 w-3" /> Ver
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
