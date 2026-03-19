"use client";

import { useState, useEffect, useCallback } from "react";
import { Gavel, Signature as FileSignature, ShieldCheck, Clock, TriangleAlert as AlertTriangle, CirclePlus as PlusCircle, Download, Eye, FileText, Search, Scale, Activity, Lock, Wand as Wand2, ArrowRight, Sparkles, Loader as Loader2, RefreshCw, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

interface DocumentoJuridico {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string | null;
  fecha_documento: string | null;
  fecha_vencimiento: string | null;
  estado: string;
  notaria: string | null;
  notas: string | null;
  created_at: string;
}

interface Stats {
  contratos_activos: number;
  poderes_vigentes: number;
  por_vencer: number;
  vencidos: number;
}

const TIPOS = ["contrato","poder","acta","escritura","demanda","recurso","comunicado","otro"];
const ESTADOS = ["borrador","vigente","vencido","rescindido","archivado"];

const estadoVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  vigente: "default",
  borrador: "secondary",
  vencido: "destructive",
  rescindido: "destructive",
  archivado: "outline",
};

const estadoLabel: Record<string, string> = {
  vigente: "Vigente", borrador: "Borrador", vencido: "Vencido",
  rescindido: "Rescindido", archivado: "Archivado",
};

const tipoLabel: Record<string, string> = {
  contrato: "Contrato", poder: "Poder", acta: "Acta", escritura: "Escritura",
  demanda: "Demanda", recurso: "Recurso", comunicado: "Comunicado", otro: "Otro",
};

export default function EscritorioJuridicoPage() {
  const { toast } = useToast();
  const [documentos, setDocumentos] = useState<DocumentoJuridico[]>([]);
  const [stats, setStats] = useState<Stats>({ contratos_activos: 0, poderes_vigentes: 0, por_vencer: 0, vencidos: 0 });
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    tipo: "contrato", titulo: "", descripcion: "",
    fecha_documento: "", fecha_vencimiento: "",
    estado: "vigente", notaria: "", registro_publico: "", notas: ""
  });

  const fetchDocumentos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/documentos-juridicos');
      if (res.ok) {
        const data = await res.json();
        setDocumentos(data.documentos ?? []);
        setStats(data.stats ?? { contratos_activos: 0, poderes_vigentes: 0, por_vencer: 0, vencidos: 0 });
      }
    } catch { /* silently fail */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDocumentos(); }, [fetchDocumentos]);

  const handleSave = async () => {
    if (!form.titulo || !form.tipo) {
      toast({ title: "Error", description: "Título y tipo son obligatorios", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/documentos-juridicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "DOCUMENTO REGISTRADO", description: `${tipoLabel[form.tipo]}: ${form.titulo} guardado correctamente.` });
        setShowDialog(false);
        setForm({ tipo: "contrato", titulo: "", descripcion: "", fecha_documento: "", fecha_vencimiento: "", estado: "vigente", notaria: "", registro_publico: "", notas: "" });
        fetchDocumentos();
      } else {
        toast({ title: "Error", description: data.error ?? "No se pudo guardar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Error de conexión", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/documentos-juridicos?id=${id}`, { method: 'DELETE' });
      fetchDocumentos();
      toast({ title: "Documento eliminado" });
    } catch { /* silently fail */ }
  };

  const filtrados = documentos.filter(d =>
    d.titulo.toLowerCase().includes(search.toLowerCase()) ||
    d.tipo.toLowerCase().includes(search.toLowerCase())
  );

  const porVencer = documentos.filter(d => {
    if (!d.fecha_vencimiento || d.estado === 'archivado') return false;
    const dias = Math.floor((new Date(d.fecha_vencimiento).getTime() - Date.now()) / 86400000);
    return dias >= 0 && dias <= 30;
  });

  const kpiData = [
    { title: "Contratos Activos", value: stats.contratos_activos, icon: FileSignature, color: "text-blue-400", bg: "bg-blue-400/5" },
    { title: "Alertas Críticas",  value: stats.vencidos,          icon: AlertTriangle,  color: "text-rose-400",  bg: "bg-rose-400/5"  },
    { title: "Poderes Vigentes",  value: stats.poderes_vigentes,  icon: ShieldCheck,    color: "text-emerald-400", bg: "bg-emerald-400/5" },
    { title: "Por Vencer (30d)", value: stats.por_vencer,         icon: Clock,          color: "text-purple-400", bg: "bg-purple-400/5" },
  ];

  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-slate-500 pl-8 py-2 mt-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-500/10 border border-slate-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">
            <Gavel className="h-3 w-3" /> ÁREA LEGAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">
            Centro de <span className="text-slate-400 italic">Gestión Jurídica</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">
            Bóveda de Documentos Protegidos • Cumplimiento 2026
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowDialog(true)} className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest">
            <PlusCircle className="mr-2 h-4 w-4" /> NUEVO DOCUMENTO
          </Button>
          <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-primary/30 bg-primary/5 text-primary">
            <Link href="/generador-documentos">
              <Wand2 className="mr-2 h-4 w-4" /> GENERADOR IA
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={fetchDocumentos} className="h-12 w-12 rounded-xl border-white/10">
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="glass-card border-none bg-white/[0.02] p-2 rounded-[2rem]">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-white/30">{kpi.title}</CardTitle>
                <div className={cn("p-2 rounded-lg border border-white/5", kpi.bg)}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {loading ? (
                  <div className="h-9 w-16 bg-white/5 rounded animate-pulse" />
                ) : (
                  <div className="text-3xl font-black italic text-white tracking-tighter leading-none">{kpi.value}</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden">
          <CardHeader className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center bg-white/[0.01]">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Expedientes y Trámites</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">
                {documentos.length} documentos registrados
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64 mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input
                placeholder="Buscar documento..."
                className="pl-10 h-11 rounded-xl bg-white/5 border-white/10 text-xs font-bold"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-10 space-y-4">
                {[1,2,3].map(n => <div key={n} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}
              </div>
            ) : filtrados.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="h-12 w-12 text-white/10 mx-auto mb-4" />
                <p className="text-[10px] font-black uppercase text-white/20">No hay documentos registrados</p>
                <Button onClick={() => setShowDialog(true)} variant="outline" size="sm" className="mt-4 text-[9px] font-black uppercase rounded-xl border-white/10">
                  Registrar primer documento
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/[0.02] border-none">
                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Tipo</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Título</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Vencimiento</TableHead>
                    <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Estado</TableHead>
                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrados.map((doc) => {
                    const diasVencer = doc.fecha_vencimiento
                      ? Math.floor((new Date(doc.fecha_vencimiento).getTime() - Date.now()) / 86400000)
                      : null;
                    return (
                      <TableRow key={doc.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <TableCell className="pl-10 py-6">
                          <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 text-white/40">
                            {tipoLabel[doc.tipo] ?? doc.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6 font-black uppercase text-xs text-white/80 group-hover:text-white max-w-[200px] truncate">
                          {doc.titulo}
                          {diasVencer !== null && diasVencer <= 30 && diasVencer >= 0 && (
                            <span className="ml-2 text-amber-500 text-[8px]">⚠ {diasVencer}d</span>
                          )}
                        </TableCell>
                        <TableCell className="py-6 text-[10px] font-bold text-white/30 uppercase">
                          {doc.fecha_vencimiento
                            ? new Date(doc.fecha_vencimiento).toLocaleDateString('es-VE')
                            : "Sin vencimiento"}
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <Badge variant={estadoVariant[doc.estado] ?? "outline"} className="text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg">
                            {estadoLabel[doc.estado] ?? doc.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-10 py-6">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
                              onClick={() => toast({ title: doc.titulo, description: doc.descripcion ?? doc.notas ?? "Sin descripción adicional." })}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-rose-500/10 hover:text-rose-500"
                              onClick={() => handleDelete(doc.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="border-t border-white/5 bg-white/[0.01] p-6 flex justify-center">
            <Button variant="link" asChild className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-primary transition-all">
              <Link href="/permisos" className="flex items-center">
                GESTIONAR PERMISOS Y LICENCIAS <ArrowRight className="ml-3 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
              <FileText className="h-32 w-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Generador Legal IA</h3>
              <h4 className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">
                Redacción automatizada de borradores legales seguros.
              </h4>
            </div>
            <Button asChild className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-2xl">
              <Link href="/generador-documentos">NUEVO CONTRATO <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </Card>

          <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 flex items-center gap-3">
                <AlertTriangle className="h-4 w-4" /> Vencimientos Próximos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {porVencer.length === 0 ? (
                <p className="text-[9px] font-bold text-white/20 uppercase">Sin vencimientos próximos</p>
              ) : (
                porVencer.slice(0, 3).map((doc) => {
                  const dias = Math.floor((new Date(doc.fecha_vencimiento!).getTime() - Date.now()) / 86400000);
                  return (
                    <div key={doc.id} className={cn(
                      "flex items-start gap-5 p-5 rounded-2xl border transition-all",
                      dias <= 7 ? "bg-rose-500/5 border-rose-500/10" : "bg-amber-500/5 border-amber-500/10"
                    )}>
                      <Clock className={cn("h-6 w-6 shrink-0 mt-0.5", dias <= 7 ? "text-rose-500" : "text-amber-500")} />
                      <div className="space-y-1 min-w-0">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest truncate", dias <= 7 ? "text-rose-600" : "text-amber-600")}>
                          {doc.titulo}
                        </p>
                        <p className="text-[9px] font-bold text-white/40 uppercase">Vence en {dias} días</p>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="glass-card border-none p-12 md:p-20 rounded-[4rem] bg-white/[0.02] mt-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-6">
              <Logo className="h-16 w-16 drop-shadow-glow" />
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                Archivo <br/> <span className="text-slate-500">Legal Seguro</span>
              </h2>
            </div>
            <p className="text-xl font-bold italic text-white/60 leading-relaxed text-justify border-l-4 border-slate-500/20 pl-10">
              Archivo digital de grado profesional para el resguardo de los activos jurídicos de la empresa. Centraliza Actas Constitutivas, Modificaciones de Estatutos y Poderes de Representación con cifrado total.
            </p>
            <div className="flex items-center gap-10 pt-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
              <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> DATOS CIFRADOS</span>
              <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> PRIVACIDAD TOTAL</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-12">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-inner">
              <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mb-10 flex items-center gap-3">
                <Activity className="h-4 w-4" /> Protocolo de Custodia de Documentos
              </h4>
              <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-6">
                {["Digitalización de instrumentos legales con clasificación automática.",
                  "Alertas automáticas para evitar el vencimiento de poderes legales.",
                  "Cifrado de archivos para máxima protección de información sensible.",
                  "Sincronización con el registro de socios y el grupo empresarial."
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <span className="font-black text-xs text-slate-500">[{i+1}]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-slate-500/5 border border-slate-500/20 p-10 rounded-[3rem] flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Documentos en Archivo</p>
                <p className="text-2xl font-black text-white italic tracking-tighter uppercase">{documentos.length} REGISTROS</p>
              </div>
              <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-[9px] font-black px-6 py-2 rounded-xl uppercase">
                {documentos.length > 0 ? "Activo" : "Vacío"}
              </Badge>
            </Card>
          </div>
        </div>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[10px] font-black uppercase tracking-[0.4em]">
              Registrar Nuevo Documento Legal
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Tipo de Documento *</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger className="h-11 rounded-xl text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS.map(t => <SelectItem key={t} value={t}>{tipoLabel[t]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Estado *</Label>
                <Select value={form.estado} onValueChange={v => setForm(f => ({ ...f, estado: v }))}>
                  <SelectTrigger className="h-11 rounded-xl text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS.map(e => <SelectItem key={e} value={e}>{estadoLabel[e]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-widest">Título del Documento *</Label>
              <Input placeholder="Ej: Contrato de Arrendamiento Comercial — Local #5" className="h-11 rounded-xl text-xs"
                value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-widest">Descripción / Partes Involucradas</Label>
              <Textarea placeholder="Describe brevemente el objeto del documento y las partes..." className="rounded-xl text-xs min-h-[80px]"
                value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Fecha del Documento</Label>
                <Input type="date" className="h-11 rounded-xl text-xs"
                  value={form.fecha_documento} onChange={e => setForm(f => ({ ...f, fecha_documento: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Fecha de Vencimiento</Label>
                <Input type="date" className="h-11 rounded-xl text-xs"
                  value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Notaría / Registro</Label>
                <Input placeholder="Notaría Pública de Chacao" className="h-11 rounded-xl text-xs"
                  value={form.notaria} onChange={e => setForm(f => ({ ...f, notaria: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest">Registro Público</Label>
                <Input placeholder="Registro Mercantil I Caracas" className="h-11 rounded-xl text-xs"
                  value={form.registro_publico} onChange={e => setForm(f => ({ ...f, registro_publico: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black uppercase tracking-widest">Notas Internas</Label>
              <Textarea placeholder="Observaciones, instrucciones de seguimiento, etc." className="rounded-xl text-xs"
                value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl text-xs">Cancelar</Button>
            <Button onClick={handleSave} disabled={saving} className="rounded-xl font-black text-[9px] uppercase tracking-widest">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {saving ? "GUARDANDO..." : "REGISTRAR DOCUMENTO"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
