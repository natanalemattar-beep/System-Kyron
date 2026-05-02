"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Gavel, ShieldCheck, Activity, FileText, Search, Filter, Plus, Landmark,
  Calendar, ChevronRight, ArrowRight, Clock, RefreshCw, FileSignature,
  Eye, Building2, Zap, Copy, Printer, Download, BookOpen, ClipboardList,
  CircleCheck, TriangleAlert, XCircle, MapPin, Building, Flag, Scale, DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { organismos, permisosTipos, getPermisosByOrganismo, type Organismo, type PermisoTipo } from "@/lib/permisologia-data";
import { Logo } from "@/components/logo";

type PermisoRegistrado = {
  id: string;
  dbId?: number;
  tipo: string;
  emisor: string;
  nombre: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: string;
  numero: string;
};

const estadoConfig: Record<string, { label: string; color: string; icon: typeof CircleCheck }> = {
  Vigente: { label: "VIGENTE", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CircleCheck },
  "Por Vencer": { label: "POR VENCER", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: TriangleAlert },
  Vencido: { label: "VENCIDO", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
  "En Trámite": { label: "EN TRÁMITE", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock },
  "En Renovación": { label: "EN RENOVACIÓN", color: "bg-violet-500/10 text-violet-600 border-violet-500/20", icon: RefreshCw },
};

const estadosPermiso = ["Vigente", "Por Vencer", "Vencido", "En Trámite", "En Renovación"];

const sectores = [
  "comercio", "industria", "servicios", "alimentos", "salud", "farmaceutico",
  "telecomunicaciones", "construccion", "transporte", "turismo", "mineria",
  "petroleo", "energia", "agricultura", "pesca", "financiero", "tecnologia",
  "cultura", "deporte", "ambiente", "educacion"
];

const sectorLabels: Record<string, string> = {
  comercio: "Comercio", industria: "Industria", servicios: "Servicios",
  alimentos: "Alimentos", salud: "Salud", farmaceutico: "Farmacéutico",
  telecomunicaciones: "Telecomunicaciones", construccion: "Construcción",
  transporte: "Transporte", turismo: "Turismo", mineria: "Minería",
  petroleo: "Petróleo", energia: "Energía", agricultura: "Agricultura",
  pesca: "Pesca", financiero: "Financiero", tecnologia: "Tecnología",
  cultura: "Cultura", deporte: "Deporte", ambiente: "Ambiente", educacion: "Educación"
};

const tipoOrgConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Landmark }> = {
  seniat: { label: "SENIAT", color: "text-red-600", bg: "bg-red-500/10 border-red-500/20", icon: DollarSign },
  ministerio: { label: "Ministerios", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", icon: Building },
  gobernacion: { label: "Gobernaciones", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", icon: Flag },
  alcaldia: { label: "Alcaldías", color: "text-emerald-600", bg: "bg-emerald-500/10 border-emerald-500/20", icon: MapPin },
  regulador: { label: "Reguladores", color: "text-amber-600", bg: "bg-amber-500/10 border-amber-500/20", icon: Scale },
  otro: { label: "Otros", color: "text-slate-600", bg: "bg-slate-500/10 border-slate-500/20", icon: Landmark },
};

function getOrganismoTipo(org: Organismo): string {
  if (org.tipo === 'seniat') return 'seniat';
  if (org.tipo === 'ministerio') return 'ministerio';
  if (org.tipo === 'gobernacion') return 'gobernacion';
  if (org.tipo === 'alcaldia') return 'alcaldia';
  if (org.tipo === 'ente_autonomo' || org.tipo === 'instituto') return 'regulador';
  return 'otro';
}

function getOrganismoById(id: string) {
  return organismos.find(o => o.id === id);
}

function generarCarta(permiso: PermisoTipo, tipo: 'inscripcion' | 'renovacion'): string {
  const org = getOrganismoById(permiso.organismoId);
  const fecha = new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' });
  const requisitos = tipo === 'inscripcion' ? permiso.requisitosInscripcion : permiso.requisitosRenovacion;

  return `Ciudad y Fecha: _________________, ${fecha}

Señores
${org?.nombre || permiso.organismoId}
${org?.siglas ? `(${org.siglas})` : ''}
Presente.-

Asunto: Solicitud de ${tipo === 'inscripcion' ? 'Inscripción' : 'Renovación'} — ${permiso.nombre}

Estimados Señores:

Por medio de la presente, me dirijo a ustedes en representación de [NOMBRE DE LA EMPRESA], identificada con RIF [RIF], domiciliada en [DIRECCIÓN], con el fin de solicitar formalmente la ${tipo === 'inscripcion' ? 'inscripción' : 'renovación'} ante ese organismo del trámite denominado "${permiso.nombre}".

${permiso.baseLegal ? `Fundamento legal: ${permiso.baseLegal}.\n` : ''}
A tal efecto, adjunto la siguiente documentación conforme a los requisitos establecidos:

${requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Quedo a su disposición para cualquier información adicional que requieran.

Atentamente,

____________________________
[NOMBRE DEL REPRESENTANTE LEGAL]
[CARGO]
[NOMBRE DE LA EMPRESA]
RIF: [RIF]
Teléfono: [TELÉFONO]
Correo: [CORREO]`;
}

export default function PermisosPage() {
  const [permisos, setPermisos] = useState<PermisoRegistrado[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [registroOpen, setRegistroOpen] = useState(false);
  const [detallePermiso, setDetallePermiso] = useState<PermisoRegistrado | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOrg, setFilterOrg] = useState("todos");
  const [filterSector, setFilterSector] = useState("todos");
  const [filterTipoOrg, setFilterTipoOrg] = useState("todos");
  const [cartaDialog, setCartaDialog] = useState<{ permiso: PermisoTipo; tipo: 'inscripcion' | 'renovacion' } | null>(null);

  const [formData, setFormData] = useState({
    tipo: "", organismo: "", nombre: "", numero: "",
    fechaEmision: "", fechaVencimiento: "", estado: "Vigente",
    alertarDias: "30", descripcion: "",
  });

  const estadoToDb: Record<string, string> = {
    "Vigente": "vigente",
    "Por Vencer": "vigente",
    "Vencido": "vencido",
    "En Trámite": "en_tramite",
    "En Renovación": "en_renovacion",
  };

  const estadoFromDb: Record<string, string> = {
    vigente: "Vigente",
    vencido: "Vencido",
    en_tramite: "En Trámite",
    en_renovacion: "En Renovación",
    denegado: "Vencido",
    archivado: "Vencido",
  };

  const fetchPermisos = useCallback(async () => {
    try {
      const res = await fetch("/api/permisos-legales");
      if (!res.ok) return;
      const data = await res.json();
      if (data.permisos) {
        const mapped: PermisoRegistrado[] = data.permisos.map((p: any) => ({
          id: `PERM-${String(p.id).padStart(3, "0")}`,
          dbId: p.id,
          tipo: p.tipo || "permiso",
          emisor: p.organismo || "",
          nombre: p.nombre_permiso || "",
          numero: p.numero_permiso || "",
          fechaEmision: p.fecha_emision ? new Date(p.fecha_emision).toISOString().split("T")[0] : "",
          fechaVencimiento: p.fecha_vencimiento ? new Date(p.fecha_vencimiento).toISOString().split("T")[0] : "Permanente",
          estado: estadoFromDb[p.estado] || "Vigente",
        }));
        setPermisos(mapped);
      }
    } catch {}
  }, []);

  useEffect(() => { fetchPermisos(); }, [fetchPermisos]);

  const permisosByTipoOrg = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return organismos
      .filter(org => {
        if (filterTipoOrg !== 'todos' && getOrganismoTipo(org) !== filterTipoOrg) return false;
        if (filterOrg !== 'todos' && org.id !== filterOrg) return false;
        return true;
      })
      .map(org => ({
        org,
        permisos: getPermisosByOrganismo(org.id).filter(p => {
          if (filterSector !== 'todos' && !p.aplica.includes(filterSector as any) && !p.aplica.includes('todos')) return false;
          if (q) {
            const haystack = `${p.nombre} ${p.descripcion} ${org.nombre} ${org.siglas || ''} ${p.baseLegal || ''} ${p.requisitosInscripcion.join(' ')}`.toLowerCase();
            return haystack.includes(q);
          }
          return true;
        })
      }))
      .filter(g => g.permisos.length > 0);
  }, [searchQuery, filterOrg, filterSector, filterTipoOrg]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, { orgs: number; permisos: number }> = {};
    for (const key of Object.keys(tipoOrgConfig)) {
      counts[key] = { orgs: 0, permisos: 0 };
    }
    organismos.forEach(org => {
      const tipo = getOrganismoTipo(org);
      if (counts[tipo]) {
        counts[tipo].orgs++;
        counts[tipo].permisos += getPermisosByOrganismo(org.id).length;
      }
    });
    return counts;
  }, []);

  const totalPermisosCatalogo = useMemo(() => permisosTipos.length, []);
  const totalOrganismos = useMemo(() => organismos.length, []);

  const cartaText = useMemo(() => {
    if (!cartaDialog) return '';
    return generarCarta(cartaDialog.permiso, cartaDialog.tipo);
  }, [cartaDialog]);

  const handleCopyCarta = useCallback((carta: string) => {
    navigator.clipboard.writeText(carta);
    toast({ title: "COPIADO", description: "Carta copiada al portapapeles" });
  }, [toast]);

  const resetForm = () => {
    setFormData({ tipo: "", organismo: "", nombre: "", numero: "", fechaEmision: "", fechaVencimiento: "", estado: "Vigente", alertarDias: "30", descripcion: "" });
  };

  const handleRegistrar = async () => {
    if (!formData.nombre.trim()) {
      toast({ title: "Campo requerido", description: "Ingrese el nombre del permiso.", variant: "destructive" });
      return;
    }
    if (!formData.organismo) {
      toast({ title: "Campo requerido", description: "Seleccione el organismo emisor.", variant: "destructive" });
      return;
    }
    if (!formData.fechaEmision) {
      toast({ title: "Campo requerido", description: "Ingrese la fecha de emisión.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const org = getOrganismoById(formData.organismo);
    const organismoNombre = org?.siglas || org?.nombre || formData.organismo;

    try {
      const res = await fetch("/api/permisos-legales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: formData.tipo || "permiso",
          nombre_permiso: formData.nombre.trim(),
          numero_permiso: formData.numero || null,
          organismo: organismoNombre,
          fecha_emision: formData.fechaEmision || null,
          fecha_vencimiento: formData.fechaVencimiento || null,
          estado: estadoToDb[formData.estado] || "vigente",
          descripcion: formData.descripcion.trim() || null,
          responsable: null,
          costo_tramite: "0",
          moneda_costo: "USD",
          alertar_dias_antes: formData.alertarDias || "30",
          notas: null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        toast({ title: "ERROR", description: err.error || "No se pudo registrar el trámite.", variant: "destructive" });
        setLoading(false);
        return;
      }

      setRegistroOpen(false);
      resetForm();
      await fetchPermisos();
      toast({ title: "REGISTRADO", description: `"${formData.nombre.trim()}" guardado exitosamente en el sistema.` });
    } catch (e) {
      toast({ title: "ERROR DE CONEXIÓN", description: "No se pudo conectar con el servidor. Intente nuevamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-6 md:mt-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-glow mb-3">
            <Gavel className="h-3 w-3" /> ASESORÍA JURÍDICA — PERMISOLOGÍA
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Centro de <span className="text-primary italic">Permisología</span> Integral
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-1 md:mt-2">
            {totalOrganismos} Organismos · {totalPermisosCatalogo} Permisos · Catálogo Completo Venezuela
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Organismos", value: String(totalOrganismos), color: "text-primary", bg: "bg-primary/10", icon: Landmark },
          { label: "Permisos Catalogados", value: String(totalPermisosCatalogo), color: "text-violet-600", bg: "bg-violet-500/10", icon: BookOpen },
          { label: "Mis Trámites", value: String(permisos.length), color: "text-emerald-600", bg: "bg-emerald-500/10", icon: ClipboardList },
          { label: "Alertas", value: String(permisos.filter(p => p.estado === 'Por Vencer' || p.estado === 'Vencido').length), color: "text-amber-600", bg: "bg-amber-500/10", icon: TriangleAlert },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 rounded-2xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50">{kpi.label}</span>
              <div className={cn("p-1.5 rounded-lg", kpi.bg)}><kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} /></div>
            </div>
            <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.value}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="catalogo" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <TabsList className="bg-muted/30 border border-border/30 rounded-2xl p-1.5 h-auto flex-wrap">
            <TabsTrigger value="catalogo" className="rounded-xl text-[11px] font-semibold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
              <BookOpen className="mr-2 h-3.5 w-3.5" /> Catálogo Completo
            </TabsTrigger>
            <TabsTrigger value="mis-tramites" className="rounded-xl text-[11px] font-semibold uppercase tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white px-5 py-2.5">
              <ClipboardList className="mr-2 h-3.5 w-3.5" /> Mis Trámites {permisos.length > 0 && <Badge className="ml-1.5 bg-emerald-500 text-white text-[7px] px-1.5">{permisos.length}</Badge>}
            </TabsTrigger>
          </TabsList>
          <Button onClick={() => setRegistroOpen(true)} className="btn-3d-primary h-10 px-6 rounded-xl font-bold text-[11px] uppercase tracking-widest shrink-0">
            <Plus className="mr-2 h-4 w-4" /> REGISTRAR TRÁMITE
          </Button>
        </div>

        <TabsContent value="catalogo" className="mt-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[{ key: 'todos', label: 'Todos', color: 'text-foreground', bg: 'bg-muted/30 border-border/30', icon: BookOpen }].concat(
              Object.entries(tipoOrgConfig).map(([key, cfg]) => ({ key, label: cfg.label, color: cfg.color, bg: cfg.bg, icon: cfg.icon }))
            ).map(cat => {
              const isActive = filterTipoOrg === cat.key;
              const count = cat.key === 'todos' ? totalPermisosCatalogo : (categoryCounts[cat.key]?.permisos || 0);
              const orgCount = cat.key === 'todos' ? totalOrganismos : (categoryCounts[cat.key]?.orgs || 0);
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setFilterTipoOrg(cat.key)}
                  className={cn(
                    "p-3 rounded-2xl border transition-all text-left",
                    isActive ? `${cat.bg} ring-2 ring-offset-2 ring-primary/30 shadow-lg` : "bg-card/30 border-border/20 hover:bg-card/60"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <cat.icon className={cn("h-3.5 w-3.5", isActive ? cat.color : "text-foreground/30")} />
                    <span className={cn("text-[10px] font-semibold uppercase tracking-widest", isActive ? cat.color : "text-foreground/50")}>{cat.label}</span>
                  </div>
                  <p className={cn("text-lg font-bold", isActive ? cat.color : "text-foreground/60")}>{count}</p>
                  <p className="text-[7px] font-bold uppercase text-foreground/30">{orgCount} organismos</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
              <Input
                placeholder="Buscar permiso, organismo, requisito..."
                className="pl-12 h-12 rounded-xl border-border/30 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterOrg} onValueChange={setFilterOrg}>
              <SelectTrigger className="w-full md:w-[260px] h-12 rounded-xl border-border/30 text-[10px] font-bold uppercase">
                <Filter className="mr-2 h-3.5 w-3.5" /> <SelectValue placeholder="Organismo" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <SelectItem value="todos">Todos los organismos ({totalOrganismos})</SelectItem>
                {organismos.map(o => (
                  <SelectItem key={o.id} value={o.id}>{o.siglas || o.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl border-border/30 text-[10px] font-bold uppercase">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los sectores</SelectItem>
                {sectores.map(s => (
                  <SelectItem key={s} value={s}>{sectorLabels[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[11px] font-bold text-foreground/40 uppercase tracking-widest">
              <FileText className="h-3.5 w-3.5" />
              {permisosByTipoOrg.reduce((sum, g) => sum + g.permisos.length, 0)} permisos encontrados en {permisosByTipoOrg.length} organismos
            </div>
            {(filterTipoOrg !== 'todos' || filterOrg !== 'todos' || filterSector !== 'todos' || searchQuery) && (
              <Button variant="ghost" size="sm" className="text-[10px] font-semibold uppercase text-primary h-7 px-3 rounded-lg" onClick={() => { setFilterTipoOrg('todos'); setFilterOrg('todos'); setFilterSector('todos'); setSearchQuery(''); }}>
                Limpiar filtros
              </Button>
            )}
          </div>

          <CatalogoSection groups={permisosByTipoOrg} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="mis-tramites" className="mt-6 space-y-6">
          <MisTramitesSection permisos={permisos} onRegistrar={() => setRegistroOpen(true)} onDetalle={setDetallePermiso} />
        </TabsContent>
      </Tabs>

      <Dialog open={!!cartaDialog} onOpenChange={open => !open && setCartaDialog(null)}>
        <DialogContent className="max-w-4xl rounded-3xl bg-card/95 backdrop-blur-3xl border-border/20 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {cartaDialog && (
            <>
              <div className="p-8 border-b border-border/20 bg-primary/5">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold uppercase text-foreground">
                    {cartaDialog.tipo === 'inscripcion' ? 'Carta de Solicitud de Inscripción' : 'Carta de Solicitud de Renovación'}
                  </DialogTitle>
                  <DialogDescription className="text-[10px] font-bold uppercase text-primary/60">
                    {cartaDialog.permiso.nombre} — {getOrganismoById(cartaDialog.permiso.organismoId)?.nombre}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-10 bg-white m-6 rounded-2xl shadow-inner font-serif text-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                  <Logo className="h-64 w-64 grayscale rotate-12" />
                </div>
                <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6 relative z-10">
                  <Logo className="h-12 w-12" />
                  <div className="text-right">
                    <p className="font-semibold text-xs uppercase italic">[NOMBRE DE LA EMPRESA]</p>
                    <p className="text-[10px] font-bold uppercase text-slate-500">RIF: [RIF]</p>
                  </div>
                </header>
                <div className="whitespace-pre-wrap text-sm leading-relaxed relative z-10 text-justify">
                  {cartaText}
                </div>
              </div>
              <DialogFooter className="p-6 border-t border-border/20 gap-3 flex-wrap">
                <Button variant="outline" className="rounded-xl h-12 px-6 border-border/20 text-foreground/60 font-semibold uppercase text-[11px]" onClick={() => handleCopyCarta(cartaText)}>
                  <Copy className="mr-2 h-4 w-4" /> COPIAR
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-6 border-border/20 text-foreground/60 font-semibold uppercase text-[11px]" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                </Button>
                <Button className="rounded-xl h-12 px-8 btn-3d-primary font-semibold uppercase text-[11px]" onClick={() => {
                  const blob = new Blob([cartaText], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Carta_${cartaDialog.tipo}_${cartaDialog.permiso.id}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                  toast({ title: "DESCARGADO", description: "Carta descargada exitosamente" });
                }}>
                  <Download className="mr-2 h-4 w-4" /> DESCARGAR
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={registroOpen} onOpenChange={setRegistroOpen}>
        <DialogContent className="max-w-2xl rounded-3xl bg-card/95 backdrop-blur-3xl border-border/20 p-0 max-h-[90vh] flex flex-col overflow-y-auto">
          <div className="p-6 sm:p-8 border-b border-border/20 bg-primary/5 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-semibold uppercase text-foreground flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10"><Plus className="h-5 w-5 text-primary" /></div>
                Registrar Nuevo Permiso
              </DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase text-foreground/50">
                Agregar permiso al expediente de la empresa
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1 min-h-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">Tipo</label>
                <Select value={formData.tipo} onValueChange={v => setFormData(p => ({ ...p, tipo: v }))}>
                  <SelectTrigger className="h-11 rounded-xl border-border/30"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="licencia">Licencia</SelectItem>
                    <SelectItem value="permiso">Permiso</SelectItem>
                    <SelectItem value="registro">Registro</SelectItem>
                    <SelectItem value="certificacion">Certificación</SelectItem>
                    <SelectItem value="habilitacion">Habilitación</SelectItem>
                    <SelectItem value="solvencia">Solvencia</SelectItem>
                    <SelectItem value="autorizacion">Autorización</SelectItem>
                    <SelectItem value="municipal">Municipal</SelectItem>
                    <SelectItem value="ambiental">Ambiental</SelectItem>
                    <SelectItem value="sanitario">Sanitario</SelectItem>
                    <SelectItem value="bomberos">Bomberos</SelectItem>
                    <SelectItem value="trabajo">Trabajo</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">Organismo *</label>
                <Select value={formData.organismo} onValueChange={v => setFormData(p => ({ ...p, organismo: v }))}>
                  <SelectTrigger className="h-11 rounded-xl border-border/30"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {organismos.map(o => (
                      <SelectItem key={o.id} value={o.id}>{o.siglas || o.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase text-foreground/60">Nombre del permiso *</label>
              <Input className="h-11 rounded-xl border-border/30" placeholder="Ej: Licencia de Actividades Económicas" value={formData.nombre} onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">N° Expediente</label>
                <Input className="h-11 rounded-xl border-border/30" value={formData.numero} onChange={e => setFormData(p => ({ ...p, numero: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">Estado</label>
                <Select value={formData.estado} onValueChange={v => setFormData(p => ({ ...p, estado: v }))}>
                  <SelectTrigger className="h-11 rounded-xl border-border/30"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {estadosPermiso.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">Fecha de Emisión *</label>
                <Input type="date" className="h-11 rounded-xl border-border/30" value={formData.fechaEmision} onChange={e => setFormData(p => ({ ...p, fechaEmision: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase text-foreground/60">Fecha de Vencimiento</label>
                <Input type="date" className="h-11 rounded-xl border-border/30" value={formData.fechaVencimiento} onChange={e => setFormData(p => ({ ...p, fechaVencimiento: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase text-foreground/60">Alertar (días antes del vencimiento)</label>
              <Input type="number" className="h-11 rounded-xl border-border/30" value={formData.alertarDias} onChange={e => setFormData(p => ({ ...p, alertarDias: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase text-foreground/60">Descripción / Notas</label>
              <textarea
                className="w-full min-h-[80px] rounded-xl border border-border/30 bg-transparent px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Observaciones adicionales sobre este trámite..."
                value={formData.descripcion}
                onChange={e => setFormData(p => ({ ...p, descripcion: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-border/20 gap-3 shrink-0">
            <Button type="button" variant="outline" onClick={() => { setRegistroOpen(false); resetForm(); }} className="rounded-xl h-12 px-6 font-bold text-[11px] uppercase tracking-widest">
              CANCELAR
            </Button>
            <Button type="button" onClick={handleRegistrar} disabled={loading} className="btn-3d-primary rounded-xl h-12 px-8 font-bold text-[11px] uppercase tracking-widest">
              {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              {loading ? "GUARDANDO..." : "REGISTRAR"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detallePermiso} onOpenChange={open => { if (!open) setDetallePermiso(null); }}>
        <DialogContent className="max-w-md rounded-3xl">
          {detallePermiso && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold uppercase tracking-tight flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                  Detalle del Trámite
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                {[
                  { label: "ID", value: detallePermiso.id, className: "text-primary font-bold" },
                  { label: "Nombre", value: detallePermiso.nombre },
                  { label: "Tipo", value: detallePermiso.tipo },
                  { label: "Organismo", value: detallePermiso.emisor },
                  { label: "N° Expediente", value: detallePermiso.numero || "—" },
                  { label: "Emisión", value: detallePermiso.fechaEmision },
                  { label: "Vencimiento", value: detallePermiso.fechaVencimiento },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50">{item.label}</span>
                    <span className={cn("text-xs font-bold text-foreground/80 text-right max-w-[60%]", item.className)}>{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50">Estado</span>
                  <Badge className={cn("text-[10px] font-semibold uppercase tracking-widest border", estadoConfig[detallePermiso.estado]?.color || "")}>
                    {detallePermiso.estado}
                  </Badge>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetallePermiso(null)} className="rounded-xl h-11 font-bold text-[11px] uppercase tracking-widest w-full">
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CatalogoSection({ groups, onGenerarCarta }: { groups: { org: Organismo; permisos: PermisoTipo[] }[]; onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  if (groups.length === 0) {
    return (
      <Card className="glass-card border-none rounded-xl bg-card/40 p-16 text-center">
        <Search className="h-12 w-12 text-foreground/15 mx-auto mb-4" />
        <p className="text-sm font-bold text-foreground/40 uppercase">No se encontraron permisos con los filtros seleccionados</p>
      </Card>
    );
  }

  return (
    <Accordion type="multiple" className="space-y-3">
      {groups.map(({ org, permisos }) => {
        const tipoOrg = getOrganismoTipo(org);
        const tipoCfg = tipoOrgConfig[tipoOrg] || tipoOrgConfig.otro;
        const TipoIcon = tipoCfg.icon;
        return (
        <AccordionItem key={org.id} value={org.id} className="border-none">
          <Card className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden">
            <AccordionTrigger className="px-6 md:px-8 py-5 hover:bg-muted/20 transition-all hover:no-underline">
              <div className="flex justify-between items-center w-full pr-4">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2.5 rounded-xl border", tipoCfg.bg)}>
                    <TipoIcon className={cn("h-4 w-4", tipoCfg.color)} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold uppercase text-sm text-foreground/80">{org.siglas || org.nombre}</p>
                      <Badge variant="outline" className={cn("text-[6px] font-semibold uppercase px-1.5 py-0 h-4 border", tipoCfg.bg, tipoCfg.color)}>
                        {tipoCfg.label}
                      </Badge>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{org.nombre}</p>
                  </div>
                </div>
                <Badge className="bg-muted/50 border-border/30 text-[10px] font-semibold uppercase px-3 text-foreground/60">{permisos.length} {permisos.length === 1 ? 'permiso' : 'permisos'}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              {permisos.map(p => <PermisoCard key={p.id} permiso={p} onGenerarCarta={onGenerarCarta} />)}
            </AccordionContent>
          </Card>
        </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function PermisoCard({ permiso, onGenerarCarta }: { permiso: PermisoTipo; onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-border/20 hover:bg-muted/10 transition-all">
      <div className="px-6 md:px-8 py-5 flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <p className="font-semibold text-sm text-foreground/90 uppercase">{permiso.nombre}</p>
            {permiso.vigencia && (
              <Badge variant="outline" className="text-[7px] font-semibold uppercase border-border/30 px-2 shrink-0 text-foreground/50">
                <Calendar className="mr-1 h-2.5 w-2.5" /> {permiso.vigencia} MESES
              </Badge>
            )}
          </div>
          <p className="text-[10px] text-foreground/50 line-clamp-1">{permiso.descripcion}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-primary text-[10px] font-semibold uppercase hover:bg-primary/10" onClick={e => { e.stopPropagation(); onGenerarCarta(permiso, 'inscripcion'); }}>
            <FileSignature className="mr-1 h-3 w-3" /> Inscripción
          </Button>
          {permiso.requisitosRenovacion.length > 0 && (
            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-amber-600 text-[10px] font-semibold uppercase hover:bg-amber-500/10" onClick={e => { e.stopPropagation(); onGenerarCarta(permiso, 'renovacion'); }}>
              <RefreshCw className="mr-1 h-3 w-3" /> Renovación
            </Button>
          )}
          <ChevronRight className={cn("h-4 w-4 text-foreground/20 transition-transform", expanded && "rotate-90")} />
        </div>
      </div>
      {expanded && (
        <div className="px-6 md:px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border/15 pt-5">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Requisitos de Inscripción</p>
            <ul className="space-y-2">
              {permiso.requisitosInscripcion.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-foreground/70">
                  <ArrowRight className="h-3 w-3 text-primary/50 shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {permiso.requisitosRenovacion.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">Requisitos de Renovación</p>
              <ul className="space-y-2">
                {permiso.requisitosRenovacion.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-foreground/70">
                    <ArrowRight className="h-3 w-3 text-amber-500/50 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="md:col-span-2 flex flex-wrap gap-4 pt-3 border-t border-border/15">
            {permiso.baseLegal && (
              <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                <Zap className="h-3 w-3" /> <span className="font-bold">Base legal:</span> {permiso.baseLegal}
              </div>
            )}
            {permiso.costoEstimado && (
              <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                <Landmark className="h-3 w-3" /> <span className="font-bold">Costo:</span> {permiso.costoEstimado}
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-foreground/50">
              <Clock className="h-3 w-3" /> <span className="font-bold">Vigencia:</span> {permiso.vigencia ? `${permiso.vigencia} meses` : 'Permanente'}
            </div>
            {permiso.aplica.length > 0 && (
              <div className="flex items-center gap-2 text-[11px] text-foreground/50 flex-wrap">
                <ShieldCheck className="h-3 w-3 shrink-0" /> <span className="font-bold shrink-0">Sectores:</span>
                {permiso.aplica.map(s => (
                  <Badge key={s} variant="outline" className="text-[7px] px-1.5 py-0 h-4 font-bold border-border/20 text-foreground/40">
                    {sectorLabels[s] || s}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MisTramitesSection({ permisos, onRegistrar, onDetalle }: { permisos: PermisoRegistrado[]; onRegistrar: () => void; onDetalle: (p: PermisoRegistrado) => void }) {
  if (permisos.length === 0) {
    return (
      <Card className="glass-card border-none rounded-xl bg-card/40 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <ShieldCheck className="h-10 w-10 text-primary/30" />
          </div>
          <p className="text-lg font-semibold uppercase tracking-tight text-foreground/50 mb-2">Sin Trámites Registrados</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 max-w-md mb-8 leading-relaxed">
            Su expediente de permisos está vacío. Registre los permisos y licencias de su empresa para llevar un control centralizado de vencimientos y renovaciones.
          </p>
          <Button onClick={onRegistrar} className="btn-3d-primary h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest">
            <Plus className="mr-2 h-4 w-4" /> Registrar Primer Trámite
          </Button>
          <p className="text-[11px] font-bold text-foreground/30 mt-6 uppercase tracking-widest">
            Consulte el &quot;Catálogo Completo&quot; para ver todos los permisos disponibles en Venezuela
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {permisos.map(p => {
        const config = estadoConfig[p.estado] || estadoConfig.Vigente;
        const StatusIcon = config.icon;

        return (
          <Card key={p.id} className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden hover:bg-card/60 transition-colors cursor-pointer" onClick={() => onDetalle(p)}>
            <CardContent className="p-5 flex items-center gap-5">
              <div className={cn("p-3 rounded-xl", config.color.split(' ')[0])}>
                <StatusIcon className={cn("h-5 w-5", config.color.split(' ')[1])} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold uppercase text-sm text-foreground/80 truncate">{p.nombre}</p>
                <p className="text-[10px] text-foreground/50 mt-0.5 flex items-center gap-2">
                  <Landmark className="h-3 w-3" /> {p.emisor}
                  {p.numero && <span className="text-primary/50">· N° {p.numero}</span>}
                </p>
              </div>
              <div className="text-right shrink-0">
                {p.fechaVencimiento && p.fechaVencimiento !== "Permanente" ? (
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Vence: {new Date(p.fechaVencimiento).toLocaleDateString('es-VE')}
                  </p>
                ) : (
                  <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Permanente</p>
                )}
              </div>
              <Badge className={cn("text-[7px] font-semibold uppercase px-3 py-1 border shrink-0", config.color)}>{config.label}</Badge>
              <Eye className="h-4 w-4 text-foreground/30 shrink-0" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
