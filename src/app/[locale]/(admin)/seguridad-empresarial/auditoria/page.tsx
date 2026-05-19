"use client";

import { Eye, Shield, Clock, User, MapPin, Monitor, CircleCheck, ShieldAlert, LogIn, LogOut, KeyRound, Settings, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const registros = [
  { accion: "Inicio de sesión", usuario: "admin@kyron.ve", nombre: "Carlos Mattar", fecha: "03/04/2026 09:15:22", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Chrome / Windows", tipo: "login", estado: "exitoso" },
  { accion: "Exportó reporte fiscal", usuario: "contabilidad@kyron.ve", nombre: "María González", fecha: "03/04/2026 08:45:10", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Firefox / macOS", tipo: "accion", estado: "exitoso" },
  { accion: "Cambió configuración de IVA", usuario: "admin@kyron.ve", nombre: "Carlos Mattar", fecha: "02/04/2026 16:30:55", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Chrome / Windows", tipo: "config", estado: "exitoso" },
  { accion: "Intento de acceso fallido", usuario: "desconocido@mail.com", nombre: "Desconocido", fecha: "02/04/2026 03:12:44", ip: "45.33.98.201", ubicacion: "Moscú, RU", dispositivo: "Bot / Automatizado", tipo: "login", estado: "fallido" },
  { accion: "Creó factura #F-2026-0487", usuario: "ventas@kyron.ve", nombre: "José Pérez", fecha: "02/04/2026 14:22:18", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Safari / iPhone", tipo: "accion", estado: "exitoso" },
  { accion: "Cambió contraseña", usuario: "contabilidad@kyron.ve", nombre: "María González", fecha: "02/04/2026 14:30:02", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Firefox / macOS", tipo: "seguridad", estado: "exitoso" },
  { accion: "Activó verificación 2FA", usuario: "rrhh@kyron.ve", nombre: "Ana Rodríguez", fecha: "01/04/2026 11:45:33", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Chrome / Android", tipo: "seguridad", estado: "exitoso" },
  { accion: "Cerró sesión por inactividad", usuario: "ventas@kyron.ve", nombre: "José Pérez", fecha: "01/04/2026 18:00:00", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Safari / iPhone", tipo: "logout", estado: "info" },
  { accion: "Intento de acceso bloqueado (fuerza bruta)", usuario: "admin@kyron.ve", nombre: "Atacante", fecha: "31/03/2026 22:47:15", ip: "91.108.56.130", ubicacion: "San Petersburgo, RU", dispositivo: "Bot / Automatizado", tipo: "login", estado: "bloqueado" },
  { accion: "Descargó nómina marzo 2026", usuario: "rrhh@kyron.ve", nombre: "Ana Rodríguez", fecha: "31/03/2026 15:10:45", ip: "186.167.45.12", ubicacion: "Caracas, VE", dispositivo: "Chrome / Android", tipo: "accion", estado: "exitoso" },
];

const iconByTipo: Record<string, React.ElementType> = {
  login: LogIn,
  logout: LogOut,
  seguridad: KeyRound,
  config: Settings,
  accion: FileText,
};

const colorByEstado: Record<string, string> = {
  exitoso: "text-emerald-500",
  fallido: "text-red-500",
  bloqueado: "text-red-500",
  info: "text-blue-500",
};

const bgByEstado: Record<string, string> = {
  exitoso: "bg-emerald-500/10",
  fallido: "bg-red-500/10",
  bloqueado: "bg-red-500/10",
  info: "bg-blue-500/10",
};

export default function AuditoriaPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-blue-500 pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold uppercase tracking-wider text-blue-500 mb-3">
            <Eye className="h-3 w-3" /> AUDITORÍA DE ACCESOS
            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[7px] font-bold ml-1 animate-pulse">NUEVO</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Auditoría de <span className="text-blue-500 italic">Accesos</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Quién entra • Qué hace • Desde dónde • Cuándo
          </p>
        </div>
        <Button
          onClick={() => toast({ title: "Reporte generado", description: "El reporte de auditoría se descargó correctamente" })}
          className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <FileText className="h-4 w-4" /> Exportar Reporte
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Accesos Hoy", valor: "24", color: "text-emerald-500" },
          { label: "Bloqueados Este Mes", valor: "12", color: "text-red-500" },
          { label: "Usuarios Activos", valor: "8", color: "text-blue-500" },
          { label: "Países Bloqueados", valor: "3", color: "text-amber-500" },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardContent className="p-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/50">{m.label}</p>
                <p className={cn("text-3xl font-bold", m.color)}>{m.valor}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" /> Registro Completo de Actividades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {registros.map((r, i) => {
              const Icon = iconByTipo[r.tipo] || FileText;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border border-border/15 hover:bg-muted/20 transition-colors",
                    r.estado === "bloqueado" || r.estado === "fallido" ? "bg-red-500/[0.02]" : "bg-muted/10"
                  )}
                >
                  <div className={cn("p-2 rounded-lg shrink-0", bgByEstado[r.estado])}>
                    <Icon className={cn("h-4 w-4", colorByEstado[r.estado])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-bold text-foreground">{r.accion}</p>
                      <Badge variant="outline" className={cn(
                        "text-[7px]",
                        r.estado === "exitoso" ? "text-emerald-500 border-emerald-500/20" :
                        r.estado === "fallido" || r.estado === "bloqueado" ? "text-red-500 border-red-500/20" :
                        "text-blue-500 border-blue-500/20"
                      )}>
                        {r.estado === "exitoso" ? "OK" : r.estado === "bloqueado" ? "Bloqueado" : r.estado === "fallido" ? "Fallido" : "Info"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground/50">
                      <span className="flex items-center gap-1"><User className="h-2.5 w-2.5" /> {r.nombre}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {r.ubicacion}</span>
                      <span className="flex items-center gap-1"><Monitor className="h-2.5 w-2.5" /> {r.dispositivo}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground/40 font-mono">{r.fecha}</p>
                    <p className="text-[10px] text-muted-foreground/30 font-mono">{r.ip}</p>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
