"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, DollarSign, Briefcase, ArrowRight, ShieldCheck, Handshake, Scale, FileText, Activity, CirclePercent, Clock, Landmark, Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";

type Socio = {
  id: number;
  nombre: string;
  cedula_rif: string | null;
  tipo: string;
  porcentaje_participacion: string;
  cargo: string | null;
  fecha_ingreso: string | null;
  activo: boolean;
  email: string | null;
  telefono: string | null;
};

type Acta = {
  id: number;
  numero_acta: string;
  tipo: string;
  fecha_asamblea: string;
  estado: string;
  acuerdos: string[] | null;
};

type Stats = {
  total_socios: number;
  socios_activos: number;
  total_actas: number;
  actas_registradas: number;
};

const emptySocio = {
  nombre: '', cedula_rif: '', tipo: 'natural', porcentaje_participacion: '0',
  cargo: '', fecha_ingreso: '', email: '', telefono: '',
};

const modules = [
  { title: "Actas de Asamblea", description: "Registro y control de actas, quórum, decisiones y acuerdos de asambleas ordinarias y extraordinarias.", icon: FileText, href: "/socios/actas-asamblea", color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/15" },
  { title: "Capital Social", description: "Gestión de aportes, distribución accionaria, aumentos de capital y valoración patrimonial.", icon: Landmark, href: "/socios/capital-social", color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15" },
  { title: "Dividendos", description: "Cálculo y distribución de utilidades, retenciones ISLR, y registro de pagos a socios.", icon: CirclePercent, href: "/socios/dividendos", color: "text-violet-500", bgColor: "bg-violet-500/10 border-violet-500/15" },
  { title: "Gobernanza Corporativa", description: "Estructura de poder, cargos, comités, y compliance regulatorio ante el Registro Mercantil.", icon: Scale, href: "/socios/gobernanza", color: "text-amber-500", bgColor: "bg-amber-500/10 border-amber-500/15" },
];

export default function DashboardSociosPage() {
  const { toast } = useToast();
  const currentLocale = useLocale();
  const [socios, setSocios] = useState<Socio[]>([]);
  const [actas, setActas] = useState<Acta[]>([]);
  const [stats, setStats] = useState<Stats>({ total_socios: 0, socios_activos: 0, total_actas: 0, actas_registradas: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptySocio);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/socios');
      if (!res.ok) throw new Error('Error al cargar datos');
      const data = await res.json();
      setSocios(data.socios || []);
      setActas(data.actas || []);
      setStats(data.stats || { total_socios: 0, socios_activos: 0, total_actas: 0, actas_registradas: 0 });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar los datos de socios.' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!form.nombre) {
      toast({ variant: 'destructive', title: 'Campo requerido', description: 'El nombre del socio es obligatorio.' });
      return;
    }
    setSaving(true);
    try {
      const method = editId ? 'PATCH' : 'POST';
      const payload = editId
        ? { entity: 'socio', id: editId, ...form }
        : { entity: 'socio', ...form };
      const res = await fetch('/api/socios', {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al guardar');
      toast({ title: editId ? 'Socio actualizado' : 'Socio registrado', description: `${form.nombre} procesado correctamente.` });
      setShowForm(false);
      setEditId(null);
      setForm(emptySocio);
      await fetchData();
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el socio.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/socios?entity=socio&id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      toast({ title: 'Socio eliminado' });
      setDeleteConfirm(null);
      await fetchData();
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar el socio.' });
    }
  };

  const openEdit = (s: Socio) => {
    setEditId(s.id);
    setForm({
      nombre: s.nombre,
      cedula_rif: s.cedula_rif || '',
      tipo: s.tipo,
      porcentaje_participacion: s.porcentaje_participacion,
      cargo: s.cargo || '',
      fecha_ingreso: s.fecha_ingreso ? s.fecha_ingreso.split('T')[0] : '',
      email: s.email || '',
      telefono: s.telefono || '',
    });
    setShowForm(true);
  };

  const totalParticipacion = socios.reduce((s, p) => s + parseFloat(p.porcentaje_participacion || '0'), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Cargando datos de socios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold uppercase tracking-wide text-indigo-500 mb-4">
            <Briefcase className="h-3 w-3" /> CENTRO SOCIETARIO
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase">Gestión de <span className="text-indigo-500 italic">Socios</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Estructura Accionaria • Gobernanza Corporativa 2026</p>
        </div>
        <Button onClick={() => { setEditId(null); setForm(emptySocio); setShowForm(true); }} size="sm" className="h-9 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Socio
        </Button>
      </header>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Socios", val: String(stats.total_socios), icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/15", sub: `${stats.socios_activos} activos` },
          { label: "Participación Asignada", val: `${totalParticipacion.toFixed(2)}%`, icon: DollarSign, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15", sub: totalParticipacion === 100 ? "Completo" : `${(100 - totalParticipacion).toFixed(2)}% disponible` },
          { label: "Actas Registradas", val: String(stats.total_actas), icon: FileText, color: "text-violet-500", bgColor: "bg-violet-500/10 border-violet-500/15", sub: `${stats.actas_registradas} formalizadas` },
          { label: "Gobernanza", val: stats.socios_activos > 0 ? "Activa" : "Sin socios", icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10 border-amber-500/15", sub: stats.socios_activos > 0 ? "Al día" : "Registre socios" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.01] transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">{kpi.label}</p>
              <div className={cn("p-1.5 rounded-lg border", kpi.bgColor)}>
                <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.val}</p>
            <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground">Composición Accionaria</CardTitle>
                <CardDescription className="text-[10px] mt-1">
                  {socios.length === 0 ? 'Sin socios registrados' : `${socios.length} socio${socios.length !== 1 ? 's' : ''} registrado${socios.length !== 1 ? 's' : ''}`}
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                <ShieldCheck className="h-2.5 w-2.5 mr-1" /> Reg. Mercantil
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {socios.length === 0 ? (
              <div className="py-12 px-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-muted-foreground/30" />
                </div>
                <p className="text-sm font-medium text-muted-foreground/60">No hay socios registrados</p>
                <p className="text-xs text-muted-foreground/40">Registre socios para ver la composición accionaria.</p>
                <Button onClick={() => { setEditId(null); setForm(emptySocio); setShowForm(true); }} variant="outline" size="sm" className="rounded-lg text-xs mt-2">
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Socio
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border/20">
                {socios.map((socio) => {
                  const pct = parseFloat(socio.porcentaje_participacion || '0');
                  return (
                    <div key={socio.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors group">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-500 font-semibold text-sm shrink-0">
                          {socio.nombre.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{socio.nombre}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {socio.cargo || socio.tipo}{socio.fecha_ingreso ? ` · Desde ${new Date(socio.fecha_ingreso).getFullYear()}` : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-[11px] text-muted-foreground/40 uppercase">{socio.cedula_rif || '—'}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                            </div>
                            <span className="text-sm font-bold text-indigo-500 tabular-nums w-14 text-right">{pct.toFixed(2)}%</span>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(socio)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-500 hover:text-rose-600" onClick={() => setDeleteConfirm(socio.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-border/30">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-indigo-500" /> Actas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {actas.length === 0 ? (
                <div className="py-8 px-5 text-center">
                  <p className="text-xs text-muted-foreground/50">Sin actas de asamblea registradas.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/20">
                  {actas.slice(0, 5).map((acta) => (
                    <div key={acta.id} className="px-5 py-3.5 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-foreground truncate">Acta #{acta.numero_acta}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {new Date(acta.fecha_asamblea).toLocaleDateString(currentLocale || 'es')} · {acta.tipo.charAt(0).toUpperCase() + acta.tipo.slice(1)}
                          </p>
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-bold uppercase shrink-0",
                          acta.estado === "registrada" ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                          acta.estado === "firmada" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                          acta.estado === "archivada" ? "border-blue-500/20 text-blue-500 bg-blue-500/5" :
                          "border-muted-foreground/20 text-muted-foreground bg-muted/5"
                        )}>{acta.estado}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl p-6 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Handshake className="h-24 w-24" /></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="text-sm font-semibold uppercase tracking-tight mb-2">Pacto Parasocial</h3>
            <p className="text-[11px] opacity-80 leading-relaxed mb-5">Gestione cláusulas de prelación, derecho de tag-along, drag-along y resolución de conflictos.</p>
            <Button variant="secondary" size="sm" className="bg-white text-indigo-700 font-bold text-[10px] uppercase tracking-wider rounded-xl h-9 px-5 hover:bg-white/90">
              Ver Documento
            </Button>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <Link key={module.title} href={module.href as never} className="group block">
            <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl h-full flex flex-col justify-between hover:scale-[1.01] transition-all">
              <div className="space-y-3">
                <div className={cn("p-2.5 rounded-xl border w-fit transition-transform group-hover:scale-110 duration-300", module.bgColor)}>
                  <module.icon className={cn("h-4 w-4", module.color)} />
                </div>
                <div>
                  <CardTitle className="text-xs font-semibold uppercase tracking-tight text-foreground mb-1.5 group-hover:text-indigo-500 transition-colors">{module.title}</CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground leading-relaxed">{module.description}</CardDescription>
                </div>
              </div>
              <div className="pt-4 mt-auto flex items-center justify-between text-[11px] font-bold text-muted-foreground/30 group-hover:text-indigo-500 transition-colors uppercase tracking-wider">
                <span>Acceder</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold uppercase tracking-wider">
              {editId ? 'Editar Socio' : 'Registrar Socio'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Nombre *</Label>
                <Input value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Nombre completo" className="rounded-lg text-xs h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Cédula / RIF</Label>
                <Input value={form.cedula_rif} onChange={e => setForm(f => ({ ...f, cedula_rif: e.target.value }))} placeholder="V-12345678" className="rounded-lg text-xs h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="rounded-lg text-xs h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="juridico">Jurídico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Participación %</Label>
                <Input type="number" step="0.01" min="0" max="100" value={form.porcentaje_participacion} onChange={e => setForm(f => ({ ...f, porcentaje_participacion: e.target.value }))} className="rounded-lg text-xs h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Cargo</Label>
                <Input value={form.cargo} onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))} placeholder="Presidente, Director..." className="rounded-lg text-xs h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Fecha Ingreso</Label>
                <Input type="date" value={form.fecha_ingreso} onChange={e => setForm(f => ({ ...f, fecha_ingreso: e.target.value }))} className="rounded-lg text-xs h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="rounded-lg text-xs h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase">Teléfono</Label>
                <Input value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className="rounded-lg text-xs h-9" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-lg text-xs">Cancelar</Button>
            <Button onClick={handleSave} disabled={saving} className="rounded-lg text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
              {saving && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
              {editId ? 'Actualizar' : 'Registrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">¿Está seguro de eliminar este socio? Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-lg text-xs">Cancelar</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="rounded-lg text-xs">Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
