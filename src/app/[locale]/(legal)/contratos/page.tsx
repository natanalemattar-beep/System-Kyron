"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { FileSignature, Search, Download, Plus, Eye, Clock, CheckCircle, AlertCircle, Loader2, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/navigation";
import { formatDate } from "@/lib/utils";

const estadoColor: Record<string, string> = {
  vigente: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  vencido: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  en_revision: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  borrador: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const estadoIcon: Record<string, typeof CheckCircle> = {
  vigente: CheckCircle,
  vencido: AlertCircle,
  en_revision: Clock,
  borrador: Clock,
};

const estadoLabel: Record<string, string> = {
  vigente: "Vigente",
  vencido: "Vencido",
  en_revision: "En Revisión",
  borrador: "Borrador",
};

type DocJuridico = {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string | null;
  partes: string[] | null;
  fecha_documento: string | null;
  fecha_vencimiento: string | null;
  estado: string;
  archivo_url: string | null;
  notaria: string | null;
  registro_publico: string | null;
  notas: string | null;
  created_at: string;
};

type Stats = {
  contratos_activos: number;
  poderes_vigentes: number;
  por_vencer: number;
  vencidos: number;
};

export default function ContratosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [documentos, setDocumentos] = useState<DocJuridico[]>([]);
  const [stats, setStats] = useState<Stats>({ contratos_activos: 0, poderes_vigentes: 0, por_vencer: 0, vencidos: 0 });
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    tipo: "contrato",
    titulo: "",
    descripcion: "",
    partes: "",
    fecha_documento: "",
    fecha_vencimiento: "",
    notaria: "",
    registro_publico: "",
    notas: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/documentos-juridicos");
      if (res.ok) {
        const data = await res.json();
        setDocumentos(data.documentos ?? []);
        setStats(data.stats ?? { contratos_activos: 0, poderes_vigentes: 0, por_vencer: 0, vencidos: 0 });
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async () => {
    if (!form.titulo || !form.tipo) {
      toast({ variant: "destructive", title: "Campos requeridos", description: "Tipo y título son obligatorios." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/documentos-juridicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          partes: form.partes ? form.partes.split(",").map(p => p.trim()).filter(Boolean) : null,
        }),
      });
      if (res.ok) {
        toast({ title: "DOCUMENTO JURÍDICO REGISTRADO", description: `${form.titulo} agregado al archivo.` });
        setForm({ tipo: "contrato", titulo: "", descripcion: "", partes: "", fecha_documento: "", fecha_vencimiento: "", notaria: "", registro_publico: "", notas: "" });
        setDialogOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        toast({ variant: "destructive", title: "Error", description: err.error ?? "No se pudo registrar." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión", description: "Verifica tu conexión." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, titulo: string) => {
    try {
      const res = await fetch(`/api/documentos-juridicos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "DOCUMENTO ELIMINADO", description: `${titulo} removido del archivo.` });
        fetchData();
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar." });
    }
  };

  const filtered = documentos.filter(c =>
    c.titulo.toLowerCase().includes(search.toLowerCase()) ||
    (c.tipo ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (c.notaria ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <FileSignature className="h-3 w-3" /> ARCHIVO JURÍDICO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Archivo de <span className="text-primary italic">Contratos</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
            Gestión Documental • Escritorio Jurídico 2026
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="h-12 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest">
            <Link href="/generador-documentos"><FileSignature className="mr-2 h-4 w-4" /> GENERAR CON IA</Link>
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest">
                <Plus className="mr-2 h-4 w-4" /> NUEVO CONTRATO
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg font-black uppercase tracking-tight">Registrar Documento Jurídico</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Tipo *</Label>
                  <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["contrato", "poder", "acta", "nda", "convenio", "estatuto"].map(t => (
                        <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Título *</Label>
                  <Input placeholder="Ej: Contrato de Arrendamiento Local C-1" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Partes Involucradas (separadas por coma)</Label>
                  <Input placeholder="TechSolutions C.A., Juan Pérez" value={form.partes} onChange={e => setForm(f => ({ ...f, partes: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Fecha Documento</Label>
                    <Input type="date" value={form.fecha_documento} onChange={e => setForm(f => ({ ...f, fecha_documento: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Fecha Vencimiento</Label>
                    <Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Notaría</Label>
                  <Input placeholder="Ej: Notaría Pública 3ra Caracas" value={form.notaria} onChange={e => setForm(f => ({ ...f, notaria: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Descripción / Notas</Label>
                  <Textarea placeholder="Cláusulas relevantes, montos, condiciones..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} className="rounded-xl bg-muted/30 border-border min-h-[80px]" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" className="rounded-xl">Cancelar</Button></DialogClose>
                <Button onClick={handleCreate} disabled={saving} className="btn-3d-primary rounded-xl font-black uppercase text-[9px] tracking-widest">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  REGISTRAR
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Documentos", value: documentos.length, color: "text-primary" },
          { label: "Contratos Activos", value: stats.contratos_activos, color: "text-emerald-400" },
          { label: "Por Vencer (30d)", value: stats.por_vencer, color: "text-amber-400" },
          { label: "Vencidos", value: stats.vencidos, color: "text-rose-400" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="glass-card border-none bg-card/40 p-5 rounded-2xl text-center">
              <p className={`text-3xl font-black italic ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
        <Input
          placeholder="Buscar por título, tipo o notaría..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-11 h-12 rounded-xl bg-card/50 border-border/40 text-sm"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((contrato, i) => {
            const Icon = estadoIcon[contrato.estado] ?? CheckCircle;
            return (
              <motion.div
                key={contrato.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden hover:bg-card/60 transition-all group">
                  <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 mt-0.5 shrink-0">
                        <FileSignature className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-tight text-foreground/90">{contrato.titulo}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          {contrato.tipo?.toUpperCase()} • {formatDate(contrato.fecha_documento ?? contrato.created_at)}
                          {contrato.notaria && ` • ${contrato.notaria}`}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          <Badge className={`text-[8px] font-black uppercase tracking-widest border h-6 ${estadoColor[contrato.estado] ?? "bg-muted/20 text-muted-foreground"}`}>
                            <Icon className="mr-1 h-2.5 w-2.5" /> {estadoLabel[contrato.estado] ?? contrato.estado}
                          </Badge>
                          {contrato.fecha_vencimiento && (
                            <span className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest">
                              Vence: {formatDate(contrato.fecha_vencimiento)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest"
                        onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'legal', subcategoria: 'descarga_iniciada', descripcion: "DESCARGA INICIADA" }) }); if (res.ok) toast({ title: "DESCARGA INICIADA", description: `${contrato.titulo} — PDF generado.` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}
                      >
                        <Download className="mr-1.5 h-3 w-3" /> PDF
                      </Button>
                      <Button
                        size="sm"
                        className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest btn-3d-primary"
                        onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'legal', subcategoria: 'vista_previa', descripcion: "VISTA PREVIA" }) }); if (res.ok) toast({ title: "VISTA PREVIA", description: `Abriendo ${contrato.titulo}` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}
                      >
                        <Eye className="mr-1.5 h-3 w-3" /> VER
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-xl border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                        onClick={() => handleDelete(contrato.id, contrato.titulo)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <FileSignature className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">
                {documentos.length === 0 ? "Sin documentos jurídicos — registre su primer contrato" : "No se encontraron contratos"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
