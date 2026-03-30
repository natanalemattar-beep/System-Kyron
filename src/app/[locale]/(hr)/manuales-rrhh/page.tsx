"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  BookOpen, FileText, Users, Plus, Search, ChevronRight, ChevronDown,
  Loader2, Shield, AlertTriangle, CheckCircle, Clock, Eye,
  Building2, Briefcase, Crown, UserCog, User,
  FileSignature, Ban, Gift, Scale, Calendar, Pen, Filter,
  Download, Printer, Edit, Trash2, X, ArrowDown, LayoutGrid, List
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
import { motion, AnimatePresence } from "framer-motion";

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

function OrgTreeNode({ nodo, children, isRoot }: { nodo: NodoOrganigrama; children?: NodoOrganigrama[]; isRoot?: boolean }) {
  const tipoInfo = TIPOS_NODO[nodo.tipo] || TIPOS_NODO.cargo;
  const childNodes = children || [];

  return (
    <div className="flex flex-col items-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
        <Card className={cn(
          "glass-card border-none bg-card/60 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all w-52",
          isRoot && "ring-2 ring-amber-500/30 shadow-amber-500/10"
        )}>
          <div className={cn("h-1.5", tipoInfo.color)} />
          <CardContent className="p-4 text-center space-y-1.5">
            <div className={cn("h-10 w-10 rounded-full mx-auto flex items-center justify-center text-white shadow-lg", tipoInfo.color)}>
              <tipoInfo.icon className="h-5 w-5" />
            </div>
            <p className="font-black text-[11px] text-foreground uppercase tracking-wide leading-tight">{nodo.nombre_cargo}</p>
            <Badge variant="outline" className="text-[7px] mt-0.5">{nodo.departamento}</Badge>
            <p className="text-[10px] text-muted-foreground font-bold">
              {nodo.empleado_nombre || nodo.titular || <span className="italic text-muted-foreground/40">Vacante</span>}
            </p>
            <Badge className="text-[7px] font-black bg-muted/50 text-muted-foreground">{tipoInfo.label}</Badge>
          </CardContent>
        </Card>
      </motion.div>

      {childNodes.length > 0 && (
        <>
          <div className="w-px h-6 bg-border/50" />
          {childNodes.length > 1 && (
            <div className="relative w-full flex justify-center">
              <div className="absolute top-0 h-px bg-border/50" style={{
                left: `${100 / (childNodes.length * 2)}%`,
                right: `${100 / (childNodes.length * 2)}%`,
              }} />
            </div>
          )}
          <div className="flex gap-4 flex-wrap justify-center">
            {childNodes.map(child => (
              <div key={child.id} className="flex flex-col items-center">
                {childNodes.length > 1 && <div className="w-px h-4 bg-border/50" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
  const [expandedContrato, setExpandedContrato] = useState<number | null>(null);
  const [selectedManual, setSelectedManual] = useState<Manual | null>(null);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);

  const [searchManuales, setSearchManuales] = useState("");
  const [filterDeptManuales, setFilterDeptManuales] = useState("todos");
  const [searchContratos, setSearchContratos] = useState("");
  const [filterDeptContratos, setFilterDeptContratos] = useState("todos");
  const [filterTipoContrato, setFilterTipoContrato] = useState("todos");
  const [orgViewMode, setOrgViewMode] = useState<"tree" | "grid">("tree");

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

  const nodosByParent = useMemo(() => {
    const map: Record<number, NodoOrganigrama[]> = {};
    nodos.forEach(n => {
      const pid = n.padre_id || 0;
      if (!map[pid]) map[pid] = [];
      map[pid].push(n);
    });
    return map;
  }, [nodos]);

  const rootNodos = useMemo(() => nodos.filter(n => !n.padre_id), [nodos]);

  const filteredManuales = useMemo(() => {
    return manuales.filter(m => {
      const matchSearch = !searchManuales ||
        m.titulo.toLowerCase().includes(searchManuales.toLowerCase()) ||
        m.cargo_destino?.toLowerCase().includes(searchManuales.toLowerCase()) ||
        m.contenido?.toLowerCase().includes(searchManuales.toLowerCase());
      const matchDept = filterDeptManuales === "todos" || m.departamento === filterDeptManuales;
      return matchSearch && matchDept;
    });
  }, [manuales, searchManuales, filterDeptManuales]);

  const filteredContratos = useMemo(() => {
    return contratos.filter(c => {
      const matchSearch = !searchContratos ||
        c.titulo.toLowerCase().includes(searchContratos.toLowerCase()) ||
        c.cargo?.toLowerCase().includes(searchContratos.toLowerCase()) ||
        c.empleado_nombre?.toLowerCase().includes(searchContratos.toLowerCase());
      const matchDept = filterDeptContratos === "todos" || c.departamento === filterDeptContratos;
      const matchTipo = filterTipoContrato === "todos" || c.tipo_contrato === filterTipoContrato;
      return matchSearch && matchDept && matchTipo;
    });
  }, [contratos, searchContratos, filterDeptContratos, filterTipoContrato]);

  const deptsManuales = useMemo(() => [...new Set(manuales.map(m => m.departamento))], [manuales]);
  const deptsContratos = useMemo(() => [...new Set(contratos.map(c => c.departamento))], [contratos]);

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
          { label: "Manuales", val: manuales.length, sub: `${manuales.filter(m => m.estado === "vigente").length} vigentes`, icon: BookOpen, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "Cargos en Organigrama", val: nodos.length, sub: `${Object.keys(nodosByNivel).length} niveles`, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Contratos", val: contratos.length, sub: `${contratos.filter(c => c.estado === "vigente").length} vigentes`, icon: FileSignature, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Prohibiciones Registradas", val: manuales.reduce((s, m) => s + (Array.isArray(m.prohibiciones) ? m.prohibiciones.length : 0), 0) + contratos.reduce((s, c) => s + (Array.isArray(c.prohibiciones) ? c.prohibiciones.length : 0), 0), sub: "en manuales y contratos", icon: Ban, color: "text-red-500", bg: "bg-red-500/10" },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl group hover:bg-indigo-500/5 transition-all">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{m.label}</p>
                <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", m.bg)}>
                  <m.icon className={cn("h-4 w-4", m.color)} />
                </div>
              </div>
              <p className="text-4xl font-black text-foreground tracking-tight leading-none">{m.val}</p>
              <p className="text-[9px] text-muted-foreground/50 mt-2 font-bold">{m.sub}</p>
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

        {/* ==================== MANUALES DE PROCEDIMIENTOS ==================== */}
        <TabsContent value="manuales" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Manuales de Procedimientos</h2>
            <Button onClick={() => setShowManualDialog(true)} className="bg-indigo-500 hover:bg-indigo-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Manual
            </Button>
          </div>

          {manuales.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                <Input
                  value={searchManuales}
                  onChange={e => setSearchManuales(e.target.value)}
                  placeholder="Buscar por título, cargo o contenido..."
                  className="pl-10 rounded-xl bg-card/40 border-border/30"
                />
              </div>
              <Select value={filterDeptManuales} onValueChange={setFilterDeptManuales}>
                <SelectTrigger className="w-48 rounded-xl bg-card/40 border-border/30">
                  <Filter className="h-3 w-3 mr-2 text-muted-foreground/40" />
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los departamentos</SelectItem>
                  {deptsManuales.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          {filteredManuales.length === 0 && manuales.length === 0 ? (
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-indigo-500/30 mb-6" />
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">Sin manuales registrados</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Crea manuales de procedimientos para cada área y cargo, incluyendo responsabilidades y prohibiciones del puesto de trabajo</p>
              <Button onClick={() => setShowManualDialog(true)} className="mt-8 bg-indigo-500 hover:bg-indigo-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Crear Manual
              </Button>
            </Card>
          ) : filteredManuales.length === 0 ? (
            <Card className="glass-card border-none rounded-[2rem] bg-card/40 p-12 text-center">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground text-sm">No se encontraron manuales con los filtros aplicados</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredManuales.map((m, i) => {
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
                              <span className="text-[8px] text-muted-foreground/40 ml-2">{procs.length} procedimientos • {prohs.length} prohibiciones</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <Button
                              variant="ghost" size="sm"
                              className="h-8 w-8 p-0 rounded-lg"
                              onClick={(e) => { e.stopPropagation(); setSelectedManual(m); }}
                            >
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <span className="text-[9px] text-muted-foreground">{new Date(m.created_at).toLocaleDateString("es-VE")}</span>
                            {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-border/30 pt-4 space-y-4">
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Descripción General</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.contenido}</p>
                              </div>
                              {procs.length > 0 && (
                                <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" /> Procedimientos y Responsabilidades ({procs.length})
                                  </p>
                                  <ul className="space-y-2">
                                    {procs.map((p: string, j: number) => (
                                      <li key={j} className="flex items-start gap-3 text-xs text-foreground/80">
                                        <span className="h-6 w-6 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-500 text-[9px] font-black shrink-0 mt-0.5">{j + 1}</span>
                                        <span className="pt-0.5">{p}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {prohs.length > 0 && (
                                <div className="bg-red-500/5 rounded-2xl p-5 border border-red-500/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                                    <Ban className="h-3 w-3" /> Prohibiciones en el Área de Trabajo ({prohs.length})
                                  </p>
                                  <ul className="space-y-2">
                                    {prohs.map((p: string, j: number) => (
                                      <li key={j} className="flex items-start gap-3 text-xs text-red-400/80">
                                        <div className="h-6 w-6 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                                          <Ban className="h-3 w-3 text-red-500" />
                                        </div>
                                        <span className="pt-0.5">{p}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ==================== ORGANIGRAMA ==================== */}
        <TabsContent value="organigrama" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Organigrama Corporativo</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-card/40 rounded-xl border border-border/30 p-1">
                <Button
                  variant="ghost" size="sm"
                  className={cn("rounded-lg h-8 px-3 text-[9px] font-black uppercase", orgViewMode === "tree" && "bg-blue-500/10 text-blue-500")}
                  onClick={() => setOrgViewMode("tree")}
                >
                  <LayoutGrid className="h-3 w-3 mr-1" /> Árbol
                </Button>
                <Button
                  variant="ghost" size="sm"
                  className={cn("rounded-lg h-8 px-3 text-[9px] font-black uppercase", orgViewMode === "grid" && "bg-blue-500/10 text-blue-500")}
                  onClick={() => setOrgViewMode("grid")}
                >
                  <List className="h-3 w-3 mr-1" /> Grid
                </Button>
              </div>
              <Button onClick={() => setShowNodoDialog(true)} className="bg-blue-500 hover:bg-blue-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
                <Plus className="mr-2 h-4 w-4" /> Nuevo Cargo
              </Button>
            </div>
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
          ) : orgViewMode === "tree" ? (
            <div className="space-y-6">
              <Card className="glass-card border-none rounded-[2.5rem] bg-card/30 p-8 overflow-x-auto">
                <div className="min-w-[600px]">
                  {Object.entries(nodosByNivel).sort(([a], [b]) => Number(a) - Number(b)).map(([nivel, items], nivelIdx) => (
                    <div key={nivel} className="relative">
                      {nivelIdx > 0 && (
                        <div className="flex justify-center py-2">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground/30">
                            <ArrowDown className="h-3 w-3" />
                            <span>Reporta a Nivel {Number(nivel) - 1}</span>
                            <ArrowDown className="h-3 w-3" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/60 border border-border/30">
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Nivel {nivel}</span>
                          <Badge variant="outline" className="text-[7px]">{items.length} {items.length === 1 ? "cargo" : "cargos"}</Badge>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
                      </div>

                      <div className="flex flex-wrap gap-4 justify-center pb-4">
                        {items.map((nodo, i) => {
                          const tipoInfo = TIPOS_NODO[nodo.tipo] || TIPOS_NODO.cargo;
                          const childCount = (nodosByParent[nodo.id] || []).length;
                          return (
                            <motion.div key={nodo.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                              <Card className={cn(
                                "glass-card border-none bg-card/60 rounded-2xl shadow-lg w-56 overflow-hidden hover:shadow-xl transition-all",
                                Number(nivel) === 0 && "ring-2 ring-amber-500/20"
                              )}>
                                <div className={cn("h-1.5", tipoInfo.color)} />
                                <CardContent className="p-4 text-center space-y-2">
                                  <div className={cn("h-11 w-11 rounded-full mx-auto flex items-center justify-center text-white shadow-lg", tipoInfo.color)}>
                                    <tipoInfo.icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-black text-[11px] text-foreground uppercase tracking-wide leading-tight">{nodo.nombre_cargo}</p>
                                    <Badge variant="outline" className="text-[7px] mt-1">{nodo.departamento}</Badge>
                                  </div>
                                  <p className="text-[10px] text-muted-foreground font-bold">
                                    {nodo.empleado_nombre || nodo.titular || <span className="italic text-muted-foreground/40">Vacante</span>}
                                  </p>
                                  <div className="flex items-center justify-center gap-2">
                                    <Badge className="text-[7px] font-black bg-muted/50 text-muted-foreground">{tipoInfo.label}</Badge>
                                    {childCount > 0 && (
                                      <Badge variant="outline" className="text-[7px] text-blue-400 border-blue-400/30">{childCount} subordinado{childCount > 1 ? "s" : ""}</Badge>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-card border-none rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-foreground uppercase tracking-wider mb-2">Estructura Jerárquica</h3>
                    <p className="text-xs text-muted-foreground">El organigrama refleja la cadena de mando conforme a la LOTTT. Los niveles van desde Dirección (nivel 0) hasta cargos operativos. Cada nodo puede vincularse a un empleado registrado en el sistema.</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {Object.entries(TIPOS_NODO).map(([key, info]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className={cn("h-3 w-3 rounded-full", info.color)} />
                          <span className="text-[9px] font-bold text-muted-foreground">{info.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nodos.map((nodo, i) => {
                  const tipoInfo = TIPOS_NODO[nodo.tipo] || TIPOS_NODO.cargo;
                  const parentNode = nodos.find(n => n.id === nodo.padre_id);
                  return (
                    <motion.div key={nodo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <Card className="glass-card border-none bg-card/40 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                        <div className={cn("h-1.5", tipoInfo.color)} />
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0", tipoInfo.color)}>
                              <tipoInfo.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm text-foreground">{nodo.nombre_cargo}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-[7px]">{nodo.departamento}</Badge>
                                <Badge className="text-[7px] font-black bg-muted/50 text-muted-foreground">{tipoInfo.label}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <p className="text-muted-foreground/50 font-bold">Titular</p>
                              <p className="font-bold text-foreground">{nodo.empleado_nombre || nodo.titular || "Vacante"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground/50 font-bold">Nivel</p>
                              <p className="font-bold text-foreground">Nivel {nodo.nivel}</p>
                            </div>
                          </div>
                          {parentNode && (
                            <div className="pt-2 border-t border-border/20 text-[9px] text-muted-foreground/50">
                              Reporta a: <span className="font-bold text-foreground/60">{parentNode.nombre_cargo}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        {/* ==================== CONTRATOS LABORALES ==================== */}
        <TabsContent value="contratos" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Contratos Laborales</h2>
            <Button onClick={() => setShowContratoDialog(true)} className="bg-emerald-500 hover:bg-emerald-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-8">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Contrato
            </Button>
          </div>

          {contratos.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                <Input
                  value={searchContratos}
                  onChange={e => setSearchContratos(e.target.value)}
                  placeholder="Buscar por título, cargo o empleado..."
                  className="pl-10 rounded-xl bg-card/40 border-border/30"
                />
              </div>
              <Select value={filterDeptContratos} onValueChange={setFilterDeptContratos}>
                <SelectTrigger className="w-44 rounded-xl bg-card/40 border-border/30">
                  <Filter className="h-3 w-3 mr-2 text-muted-foreground/40" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los deptos.</SelectItem>
                  {deptsContratos.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterTipoContrato} onValueChange={setFilterTipoContrato}>
                <SelectTrigger className="w-44 rounded-xl bg-card/40 border-border/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {Object.entries(TIPOS_CONTRATO).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          {filteredContratos.length === 0 && contratos.length === 0 ? (
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-16 text-center">
              <FileSignature className="h-16 w-16 mx-auto text-emerald-500/30 mb-6" />
              <h3 className="text-xl font-black text-foreground uppercase tracking-wider">Sin contratos registrados</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Registra contratos laborales con beneficios, prohibiciones en el área de trabajo y cláusulas conforme a la LOTTT</p>
              <Button onClick={() => setShowContratoDialog(true)} className="mt-8 bg-emerald-500 hover:bg-emerald-500/90 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-10">
                <Plus className="mr-2 h-4 w-4" /> Crear Contrato
              </Button>
            </Card>
          ) : filteredContratos.length === 0 ? (
            <Card className="glass-card border-none rounded-[2rem] bg-card/40 p-12 text-center">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground text-sm">No se encontraron contratos con los filtros aplicados</p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredContratos.map((c, i) => {
                const estadoInfo = ESTADOS_CONTRATO[c.estado] || ESTADOS_CONTRATO.borrador;
                const bens = Array.isArray(c.beneficios) ? c.beneficios : [];
                const prohs = Array.isArray(c.prohibiciones) ? c.prohibiciones : [];
                const isExpanded = expandedContrato === c.id;
                return (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card className="glass-card border-none bg-card/40 rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                      <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-black text-sm text-foreground">{c.titulo}</h3>
                              <Button
                                variant="ghost" size="sm"
                                className="h-7 w-7 p-0 rounded-lg"
                                onClick={() => setSelectedContrato(c)}
                              >
                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-[7px] font-black">{TIPOS_CONTRATO[c.tipo_contrato] || c.tipo_contrato}</Badge>
                              <Badge className={cn("text-[7px] font-black border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                              {c.empleado_nombre && <Badge variant="outline" className="text-[7px] text-blue-400 border-blue-400/30">{c.empleado_nombre}</Badge>}
                            </div>
                          </div>
                          <FileSignature className="h-5 w-5 text-emerald-500/30 shrink-0" />
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
                              <Gift className="h-3 w-3" /> Beneficios ({bens.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {bens.slice(0, isExpanded ? bens.length : 4).map((b: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[8px] bg-emerald-500/5 text-emerald-400 border-emerald-500/20">{b}</Badge>
                              ))}
                              {!isExpanded && bens.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className="text-[8px] cursor-pointer hover:bg-emerald-500/10"
                                  onClick={() => setExpandedContrato(c.id)}
                                >
                                  +{bens.length - 4} más
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {prohs.length > 0 && (
                          <div className="pt-3 border-t border-border/30">
                            <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-2 flex items-center gap-1">
                              <Ban className="h-3 w-3" /> Prohibiciones ({prohs.length})
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {prohs.slice(0, isExpanded ? prohs.length : 4).map((p: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[8px] bg-red-500/5 text-red-400 border-red-500/20">{p}</Badge>
                              ))}
                              {!isExpanded && prohs.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className="text-[8px] cursor-pointer hover:bg-red-500/10"
                                  onClick={() => setExpandedContrato(c.id)}
                                >
                                  +{prohs.length - 4} más
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {isExpanded && (
                          <Button variant="ghost" size="sm" className="w-full text-[8px]" onClick={() => setExpandedContrato(null)}>
                            Mostrar menos
                          </Button>
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

      {/* ==================== DIALOG: VISTA COMPLETA MANUAL ==================== */}
      <Dialog open={!!selectedManual} onOpenChange={() => setSelectedManual(null)}>
        <DialogContent className="sm:max-w-[800px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
          {selectedManual && (() => {
            const m = selectedManual;
            const estadoInfo = ESTADOS_MANUAL[m.estado] || ESTADOS_MANUAL.borrador;
            const procs = Array.isArray(m.procedimientos) ? m.procedimientos : [];
            const prohs = Array.isArray(m.prohibiciones) ? m.prohibiciones : [];
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">{m.titulo}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[7px]">{m.departamento}</Badge>
                        <Badge variant="outline" className="text-[7px] font-black">v{m.version}</Badge>
                        <Badge className={cn("text-[7px] font-black border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                        {m.cargo_destino && <Badge variant="outline" className="text-[7px]">Cargo: {m.cargo_destino}</Badge>}
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Descripción del Manual</p>
                    <div className="bg-muted/30 rounded-2xl p-5 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{m.contenido}</div>
                  </div>

                  {procs.length > 0 && (
                    <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Procedimientos y Responsabilidades del Trabajador
                      </p>
                      <div className="space-y-3">
                        {procs.map((p: string, j: number) => (
                          <div key={j} className="flex items-start gap-3">
                            <span className="h-7 w-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-[10px] font-black shrink-0">{j + 1}</span>
                            <p className="text-sm text-foreground/80 pt-1">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {prohs.length > 0 && (
                    <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4" /> Lo Que NO Debe Hacer en Su Área de Trabajo
                      </p>
                      <div className="space-y-3">
                        {prohs.map((p: string, j: number) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="h-7 w-7 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                              <Ban className="h-4 w-4 text-red-500" />
                            </div>
                            <p className="text-sm text-red-400/80 pt-1">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-border/20">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">Fecha de Creación</p>
                      <p className="font-bold text-foreground mt-1">{new Date(m.created_at).toLocaleDateString("es-VE", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    {m.aprobado_por && (
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50">Aprobado por</p>
                        <p className="font-bold text-foreground mt-1">{m.aprobado_por}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOG: VISTA COMPLETA CONTRATO ==================== */}
      <Dialog open={!!selectedContrato} onOpenChange={() => setSelectedContrato(null)}>
        <DialogContent className="sm:max-w-[800px] rounded-3xl bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
          {selectedContrato && (() => {
            const c = selectedContrato;
            const estadoInfo = ESTADOS_CONTRATO[c.estado] || ESTADOS_CONTRATO.borrador;
            const bens = Array.isArray(c.beneficios) ? c.beneficios : [];
            const prohs = Array.isArray(c.prohibiciones) ? c.prohibiciones : [];
            const claus = Array.isArray(c.clausulas) ? c.clausulas : [];
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <FileSignature className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">{c.titulo}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[7px] font-black">{TIPOS_CONTRATO[c.tipo_contrato] || c.tipo_contrato}</Badge>
                        <Badge className={cn("text-[7px] font-black border", estadoInfo.color)}>{estadoInfo.label}</Badge>
                        {c.empleado_nombre && <Badge variant="outline" className="text-[7px] text-blue-400">{c.empleado_nombre}</Badge>}
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Cargo</p>
                      <p className="text-sm font-black text-foreground mt-1">{c.cargo}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Departamento</p>
                      <p className="text-sm font-black text-foreground mt-1">{c.departamento}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Salario Mensual</p>
                      <p className="text-sm font-black text-foreground mt-1">Bs. {parseFloat(c.salario).toLocaleString()}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Horario</p>
                      <p className="text-[10px] font-black text-foreground mt-1">{c.horario}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Fecha de Inicio</p>
                      <p className="text-sm font-bold text-foreground mt-1">{new Date(c.fecha_inicio).toLocaleDateString("es-VE", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Fecha de Fin</p>
                      <p className="text-sm font-bold text-foreground mt-1">{c.fecha_fin ? new Date(c.fecha_fin).toLocaleDateString("es-VE", { day: "numeric", month: "long", year: "numeric" }) : "Indefinido"}</p>
                    </div>
                  </div>

                  {bens.length > 0 && (
                    <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                        <Gift className="h-4 w-4" /> Beneficios del Contrato ({bens.length})
                      </p>
                      <div className="space-y-2">
                        {bens.map((b: string, j: number) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <p className="text-sm text-foreground/80">{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {prohs.length > 0 && (
                    <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4" /> Lo Que NO Debe Hacer en Su Área de Trabajo ({prohs.length})
                      </p>
                      <div className="space-y-2">
                        {prohs.map((p: string, j: number) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                              <Ban className="h-3.5 w-3.5 text-red-500" />
                            </div>
                            <p className="text-sm text-red-400/80">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {claus.length > 0 && (
                    <div className="bg-amber-500/5 rounded-2xl p-6 border border-amber-500/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
                        <Scale className="h-4 w-4" /> Cláusulas Especiales
                      </p>
                      <div className="space-y-2">
                        {claus.map((cl: string, j: number) => (
                          <div key={j} className="flex items-start gap-3">
                            <span className="text-[10px] font-black text-amber-500 mt-0.5">§{j + 1}</span>
                            <p className="text-sm text-foreground/80">{cl}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-4 border-t border-border/20">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", c.firmado_empresa ? "bg-emerald-500" : "bg-muted")} />
                      <span className="text-xs text-muted-foreground font-bold">Firma Empresa: {c.firmado_empresa ? "Sí" : "Pendiente"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", c.firmado_empleado ? "bg-emerald-500" : "bg-muted")} />
                      <span className="text-xs text-muted-foreground font-bold">Firma Empleado: {c.firmado_empleado ? "Sí" : "Pendiente"}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOGS DE CREACIÓN ==================== */}
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
              <Label className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Procedimientos y responsabilidades (uno por línea)</Label>
              <Textarea value={manualForm.procedimientos} onChange={e => setManualForm(f => ({ ...f, procedimientos: e.target.value }))} placeholder={"Registrar asistencia al inicio de jornada\nReportar al supervisor inmediato\nCompletar formulario de actividades diarias\nMantener el área de trabajo limpia y ordenada\nCumplir con las normas de seguridad industrial"} className="mt-2 rounded-xl bg-muted/50 min-h-[120px]" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-red-500">Lo que NO debe hacer en el área de trabajo (una por línea)</Label>
              <Textarea value={manualForm.prohibiciones} onChange={e => setManualForm(f => ({ ...f, prohibiciones: e.target.value }))} placeholder={"Uso de teléfono personal en horario laboral\nCompartir información confidencial de la empresa\nAusentarse sin autorización del supervisor\nConsumo de alimentos en el área de trabajo\nIngresar en estado de ebriedad o bajo sustancias\nUtilizar equipos de la empresa para fines personales"} className="mt-2 rounded-xl bg-muted/50 min-h-[120px]" />
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
            {nodos.length > 0 && (
              <div>
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Reporta a (Superior)</Label>
                <Select value={nodoForm.padre_id} onValueChange={v => setNodoForm(f => ({ ...f, padre_id: v }))}>
                  <SelectTrigger className="mt-2 rounded-xl bg-muted/50"><SelectValue placeholder="Sin superior directo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sin superior directo</SelectItem>
                    {nodos.map(n => <SelectItem key={n.id} value={String(n.id)}>{n.nombre_cargo} ({n.departamento})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <Textarea value={contratoForm.beneficios} onChange={e => setContratoForm(f => ({ ...f, beneficios: e.target.value }))} placeholder={"Seguro HCM familiar\nBono de alimentación mensual\nDías libres adicionales por antigüedad\nCapacitación y desarrollo profesional\nPlan vacacional preferencial con alianzas\nBono de productividad trimestral\nSeguro de vida"} className="mt-2 rounded-xl bg-muted/50 min-h-[120px]" />
            </div>
            <div>
              <Label className="text-[9px] font-black uppercase tracking-widest text-red-500">Lo que NO debe hacer en su área de trabajo (una por línea)</Label>
              <Textarea value={contratoForm.prohibiciones} onChange={e => setContratoForm(f => ({ ...f, prohibiciones: e.target.value }))} placeholder={"Uso de dispositivos personales en horario laboral\nDivulgación de información confidencial de la empresa\nAusentarse sin permiso escrito del supervisor\nConsumo de alimentos en el área de trabajo\nIngresar en estado de ebriedad o bajo sustancias\nUtilizar equipos de la empresa para fines personales\nRecibir visitas personales sin autorización"} className="mt-2 rounded-xl bg-muted/50 min-h-[120px]" />
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
