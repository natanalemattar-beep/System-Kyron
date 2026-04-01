"use client";

import React from "react";
import { Cpu, Server, Shield, LifeBuoy, FolderArchive, FileCheck, Activity, AlertTriangle, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Uptime", val: "99.97%", icon: Activity, color: "text-emerald-500" },
  { label: "Tickets Abiertos", val: "3", icon: LifeBuoy, color: "text-amber-500" },
  { label: "Servidores", val: "12 OK", icon: Server, color: "text-primary" },
  { label: "Último Respaldo", val: "Hoy 03:00", icon: FolderArchive, color: "text-cyan-500" },
];

const modulos = [
  {
    titulo: "Help Desk / Soporte Técnico",
    desc: "Sistema de tickets, mesa de ayuda, SLA, escalamiento y base de conocimiento para soporte interno.",
    href: "/informatica/helpdesk",
    icon: LifeBuoy,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    badge: "12 tickets",
  },
  {
    titulo: "Infraestructura IT",
    desc: "Monitoreo de servidores, redes, almacenamiento, bases de datos y servicios cloud en tiempo real.",
    href: "/informatica/infraestructura",
    icon: Server,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "99.97%",
  },
  {
    titulo: "Ciberseguridad",
    desc: "Firewall, antivirus, detección de intrusiones, auditoría de accesos, cumplimiento ISO 27001.",
    href: "/informatica/seguridad",
    icon: Shield,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    badge: "PROTEGIDO",
  },
  {
    titulo: "Licencias de Software",
    desc: "Inventario de licencias, fechas de vencimiento, costos, proveedores y cumplimiento legal.",
    href: "/informatica/licencias",
    icon: FileCheck,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    badge: "48 licencias",
  },
  {
    titulo: "Respaldos y Backup",
    desc: "Programación automática de respaldos, recuperación ante desastres, verificación de integridad.",
    href: "/informatica/respaldos",
    icon: FolderArchive,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "DIARIO",
  },
];

const alertas = [
  { tipo: "info", msg: "Actualización de seguridad Windows Server programada para este sábado 03:00 AM.", icon: Clock },
  { tipo: "warning", msg: "Disco del servidor DB-02 al 82% de capacidad. Se recomienda expandir.", icon: AlertTriangle },
  { tipo: "success", msg: "Auditoría de accesos completada. 0 accesos no autorizados detectados.", icon: CheckCircle },
];

export default function InformaticaPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Cpu className="h-3 w-3" /> DEPARTAMENTO IT
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Centro de <span className="text-primary italic">Informática</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Infraestructura • Seguridad • Soporte • Licencias • Respaldos
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
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

      <div className="space-y-3">
        {alertas.map((alerta, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border",
              alerta.tipo === "warning" ? "bg-amber-500/5 border-amber-500/20" :
              alerta.tipo === "success" ? "bg-emerald-500/5 border-emerald-500/20" :
              "bg-primary/5 border-primary/20"
            )}
          >
            <alerta.icon className={cn("h-4 w-4 shrink-0",
              alerta.tipo === "warning" ? "text-amber-500" :
              alerta.tipo === "success" ? "text-emerald-500" : "text-primary"
            )} />
            <p className="text-[11px] font-medium">{alerta.msg}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((mod, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link href={mod.href as any}>
              <Card className={cn("rounded-2xl overflow-hidden border hover:shadow-lg transition-all group cursor-pointer h-full", mod.border)}>
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl", mod.bg)}>
                      <mod.icon className={cn("h-6 w-6", mod.color)} />
                    </div>
                    <Badge className={cn("text-[8px] font-bold", mod.bg, mod.color)}>{mod.badge}</Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-1">{mod.titulo}</p>
                    <p className="text-[11px] text-muted-foreground">{mod.desc}</p>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-2xl p-6 bg-muted/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold">Estado General de Infraestructura</p>
            <p className="text-[10px] text-muted-foreground">Todos los sistemas operativos — Última verificación: hace 5 min</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold gap-1">
            <CheckCircle className="h-3 w-3" /> OPERATIVO
          </Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { nombre: "Servidores", estado: "12/12 OK", pct: 100, color: "text-emerald-500" },
            { nombre: "Almacenamiento", estado: "4.2 TB / 8 TB", pct: 52, color: "text-primary" },
            { nombre: "Red / Internet", estado: "1 Gbps", pct: 100, color: "text-emerald-500" },
            { nombre: "Certificados SSL", estado: "Vigentes", pct: 100, color: "text-emerald-500" },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-lg bg-background/50 border border-border/30">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{s.nombre}</p>
              <p className={cn("text-sm font-bold", s.color)}>{s.estado}</p>
              <Progress value={s.pct} className="h-1 mt-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
