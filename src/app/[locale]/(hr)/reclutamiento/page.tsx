"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CirclePlus as PlusCircle, Eye, Signature as FileSignature, GraduationCap, Activity, Users, Briefcase, ArrowRight, Loader2, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Vacante {
  id: number;
  titulo: string;
  departamento: string;
  descripcion: string;
  requisitos: string[] | null;
  tipo_contrato: string;
  modalidad: string;
  salario_min: string;
  salario_max: string;
  moneda_salario: string;
  ubicacion: string;
  estado: string;
  prioridad: string;
  fecha_publicacion: string;
  fecha_limite: string;
  num_candidatos: number;
  contratados: number;
}

interface Candidato {
  id: number;
  vacante_id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  experiencia_anos: number;
  nivel_educacion: string;
  etapa: string;
  puntuacion: number;
  vacante_titulo: string;
  vacante_departamento: string;
  fecha_aplicacion: string;
}

interface Stats {
  abiertas: number;
  en_proceso: number;
  cubiertas: number;
  total_candidatos: number;
}

export default function ReclutamientoPage() {
  const { toast } = useToast();
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [stats, setStats] = useState<Stats>({ abiertas: 0, en_proceso: 0, cubiertas: 0, total_candidatos: 0 });
  const [loading, setLoading] = useState(true);
  const [showVacanteDialog, setShowVacanteDialog] = useState(false);
  const [showCandidatoDialog, setShowCandidatoDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [vacanteForm, setVacanteForm] = useState({
    titulo: "", departamento: "", descripcion: "", tipo_contrato: "tiempo_indeterminado",
    modalidad: "presencial", salario_min: "", salario_max: "", moneda_salario: "USD",
    ubicacion: "", prioridad: "normal", fecha_limite: "",
  });

  const [candidatoForm, setCandidatoForm] = useState({
    vacante_id: "", nombre: "", apellido: "", cedula: "", email: "",
    telefono: "", experiencia_anos: "0", nivel_educacion: "universitario",
    pretension_salarial: "", moneda_pretension: "USD", notas_evaluacion: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [vacRes, canRes] = await Promise.all([
        fetch("/api/vacantes"),
        fetch("/api/candidatos"),
      ]);
      if (vacRes.ok) {
        const data = await vacRes.json();
        setVacantes(data.vacantes ?? []);
        setStats(data.stats ?? { abiertas: 0, en_proceso: 0, cubiertas: 0, total_candidatos: 0 });
      }
      if (canRes.ok) {
        const data = await canRes.json();
        setCandidatos(data.candidatos ?? []);
      }
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar los datos de reclutamiento", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreateVacante = async () => {
    if (!vacanteForm.titulo || !vacanteForm.departamento) {
      toast({ title: "Error", description: "Título y departamento son requeridos", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/vacantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...vacanteForm,
          fecha_limite: vacanteForm.fecha_limite || null,
          salario_min: vacanteForm.salario_min || null,
          salario_max: vacanteForm.salario_max || null,
        }),
      });
      if (res.ok) {
        toast({ title: "VACANTE PUBLICADA", description: `${vacanteForm.titulo} registrada exitosamente.` });
        setShowVacanteDialog(false);
        setVacanteForm({ titulo: "", departamento: "", descripcion: "", tipo_contrato: "tiempo_indeterminado", modalidad: "presencial", salario_min: "", salario_max: "", moneda_salario: "USD", ubicacion: "", prioridad: "normal", fecha_limite: "" });
        fetchData();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error ?? "No se pudo crear", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCandidato = async () => {
    if (!candidatoForm.vacante_id || !candidatoForm.nombre || !candidatoForm.apellido || !candidatoForm.email) {
      toast({ title: "Error", description: "Vacante, nombre, apellido y email son requeridos", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/candidatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...candidatoForm, vacante_id: parseInt(candidatoForm.vacante_id) }),
      });
      if (res.ok) {
        toast({ title: "CANDIDATO REGISTRADO", description: `${candidatoForm.nombre} ${candidatoForm.apellido} añadido al pipeline.` });
        setShowCandidatoDialog(false);
        setCandidatoForm({ vacante_id: "", nombre: "", apellido: "", cedula: "", email: "", telefono: "", experiencia_anos: "0", nivel_educacion: "universitario", pretension_salarial: "", moneda_pretension: "USD", notas_evaluacion: "" });
        fetchData();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error ?? "No se pudo crear", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateVacanteEstado = async (id: number, estado: string) => {
    try {
      const res = await fetch("/api/vacantes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado }),
      });
      if (res.ok) {
        toast({ title: "VACANTE ACTUALIZADA", description: `Estado cambiado a ${estado}.` });
        fetchData();
      } else {
        toast({ title: "Error", description: "No se pudo actualizar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  const handleUpdateCandidatoEtapa = async (id: number, etapa: string) => {
    try {
      const res = await fetch("/api/candidatos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, etapa }),
      });
      if (res.ok) {
        toast({ title: "CANDIDATO ACTUALIZADO", description: `Etapa cambiada a ${etapaLabel(etapa)}.` });
        fetchData();
      } else {
        toast({ title: "Error", description: "No se pudo actualizar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  const etapaLabel = (etapa: string) => {
    const map: Record<string, string> = {
      aplicado: "Aplicado", preseleccion: "Preselección", entrevista: "Entrevista",
      evaluacion: "Evaluación", seleccion: "Selección", contratacion: "Contratación",
      contratado: "Contratado", descartado: "Descartado",
    };
    return map[etapa] ?? etapa;
  };

  const funnelStats = [
    { label: "Vacantes Abiertas", val: stats.abiertas, icon: Briefcase, color: "text-amber-500" },
    { label: "En Proceso", val: stats.en_proceso, icon: Users, color: "text-blue-500" },
    { label: "Cubiertas", val: stats.cubiertas, icon: FileSignature, color: "text-primary" },
    { label: "Total Candidatos", val: stats.total_candidatos, icon: GraduationCap, color: "text-secondary" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-secondary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
            <UserPlus className="h-3 w-3" /> CENTRO DE ATRACCIÓN
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Embudo de <span className="text-secondary italic">Atracción</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Selección • Contratación • Inducción</p>
        </div>
        <div className="flex gap-3">
          <Button className="btn-3d-secondary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setShowVacanteDialog(true)}>
            <PlusCircle className="mr-3 h-4 w-4" /> PUBLICAR VACANTE
          </Button>
          <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest" onClick={() => setShowCandidatoDialog(true)} disabled={vacantes.length === 0}>
            <Plus className="mr-3 h-4 w-4" /> REGISTRAR CANDIDATO
          </Button>
        </div>
      </header>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {funnelStats.map((stat, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl group hover:border-secondary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
            <p className="text-3xl font-black italic text-foreground tracking-tight">{stat.val}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
              <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Pipeline de Candidatos Activos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {candidatos.length === 0 ? (
                <div className="p-16 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-sm font-bold text-muted-foreground/50 uppercase tracking-widest">Sin candidatos registrados</p>
                  <p className="text-xs text-muted-foreground/40 mt-2">Registre candidatos para verlos aquí en el pipeline.</p>
                  {vacantes.length > 0 && (
                    <Button variant="outline" className="mt-6 rounded-xl" onClick={() => setShowCandidatoDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Registrar primer candidato
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                      <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Candidato</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vacante</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Fase</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Puntuación</TableHead>
                      <TableHead className="pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-right">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidatos.map(c => (
                      <TableRow key={c.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                        <TableCell className="pl-10 py-6">
                          <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-secondary transition-colors">{c.nombre} {c.apellido}</p>
                          <p className="text-[8px] font-mono text-muted-foreground font-bold">{c.email}</p>
                        </TableCell>
                        <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{c.vacante_titulo}</TableCell>
                        <TableCell className="py-6 text-center">
                          <Select value={c.etapa} onValueChange={v => handleUpdateCandidatoEtapa(c.id, v)}>
                            <SelectTrigger className="h-7 text-[8px] font-black uppercase tracking-widest rounded-lg border-secondary/20 text-secondary bg-secondary/5 w-[130px] mx-auto">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["aplicado","preseleccion","entrevista","evaluacion","seleccion","contratacion","contratado","descartado"].map(e => (
                                <SelectItem key={e} value={e}>{etapaLabel(e)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="py-6 text-center">
                          <span className="text-sm font-black italic text-foreground">{c.puntuacion ?? "—"}</span>
                        </TableCell>
                        <TableCell className="pr-10 py-6 text-right">
                          <Button variant="ghost" size="sm" className="h-7 px-3 rounded-lg text-[8px] font-bold uppercase text-secondary hover:bg-secondary/10" onClick={() => handleUpdateCandidatoEtapa(c.id, "descartado")} disabled={c.etapa === "descartado"}>
                            Descartar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
            <CardHeader className="p-8 border-b border-border/50 bg-muted/10">
              <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Vacantes</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {vacantes.length === 0 ? (
                <div className="p-10 text-center">
                  <Briefcase className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">Sin vacantes publicadas</p>
                  <Button variant="outline" className="mt-4 rounded-xl text-xs" onClick={() => setShowVacanteDialog(true)}>
                    <Plus className="mr-2 h-3 w-3" /> Publicar primera vacante
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {vacantes.map(v => (
                    <div key={v.id} className="p-4 rounded-2xl bg-white/5 border border-border hover:border-secondary/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-black uppercase text-foreground">{v.titulo}</h4>
                        <Select value={v.estado} onValueChange={val => handleUpdateVacanteEstado(v.id, val)}>
                          <SelectTrigger className="h-5 w-[100px] text-[7px] font-black uppercase tracking-wider rounded-md border-secondary/20 text-secondary bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="abierta">Abierta</SelectItem>
                            <SelectItem value="en_proceso">En Proceso</SelectItem>
                            <SelectItem value="cubierta">Cubierta</SelectItem>
                            <SelectItem value="cancelada">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase">{v.departamento}</p>
                      <div className="flex gap-4 mt-2 text-[8px] text-muted-foreground/60">
                        <span>{v.num_candidatos} candidatos</span>
                        <span>{v.contratados} contratados</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-none bg-white/[0.02] p-8 rounded-[2.5rem] shadow-xl">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary mb-6 flex items-center gap-3 italic">
              <Activity className="h-4 w-4" /> Resumen Pipeline
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-border pb-4">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Total Vacantes</span>
                <span className="text-xl font-black text-foreground italic">{vacantes.length}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Total Candidatos</span>
                <span className="text-xl font-black text-emerald-500 italic">{stats.total_candidatos}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showVacanteDialog} onOpenChange={setShowVacanteDialog}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-widest">Publicar Nueva Vacante</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Título *</Label>
                <Input value={vacanteForm.titulo} onChange={e => setVacanteForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Ej: Desarrollador Full-Stack" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Departamento *</Label>
                <Input value={vacanteForm.departamento} onChange={e => setVacanteForm(f => ({ ...f, departamento: e.target.value }))} placeholder="Ej: Tecnología" className="mt-1 rounded-xl" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Descripción</Label>
              <Textarea value={vacanteForm.descripcion} onChange={e => setVacanteForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción del puesto..." className="mt-1 rounded-xl" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Tipo de Contrato</Label>
                <Select value={vacanteForm.tipo_contrato} onValueChange={v => setVacanteForm(f => ({ ...f, tipo_contrato: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiempo_indeterminado">Tiempo Indeterminado</SelectItem>
                    <SelectItem value="tiempo_determinado">Tiempo Determinado</SelectItem>
                    <SelectItem value="obra">Por Obra</SelectItem>
                    <SelectItem value="pasante">Pasante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Modalidad</Label>
                <Select value={vacanteForm.modalidad} onValueChange={v => setVacanteForm(f => ({ ...f, modalidad: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Salario Mín</Label>
                <Input type="number" value={vacanteForm.salario_min} onChange={e => setVacanteForm(f => ({ ...f, salario_min: e.target.value }))} placeholder="0" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Salario Máx</Label>
                <Input type="number" value={vacanteForm.salario_max} onChange={e => setVacanteForm(f => ({ ...f, salario_max: e.target.value }))} placeholder="0" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Moneda</Label>
                <Select value={vacanteForm.moneda_salario} onValueChange={v => setVacanteForm(f => ({ ...f, moneda_salario: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="VES">VES</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Ubicación</Label>
                <Input value={vacanteForm.ubicacion} onChange={e => setVacanteForm(f => ({ ...f, ubicacion: e.target.value }))} placeholder="Ej: Caracas" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Prioridad</Label>
                <Select value={vacanteForm.prioridad} onValueChange={v => setVacanteForm(f => ({ ...f, prioridad: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Fecha Límite</Label>
              <Input type="date" value={vacanteForm.fecha_limite} onChange={e => setVacanteForm(f => ({ ...f, fecha_limite: e.target.value }))} className="mt-1 rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVacanteDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleCreateVacante} disabled={saving} className="btn-3d-secondary rounded-xl font-black uppercase text-[10px] tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <PlusCircle className="h-4 w-4 mr-2" />} Publicar Vacante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCandidatoDialog} onOpenChange={setShowCandidatoDialog}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-widest">Registrar Candidato</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label className="text-xs font-bold uppercase">Vacante *</Label>
              <Select value={candidatoForm.vacante_id} onValueChange={v => setCandidatoForm(f => ({ ...f, vacante_id: v }))}>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Seleccionar vacante" /></SelectTrigger>
                <SelectContent>
                  {vacantes.map(v => (
                    <SelectItem key={v.id} value={String(v.id)}>{v.titulo} — {v.departamento}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Nombre *</Label>
                <Input value={candidatoForm.nombre} onChange={e => setCandidatoForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Nombre" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Apellido *</Label>
                <Input value={candidatoForm.apellido} onChange={e => setCandidatoForm(f => ({ ...f, apellido: e.target.value }))} placeholder="Apellido" className="mt-1 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Email *</Label>
                <Input type="email" value={candidatoForm.email} onChange={e => setCandidatoForm(f => ({ ...f, email: e.target.value }))} placeholder="email@ejemplo.com" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Cédula</Label>
                <Input value={candidatoForm.cedula} onChange={e => setCandidatoForm(f => ({ ...f, cedula: e.target.value }))} placeholder="V-12345678" className="mt-1 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Teléfono</Label>
                <Input value={candidatoForm.telefono} onChange={e => setCandidatoForm(f => ({ ...f, telefono: e.target.value }))} placeholder="0414-1234567" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Años de Experiencia</Label>
                <Input type="number" value={candidatoForm.experiencia_anos} onChange={e => setCandidatoForm(f => ({ ...f, experiencia_anos: e.target.value }))} className="mt-1 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Nivel Educación</Label>
                <Select value={candidatoForm.nivel_educacion} onValueChange={v => setCandidatoForm(f => ({ ...f, nivel_educacion: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachiller">Bachiller</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                    <SelectItem value="postgrado">Postgrado</SelectItem>
                    <SelectItem value="maestria">Maestría</SelectItem>
                    <SelectItem value="doctorado">Doctorado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Pretensión Salarial</Label>
                <Input type="number" value={candidatoForm.pretension_salarial} onChange={e => setCandidatoForm(f => ({ ...f, pretension_salarial: e.target.value }))} placeholder="0" className="mt-1 rounded-xl" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Notas de Evaluación</Label>
              <Textarea value={candidatoForm.notas_evaluacion} onChange={e => setCandidatoForm(f => ({ ...f, notas_evaluacion: e.target.value }))} placeholder="Observaciones sobre el candidato..." className="mt-1 rounded-xl" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCandidatoDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleCreateCandidato} disabled={saving} className="btn-3d-secondary rounded-xl font-black uppercase text-[10px] tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />} Registrar Candidato
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
