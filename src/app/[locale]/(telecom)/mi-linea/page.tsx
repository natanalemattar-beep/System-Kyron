'use client';

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger
} from "@/components/ui/dialog";
import {
  Signal, Loader2, Phone, Plus, Pencil, Trash2, Power, PowerOff,
  FileText, Calendar, DollarSign, Wifi, Activity, CircleCheck as CheckCircle
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type LineaTelecom = {
  id: number;
  numero: string;
  operadora: string;
  tipo_linea: string;
  titular: string | null;
  cedula_titular: string | null;
  plan_contratado: string | null;
  monto_plan: string;
  moneda_plan: string;
  fecha_activacion: string | null;
  fecha_vencimiento: string | null;
  activa: boolean;
  uso_datos_gb: string;
  limite_datos_gb: string | null;
  notas: string | null;
  created_at: string;
};

type FacturaTelecom = {
  id: number;
  linea_id: number | null;
  periodo: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  monto: string;
  moneda: string;
  estado: string;
  numero_factura: string | null;
  linea_numero: string | null;
  operadora: string | null;
};

const OPERADORAS = [
  { value: 'movistar', label: 'Movistar' },
  { value: 'digitel', label: 'Digitel' },
  { value: 'movilnet', label: 'Movilnet' },
  { value: 'inter', label: 'Inter' },
  { value: 'cantv', label: 'CANTV' },
  { value: 'simple', label: 'Simple' },
  { value: 'otro', label: 'Otro' },
];

const TIPOS_LINEA = [
  { value: 'prepago', label: 'Prepago' },
  { value: 'postpago', label: 'Postpago' },
  { value: 'datos', label: 'Solo Datos' },
  { value: 'wan', label: 'WAN / Internet' },
];

const ESTADO_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  pagada: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  vencida: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  en_disputa: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

const emptyForm = {
  numero: '', operadora: '', tipo_linea: 'postpago', titular: '', cedula_titular: '',
  plan_contratado: '', monto_plan: '0', moneda_plan: 'USD',
  fecha_activacion: '', fecha_vencimiento: '', limite_datos_gb: '', notas: ''
};

export default function MiLineaPage() {
  const { toast } = useToast();
  const [lineas, setLineas] = useState<LineaTelecom[]>([]);
  const [facturas, setFacturas] = useState<FacturaTelecom[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/telecom');
      if (!res.ok) throw new Error('Error al cargar datos');
      const data = await res.json();
      setLineas(data.lineas || []);
      setFacturas(data.facturas || []);
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar las líneas telefónicas.' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!form.numero || !form.operadora) {
      toast({ variant: 'destructive', title: 'Campos requeridos', description: 'Número y operadora son obligatorios.' });
      return;
    }

    setSaving(true);
    try {
      const method = editId ? 'PATCH' : 'POST';
      const payload = editId ? { id: editId, ...form } : form;
      const res = await fetch('/api/telecom', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');

      toast({
        title: editId ? 'LÍNEA ACTUALIZADA' : 'LÍNEA REGISTRADA',
        description: `Línea ${form.numero} (${OPERADORAS.find(o => o.value === form.operadora)?.label}) procesada exitosamente.`,
        action: <CheckCircle className="h-4 w-4 text-emerald-500" />
      });
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      await fetchData();
    } catch (err: unknown) {
      toast({ variant: 'destructive', title: 'Error', description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (linea: LineaTelecom) => {
    try {
      const res = await fetch('/api/telecom', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: linea.id, activa: !linea.activa }),
      });
      if (!res.ok) throw new Error('Error al actualizar estado');
      toast({
        title: linea.activa ? 'LÍNEA DESACTIVADA' : 'LÍNEA ACTIVADA',
        description: `${linea.numero} ${linea.activa ? 'desactivada' : 'activada'} correctamente.`,
      });
      await fetchData();
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cambiar el estado.' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/telecom?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      toast({ title: 'LÍNEA ELIMINADA', description: 'La línea fue eliminada del sistema.' });
      setDeleteConfirm(null);
      await fetchData();
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar la línea.' });
    }
  };

  const openEdit = (linea: LineaTelecom) => {
    setEditId(linea.id);
    setForm({
      numero: linea.numero,
      operadora: linea.operadora,
      tipo_linea: linea.tipo_linea,
      titular: linea.titular || '',
      cedula_titular: linea.cedula_titular || '',
      plan_contratado: linea.plan_contratado || '',
      monto_plan: linea.monto_plan || '0',
      moneda_plan: linea.moneda_plan || 'USD',
      fecha_activacion: linea.fecha_activacion ? linea.fecha_activacion.split('T')[0] : '',
      fecha_vencimiento: linea.fecha_vencimiento ? linea.fecha_vencimiento.split('T')[0] : '',
      limite_datos_gb: linea.limite_datos_gb || '',
      notas: linea.notas || '',
    });
    setShowForm(true);
  };

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const totalActivas = lineas.filter(l => l.activa).length;
  const totalGasto = lineas.reduce((s, l) => s + parseFloat(l.monto_plan || '0'), 0);
  const totalDatosUsados = lineas.reduce((s, l) => s + parseFloat(l.uso_datos_gb || '0'), 0);
  const facturasPendientes = facturas.filter(f => f.estado === 'pendiente').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
            Cargando líneas telefónicas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 lg:px-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-6 py-2 mt-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
            <Signal className="h-3 w-3" /> MI LÍNEA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Mis Líneas <span className="text-primary italic">Telefónicas</span>
          </h1>
          <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-[0.5em] opacity-40 mt-2 italic">
            Gestión de líneas reales · Operadoras venezolanas
          </p>
        </div>
        <Button onClick={openNew} className="h-10 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest btn-3d-primary shadow-xl">
          <Plus className="mr-2 h-4 w-4" /> Registrar Línea
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Líneas Activas", val: `${totalActivas} / ${lineas.length}`, icon: Phone, color: "text-emerald-500" },
          { label: "Datos Usados", val: `${totalDatosUsados.toFixed(1)} GB`, icon: Wifi, color: "text-blue-500" },
          { label: "Gasto Mensual", val: formatCurrency(totalGasto, 'USD'), icon: DollarSign, color: "text-primary" },
          { label: "Facturas Pendientes", val: `${facturasPendientes}`, icon: FileText, color: facturasPendientes > 0 ? "text-yellow-500" : "text-emerald-500" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-card border-none rounded-2xl p-6 shadow-2xl group hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">{stat.label}</span>
                <stat.icon className={cn("h-4 w-4 opacity-30 group-hover:opacity-100 transition-all", stat.color)} />
              </div>
              <p className={cn("text-2xl font-black italic tracking-tighter", stat.color)}>{stat.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-card border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardHeader className="p-8 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Listado de Líneas</CardTitle>
              <CardDescription className="text-[9px] font-bold uppercase opacity-40 tracking-widest italic">
                {lineas.length === 0 ? 'Sin líneas registradas' : `${lineas.length} línea${lineas.length !== 1 ? 's' : ''} registrada${lineas.length !== 1 ? 's' : ''}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {lineas.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <Phone className="h-16 w-16 text-muted-foreground/20 mx-auto" />
              <p className="text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">
                No tienes líneas registradas
              </p>
              <p className="text-xs text-muted-foreground/30">
                Registra tu primera línea telefónica venezolana para comenzar a gestionar tus servicios.
              </p>
              <Button onClick={openNew} variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest mt-4">
                <Plus className="mr-2 h-4 w-4" /> Registrar Mi Primera Línea
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-border">
                    <TableHead className="pl-8 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Número</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Operadora</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Tipo</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Titular</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Plan</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-right">Monto</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-center">Datos</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-center">Estado</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-right pr-8">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineas.map((linea) => {
                    const usoGB = parseFloat(linea.uso_datos_gb || '0');
                    const limiteGB = linea.limite_datos_gb ? parseFloat(linea.limite_datos_gb) : null;
                    const pctUso = limiteGB ? (usoGB / limiteGB) * 100 : 0;
                    const operadoraLabel = OPERADORAS.find(o => o.value === linea.operadora)?.label || linea.operadora;
                    const tipoLabel = TIPOS_LINEA.find(t => t.value === linea.tipo_linea)?.label || linea.tipo_linea;

                    return (
                      <TableRow key={linea.id} className="border-border hover:bg-muted/10 transition-all group">
                        <TableCell className="pl-8 py-5">
                          <p className="font-black text-xs text-foreground italic group-hover:text-primary transition-colors">
                            {linea.numero}
                          </p>
                          {linea.cedula_titular && (
                            <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                              CI: {linea.cedula_titular}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest px-3">
                            {operadoraLabel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[9px] font-bold uppercase text-muted-foreground/60 tracking-widest">
                          {tipoLabel}
                        </TableCell>
                        <TableCell className="text-[10px] font-bold text-foreground/80">
                          {linea.titular || '—'}
                        </TableCell>
                        <TableCell className="text-[9px] font-bold uppercase text-muted-foreground/60">
                          {linea.plan_contratado || '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-black text-xs italic text-primary">
                            {formatCurrency(parseFloat(linea.monto_plan || '0'), linea.moneda_plan || 'USD')}
                          </span>
                          <span className="text-[8px] text-muted-foreground/40 ml-1">/{linea.moneda_plan === 'VES' ? 'Bs' : 'USD'}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {limiteGB ? (
                            <div className="space-y-1">
                              <p className={cn("font-black text-[10px] italic", pctUso > 90 ? "text-rose-500" : "text-emerald-600")}>
                                {usoGB.toFixed(1)} / {limiteGB} GB
                              </p>
                              <div className="h-1 w-full bg-muted rounded-full overflow-hidden max-w-20 mx-auto">
                                <div className={cn("h-full rounded-full", pctUso > 90 ? "bg-rose-500" : "bg-primary")} style={{ width: `${Math.min(pctUso, 100)}%` }} />
                              </div>
                            </div>
                          ) : (
                            <span className="text-[9px] text-muted-foreground/40">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className={cn("h-2 w-2 rounded-full shadow-glow-sm", linea.activa ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                              {linea.activa ? 'Activa' : 'Inactiva'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost" size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary"
                              onClick={() => openEdit(linea)}
                              title="Editar"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              className={cn("h-8 w-8 rounded-lg", linea.activa ? "hover:bg-rose-500/10 hover:text-rose-500" : "hover:bg-emerald-500/10 hover:text-emerald-500")}
                              onClick={() => handleToggleActive(linea)}
                              title={linea.activa ? 'Desactivar' : 'Activar'}
                            >
                              {linea.activa ? <PowerOff className="h-3.5 w-3.5" /> : <Power className="h-3.5 w-3.5" />}
                            </Button>
                            <Dialog open={deleteConfirm === linea.id} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost" size="icon"
                                  className="h-8 w-8 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500"
                                  onClick={() => setDeleteConfirm(linea.id)}
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card border-border rounded-2xl">
                                <DialogHeader>
                                  <DialogTitle className="font-black uppercase text-foreground">Confirmar Eliminación</DialogTitle>
                                  <DialogDescription>
                                    ¿Estás seguro de eliminar la línea <strong>{linea.numero}</strong> ({operadoraLabel})?
                                    Esta acción no se puede deshacer.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="gap-2">
                                  <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-xl">Cancelar</Button>
                                  <Button variant="destructive" onClick={() => handleDelete(linea.id)} className="rounded-xl font-black uppercase text-[10px] tracking-widest">
                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {facturas.length > 0 && (
        <Card className="glass-card border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-8 border-b border-border bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Facturas Recientes</CardTitle>
                <CardDescription className="text-[9px] font-bold uppercase opacity-40 tracking-widest italic">
                  Últimas {facturas.length} factura{facturas.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-border">
                    <TableHead className="pl-8 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Nro. Factura</TableHead>
                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Línea</TableHead>
                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Período</TableHead>
                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Emisión</TableHead>
                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-right">Monto</TableHead>
                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 text-center pr-8">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facturas.map((f) => (
                    <TableRow key={f.id} className="border-border hover:bg-muted/10">
                      <TableCell className="pl-8 text-[10px] font-bold text-foreground/80">
                        {f.numero_factura || `FAC-${f.id}`}
                      </TableCell>
                      <TableCell>
                        <p className="text-[10px] font-bold text-foreground/70">{f.linea_numero || '—'}</p>
                        {f.operadora && <p className="text-[8px] text-muted-foreground/40 uppercase">{f.operadora}</p>}
                      </TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground/60">{f.periodo}</TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground/60">
                        {new Date(f.fecha_emision).toLocaleDateString('es-VE')}
                      </TableCell>
                      <TableCell className="text-right font-black text-xs italic text-primary">
                        {formatCurrency(parseFloat(f.monto), f.moneda || 'USD')}
                      </TableCell>
                      <TableCell className="text-center pr-8">
                        <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest px-3", ESTADO_COLORS[f.estado] || '')}>
                          {f.estado.toUpperCase().replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditId(null); setForm(emptyForm); } }}>
        <DialogContent className="bg-card border-border rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-tighter text-foreground">
              {editId ? 'Editar Línea Telefónica' : 'Registrar Nueva Línea'}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              {editId ? 'Modifica los datos de tu línea' : 'Registra una línea telefónica venezolana real'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Número *</Label>
                <Input
                  placeholder="0414-1234567"
                  value={form.numero}
                  onChange={(e) => setForm(f => ({ ...f, numero: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Operadora *</Label>
                <Select value={form.operadora} onValueChange={(v) => setForm(f => ({ ...f, operadora: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border text-xs">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERADORAS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Tipo de Línea</Label>
                <Select value={form.tipo_linea} onValueChange={(v) => setForm(f => ({ ...f, tipo_linea: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_LINEA.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Moneda Plan</Label>
                <Select value={form.moneda_plan} onValueChange={(v) => setForm(f => ({ ...f, moneda_plan: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="VES">Bs (VES)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Titular</Label>
                <Input
                  placeholder="Nombre del titular"
                  value={form.titular}
                  onChange={(e) => setForm(f => ({ ...f, titular: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Cédula Titular</Label>
                <Input
                  placeholder="V-12345678"
                  value={form.cedula_titular}
                  onChange={(e) => setForm(f => ({ ...f, cedula_titular: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Plan Contratado</Label>
                <Input
                  placeholder="Ej: Plan Plus 30GB"
                  value={form.plan_contratado}
                  onChange={(e) => setForm(f => ({ ...f, plan_contratado: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Monto Mensual</Label>
                <Input
                  type="number" step="0.01" min="0"
                  placeholder="0.00"
                  value={form.monto_plan}
                  onChange={(e) => setForm(f => ({ ...f, monto_plan: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Fecha Activación</Label>
                <Input
                  type="date"
                  value={form.fecha_activacion}
                  onChange={(e) => setForm(f => ({ ...f, fecha_activacion: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Vencimiento</Label>
                <Input
                  type="date"
                  value={form.fecha_vencimiento}
                  onChange={(e) => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Límite Datos (GB)</Label>
                <Input
                  type="number" step="0.1" min="0"
                  placeholder="Ej: 30"
                  value={form.limite_datos_gb}
                  onChange={(e) => setForm(f => ({ ...f, limite_datos_gb: e.target.value }))}
                  className="h-11 rounded-xl bg-muted/20 border-border text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Notas</Label>
              <Input
                placeholder="Notas adicionales sobre esta línea..."
                value={form.notas}
                onChange={(e) => setForm(f => ({ ...f, notas: e.target.value }))}
                className="h-11 rounded-xl bg-muted/20 border-border text-xs"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }} className="rounded-xl" disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving} className="rounded-xl font-black uppercase text-[10px] tracking-widest btn-3d-primary">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
              {editId ? 'Guardar Cambios' : 'Registrar Línea'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
