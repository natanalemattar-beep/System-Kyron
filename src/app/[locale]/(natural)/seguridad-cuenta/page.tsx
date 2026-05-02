"use client";

import { useState, useEffect, useCallback } from "react";
import { Shield, ShieldCheck, ShieldAlert, Lock, KeyRound, Smartphone, Monitor, Fingerprint, Clock, CircleCheck, TriangleAlert, Bell, Globe, LogOut, History, Key, Loader2, RefreshCw, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SesionActiva {
  id: number;
  dispositivo: string;
  ip: string;
  creada: string;
  actual: boolean;
  tipo: 'mobile' | 'desktop';
}

interface EventoSeguridad {
  accion: string;
  fecha: string;
  ip: string;
  riesgo: string;
  estado: string;
}

interface DatosSeguridad {
  usuario: {
    email: string;
    nombre: string;
    creado: string;
    emailVerificado: boolean;
    telefonoVerificado: boolean;
    telefono: string | null;
    ultimoLogin: string | null;
  };
  configuracion: {
    notifEmail: boolean;
    notifWhatsapp: boolean;
    notifSms: boolean;
  };
  sesiones: SesionActiva[];
  historial: EventoSeguridad[];
  estadisticas: {
    totalSesiones: number;
    totalEventos: number;
    eventosAltos: number;
  };
}

const opcionesSeguridad = [
  { id: "2fa", nombre: "Verificación en dos pasos (2FA)", descripcion: "Requiere un código adicional cada vez que inicias sesión desde un dispositivo nuevo", icono: KeyRound },
  { id: "alertas", nombre: "Alertas de inicio de sesión", descripcion: "Recibe un correo cuando se detecta un inicio de sesión desde un dispositivo o ubicación desconocida", icono: Bell },
  { id: "geo", nombre: "Restricción geográfica", descripcion: "Bloquea automáticamente intentos de inicio de sesión desde países no autorizados", icono: Globe },
  { id: "timeout", nombre: "Cierre de sesión por inactividad", descripcion: "La sesión se cierra automáticamente después de 30 minutos sin actividad", icono: Clock },
  { id: "biometrico", nombre: "Autenticación biométrica", descripcion: "Huella digital o reconocimiento facial para confirmar operaciones sensibles", icono: Fingerprint },
  { id: "preguntas", nombre: "Preguntas de seguridad", descripcion: "Verificación adicional mediante preguntas personales para recuperación de cuenta", icono: Key },
];

function formatFecha(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch {
    return iso;
  }
}

function tiempoRelativo(iso: string): string {
  try {
    const d = new Date(iso);
    const ahora = new Date();
    const diffMs = ahora.getTime() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Ahora mismo';
    if (mins < 60) return `Hace ${mins} min`;
    const horas = Math.floor(mins / 60);
    if (horas < 24) return `Hace ${horas}h`;
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return formatFecha(iso);
  } catch {
    return iso;
  }
}

export default function SeguridadCuentaPage() {
  const { toast } = useToast();
  const [datos, setDatos] = useState<DatosSeguridad | null>(null);
  const [loading, setLoading] = useState(true);
  const [opciones, setOpciones] = useState<Record<string, boolean>>({
    "2fa": true,
    "alertas": true,
    "geo": false,
    "timeout": true,
    "biometrico": false,
    "preguntas": true,
  });

  const fetchDatos = useCallback(async () => {
    try {
      const res = await fetch('/api/seguridad-cuenta');
      if (!res.ok) return;
      const data = await res.json();
      setDatos(data);
      if (data.configuracion) {
        setOpciones(prev => ({
          ...prev,
          alertas: data.configuracion.notifEmail,
        }));
      }
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDatos(); }, [fetchDatos]);

  const toggleOpcion = (id: string) => {
    setOpciones(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      toast({
        title: updated[id] ? "Activado" : "Desactivado",
        description: opcionesSeguridad.find(o => o.id === id)?.nombre,
      });
      return updated;
    });
  };

  const cerrarTodas = async () => {
    try {
      const res = await fetch('/api/seguridad-cuenta', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cerrarTodas: true }),
      });
      if (res.ok) {
        toast({ title: "Sesiones cerradas", description: "Las sesiones anteriores han sido invalidadas. Solo esta sesión permanece activa." });
        fetchDatos();
      } else {
        toast({ title: "Error", description: "No se pudieron cerrar las sesiones", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "No se pudieron cerrar las sesiones", variant: "destructive" });
    }
  };

  const activas = Object.values(opciones).filter(Boolean).length;
  const nivelSeguridad = Math.round((activas / opcionesSeguridad.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Seguridad de tu Cuenta</h1>
            <p className="text-sm text-muted-foreground font-medium">Protege tu cuenta y controla quién tiene acceso</p>
            {datos?.usuario && (
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                  <Mail className="h-3 w-3" />
                  <span>{datos.usuario.email}</span>
                  {datos.usuario.emailVerificado && <CircleCheck className="h-3 w-3 text-emerald-500" />}
                </div>
                {datos.usuario.telefono && (
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                    <Phone className="h-3 w-3" />
                    <span>{datos.usuario.telefono}</span>
                    {datos.usuario.telefonoVerificado && <CircleCheck className="h-3 w-3 text-emerald-500" />}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-2xl border border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-foreground">Nivel de Protección</p>
              <span className={cn(
                "text-lg font-bold",
                nivelSeguridad >= 80 ? "text-emerald-500" : nivelSeguridad >= 50 ? "text-amber-500" : "text-red-500"
              )}>{nivelSeguridad}%</span>
            </div>
            <Progress value={nivelSeguridad} className="h-2.5 rounded-full" />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] text-muted-foreground/60">
                {nivelSeguridad >= 80 ? "Tu cuenta está bien protegida" :
                 nivelSeguridad >= 50 ? "Puedes mejorar activando más opciones de seguridad" :
                 "Tu cuenta necesita más protección. Activa las opciones de abajo."}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground/40">
                {datos?.estadisticas && (
                  <>
                    <span>{datos.estadisticas.totalSesiones} sesión(es) activa(s)</span>
                    <span>•</span>
                    <span>{datos.estadisticas.totalEventos} eventos registrados</span>
                    {datos.estadisticas.eventosAltos > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-amber-500 font-bold">{datos.estadisticas.eventosAltos} alerta(s)</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
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
              {opcionesSeguridad.map((o) => (
                <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/15 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn("p-2 rounded-lg shrink-0", opciones[o.id] ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <o.icono className={cn("h-4 w-4", opciones[o.id] ? "text-emerald-500" : "text-muted-foreground/40")} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-foreground">{o.nombre}</p>
                      <p className="text-[11px] text-muted-foreground/60">{o.descripcion}</p>
                    </div>
                  </div>
                  <Switch checked={opciones[o.id]} onCheckedChange={() => toggleOpcion(o.id)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-500" /> Sesiones Activas
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={fetchDatos} className="h-6 w-6 p-0">
                    <RefreshCw className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {datos?.sesiones && datos.sesiones.length > 0 ? (
                  datos.sesiones.map((s) => (
                    <div key={s.id} className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border",
                      s.actual ? "border-emerald-500/20 bg-emerald-500/[0.03]" : "border-border/15 bg-muted/10"
                    )}>
                      <div className={cn("p-2 rounded-lg shrink-0", s.actual ? "bg-emerald-500/10" : "bg-muted/20")}>
                        {s.tipo === 'mobile' ? (
                          <Smartphone className={cn("h-4 w-4", s.actual ? "text-emerald-500" : "text-muted-foreground/50")} />
                        ) : (
                          <Monitor className={cn("h-4 w-4", s.actual ? "text-emerald-500" : "text-muted-foreground/50")} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[11px] font-bold text-foreground">{s.dispositivo}</p>
                          {s.actual && <Badge className="text-[7px] bg-emerald-500 text-white border-0">Esta sesión</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground/50">{s.ip} • {tiempoRelativo(s.creada)}</p>
                      </div>
                      {!s.actual && (
                        <Badge variant="outline" className="text-[7px] text-muted-foreground/50 border-border/20">
                          Anterior
                        </Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[11px] text-muted-foreground/50">Solo esta sesión está activa</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4 text-violet-500" /> Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {datos?.historial && datos.historial.length > 0 ? (
                  datos.historial.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/10 border border-border/10">
                      {h.estado === "ok" ? (
                        <CircleCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      ) : h.estado === "alerta" ? (
                        <TriangleAlert className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <ShieldAlert className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-foreground">{h.accion}</p>
                        <p className="text-[10px] text-muted-foreground/40">{h.ip}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-muted-foreground/30 block">{formatFecha(h.fecha)}</span>
                        {h.riesgo === 'high' && <Badge variant="outline" className="text-[6px] border-amber-500/30 text-amber-500 mt-0.5">Riesgo alto</Badge>}
                        {h.riesgo === 'critical' && <Badge variant="outline" className="text-[6px] border-red-500/30 text-red-500 mt-0.5">Crítico</Badge>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[11px] text-muted-foreground/50">No hay actividad reciente registrada</p>
                  </div>
                )}
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
                onClick={cerrarTodas}
                className="h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 justify-start px-4 text-red-500 border-red-500/20 hover:bg-red-500/5"
              >
                <LogOut className="h-4 w-4" /> Cerrar Todo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {datos?.usuario && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardContent className="p-6">
              <p className="text-sm font-bold text-foreground mb-4">Información de la Cuenta</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Correo electrónico</p>
                  <p className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                    {datos.usuario.email}
                    {datos.usuario.emailVerificado ? (
                      <Badge className="text-[7px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Verificado</Badge>
                    ) : (
                      <Badge className="text-[7px] bg-amber-500/10 text-amber-500 border-amber-500/20">Sin verificar</Badge>
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Teléfono</p>
                  <p className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                    {datos.usuario.telefono || 'No registrado'}
                    {datos.usuario.telefono && datos.usuario.telefonoVerificado && (
                      <Badge className="text-[7px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Verificado</Badge>
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Cuenta creada</p>
                  <p className="text-[12px] font-medium text-foreground">{formatFecha(datos.usuario.creado)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider">Último inicio de sesión</p>
                  <p className="text-[12px] font-medium text-foreground">
                    {datos.usuario.ultimoLogin ? formatFecha(datos.usuario.ultimoLogin) : 'Esta sesión'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
