
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { File, Download, Eye, Search, Lock, Upload, Loader2, Trash2, Plus, FileText, Image, FileSpreadsheet , ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

import { Link } from '@/navigation';
const categorias = [
  "Cédula de Identidad",
  "RIF Personal",
  "Pasaporte",
  "Licencia de Conducir",
  "Título Universitario",
  "Certificado Laboral",
  "Constancia de Residencia",
  "Partida de Nacimiento",
  "Acta de Matrimonio",
  "Otro",
];

const iconByType: Record<string, typeof FileText> = {
  PDF: FileText,
  JPG: Image,
  JPEG: Image,
  PNG: Image,
  XLSX: FileSpreadsheet,
  XLS: FileSpreadsheet,
  DOC: FileText,
  DOCX: FileText,
};

type Documento = {
  id: number;
  categoria: string;
  nombre: string;
  tipo_archivo: string;
  tamano_kb: number | null;
  url_storage: string | null;
  fecha_emision: string | null;
  fecha_vencimiento: string | null;
  organismo: string | null;
  descripcion: string | null;
  created_at: string;
};

export default function MisDocumentosPage() {
  const { toast } = useToast();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    tipo_archivo: "PDF",
    tamano_kb: "",
    organismo: "",
    descripcion: "",
    fecha_emision: "",
    fecha_vencimiento: "",
  });

  const fetchDocumentos = useCallback(async () => {
    try {
      const res = await fetch("/api/documentos-personales");
      if (res.ok) {
        const data = await res.json();
        setDocumentos(data.documentos ?? []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDocumentos(); }, [fetchDocumentos]);

  const handleUpload = async () => {
    if (!form.nombre || !form.categoria) {
      toast({ variant: "destructive", title: "Campos requeridos", description: "Nombre y categoría son obligatorios." });
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/documentos-personales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tamano_kb: form.tamano_kb ? parseInt(form.tamano_kb) : null,
        }),
      });
      if (res.ok) {
        toast({ title: "DOCUMENTO REGISTRADO", description: `${form.nombre} agregado a la bóveda digital.` });
        setForm({ nombre: "", categoria: "", tipo_archivo: "PDF", tamano_kb: "", organismo: "", descripcion: "", fecha_emision: "", fecha_vencimiento: "" });
        setDialogOpen(false);
        fetchDocumentos();
      } else {
        const err = await res.json();
        toast({ variant: "destructive", title: "Error", description: err.error ?? "No se pudo registrar el documento." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión", description: "Verifica tu conexión e intenta de nuevo." });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    try {
      const res = await fetch(`/api/documentos-personales?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "DOCUMENTO ELIMINADO", description: `${nombre} removido de la bóveda.` });
        fetchDocumentos();
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar." });
    }
  };

  const filtered = documentos.filter(d =>
    d.nombre.toLowerCase().includes(search.toLowerCase()) ||
    d.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (kb: number | null) => {
    if (!kb) return "—";
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
  };

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-12">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"><ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard</Link>
      <header className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-blue-500/[0.04] via-card to-card p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Lock className="h-7 w-7 text-blue-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Bóveda Digital</h1>
            <p className="text-sm text-muted-foreground font-medium">Almacenamiento seguro de documentos personales</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 shrink-0">
              <Plus className="h-3.5 w-3.5" /> Adjuntar Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border rounded-2xl max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-black uppercase tracking-tight">Registrar Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Nombre del Documento *</Label>
                <Input placeholder="Ej: Cédula V-18745632" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Categoría *</Label>
                <Select value={form.categoria} onValueChange={v => setForm(f => ({ ...f, categoria: v }))}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                  <SelectContent>
                    {categorias.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Tipo de Archivo</Label>
                  <Select value={form.tipo_archivo} onValueChange={v => setForm(f => ({ ...f, tipo_archivo: v }))}>
                    <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["PDF", "JPG", "PNG", "DOCX", "XLSX"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Tamaño (KB)</Label>
                  <Input type="number" placeholder="Ej: 1200" value={form.tamano_kb} onChange={e => setForm(f => ({ ...f, tamano_kb: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Fecha Emisión</Label>
                  <Input type="date" value={form.fecha_emision} onChange={e => setForm(f => ({ ...f, fecha_emision: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Fecha Vencimiento</Label>
                  <Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(f => ({ ...f, fecha_vencimiento: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Organismo Emisor</Label>
                <Input placeholder="Ej: SAIME, SENIAT, Universidad" value={form.organismo} onChange={e => setForm(f => ({ ...f, organismo: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Descripción</Label>
                <Input placeholder="Nota opcional..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline" className="rounded-xl">Cancelar</Button></DialogClose>
              <Button onClick={handleUpload} disabled={uploading} className="rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 h-4 w-4" />
        <Input placeholder="Buscar documentos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-11 rounded-xl border-border/30 bg-background text-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/20 border border-border/20 flex items-center justify-center mb-4">
            <Lock className="h-7 w-7 text-muted-foreground/30" />
          </div>
          <p className="text-sm text-muted-foreground/50 font-medium">
            {documentos.length === 0 ? "Bóveda vacía — adjunta tu primer documento" : "Sin resultados para esta búsqueda"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(doc => {
            const Icon = iconByType[doc.tipo_archivo?.toUpperCase()] ?? File;
            return (
              <Card key={doc.id} className="rounded-2xl border border-border/30 bg-card hover:border-border/50 hover:shadow-lg transition-all group overflow-hidden">
                <CardHeader className="flex-row items-center gap-4 p-5 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold text-foreground/90 truncate">{doc.nombre}</CardTitle>
                    <CardDescription className="text-[10px] text-muted-foreground/50 font-medium">
                      {formatDate(doc.created_at)} · {formatSize(doc.tamano_kb)} · {doc.tipo_archivo}
                    </CardDescription>
                    {doc.categoria && (
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded-lg border border-primary/10">{doc.categoria}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  {doc.organismo && (
                    <p className="text-[11px] text-muted-foreground/50 font-medium mb-2">Emisor: {doc.organismo}</p>
                  )}
                  {doc.fecha_vencimiento && (
                    <p className="text-[11px] text-amber-500/70 font-medium mb-2">Vence: {formatDate(doc.fecha_vencimiento)}</p>
                  )}
                  <div className="flex gap-2 pt-2 border-t border-border/20">
                    <Button variant="ghost" size="sm"
                      className="flex-1 h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary gap-1.5"
                      onClick={() => toast({ title: "Vista previa", description: `Abriendo ${doc.nombre}` })}>
                      <Eye className="h-3 w-3" /> Ver
                    </Button>
                    <Button variant="ghost" size="sm"
                      className="flex-1 h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary gap-1.5"
                      onClick={() => toast({ title: "Descarga iniciada", description: `${doc.nombre}.${doc.tipo_archivo?.toLowerCase() ?? "pdf"}` })}>
                      <Download className="h-3 w-3" /> Bajar
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground/40 hover:text-rose-500 hover:bg-rose-500/5"
                      onClick={() => handleDelete(doc.id, doc.nombre)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
