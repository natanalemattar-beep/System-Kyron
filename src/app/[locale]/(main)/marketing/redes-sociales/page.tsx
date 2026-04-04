"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Globe, Users, Heart, Share2, Eye, Calendar, Loader2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface RedSocial {
  id: number;
  nombre: string;
  handle: string | null;
  seguidores: number;
  crecimiento: number;
  alcance: number;
  engagement: number;
  publicaciones: number;
  mejor_post: string | null;
  color: string;
  bg: string;
  border_color: string;
}

export default function RedesSocialesPage() {
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/marketing/redes-sociales");
      if (!res.ok) {
        setError(true);
        toast({ variant: "destructive", title: "Error al cargar redes" });
        return;
      }
      const data = await res.json();
      setRedes(data.redes ?? []);
      setError(false);
    } catch {
      setError(true);
      toast({ variant: "destructive", title: "Error al cargar redes" });
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
      handle: fd.get("handle") || null,
      seguidores: parseInt(fd.get("seguidores") as string) || 0,
      crecimiento: parseFloat(fd.get("crecimiento") as string) || 0,
      alcance: parseInt(fd.get("alcance") as string) || 0,
      engagement: parseFloat(fd.get("engagement") as string) || 0,
      publicaciones: parseInt(fd.get("publicaciones") as string) || 0,
    };
    try {
      const res = await fetch("/api/marketing/redes-sociales", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast({ title: "Red social añadida" });
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

  const totalSeguidores = redes.reduce((s, r) => s + Number(r.seguidores), 0);
  const totalAlcance = redes.reduce((s, r) => s + Number(r.alcance), 0);
  const avgEngagement = redes.length > 0
    ? (redes.reduce((s, r) => s + Number(r.engagement), 0) / redes.length).toFixed(1)
    : "—";
  const totalPubs = redes.reduce((s, r) => s + Number(r.publicaciones), 0);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Globe className="h-3 w-3" /> SOCIAL MEDIA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Redes <span className="text-primary italic">Sociales</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Multi-plataforma • Analítica • Engagement • Publicaciones IA • Calendario
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
              <Plus className="h-4 w-4" /> AÑADIR RED SOCIAL
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Añadir Red Social</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Plataforma</Label>
                  <Input name="nombre" placeholder="Instagram" required />
                </div>
                <div>
                  <Label className="text-xs">Handle</Label>
                  <Input name="handle" placeholder="@cuenta" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Seguidores</Label>
                  <Input name="seguidores" type="number" placeholder="0" />
                </div>
                <div>
                  <Label className="text-xs">Crecimiento %</Label>
                  <Input name="crecimiento" type="number" step="0.1" placeholder="0" />
                </div>
                <div>
                  <Label className="text-xs">Engagement %</Label>
                  <Input name="engagement" type="number" step="0.1" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Alcance</Label>
                  <Input name="alcance" type="number" placeholder="0" />
                </div>
                <div>
                  <Label className="text-xs">Publicaciones</Label>
                  <Input name="publicaciones" type="number" placeholder="0" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Añadir Red Social
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Seguidores Total", val: totalSeguidores > 0 ? `${(totalSeguidores / 1000).toFixed(1)}K` : "0", icon: Users, color: "text-primary" },
          { label: "Alcance Mensual", val: totalAlcance > 0 ? `${(totalAlcance / 1000).toFixed(0)}K` : "0", icon: Eye, color: "text-emerald-500" },
          { label: "Engagement Prom.", val: avgEngagement !== "—" ? `${avgEngagement}%` : "—", icon: Heart, color: "text-rose-500" },
          { label: "Publicaciones/Mes", val: totalPubs.toString(), icon: Share2, color: "text-cyan-500" },
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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Globe className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">Error al cargar datos</p>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchData(); }} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
            Reintentar
          </Button>
        </div>
      ) : redes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Globe className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">No hay redes sociales configuradas</p>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
            <Plus className="h-3 w-3 mr-1" /> Añadir primera red social
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {redes.map((red, i) => (
            <motion.div key={red.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className={cn("rounded-2xl overflow-hidden border", red.border_color || "border-primary/20")}>
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className={cn("text-sm font-bold", red.color || "text-primary")}>{red.nombre}</CardTitle>
                      <p className="text-[10px] text-muted-foreground">{red.handle ?? "—"}</p>
                    </div>
                    <Badge className="text-[9px] font-bold bg-emerald-500/10 text-emerald-500">
                      {Number(red.crecimiento) > 0 ? "+" : ""}{Number(red.crecimiento).toFixed(1)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Seguidores</p>
                      <p className={cn("text-lg font-black", red.color || "text-primary")}>{Number(red.seguidores).toLocaleString()}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Alcance</p>
                      <p className="text-lg font-black">{(Number(red.alcance) / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Engagement</span>
                    <span className={cn("text-xs font-bold", red.color || "text-primary")}>{Number(red.engagement).toFixed(1)}%</span>
                  </div>
                  <Progress value={Number(red.engagement) * 10} className="h-1.5" />
                  {red.mejor_post && (
                    <div className="p-2.5 rounded-lg bg-muted/10 border border-border/30">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Mejor Post</p>
                      <p className="text-[11px] font-medium">{red.mejor_post}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground text-center">{Number(red.publicaciones)} publicaciones este mes</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
