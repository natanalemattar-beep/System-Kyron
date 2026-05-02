"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Target, Plus, Users, TrendingUp, Eye, ChartColumn, DollarSign, CheckCircle, Clock, Pause, Play, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Campana {
  id: number;
  nombre: string;
  tipo: string;
  canales: string[];
  estado: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  presupuesto: number;
  gastado: number;
  alcance: number;
  impresiones: number;
  clicks: number;
  conversiones: number;
  roi: number;
}

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  activa: { label: "Activa", badge: "bg-emerald-500/10 text-emerald-500", icon: <Play className="h-3 w-3" /> },
  completada: { label: "Completada", badge: "bg-primary/10 text-primary", icon: <CheckCircle className="h-3 w-3" /> },
  programada: { label: "Programada", badge: "bg-amber-500/10 text-amber-500", icon: <Clock className="h-3 w-3" /> },
  pausada: { label: "Pausada", badge: "bg-rose-500/10 text-rose-500", icon: <Pause className="h-3 w-3" /> },
  borrador: { label: "Borrador", badge: "bg-muted/50 text-muted-foreground", icon: <Clock className="h-3 w-3" /> },
};

export default function CampanasPage() {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formEstado, setFormEstado] = useState("borrador");
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/marketing/campanas");
      if (!res.ok) {
        setError(true);
        toast({ variant: "destructive", title: "Error al cargar campañas" });
        return;
      }
      const json = await res.json();
      const list = json.data ?? json.campanas ?? [];
      setCampanas(list);
      setError(false);
    } catch {
      setError(true);
      toast({ variant: "destructive", title: "Error al cargar campañas" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const canalesStr = (fd.get("canales") as string) || "";
    const body = {
      nombre: fd.get("nombre"),
      tipo: fd.get("tipo") || "Digital",
      canales: canalesStr.split(",").map(c => c.trim()).filter(Boolean),
      estado: formEstado,
      fecha_inicio: fd.get("fecha_inicio") || null,
      fecha_fin: fd.get("fecha_fin") || null,
      presupuesto: parseFloat(fd.get("presupuesto") as string) || 0,
    };
    try {
      const res = await fetch("/api/marketing/campanas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast({ title: "Campaña creada exitosamente" });
        setDialogOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        toast({ variant: "destructive", title: err.error || "Error" });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  const activasCount = campanas.filter(c => c.estado === "activa").length;
  const totalAlcance = campanas.reduce((s, c) => s + Number(c.alcance), 0);
  const totalConversiones = campanas.reduce((s, c) => s + Number(c.conversiones), 0);
  const avgRoi = campanas.length > 0 ? (campanas.reduce((s, c) => s + Number(c.roi), 0) / campanas.length).toFixed(0) : "—";

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("es-VE") : "—";

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Target className="h-3 w-3" /> CAMPAÑAS MARKETING
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Gestión de <span className="text-primary italic">Campañas</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Multi-canal • Automatización IA • ROI en Tiempo Real • A/B Testing
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2">
              <Plus className="h-4 w-4" /> NUEVA CAMPAÑA
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Campaña de Marketing</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input name="nombre" placeholder="Black Friday 2026" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Tipo</Label>
                  <Input name="tipo" placeholder="Multi-canal" defaultValue="Digital" />
                </div>
                <div>
                  <Label className="text-xs">Estado</Label>
                  <Select value={formEstado} onValueChange={setFormEstado}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="programada">Programada</SelectItem>
                      <SelectItem value="activa">Activa</SelectItem>
                      <SelectItem value="pausada">Pausada</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Canales (separados por coma)</Label>
                <Input name="canales" placeholder="Email, SMS, WhatsApp" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Fecha Inicio</Label>
                  <Input name="fecha_inicio" type="date" />
                </div>
                <div>
                  <Label className="text-xs">Fecha Fin</Label>
                  <Input name="fecha_fin" type="date" />
                </div>
                <div>
                  <Label className="text-xs">Presupuesto (USD)</Label>
                  <Input name="presupuesto" type="number" step="0.01" min="0" placeholder="0" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Crear Campaña
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Campañas Activas", val: activasCount.toString(), icon: Target, color: "text-primary" },
          { label: "Alcance Total", val: totalAlcance > 0 ? `${(totalAlcance / 1000).toFixed(1)}K` : "0", icon: Users, color: "text-emerald-500" },
          { label: "Conversiones", val: totalConversiones.toLocaleString(), icon: TrendingUp, color: "text-cyan-500" },
          { label: "ROI Promedio", val: avgRoi !== "—" ? `${Number(avgRoi) > 0 ? "+" : ""}${avgRoi}%` : "—", icon: DollarSign, color: "text-amber-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Target className="h-12 w-12" />
          <p className="text-xs font-semibold uppercase tracking-widest">Error al cargar datos</p>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchData(); }} className="rounded-xl text-[11px] font-semibold uppercase tracking-widest">
            Reintentar
          </Button>
        </div>
      ) : campanas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Target className="h-12 w-12" />
          <p className="text-xs font-semibold uppercase tracking-widest">No hay campañas de marketing</p>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="rounded-xl text-[11px] font-semibold uppercase tracking-widest">
            <Plus className="h-3 w-3 mr-1" /> Crear primera campaña
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {campanas.map((camp, i) => {
            const est = estadoConfig[camp.estado] ?? estadoConfig.borrador;
            const tasaConv = camp.clicks > 0 ? ((camp.conversiones / camp.clicks) * 100).toFixed(1) + "%" : "—";
            const roiStr = Number(camp.roi) !== 0 ? `${Number(camp.roi) > 0 ? "+" : ""}${Number(camp.roi)}%` : "—";
            return (
              <motion.div key={camp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] text-muted-foreground">CMP-{String(camp.id).padStart(3, "0")}</span>
                          <Badge className={cn("text-[10px] font-bold gap-1", est.badge)}>{est.icon} {est.label}</Badge>
                          <Badge className="text-[10px] font-bold bg-primary/10 text-primary">{camp.tipo}</Badge>
                        </div>
                        <CardTitle className="text-sm font-bold">{camp.nombre}</CardTitle>
                        <div className="flex gap-2 mt-1.5">
                          {(camp.canales ?? []).map(c => (
                            <span key={c} className="text-[10px] font-bold uppercase bg-muted/50 px-2 py-0.5 rounded">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-muted-foreground">
                        <p>{fmtDate(camp.fecha_inicio)} — {fmtDate(camp.fecha_fin)}</p>
                        <p className="font-bold">USD {Number(camp.presupuesto).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      {[
                        { label: "Alcance", val: Number(camp.alcance).toLocaleString() },
                        { label: "Impresiones", val: Number(camp.impresiones).toLocaleString() },
                        { label: "Clicks", val: Number(camp.clicks).toLocaleString() },
                        { label: "Conversiones", val: `${Number(camp.conversiones).toLocaleString()} (${tasaConv})` },
                        { label: "ROI", val: roiStr },
                      ].map((m, j) => (
                        <div key={j} className="p-3 rounded-lg bg-muted/20 border border-border/30 text-center">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{m.label}</p>
                          <p className="text-sm font-bold">{m.val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                        <ChartColumn className="h-3 w-3" /> Analítica
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                        <Eye className="h-3 w-3" /> Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
