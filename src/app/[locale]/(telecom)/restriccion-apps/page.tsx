"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Ban, Shield, CircleCheck, Clock, Plus, Settings,
  Smartphone, AppWindow, TriangleAlert, Lock, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ReglaApp {
  id: string;
  nombre: string;
  categoria: string;
  accion: "bloqueada" | "restringida" | "permitida";
  horario: string | null;
  aplicaA: string;
  motivo: string;
}

const REGLAS_APP: ReglaApp[] = [
  { id: "R1", nombre: "TikTok", categoria: "Redes Sociales", accion: "bloqueada", horario: null, aplicaA: "Todos los dispositivos", motivo: "Política de productividad corporativa" },
  { id: "R2", nombre: "Instagram", categoria: "Redes Sociales", accion: "restringida", horario: "09:00-18:00 (bloqueada)", aplicaA: "Dispositivos de trabajo", motivo: "Acceso limitado en horario laboral" },
  { id: "R3", nombre: "YouTube", categoria: "Entretenimiento", accion: "restringida", horario: "09:00-13:00 (bloqueada)", aplicaA: "Todos los dispositivos", motivo: "Alto consumo de datos en horario laboral" },
  { id: "R4", nombre: "Telegram", categoria: "Mensajería", accion: "permitida", horario: null, aplicaA: "Todos los dispositivos", motivo: "Canal oficial de comunicación" },
  { id: "R5", nombre: "WhatsApp Business", categoria: "Mensajería", accion: "permitida", horario: null, aplicaA: "Todos los dispositivos", motivo: "Comunicación con clientes" },
  { id: "R6", nombre: "Netflix", categoria: "Entretenimiento", accion: "bloqueada", horario: null, aplicaA: "Dispositivos de trabajo", motivo: "Consumo excesivo de datos y productividad" },
  { id: "R7", nombre: "Juegos (categoría)", categoria: "Juegos", accion: "bloqueada", horario: null, aplicaA: "Dispositivos de trabajo", motivo: "Política de productividad" },
  { id: "R8", nombre: "VPN no autorizadas", categoria: "Herramientas", accion: "bloqueada", horario: null, aplicaA: "Todos los dispositivos", motivo: "Seguridad corporativa — solo VPN oficial Kyron" },
];

const ACCION_CONFIG = {
  bloqueada: { label: "Bloqueada", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: Ban },
  restringida: { label: "Restringida", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Clock },
  permitida: { label: "Permitida", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CircleCheck },
};

const CATEGORIAS_BLOQUEADAS = [
  { cat: "Redes Sociales", total: 2, bloqueadas: 1, restringidas: 1 },
  { cat: "Entretenimiento", total: 2, bloqueadas: 1, restringidas: 1 },
  { cat: "Mensajería", total: 2, bloqueadas: 0, restringidas: 0 },
  { cat: "Juegos", total: 1, bloqueadas: 1, restringidas: 0 },
  { cat: "Herramientas", total: 1, bloqueadas: 1, restringidas: 0 },
];

export default function RestriccionAppsPage() {
  const { toast } = useToast();

  const bloqueadas = REGLAS_APP.filter(r => r.accion === "bloqueada").length;
  const restringidas = REGLAS_APP.filter(r => r.accion === "restringida").length;
  const permitidas = REGLAS_APP.filter(r => r.accion === "permitida").length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AppWindow className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Restricción de Apps</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Control de aplicaciones permitidas en dispositivos corporativos.</p>
        </div>
        <Button size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm"
          onClick={() => toast({ title: "Nueva Regla", description: "Formulario para crear una nueva regla de restricción." })}>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Nueva Regla
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Reglas", val: `${REGLAS_APP.length}`, icon: Settings, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Bloqueadas", val: `${bloqueadas}`, icon: Ban, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
          { label: "Restringidas", val: `${restringidas}`, icon: Clock, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Permitidas", val: `${permitidas}`, icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Shield className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Reglas Activas</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">{REGLAS_APP.length} reglas configuradas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {REGLAS_APP.map((r) => {
              const config = ACCION_CONFIG[r.accion];
              const AccionIcon = config.icon;
              return (
                <div key={r.id} className="px-5 py-3.5 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <AccionIcon className={cn("h-3.5 w-3.5", config.color)} />
                      <span className="text-xs font-semibold text-foreground">{r.nombre}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 text-muted-foreground border-border">{r.categoria}</Badge>
                    </div>
                    <Badge variant="outline" className={cn("text-[11px] px-2", config.bg, config.color, config.border)}>
                      {config.label}
                    </Badge>
                  </div>
                  <div className="pl-5.5 space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">{r.motivo}</p>
                    {r.horario && <p className="text-[11px] text-amber-500">Horario: {r.horario}</p>}
                    <p className="text-[11px] text-muted-foreground/60">Aplica a: {r.aplicaA}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <CardTitle className="text-sm font-semibold text-foreground">Por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {CATEGORIAS_BLOQUEADAS.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/10 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">{c.cat}</span>
                  <span className="text-[10px] text-muted-foreground">{c.total} apps</span>
                </div>
                <div className="flex gap-2">
                  {c.bloqueadas > 0 && (
                    <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-500 border-rose-500/20">
                      {c.bloqueadas} bloqueadas
                    </Badge>
                  )}
                  {c.restringidas > 0 && (
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20">
                      {c.restringidas} restringidas
                    </Badge>
                  )}
                  {c.bloqueadas === 0 && c.restringidas === 0 && (
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      Sin restricciones
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
