"use client";

import React from "react";
import { Server, HardDrive, Wifi, Activity, Cpu, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const servidores = [
  { nombre: "SRV-PROD-01", tipo: "Producción", os: "Ubuntu 22.04 LTS", cpu: 34, ram: 62, disco: 45, estado: "activo", ip: "10.0.1.10", uptime: "124d 8h" },
  { nombre: "SRV-PROD-02", tipo: "Producción", os: "Ubuntu 22.04 LTS", cpu: 28, ram: 55, disco: 38, estado: "activo", ip: "10.0.1.11", uptime: "124d 8h" },
  { nombre: "SRV-DB-01", tipo: "Base de Datos", os: "Ubuntu 22.04 LTS", cpu: 45, ram: 78, disco: 52, estado: "activo", ip: "10.0.1.20", uptime: "90d 12h" },
  { nombre: "SRV-DB-02", tipo: "Base de Datos", os: "Ubuntu 22.04 LTS", cpu: 42, ram: 74, disco: 82, estado: "warning", ip: "10.0.1.21", uptime: "90d 12h" },
  { nombre: "SRV-MAIL-01", tipo: "Correo", os: "CentOS 8", cpu: 12, ram: 35, disco: 28, estado: "activo", ip: "10.0.1.30", uptime: "200d 4h" },
  { nombre: "SRV-BACKUP-01", tipo: "Respaldo", os: "Ubuntu 22.04 LTS", cpu: 8, ram: 22, disco: 68, estado: "activo", ip: "10.0.1.40", uptime: "180d 2h" },
  { nombre: "SRV-DEV-01", tipo: "Desarrollo", os: "Ubuntu 22.04 LTS", cpu: 18, ram: 42, disco: 35, estado: "activo", ip: "10.0.2.10", uptime: "45d 6h" },
  { nombre: "SRV-WEB-01", tipo: "Web/CDN", os: "Nginx Alpine", cpu: 15, ram: 28, disco: 20, estado: "activo", ip: "10.0.1.50", uptime: "124d 8h" },
];

const redesInfo = [
  { nombre: "LAN Principal", velocidad: "1 Gbps", estado: "ok", dispositivos: 85 },
  { nombre: "WiFi Corporativo", velocidad: "WiFi 6 AX", estado: "ok", dispositivos: 42 },
  { nombre: "VPN Remoto", velocidad: "100 Mbps", estado: "ok", dispositivos: 12 },
  { nombre: "Internet CANTV", velocidad: "100 Mbps", estado: "ok", dispositivos: 1 },
  { nombre: "Internet Inter", velocidad: "200 Mbps", estado: "ok", dispositivos: 1 },
];

export default function InfraestructuraPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Server className="h-3 w-3" /> INFRAESTRUCTURA
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Infraestructura <span className="text-primary italic">IT</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Servidores • Redes • Cloud • Monitoreo en Tiempo Real
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Servidores OK", val: `${servidores.filter(s => s.estado === "activo").length}/${servidores.length}`, icon: Server, color: "text-emerald-500" },
          { label: "CPU Promedio", val: `${Math.round(servidores.reduce((s, srv) => s + srv.cpu, 0) / servidores.length)}%`, icon: Cpu, color: "text-primary" },
          { label: "RAM Promedio", val: `${Math.round(servidores.reduce((s, srv) => s + srv.ram, 0) / servidores.length)}%`, icon: Activity, color: "text-cyan-500" },
          { label: "Almacenamiento", val: "4.2 / 8 TB", icon: HardDrive, color: "text-amber-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/10">
          <CardTitle className="text-xs font-semibold uppercase tracking-widest">Servidores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {servidores.map((srv, i) => (
            <div key={i} className={cn("flex items-center gap-4 p-4 border-b border-border/30 last:border-none hover:bg-muted/10 transition-colors", srv.estado === "warning" && "bg-amber-500/[0.03]")}>
              <div className={cn("w-2 h-2 rounded-full shrink-0", srv.estado === "activo" ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
              <div className="w-40 shrink-0">
                <p className="text-xs font-bold font-mono">{srv.nombre}</p>
                <p className="text-[11px] text-muted-foreground">{srv.tipo} • {srv.os}</p>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">CPU {srv.cpu}%</p>
                  <Progress value={srv.cpu} className={cn("h-1.5", srv.cpu > 80 && "[&>div]:bg-rose-500")} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">RAM {srv.ram}%</p>
                  <Progress value={srv.ram} className={cn("h-1.5", srv.ram > 80 && "[&>div]:bg-rose-500")} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Disco {srv.disco}%</p>
                  <Progress value={srv.disco} className={cn("h-1.5", srv.disco > 80 && "[&>div]:bg-rose-500")} />
                </div>
              </div>
              <div className="text-right shrink-0 w-28">
                <p className="text-[11px] font-mono text-muted-foreground">{srv.ip}</p>
                <p className="text-[11px] text-muted-foreground">Uptime: {srv.uptime}</p>
              </div>
              {srv.estado === "activo" ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/10">
          <CardTitle className="text-xs font-semibold uppercase tracking-widest">Redes y Conectividad</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {redesInfo.map((red, i) => (
              <div key={i} className="p-4 rounded-xl border border-border/30 bg-muted/10">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <p className="text-xs font-bold">{red.nombre}</p>
                </div>
                <p className="text-sm font-bold text-primary">{red.velocidad}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{red.dispositivos} dispositivos</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-emerald-500 font-medium">Operativo</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
