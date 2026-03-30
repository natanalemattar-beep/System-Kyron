"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BookOpen, FileText, Users, Plus, Search, ChevronRight, ChevronDown,
  Loader2, Shield, AlertTriangle, CheckCircle, Clock, Eye,
  Building2, Briefcase, Crown, UserCog, User,
  FileSignature, Ban, Gift, Scale, Calendar, Pen
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface Manual {
  id: number;
  titulo: string;
  departamento: string;
  cargo_destino: string;
  version: string;
  contenido: string;
  procedimientos: string[];
  prohibiciones: string[];
  estado: string;
  aprobado_por: string;
  fecha_aprobacion: string | null;
  created_at: string;
}

interface NodoOrganigrama {
  id: number;
  nombre_cargo: string;
  departamento: string;
  nivel: number;
  padre_id: number | null;
  titular: string;
  empleado_nombre: string | null;
  tipo: string;
  color: string;
}

interface Contrato {
  id: number;
  empleado_nombre: string | null;
  titulo: string;
  tipo_contrato: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  cargo: string;
  departamento: string;
  salario: string;
  beneficios: string[];
  prohibiciones: string[];
  clausulas: string[];
  horario: string;
  estado: string;
  firmado_empleado: boolean;
  firmado_empresa: boolean;
}

const DEPARTAMENTOS = ["Ventas", "Tecnología", "Admin", "Soporte", "Diseño", "Gerencia", "RRHH", "Legal", "Contabilidad", "Operaciones"];

const ESTADOS_MANUAL: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  borrador: { label: "Borrador", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: Pen },
  revision: { label: "En Revisión", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: Eye },
  aprobado: { label: "Aprobado", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: CheckCircle },
  vigente: { label: "Vigente", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle },
  obsoleto: { label: "Obsoleto", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
};

const TIPOS_NODO: Record<string, { label: string; color: string; icon: typeof Crown }> = {
  direccion: { label: "Dirección", color: "bg-amber-500", icon: Crown },
  gerencia: { label: "Gerencia", color: "bg-blue-500", icon: Building2 },
  coordinacion: { label: "Coordinación", color: "bg-violet-500", icon: UserCog },
  cargo: { label: "Cargo", color: "bg-emerald-500", icon: User },
  asistencia: { label: "Asistencia", color: "bg-cyan-500", icon: Briefcase },
};

const TIPOS_CONTRATO: Record<string, string> = {
  indefinido: "Tiempo Indefinido",
  determinado: "Tiempo Determinado",
  obra: "Por Obra",
  temporal: "Temporal",
  pasantia: "Pasantía",
};

const ESTADOS_CONTRATO: Record<string, { label: string; color: string }> = {
  borrador: { label: "Borrador", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  revision: { label: "En Revisión", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  firmado: { label: "Firmado", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  vigente: { label: "Vigente", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  finalizado: { label: "Finalizado", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  rescindido: { label: "Rescindido", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function ManualesRRHHPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [manuales, setManuales] = useState<Manual[]>([]);
  const [nodos, setNodos] = useState<NodoOrganigrama[]>([]);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [saving, setSaving] = useState(false);

  const [showManualDialog, setShowManualDialog] = useState(false);
  const [showNodoDialog, setShowNodoDialog] = useState(false);
  const [showContratoDialog, setShowContratoDialog] = useState(false);
  const [expandedManual, setExpandedManual] = useState<number | null>(null);

  const [manualForm, setManualForm] = useState({
    titulo: "", departamento: "Tecnología", cargo_destino: "", version: "1.0",
    contenido: "", procedimientos: "", prohibiciones: ""
  });

  const [nodoForm, setNodoForm] = useState({
    nombre_cargo: "", departamento: "Gerencia", nivel: "0", padre_id: "",
    titular: "", tipo: "cargo", color: "#3b82f6"
  });

  const [contratoForm, setContratoForm] = useState({
    titulo: "", tipo_contrato: "indefinido", fecha_inicio: "", fecha_fin: "",
    cargo: "", departamento: "Tecnología", salario: "", beneficios: "",
    prohibiciones: "", horario: "Lunes a Viernes 8:00 AM - 5:00 PM"
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rrhh/manuales");
      if (res.ok) {
        const data = await res.json();
        setManuales(data.manuales ?? []);
        setNodos(data.nodos ?? []);
        setContratos(data.contratos ?? []);
      } else if (res.status !== 401) {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error al cargar datos", description: err.error || "No se pudieron obtener los manuales", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", description: "No se pudo contactar al servidor", variant: "destructive" }); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSaveManual = async () => {
    if (!manualForm.titulo || !manualForm.departamento || !manualForm.contenido) {
      toast({ title: "Campos requeridos", description: "Título, departamento y contenido son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const procs = manualForm.procedimientos.split("\n").filter(l => l.trim());
      const prohs = manualForm.prohibiciones.split("\n").filter(l => l.trim());
      const res = await fetch("/api/rrhh/manuales", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "manual", ...manualForm, procedimientos: procs, prohibiciones: prohs }),
      });
      if (res.ok) {
        toast({ title: "Manual creado", description: `"${manualForm.titulo}" registrado exitosamente` });
        setShowManualDialog(false);
        setManualForm({ titulo: "", departamento: "Tecnología", cargo_destino: "", version: "1.0", contenido: "", procedimientos: "", prohibiciones: "" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: err.error || "No se pudo crear el manual", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleSaveNodo = async () => {
    if (!nodoForm.nombre_cargo || !nodoForm.departamento) {
      toast({ title: "Campos requeridos", description: "Cargo y departamento son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/rrhh/manuales", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "nodo_organigrama", ...nodoForm, nivel: parseInt(nodoForm.nivel) || 0, padre_id: nodoForm.padre_id ? parseInt(nodoForm.padre_id) : null }),
      });
      if (res.ok) {
        toast({ title: "Nodo creado", description: `"${nodoForm.nombre_cargo}" añadido al organigrama` });
        setShowNodoDialog(false);
        setNodoForm({ nombre_cargo: "", departamento: "Gerencia", nivel: "0", padre_id: "", titular: "", tipo: "cargo", color: "#3b82f6" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: err.error || "No se pudo agregar al organigrama", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleSaveContrato = async () => {
    if (!contratoForm.titulo || !contratoForm.fecha_inicio || !contratoForm.cargo || !contratoForm.departamento) {
      toast({ title: "Campos requeridos", description: "Título, fecha inicio, cargo y departamento son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const bens = contratoForm.beneficios.split("\n").filter(l => l.trim());
      const prohs = contratoForm.prohibiciones.split("\n").filter(l => l.trim());
      const res = await fetch("/api/rrhh/manuales", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accion: "contrato", ...contratoForm,
          salario: parseFloat(contratoForm.salario) || 0,
          beneficios: bens, prohibiciones: prohs, clausulas: [],
        }),
      });
      if (res.ok) {
        toast({ title: "Contrato registrado", description: `"${contratoForm.titulo}" creado exitosamente` });
        setShowContratoDialog(false);
        setContratoForm({ titulo: "", tipo_contrato: "indefinido", fecha_inicio: "", fecha_fin: "", cargo: "", departamento: "Tecnología", salario: "", beneficios: "", prohibiciones: "", horario: "Lunes a Viernes 8:00 AM - 5:00 PM" });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "Error", description: err.error || "No se pudo crear el contrato", variant: "destructive" });
      }
    } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const nodosByNivel = nodos.reduce<Record<number, NodoOrganigrama[]>>((acc, n) => {
    if (!acc[n.nivel]) acc[n.nivel] = [];
    acc[n.nivel].push(n);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-indigo-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500 shadow-glow mb-4">
            <BookOpen className="h-3 w-3" /> NORMATIVA LABORAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Manuales y <span className="text-indigo-500 italic">Contratos</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Procedimientos • Organigrama • Contratos Laborales 2026</p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Manuales", val: manuales.length, icon: BookOpen, color: "text-indigo-500" },
          { label: "Cargos en Organigrama", val: nodos.length, icon: Users, color: "text-blue-500" },
          { label: "Contratos", val: contratos.length, icon: FileSignature, color: "text-emerald-500" },
          { label: "Vigentes", val: contratos.filter(c => c.estado === "vigente").length + manuales.filter(m => m.estado === "vigente").length, icon: CheckCircle, color: "text-green-500" },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl group hover:bg-indigo-500/5 transition-all">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <p className="text-4xl font-black text-foreground tracking-tight leading-none">{m.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="manuales" className="space-y-8">
        <TabsList className="bg-card/40 rounded-xl p-1 border border-border/30 flex-wrap h-auto">
          <TabsTrigger value="manuales" className="rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
            <BookOpen className="h-3 w-3" /> Manuales de Procedimientos
          </TabsTrigger>
          <TabsTrigger value="organigrama" className="rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
            <Users className="h-3 w-3" /> Organigrama
          </TabsTrigger>
          <TabsTrigger value="contratos" className="rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
            <FileSignature className="h-3 w-3" /> Contratos Laborales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manuales" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Manuales de Procedimientos</h2>
            <Button onClick={() => setShowManualDialog(true)} className="bg-indigo-500 hover:bg-indigo-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Manual
            </Button>
          </div>

          {manuales.length === 0 ? (
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-indigo-500/30 mb-6" />
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">Sin manuales registrados</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Crea manuales de procedimientos para cada área y cargo, incluyendo responsabilidades y prohibiciones del puesto de trabajo</p>
              <Button onClick={() => setShowManualDialog(true)} className="mt-8 bg-indigo-500 hover:bg-indigo-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Crear Manual
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {manuales.map((m, i) => {
                const estadoInfo = ESTADOS_MANUAL[m.estado] || ESTADOS_MANUAL.borrador;
                const isExpanded = expandedManual === m.id;
                const procs = Array.isArray(m.procedimientos) ? m.procedimientos : [];
                const prohs = Array.isArray(m.prohibiciones) ? m.prohibiciones : [];
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6 cursor-pointer" onClick={() => setExpandedManual(isExpanded ? null : m.id)}>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <BookOpen className="h-6 w-6 text-indigo-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-black text-sm text-foreground">{m.titulo}</h3>
                              <Badge variant="outline" className="text-[7px] font-black">v{m.version}</Badge>
                              <Badge className={cn("text-[7px] font-black border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[7px]">{m.departamento}</Badge>
                              {m.cargo_destino && <span className="text-[9px] text-muted-foreground">Cargo: {m.cargo_destino}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] text-muted-foreground">{new Date(m.created_at).toLocaleDateString("es-VE")}</span>
                            {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-border/30 pt-4 space-y-4">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Descripción General</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.contenido}</p>
                          </div>
                          {procs.length > 0 && (
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-2 flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" /> Procedimientos y Responsabilidades
                              </p>
                              <ul className="space-y-1.5">
                                {procs.map((p: string, j: number) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-foreground/80">
                                    <span className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[9px] font-black shrink-0 mt-0.5">{j + 1}</span>
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {prohs.length > 0 && (
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-2 flex items-center gap-2">
                                <Ban className="h-3 w-3" /> Prohibiciones en el Área de Trabajo
                              </p>
                              <ul className="space-y-1.5">
                                {prohs.map((p: string, j: number) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-red-400/80">
                                    <Ban className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="organigrama" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Organigrama Corporativo</h2>
            <Button onClick={() => setShowNodoDialog(true)} className="bg-blue-500 hover:bg-blue-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Cargo
            </Button>
          </div>

          {nodos.length === 0 ? (
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 text-center">
              <Users className="h-16 w-16 mx-auto text-blue-500/30 mb-6" />
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">Organigrama vacío</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Define la estructura jerárquica de la organización agregando cargos por nivel (Dirección, Gerencia, Coordinación, etc.)</p>
              <Button onClick={() => setShowNodoDialog(true)} className="mt-8 bg-blue-500 hover:bg-blue-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Agregar Primer Cargo
              </Button>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(nodosByNivel).sort(([a], [b]) => Number(a) - Number(b)).map(([nivel, items]) => (
                <div key={nivel} className="space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-border/30" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Nivel {nivel}</span>
                    <div className="h-px flex-1 bg-border/30" />
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {items.map((nodo, i) => {
                      const tipoInfo = TIPOS_NODO[nodo.tipo] || TIPOS_NODO.cargo;
                      return (
                        <motion.div key={nodo.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                          <Card className="glass-card border-none bg-card/50 rounded-2xl shadow-lg w-56 overflow-hidden hover:shadow-xl transition-all">
                            <div className={cn("h-1.5", tipoInfo.color)} />
                            <CardContent className="p-4 text-center space-y-2">
                              <div className={cn("h-10 w-10 rounded-full mx-auto flex items-center justify-center text-white", tipoInfo.color)}>
                                <tipoInfo.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-black text-xs text-foreground uppercase tracking-wide">{nodo.nombre_cargo}</p>
                                <Badge variant="outline" className="text-[7px] mt-1">{nodo.departamento}</Badge>
                              </div>
                              <p className="text-[10px] text-muted-foreground font-bold">
                                {nodo.empleado_nombre || nodo.titular || "Vacante"}
                              </p>
                              <Badge className="text-[7px] font-black bg-muted/50 text-muted-foreground">{tipoInfo.label}</Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Card className="glass-card border-none rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-foreground uppercase tracking-wider mb-2">Estructura Jerárquica</h3>
                    <p className="text-xs text-muted-foreground">El organigrama refleja la cadena de mando conforme a la LOTTT. Los niveles van desde Dirección (nivel 0) hasta cargos operativos. Cada nodo puede vincularse a un empleado registrado en el sistema.</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contratos" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Contratos Laborales</h2>
            <Button onClick={() => setShowContratoDialog(true)} className="bg-emerald-500 hover:bg-emerald-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Contrato
            </Button>
          </div>

          {contratos.length === 0 ? (
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 text-center">
              <FileSignature className="h-16 w-16 mx-auto text-emerald-500/30 mb-6" />
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">Sin contratos registrados</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Registra contratos laborales con beneficios, prohibiciones en el área de trabajo y cláusulas conforme a la LOTTT</p>
              <Button onClick={() => setShowContratoDialog(true)} className="mt-8 bg-emerald-500 hover:bg-emerald-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Crear Contrato
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {contratos.map((c, i) => {
                const estadoInfo = ESTADOS_CONTRATO[c.estado] || ESTADOS_CONTRATO.borrador;
                const bens = Array.isArray(c.beneficios) ? c.beneficios : [];
                const prohs = Array.isArray(c.prohibiciones) ? c.prohibiciones : [];
                return (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                      <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-black text-sm text-foreground">{c.titulo}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-[7px] font-black">{TIPOS_CONTRATO[c.tipo_contrato] || c.tipo_contrato}</Badge>
                              <Badge className={cn("text-[7px] font-black border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                            </div>
                          </div>
                          <FileSignature className="h-5 w-5 text-emerald-500/30" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">Cargo</p>
                            <p className="font-bold text-foreground">{c.cargo}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">Departamento</p>
                            <p className="font-bold text-foreground">{c.departamento}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">Salario</p>
                            <p className="font-bold text-foreground">Bs. {parseFloat(c.salario).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">Horario</p>
                            <p className="font-bold text-foreground text-[10px]">{c.horario}</p>
                          </div>
                        </div>

                        {bens.length > 0 && (
                          <div className="pt-3 border-t border-border/30">
                            <p className="text-[8px] font-black uppercase tracking-widest text-emerald-500 mb-2 flex items-center gap-1">
                              <Gift className="h-3 w-3" /> Beneficios
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {bens.map((b: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[8px] bg-emerald-500/5 text-emerald-400 border-emerald-500/20">{b}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {prohs.length > 0 && (
                          <div className="pt-3 border-t border-border/30">
                            <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-2 flex items-center gap-1">
                              <Ban className="h-3 w-3" /> Prohibiciones
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {prohs.map((p: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[8px] bg-red-500/5 text-red-400 border-red-500/20">{p}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                          <div className="flex items-center gap-1">
                            <div className={cn("h-2 w-2 rounded-full", c.firmado_empresa ? "bg-emerald-500" : "bg-muted")} />
                            <span className="text-[8px] text-muted-foreground font-bold">Empresa</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={cn("h-2 w-2 rounded-full", c.firmado_empleado ? "bg-emerald-500" : "bg-muted")} />
                            <span className="text-[8px] text-muted-foreground font-bold">Empleado</span>
                          </div>
                          <span className="ml-auto text-[8px] text-muted-foreground">
                            {new Date(c.fecha_inicio).toLocaleDateString("es-VE")}
                            {c.fecha_fin && ` — ${new Date(c.fecha_fin).toLocaleDateString("es-VE")}`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          <Card className="glass-card border-none rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Scale className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-sm text-foreground uppercase tracking-wider">Marco Legal LOTTT</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Los contratos de trabajo cumplen con la Ley Orgánica del Trabajo, Los Trabajadores y Las Trabajadoras (LOTTT 2012). Incluyen: jornada laboral (Art. 173), salario mínimo vigente, prestaciones sociales, vacaciones (Art. 190), utilidades (Art. 131), y derechos irrenunciables del trabajador.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-3">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Jornada Diurna</p>
                    <p className="text-lg font-black text-foreground">8h/día</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Jornada Semanal</p>
                    <p className="text-lg font-black text-foreground">40h/sem</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Descanso</p>
                    <p className="text-lg font-black text-foreground">2 días</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">Nuevo Manual de Procedimientos</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Título *</Label>
                <Input value={manualForm.titulo} onChange={e => setManualForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Manual de Procedimientos - Ventas" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Versión</Label>
                <Input value={manualForm.version} onChange={e => setManualForm(f => ({ ...f, version: e.target.value }))} placeholder="1.0" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Departamento *</Label>
                <Select value={manualForm.departamento} onValueChange={v => setManualForm(f => ({ ...f, departamento: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cargo Destino</Label>
                <Input value={manualForm.cargo_destino} onChange={e => setManualForm(f => ({ ...f, cargo_destino: e.target.value }))} placeholder="Asesor Comercial" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Contenido General *</Label>
              <Textarea value={manualForm.contenido} onChange={e => setManualForm(f => ({ ...f, contenido: e.target.value }))} placeholder="Descripción general del manual, alcance y objetivos..." className="mt-2 rounded-xl bg-muted/50 min-h-[100px]" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Procedimientos (uno por línea)</Label>
              <Textarea value={manualForm.procedimientos} onChange={e => setManualForm(f => ({ ...f, procedimientos: e.target.value }))} placeholder={"Registrar asistencia al inicio de jornada\nReportar al supervisor inmediato\nCompletar formulario de actividades diarias"} className="mt-2 rounded-xl bg-muted/50 min-h-[100px]" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-red-500">Prohibiciones en el área (una por línea)</Label>
              <Textarea value={manualForm.prohibiciones} onChange={e => setManualForm(f => ({ ...f, prohibiciones: e.target.value }))} placeholder={"Uso de teléfono personal en horario laboral\nCompartir información confidencial\nAusentarse sin autorización"} className="mt-2 rounded-xl bg-muted/50 min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManualDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSaveManual} disabled={saving} className="bg-indigo-500 hover:bg-indigo-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Crear Manual
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNodoDialog} onOpenChange={setShowNodoDialog}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">Nuevo Cargo en Organigrama</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Nombre del Cargo *</Label>
                <Input value={nodoForm.nombre_cargo} onChange={e => setNodoForm(f => ({ ...f, nombre_cargo: e.target.value }))} placeholder="Gerente de Tecnología" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Departamento *</Label>
                <Select value={nodoForm.departamento} onValueChange={v => setNodoForm(f => ({ ...f, departamento: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Tipo</Label>
                <Select value={nodoForm.tipo} onValueChange={v => setNodoForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direccion">Dirección</SelectItem>
                    <SelectItem value="gerencia">Gerencia</SelectItem>
                    <SelectItem value="coordinacion">Coordinación</SelectItem>
                    <SelectItem value="cargo">Cargo</SelectItem>
                    <SelectItem value="asistencia">Asistencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Nivel Jerárquico</Label>
                <Input type="number" value={nodoForm.nivel} onChange={e => setNodoForm(f => ({ ...f, nivel: e.target.value }))} placeholder="0" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Titular</Label>
                <Input value={nodoForm.titular} onChange={e => setNodoForm(f => ({ ...f, titular: e.target.value }))} placeholder="Nombre del titular" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNodoDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSaveNodo} disabled={saving} className="bg-blue-500 hover:bg-blue-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Agregar al Organigrama
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showContratoDialog} onOpenChange={setShowContratoDialog}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">Nuevo Contrato Laboral</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Título del Contrato *</Label>
                <Input value={contratoForm.titulo} onChange={e => setContratoForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Contrato de Trabajo - Desarrollador" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Tipo de Contrato</Label>
                <Select value={contratoForm.tipo_contrato} onValueChange={v => setContratoForm(f => ({ ...f, tipo_contrato: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(TIPOS_CONTRATO).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cargo *</Label>
                <Input value={contratoForm.cargo} onChange={e => setContratoForm(f => ({ ...f, cargo: e.target.value }))} placeholder="Desarrollador Full-Stack" className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Departamento *</Label>
                <Select value={contratoForm.departamento} onValueChange={v => setContratoForm(f => ({ ...f, departamento: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTAMENTOS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Fecha Inicio *</Label>
                <Input type="date" value={contratoForm.fecha_inicio} onChange={e => setContratoForm(f => ({ ...f, fecha_inicio: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Fecha Fin</Label>
                <Input type="date" value={contratoForm.fecha_fin} onChange={e => setContratoForm(f => ({ ...f, fecha_fin: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
              </div>
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Salario (Bs)</Label>
                <Input type="number" value={contratoForm.salario} onChange={e => setContratoForm(f => ({ ...f, salario: e.target.value }))} placeholder="0.00" className="mt-2 rounded-xl bg-muted/50" />
              </div>
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Horario</Label>
              <Input value={contratoForm.horario} onChange={e => setContratoForm(f => ({ ...f, horario: e.target.value }))} className="mt-2 rounded-xl bg-muted/50" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Beneficios del cargo (uno por línea)</Label>
              <Textarea value={contratoForm.beneficios} onChange={e => setContratoForm(f => ({ ...f, beneficios: e.target.value }))} placeholder={"Seguro HCM\nBono de alimentación\nDías libres adicionales\nCapacitación continua\nPlan vacacional preferencial"} className="mt-2 rounded-xl bg-muted/50 min-h-[100px]" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-red-500">Prohibiciones en el área de trabajo (una por línea)</Label>
              <Textarea value={contratoForm.prohibiciones} onChange={e => setContratoForm(f => ({ ...f, prohibiciones: e.target.value }))} placeholder={"Uso de dispositivos personales en horario\nDivulgación de información confidencial\nAusentarse sin permiso escrito\nConsumo de alimentos en el área de trabajo"} className="mt-2 rounded-xl bg-muted/50 min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContratoDialog(false)} className="rounded-xl">Cancelar</Button>
            <Button onClick={handleSaveContrato} disabled={saving} className="bg-emerald-500 hover:bg-emerald-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Crear Contrato
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
