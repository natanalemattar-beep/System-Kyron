"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Heart, Star, Award, Gift, Users, MapPin, Calendar, Sun, Palmtree,
  Plus, Search, Trophy, Sparkles, Loader2, PartyPopper,
  Building2, Phone, Mail, Globe, CheckCircle, Clock, Plane,
  Umbrella, Coffee, Dumbbell, UtensilsCrossed, Waves
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
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

interface Programa {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  puntos_reward: number;
  fecha_inicio: string;
  fecha_fin: string | null;
  activo: boolean;
  participantes: number;
  presupuesto: string;
}

interface Reconocimiento {
  id: number;
  empleado_nombre: string;
  departamento: string;
  cargo: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  puntos: number;
  fecha: string;
}

interface Alianza {
  id: number;
  nombre_complejo: string;
  ubicacion: string;
  estado_ve: string;
  tipo: string;
  estrellas: number;
  descuento_pct: string;
  precio_base_usd: string;
  incluye_familia: boolean;
  max_personas: number;
  servicios: string[];
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_email: string;
  vigencia_inicio: string;
  vigencia_fin: string;
  imagen_url: string;
  notas: string;
}

interface PlanVacaciones {
  id: number;
  empleado_nombre: string;
  departamento: string;
  resort_nombre: string | null;
  anio: number;
  fecha_salida: string;
  fecha_retorno: string;
  dias_solicitados: number;
  incluye_familia: boolean;
  num_familiares: number;
  estado: string;
  costo_estimado: string;
  subsidio_empresa: string;
  destino: string;
}

const CATEGORIAS_PROGRAMA = [
  { value: "reconocimiento", label: "Reconocimiento", icon: Award, color: "text-amber-500" },
  { value: "incentivo", label: "Incentivo", icon: Gift, color: "text-emerald-500" },
  { value: "bienestar", label: "Bienestar", icon: Heart, color: "text-rose-500" },
  { value: "team_building", label: "Team Building", icon: Users, color: "text-blue-500" },
  { value: "formacion", label: "Formación", icon: Sparkles, color: "text-violet-500" },
  { value: "gamificacion", label: "Gamificación", icon: Trophy, color: "text-orange-500" },
];

const TIPOS_RECONOCIMIENTO = [
  { value: "logro", label: "Logro Especial" },
  { value: "antiguedad", label: "Antigüedad" },
  { value: "desempeno", label: "Desempeño" },
  { value: "innovacion", label: "Innovación" },
  { value: "liderazgo", label: "Liderazgo" },
  { value: "compañerismo", label: "Compañerismo" },
];

const TIPOS_COMPLEJO = [
  { value: "resort", label: "Resort" },
  { value: "hotel", label: "Hotel" },
  { value: "posada", label: "Posada" },
  { value: "campamento", label: "Campamento" },
  { value: "spa", label: "Spa" },
  { value: "club", label: "Club" },
];

const ESTADOS_VE = ["Anzoátegui", "Aragua", "Barinas", "Bolívar", "Carabobo", "Delta Amacuro", "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo", "Vargas", "Yaracuy", "Zulia"];

const SERVICIO_ICONS: Record<string, typeof Coffee> = {
  piscina: Waves, restaurante: UtensilsCrossed, spa: Coffee, gimnasio: Dumbbell,
  playa: Umbrella, wifi: Globe, transporte: Plane,
};

const ESTADO_PLAN: Record<string, { label: string; color: string }> = {
  solicitado: { label: "Solicitado", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  aprobado: { label: "Aprobado", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  en_curso: { label: "En Curso", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  completado: { label: "Completado", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelado: { label: "Cancelado", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function BienestarLaboralPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [reconocimientos, setReconocimientos] = useState<Reconocimiento[]>([]);
  const [alianzas, setAlianzas] = useState<Alianza[]>([]);
  const [planes, setPlanes] = useState<PlanVacaciones[]>([]);
  const [showProgramaDialog, setShowProgramaDialog] = useState(false);
  const [showAlianzaDialog, setShowAlianzaDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [programaForm, setProgramaForm] = useState({
    nombre: "", categoria: "reconocimiento", descripcion: "",
    puntos_reward: "", fecha_inicio: "", fecha_fin: "", presupuesto: ""
  });

  const [alianzaForm, setAlianzaForm] = useState({
    nombre_complejo: "", ubicacion: "", estado_ve: "Nueva Esparta", tipo: "resort",
    estrellas: "4", descuento_pct: "", precio_base_usd: "", incluye_familia: true,
    max_personas: "4", contacto_nombre: "", contacto_telefono: "", contacto_email: "",
    vigencia_inicio: "", vigencia_fin: "", notas: ""
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rrhh/bienestar");
      if (res.ok) {
        const data = await res.json();
        setProgramas(data.programas ?? []);
        setReconocimientos(data.reconocimientos ?? []);
        setAlianzas(data.alianzas ?? []);
        setPlanes(data.planes ?? []);
      } else if (res.status !== 401) {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error al cargar datos", description: err.error || "No se pudieron obtener los datos de bienestar", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", description: "No se pudo contactar al servidor", variant: "destructive" }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSavePrograma = async () => {
    if (!programaForm.nombre || !programaForm.fecha_inicio) {
      toast({ title: "Campos requeridos", description: "Nombre y fecha de inicio son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/rrhh/bienestar", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "programa", ...programaForm, puntos_reward: parseInt(programaForm.puntos_reward) || 0, presupuesto: parseFloat(programaForm.presupuesto) || 0 }),
      });
      if (res.ok) {
        toast({ title: "Programa creado", description: `"${programaForm.nombre}" registrado exitosamente` });
        setShowProgramaDialog(false);
        setProgramaForm({ nombre: "", categoria: "reconocimiento", descripcion: "", puntos_reward: "", fecha_inicio: "", fecha_fin: "", presupuesto: "" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: err.error || "No se pudo crear el programa", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleSaveAlianza = async () => {
    if (!alianzaForm.nombre_complejo || !alianzaForm.ubicacion || !alianzaForm.vigencia_inicio || !alianzaForm.vigencia_fin) {
      toast({ title: "Campos requeridos", description: "Nombre, ubicación y vigencia son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/rrhh/bienestar", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accion: "alianza", ...alianzaForm,
          estrellas: parseInt(alianzaForm.estrellas) || 3,
          descuento_pct: parseFloat(alianzaForm.descuento_pct) || 0,
          precio_base_usd: parseFloat(alianzaForm.precio_base_usd) || 0,
          max_personas: parseInt(alianzaForm.max_personas) || 4,
        }),
      });
      if (res.ok) {
        toast({ title: "Alianza registrada", description: `Convenio con "${alianzaForm.nombre_complejo}" creado` });
        setShowAlianzaDialog(false);
        setAlianzaForm({ nombre_complejo: "", ubicacion: "", estado_ve: "Nueva Esparta", tipo: "resort", estrellas: "4", descuento_pct: "", precio_base_usd: "", incluye_familia: true, max_personas: "4", contacto_nombre: "", contacto_telefono: "", contacto_email: "", vigencia_inicio: "", vigencia_fin: "", notas: "" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: err.error || "No se pudo registrar la alianza", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const statsMotivacion = {
    programasActivos: programas.filter(p => p.activo).length,
    totalReconocimientos: reconocimientos.length,
    totalPuntos: reconocimientos.reduce((a, r) => a + r.puntos, 0),
    alianzasActivas: alianzas.length,
    planesActivos: planes.filter(p => p.estado === "aprobado" || p.estado === "en_curso").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-rose-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold uppercase tracking-wider text-rose-500 shadow-glow mb-4">
            <Heart className="h-3 w-3" /> BIENESTAR INTEGRAL
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Bienestar <span className="text-rose-500 italic">Laboral</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Motivación • Vacaciones • Alianzas Vacacionales 2026</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Programas Activos", val: statsMotivacion.programasActivos, icon: Sparkles, color: "text-violet-500" },
          { label: "Reconocimientos", val: statsMotivacion.totalReconocimientos, icon: Award, color: "text-amber-500" },
          { label: "Puntos Acumulados", val: statsMotivacion.totalPuntos.toLocaleString(), icon: Star, color: "text-yellow-500" },
          { label: "Alianzas Activas", val: statsMotivacion.alianzasActivas, icon: Building2, color: "text-blue-500" },
          { label: "Planes Vacaciones", val: statsMotivacion.planesActivos, icon: Palmtree, color: "text-emerald-500" },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="glass-card border-none bg-card/40 p-6 rounded-[2.5rem] shadow-xl group hover:bg-rose-500/5 transition-all">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight leading-none">{m.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="motivacion" className="space-y-8">
        <TabsList className="bg-card/40 rounded-xl p-1 border border-border/30 flex-wrap h-auto">
          <TabsTrigger value="motivacion" className="rounded-lg text-[10px] font-semibold uppercase tracking-widest gap-2">
            <Trophy className="h-3 w-3" /> Sistema Motivacional
          </TabsTrigger>
          <TabsTrigger value="vacaciones" className="rounded-lg text-[10px] font-semibold uppercase tracking-widest gap-2">
            <Palmtree className="h-3 w-3" /> Planes Vacacionales
          </TabsTrigger>
          <TabsTrigger value="alianzas" className="rounded-lg text-[10px] font-semibold uppercase tracking-widest gap-2">
            <Building2 className="h-3 w-3" /> Alianzas Resort
          </TabsTrigger>
        </TabsList>

        <TabsContent value="motivacion" className="space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold uppercase tracking-wider text-foreground">Programas de Motivación</h2>
            <Button onClick={() => setShowProgramaDialog(true)} className="bg-rose-500 hover:bg-rose-500/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Programa
            </Button>
          </div>

          {programas.length === 0 ? (
            <Card className="glass-card border-none rounded-2xl bg-card/40 p-16 text-center">
              <PartyPopper className="h-16 w-16 mx-auto text-rose-500/30 mb-6" />
              <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Sin programas activos</h3>
              <p className="text-muted-foreground text-sm mt-2">Crea tu primer programa motivacional para impulsar el equipo</p>
              <Button onClick={() => setShowProgramaDialog(true)} className="mt-8 bg-rose-500 hover:bg-rose-500/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Crear Programa
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programas.map((prog, i) => {
                const catInfo = CATEGORIAS_PROGRAMA.find(c => c.value === prog.categoria) || CATEGORIAS_PROGRAMA[0];
                return (
                  <motion.div key={prog.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-all group">
                      <div className="h-2 bg-gradient-to-r from-rose-500 to-amber-500" />
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                              <catInfo.icon className={cn("h-5 w-5", catInfo.color)} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">{prog.nombre}</h3>
                              <Badge variant="outline" className="text-[7px] font-semibold uppercase mt-1">{catInfo.label}</Badge>
                            </div>
                          </div>
                          <Badge className={cn("text-[7px] font-bold", prog.activo ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400")}>
                            {prog.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        {prog.descripcion && <p className="text-xs text-muted-foreground line-clamp-2">{prog.descripcion}</p>}
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Puntos Reward</p>
                            <p className="text-lg font-bold text-foreground">{prog.puntos_reward}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Participantes</p>
                            <p className="text-lg font-bold text-foreground">{prog.participantes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {reconocimientos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold uppercase tracking-wider text-foreground">Reconocimientos Recientes</h2>
              <div className="space-y-3">
                {reconocimientos.slice(0, 10).map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                          <Award className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-foreground">{r.titulo}</h4>
                            <Badge variant="outline" className="text-[7px] font-bold">{TIPOS_RECONOCIMIENTO.find(t => t.value === r.tipo)?.label || r.tipo}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{r.empleado_nombre} — {r.departamento}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-amber-500">+{r.puntos}</p>
                          <p className="text-[11px] text-muted-foreground font-bold">{new Date(r.fecha).toLocaleDateString("es-VE")}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="vacaciones" className="space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold uppercase tracking-wider text-foreground">Planes Vacacionales</h2>
          </div>

          {planes.length === 0 ? (
            <Card className="glass-card border-none rounded-2xl bg-card/40 p-16 text-center">
              <Sun className="h-16 w-16 mx-auto text-amber-500/30 mb-6" />
              <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Sin planes registrados</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Los planes vacacionales de los empleados aparecerán aquí. Programa descanso para tu equipo y vincula con alianzas de resorts.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {planes.map((plan, i) => {
                const estadoInfo = ESTADO_PLAN[plan.estado] || ESTADO_PLAN.solicitado;
                return (
                  <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-2xl shadow-lg overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Palmtree className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">{plan.empleado_nombre}</h3>
                              <p className="text-xs text-muted-foreground">{plan.destino || plan.resort_nombre || "Sin destino"} — {plan.dias_solicitados} días</p>
                              <div className="flex gap-2 mt-1">
                                <Badge className={cn("text-[7px] font-bold border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                                {plan.incluye_familia && <Badge variant="outline" className="text-[7px] font-bold text-rose-400">Familiar ({plan.num_familiares})</Badge>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 shrink-0">
                            <div className="text-center">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Salida</p>
                              <p className="text-xs font-bold text-foreground">{new Date(plan.fecha_salida).toLocaleDateString("es-VE")}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Retorno</p>
                              <p className="text-xs font-bold text-foreground">{new Date(plan.fecha_retorno).toLocaleDateString("es-VE")}</p>
                            </div>
                            {parseFloat(plan.subsidio_empresa) > 0 && (
                              <div className="text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Subsidio</p>
                                <p className="text-xs font-bold text-emerald-500">${parseFloat(plan.subsidio_empresa).toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          <Card className="glass-card border-none rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-10 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Calendar className="h-7 w-7 text-emerald-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">Política Vacacional LOTTT</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Conforme al Art. 190 de la LOTTT, todo trabajador tiene derecho a 15 días hábiles de vacaciones anuales, más 1 día adicional por cada año de servicio (hasta 15 días extra). El bono vacacional es de 15 días de salario, más 1 día adicional por año.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">Mínimo Legal</p>
                    <p className="text-2xl font-bold text-foreground">15 días</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">Máximo (15+ años)</p>
                    <p className="text-2xl font-bold text-foreground">30 días</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">Bono Base</p>
                    <p className="text-2xl font-bold text-foreground">15 días</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alianzas" className="space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold uppercase tracking-wider text-foreground">Alianzas con Complejos Vacacionales</h2>
            <Button onClick={() => setShowAlianzaDialog(true)} className="bg-blue-500 hover:bg-blue-500/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nueva Alianza
            </Button>
          </div>

          {alianzas.length === 0 ? (
            <Card className="glass-card border-none rounded-2xl bg-card/40 p-16 text-center">
              <Building2 className="h-16 w-16 mx-auto text-blue-500/30 mb-6" />
              <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Sin alianzas registradas</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Registra convenios con resorts, hoteles y posadas para ofrecer descanso de calidad a tus empleados y sus familias</p>
              <Button onClick={() => setShowAlianzaDialog(true)} className="mt-8 bg-blue-500 hover:bg-blue-500/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Registrar Alianza
              </Button>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {alianzas.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                  <Card className="glass-card border-none bg-card/40 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-40 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-emerald-500/20 relative flex items-center justify-center">
                      <Palmtree className="h-20 w-20 text-blue-500/20" />
                      <div className="absolute top-4 right-4 flex gap-1">
                        {Array.from({ length: a.estrellas }).map((_, s) => (
                          <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {parseFloat(a.descuento_pct) > 0 && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald-500 text-white font-semibold text-xs px-3 py-1">-{parseFloat(a.descuento_pct)}%</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Badge variant="outline" className="text-[7px] font-semibold uppercase mb-2">{TIPOS_COMPLEJO.find(t => t.value === a.tipo)?.label || a.tipo}</Badge>
                        <h3 className="font-bold text-lg text-foreground">{a.nombre_complejo}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{a.ubicacion}, {a.estado_ve}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Precio Base</p>
                          <p className="text-lg font-bold text-foreground">${parseFloat(a.precio_base_usd).toFixed(0)}<span className="text-[11px] text-muted-foreground font-bold">/noche</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Capacidad</p>
                          <p className="text-lg font-bold text-foreground">{a.max_personas} <span className="text-[11px] text-muted-foreground font-bold">personas</span></p>
                        </div>
                      </div>

                      {a.incluye_familia && (
                        <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-[10px] font-bold">
                          <Heart className="h-3 w-3 mr-1" /> Incluye Familia
                        </Badge>
                      )}

                      <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                        {a.contacto_telefono && <Phone className="h-3 w-3 text-muted-foreground" />}
                        {a.contacto_email && <Mail className="h-3 w-3 text-muted-foreground" />}
                        <p className="text-[11px] text-muted-foreground font-bold truncate">{a.contacto_nombre}</p>
                      </div>

                      <div className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
                        Vigencia: {new Date(a.vigencia_inicio).toLocaleDateString("es-VE")} — {new Date(a.vigencia_fin).toLocaleDateString("es-VE")}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <Card className="glass-card border-none rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-10 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Globe className="h-7 w-7 text-blue-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">Programa de Alianzas Corporativas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kyron negocia tarifas preferenciales con los mejores resorts, hoteles y posadas de Venezuela para garantizar el bienestar y descanso de calidad de nuestros colaboradores y sus familias. Los convenios incluyen descuentos exclusivos, planes familiares y opciones todo incluido.
                </p>
                <div className="grid grid-cols-4 gap-6 pt-4">
                  {[
                    { icon: Waves, label: "Playa y Mar" },
                    { icon: Coffee, label: "Spa y Relax" },
                    { icon: UtensilsCrossed, label: "Gastronomía" },
                    { icon: Dumbbell, label: "Deportes" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <s.icon className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showProgramaDialog} onOpenChange={setShowProgramaDialog}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold uppercase tracking-wider text-foreground">Nuevo Programa Motivacional</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Nombre *</Label>
                <Input value={programaForm.nombre} onChange={e => setProgramaForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Empleado del Mes" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Categoría</Label>
                <Select value={programaForm.categoria} onValueChange={v => setProgramaForm(f => ({ ...f, categoria: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIAS_PROGRAMA.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Descripción</Label>
              <Textarea value={programaForm.descripcion} onChange={e => setProgramaForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Detalle del programa motivacional..." className="mt-2 rounded-xl bg-muted/50 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Puntos Reward</Label>
                <Input type="number" value={programaForm.puntos_reward} onChange={e => setProgramaForm(f => ({ ...f, puntos_reward: e.target.value }))} placeholder="100" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fecha Inicio *</Label>
                <Input type="date" value={programaForm.fecha_inicio} onChange={e => setProgramaForm(f => ({ ...f, fecha_inicio: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fecha Fin</Label>
                <Input type="date" value={programaForm.fecha_fin} onChange={e => setProgramaForm(f => ({ ...f, fecha_fin: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Presupuesto (Bs)</Label>
              <Input type="number" value={programaForm.presupuesto} onChange={e => setProgramaForm(f => ({ ...f, presupuesto: e.target.value }))} placeholder="0.00" className="mt-2 rounded-xl bg-muted/50" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProgramaDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSavePrograma} disabled={saving} className="bg-rose-500 hover:bg-rose-500/90 rounded-xl font-semibold text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Crear Programa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAlianzaDialog} onOpenChange={setShowAlianzaDialog}>
        <DialogContent className="sm:max-w-[750px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold uppercase tracking-wider text-foreground">Nueva Alianza Vacacional</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Nombre del Complejo *</Label>
                <Input value={alianzaForm.nombre_complejo} onChange={e => setAlianzaForm(f => ({ ...f, nombre_complejo: e.target.value }))} placeholder="Resort Paradise Island" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Tipo</Label>
                <Select value={alianzaForm.tipo} onValueChange={v => setAlianzaForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{TIPOS_COMPLEJO.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Ubicación *</Label>
                <Input value={alianzaForm.ubicacion} onChange={e => setAlianzaForm(f => ({ ...f, ubicacion: e.target.value }))} placeholder="Isla de Margarita, Playa El Agua" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Estado *</Label>
                <Select value={alianzaForm.estado_ve} onValueChange={v => setAlianzaForm(f => ({ ...f, estado_ve: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Estrellas</Label>
                <Select value={alianzaForm.estrellas} onValueChange={v => setAlianzaForm(f => ({ ...f, estrellas: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{"★".repeat(n)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Descuento %</Label>
                <Input type="number" value={alianzaForm.descuento_pct} onChange={e => setAlianzaForm(f => ({ ...f, descuento_pct: e.target.value }))} placeholder="20" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Precio USD/noche</Label>
                <Input type="number" value={alianzaForm.precio_base_usd} onChange={e => setAlianzaForm(f => ({ ...f, precio_base_usd: e.target.value }))} placeholder="85" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Máx. Personas</Label>
                <Input type="number" value={alianzaForm.max_personas} onChange={e => setAlianzaForm(f => ({ ...f, max_personas: e.target.value }))} placeholder="4" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Contacto</Label>
                <Input value={alianzaForm.contacto_nombre} onChange={e => setAlianzaForm(f => ({ ...f, contacto_nombre: e.target.value }))} placeholder="Nombre del contacto" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Teléfono</Label>
                <Input value={alianzaForm.contacto_telefono} onChange={e => setAlianzaForm(f => ({ ...f, contacto_telefono: e.target.value }))} placeholder="+58 412..." className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input value={alianzaForm.contacto_email} onChange={e => setAlianzaForm(f => ({ ...f, contacto_email: e.target.value }))} placeholder="reservas@resort.com" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Vigencia Desde *</Label>
                <Input type="date" value={alianzaForm.vigencia_inicio} onChange={e => setAlianzaForm(f => ({ ...f, vigencia_inicio: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Vigencia Hasta *</Label>
                <Input type="date" value={alianzaForm.vigencia_fin} onChange={e => setAlianzaForm(f => ({ ...f, vigencia_fin: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Notas</Label>
              <Textarea value={alianzaForm.notas} onChange={e => setAlianzaForm(f => ({ ...f, notas: e.target.value }))} placeholder="Condiciones especiales, temporada alta, etc." className="mt-2 rounded-xl bg-muted/50 min-h-[60px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlianzaDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSaveAlianza} disabled={saving} className="bg-blue-500 hover:bg-blue-500/90 rounded-xl font-semibold text-[10px] font-semibold uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Registrar Alianza
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
