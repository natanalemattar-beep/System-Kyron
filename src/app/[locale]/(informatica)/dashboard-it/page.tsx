"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Cpu, Server, Shield, LifeBuoy, FolderArchive, FileCheck, Activity, AlertTriangle, CheckCircle, ArrowRight, Clock, HardDrive, Wifi, Users, Inbox, Loader2, RefreshCw, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ITDashboardData {
  tickets: { abiertos: number; en_progreso: number; total: number; sla: number };
  usuarios_conectados: number;
  actividad_reciente: Array<{ evento: string; descripcion: string; created_at: string }>;
}

const MODULOS = [
  {
    titulo: "Help Desk / Soporte Técnico",
    desc: "Sistema de tickets, mesa de ayuda, SLA, escalamiento y base de conocimiento.",
    href: "/helpdesk",
    icon: LifeBuoy,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    titulo: "Infraestructura IT",
    desc: "Monitoreo de servidores, redes, almacenamiento, bases de datos y servicios cloud.",
    href: "/infraestructura",
    icon: Server,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    titulo: "Centro de Ciberseguridad",
    desc: "Firewall, IDS/IPS, auditoría de accesos, cumplimiento ISO 27001, Zero Trust.",
    href: "/seguridad",
    icon: Shield,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    titulo: "Licencias de Software",
    desc: "Inventario de licencias, fechas de vencimiento, costos y cumplimiento legal.",
    href: "/licencias",
    icon: FileCheck,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    titulo: "Respaldos y Backup",
    desc: "Programación automática, recuperación ante desastres, política 3-2-1.",
    href: "/respaldos",
    icon: FolderArchive,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export default function DashboardITPage() {
  const { toast } = useToast();
  const [itData, setItData] = useState<ITDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    fetch('/api/it-dashboard')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => setItData(d))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const ticketsAbiertos = itData?.tickets.abiertos ?? 0;
  const ticketsEnProgreso = itData?.tickets.en_progreso ?? 0;
  const sla = itData?.tickets.sla ?? 0;
  const usuariosConectados = itData?.usuarios_conectados ?? 0;
  const actividad = itData?.actividad_reciente ?? [];

  const kpis = [
    { label: "Tickets Abiertos", val: loading ? "—" : String(ticketsAbiertos), sub: `${ticketsEnProgreso} en progreso`, icon: LifeBuoy, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "SLA Helpdesk", val: loading ? "—" : (sla > 0 ? `${sla}%` : "Sin datos"), sub: "Cumplimiento", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Usuarios Conectados", val: loading ? "—" : String(usuariosConectados), sub: "Tiempo real", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Tickets", val: loading ? "—" : String(itData?.tickets.total ?? 0), sub: "Registros en DB", icon: Cpu, color: "text-primary", bg: "bg-primary/10" },
  ];

  if (!loading && loadError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No se pudo cargar el dashboard</p>
          <p className="text-xs text-muted-foreground">Error al obtener datos de IT. Intenta de nuevo.</p>
          <Button size="sm" onClick={load} className="rounded-lg text-xs mt-2">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-cyan-500 pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold uppercase tracking-wider text-cyan-500 mb-3">
            <Cpu className="h-3 w-3" /> DEPARTAMENTO DE INFORMÁTICA
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Dashboard <span className="text-cyan-500 italic">IT</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Centro de Control • Infraestructura • Seguridad • Soporte • Respaldos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-widest gap-2"
            onClick={() => { load(); toast({ title: "Actualizando dashboard", description: "Recargando métricas de IT..." }); }}>
            <RefreshCw className="h-4 w-4" /> ACTUALIZAR
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
              {loading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : (
                <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
              )}
              <p className="text-[11px] text-muted-foreground mt-1">{kpi.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader className="p-5 border-b bg-muted/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest">Actividad Reciente</CardTitle>
                <Link href="/helpdesk" className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1">
                  Helpdesk <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Cargando actividad...</span>
                </div>
              ) : actividad.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                  <Inbox className="h-10 w-10 opacity-20" />
                  <p className="text-xs font-semibold uppercase tracking-widest">Sin actividad reciente</p>
                </div>
              ) : actividad.map((ev, i) => (
                <div key={i} className="flex items-start gap-4 p-3.5 border-b border-border/30 last:border-none">
                  <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold">{ev.evento}</p>
                    <p className="text-[10px] text-muted-foreground">{ev.descripcion}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {new Date(ev.created_at).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl">
          <CardHeader className="p-5 border-b bg-muted/10">
            <CardTitle className="text-xs font-semibold uppercase tracking-widest">Estado de Tickets</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-amber-500">Abiertos</span>
                    <span className="text-xs font-bold text-amber-500">{ticketsAbiertos}</span>
                  </div>
                  <Progress value={itData?.tickets.total ? (ticketsAbiertos / itData.tickets.total) * 100 : 0} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-primary">En Progreso</span>
                    <span className="text-xs font-bold text-primary">{ticketsEnProgreso}</span>
                  </div>
                  <Progress value={itData?.tickets.total ? (ticketsEnProgreso / itData.tickets.total) * 100 : 0} className="h-1.5" />
                </div>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-[10px] text-muted-foreground text-center">
                    {itData?.tickets.total === 0 ? "No hay tickets registrados aún" : `${itData?.tickets.total} tickets en total`}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Módulos IT</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULOS.map((mod, i) => (
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
    </div>
  );
}
