"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Mail, Plus, Send, Users, Eye, MousePointer, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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

interface EmailCampaign {
  id: number;
  nombre: string;
  estado: string;
  fecha: string | null;
  destinatarios: number;
  entregados: number;
  abiertos: number;
  clicks: number;
  bajas: number;
}

interface EmailList {
  id: number;
  nombre: string;
  total: number;
  activos: number;
}

const estadoConfig: Record<string, { label: string; badge: string }> = {
  enviada: { label: "Enviada", badge: "bg-emerald-500/10 text-emerald-500" },
  automatizada: { label: "Automatizada", badge: "bg-cyan-500/10 text-cyan-500" },
  programada: { label: "Programada", badge: "bg-amber-500/10 text-amber-500" },
  borrador: { label: "Borrador", badge: "bg-muted/50 text-muted-foreground" },
};

export default function EmailMarketingPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [lists, setLists] = useState<EmailList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formEstado, setFormEstado] = useState("borrador");
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/marketing/email-campaigns");
      if (!res.ok) {
        setError(true);
        toast({ variant: "destructive", title: "Error al cargar datos" });
        return;
      }
      const data = await res.json();
      setCampaigns(data.campaigns ?? []);
      setLists(data.lists ?? []);
      setError(false);
    } catch {
      setError(true);
      toast({ variant: "destructive", title: "Error al cargar datos" });
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
      estado: formEstado,
      fecha: fd.get("fecha") || null,
      destinatarios: parseInt(fd.get("destinatarios") as string) || 0,
    };
    try {
      const res = await fetch("/api/marketing/email-campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast({ title: "Campaña de email creada" });
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

  const totalEnviados = campaigns.reduce((s, c) => s + c.destinatarios, 0);
  const totalAbiertos = campaigns.reduce((s, c) => s + c.abiertos, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalContactos = lists.reduce((s, l) => s + l.total, 0);
  const tasaApertura = totalEnviados > 0 ? ((totalAbiertos / totalEnviados) * 100).toFixed(1) + "%" : "—";
  const tasaClicks = totalEnviados > 0 ? ((totalClicks / totalEnviados) * 100).toFixed(1) + "%" : "—";

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Mail className="h-3 w-3" /> EMAIL MARKETING
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Email <span className="text-primary italic">Marketing</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Campañas • Automatización • Listas • A/B Testing • Analítica
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
              <Plus className="h-4 w-4" /> NUEVA CAMPAÑA
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Campaña de Email</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input name="nombre" placeholder="Newsletter Semanal" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Estado</Label>
                  <Select value={formEstado} onValueChange={setFormEstado}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="programada">Programada</SelectItem>
                      <SelectItem value="enviada">Enviada</SelectItem>
                      <SelectItem value="automatizada">Automatizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Fecha</Label>
                  <Input name="fecha" placeholder="01/04/2026" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Destinatarios</Label>
                <Input name="destinatarios" type="number" min="0" placeholder="0" />
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
          { label: "Emails Enviados", val: totalEnviados > 0 ? `${(totalEnviados / 1000).toFixed(1)}K` : "0", icon: Send, color: "text-primary" },
          { label: "Tasa Apertura", val: tasaApertura, icon: Eye, color: "text-emerald-500" },
          { label: "Tasa de Clicks", val: tasaClicks, icon: MousePointer, color: "text-cyan-500" },
          { label: "Contactos", val: totalContactos > 0 ? `${(totalContactos / 1000).toFixed(1)}K` : "0", icon: Users, color: "text-amber-500" },
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

      {lists.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lists.map((lista, i) => (
            <Card key={i} className="p-4 rounded-xl">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{lista.nombre}</p>
              <p className="text-lg font-black text-foreground">{lista.total.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-500 font-medium">{lista.activos.toLocaleString()} activos</p>
            </Card>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Mail className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">Error al cargar datos</p>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchData(); }} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
            Reintentar
          </Button>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Mail className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">No hay campañas de email</p>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
            <Plus className="h-3 w-3 mr-1" /> Crear primera campaña
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((camp, i) => {
            const est = estadoConfig[camp.estado] ?? estadoConfig.borrador;
            const tasaAp = camp.entregados > 0 ? ((camp.abiertos / camp.entregados) * 100).toFixed(1) + "%" : "—";
            const tasaCl = camp.entregados > 0 ? ((camp.clicks / camp.entregados) * 100).toFixed(1) + "%" : "—";
            return (
              <motion.div key={camp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="rounded-xl overflow-hidden">
                  <div className="flex items-start gap-4 p-5">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold truncate">{camp.nombre}</p>
                        <Badge className={cn("text-[8px] font-bold", est.badge)}>{est.label}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{camp.fecha ?? "—"} • {camp.destinatarios.toLocaleString()} destinatarios</p>
                      {(camp.estado === "enviada" || camp.estado === "automatizada") && (
                        <div className="grid grid-cols-4 gap-3 mt-3">
                          {[
                            { label: "Entregados", val: camp.entregados.toLocaleString() },
                            { label: "Abiertos", val: `${camp.abiertos.toLocaleString()} (${tasaAp})` },
                            { label: "Clicks", val: `${camp.clicks.toLocaleString()} (${tasaCl})` },
                            { label: "Bajas", val: camp.bajas.toString() },
                          ].map((m, j) => (
                            <div key={j} className="text-center p-2 rounded-lg bg-muted/20">
                              <p className="text-[9px] text-muted-foreground uppercase">{m.label}</p>
                              <p className="text-xs font-bold">{m.val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5 shrink-0">
                      <Eye className="h-3 w-3" /> Ver
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
