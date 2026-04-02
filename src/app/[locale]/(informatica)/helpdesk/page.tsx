"use client";

import React from "react";
import { LifeBuoy, Plus, Search, Clock, CheckCircle, AlertTriangle, User, Calendar, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const tickets = [
  {
    id: "TK-0042",
    titulo: "Impresora de red no responde — Piso 3",
    solicitante: "María Rodríguez — Administración",
    prioridad: "alta",
    estado: "abierto",
    categoria: "Hardware",
    fechaCreacion: "01/04/2026 09:15",
    sla: "4h",
    asignado: "Ing. Pedro Gómez",
  },
  {
    id: "TK-0041",
    titulo: "Error al generar reporte de nómina — Módulo RRHH",
    solicitante: "Laura Martínez — RRHH",
    prioridad: "critica",
    estado: "en_progreso",
    categoria: "Software",
    fechaCreacion: "01/04/2026 08:30",
    sla: "2h",
    asignado: "Ing. Ana López",
  },
  {
    id: "TK-0040",
    titulo: "Solicitud de acceso VPN para teletrabajo",
    solicitante: "Carlos Mendoza — Ventas",
    prioridad: "media",
    estado: "abierto",
    categoria: "Accesos",
    fechaCreacion: "31/03/2026 16:45",
    sla: "8h",
    asignado: "Sin asignar",
  },
  {
    id: "TK-0039",
    titulo: "Actualización de antivirus en estaciones de trabajo",
    solicitante: "Sistema Automático",
    prioridad: "baja",
    estado: "en_progreso",
    categoria: "Seguridad",
    fechaCreacion: "31/03/2026 10:00",
    sla: "24h",
    asignado: "Ing. Pedro Gómez",
  },
  {
    id: "TK-0038",
    titulo: "Configuración de correo Outlook en equipo nuevo",
    solicitante: "José Hernández — Operaciones",
    prioridad: "baja",
    estado: "resuelto",
    categoria: "Software",
    fechaCreacion: "30/03/2026 14:20",
    sla: "8h",
    asignado: "Ing. Ana López",
  },
  {
    id: "TK-0037",
    titulo: "Falla intermitente en WiFi — Sala de reuniones",
    solicitante: "Patricia Díaz — Atención al Cliente",
    prioridad: "media",
    estado: "resuelto",
    categoria: "Red",
    fechaCreacion: "29/03/2026 11:00",
    sla: "4h",
    asignado: "Ing. Pedro Gómez",
  },
];

const prioridadConfig: Record<string, { label: string; badge: string }> = {
  critica: { label: "Crítica", badge: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  alta: { label: "Alta", badge: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  media: { label: "Media", badge: "bg-primary/10 text-primary border-primary/20" },
  baja: { label: "Baja", badge: "bg-muted/50 text-muted-foreground border-border" },
};

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  abierto: { label: "Abierto", badge: "bg-amber-500/10 text-amber-500", icon: <Clock className="h-3 w-3" /> },
  en_progreso: { label: "En Progreso", badge: "bg-primary/10 text-primary", icon: <Zap className="h-3 w-3" /> },
  resuelto: { label: "Resuelto", badge: "bg-emerald-500/10 text-emerald-500", icon: <CheckCircle className="h-3 w-3" /> },
};

export default function HelpdeskPage() {

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <LifeBuoy className="h-3 w-3" /> MESA DE AYUDA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Help <span className="text-primary italic">Desk</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Tickets • SLA • Escalamiento • Base de Conocimiento
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
          <Plus className="h-4 w-4" /> NUEVO TICKET
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Abiertos", val: tickets.filter(t => t.estado === "abierto").length.toString(), icon: Clock, color: "text-amber-500" },
          { label: "En Progreso", val: tickets.filter(t => t.estado === "en_progreso").length.toString(), icon: Zap, color: "text-primary" },
          { label: "Resueltos (Mes)", val: tickets.filter(t => t.estado === "resuelto").length.toString(), icon: CheckCircle, color: "text-emerald-500" },
          { label: "Cumplimiento SLA", val: "94%", icon: AlertTriangle, color: "text-cyan-500" },
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input placeholder="Buscar ticket por ID, título o solicitante..." className="pl-10 h-11 rounded-xl" />
      </div>

      <div className="space-y-3">
        {tickets.map((ticket, i) => {
          const prio = prioridadConfig[ticket.prioridad];
          const est = estadoConfig[ticket.estado];
          return (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={cn("rounded-xl overflow-hidden hover:border-primary/30 transition-colors", ticket.prioridad === "critica" && "ring-1 ring-rose-500/20")}>
                <div className="flex items-start gap-4 p-5">
                  <div className="shrink-0 mt-0.5">{est.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-primary">{ticket.id}</span>
                      <Badge className={cn("text-[8px] font-bold", prio.badge)}>{prio.label}</Badge>
                      <Badge className={cn("text-[8px] font-bold gap-1", est.badge)}>{est.icon} {est.label}</Badge>
                      <Badge className="text-[8px] font-bold bg-muted/30">{ticket.categoria}</Badge>
                    </div>
                    <p className="text-sm font-bold truncate">{ticket.titulo}</p>
                    <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {ticket.solicitante}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {ticket.fechaCreacion}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> SLA: {ticket.sla}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground">{ticket.asignado}</p>
                    <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5 mt-2">
                      <MessageSquare className="h-3 w-3" /> Responder
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
