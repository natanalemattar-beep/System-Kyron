"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone, Shield, Lock, RefreshCw, CircleCheck,
  AlertTriangle, Settings, Wifi, Download, Monitor,
  Key, Eye, Fingerprint, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface DispositivoMDM {
  id: string;
  nombre: string;
  modelo: string;
  os: string;
  version: string;
  ultimoCheckIn: string;
  cumplimiento: "compliant" | "warning" | "non_compliant";
  cifrado: boolean;
  vpn: boolean;
  antivirus: boolean;
  mdmActivo: boolean;
  politicas: number;
  politicasAplicadas: number;
}

const MOCK_DISPOSITIVOS: DispositivoMDM[] = [
  { id: "M1", nombre: "iPhone 15 Pro — Carlos P.", modelo: "iPhone 15 Pro", os: "iOS", version: "18.3", ultimoCheckIn: "Hace 5 min", cumplimiento: "compliant", cifrado: true, vpn: true, antivirus: true, mdmActivo: true, politicas: 12, politicasAplicadas: 12 },
  { id: "M2", nombre: "Galaxy S24 — María G.", modelo: "Samsung Galaxy S24", os: "Android", version: "15", ultimoCheckIn: "Hace 12 min", cumplimiento: "compliant", cifrado: true, vpn: true, antivirus: true, mdmActivo: true, politicas: 12, politicasAplicadas: 12 },
  { id: "M3", nombre: "Pixel 9 — Juan R.", modelo: "Google Pixel 9", os: "Android", version: "15", ultimoCheckIn: "Hace 8 min", cumplimiento: "warning", cifrado: true, vpn: false, antivirus: true, mdmActivo: true, politicas: 12, politicasAplicadas: 10 },
  { id: "M4", nombre: "iPhone 14 — Ana F.", modelo: "iPhone 14", os: "iOS", version: "17.6", ultimoCheckIn: "Hace 2 horas", cumplimiento: "warning", cifrado: true, vpn: true, antivirus: true, mdmActivo: true, politicas: 12, politicasAplicadas: 11 },
  { id: "M5", nombre: "Galaxy A55 — Luis M.", modelo: "Samsung Galaxy A55", os: "Android", version: "14", ultimoCheckIn: "Hace 1 día", cumplimiento: "non_compliant", cifrado: false, vpn: false, antivirus: false, mdmActivo: false, politicas: 12, politicasAplicadas: 5 },
];

const CUMPLIMIENTO_CONFIG = {
  compliant: { label: "Cumple", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  warning: { label: "Alerta", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  non_compliant: { label: "No Cumple", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

const POLITICAS_MDM = [
  { nombre: "Cifrado de disco completo", descripcion: "AES-256 obligatorio en todos los dispositivos", activos: 4, total: 5 },
  { nombre: "VPN corporativa activa", descripcion: "Conexión VPN requerida fuera de red oficina", activos: 3, total: 5 },
  { nombre: "Antivirus actualizado", descripcion: "Solución antimalware con definiciones al día", activos: 4, total: 5 },
  { nombre: "PIN/Biometría obligatorio", descripcion: "Bloqueo de pantalla con mínimo 6 dígitos", activos: 5, total: 5 },
  { nombre: "Actualización de OS", descripcion: "OS actualizado a la última versión estable", activos: 3, total: 5 },
  { nombre: "Borrado remoto habilitado", descripcion: "Capacidad de wipe remoto ante pérdida/robo", activos: 5, total: 5 },
];

export default function MDMCorporativoPage() {
  const { toast } = useToast();

  const compliant = MOCK_DISPOSITIVOS.filter(d => d.cumplimiento === "compliant").length;
  const warnings = MOCK_DISPOSITIVOS.filter(d => d.cumplimiento === "warning").length;
  const nonCompliant = MOCK_DISPOSITIVOS.filter(d => d.cumplimiento === "non_compliant").length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Monitor className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">MDM Corporativo</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Gestión de Dispositivos Móviles — políticas de seguridad y cumplimiento.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold"
            onClick={() => toast({ title: "Políticas Sincronizadas", description: "Las políticas MDM se han propagado a todos los dispositivos." })}>
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Sincronizar
          </Button>
          <Button size="sm" className="h-9 rounded-lg text-xs font-semibold"
            onClick={() => toast({ title: "Nuevo Dispositivo", description: "Formulario de registro de dispositivo corporativo." })}>
            <Smartphone className="mr-1.5 h-3.5 w-3.5" /> Registrar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Dispositivos", val: `${MOCK_DISPOSITIVOS.length}`, icon: Smartphone, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Cumplen Políticas", val: `${compliant}`, icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Con Alertas", val: `${warnings}`, icon: AlertTriangle, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "No Cumplen", val: `${nonCompliant}`, icon: Shield, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Smartphone className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Inventario de Dispositivos</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{MOCK_DISPOSITIVOS.length} dispositivos gestionados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {MOCK_DISPOSITIVOS.map((d) => {
            const config = CUMPLIMIENTO_CONFIG[d.cumplimiento];
            return (
              <div key={d.id} className="px-5 py-4 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl", d.os === "iOS" ? "bg-blue-500/10" : "bg-emerald-500/10")}>
                      <Smartphone className={cn("h-4 w-4", d.os === "iOS" ? "text-blue-500" : "text-emerald-500")} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{d.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{d.modelo} · {d.os} {d.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("text-[9px] px-2", config.bg, config.color, config.border)}>
                      {config.label}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {d.ultimoCheckIn}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 pl-11">
                  {[
                    { label: "Cifrado", ok: d.cifrado, icon: Lock },
                    { label: "VPN", ok: d.vpn, icon: Shield },
                    { label: "Antivirus", ok: d.antivirus, icon: Key },
                    { label: "MDM", ok: d.mdmActivo, icon: Settings },
                  ].map((check, ci) => (
                    <div key={ci} className={cn("flex items-center gap-1.5 p-1.5 rounded-lg text-[9px] font-semibold", check.ok ? "text-emerald-500 bg-emerald-500/5" : "text-rose-500 bg-rose-500/5")}>
                      <check.icon className="h-2.5 w-2.5" />
                      {check.label}
                      {check.ok ? <CircleCheck className="h-2.5 w-2.5 ml-auto" /> : <AlertTriangle className="h-2.5 w-2.5 ml-auto" />}
                    </div>
                  ))}
                </div>
                <div className="pl-11 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-muted-foreground">Políticas: {d.politicasAplicadas}/{d.politicas}</span>
                    <div className="h-1 flex-1 bg-muted/30 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", d.politicasAplicadas === d.politicas ? "bg-emerald-500" : d.politicasAplicadas >= d.politicas * 0.8 ? "bg-amber-500" : "bg-rose-500")}
                        style={{ width: `${(d.politicasAplicadas / d.politicas) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg"><Shield className="h-4 w-4 text-amber-500" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Políticas de Seguridad</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Reglas de cumplimiento corporativo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-2">
          {POLITICAS_MDM.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30">
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{p.nombre}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{p.descripcion}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("text-xs font-bold tabular-nums", p.activos === p.total ? "text-emerald-500" : "text-amber-500")}>
                  {p.activos}/{p.total}
                </span>
                <div className="h-1.5 w-16 bg-muted/30 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", p.activos === p.total ? "bg-emerald-500" : "bg-amber-500")}
                    style={{ width: `${(p.activos / p.total) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
