"use client";

import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Lock, Eye, KeyRound, MonitorSmartphone, Activity, AlertTriangle, CheckCircle, RefreshCw, Fingerprint, Globe, Server, Wifi, Clock, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const protecciones = [
  { nombre: "Firewall perimetral", estado: true, descripcion: "Protección contra accesos no autorizados", icono: Shield },
  { nombre: "Cifrado de datos (AES-256)", estado: true, descripcion: "Toda la información se guarda cifrada", icono: Lock },
  { nombre: "Verificación en dos pasos (2FA)", estado: true, descripcion: "Doble confirmación para iniciar sesión", icono: KeyRound },
  { nombre: "Protección contra ataques", estado: true, descripcion: "Bloqueo automático de intentos sospechosos", icono: ShieldAlert },
  { nombre: "Copias de seguridad diarias", estado: true, descripcion: "Respaldo automático cada 24 horas", icono: Server },
  { nombre: "Conexión segura (SSL/TLS)", estado: true, descripcion: "Toda la comunicación va cifrada", icono: Globe },
  { nombre: "Control de sesiones activas", estado: true, descripcion: "Monitoreo de quién está conectado", icono: Users },
  { nombre: "Registro de todo lo que pasa", estado: true, descripcion: "Historial completo de acciones en el sistema", icono: Activity },
  { nombre: "Bloqueo por ubicación", estado: false, descripcion: "Solo permitir acceso desde Venezuela", icono: Globe },
  { nombre: "Alertas por correo", estado: true, descripcion: "Aviso cuando alguien inicia sesión desde un lugar nuevo", icono: AlertTriangle },
];

const eventosRecientes = [
  { tipo: "Inicio de sesión exitoso", usuario: "admin@kyron.ve", fecha: "03/04/2026 09:15", ip: "186.167.x.x", estado: "ok" },
  { tipo: "Contraseña cambiada", usuario: "contabilidad@kyron.ve", fecha: "02/04/2026 14:30", ip: "186.167.x.x", estado: "ok" },
  { tipo: "Intento de acceso bloqueado", usuario: "desconocido", fecha: "02/04/2026 03:12", ip: "45.33.x.x", estado: "bloqueado" },
  { tipo: "2FA activado", usuario: "rrhh@kyron.ve", fecha: "01/04/2026 11:45", ip: "186.167.x.x", estado: "ok" },
  { tipo: "Sesión cerrada por inactividad", usuario: "ventas@kyron.ve", fecha: "01/04/2026 18:00", ip: "186.167.x.x", estado: "info" },
  { tipo: "Intento de acceso bloqueado", usuario: "desconocido", fecha: "31/03/2026 22:47", ip: "91.108.x.x", estado: "bloqueado" },
];

const metricas = [
  { label: "Nivel de Protección", valor: "95%", progreso: 95, color: "text-emerald-500" },
  { label: "Amenazas Bloqueadas", valor: "147", progreso: 100, color: "text-blue-500" },
  { label: "Usuarios con 2FA", valor: "87%", progreso: 87, color: "text-amber-500" },
  { label: "Último Respaldo", valor: "Hoy", progreso: 100, color: "text-violet-500" },
];

export default function SeguridadEmpresarialPage() {
  const { toast } = useToast();
  const [proteccionesState, setProteccionesState] = useState(protecciones.map(p => p.estado));

  const toggleProteccion = (index: number) => {
    const updated = [...proteccionesState];
    updated[index] = !updated[index];
    setProteccionesState(updated);
    toast({
      title: updated[index] ? "Protección activada" : "Protección desactivada",
      description: protecciones[index].nombre,
    });
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-emerald-500 pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold uppercase tracking-wider text-emerald-500 mb-3">
            <Shield className="h-3 w-3" /> CENTRO DE SEGURIDAD
            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[7px] font-bold ml-1 animate-pulse">NUEVO</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Seguridad <span className="text-emerald-500 italic">Empresarial</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Protección Total • Cifrado • Monitoreo • Control de Accesos
          </p>
        </div>
        <Button
          onClick={() => toast({ title: "Análisis completado", description: "Todos los sistemas están protegidos" })}
          className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <RefreshCw className="h-4 w-4" /> Analizar Seguridad
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden">
              <CardContent className="p-5 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/50">{m.label}</p>
                <p className={cn("text-2xl font-bold", m.color)}>{m.valor}</p>
                <Progress value={m.progreso} className="h-1.5" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Protecciones Activas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
              {protecciones.map((p, i) => (
                <div key={p.nombre} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/15 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn("p-2 rounded-lg shrink-0", proteccionesState[i] ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <p.icono className={cn("h-4 w-4", proteccionesState[i] ? "text-emerald-500" : "text-muted-foreground/40")} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-foreground truncate">{p.nombre}</p>
                      <p className="text-[11px] text-muted-foreground/60 truncate">{p.descripcion}</p>
                    </div>
                  </div>
                  <Switch checked={proteccionesState[i]} onCheckedChange={() => toggleProteccion(i)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" /> Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
              {eventosRecientes.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/15">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    e.estado === "ok" ? "bg-emerald-500/10" : e.estado === "bloqueado" ? "bg-red-500/10" : "bg-blue-500/10"
                  )}>
                    {e.estado === "ok" ? <CheckCircle className="h-4 w-4 text-emerald-500" /> :
                     e.estado === "bloqueado" ? <ShieldAlert className="h-4 w-4 text-red-500" /> :
                     <Clock className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-foreground">{e.tipo}</p>
                    <p className="text-[11px] text-muted-foreground/60">{e.usuario} • {e.ip}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground/40">{e.fecha}</p>
                    <Badge variant="outline" className={cn(
                      "text-[7px] mt-0.5",
                      e.estado === "ok" ? "text-emerald-500 border-emerald-500/20" :
                      e.estado === "bloqueado" ? "text-red-500 border-red-500/20" :
                      "text-blue-500 border-blue-500/20"
                    )}>
                      {e.estado === "ok" ? "Correcto" : e.estado === "bloqueado" ? "Bloqueado" : "Info"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-500" /> Recomendaciones de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <Badge variant="outline" className="text-[7px] mb-2 text-amber-500 border-amber-500/20">Pendiente</Badge>
                <p className="text-[11px] font-bold text-foreground">Activar bloqueo por ubicación</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">Restringe el acceso solo desde Venezuela para mayor protección</p>
              </div>
              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <Badge variant="outline" className="text-[7px] mb-2 text-blue-500 border-blue-500/20">En progreso</Badge>
                <p className="text-[11px] font-bold text-foreground">Capacitación del equipo</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">Programa trimestral de seguridad para todos los empleados</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <Badge variant="outline" className="text-[7px] mb-2 text-emerald-500 border-emerald-500/20">72% completado</Badge>
                <p className="text-[11px] font-bold text-foreground">Certificación ISO 27001</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">Proceso de certificación en seguridad de la información</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
