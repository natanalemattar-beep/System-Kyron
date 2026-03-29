"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Download, ShieldCheck, FileText, Printer, Bell, AlertTriangle, CheckCircle2,
  Clock, Search, Building2, Landmark, MapPin, Shield, Filter, Plus, RefreshCw,
  FileSignature, Eye, XCircle, Calendar, ChevronRight, Zap, ArrowRight, Copy,
  BellRing, ClipboardList
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { organismos, tiposPermiso, getOrganismoById, generarCartaSolicitud, type PermisoTipo, type Organismo } from "@/lib/permisologia-data";
import { companyData } from "@/lib/permisos-data";

const nivelAlertaConfig = {
  critico: { label: "CRÍTICO", color: "bg-red-500/10 text-red-400 border-red-500/30", icon: XCircle },
  advertencia: { label: "ADVERTENCIA", color: "bg-amber-500/10 text-amber-400 border-amber-500/30", icon: AlertTriangle },
  ok: { label: "AL DÍA", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", icon: CheckCircle2 },
};

type AlertaDB = {
  id: number;
  nombre_permiso: string;
  organismo: string;
  fecha_vencimiento: string;
  estado: string;
  dias_restantes: number;
  nivel_alerta: string;
};

type Resumen = {
  vigentes: number;
  vencidos: number;
  en_tramite: number;
  en_renovacion: number;
  por_vencer_30: number;
  por_vencer_60: number;
  total: number;
};

export default function PermisologiaPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("catalogo");
  const [filterOrg, setFilterOrg] = useState<string>("todos");
  const [filterSector, setFilterSector] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartaDialog, setCartaDialog] = useState<{ permiso: PermisoTipo; tipo: 'inscripcion' | 'renovacion' } | null>(null);
  const [alertas, setAlertas] = useState<AlertaDB[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [registroDialog, setRegistroDialog] = useState(false);
  const [formData, setFormData] = useState({ tipo: '', nombre_permiso: '', organismo: '', numero_permiso: '', fecha_emision: '', fecha_vencimiento: '', estado: 'vigente', descripcion: '', alertar_dias_antes: '30' });

  useEffect(() => {
    fetch('/api/permisologia/alertas').then(r => r.json()).then(data => {
      if (data.alertas) setAlertas(data.alertas);
      if (data.resumen) setResumen(data.resumen);
    }).catch(() => {});
  }, []);

  const orgTipos = useMemo(() => {
    const groups: Record<Organismo['tipo'], Organismo[]> = {
      seniat: [], ministerio: [], alcaldia: [], gobernacion: [], ente_autonomo: [], instituto: []
    };
    organismos.forEach(o => groups[o.tipo].push(o));
    return groups;
  }, []);

  const filteredPermisos = useMemo(() => {
    return tiposPermiso.filter(p => {
      if (filterOrg !== 'todos' && p.organismoId !== filterOrg) return false;
      if (filterSector !== 'todos' && !p.aplica.includes(filterSector as any) && !p.aplica.includes('todos')) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const org = getOrganismoById(p.organismoId);
        return p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q) || (org?.nombre.toLowerCase().includes(q) ?? false);
      }
      return true;
    });
  }, [filterOrg, filterSector, searchQuery]);

  const permisosByTipoOrg = useMemo(() => {
    const groups: Record<string, { org: Organismo; permisos: PermisoTipo[] }> = {};
    filteredPermisos.forEach(p => {
      const org = getOrganismoById(p.organismoId);
      if (!org) return;
      if (!groups[org.id]) groups[org.id] = { org, permisos: [] };
      groups[org.id].permisos.push(p);
    });
    return Object.values(groups);
  }, [filteredPermisos]);

  const [cartaText, setCartaText] = useState('');
  const [cartaLoading, setCartaLoading] = useState(false);

  useEffect(() => {
    if (!cartaDialog) { setCartaText(''); return; }
    setCartaLoading(true);
    fetch('/api/permisologia/carta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipoPermisoId: cartaDialog.permiso.id, tipoCarta: cartaDialog.tipo }),
    }).then(r => r.json()).then(data => {
      if (data.carta) setCartaText(data.carta);
      else setCartaText(generarCartaSolicitud(cartaDialog.permiso, companyData, cartaDialog.tipo));
    }).catch(() => {
      setCartaText(generarCartaSolicitud(cartaDialog.permiso, companyData, cartaDialog.tipo));
    }).finally(() => setCartaLoading(false));
  }, [cartaDialog]);

  const handleCopyCarta = useCallback((carta: string) => {
    navigator.clipboard.writeText(carta);
    toast({ title: "COPIADO", description: "Carta copiada al portapapeles" });
  }, [toast]);

  const handleRegistrar = useCallback(async () => {
    if (!formData.tipo || !formData.nombre_permiso || !formData.organismo) {
      toast({ title: "CAMPOS REQUERIDOS", description: "Tipo, nombre del permiso y organismo son obligatorios", variant: "destructive" });
      return;
    }
    try {
      const res = await fetch('/api/permisos-legales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "REGISTRADO", description: `Permiso "${formData.nombre_permiso}" registrado exitosamente.` });
        setRegistroDialog(false);
        setFormData({ tipo: '', nombre_permiso: '', organismo: '', numero_permiso: '', fecha_emision: '', fecha_vencimiento: '', estado: 'vigente', descripcion: '', alertar_dias_antes: '30' });
        fetch('/api/permisologia/alertas').then(r => r.json()).then(d => {
          if (d.alertas) setAlertas(d.alertas);
          if (d.resumen) setResumen(d.resumen);
        }).catch(() => {});
      } else {
        toast({ title: "ERROR", description: data.error || "No se pudo registrar el permiso", variant: "destructive" });
      }
    } catch {
      toast({ title: "ERROR", description: "Error de conexión al registrar el permiso", variant: "destructive" });
    }
  }, [formData, toast]);

  const tipoOrgLabels: Record<string, { label: string; icon: typeof Landmark }> = {
    seniat: { label: "SENIAT", icon: Landmark },
    ministerio: { label: "Ministerios", icon: Building2 },
    alcaldia: { label: "Alcaldías", icon: MapPin },
    gobernacion: { label: "Gobernaciones", icon: Shield },
    ente_autonomo: { label: "Entes Autónomos", icon: ShieldCheck },
    instituto: { label: "Institutos", icon: ClipboardList },
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <ShieldCheck className="h-3 w-3" /> CENTRO DE PERMISOLOGÍA 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">
            Permisología <span className="text-primary italic">Integral</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">
            SENIAT • Ministerios • Alcaldías • Gobernaciones • Entes Autónomos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 font-black text-[9px] uppercase tracking-widest" onClick={() => setActiveTab('alertas')}>
            <BellRing className="mr-2 h-4 w-4 text-amber-400" /> ALERTAS {alertas.length > 0 && <Badge className="ml-2 bg-red-500 text-white text-[8px]">{alertas.length}</Badge>}
          </Button>
          <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setRegistroDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> REGISTRAR PERMISO
          </Button>
        </div>
      </header>

      {resumen && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Registrados", value: resumen.total, icon: ClipboardList, color: "text-blue-400" },
            { label: "Vigentes", value: resumen.vigentes, icon: CheckCircle2, color: "text-emerald-400" },
            { label: "Por Vencer (30d)", value: resumen.por_vencer_30, icon: Clock, color: "text-amber-400" },
            { label: "Por Vencer (60d)", value: resumen.por_vencer_60, icon: AlertTriangle, color: "text-orange-400" },
            { label: "Vencidos", value: resumen.vencidos, icon: XCircle, color: "text-red-400" },
            { label: "En Trámite", value: resumen.en_tramite, icon: RefreshCw, color: "text-violet-400" },
          ].map(stat => (
            <Card key={stat.label} className="glass-card border-none bg-card/40 rounded-2xl">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">{stat.value}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1.5 h-auto flex-wrap gap-1">
          <TabsTrigger value="catalogo" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <FileText className="mr-2 h-3.5 w-3.5" /> Catálogo Completo
          </TabsTrigger>
          <TabsTrigger value="seniat" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <Landmark className="mr-2 h-3.5 w-3.5" /> SENIAT
          </TabsTrigger>
          <TabsTrigger value="ministerios" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <Building2 className="mr-2 h-3.5 w-3.5" /> Ministerios
          </TabsTrigger>
          <TabsTrigger value="alcaldias" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <MapPin className="mr-2 h-3.5 w-3.5" /> Alcaldías
          </TabsTrigger>
          <TabsTrigger value="gobernaciones" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <Shield className="mr-2 h-3.5 w-3.5" /> Gobernaciones
          </TabsTrigger>
          <TabsTrigger value="entes" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2.5">
            <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Entes / Institutos
          </TabsTrigger>
          <TabsTrigger value="alertas" className="rounded-xl text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-amber-600 data-[state=active]:text-white px-5 py-2.5">
            <Bell className="mr-2 h-3.5 w-3.5" /> Alertas
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <Input placeholder="Buscar permiso, organismo o requisito..." className="pl-12 h-12 rounded-xl bg-white/5 border-white/10 text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <Select value={filterOrg} onValueChange={setFilterOrg}>
            <SelectTrigger className="w-full md:w-[240px] h-12 rounded-xl bg-white/5 border-white/10 text-[10px] font-bold uppercase">
              <Filter className="mr-2 h-3.5 w-3.5" /> <SelectValue placeholder="Organismo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los organismos</SelectItem>
              {organismos.map(o => <SelectItem key={o.id} value={o.id}>{o.siglas || o.nombre}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterSector} onValueChange={setFilterSector}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl bg-white/5 border-white/10 text-[10px] font-bold uppercase">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los sectores</SelectItem>
              <SelectItem value="comercio">Comercio</SelectItem>
              <SelectItem value="industria">Industria</SelectItem>
              <SelectItem value="servicios">Servicios</SelectItem>
              <SelectItem value="alimentos">Alimentos</SelectItem>
              <SelectItem value="salud">Salud</SelectItem>
              <SelectItem value="telecomunicaciones">Telecomunicaciones</SelectItem>
              <SelectItem value="construccion">Construcción</SelectItem>
              <SelectItem value="transporte">Transporte</SelectItem>
              <SelectItem value="turismo">Turismo</SelectItem>
              <SelectItem value="mineria">Minería</SelectItem>
              <SelectItem value="ambiente">Ambiente</SelectItem>
              <SelectItem value="educacion">Educación</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="catalogo" className="mt-6 space-y-6">
          <PermisosCatalogo groups={permisosByTipoOrg} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="seniat" className="mt-6 space-y-6">
          <SeniatSection onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="ministerios" className="mt-6 space-y-6">
          <OrganismoSection tipo="ministerio" organismos={orgTipos.ministerio} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="alcaldias" className="mt-6 space-y-6">
          <OrganismoSection tipo="alcaldia" organismos={orgTipos.alcaldia} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="gobernaciones" className="mt-6 space-y-6">
          <OrganismoSection tipo="gobernacion" organismos={orgTipos.gobernacion} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="entes" className="mt-6 space-y-6">
          <OrganismoSection tipo="ente_autonomo" organismos={orgTipos.ente_autonomo} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
          <OrganismoSection tipo="instituto" organismos={orgTipos.instituto} onGenerarCarta={(p, t) => setCartaDialog({ permiso: p, tipo: t })} />
        </TabsContent>

        <TabsContent value="alertas" className="mt-6 space-y-6">
          <AlertasSection alertas={alertas} />
        </TabsContent>
      </Tabs>

      <Dialog open={!!cartaDialog} onOpenChange={open => !open && setCartaDialog(null)}>
        <DialogContent className="max-w-4xl rounded-[2rem] bg-card/95 backdrop-blur-3xl border-white/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {cartaDialog && (
            <>
              <div className="p-8 border-b border-white/5 bg-primary/5">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase text-foreground">
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
                    <p className="font-black text-xs uppercase italic">System Kyron, C.A.</p>
                    <p className="text-[8px] font-bold uppercase text-slate-500">RIF: {companyData.rif}</p>
                  </div>
                </header>
                <div className="whitespace-pre-wrap text-sm leading-relaxed relative z-10 text-justify">
                  {cartaText}
                </div>
              </div>
              <DialogFooter className="p-6 border-t border-white/5 bg-white/[0.01] gap-3 flex-wrap">
                <Button variant="outline" className="rounded-xl h-12 px-6 border-white/10 text-foreground/60 font-black uppercase text-[9px]" onClick={() => handleCopyCarta(cartaText)}>
                  <Copy className="mr-2 h-4 w-4" /> COPIAR
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-6 border-white/10 text-foreground/60 font-black uppercase text-[9px]" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                </Button>
                <Button className="rounded-xl h-12 px-8 btn-3d-primary font-black uppercase text-[9px]" onClick={() => {
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

      <Dialog open={registroDialog} onOpenChange={setRegistroDialog}>
        <DialogContent className="max-w-2xl rounded-[2rem] bg-card/95 backdrop-blur-3xl border-white/10 p-0 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-primary/5">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase text-foreground">Registrar Nuevo Permiso</DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase text-primary/60">Agregar permiso al expediente de la empresa</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">Tipo</label>
                <Select value={formData.tipo} onValueChange={v => setFormData(p => ({ ...p, tipo: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/5 border-white/10"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="licencia">Licencia</SelectItem>
                    <SelectItem value="permiso">Permiso</SelectItem>
                    <SelectItem value="registro">Registro</SelectItem>
                    <SelectItem value="certificacion">Certificación</SelectItem>
                    <SelectItem value="habilitacion">Habilitación</SelectItem>
                    <SelectItem value="solvencia">Solvencia</SelectItem>
                    <SelectItem value="autorizacion">Autorización</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">Organismo</label>
                <Select value={formData.organismo} onValueChange={v => setFormData(p => ({ ...p, organismo: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/5 border-white/10"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    {organismos.map(o => <SelectItem key={o.id} value={o.nombre}>{o.siglas || o.nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground">Nombre del permiso</label>
              <Input className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.nombre_permiso} onChange={e => setFormData(p => ({ ...p, nombre_permiso: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">N° Expediente</label>
                <Input className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.numero_permiso} onChange={e => setFormData(p => ({ ...p, numero_permiso: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">Estado</label>
                <Select value={formData.estado} onValueChange={v => setFormData(p => ({ ...p, estado: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vigente">Vigente</SelectItem>
                    <SelectItem value="en_tramite">En trámite</SelectItem>
                    <SelectItem value="por_vencer">Por vencer</SelectItem>
                    <SelectItem value="renovacion">En renovación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">Fecha de Emisión</label>
                <Input type="date" className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.fecha_emision} onChange={e => setFormData(p => ({ ...p, fecha_emision: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-muted-foreground">Fecha de Vencimiento</label>
                <Input type="date" className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.fecha_vencimiento} onChange={e => setFormData(p => ({ ...p, fecha_vencimiento: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground">Alertar (días antes del vencimiento)</label>
              <Input type="number" className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.alertar_dias_antes} onChange={e => setFormData(p => ({ ...p, alertar_dias_antes: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground">Descripción / Notas</label>
              <Input className="h-11 rounded-xl bg-white/5 border-white/10" value={formData.descripcion} onChange={e => setFormData(p => ({ ...p, descripcion: e.target.value }))} />
            </div>
          </div>
          <DialogFooter className="p-6 border-t border-white/5">
            <Button variant="outline" className="rounded-xl h-12 px-6 border-white/10 font-black uppercase text-[9px]" onClick={() => setRegistroDialog(false)}>CANCELAR</Button>
            <Button className="rounded-xl h-12 px-8 btn-3d-primary font-black uppercase text-[9px]" onClick={handleRegistrar}>REGISTRAR</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SeniatSection({ onGenerarCarta }: { onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  const seniatPermisos = tiposPermiso.filter(p => p.organismoId === 'SENIAT');

  return (
    <div className="space-y-6">
      <Card className="glass-card border-none rounded-[2rem] bg-gradient-to-br from-red-950/20 to-card/40 overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
              <Landmark className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-black uppercase text-foreground">SENIAT — Obligaciones Tributarias 2026</CardTitle>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Servicio Nacional Integrado de Administración Aduanera y Tributaria</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {seniatPermisos.map(permiso => (
            <PermisoCard key={permiso.id} permiso={permiso} onGenerarCarta={onGenerarCarta} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function OrganismoSection({ tipo, organismos: orgs, onGenerarCarta }: { tipo: string; organismos: Organismo[]; onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  const iconMap: Record<string, typeof Building2> = {
    ministerio: Building2,
    alcaldia: MapPin,
    gobernacion: Shield,
  };
  const colorMap: Record<string, string> = {
    ministerio: 'from-blue-950/20',
    alcaldia: 'from-emerald-950/20',
    gobernacion: 'from-violet-950/20',
  };
  const Icon = iconMap[tipo] || Building2;
  const gradient = colorMap[tipo] || 'from-card/40';

  return (
    <div className="space-y-6">
      {orgs.map(org => {
        const permisos = tiposPermiso.filter(p => p.organismoId === org.id);
        if (permisos.length === 0) return (
          <Card key={org.id} className="glass-card border-none rounded-[2rem] bg-card/40 overflow-hidden">
            <CardHeader className="p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Icon className="h-5 w-5 text-muted-foreground/60" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase text-foreground">{org.nombre}</CardTitle>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 mt-1">Permisos aplicables según actividad económica — Consultar directamente</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        );
        return (
          <Card key={org.id} className={`glass-card border-none rounded-[2rem] bg-gradient-to-br ${gradient} to-card/40 overflow-hidden`}>
            <CardHeader className="p-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase text-foreground">{org.nombre}</CardTitle>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">{org.siglas || org.tipo.toUpperCase()}</p>
                </div>
                <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-[8px] font-black uppercase px-3">{permisos.length} PERMISOS</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {permisos.map(p => <PermisoCard key={p.id} permiso={p} onGenerarCarta={onGenerarCarta} />)}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function PermisosCatalogo({ groups, onGenerarCarta }: { groups: { org: Organismo; permisos: PermisoTipo[] }[]; onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  if (groups.length === 0) {
    return (
      <Card className="glass-card border-none rounded-[2rem] bg-card/40 p-16 text-center">
        <Search className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
        <p className="text-sm font-bold text-muted-foreground/40 uppercase">No se encontraron permisos con los filtros seleccionados</p>
      </Card>
    );
  }

  return (
    <Accordion type="multiple" className="space-y-4">
      {groups.map(({ org, permisos }) => (
        <AccordionItem key={org.id} value={org.id} className="border-none">
          <Card className="glass-card border-none rounded-[2rem] bg-card/40 overflow-hidden">
            <AccordionTrigger className="px-8 py-6 hover:bg-white/[0.02] transition-all hover:no-underline">
              <div className="flex justify-between items-center w-full pr-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Landmark className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-black uppercase text-sm text-foreground/80">{org.siglas || org.nombre}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">{org.nombre}</p>
                  </div>
                </div>
                <Badge className="bg-white/5 border-white/10 text-[8px] font-black uppercase px-3">{permisos.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              {permisos.map(p => <PermisoCard key={p.id} permiso={p} onGenerarCarta={onGenerarCarta} />)}
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function PermisoCard({ permiso, onGenerarCarta }: { permiso: PermisoTipo; onGenerarCarta: (p: PermisoTipo, t: 'inscripcion' | 'renovacion') => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
      <div className="px-8 py-5 flex items-center gap-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <p className="font-black text-sm text-foreground/90 uppercase truncate">{permiso.nombre}</p>
            {permiso.vigencia && (
              <Badge variant="outline" className="text-[7px] font-black uppercase border-white/10 px-2 shrink-0">
                <Calendar className="mr-1 h-2.5 w-2.5" /> {permiso.vigencia} MESES
              </Badge>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground/60 line-clamp-1">{permiso.descripcion}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="h-9 px-3 rounded-lg text-primary text-[8px] font-black uppercase hover:bg-primary/10" onClick={e => { e.stopPropagation(); onGenerarCarta(permiso, 'inscripcion'); }}>
            <FileSignature className="mr-1.5 h-3 w-3" /> Inscripción
          </Button>
          {permiso.requisitosRenovacion.length > 0 && (
            <Button variant="ghost" size="sm" className="h-9 px-3 rounded-lg text-amber-400 text-[8px] font-black uppercase hover:bg-amber-500/10" onClick={e => { e.stopPropagation(); onGenerarCarta(permiso, 'renovacion'); }}>
              <RefreshCw className="mr-1.5 h-3 w-3" /> Renovación
            </Button>
          )}
          <ChevronRight className={`h-4 w-4 text-muted-foreground/30 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      {expanded && (
        <div className="px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-5">
          <div className="space-y-3">
            <p className="text-[8px] font-black uppercase tracking-widest text-primary/60">Requisitos de Inscripción</p>
            <ul className="space-y-2">
              {permiso.requisitosInscripcion.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground/80">
                  <ArrowRight className="h-3 w-3 text-primary/40 shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {permiso.requisitosRenovacion.length > 0 && (
            <div className="space-y-3">
              <p className="text-[8px] font-black uppercase tracking-widest text-amber-400/60">Requisitos de Renovación</p>
              <ul className="space-y-2">
                {permiso.requisitosRenovacion.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground/80">
                    <ArrowRight className="h-3 w-3 text-amber-400/40 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="md:col-span-2 flex flex-wrap gap-4 pt-2 border-t border-white/5">
            {permiso.baseLegal && (
              <div className="flex items-center gap-2 text-[9px] text-muted-foreground/40">
                <Zap className="h-3 w-3" /> <span className="font-bold">Base legal:</span> {permiso.baseLegal}
              </div>
            )}
            {permiso.costoEstimado && (
              <div className="flex items-center gap-2 text-[9px] text-muted-foreground/40">
                <Landmark className="h-3 w-3" /> <span className="font-bold">Costo:</span> {permiso.costoEstimado}
              </div>
            )}
            <div className="flex items-center gap-2 text-[9px] text-muted-foreground/40">
              <Clock className="h-3 w-3" /> <span className="font-bold">Vigencia:</span> {permiso.vigencia ? `${permiso.vigencia} meses` : 'Permanente'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertasSection({ alertas }: { alertas: AlertaDB[] }) {
  if (alertas.length === 0) {
    return (
      <Card className="glass-card border-none rounded-[2rem] bg-card/40 p-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400/30 mx-auto mb-4" />
        <p className="text-lg font-black text-foreground/60 uppercase">Sin Alertas Pendientes</p>
        <p className="text-[10px] text-muted-foreground/40 mt-2">Todos los permisos registrados están al día. Registre sus permisos para activar el sistema de alertas.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alertas.map(a => {
        const config = a.nivel_alerta === 'vencido' || a.nivel_alerta === 'critico'
          ? nivelAlertaConfig.critico
          : a.nivel_alerta === 'advertencia'
            ? nivelAlertaConfig.advertencia
            : nivelAlertaConfig.ok;
        const AlertIcon = config.icon;

        return (
          <Card key={a.id} className={`glass-card border rounded-2xl bg-card/40 overflow-hidden ${config.color}`}>
            <CardContent className="p-6 flex items-center gap-6">
              <div className="p-3 rounded-xl bg-white/5">
                <AlertIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black uppercase text-sm truncate">{a.nombre_permiso}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{a.organismo}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black">{a.dias_restantes < 0 ? `${Math.abs(a.dias_restantes)}d vencido` : `${a.dias_restantes}d`}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">
                  Vence: {new Date(a.fecha_vencimiento).toLocaleDateString('es-VE')}
                </p>
              </div>
              <Badge className={`${config.color} text-[7px] font-black uppercase px-3 py-1`}>{config.label}</Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
