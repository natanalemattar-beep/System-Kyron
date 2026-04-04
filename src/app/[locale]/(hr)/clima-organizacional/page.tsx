"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BrainCircuit, Zap, Users, Star, MessageSquare, Activity, TrendingUp, Terminal, Award, Loader2, Plus, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Encuesta {
  id: number;
  periodo: string;
  fecha_encuesta: string;
  dimension: string;
  puntuacion: number;
  comentario: string | null;
  anonimo: boolean;
  empleado: string;
  cargo: string | null;
}

interface Resumen {
  dimension: string;
  promedio: string;
  total: number;
  min_puntaje: number;
  max_puntaje: number;
}

const dimensionLabels: Record<string, string> = {
  comunicacion: "Comunicación",
  liderazgo: "Liderazgo",
  trabajo_equipo: "Trabajo en Equipo",
  condiciones_trabajo: "Condiciones de Trabajo",
  motivacion: "Motivación",
  satisfaccion_general: "Satisfacción General",
  cultura: "Cultura Organizacional",
  desarrollo_profesional: "Desarrollo Profesional",
};

const dimensionIcons: Record<string, React.ElementType> = {
  comunicacion: MessageSquare,
  liderazgo: Star,
  trabajo_equipo: Users,
  condiciones_trabajo: Zap,
  motivacion: Heart,
  satisfaccion_general: Award,
  cultura: BrainCircuit,
  desarrollo_profesional: TrendingUp,
};

export default function ClimaOrganizacionalPage() {
  const { toast } = useToast();
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [resumen, setResumen] = useState<Resumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    periodo: new Date().getFullYear().toString(),
    dimension: "satisfaccion_general",
    puntuacion: "7",
    comentario: "",
    anonimo: true,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/clima");
      if (res.ok) {
        const data = await res.json();
        setEncuestas(data.encuestas ?? []);
        setResumen(data.resumen ?? []);
      }
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar los datos de clima organizacional", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async () => {
    if (!form.periodo || !form.dimension || !form.puntuacion) {
      toast({ title: "Error", description: "Período, dimensión y puntuación son requeridos", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/clima", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: "ENCUESTA REGISTRADA", description: `Evaluación de ${dimensionLabels[form.dimension]} registrada.` });
        setShowDialog(false);
        setForm({ periodo: new Date().getFullYear().toString(), dimension: "satisfaccion_general", puntuacion: "7", comentario: "", anonimo: true });
        fetchData();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error ?? "No se pudo registrar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const promedioGeneral = resumen.length > 0
    ? (resumen.reduce((acc, r) => acc + parseFloat(r.promedio), 0) / resumen.length).toFixed(1)
    : null;

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
            <Activity className="h-3 w-3" /> CENTRO PSICOLÓGICO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Clima y <span className="text-primary italic">Desarrollo Humano</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Cultura Organizacional • Liderazgo</p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setShowDialog(true)}>
          <Plus className="mr-3 h-4 w-4" /> REGISTRAR ENCUESTA
        </Button>
      </header>

      {resumen.length === 0 && encuestas.length === 0 ? (
        <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 shadow-2xl text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
          <h3 className="text-lg font-black uppercase text-muted-foreground/50 tracking-widest mb-2">Sin datos de clima organizacional</h3>
          <p className="text-xs text-muted-foreground/40 mb-8">Registre encuestas de clima para ver métricas y tendencias del equipo.</p>
          <Button className="btn-3d-primary rounded-xl font-black uppercase text-[10px] tracking-widest" onClick={() => setShowDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Registrar primera encuesta
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resumen.map((r, i) => {
              const Icon = dimensionIcons[r.dimension] ?? Activity;
              const prom = parseFloat(r.promedio);
              const colors = ["text-primary", "text-amber-500", "text-rose-500", "text-secondary", "text-emerald-500", "text-blue-500", "text-violet-500", "text-orange-500"];
              return (
                <Card key={i} className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl group hover:bg-primary/5 transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{dimensionLabels[r.dimension] ?? r.dimension}</p>
                    <Icon className={cn("h-4 w-4", colors[i % colors.length])} />
                  </div>
                  <div className="space-y-4">
                    <p className="text-4xl font-black italic text-foreground tracking-tight leading-none">{prom.toFixed(0)}/<span className="text-lg">10</span></p>
                    <Progress value={prom * 10} className="h-1.5 bg-muted" />
                    <p className="text-[8px] text-muted-foreground/50 font-bold uppercase">{r.total} evaluaciones</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 p-10 opacity-5"><Users className="h-48 w-48 text-primary" /></div>
              <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Historial de Encuestas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                      <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Empleado</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Dimensión</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Puntuación</TableHead>
                      <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Período</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {encuestas.slice(0, 10).map(e => (
                      <TableRow key={e.id} className="border-border/50 hover:bg-muted/20 transition-all">
                        <TableCell className="pl-10 py-4">
                          <p className="text-xs font-bold text-foreground/80">{e.empleado}</p>
                          {e.cargo && <p className="text-[8px] text-muted-foreground">{e.cargo}</p>}
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-wider rounded-lg">{dimensionLabels[e.dimension] ?? e.dimension}</Badge>
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <span className={cn("text-sm font-black italic", e.puntuacion >= 7 ? "text-emerald-500" : e.puntuacion >= 4 ? "text-amber-500" : "text-rose-500")}>{e.puntuacion}/10</span>
                        </TableCell>
                        <TableCell className="py-4 text-[9px] text-muted-foreground font-bold uppercase">{e.periodo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="lg:col-span-5 space-y-8">
              <Card className="bg-primary text-primary-foreground rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Award className="h-32 w-32" /></div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6 leading-tight">Promedio <br/> General</h3>
                  <p className="text-6xl font-black italic mb-2">{promedioGeneral ?? "—"}<span className="text-2xl">/10</span></p>
                  <p className="text-xs font-bold opacity-80 uppercase mt-4">{resumen.length} dimensiones evaluadas</p>
                  <p className="text-xs font-bold opacity-60 uppercase mt-1">{encuestas.length} encuestas totales</p>
                </div>
              </Card>

              <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-8 border border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3 italic">
                  <Terminal className="h-4 w-4" /> Dimensiones
                </h4>
                <div className="space-y-4">
                  {resumen.map((r, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 border-b border-border pb-2">
                      <span>{dimensionLabels[r.dimension] ?? r.dimension}</span>
                      <span className={cn("font-black", parseFloat(r.promedio) >= 7 ? "text-emerald-500" : parseFloat(r.promedio) >= 4 ? "text-amber-500" : "text-rose-500")}>{parseFloat(r.promedio).toFixed(1)}</span>
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
            <DialogTitle className="text-lg font-black uppercase tracking-widest">Registrar Encuesta de Clima</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase">Período *</Label>
                <Input value={form.periodo} onChange={e => setForm(f => ({ ...f, periodo: e.target.value }))} placeholder="2026" className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase">Dimensión *</Label>
                <Select value={form.dimension} onValueChange={v => setForm(f => ({ ...f, dimension: v }))}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(dimensionLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Puntuación (1-10) *</Label>
              <Input type="number" min={1} max={10} value={form.puntuacion} onChange={e => setForm(f => ({ ...f, puntuacion: e.target.value }))} className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase">Comentario</Label>
              <Textarea value={form.comentario} onChange={e => setForm(f => ({ ...f, comentario: e.target.value }))} placeholder="Observaciones sobre esta dimensión..." className="mt-1 rounded-xl" rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonimo" checked={form.anonimo} onChange={e => setForm(f => ({ ...f, anonimo: e.target.checked }))} className="rounded" />
              <Label htmlFor="anonimo" className="text-xs font-bold uppercase cursor-pointer">Encuesta Anónima</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSubmit} disabled={saving} className="btn-3d-primary rounded-xl font-black uppercase text-[10px] tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />} Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
