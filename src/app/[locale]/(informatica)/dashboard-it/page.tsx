"use client";

import React from "react";
import { Cpu, Server, Shield, LifeBuoy, FolderArchive, FileCheck, Activity, AlertTriangle, CheckCircle, ArrowRight, Clock, HardDrive, Wifi, Users, Monitor, Lock, TrendingUp, Zap, Database, Cloud, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const kpis = [
  { label: "Uptime del Sistema", val: "99.97%", sub: "Último mes", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Tickets Abiertos", val: "3", sub: "2 alta, 1 media", icon: LifeBuoy, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Servidores Activos", val: "12/12", sub: "Todos operativos", icon: Server, color: "text-primary", bg: "bg-primary/10" },
  { label: "Último Respaldo", val: "Hoy 03:00", sub: "100% exitoso", icon: FolderArchive, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { label: "Score Seguridad", val: "94/100", sub: "ISO 27001: 72%", icon: Shield, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "Licencias Activas", val: "48", sub: "1 por vencer", icon: FileCheck, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Usuarios Conectados", val: "42", sub: "Tiempo real", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Almacenamiento", val: "52%", sub: "4.2 TB / 8 TB", icon: HardDrive, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const modulos = [
  {
    titulo: "Help Desk / Soporte Técnico",
    desc: "Sistema de tickets, mesa de ayuda, SLA, escalamiento y base de conocimiento.",
    href: "/helpdesk",
    icon: LifeBuoy,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    stats: [
      { label: "Abiertos", val: "3" },
      { label: "En Progreso", val: "2" },
      { label: "SLA", val: "94%" },
    ],
  },
  {
    titulo: "Infraestructura IT",
    desc: "Monitoreo de servidores, redes, almacenamiento, bases de datos y servicios cloud.",
    href: "/infraestructura",
    icon: Server,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    stats: [
      { label: "Servidores", val: "12" },
      { label: "CPU", val: "25%" },
      { label: "RAM", val: "49%" },
    ],
  },
  {
    titulo: "Centro de Ciberseguridad",
    desc: "Firewall, IDS/IPS, auditoría de accesos, cumplimiento ISO 27001, Zero Trust.",
    href: "/seguridad",
    icon: Shield,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    stats: [
      { label: "Amenazas", val: "38" },
      { label: "Sin Incidentes", val: "127d" },
      { label: "Políticas", val: "9/10" },
    ],
  },
  {
    titulo: "Licencias de Software",
    desc: "Inventario de licencias, fechas de vencimiento, costos y cumplimiento legal.",
    href: "/licencias",
    icon: FileCheck,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    stats: [
      { label: "Total", val: "48" },
      { label: "Costo/Mes", val: "$2.6K" },
      { label: "Por Vencer", val: "1" },
    ],
  },
  {
    titulo: "Respaldos y Backup",
    desc: "Programación automática, recuperación ante desastres, política 3-2-1.",
    href: "/respaldos",
    icon: FolderArchive,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    stats: [
      { label: "Total", val: "402 GB" },
      { label: "Cloud", val: "1.2 TB" },
      { label: "Éxito", val: "100%" },
    ],
  },
];

const alertas = [
  { tipo: "warning", msg: "Disco del servidor DB-02 al 82% de capacidad. Se recomienda expandir.", icon: AlertTriangle, tiempo: "hace 2h" },
  { tipo: "info", msg: "Actualización de seguridad Windows Server programada para sábado 03:00 AM.", icon: Clock, tiempo: "hace 4h" },
  { tipo: "warning", msg: "Licencia Kaspersky Endpoint Security vence el 30/04/2026. Renovar.", icon: AlertTriangle, tiempo: "hace 1d" },
  { tipo: "success", msg: "Auditoría de accesos completada. 0 accesos no autorizados detectados.", icon: CheckCircle, tiempo: "hace 1d" },
  { tipo: "success", msg: "Respaldo completo de base de datos ejecutado exitosamente (2.4 GB).", icon: CheckCircle, tiempo: "Hoy 03:00" },
];

const servidoresQuick = [
  { nombre: "SRV-PROD-01", cpu: 34, ram: 62, estado: "ok" },
  { nombre: "SRV-PROD-02", cpu: 28, ram: 55, estado: "ok" },
  { nombre: "SRV-DB-01", cpu: 45, ram: 78, estado: "ok" },
  { nombre: "SRV-DB-02", cpu: 42, ram: 74, estado: "warning" },
  { nombre: "SRV-MAIL-01", cpu: 12, ram: 35, estado: "ok" },
  { nombre: "SRV-BACKUP-01", cpu: 8, ram: 22, estado: "ok" },
];

export default function DashboardITPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-cyan-500 pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-3">
            <Cpu className="h-3 w-3" /> DEPARTAMENTO DE INFORMÁTICA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Dashboard <span className="text-cyan-500 italic">IT</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Centro de Control • Infraestructura • Seguridad • Soporte • Respaldos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2"
            onClick={() => toast({ title: "Verificación Iniciada", description: "Ejecutando health check en todos los sistemas..." })}>
            <RefreshCw className="h-4 w-4" /> HEALTH CHECK
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <div className={cn("p-1.5 rounded-lg", kpi.bg)}>
                  <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
              <p className="text-[9px] text-muted-foreground mt-1">{kpi.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader className="p-5 border-b bg-muted/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-black uppercase tracking-widest">Estado de Servidores</CardTitle>
                <Link href="/infraestructura" className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {servidoresQuick.map((srv, i) => (
                <div key={i} className={cn("flex items-center gap-4 p-3.5 border-b border-border/30 last:border-none", srv.estado === "warning" && "bg-amber-500/[0.03]")}>
                  <div className={cn("w-2 h-2 rounded-full shrink-0", srv.estado === "ok" ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                  <span className="text-xs font-bold font-mono w-32">{srv.nombre}</span>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-muted-foreground mb-1">CPU {srv.cpu}%</p>
                      <Progress value={srv.cpu} className={cn("h-1.5", srv.cpu > 80 && "[&>div]:bg-rose-500")} />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground mb-1">RAM {srv.ram}%</p>
                      <Progress value={srv.ram} className={cn("h-1.5", srv.ram > 80 && "[&>div]:bg-rose-500")} />
                    </div>
                  </div>
                  {srv.estado === "ok" ? (
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl">
          <CardHeader className="p-5 border-b bg-muted/10">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Alertas y Eventos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {alertas.map((alerta, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 border-b border-border/30 last:border-none">
                <alerta.icon className={cn("h-4 w-4 shrink-0 mt-0.5",
                  alerta.tipo === "warning" ? "text-amber-500" :
                  alerta.tipo === "success" ? "text-emerald-500" : "text-primary"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium leading-snug">{alerta.msg}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">{alerta.tiempo}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Módulos IT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modulos.map((mod, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }}>
              <Link href={mod.href as any}>
                <Card className={cn("rounded-2xl overflow-hidden border hover:shadow-lg transition-all group cursor-pointer h-full", mod.border)}>
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between">
                      <div className={cn("p-3 rounded-xl", mod.bg)}>
                        <mod.icon className={cn("h-6 w-6", mod.color)} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold mb-1">{mod.titulo}</p>
                      <p className="text-[11px] text-muted-foreground">{mod.desc}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {mod.stats.map((stat, j) => (
                        <div key={j} className="text-center p-2 rounded-lg bg-muted/20">
                          <p className="text-[8px] text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                          <p className={cn("text-sm font-black", mod.color)}>{stat.val}</p>
                        </div>
                      ))}
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
      </div>

      <Card className="rounded-2xl p-6 border-cyan-500/20 bg-cyan-500/[0.03]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold">Estado General: Operativo</p>
              <p className="text-[10px] text-muted-foreground">Todos los sistemas funcionando correctamente — Última verificación: hace 5 min</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold gap-1">
            <CheckCircle className="h-3 w-3" /> ALL SYSTEMS GO
          </Badge>
        </div>
      </Card>
    </div>
  );
}
