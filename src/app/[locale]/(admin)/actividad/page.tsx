"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Activity, User, FileText, Users, Landmark, CreditCard,
  BrainCircuit, Settings, RefreshCw, Filter, Shield,
  TrendingUp, LogIn, Building2, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LogEntry = {
  id: number;
  evento: string;
  categoria: string;
  descripcion: string | null;
  entidad_tipo: string | null;
  entidad_id: number | null;
  metadata: Record<string, unknown> | null;
  ip: string | null;
  creado_en: string;
};

type ResumenItem = { categoria: string; total: string };

const CATEGORIAS = [
  { id: 'todas', label: 'Todas', icon: Activity, color: 'text-foreground' },
  { id: 'auth', label: 'Acceso', icon: Shield, color: 'text-blue-500' },
  { id: 'contabilidad', label: 'Contabilidad', icon: FileText, color: 'text-primary' },
  { id: 'clientes', label: 'Clientes', icon: Users, color: 'text-purple-500' },
  { id: 'rrhh', label: 'RRHH', icon: User, color: 'text-orange-500' },
  { id: 'banco', label: 'Banco', icon: Landmark, color: 'text-emerald-500' },
  { id: 'ia', label: 'IA', icon: BrainCircuit, color: 'text-pink-500' },
  { id: 'sistema', label: 'Sistema', icon: Settings, color: 'text-muted-foreground' },
];

const EVENTO_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  REGISTRO_USUARIO: { label: 'Nuevo Usuario', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: User },
  LOGIN: { label: 'Inicio de Sesión', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: LogIn },
  NUEVA_FACTURA: { label: 'Nueva Factura', color: 'bg-primary/10 text-primary border-primary/20', icon: FileText },
  NUEVO_CLIENTE: { label: 'Nuevo Cliente', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: Building2 },
  NUEVO_EMPLEADO: { label: 'Nuevo Empleado', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20', icon: User },
  NUEVA_TRANSACCION: { label: 'Transacción', color: 'bg-teal-500/10 text-teal-600 border-teal-500/20', icon: CreditCard },
  NUEVO_MOVIMIENTO: { label: 'Mov. Bancario', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: Landmark },
  NUEVA_CUENTA_BANCARIA: { label: 'Cuenta Bancaria', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20', icon: Landmark },
  PITCH_IA: { label: 'Pitch IA', color: 'bg-pink-500/10 text-pink-600 border-pink-500/20', icon: BrainCircuit },
  PPTX_GENERADO: { label: 'PPTX Generado', color: 'bg-violet-500/10 text-violet-600 border-violet-500/20', icon: FileText },
};

function formatFecha(iso: string) {
  return new Date(iso).toLocaleString('es-VE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function tiempoRelativo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `hace ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `hace ${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h}h`;
  return `hace ${Math.floor(h / 24)}d`;
}

export default function ActividadPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [resumen, setResumen] = useState<ResumenItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null);

  const cargar = useCallback(async (cat = categoriaActiva) => {
    setCargando(true);
    try {
      const url = `/api/activity-log?limit=100${cat !== 'todas' ? `&categoria=${cat}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.logs) setLogs(data.logs);
      if (data.resumen) setResumen(data.resumen);
      setUltimaActualizacion(new Date());
    } catch {}
    finally { setCargando(false); }
  }, [categoriaActiva]);

  useEffect(() => { cargar(); }, [cargar]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => cargar(), 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, cargar]);

  const handleCategoria = (id: string) => {
    setCategoriaActiva(id);
    cargar(id);
  };

  const totalPorCategoria = (cat: string) => {
    if (cat === 'todas') return logs.length;
    const r = resumen.find(r => r.categoria === cat);
    return r ? parseInt(r.total) : 0;
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-8 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-primary pl-6 py-2 mt-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Activity className="h-3 w-3" /> REGISTRO DE ACTIVIDAD — SISTEMA
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground uppercase leading-none">
            ACTIVIDAD <span className="text-primary italic">DEL SISTEMA</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.5em] mt-1.5 italic">
            Auditoría · Eventos · Trazabilidad completa
          </p>
        </div>
        <div className="flex items-center gap-3">
          {ultimaActualizacion && (
            <p className="text-[9px] text-muted-foreground font-bold uppercase hidden md:block">
              Actualizado: {ultimaActualizacion.toLocaleTimeString('es-VE')}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className={cn("rounded-xl gap-2 text-[10px] font-black uppercase", autoRefresh && "border-emerald-500 text-emerald-600")}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <Activity className={cn("h-3.5 w-3.5", autoRefresh && "animate-pulse text-emerald-500")} />
            {autoRefresh ? 'Auto-ON' : 'Auto-OFF'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-2 text-[10px] font-black uppercase"
            onClick={() => cargar()}
            disabled={cargando}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", cargando && "animate-spin")} />
            Actualizar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Eventos', val: logs.length > 0 ? resumen.reduce((a, b) => a + parseInt(b.total), 0) : 0, icon: Activity, color: 'text-primary' },
          { label: 'Usuarios Registrados', val: resumen.find(r => r.categoria === 'auth') ? parseInt(resumen.find(r => r.categoria === 'auth')!.total) : 0, icon: User, color: 'text-blue-500' },
          { label: 'Documentos', val: resumen.find(r => r.categoria === 'contabilidad') ? parseInt(resumen.find(r => r.categoria === 'contabilidad')!.total) : 0, icon: FileText, color: 'text-primary' },
          { label: 'Categorías Activas', val: resumen.length, icon: TrendingUp, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{stat.label}</p>
              <p className={cn("text-2xl font-black italic", stat.color)}>{cargando ? '—' : stat.val}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-muted border border-border">
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIAS.map((cat) => {
          const Icon = cat.icon;
          const count = totalPorCategoria(cat.id);
          const activa = categoriaActiva === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoria(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                activa
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "bg-card/40 border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-3 w-3", activa && cat.color)} />
              {cat.label}
              {count > 0 && (
                <span className={cn("px-1.5 py-0.5 rounded-md text-[9px]", activa ? "bg-primary/20" : "bg-muted")}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {cargando && logs.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-card/30 animate-pulse border border-border" />
            ))
          ) : logs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center gap-3 text-muted-foreground"
            >
              <Activity className="h-12 w-12 opacity-20" />
              <p className="text-sm font-black uppercase tracking-widest">Sin actividad registrada</p>
              <p className="text-[10px] font-bold opacity-60">Los eventos aparecerán aquí en tiempo real</p>
            </motion.div>
          ) : (
            logs.map((log, idx) => {
              const meta = EVENTO_META[log.evento] ?? {
                label: log.evento,
                color: 'bg-muted text-foreground border-border',
                icon: Activity,
              };
              const Icon = meta.icon;
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.4) }}
                >
                  <Card className="glass-card border border-border/60 bg-card/30 rounded-2xl overflow-hidden hover:border-border hover:shadow-sm transition-all">
                    <div className="flex items-center gap-4 p-4">
                      <div className={cn("p-2.5 rounded-xl shrink-0 border", meta.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="outline" className={cn("text-[9px] font-black uppercase border rounded-lg", meta.color)}>
                            {meta.label}
                          </Badge>
                          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">
                            {log.categoria}
                          </span>
                          {log.entidad_tipo && (
                            <>
                              <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/40" />
                              <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{log.entidad_tipo}</span>
                              {log.entidad_id && (
                                <span className="text-[9px] text-muted-foreground/40">#{log.entidad_id}</span>
                              )}
                            </>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-foreground truncate">
                          {log.descripcion ?? log.evento}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-black text-muted-foreground/70 whitespace-nowrap">
                          {tiempoRelativo(log.creado_en)}
                        </p>
                        <p className="text-[9px] text-muted-foreground/40 whitespace-nowrap hidden md:block">
                          {formatFecha(log.creado_en)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {logs.length >= 100 && (
        <div className="text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Mostrando los 100 eventos más recientes
          </p>
        </div>
      )}
    </div>
  );
}
