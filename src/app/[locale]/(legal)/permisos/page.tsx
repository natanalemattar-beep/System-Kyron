
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CirclePlus as PlusCircle, Eye, Gavel, ShieldCheck, Activity, Calendar, Building2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Permiso = {
    id: string;
    tipo: string;
    emisor: string;
    fechaEmision: string;
    fechaVencimiento: string;
    estado: string;
    requisitosInscripcion: string[];
    requisitosRenovacion: string[];
};

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
};

const emisoresComunes = [
  "SENIAT",
  "SAREN",
  "CONATEL",
  "SAPI",
  "Ministerio del Poder Popular de Petróleo",
  "Ministerio del Poder Popular de Comercio",
  "Ministerio del Poder Popular de Industrias",
  "Alcaldía Municipal",
  "Gobernación del Estado",
  "Cuerpo de Bomberos",
  "INCES",
  "IVSS",
  "Otro",
];

const estadosPermiso = ["Vigente", "Por Vencer", "Vencido", "En Renovación"];

export default function PermisosPage() {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const { toast } = useToast();
  const [registroOpen, setRegistroOpen] = useState(false);
  const [detallePermiso, setDetallePermiso] = useState<Permiso | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    emisor: "",
    emisorCustom: "",
    fechaEmision: "",
    fechaVencimiento: "",
    estado: "Vigente",
  });

  const groupedPermisos = permisos.reduce((acc, permiso) => {
    const emisor = permiso.emisor;
    if (!acc[emisor]) acc[emisor] = [];
    acc[emisor].push(permiso);
    return acc;
  }, {} as Record<string, Permiso[]>);

  const resetForm = () => {
    setFormData({ tipo: "", emisor: "", emisorCustom: "", fechaEmision: "", fechaVencimiento: "", estado: "Vigente" });
  };

  const handleRegistrar = () => {
    const emisorFinal = formData.emisor === "Otro" ? formData.emisorCustom : formData.emisor;

    if (!formData.tipo.trim()) {
      toast({ title: "Campo requerido", description: "Ingrese el tipo de permiso o trámite.", variant: "destructive" });
      return;
    }
    if (!emisorFinal.trim()) {
      toast({ title: "Campo requerido", description: "Seleccione o ingrese el ente emisor.", variant: "destructive" });
      return;
    }
    if (!formData.fechaEmision) {
      toast({ title: "Campo requerido", description: "Ingrese la fecha de emisión.", variant: "destructive" });
      return;
    }

    const nuevoPermiso: Permiso = {
      id: `PERM-${String(permisos.length + 1).padStart(3, "0")}`,
      tipo: formData.tipo.trim(),
      emisor: emisorFinal.trim(),
      fechaEmision: formData.fechaEmision,
      fechaVencimiento: formData.fechaVencimiento || "Indefinido",
      estado: formData.estado,
      requisitosInscripcion: [],
      requisitosRenovacion: [],
    };

    setPermisos(prev => [...prev, nuevoPermiso]);
    setRegistroOpen(false);
    resetForm();
    toast({ title: "Trámite registrado", description: `"${nuevoPermiso.tipo}" ha sido agregado al directorio.` });
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-6 md:mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-3">
                <Gavel className="h-3 w-3" /> NODO DE CUMPLIMIENTO
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Trámites y <span className="text-primary italic">Permisos</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-1 md:mt-2 italic">Monitor de Licencias v2.8.5 · Registro Centralizado</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
            { label: "Total Permisos", value: String(permisos.length), color: "text-primary", bg: "bg-primary/10", icon: ShieldCheck },
            { label: "Vigentes", value: String(permisos.filter(p => p.estado === 'Vigente').length), color: "text-emerald-500", bg: "bg-emerald-500/10", icon: Activity },
            { label: "Por Vencer", value: String(permisos.filter(p => p.estado === 'Por Vencer' || p.estado === 'Vencido').length), color: "text-amber-500", bg: "bg-amber-500/10", icon: ShieldCheck },
        ].map((kpi, i) => (
            <Card key={i} className="glass-card border-none bg-card/40 rounded-2xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</span>
                    <div className={cn("p-2 rounded-xl", kpi.bg)}><kpi.icon className={cn("h-4 w-4", kpi.color)} /></div>
                </div>
                <p className={cn("text-2xl font-black italic tracking-tight", kpi.color)}>{kpi.value}</p>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-md">
            <CardHeader className="p-6 md:p-8 border-b border-border/30">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-foreground/60">Directorio de Habilitaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {permisos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                            <ShieldCheck className="h-8 w-8 text-primary/40" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-foreground/40 mb-2">Sin permisos registrados</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 max-w-sm mb-6">Registre su primer trámite para comenzar a gestionar sus licencias y habilitaciones.</p>
                        <Button onClick={() => setRegistroOpen(true)} className="btn-3d-primary h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest">
                            <PlusCircle className="mr-2 h-4 w-4" /> REGISTRAR PRIMER TRÁMITE
                        </Button>
                    </div>
                ) : (
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                        <AccordionItem value={emisor} key={emisor} className="border-border/30">
                            <AccordionTrigger className="px-6 md:px-8 py-5 hover:bg-muted/30 transition-all">
                                <div className="flex justify-between items-center w-full pr-6">
                                    <span className="font-black uppercase italic tracking-tight text-foreground/80">{emisor}</span>
                                    <Badge className="bg-muted border-border text-[8px] font-black uppercase px-3">{lista.length} ITEMS</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {lista.map(p => (
                                            <TableRow key={p.id} className="border-none hover:bg-muted/20">
                                                <TableCell className="pl-8 md:pl-12 py-4 text-[10px] font-black text-primary italic uppercase">{p.id}</TableCell>
                                                <TableCell className="py-4 font-bold text-foreground/60 text-xs uppercase">{p.tipo}</TableCell>
                                                <TableCell className="py-4">
                                                    <Badge variant={statusVariant[p.estado]} className="text-[8px] font-black uppercase tracking-widest">{p.estado}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-6 md:pr-8 py-4">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/40" onClick={() => setDetallePermiso(p)}>
                                                        <Eye className="h-4 w-4 text-muted-foreground/40" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                )}
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
            <Card className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden shadow-lg border-none group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Activity className="h-24 w-24" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tight mb-3">Nueva Solicitud</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-6">Inicie el protocolo de gestión ante nuevos entes emisores.</p>
                <Button
                    className="w-full h-11 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-lg"
                    onClick={() => setRegistroOpen(true)}
                >
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR TRÁMITE
                </Button>
            </Card>

            {permisos.length > 0 && (
            <Card className="glass-card border-none bg-amber-500/5 rounded-2xl p-6 border border-amber-500/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-4 flex items-center gap-3 italic">
                    <ShieldCheck className="h-4 w-4" /> Alerta de Vencimiento
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">
                    El sistema ha detectado {permisos.filter(p => p.estado === 'Por Vencer').length} permisos en ventana de renovación. Verifique el módulo de tareas para evitar la extinción de derechos.
                </p>
            </Card>
            )}

            <Card className="glass-card border-none bg-card/40 rounded-2xl p-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/60 mb-4">Entes Emisores</h4>
                {Object.keys(groupedPermisos).length === 0 ? (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 text-center py-4">Sin entes registrados</p>
                ) : (
                <div className="space-y-2">
                    {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                        <div key={emisor} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/70">{emisor}</span>
                            <Badge variant="outline" className="text-[8px]">{lista.length}</Badge>
                        </div>
                    ))}
                </div>
                )}
            </Card>
        </div>
      </div>

      <Dialog open={registroOpen} onOpenChange={setRegistroOpen}>
        <DialogContent className="max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10"><PlusCircle className="h-5 w-5 text-primary" /></div>
              Registrar Trámite
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Complete los datos del permiso o licencia a registrar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-foreground/60">Tipo de permiso / trámite *</label>
              <Input
                placeholder="Ej: Licencia de Actividades Económicas"
                value={formData.tipo}
                onChange={e => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                className="rounded-xl h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-foreground/60">Ente emisor *</label>
              <Select value={formData.emisor} onValueChange={val => setFormData(prev => ({ ...prev, emisor: val }))}>
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder="Seleccione el organismo" />
                </SelectTrigger>
                <SelectContent>
                  {emisoresComunes.map(e => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.emisor === "Otro" && (
                <Input
                  placeholder="Nombre del ente emisor"
                  value={formData.emisorCustom}
                  onChange={e => setFormData(prev => ({ ...prev, emisorCustom: e.target.value }))}
                  className="rounded-xl h-11 mt-2"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-foreground/60">Fecha de emisión *</label>
                <Input
                  type="date"
                  value={formData.fechaEmision}
                  onChange={e => setFormData(prev => ({ ...prev, fechaEmision: e.target.value }))}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-foreground/60">Fecha de vencimiento</label>
                <Input
                  type="date"
                  value={formData.fechaVencimiento}
                  onChange={e => setFormData(prev => ({ ...prev, fechaVencimiento: e.target.value }))}
                  className="rounded-xl h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-foreground/60">Estado</label>
              <Select value={formData.estado} onValueChange={val => setFormData(prev => ({ ...prev, estado: val }))}>
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estadosPermiso.map(e => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => { setRegistroOpen(false); resetForm(); }} className="rounded-xl h-11 font-black text-[9px] uppercase tracking-widest">
              Cancelar
            </Button>
            <Button onClick={handleRegistrar} className="btn-3d-primary rounded-xl h-11 font-black text-[9px] uppercase tracking-widest px-8">
              <PlusCircle className="mr-2 h-4 w-4" /> Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detallePermiso} onOpenChange={open => { if (!open) setDetallePermiso(null); }}>
        <DialogContent className="max-w-md rounded-3xl">
          {detallePermiso && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                  Detalle del Permiso
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">ID</span>
                  <span className="text-sm font-black text-primary italic">{detallePermiso.id}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Tipo</span>
                  <span className="text-xs font-bold text-foreground/80 text-right max-w-[60%]">{detallePermiso.tipo}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Emisor</span>
                  <span className="text-xs font-bold text-foreground/80 flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-primary/60" /> {detallePermiso.emisor}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Emisión</span>
                  <span className="text-xs font-bold text-foreground/80 flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-primary/60" /> {detallePermiso.fechaEmision}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Vencimiento</span>
                  <span className="text-xs font-bold text-foreground/80 flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-amber-500/60" /> {detallePermiso.fechaVencimiento}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Estado</span>
                  <Badge variant={statusVariant[detallePermiso.estado]} className="text-[8px] font-black uppercase tracking-widest">{detallePermiso.estado}</Badge>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetallePermiso(null)} className="rounded-xl h-11 font-black text-[9px] uppercase tracking-widest w-full">
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
