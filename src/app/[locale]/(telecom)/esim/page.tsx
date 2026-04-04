"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScanLine, Smartphone, Shield, Plus,
  CircleCheck, RefreshCw, Signal, Wifi, Loader2, Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface LineaTelecom {
  id: number;
  numero: string;
  operadora: string;
  tipo_linea: string;
  titular: string | null;
  plan_contratado: string | null;
  activa: boolean;
  fecha_activacion: string | null;
}


export default function ESimPage() {
  const { toast } = useToast();
  const [activando, setActivando] = useState(false);
  const [lineas, setLineas] = useState<LineaTelecom[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/telecom')
      .then(r => r.ok ? r.json() : { lineas: [] })
      .then(d => {
        const esims = (d.lineas ?? []).filter((l: LineaTelecom) => l.tipo_linea === 'esim' || l.tipo_linea === 'datos');
        setLineas(esims);
      })
      .catch(() => setLineas([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleNuevaEsim = async () => {
    setActivando(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "telecom", subcategoria: "esim", descripcion: "Solicitud de nueva eSIM digital" }),
      });
      if (res.ok) {
        toast({ title: "Solicitud registrada", description: "Tu nueva eSIM está siendo generada. Recibirás el código QR por correo.", action: <CircleCheck className="h-4 w-4 text-emerald-500" /> });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo procesar la solicitud." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setActivando(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScanLine className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">eSIM Digital</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Gestión de tus perfiles eSIM con activación instantánea.</p>
        </div>
        <Button onClick={handleNuevaEsim} disabled={activando} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          {activando ? <><RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Procesando...</> : <><Plus className="mr-1.5 h-3.5 w-3.5" /> Nueva eSIM</>}
        </Button>
      </header>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Mis eSIMs Activas</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-semibold">Cargando eSIMs...</span>
          </div>
        ) : lineas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <Inbox className="h-10 w-10 opacity-30" />
            <p className="text-sm font-bold">Sin eSIMs registradas</p>
            <p className="text-xs text-center max-w-xs">No tienes eSIMs activas. Solicita una nueva eSIM digital para comenzar.</p>
            <Button onClick={handleNuevaEsim} disabled={activando} size="sm" className="mt-2 rounded-lg text-xs">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Solicitar Primera eSIM
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {lineas.map((esim, i) => (
              <motion.div key={esim.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="kyron-surface border-none rounded-2xl overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                          <Smartphone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{esim.plan_contratado ?? 'eSIM'}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{esim.numero}</p>
                        </div>
                      </div>
                      <Badge className={cn("text-[9px] font-bold", esim.activa ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted/50 text-muted-foreground")}>
                        {esim.activa ? "ACTIVA" : "INACTIVA"}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">Operadora</span>
                        <span className="font-bold text-foreground">{esim.operadora}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">Titular</span>
                        <span className="font-bold text-foreground">{esim.titular ?? '—'}</span>
                      </div>
                      {esim.fecha_activacion && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground font-medium">Activación</span>
                          <span className="font-bold text-foreground">{new Date(esim.fecha_activacion).toLocaleDateString('es-VE')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/30">
                      <Signal className="h-3.5 w-3.5 text-emerald-500" />
                      <Wifi className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-auto">
                        <Shield className="h-3 w-3 inline mr-1 text-primary" /> Perfil Cifrado
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Card className="kyron-surface border-none rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-border/30">
          <CardTitle className="text-xs font-bold uppercase tracking-widest">Cómo Activar una eSIM</CardTitle>
          <CardDescription className="text-[10px] mt-0.5">Solicita una eSIM y recibirás instrucciones de activación por correo electrónico.</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { paso: 1, titulo: "Solicitar eSIM", desc: "Genera un perfil digital desde esta plataforma." },
              { paso: 2, titulo: "Escanear QR", desc: "Abre la cámara de tu dispositivo y escanea el código QR." },
              { paso: 3, titulo: "Configurar APN", desc: "El equipo configura automáticamente la red 5G." },
              { paso: 4, titulo: "Activar Línea", desc: "Tu eSIM estará operativa en menos de 5 minutos." },
            ].map((paso) => (
              <div key={paso.paso} className="flex flex-col gap-3 p-4 rounded-xl bg-muted/20 border border-border/30">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black">
                  {paso.paso}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{paso.titulo}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
