"use client";

import { MonitorSmartphone, Shield, Smartphone, Monitor, Tablet, Laptop, CheckCircle, XCircle, Clock, MapPin, Trash2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const dispositivos = [
  { nombre: "Windows PC - Oficina Principal", tipo: "desktop", navegador: "Chrome 120", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "03/04/2026 09:15", estado: "activo", actual: true },
  { nombre: "MacBook Pro - Contabilidad", tipo: "laptop", navegador: "Firefox 122", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "03/04/2026 08:45", estado: "activo", actual: false },
  { nombre: "iPhone 15 - Director General", tipo: "phone", navegador: "Safari Mobile", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "02/04/2026 14:22", estado: "activo", actual: false },
  { nombre: "Samsung Galaxy - RRHH", tipo: "phone", navegador: "Chrome Mobile", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "01/04/2026 11:45", estado: "activo", actual: false },
  { nombre: "iPad Pro - Sala de Reuniones", tipo: "tablet", navegador: "Safari", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "28/03/2026 10:00", estado: "inactivo", actual: false },
  { nombre: "Linux Desktop - IT", tipo: "desktop", navegador: "Brave", ip: "186.167.45.12", ubicacion: "Caracas, VE", ultimoAcceso: "25/03/2026 16:30", estado: "inactivo", actual: false },
];

const iconByTipo: Record<string, React.ElementType> = {
  desktop: Monitor,
  laptop: Laptop,
  phone: Smartphone,
  tablet: Tablet,
};

export default function DispositivosPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-violet-500 pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-violet-500 mb-3">
            <MonitorSmartphone className="h-3 w-3" /> DISPOSITIVOS AUTORIZADOS
            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[7px] font-black ml-1 animate-pulse">NUEVO</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Dispositivos <span className="text-violet-500 italic">Autorizados</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Control de Equipos • Acceso Seguro • Gestión de Sesiones
          </p>
        </div>
        <Button
          onClick={() => toast({ title: "Sesiones cerradas", description: "Se cerraron todas las sesiones excepto la actual" })}
          variant="outline"
          className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 border-red-500/20 text-red-500 hover:bg-red-500/5"
        >
          <XCircle className="h-4 w-4" /> Cerrar Todas las Sesiones
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Dispositivos Activos", valor: "4", color: "text-emerald-500", icon: CheckCircle },
          { label: "Dispositivos Inactivos", valor: "2", color: "text-muted-foreground/40", icon: Clock },
          { label: "Total Registrados", valor: "6", color: "text-violet-500", icon: MonitorSmartphone },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted/20">
                  <m.icon className={cn("h-5 w-5", m.color)} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">{m.label}</p>
                  <p className={cn("text-2xl font-black", m.color)}>{m.valor}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-4 w-4 text-violet-500" /> Todos los Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dispositivos.map((d, i) => {
              const DeviceIcon = iconByTipo[d.tipo] || Monitor;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                    d.actual ? "border-emerald-500/20 bg-emerald-500/[0.03]" : "border-border/15 bg-muted/10 hover:bg-muted/20"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl shrink-0",
                    d.estado === "activo" ? "bg-emerald-500/10" : "bg-muted/30"
                  )}>
                    <DeviceIcon className={cn("h-6 w-6", d.estado === "activo" ? "text-emerald-500" : "text-muted-foreground/40")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-bold text-foreground">{d.nombre}</p>
                      {d.actual && (
                        <Badge className="text-[7px] bg-emerald-500 text-white border-0">Este dispositivo</Badge>
                      )}
                      {d.estado === "activo" ? (
                        <Badge variant="outline" className="text-[7px] text-emerald-500 border-emerald-500/20">Activo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[7px] text-muted-foreground/40 border-border/30">Inactivo</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[9px] text-muted-foreground/50">
                      <span>{d.navegador}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {d.ubicacion}</span>
                      <span>IP: {d.ip}</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground/30 mt-0.5 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> Último acceso: {d.ultimoAcceso}
                    </p>
                  </div>
                  {!d.actual && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast({ title: "Dispositivo eliminado", description: d.nombre })}
                      className="h-9 w-9 rounded-xl text-red-500 hover:bg-red-500/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02]">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-foreground">Consejo de Seguridad</p>
              <p className="text-[11px] text-muted-foreground/60 mt-1">
                Revisa periódicamente esta lista y elimina los dispositivos que ya no uses. Si ves un dispositivo que no reconoces,
                cierra su sesión inmediatamente y cambia tu contraseña.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
