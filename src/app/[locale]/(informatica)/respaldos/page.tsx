"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FolderArchive, HardDrive, Cloud, CheckCircle, Clock, Database, Server, Zap, Shield, Loader2, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SolicitudRespaldo {
  id: number;
  subcategoria: string | null;
  descripcion: string | null;
  estado: string;
  created_at: string;
}

const estadoBadge: Record<string, string> = {
  pendiente: "bg-amber-500/10 text-amber-500",
  en_proceso: "bg-primary/10 text-primary",
  exitoso: "bg-emerald-500/10 text-emerald-500",
  fallido: "bg-rose-500/10 text-rose-500",
  completado: "bg-emerald-500/10 text-emerald-500",
  rechazado: "bg-rose-500/10 text-rose-500",
};

const estadoLabel: Record<string, string> = {
  pendiente: "En Cola",
  en_proceso: "En Proceso",
  exitoso: "Exitoso",
  fallido: "Fallido",
  completado: "Completado",
  rechazado: "Error",
};

function formatFecha(iso: string) {
  return new Date(iso).toLocaleString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function RespaldosPage() {
  const { toast } = useToast();
  const [solicitudes, setSolicitudes] = useState<SolicitudRespaldo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/respaldos-it?limit=50')
      .then(r => r.ok ? r.json() : { respaldos: [] })
      .then(d => setSolicitudes((d.respaldos ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as number,
        subcategoria: (r.tipo as string) ?? 'completo',
        descripcion: (r.nombre as string) ?? '',
        estado: (r.estado as string) ?? 'pendiente',
        created_at: (r.created_at as string) ?? '',
      }))))
      .catch(() => setSolicitudes([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleRespaldo = async () => {
    try {
      const res = await fetch('/api/respaldos-it', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: `Respaldo manual ${new Date().toLocaleDateString('es-VE')}`, tipo: 'completo', destino: 'local' }),
      });
      if (res.ok) {
        toast({ title: "Respaldo Manual Iniciado", description: "Ejecutando respaldo completo de todos los sistemas." });
        loadData();
      } else {
        toast({ title: "Error", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <FolderArchive className="h-3 w-3" /> RESPALDOS Y BACKUP
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Respaldos y <span className="text-primary italic">Recuperación</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Backup Automático • Cifrado AES-256 • DR Plan • Retención Legal
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2" onClick={handleRespaldo}>
          <Zap className="h-4 w-4" /> RESPALDO AHORA
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Respaldos Registrados", val: loading ? "—" : String(solicitudes.length), icon: Clock, color: "text-emerald-500" },
          { label: "Retención Máxima", val: "10 años", icon: HardDrive, color: "text-primary" },
          { label: "Tipo Principal", val: "3-2-1", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Cifrado", val: "AES-256", icon: Cloud, color: "text-cyan-500" },
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

      <Card className="rounded-xl overflow-hidden">
        <CardHeader className="p-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Database className="h-4 w-4 text-primary" /></div>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Historial de Respaldos Solicitados</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando historial...</span>
            </div>
          ) : solicitudes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-bold">Sin respaldos registrados</p>
              <p className="text-xs text-center max-w-xs">Usa el botón "Respaldo Ahora" para iniciar un respaldo manual y registrarlo en el sistema.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {solicitudes.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-5 hover:bg-muted/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <Server className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold capitalize">{s.subcategoria?.replace(/_/g, ' ') ?? 'Respaldo Manual'}</p>
                      <p className="text-xs text-muted-foreground">{s.descripcion ?? '—'} · {formatFecha(s.created_at)}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[8px] font-bold", estadoBadge[s.estado] ?? "bg-muted/30")}>
                    {estadoLabel[s.estado] ?? s.estado}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl p-6 border border-border/50 bg-primary/5">
        <div className="flex items-start gap-4">
          <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Política de Respaldos del Sistema</h3>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>• Base de datos: Respaldo incremental cada 6 horas con cifrado AES-256 (Cloud + NAS)</li>
              <li>• Archivos del sistema: Imagen completa diaria en almacenamiento RAID-5</li>
              <li>• Documentos fiscales: Retención de 10 años según COT Art. 56</li>
              <li>• Correo electrónico: Respaldo incremental cada 12 horas con archivo de cumplimiento</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
