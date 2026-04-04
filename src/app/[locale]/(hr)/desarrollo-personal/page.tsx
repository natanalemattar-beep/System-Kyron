"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Target, Award, TrendingUp, BookOpen, Zap, Activity, CirclePlus as PlusCircle, Loader2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Plan {
  id: number;
  nombre_plan: string;
  categoria: string;
  nivel_actual: string;
  nivel_objetivo: string;
  progreso: number;
  descripcion: string | null;
  competencias: string[] | null;
  fecha_inicio: string;
  fecha_objetivo: string | null;
  estado: string;
  empleado_nombre: string | null;
  empleado_cargo: string | null;
}

interface Stats {
  activos: number;
  completados: number;
  total: number;
  progreso_promedio: number;
}

const categoriaLabels: Record<string, string> = {
  tecnico: "Técnico",
  liderazgo: "Liderazgo",
  administrativo: "Administrativo",
  legal: "Legal",
  comunicacion: "Comunicación",
  otro: "Otro",
};

const nivelLabels: Record<string, string> = {
  iniciacion: "Iniciación",
  junior: "Junior",
  intermedio: "Intermedio",
  senior: "Senior",
  especialista: "Especialista",
  principal: "Principal",
};

const categoriaIcons: Record<string, React.ElementType> = {
  tecnico: Zap,
  liderazgo: Award,
  administrativo: Target,
  legal: BookOpen,
  comunicacion: Activity,
  otro: TrendingUp,
};

export default function DesarrolloPersonalPage() {
  const { toast } = useToast();
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [stats, setStats] = useState<Stats>({ activos: 0, completados: 0, total: 0, progreso_promedio: 0 });
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nombre_plan: "", categoria: "tecnico", nivel_actual: "iniciacion",
    nivel_objetivo: "junior", descripcion: "", competencias: "",
    fecha_objetivo: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/desarrollo-personal");
      if (res.ok) {
        const data = await res.json();
        setPlanes(data.planes ?? []);
        setStats(data.stats ?? { activos: 0, completados: 0, total: 0, progreso_promedio: 0 });
      }
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar los planes de desarrollo", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async () => {
    if (!form.nombre_plan) {
      toast({ title: "Error", description: "El nombre del plan es requerido", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const competencias = form.competencias.trim()
        ? form.competencias.split(",").map(c => c.trim()).filter(Boolean)
        : [];
      const res = await fetch("/api/desarrollo-personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          competencias,
          fecha_objetivo: form.fecha_objetivo || null,
        }),
      });
      if (res.ok) {
        toast({ title: "PLAN CREADO", description: `${form.nombre_plan} registrado exitosamente.` });
        setShowDialog(false);
        setForm({ nombre_plan: "", categoria: "tecnico", nivel_actual: "iniciacion", nivel_objetivo: "junior", descripcion: "", competencias: "", fecha_objetivo: "" });
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

  const handleUpdateEstado = async (id: number, estado: string) => {
    try {
      const res = await fetch("/api/desarrollo-personal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado }),
      });
      if (res.ok) {
        toast({ title: "ESTADO ACTUALIZADO", description: `Estado cambiado a ${estado}.` });
        fetchData();
      } else {
        toast({ title: "Error", description: "No se pudo actualizar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  const handleUpdateProgreso = async (id: number, progreso: number) => {
    try {
      const newProgreso = Math.min(100, progreso + 10);
      const res = await fetch("/api/desarrollo-personal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, progreso: newProgreso, estado: newProgreso >= 100 ? "completado" : "activo" }),
      });
      if (res.ok) {
        toast({ title: "PROGRESO ACTUALIZADO", description: `Progreso actualizado a ${newProgreso}%` });
        fetchData();
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <School className="h-3 w-3" /> CENTRO EDUCATIVO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Desarrollo y <span className="text-primary italic">Carrera Personal</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Plan de Vida Profesional</p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setShowDialog(true)}>
          <PlusCircle className="mr-3 h-4 w-4" /> CREAR PLAN
        </Button>
      </header>

      {planes.length === 0 ? (
        <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 shadow-2xl text-center">
          <School className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
          <h3 className="text-lg font-black uppercase text-muted-foreground/50 tracking-widest mb-2">Sin planes de desarrollo</h3>
          <p className="text-xs text-muted-foreground/40 mb-8">Cree planes de carrera y competencias para gestionar el crecimiento profesional del equipo.</p>
          <Button className="btn-3d-primary rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Crear primer plan
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Planes Activos</p>
              <p className="text-3xl font-black italic text-foreground tracking-tight">{stats.activos}</p>
            </Card>
            <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Completados</p>
              <p className="text-3xl font-black italic text-emerald-500 tracking-tight">{stats.completados}</p>
            </Card>
            <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Total Planes</p>
              <p className="text-3xl font-black italic text-foreground tracking-tight">{stats.total}</p>
            </Card>
            <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Progreso Promedio</p>
              <p className="text-3xl font-black italic text-primary tracking-tight">{stats.progreso_promedio ?? 0}%</p>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-10">
              <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                  <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Pipeline de Crecimiento Profesional</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  {planes.map((plan) => {
                    const Icon = categoriaIcons[plan.categoria] ?? Zap;
                    return (
                      <div key={plan.id} className="space-y-4 p-6 rounded-[2.5rem] bg-white/5 border border-border group hover:border-primary/30 transition-all">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-6">
                            <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground">{plan.nombre_plan}</h3>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                Nivel: {nivelLabels[plan.nivel_actual] ?? plan.nivel_actual} → {nivelLabels[plan.nivel_objetivo] ?? plan.nivel_objetivo}
                              </p>
                              {plan.empleado_nombre && (
                                <p className="text-[8px] text-muted-foreground/60 mt-1">{plan.empleado_nombre} • {plan.empleado_cargo}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn(
                              "text-[8px] font-black uppercase border-primary/20 px-4 h-6 rounded-lg",
                              plan.estado === "completado" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                              plan.estado === "pausado" ? "text-amber-500 border-amber-500/20 bg-amber-500/5" :
                              plan.estado === "cancelado" ? "text-rose-500 border-rose-500/20 bg-rose-500/5" :
                              "text-primary bg-primary/5"
                            )}>{plan.progreso}%</Badge>
                            {plan.estado === "activo" && plan.progreso < 100 && (
                              <Button variant="outline" size="sm" className="rounded-xl text-[8px] h-6 px-3 font-bold uppercase" onClick={() => handleUpdateProgreso(plan.id, plan.progreso)}>
                                +10%
                              </Button>
                            )}
                            <Select value={plan.estado} onValueChange={v => handleUpdateEstado(plan.id, v)}>
                              <SelectTrigger className="h-6 w-[90px] text-[7px] font-bold uppercase rounded-lg border-primary/20 bg-transparent">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="pausado">Pausado</SelectItem>
                                <SelectItem value="completado">Completado</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Progress value={plan.progreso} className="h-2 bg-muted rounded-full" />
                        {plan.competencias && plan.competencias.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {plan.competencias.map((c, i) => (
                              <Badge key={i} variant="outline" className="text-[7px] font-bold uppercase tracking-wider rounded-md px-2 h-5">{c}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group h-[300px]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4 leading-none">Progreso <br/> General</h3>
                <p className="text-6xl font-black italic">{stats.progreso_promedio ?? 0}%</p>
                <p className="text-xs font-bold opacity-80 uppercase mt-4">{stats.activos} planes activos de {stats.total} totales</p>
              </Card>

              <Card className="glass-card border-none rounded-[2.5rem] bg-card/40 p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <Activity className="h-6 w-6 text-primary" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Resumen por Categoría</h4>
                </div>
                <div className="space-y-6">
                  {Object.entries(
                    planes.reduce((acc, p) => {
                      acc[p.categoria] = (acc[p.categoria] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([cat, count], i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                        <span>{categoriaLabels[cat] ?? cat}</span>
                        <span>{count} {count === 1 ? "plan" : "planes"}</span>
                      </div>
                      <Progress value={(count / planes.length) * 100} className="h-1.5 rounded-full" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-widest">Crear Plan de Desarrollo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label className="text-xs font-bold uppercase">Nombre del Plan *</Label>
              <Input value={form.nombre_plan} onChange={e => setForm(f => ({ ...f, nombre_plan: e.target.value }))} placeholder="Ej: Ingeniería Full-Stack" className="mt-1 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Categoría</Label>
                <Select value={form.categoria} onValueChange={v => setForm(f => ({ ...f, categoria: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoriaLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Fecha Objetivo</Label>
                <Input type="date" value={form.fecha_objetivo} onChange={e => setForm(f => ({ ...f, fecha_objetivo: e.target.value }))} className="mt-1 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Nivel Actual</Label>
                <Select value={form.nivel_actual} onValueChange={v => setForm(f => ({ ...f, nivel_actual: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(nivelLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Nivel Objetivo</Label>
                <Select value={form.nivel_objetivo} onValueChange={v => setForm(f => ({ ...f, nivel_objetivo: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(nivelLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Descripción</Label>
              <Textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción del plan de desarrollo..." className="mt-1 rounded-xl" rows={3} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Competencias (separadas por coma)</Label>
              <Input value={form.competencias} onChange={e => setForm(f => ({ ...f, competencias: e.target.value }))} placeholder="React, Node.js, PostgreSQL" className="mt-1 rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSubmit} disabled={saving} className="btn-3d-primary rounded-xl font-black uppercase text-[10px] tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />} Crear Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
