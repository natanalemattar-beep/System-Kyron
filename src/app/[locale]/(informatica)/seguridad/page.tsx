"use client";

import React from "react";
import { Shield, AlertTriangle, CheckCircle, Activity, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const amenazas = [
  { tipo: "Intentos de Login Fallidos", cantidad: 23, severidad: "media", origen: "Múltiples IPs", accion: "Bloqueado por fail2ban" },
  { tipo: "Escaneo de Puertos", cantidad: 8, severidad: "baja", origen: "185.220.x.x (TOR)", accion: "Bloqueado por firewall" },
  { tipo: "Intento SQL Injection", cantidad: 2, severidad: "alta", origen: "45.33.x.x", accion: "WAF bloqueó y registró" },
  { tipo: "Phishing Email Detectado", cantidad: 5, severidad: "media", origen: "Email entrante", accion: "Filtrado por antispam" },
];

const politicas = [
  { nombre: "Firewall perimetral activo", cumple: true },
  { nombre: "Antivirus actualizado (todas las estaciones)", cumple: true },
  { nombre: "Cifrado de disco (BitLocker/LUKS)", cumple: true },
  { nombre: "Política de contraseñas fuertes", cumple: true },
  { nombre: "2FA obligatorio para cuentas admin", cumple: true },
  { nombre: "VPN para acceso remoto", cumple: true },
  { nombre: "Backups cifrados fuera del sitio", cumple: true },
  { nombre: "Auditoría de accesos mensual", cumple: true },
  { nombre: "Plan de respuesta a incidentes", cumple: true },
  { nombre: "Capacitación en ciberseguridad (trimestral)", cumple: false },
];

const certificaciones = [
  { nombre: "ISO 27001", estado: "En proceso", progreso: 72 },
  { nombre: "SOC 2 Type II", estado: "Planificado", progreso: 15 },
  { nombre: "PCI DSS", estado: "No aplica", progreso: 0 },
];

export default function SeguridadPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 mb-3">
            <Shield className="h-3 w-3" /> CIBERSEGURIDAD
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Centro de <span className="text-primary italic">Ciberseguridad</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Firewall • IDS/IPS • Auditoría • ISO 27001 • Zero Trust
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2"
          onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'informatica', subcategoria: 'escaneo_seguridad', descripcion: 'Escaneo de seguridad infraestructura completa' }) }); if (res.ok) toast({ title: "Escaneo Iniciado", description: "Ejecutando análisis de vulnerabilidades en toda la infraestructura..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
          <Zap className="h-4 w-4" /> ESCANEO DE SEGURIDAD
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Score de Seguridad", val: "94/100", icon: ShieldCheck, color: "text-emerald-500" },
          { label: "Amenazas Bloqueadas", val: "38", icon: Shield, color: "text-rose-500" },
          { label: "Políticas Cumplidas", val: `${politicas.filter(p => p.cumple).length}/${politicas.length}`, icon: CheckCircle, color: "text-primary" },
          { label: "Días sin Incidentes", val: "127", icon: Activity, color: "text-cyan-500" },
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

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-rose-500/[0.03]">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-rose-500">Amenazas Detectadas (Últimos 30 días)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {amenazas.map((amenaza, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-border/30 last:border-none">
              <AlertTriangle className={cn("h-4 w-4 shrink-0",
                amenaza.severidad === "alta" ? "text-rose-500" :
                amenaza.severidad === "media" ? "text-amber-500" : "text-muted-foreground"
              )} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold">{amenaza.tipo}</p>
                  <Badge className={cn("text-[8px] font-bold",
                    amenaza.severidad === "alta" ? "bg-rose-500/10 text-rose-500" :
                    amenaza.severidad === "media" ? "bg-amber-500/10 text-amber-500" :
                    "bg-muted/50 text-muted-foreground"
                  )}>{amenaza.severidad}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">Origen: {amenaza.origen}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black">{amenaza.cantidad}</p>
                <p className="text-[9px] text-emerald-500 font-medium">{amenaza.accion}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader className="p-5 border-b">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Políticas de Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-2.5">
              {politicas.map((pol, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/10">
                  {pol.cumple ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-amber-500 shrink-0" />
                  )}
                  <span className={cn("text-xs", pol.cumple ? "text-foreground" : "text-amber-500 font-medium")}>{pol.nombre}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="p-5 border-b">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Certificaciones</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {certificaciones.map((cert, i) => (
              <div key={i} className="p-4 rounded-xl border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold">{cert.nombre}</p>
                  <Badge className="text-[8px] font-bold bg-muted/30">{cert.estado}</Badge>
                </div>
                <Progress value={cert.progreso} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-1">{cert.progreso}% completado</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
