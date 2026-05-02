"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Target, Briefcase, Users, TrendingUp, Calendar, Plus, Search,
  ChevronRight, Clock, CircleCheck, TriangleAlert, Pause,
  Loader2, FolderKanban, ChartColumn, Lightbulb, GraduationCap, Wrench
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface ProyectoPersonal {
  id: number;
  titulo: string;
  departamento: string;
  tipo: string;
  descripcion: string;
  objetivo: string;
  responsable: string;
  fecha_inicio: string;
  fecha_fin_est: string | null;
  estado: string;
  progreso: number;
  prioridad: string;
  presupuesto: string;
  kpis: string[];
  created_at: string;
}

const DEPARTAMENTOS = ["Ventas", "Tecnología", "Admin", "Soporte", "Diseño", "Gerencia", "RRHH", "Legal", "Contabilidad", "Operaciones"];

const TIPOS_PROYECTO = [
  { value: "proyecto", label: "Proyecto", icon: FolderKanban, color: "text-blue-500" },
  { value: "estrategia", label: "Estrategia", icon: Target, color: "text-violet-500" },
  { value: "capacitacion", label: "Capacitación", icon: GraduationCap, color: "text-emerald-500" },
  { value: "mejora_continua", label: "Mejora Continua", icon: Wrench, color: "text-amber-500" },
];

const ESTADOS = {
  planificado: { label: "Planificado", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: Clock },
  en_progreso: { label: "En Progreso", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: TrendingUp },
  completado: { label: "Completado", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CircleCheck },
  suspendido: { label: "Suspendido", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: Pause },
};

const PRIORIDADES = {
  alta: { label: "Alta", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  media: { label: "Media", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  baja: { label: "Baja", color: "bg-green-500/20 text-green-400 border-green-500/30" },
};

const DEPTO_COLORS: Record<string, string> = {
  "Ventas": "from-emerald-500/20 to-emerald-500/5",
  "Tecnología": "from-blue-500/20 to-blue-500/5",
  "Admin": "from-violet-500/20 to-violet-500/5",
  "Soporte": "from-cyan-500/20 to-cyan-500/5",
  "Diseño": "from-pink-500/20 to-pink-500/5",
  "Gerencia": "from-amber-500/20 to-amber-500/5",
  "RRHH": "from-rose-500/20 to-rose-500/5",
  "Legal": "from-indigo-500/20 to-indigo-500/5",
  "Contabilidad": "from-teal-500/20 to-teal-500/5",
  "Operaciones": "from-orange-500/20 to-orange-500/5",
};

export default function ProyectosPersonalPage() {
  const { toast } = useToast();
  const [proyectos, setProyectos] = useState<ProyectoPersonal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepto, setFilterDepto] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [form, setForm] = useState({
    titulo: "", departamento: "Tecnología", tipo: "estrategia",
    descripcion: "", objetivo: "", responsable: "", fecha_inicio: "",
    fecha_fin_est: "", prioridad: "media", presupuesto: ""
  });

  const fetchProyectos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rrhh/proyectos-personal");
      if (res.ok) {
        const data = await res.json();
        setProyectos(data.proyectos ?? []);
      } else if (res.status !== 401) {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error al cargar proyectos", description: err.error || "No se pudieron obtener los proyectos", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", description: "No se pudo contactar al servidor", variant: "destructive" }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProyectos(); }, [fetchProyectos]);

  const handleSave = async () => {
    if (!form.titulo || !form.departamento || !form.fecha_inicio) {
      toast({ title: "Campos requeridos", description: "Título, departamento y fecha de inicio son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/rrhh/proyectos-personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, presupuesto: parseFloat(form.presupuesto) || 0 }),
      });
      if (res.ok) {
        toast({ title: "Proyecto registrado", description: `"${form.titulo}" añadido al área ${form.departamento}` });
        setShowDialog(false);
        setForm({ titulo: "", departamento: "Tecnología", tipo: "estrategia", descripcion: "", objetivo: "", responsable: "", fecha_inicio: "", fecha_fin_est: "", prioridad: "media", presupuesto: "" });
        fetchProyectos();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const filtered = proyectos.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || p.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDepto = filterDepto === "todos" || p.departamento === filterDepto;
    const matchEstado = filterEstado === "todos" || p.estado === filterEstado;
    return matchSearch && matchDepto && matchEstado;
  });

  const stats = {
    total: proyectos.length,
    activos: proyectos.filter(p => p.estado === "en_progreso").length,
    completados: proyectos.filter(p => p.estado === "completado").length,
    avgProgreso: proyectos.length > 0 ? Math.round(proyectos.reduce((a, p) => a + p.progreso, 0) / proyectos.length) : 0,
  };

  const byDepartamento = DEPARTAMENTOS.map(d => ({
    nombre: d,
    count: proyectos.filter(p => p.departamento === d).length,
    activos: proyectos.filter(p => p.departamento === d && p.estado === "en_progreso").length,
  })).filter(d => d.count > 0);

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-secondary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[11px] font-semibold uppercase tracking-wider text-secondary shadow-glow mb-4">
            <Target className="h-3 w-3" /> GESTIÓN ESTRATÉGICA
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Proyectos y <span className="text-secondary italic">Estrategias</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Capital Humano • Planificación por Área 2026</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="btn-3d-primary h-12 px-10 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg bg-secondary hover:bg-secondary/90">
          <Plus className="mr-3 h-4 w-4" /> NUEVO PROYECTO
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Proyectos", val: stats.total, icon: FolderKanban, color: "text-blue-500" },
          { label: "En Progreso", val: stats.activos, icon: TrendingUp, color: "text-amber-500" },
          { label: "Completados", val: stats.completados, icon: CircleCheck, color: "text-emerald-500" },
          { label: "Progreso Promedio", val: `${stats.avgProgreso}%`, icon: ChartColumn, color: "text-violet-500" },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl group hover:bg-secondary/5 transition-all">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <p className="text-4xl font-bold text-foreground tracking-tight leading-none">{m.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {byDepartamento.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {byDepartamento.map((d, i) => (
            <Card key={i} className={cn("border-none rounded-2xl overflow-hidden bg-gradient-to-b", DEPTO_COLORS[d.nombre] || "from-gray-500/20 to-gray-500/5")}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="text-[10px] font-bold">{d.activos} activos</Badge>
                </div>
                <p className="font-semibold text-sm uppercase tracking-wide text-foreground">{d.nombre}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{d.count}</p>
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1">proyectos</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input placeholder="Buscar por título o responsable..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 h-12 rounded-xl bg-card/50 border-border/50" />
        </div>
        <Select value={filterDepto} onValueChange={setFilterDepto}>
          <SelectTrigger className="w-48 h-12 rounded-xl bg-card/50 border-border/50">
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los Dptos.</SelectItem>
            {DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-48 h-12 rounded-xl bg-card/50 border-border/50">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {Object.entries(ESTADOS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="glass-card border-none rounded-2xl bg-card/40 p-16 text-center">
          <Lightbulb className="h-16 w-16 mx-auto text-secondary/30 mb-6" />
          <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Sin proyectos registrados</h3>
          <p className="text-muted-foreground text-sm mt-2">Crea el primer proyecto o estrategia de personal para tu organización</p>
          <Button onClick={() => setShowDialog(true)} className="mt-8 bg-secondary hover:bg-secondary/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest h-12 px-10">
            <Plus className="mr-2 h-4 w-4" /> Crear Proyecto
          </Button>
        </Card>
      ) : (
        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="bg-card/40 rounded-xl p-1 border border-border/30">
            <TabsTrigger value="lista" className="rounded-lg text-[10px] font-semibold uppercase tracking-widest">Vista Lista</TabsTrigger>
            <TabsTrigger value="kanban" className="rounded-lg text-[10px] font-semibold uppercase tracking-widest">Vista Kanban</TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-4">
            {filtered.map((p, i) => {
              const estadoInfo = ESTADOS[p.estado as keyof typeof ESTADOS] || ESTADOS.planificado;
              const prioridadInfo = PRIORIDADES[p.prioridad as keyof typeof PRIORIDADES] || PRIORIDADES.media;
              const tipoInfo = TIPOS_PROYECTO.find(t => t.value === p.tipo) || TIPOS_PROYECTO[1];
              return (
                <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="glass-card border-none bg-card/40 rounded-2xl shadow-lg hover:shadow-xl transition-all group overflow-hidden">
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b", DEPTO_COLORS[p.departamento] || "from-gray-500/40 to-gray-500/10")} />
                    <CardContent className="p-6 pl-8">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <tipoInfo.icon className={cn("h-4 w-4 shrink-0", tipoInfo.color)} />
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide truncate">{p.titulo}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="text-[10px] font-semibold uppercase">{p.departamento}</Badge>
                            <Badge className={cn("text-[10px] font-semibold uppercase border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                            <Badge className={cn("text-[10px] font-semibold uppercase border", prioridadInfo.color)}>{prioridadInfo.label}</Badge>
                          </div>
                          {p.descripcion && <p className="text-xs text-muted-foreground line-clamp-2">{p.descripcion}</p>}
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          {p.responsable && (
                            <div className="text-right">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Responsable</p>
                              <p className="text-xs font-bold text-foreground">{p.responsable}</p>
                            </div>
                          )}
                          <div className="w-32">
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Progreso</p>
                              <p className="text-xs font-bold text-foreground">{p.progreso}%</p>
                            </div>
                            <Progress value={p.progreso} className="h-2 bg-muted" />
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">Inicio</p>
                            <p className="text-xs font-bold text-foreground">{new Date(p.fecha_inicio).toLocaleDateString("es-VE")}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          <TabsContent value="kanban">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(ESTADOS).map(([key, info]) => {
                const items = filtered.filter(p => p.estado === key);
                return (
                  <div key={key} className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                      <info.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{info.label}</span>
                      <Badge variant="outline" className="ml-auto text-[11px]">{items.length}</Badge>
                    </div>
                    <div className="space-y-3 min-h-[200px]">
                      {items.map(p => {
                        const tipoInfo = TIPOS_PROYECTO.find(t => t.value === p.tipo) || TIPOS_PROYECTO[1];
                        return (
                          <Card key={p.id} className="glass-card border-none bg-card/50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <tipoInfo.icon className={cn("h-3 w-3", tipoInfo.color)} />
                              <Badge variant="outline" className="text-[7px]">{p.departamento}</Badge>
                            </div>
                            <p className="font-bold text-xs text-foreground mb-2">{p.titulo}</p>
                            <Progress value={p.progreso} className="h-1 bg-muted mb-2" />
                            <div className="flex justify-between">
                              <span className="text-[10px] text-muted-foreground font-bold">{p.responsable || "Sin asignar"}</span>
                              <span className="text-[10px] font-bold text-foreground">{p.progreso}%</span>
                            </div>
                          </Card>
                        );
                      })}
                      {items.length === 0 && (
                        <div className="border border-dashed border-border/30 rounded-xl p-8 text-center">
                          <p className="text-[11px] text-muted-foreground/40 font-bold uppercase tracking-widest">Sin proyectos</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold uppercase tracking-wider text-foreground">Nuevo Proyecto de Personal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Título *</Label>
                <Input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Plan de capacitación técnica" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Responsable</Label>
                <Input value={form.responsable} onChange={e => setForm(f => ({ ...f, responsable: e.target.value }))} placeholder="Nombre del líder" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Departamento *</Label>
                <Select value={form.departamento} onValueChange={v => setForm(f => ({ ...f, departamento: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{TIPOS_PROYECTO.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Prioridad</Label>
                <Select value={form.prioridad} onValueChange={v => setForm(f => ({ ...f, prioridad: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Objetivo</Label>
              <Input value={form.objetivo} onChange={e => setForm(f => ({ ...f, objetivo: e.target.value }))} placeholder="Mejorar las competencias del equipo en un 40%" className="mt-2 rounded-xl bg-muted/50" />
            </div>
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Descripción</Label>
              <Textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Detalle del proyecto o estrategia..." className="mt-2 rounded-xl bg-muted/50 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fecha Inicio *</Label>
                <Input type="date" value={form.fecha_inicio} onChange={e => setForm(f => ({ ...f, fecha_inicio: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fecha Fin Estimada</Label>
                <Input type="date" value={form.fecha_fin_est} onChange={e => setForm(f => ({ ...f, fecha_fin_est: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Presupuesto (Bs)</Label>
                <Input type="number" value={form.presupuesto} onChange={e => setForm(f => ({ ...f, presupuesto: e.target.value }))} placeholder="0.00" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-secondary hover:bg-secondary/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Registrar Proyecto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
