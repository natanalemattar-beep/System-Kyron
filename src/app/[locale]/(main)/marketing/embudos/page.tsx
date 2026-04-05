"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TrendingUp, Users, Eye, ShoppingCart, CreditCard, Star, ArrowDown, Target, Loader2, Plus } from "lucide-react";
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

interface Etapa {
  id: number;
  nombre: string;
  total: number;
  orden: number;
  color: string;
  bg: string;
}

interface Embudo {
  id: number;
  nombre: string;
  estado: string;
  leads: number;
  conversion_global: number;
  ticket_promedio: number;
  ingreso_estimado: number;
  etapas: Etapa[];
}

const iconMap: Record<number, React.ElementType> = {
  0: Eye,
  1: Users,
  2: Target,
  3: ShoppingCart,
  4: TrendingUp,
  5: CreditCard,
  6: Star,
};

export default function EmbudosPage() {
  const [embudos, setEmbudos] = useState<Embudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/marketing/embudos");
      if (!res.ok) {
        setError(true);
        toast({ variant: "destructive", title: "Error al cargar embudos" });
        return;
      }
      const data = await res.json();
      setEmbudos(data.embudos ?? []);
      setError(false);
    } catch {
      setError(true);
      toast({ variant: "destructive", title: "Error al cargar embudos" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const body = {
      nombre: fd.get("nombre"),
      leads: parseInt(fd.get("leads") as string) || 0,
      ticket_promedio: parseFloat(fd.get("ticket_promedio") as string) || 0,
    };
    try {
      const res = await fetch("/api/marketing/embudos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast({ title: "Embudo creado exitosamente" });
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

  const totalLeads = embudos.reduce((s, e) => s + Number(e.leads), 0);
  const totalIngreso = embudos.reduce((s, e) => s + Number(e.ingreso_estimado), 0);
  const avgConversion = embudos.length > 0
    ? (embudos.reduce((s, e) => s + Number(e.conversion_global), 0) / embudos.length).toFixed(1)
    : "—";
  const totalPipeline = embudos.reduce((s, e) => s + e.etapas.reduce((es, et) => es + Number(et.total), 0), 0);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <TrendingUp className="h-3 w-3" /> EMBUDO DE VENTAS
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Embudos de <span className="text-primary italic">Conversión</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Pipeline • Etapas • Tasa de Conversión • Automatización IA
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2">
              <Plus className="h-4 w-4" /> NUEVO EMBUDO
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nuevo Embudo de Ventas</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input name="nombre" placeholder="Embudo Principal" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Leads</Label>
                  <Input name="leads" type="number" placeholder="0" />
                </div>
                <div>
                  <Label className="text-xs">Ticket Promedio (USD)</Label>
                  <Input name="ticket_promedio" type="number" step="0.01" placeholder="0" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Crear Embudo
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Leads Totales", val: totalLeads > 0 ? `${(totalLeads / 1000).toFixed(1)}K` : "0", icon: Users, color: "text-primary" },
          { label: "En Pipeline", val: totalPipeline > 0 ? `${(totalPipeline / 1000).toFixed(1)}K` : "0", icon: TrendingUp, color: "text-cyan-500" },
          { label: "Conversión Global", val: avgConversion !== "—" ? `${avgConversion}%` : "—", icon: Target, color: "text-emerald-500" },
          { label: "Ingreso Estimado", val: totalIngreso > 0 ? `USD ${(totalIngreso / 1000).toFixed(0)}K` : "—", icon: CreditCard, color: "text-amber-500" },
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
          <TrendingUp className="h-12 w-12" />
          <p className="text-xs font-semibold uppercase tracking-widest">Error al cargar datos</p>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchData(); }} className="rounded-xl text-[11px] font-semibold uppercase tracking-widest">
            Reintentar
          </Button>
        </div>
      ) : embudos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <TrendingUp className="h-12 w-12" />
          <p className="text-xs font-semibold uppercase tracking-widest">No hay embudos configurados</p>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="rounded-xl text-[11px] font-semibold uppercase tracking-widest">
            <Plus className="h-3 w-3 mr-1" /> Crear primer embudo
          </Button>
        </div>
      ) : (
        embudos.map((embudo, ei) => (
          <motion.div key={embudo.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + ei * 0.1 }}>
            <Card className="rounded-2xl overflow-hidden">
              <CardHeader className="p-6 border-b bg-muted/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold">{embudo.nombre}</CardTitle>
                    <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                      <span>Leads: <strong>{Number(embudo.leads).toLocaleString()}</strong></span>
                      <span>Conversión: <strong className="text-emerald-500">{Number(embudo.conversion_global).toFixed(1)}%</strong></span>
                      <span>Ticket: <strong>USD {Number(embudo.ticket_promedio).toLocaleString()}</strong></span>
                      <span>Ingreso: <strong className="text-primary">USD {Number(embudo.ingreso_estimado).toLocaleString()}</strong></span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{embudo.estado}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {embudo.etapas.length > 0 ? (
                  <div className="space-y-3">
                    {embudo.etapas.map((etapa, j) => {
                      const convPct = j > 0 && embudo.etapas[j - 1].total > 0
                        ? ((etapa.total / embudo.etapas[j - 1].total) * 100).toFixed(0) + "%"
                        : "100%";
                      const Icon = iconMap[j] ?? Target;
                      const widthPct = embudo.etapas[0].total > 0
                        ? Math.max(15, (etapa.total / embudo.etapas[0].total) * 100)
                        : 100;
                      return (
                        <div key={etapa.id}>
                          {j > 0 && (
                            <div className="flex items-center justify-center py-1">
                              <ArrowDown className="h-4 w-4 text-muted-foreground/30" />
                              <span className="text-[11px] font-bold text-muted-foreground ml-1">{convPct} conversión</span>
                            </div>
                          )}
                          <div
                            className={cn("flex items-center gap-3 p-4 rounded-xl border border-border/30 transition-all mx-auto", etapa.bg)}
                            style={{ width: `${widthPct}%`, minWidth: "280px" }}
                          >
                            <div className="p-2 rounded-lg bg-background/50">
                              <Icon className={cn("h-4 w-4", etapa.color)} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold">{etapa.nombre}</p>
                            </div>
                            <p className={cn("text-lg font-bold", etapa.color)}>{Number(etapa.total).toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-8">Sin etapas configuradas</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}
