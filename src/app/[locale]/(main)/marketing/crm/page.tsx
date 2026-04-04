"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Users, Plus, Search, Star, Phone, Mail, Building2, TrendingUp, Download, Loader2 } from "lucide-react";
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

interface Cliente {
  id: number;
  tipo: string;
  razon_social: string | null;
  rif: string | null;
  nombre_contacto: string | null;
  cedula_contacto: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  estado: string | null;
  municipio: string | null;
  activo: boolean;
  segmento: string | null;
  valor_estimado: number;
  satisfaccion: number | null;
  created_at: string;
}

export default function CRMPage() {
  const [search, setSearch] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formTipo, setFormTipo] = useState("juridico");
  const { toast } = useToast();

  const fetchClientes = useCallback(async () => {
    try {
      const res = await fetch("/api/clientes");
      if (!res.ok) {
        setError(true);
        toast({ variant: "destructive", title: "Error al cargar clientes" });
        return;
      }
      const data = await res.json();
      setClientes(data.clientes ?? []);
      setError(false);
    } catch {
      setError(true);
      toast({ variant: "destructive", title: "Error al cargar clientes" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchClientes(); }, [fetchClientes]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const body = {
      tipo: formTipo,
      razon_social: fd.get("razon_social") || null,
      rif: fd.get("rif") || null,
      nombre_contacto: fd.get("nombre_contacto") || null,
      telefono: fd.get("telefono") || null,
      email: fd.get("email") || null,
      segmento: fd.get("segmento") || null,
      valor_estimado: parseFloat(fd.get("valor_estimado") as string) || 0,
      satisfaccion: parseInt(fd.get("satisfaccion") as string) || null,
    };
    try {
      const res = await fetch("/api/clientes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast({ title: "Cliente creado exitosamente" });
        setDialogOpen(false);
        fetchClientes();
      } else {
        const err = await res.json();
        toast({ variant: "destructive", title: err.error || "Error al crear cliente" });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  const filteredClients = clientes.filter(c =>
    !search || (c.razon_social ?? "").toLowerCase().includes(search.toLowerCase()) || (c.rif ?? "").includes(search) || (c.nombre_contacto ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const activos = clientes.filter(c => c.activo).length;
  const totalValor = clientes.reduce((s, c) => s + Number(c.valor_estimado || 0), 0);
  const avgSatisfaccion = clientes.filter(c => c.satisfaccion).length > 0
    ? (clientes.reduce((s, c) => s + (c.satisfaccion || 0), 0) / clientes.filter(c => c.satisfaccion).length).toFixed(1)
    : "—";
  const retRate = clientes.length > 0 ? Math.round((activos / clientes.length) * 100) + "%" : "—";

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Users className="h-3 w-3" /> CRM EMPRESARIAL
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            CRM de <span className="text-primary italic">Clientes</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Base de Datos • Segmentación • Seguimiento • Fidelización • IA
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
                <Plus className="h-4 w-4" /> NUEVO CLIENTE
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nuevo Cliente</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Razón Social</Label>
                    <Input name="razon_social" placeholder="Nombre de la empresa" />
                  </div>
                  <div>
                    <Label className="text-xs">RIF</Label>
                    <Input name="rif" placeholder="J-12345678-9" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Contacto</Label>
                    <Input name="nombre_contacto" placeholder="Nombre del contacto" />
                  </div>
                  <div>
                    <Label className="text-xs">Tipo</Label>
                    <Select value={formTipo} onValueChange={setFormTipo}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juridico">Jurídico</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="proveedor">Proveedor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Email</Label>
                    <Input name="email" type="email" placeholder="email@ejemplo.com" />
                  </div>
                  <div>
                    <Label className="text-xs">Teléfono</Label>
                    <Input name="telefono" placeholder="+58 412-000-0000" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Segmento</Label>
                    <Input name="segmento" placeholder="Corporativo" />
                  </div>
                  <div>
                    <Label className="text-xs">Valor (USD)</Label>
                    <Input name="valor_estimado" type="number" step="0.01" min="0" placeholder="0" />
                  </div>
                  <div>
                    <Label className="text-xs">Satisfacción (1-5)</Label>
                    <Input name="satisfaccion" type="number" min="1" max="5" placeholder="5" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Crear Cliente
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Clientes Activos", val: activos.toString(), icon: Users, color: "text-primary" },
          { label: "Valor Total", val: totalValor > 0 ? `USD ${(totalValor / 1000).toFixed(1)}K` : "—", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Satisfacción", val: avgSatisfaccion !== "—" ? `${avgSatisfaccion}/5` : "—", icon: Star, color: "text-amber-500" },
          { label: "Tasa Retención", val: retRate, icon: Building2, color: "text-cyan-500" },
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por nombre, RIF o contacto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Users className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">Error al cargar datos</p>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchClientes(); }} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
            Reintentar
          </Button>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground/40">
          <Users className="h-12 w-12" />
          <p className="text-xs font-black uppercase tracking-widest">
            {clientes.length === 0 ? "No hay clientes registrados" : "Sin resultados para la búsqueda"}
          </p>
          {clientes.length === 0 && (
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="rounded-xl text-[9px] font-black uppercase tracking-widest">
              <Plus className="h-3 w-3 mr-1" /> Crear primer cliente
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClients.map((cliente, i) => (
            <motion.div key={cliente.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4 p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                    {(cliente.razon_social ?? cliente.nombre_contacto ?? "?").split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold truncate">{cliente.razon_social ?? cliente.nombre_contacto ?? "Sin nombre"}</p>
                      <Badge className={cn("text-[8px] font-bold", cliente.activo ? "bg-emerald-500/10 text-emerald-500" : "bg-muted/50 text-muted-foreground")}>
                        {cliente.activo ? "activo" : "inactivo"}
                      </Badge>
                      {cliente.segmento && <Badge className="text-[8px] font-bold bg-muted/30">{cliente.segmento}</Badge>}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{cliente.nombre_contacto ?? ""}{cliente.rif ? ` • ${cliente.rif}` : ""}</p>
                    <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
                      {cliente.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {cliente.email}</span>}
                      {cliente.telefono && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {cliente.telefono}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-primary">
                      {Number(cliente.valor_estimado) > 0 ? `USD ${Number(cliente.valor_estimado).toLocaleString()}` : "—"}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {new Date(cliente.created_at).toLocaleDateString("es-VE")}
                    </p>
                    {cliente.satisfaccion && (
                      <div className="flex gap-0.5 justify-end mt-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={cn("h-3 w-3", j < (cliente.satisfaccion ?? 0) ? "text-amber-500 fill-amber-500" : "text-muted-foreground/20")} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
