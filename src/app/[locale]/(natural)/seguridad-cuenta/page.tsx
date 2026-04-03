"use client";

import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Lock, Eye, EyeOff, KeyRound, Smartphone, Monitor, Fingerprint, Clock, MapPin, CheckCircle, AlertTriangle, Bell, Globe, LogOut, History, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const opcionesSeguridad = [
  { nombre: "Verificación en dos pasos (2FA)", descripcion: "Pide un código extra cada vez que inicias sesión", icono: KeyRound, activo: true },
  { nombre: "Alertas de inicio de sesión", descripcion: "Te avisamos por correo cuando alguien entra a tu cuenta", icono: Bell, activo: true },
  { nombre: "Bloqueo por ubicación", descripcion: "Solo permite entrar desde lugares conocidos", icono: Globe, activo: false },
  { nombre: "Cerrar sesión automática", descripcion: "Se cierra la sesión después de 30 minutos sin actividad", icono: Clock, activo: true },
  { nombre: "Huella digital / Face ID", descripcion: "Usa tu huella o rostro para confirmar tu identidad", icono: Fingerprint, activo: false },
  { nombre: "Preguntas de seguridad", descripcion: "Preguntas personales para recuperar tu cuenta", icono: Key, activo: true },
];

const sesionesActivas = [
  { dispositivo: "Chrome - Windows PC", ubicacion: "Caracas, VE", ip: "186.167.x.x", hora: "Activa ahora", actual: true, icono: Monitor },
  { dispositivo: "Safari - iPhone", ubicacion: "Caracas, VE", ip: "186.167.x.x", hora: "Hace 2 horas", actual: false, icono: Smartphone },
];

const historialSeguridad = [
  { accion: "Iniciaste sesión", fecha: "03/04/2026 09:15", ubicacion: "Caracas, VE", estado: "ok" },
  { accion: "Cambiaste tu contraseña", fecha: "28/03/2026 14:30", ubicacion: "Caracas, VE", estado: "ok" },
  { accion: "Activaste la verificación 2FA", fecha: "15/03/2026 10:20", ubicacion: "Caracas, VE", estado: "ok" },
  { accion: "Alguien intentó entrar a tu cuenta", fecha: "10/03/2026 02:15", ubicacion: "Bogotá, CO", estado: "bloqueado" },
  { accion: "Actualizaste tu correo de recuperación", fecha: "05/03/2026 16:45", ubicacion: "Caracas, VE", estado: "ok" },
];

export default function SeguridadCuentaPage() {
  const { toast } = useToast();
  const [opciones, setOpciones] = useState(opcionesSeguridad.map(o => o.activo));

  const toggleOpcion = (index: number) => {
    const updated = [...opciones];
    updated[index] = !updated[index];
    setOpciones(updated);
    toast({
      title: updated[index] ? "Activado" : "Desactivado",
      description: opcionesSeguridad[index].nombre,
    });
  };

  const nivelSeguridad = Math.round((opciones.filter(Boolean).length / opciones.length) * 100);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card p-6 sm:p-8 mt-6"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Shield className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Seguridad de tu Cuenta</h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[8px] font-black uppercase tracking-wider animate-pulse">NUEVO</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Protege tu cuenta y controla quién tiene acceso</p>
          </div>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-foreground">Nivel de Protección</p>
              <span className={cn(
                "text-lg font-black",
                nivelSeguridad >= 80 ? "text-emerald-500" : nivelSeguridad >= 50 ? "text-amber-500" : "text-red-500"
              )}>{nivelSeguridad}%</span>
            </div>
            <Progress value={nivelSeguridad} className="h-2.5 rounded-full" />
            <p className="text-[11px] text-muted-foreground/60 mt-2">
              {nivelSeguridad >= 80 ? "Tu cuenta está bien protegida" :
               nivelSeguridad >= 50 ? "Puedes mejorar activando más opciones de seguridad" :
               "Tu cuenta necesita más protección. Activa las opciones de abajo."}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="rounded-2xl border border-border/30 bg-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Opciones de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {opcionesSeguridad.map((o, i) => (
                <div key={o.nombre} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/15 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn("p-2 rounded-lg shrink-0", opciones[i] ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <o.icono className={cn("h-4 w-4", opciones[i] ? "text-emerald-500" : "text-muted-foreground/40")} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-foreground">{o.nombre}</p>
                      <p className="text-[9px] text-muted-foreground/60">{o.descripcion}</p>
                    </div>
                  </div>
                  <Switch checked={opciones[i]} onCheckedChange={() => toggleOpcion(i)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-500" /> Sesiones Activas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sesionesActivas.map((s, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border",
                    s.actual ? "border-emerald-500/20 bg-emerald-500/[0.03]" : "border-border/15 bg-muted/10"
                  )}>
                    <div className={cn("p-2 rounded-lg shrink-0", s.actual ? "bg-emerald-500/10" : "bg-muted/20")}>
                      <s.icono className={cn("h-4 w-4", s.actual ? "text-emerald-500" : "text-muted-foreground/50")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-bold text-foreground">{s.dispositivo}</p>
                        {s.actual && <Badge className="text-[7px] bg-emerald-500 text-white border-0">Ahora</Badge>}
                      </div>
                      <p className="text-[9px] text-muted-foreground/50">{s.ubicacion} • {s.hora}</p>
                    </div>
                    {!s.actual && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({ title: "Sesión cerrada", description: s.dispositivo })}
                        className="h-7 px-3 rounded-lg text-[8px] font-bold text-red-500 hover:bg-red-500/10"
                      >
                        <LogOut className="h-3 w-3 mr-1" /> Cerrar
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4 text-violet-500" /> Últimos Cambios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {historialSeguridad.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/10 border border-border/10">
                    {h.estado === "ok" ? (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <ShieldAlert className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-foreground">{h.accion}</p>
                      <p className="text-[8px] text-muted-foreground/40">{h.ubicacion}</p>
                    </div>
                    <span className="text-[8px] text-muted-foreground/30 shrink-0">{h.fecha}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardContent className="p-6">
            <p className="text-sm font-bold text-foreground mb-4">Acciones Rápidas</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => toast({ title: "Función disponible pronto", description: "Cambio de contraseña" })}
                className="h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 justify-start px-4"
              >
                <Lock className="h-4 w-4 text-blue-500" /> Cambiar Contraseña
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({ title: "Función disponible pronto", description: "Correo de recuperación" })}
                className="h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 justify-start px-4"
              >
                <KeyRound className="h-4 w-4 text-amber-500" /> Correo de Recuperación
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({ title: "Todas las sesiones cerradas", description: "Solo esta sesión sigue activa" })}
                className="h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 justify-start px-4 text-red-500 border-red-500/20 hover:bg-red-500/5"
              >
                <LogOut className="h-4 w-4" /> Cerrar Todo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
