'use client';

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
  FileText, DollarSign, Wifi, Activity, CircleCheck as CheckCircle, MoreVertical,
  RefreshCw, User, Building, Shield, Smartphone as SmartphoneIcon
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ReservaDatosPanel } from "@/components/telecom/reserva-datos-panel";
import { PLANES_MI_LINEA } from "@/lib/planes-kyron";

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
  pendiente: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  pagada: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  vencida: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  en_disputa: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
};

const emptyForm = {
  numero: '', operadora: '', tipo_linea: 'postpago', titular: '', cedula_titular: '',
  plan_contratado: '', monto_plan: '0', moneda_plan: 'USD',
  fecha_activacion: '', fecha_vencimiento: '', limite_datos_gb: '', notas: '',
  tipo_registro: 'personal' as 'personal' | 'empresarial',
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
  const [generatingNumber, setGeneratingNumber] = useState(false);

  const generateNumber = useCallback(async (tipo: 'personal' | 'empresarial') => {
    setGeneratingNumber(true);
    try {
      const res = await fetch('/api/telecom/generate-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm(f => ({ ...f, numero: data.numero }));
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo generar el número. Intente de nuevo.' });
    } finally {
      setGeneratingNumber(false);
    }
  }, [toast]);

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
        title: editId ? 'Línea actualizada' : 'Línea registrada',
        description: `${form.numero} (${OPERADORAS.find(o => o.value === form.operadora)?.label}) procesada correctamente.`,
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
        title: linea.activa ? 'Línea desactivada' : 'Línea activada',
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
      toast({ title: 'Línea eliminada', description: 'La línea fue eliminada del sistema.' });
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
    generateNumber('personal');
  };

  const totalActivas = lineas.filter(l => l.activa).length;
  const totalGasto = lineas.reduce((s, l) => s + parseFloat(l.monto_plan || '0'), 0);
  const totalDatosUsados = lineas.reduce((s, l) => s + parseFloat(l.uso_datos_gb || '0'), 0);
  const facturasPendientes = facturas.filter(f => f.estado === 'pendiente').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Cargando líneas telefónicas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Signal className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Mis Líneas Telefónicas
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gestión de líneas reales · Operadoras venezolanas
          </p>
        </div>
        <Button onClick={openNew} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Línea
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Líneas Activas", val: `${totalActivas} / ${lineas.length}`, icon: Phone, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Datos Usados", val: `${totalDatosUsados.toFixed(1)} GB`, icon: Wifi, color: "text-kyron-cyan", accent: "from-kyron-cyan/20 to-kyron-cyan/0", ring: "ring-kyron-cyan/20", iconBg: "bg-kyron-cyan/10" },
          { label: "Gasto Mensual", val: formatCurrency(totalGasto, 'USD'), icon: DollarSign, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Facturas Pendientes", val: `${facturasPendientes}`, icon: FileText, color: facturasPendientes > 0 ? "text-amber-500" : "text-emerald-500", accent: facturasPendientes > 0 ? "from-amber-500/20 to-amber-500/0" : "from-emerald-500/20 to-emerald-500/0", ring: facturasPendientes > 0 ? "ring-amber-500/20" : "ring-emerald-500/20", iconBg: facturasPendientes > 0 ? "bg-amber-500/10" : "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative group", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className={cn("absolute -top-6 -right-6 w-16 h-16 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className={cn("h-3 w-3", stat.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Listado de Líneas</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">
                {lineas.length === 0 ? 'Sin líneas registradas' : `${lineas.length} línea${lineas.length !== 1 ? 's' : ''} registrada${lineas.length !== 1 ? 's' : ''}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {lineas.length === 0 ? (
            <div className="py-12 px-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center">
                <Phone className="h-5 w-5 text-muted-foreground/30" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground/60">No tienes líneas registradas</p>
                <p className="text-xs text-muted-foreground/40 mt-1">
                  Registra tu primera línea telefónica para comenzar.
                </p>
              </div>
              <Button onClick={openNew} variant="outline" size="sm" className="rounded-lg text-xs mt-2">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Línea
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                    <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Número</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Operadora</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Tipo</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Titular</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Plan</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Monto</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center hidden lg:table-cell">Datos</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-5 w-12"></TableHead>
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
                      <TableRow key={linea.id} className="border-border/30 hover:bg-muted/5 transition-colors group">
                        <TableCell className="pl-5 py-3">
                          <p className="text-[13px] font-semibold text-foreground tabular-nums">
                            {linea.numero}
                          </p>
                          {linea.cedula_titular && (
                            <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                              CI: {linea.cedula_titular}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 rounded-md border-border/50">
                            {operadoraLabel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                          {tipoLabel}
                        </TableCell>
                        <TableCell className="text-xs text-foreground/70 hidden lg:table-cell">
                          {linea.titular || '—'}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                          {linea.plan_contratado || '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-[13px] font-semibold text-foreground tabular-nums">
                            {formatCurrency(parseFloat(linea.monto_plan || '0'), linea.moneda_plan || 'USD')}
                          </span>
                        </TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          {limiteGB ? (
                            <div className="space-y-1 max-w-[100px] mx-auto">
                              <p className={cn("text-[11px] font-medium tabular-nums", pctUso > 90 ? "text-rose-500" : "text-foreground/70")}>
                                {usoGB.toFixed(1)}/{limiteGB} GB
                              </p>
                              <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all", pctUso > 90 ? "bg-rose-500" : "bg-primary")} style={{ width: `${Math.min(pctUso, 100)}%` }} />
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground/30">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <div className={cn("h-1.5 w-1.5 rounded-full", linea.activa ? "bg-emerald-500" : "bg-rose-500")} />
                            <span className="text-[11px] font-medium text-muted-foreground">
                              {linea.activa ? 'Activa' : 'Inactiva'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground">
                                <MoreVertical className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-lg bg-card border-border">
                              <DropdownMenuItem onClick={() => openEdit(linea)} className="text-xs gap-2">
                                <Pencil className="h-3 w-3" /> Editar línea
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleActive(linea)} className="text-xs gap-2">
                                {linea.activa ? <PowerOff className="h-3 w-3" /> : <Power className="h-3 w-3" />}
                                {linea.activa ? 'Desactivar' : 'Activar'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(linea.id)}
                                className="text-xs gap-2 text-rose-500 focus:text-rose-500"
                              >
                                <Trash2 className="h-3 w-3" /> Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {lineas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {lineas.filter(l => l.activa).map((linea) => {
            const usoGB = parseFloat(linea.uso_datos_gb || '0') || 0;
            const limiteGB = Math.max(parseFloat(linea.limite_datos_gb || '30') || 30, 0.1);
            const pctUso = Number.isFinite(usoGB / limiteGB) ? (usoGB / limiteGB) * 100 : 0;
            const operadoraLabel = OPERADORAS.find(o => o.value === linea.operadora)?.label || linea.operadora;
            const gaugeColor = pctUso > 90 ? '#f43f5e' : pctUso > 70 ? '#f59e0b' : '#10b981';
            const gaugeR = 28;
            const gaugeC = 2 * Math.PI * gaugeR;
            const gaugeDash = (pctUso / 100) * gaugeC;
            const operadoraColors: Record<string, string> = {
              inter:    'bg-violet-500/10 text-violet-400 border-violet-500/20',
              cantv:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
              simple:   'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            };
            const opColor = operadoraColors[linea.operadora] || 'bg-muted/20 text-muted-foreground border-border/40';
            return (
              <motion.div
                key={`usage-${linea.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="kyron-surface rounded-xl p-4 ring-1 ring-emerald-500/15 relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500/30 via-cyan-400/20 to-emerald-500/0" />
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: gaugeColor }} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="p-2 bg-primary/10 rounded-xl ring-1 ring-primary/20">
                          <Signal className="h-4 w-4 text-primary" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground font-mono tracking-wide">{linea.numero}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{linea.plan_contratado || 'Sin plan'}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", opColor)}>
                      {operadoraLabel}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
                        <circle cx="36" cy="36" r={gaugeR} fill="none" stroke="currentColor" strokeWidth="5" className="text-muted/20" />
                        <circle
                          cx="36" cy="36" r={gaugeR}
                          fill="none"
                          stroke={gaugeColor}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={`${gaugeDash} ${gaugeC}`}
                          style={{ filter: `drop-shadow(0 0 4px ${gaugeColor})`, transition: 'stroke-dasharray 0.8s ease' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-sm font-bold" style={{ color: gaugeColor }}>{Math.round(pctUso)}%</p>
                        <p className="text-[10px] text-muted-foreground font-medium leading-none">uso</p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Datos usados</p>
                        <p className="text-xs font-bold" style={{ color: gaugeColor }}>
                          {usoGB.toFixed(1)} <span className="text-muted-foreground font-normal">/ {limiteGB} GB</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { label: 'Llamadas', val: '∞', color: 'text-emerald-400' },
                          { label: 'SMS', val: '500', color: 'text-primary' },
                          { label: 'Red', val: '5G', color: 'text-kyron-cyan' },
                        ].map(item => (
                          <div key={item.label} className="text-center p-1.5 rounded-lg bg-muted/10 border border-border/30">
                            <p className="text-[10px] text-muted-foreground">{item.label}</p>
                            <p className={cn("text-[10px] font-bold", item.color)}>{item.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ReservaDatosPanel tipo="personal" />

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Wifi className="h-4 w-4 text-cyan-500" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Planes de Datos</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">
                  Elige tu plan Kyron · {PLANES_MI_LINEA.length} opciones desde ${PLANES_MI_LINEA[0].precioMensualUSD}/mes
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-[9px] font-bold border-cyan-500/30 text-cyan-500">
              5G READY
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PLANES_MI_LINEA.map((plan) => {
              const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
                slate: { border: 'border-slate-500/20', bg: 'bg-slate-500/5', text: 'text-slate-500', badge: 'bg-slate-500' },
                blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/5', text: 'text-blue-500', badge: 'bg-blue-500' },
                indigo: { border: 'border-indigo-500/20', bg: 'bg-indigo-500/5', text: 'text-indigo-500', badge: 'bg-indigo-500' },
                primary: { border: 'border-primary/30', bg: 'bg-primary/5', text: 'text-primary', badge: 'bg-primary' },
                cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/5', text: 'text-cyan-500', badge: 'bg-cyan-500' },
                violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/5', text: 'text-violet-500', badge: 'bg-violet-500' },
              };
              const c = colorMap[plan.color] ?? colorMap.blue;
              return (
                <div
                  key={plan.id}
                  role="group"
                  aria-label={`Plan ${plan.nombre} — ${plan.datos} por $${plan.precioMensualUSD}/mes`}
                  className={cn(
                    "relative rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    plan.popular ? cn(c.border, c.bg, "ring-2 ring-primary/10") : cn("border-border/50 bg-card/40", c.border)
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <span className={cn("text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white", c.badge)}>Popular</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-lg font-bold text-foreground">{plan.nombre}</p>
                    <Badge variant="outline" className={cn("text-[8px] font-bold", c.text, c.border)}>
                      {plan.velocidad}
                    </Badge>
                  </div>
                  <p className="text-3xl font-black text-foreground mb-0.5">
                    ${plan.precioMensualUSD}<span className="text-xs text-muted-foreground font-medium">/mes</span>
                  </p>
                  <p className={cn("text-sm font-bold mb-3", c.text)}>{plan.datos}</p>
                  <div className="space-y-1.5 mb-4">
                    {plan.caracteristicas.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="text-[10px] text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full h-8 rounded-lg text-[10px] font-bold"
                    onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: `plan_${plan.id}`, descripcion: `Plan ${plan.nombre} — ${plan.datos} $${plan.precioMensualUSD}/mes` }) }); if (res.ok) toast({ title: `Plan ${plan.nombre}`, description: `Seleccionaste ${plan.nombre} — ${plan.datos} por $${plan.precioMensualUSD}/mes` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}
                  >
                    Contratar
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <div className="h-[2px] bg-gradient-to-r from-emerald-500/40 to-emerald-500/0" />
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg ring-1 ring-emerald-500/20">
              <Shield className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Homologación de Equipo</p>
              <p className="text-[10px] text-muted-foreground">CONATEL · Registro Nacional de Equipos</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] px-2.5 py-0.5 font-semibold bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Equipo Homologado
          </Badge>
        </div>
        <div className="px-5 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "IMEI", val: "356938035643809", icon: SmartphoneIcon },
            { label: "Modelo", val: "Samsung Galaxy S26", icon: FileText },
            { label: "Registro", val: "HOM-2025-89123", icon: Shield },
            { label: "Estado", val: "Verificado", icon: CheckCircle },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/10 border border-border/30 space-y-1">
              <div className="flex items-center gap-1.5">
                <item.icon className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-foreground truncate">{item.val}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="bg-card/60 border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Activity className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <span className="text-xs font-semibold text-foreground">Estado de Red</span>
            <Badge className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Operativa</Badge>
          </div>
          <div className="space-y-2">
            {[
              { label: "Latencia", value: "12ms", status: "text-emerald-500" },
              { label: "Cobertura 5G", value: "98.5%", status: "text-emerald-500" },
              { label: "Velocidad de descarga", value: "450 Mbps", status: "text-cyan-500" },
              { label: "Velocidad de subida", value: "85 Mbps", status: "text-cyan-500" },
              { label: "Última caída registrada", value: "Hace 47 días", status: "text-muted-foreground" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-muted/10">
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
                <span className={cn("text-xs font-bold", item.status)}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <DollarSign className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <span className="text-xs font-semibold text-foreground">Recargas Rápidas</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {["$5", "$10", "$15", "$20", "$30", "$50"].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                className="h-10 rounded-lg text-sm font-bold border-border/50 hover:border-primary/40 hover:bg-primary/5"
                onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'recarga_procesada', descripcion: "Recarga procesada" }) }); if (res.ok) toast({ title: "Recarga procesada", description: `Se procesó la recarga de ${amount} exitosamente.` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}
              >
                {amount}
              </Button>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
            <p className="text-[10px] font-bold text-cyan-500 mb-1">Recarga Automática</p>
            <p className="text-[11px] text-muted-foreground">Activa la recarga automática cuando tu saldo llegue a $2</p>
            <Button size="sm" variant="outline" className="mt-2 h-7 text-[11px] rounded-lg border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10">
              Activar Auto-Recarga
            </Button>
          </div>
        </Card>
      </div>

      {facturas.length > 0 && (
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Facturas</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">
                  Últimas {facturas.length} factura{facturas.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                    <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nro. Factura</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Línea</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Período</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Emisión</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Monto</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center pr-5">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facturas.map((f) => (
                    <TableRow key={f.id} className="border-border/30 hover:bg-muted/5">
                      <TableCell className="pl-5 py-3 text-xs font-medium text-foreground/80">
                        {f.numero_factura || `FAC-${f.id}`}
                      </TableCell>
                      <TableCell>
                        <p className="text-xs font-medium text-foreground/70">{f.linea_numero || '—'}</p>
                        {f.operadora && <p className="text-[10px] text-muted-foreground/40 capitalize">{f.operadora}</p>}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell">{f.periodo}</TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                        {new Date(f.fecha_emision).toLocaleDateString('es-VE')}
                      </TableCell>
                      <TableCell className="text-right text-[13px] font-semibold text-foreground tabular-nums">
                        {formatCurrency(parseFloat(f.monto), f.moneda || 'USD')}
                      </TableCell>
                      <TableCell className="text-center pr-5">
                        <Badge variant="outline" className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md", ESTADO_COLORS[f.estado] || '')}>
                          {f.estado === 'en_disputa' ? 'En disputa' : f.estado.charAt(0).toUpperCase() + f.estado.slice(1)}
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

      {lineas.map((linea) => {
        const operadoraLabel = OPERADORAS.find(o => o.value === linea.operadora)?.label || linea.operadora;
        return (
          <Dialog key={`del-${linea.id}`} open={deleteConfirm === linea.id} onOpenChange={(o) => !o && setDeleteConfirm(null)}>
            <DialogContent className="bg-card border-border rounded-xl max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-foreground">Eliminar línea</DialogTitle>
                <DialogDescription className="text-sm">
                  ¿Eliminar la línea <strong>{linea.numero}</strong> ({operadoraLabel})? Esta acción es irreversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(null)} className="rounded-lg">Cancelar</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(linea.id)} className="rounded-lg text-xs font-semibold">
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })}

      <Dialog open={showForm} onOpenChange={(o) => { if (!o) { setShowForm(false); setEditId(null); setForm(emptyForm); } }}>
        <DialogContent className="bg-card border-border rounded-xl max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground">
              {editId ? 'Editar Línea' : 'Registrar Nueva Línea'}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {editId ? 'Modifica los datos de la línea' : 'Agrega una línea telefónica venezolana'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {!editId && (
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Tipo de Línea</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, tipo_registro: 'personal' }));
                      generateNumber('personal');
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all flex items-center gap-3",
                      form.tipo_registro === 'personal'
                        ? "border-blue-500 bg-blue-500/5"
                        : "border-border hover:border-border/80"
                    )}
                  >
                    <div className={cn("p-2 rounded-lg", form.tipo_registro === 'personal' ? "bg-blue-500/10" : "bg-muted/30")}>
                      <User className={cn("h-4 w-4", form.tipo_registro === 'personal' ? "text-blue-500" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <p className={cn("text-xs font-semibold", form.tipo_registro === 'personal' ? "text-blue-400" : "text-foreground/70")}>Personal</p>
                      <p className="text-[10px] text-muted-foreground">04XX-XXXXXXX</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, tipo_registro: 'empresarial' }));
                      generateNumber('empresarial');
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all flex items-center gap-3",
                      form.tipo_registro === 'empresarial'
                        ? "border-emerald-500 bg-emerald-500/5"
                        : "border-border hover:border-border/80"
                    )}
                  >
                    <div className={cn("p-2 rounded-lg", form.tipo_registro === 'empresarial' ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <Building className={cn("h-4 w-4", form.tipo_registro === 'empresarial' ? "text-emerald-500" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <p className={cn("text-xs font-semibold", form.tipo_registro === 'empresarial' ? "text-emerald-400" : "text-foreground/70")}>Empresarial</p>
                      <p className="text-[10px] text-muted-foreground">KYR-EMP-XXXXXX</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">
                  {!editId ? 'Número Asignado' : 'Número *'}
                </Label>
                {!editId ? (
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex-1 h-9 rounded-lg border px-3 flex items-center text-sm font-mono font-semibold tracking-wide",
                      form.tipo_registro === 'empresarial'
                        ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-400"
                        : "bg-blue-500/5 border-blue-500/30 text-blue-400"
                    )}>
                      {generatingNumber ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      ) : (
                        form.numero || '—'
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-lg shrink-0"
                      onClick={() => generateNumber(form.tipo_registro)}
                      disabled={generatingNumber}
                    >
                      <RefreshCw className={cn("h-3.5 w-3.5", generatingNumber && "animate-spin")} />
                    </Button>
                  </div>
                ) : (
                  <Input
                    placeholder="0414-1234567"
                    value={form.numero}
                    onChange={(e) => setForm(f => ({ ...f, numero: e.target.value }))}
                    className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                  />
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Operadora *</Label>
                <Select value={form.operadora} onValueChange={(v) => setForm(f => ({ ...f, operadora: v }))}>
                  <SelectTrigger className="h-9 rounded-lg bg-muted/20 border-border text-sm">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERADORAS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Tipo de Línea</Label>
                <Select value={form.tipo_linea} onValueChange={(v) => setForm(f => ({ ...f, tipo_linea: v }))}>
                  <SelectTrigger className="h-9 rounded-lg bg-muted/20 border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_LINEA.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Moneda</Label>
                <Select value={form.moneda_plan} onValueChange={(v) => setForm(f => ({ ...f, moneda_plan: v }))}>
                  <SelectTrigger className="h-9 rounded-lg bg-muted/20 border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="VES">Bs (VES)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Titular</Label>
                <Input
                  placeholder="Nombre del titular"
                  value={form.titular}
                  onChange={(e) => setForm(f => ({ ...f, titular: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Cédula</Label>
                <Input
                  placeholder="V-12345678"
                  value={form.cedula_titular}
                  onChange={(e) => setForm(f => ({ ...f, cedula_titular: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Plan Contratado</Label>
                <Input
                  placeholder="Plan Plus 30GB"
                  value={form.plan_contratado}
                  onChange={(e) => setForm(f => ({ ...f, plan_contratado: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Monto Mensual</Label>
                <Input
                  type="number" step="0.01" min="0"
                  placeholder="0.00"
                  value={form.monto_plan}
                  onChange={(e) => setForm(f => ({ ...f, monto_plan: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Activación</Label>
                <Input
                  type="date"
                  value={form.fecha_activacion}
                  onChange={(e) => setForm(f => ({ ...f, fecha_activacion: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Vencimiento</Label>
                <Input
                  type="date"
                  value={form.fecha_vencimiento}
                  onChange={(e) => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-muted-foreground">Límite (GB)</Label>
                <Input
                  type="number" step="0.1" min="0"
                  placeholder="30"
                  value={form.limite_datos_gb}
                  onChange={(e) => setForm(f => ({ ...f, limite_datos_gb: e.target.value }))}
                  className="h-9 rounded-lg bg-muted/20 border-border text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium text-muted-foreground">Notas</Label>
              <Input
                placeholder="Notas adicionales..."
                value={form.notas}
                onChange={(e) => setForm(f => ({ ...f, notas: e.target.value }))}
                className="h-9 rounded-lg bg-muted/20 border-border text-sm"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }} className="rounded-lg" disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving} size="sm" className="rounded-lg text-xs font-semibold">
              {saving && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              {editId ? 'Guardar Cambios' : 'Registrar Línea'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
