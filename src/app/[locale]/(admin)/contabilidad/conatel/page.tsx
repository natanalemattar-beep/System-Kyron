"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Signal, Plus, Clock, CheckCircle, AlertTriangle, RefreshCw, Shield, Wifi, Radio, Loader2, Inbox, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

type PermisoConatel = {
  id: number;
  tipo: string;
  nombre: string;
  numero: string;
  estado: string;
  fechaEmision: string;
  fechaVencimiento: string;
  descripcion: string;
};

const estadoStyle: Record<string, string> = {
  vigente: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  en_tramite: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  en_renovacion: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  vencido: "bg-red-500/10 text-red-600 border-red-500/20",
};

const estadoLabels: Record<string, string> = {
  vigente: "Vigente",
  en_tramite: "En Trámite",
  en_renovacion: "En Renovación",
  vencido: "Vencido",
};

const tiposPermiso = [
  { value: "habilitacion_isp", label: "Habilitación ISP", desc: "Permiso para operar como proveedor de servicios de internet.", plazo: "60-90 días hábiles", icon: Wifi },
  { value: "licencia_radiodifusion", label: "Licencia de Radiodifusión", desc: "Autorización para operar estación de radio FM/AM.", plazo: "90-120 días hábiles", icon: Radio },
  { value: "permiso_voip", label: "Permiso VoIP", desc: "Habilitación para servicios de voz sobre IP corporativo.", plazo: "30-45 días hábiles", icon: Signal },
  { value: "espectro_rf", label: "Espectro Radioeléctrico", desc: "Asignación de frecuencias radioeléctricas.", plazo: "90-120 días hábiles", icon: Radio },
  { value: "red_privada", label: "Red Privada Corporativa", desc: "Permiso para operar red privada de telecomunicaciones.", plazo: "20-30 días hábiles", icon: Shield },
  { value: "renovacion", label: "Renovación de Licencia", desc: "Renovación de cualquier habilitación CONATEL vigente.", plazo: "30-45 días hábiles", icon: RefreshCw },
];

export default function ConatelPage() {
  const { toast } = useToast();
  const [permisos, setPermisos] = useState<PermisoConatel[]>([]);
  const [loading, setLoading] = useState(true);
  const [solicitudOpen, setSolicitudOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "",
    nombre: "",
    numero: "",
    fechaEmision: "",
    fechaVencimiento: "",
    estado: "en_tramite",
    descripcion: "",
  });

  const fetchPermisos = useCallback(async () => {
    try {
      const res = await fetch("/api/permisos-legales?organismo=CONATEL");
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      if (data.permisos) {
        setPermisos(data.permisos.map((p: any) => ({
          id: p.id,
          tipo: p.tipo || "permiso",
          nombre: p.nombre_permiso || "",
          numero: p.numero_permiso || "",
          estado: p.estado || "en_tramite",
          fechaEmision: p.fecha_emision ? new Date(p.fecha_emision).toLocaleDateString("es-VE") : "—",
          fechaVencimiento: p.fecha_vencimiento ? new Date(p.fecha_vencimiento).toLocaleDateString("es-VE") : "Permanente",
          descripcion: p.descripcion || "",
        })));
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchPermisos(); }, [fetchPermisos]);

  const resetForm = () => setFormData({ tipo: "", nombre: "", numero: "", fechaEmision: "", fechaVencimiento: "", estado: "en_tramite", descripcion: "" });

  const handleSolicitar = async () => {
    if (!formData.nombre.trim()) {
      toast({ title: "Campo requerido", description: "Ingrese el nombre del permiso.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/permisos-legales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: formData.tipo || "permiso",
          nombre_permiso: formData.nombre.trim(),
          numero_permiso: formData.numero || null,
          organismo: "CONATEL",
          fecha_emision: formData.fechaEmision || null,
          fecha_vencimiento: formData.fechaVencimiento || null,
          estado: formData.estado,
          descripcion: formData.descripcion.trim() || null,
          responsable: null,
          costo_tramite: "0",
          moneda_costo: "USD",
          alertar_dias_antes: "30",
          notas: null,
        }),
      });
      if (!res.ok) {
        toast({ title: "ERROR", description: "No se pudo registrar. Intente nuevamente.", variant: "destructive" });
        setSaving(false);
        return;
      }
      setSolicitudOpen(false);
      resetForm();
      await fetchPermisos();
      toast({ title: "REGISTRADO", description: `Permiso CONATEL "${formData.nombre.trim()}" guardado exitosamente.` });
    } catch {
      toast({ title: "ERROR DE CONEXIÓN", description: "No se pudo conectar con el servidor.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const vigentes = permisos.filter(p => p.estado === "vigente").length;
  const enTramite = permisos.filter(p => p.estado === "en_tramite" || p.estado === "en_renovacion").length;

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <Signal className="h-8 w-8 text-primary" />
            Permisos CONATEL
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Comisión Nacional de Telecomunicaciones — Habilitaciones y Licencias.
          </p>
        </div>
        <Button className="rounded-xl" onClick={() => setSolicitudOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Registrar Permiso
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Permisos Vigentes", value: vigentes, color: "text-emerald-600" },
          { label: "En Trámite / Renovación", value: enTramite, color: "text-amber-600" },
          { label: "Total Registros", value: permisos.length, color: "text-primary" },
        ].map((s, i) => (
          <Card key={i} className="border rounded-2xl shadow-sm p-5 text-center">
            <p className={cn("text-3xl font-black", s.color)}>{s.value}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
          Mis Permisos CONATEL
        </h3>

        {loading ? (
          <Card className="border rounded-2xl shadow-sm p-12 text-center">
            <Loader2 className="h-6 w-6 text-primary/30 animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold uppercase text-muted-foreground">Cargando permisos...</p>
          </Card>
        ) : permisos.length === 0 ? (
          <Card className="border rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <Inbox className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Sin Permisos Registrados</p>
              <p className="text-xs text-muted-foreground/70 max-w-md mb-6">
                No tiene permisos CONATEL registrados en el sistema. Registre sus habilitaciones, licencias de radiodifusión u otros permisos de telecomunicaciones.
              </p>
              <Button onClick={() => setSolicitudOpen(true)} className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Registrar Primer Permiso
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {permisos.map((p) => (
              <Card key={p.id} className="border rounded-2xl shadow-sm hover:bg-muted/30 transition-colors">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      <Signal className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={cn("text-[8px] font-black uppercase tracking-widest border h-6", estadoStyle[p.estado] ?? estadoStyle.en_tramite)}>
                          {p.estado === "vigente" ? <CheckCircle className="mr-1 h-2.5 w-2.5" /> : p.estado === "vencido" ? <AlertTriangle className="mr-1 h-2.5 w-2.5" /> : <Clock className="mr-1 h-2.5 w-2.5" />}
                          {estadoLabels[p.estado] || p.estado}
                        </Badge>
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6">CONATEL</Badge>
                      </div>
                      <p className="text-sm font-black uppercase tracking-tight">{p.nombre}</p>
                      {p.numero && <p className="text-[10px] text-muted-foreground/50 font-mono">N° {p.numero}</p>}
                      {p.descripcion && <p className="text-[10px] text-muted-foreground/60 font-medium">{p.descripcion}</p>}
                      <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                        Emisión: {p.fechaEmision} · Vence: {p.fechaVencimiento}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
          Guía de Trámites CONATEL
        </h3>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 flex items-start gap-4 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-700">Referencia Informativa</p>
            <p className="text-xs text-blue-800/70 mt-0.5">
              Tipos de habilitaciones y permisos que otorga CONATEL. Use el botón "Registrar Permiso" para agregar los suyos.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiposPermiso.map((t, i) => (
            <Card key={i} className="border rounded-2xl shadow-sm hover:bg-muted/30 transition-colors cursor-pointer group" onClick={() => {
              setFormData(prev => ({ ...prev, tipo: t.value, nombre: t.label }));
              setSolicitudOpen(true);
            }}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-105 transition-transform">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase tracking-tight">{t.label}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">{t.desc}</p>
                  <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest mt-1">Plazo estimado: {t.plazo}</p>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-colors shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={solicitudOpen} onOpenChange={setSolicitudOpen}>
        <DialogContent className="max-w-lg rounded-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase text-foreground flex items-center gap-3">
              <Signal className="h-5 w-5 text-primary" />
              Registrar Permiso CONATEL
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Agregue un permiso o habilitación de telecomunicaciones
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto flex-1 min-h-0 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Tipo de Permiso</label>
              <Select value={formData.tipo} onValueChange={v => {
                const tipo = tiposPermiso.find(t => t.value === v);
                setFormData(p => ({ ...p, tipo: v, nombre: tipo?.label || p.nombre }));
              }}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Seleccionar tipo..." /></SelectTrigger>
                <SelectContent>
                  {tiposPermiso.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Nombre del Permiso *</label>
              <Input className="h-11 rounded-xl" placeholder="Ej: Habilitación ISP Banda Ancha" value={formData.nombre} onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">N° Expediente</label>
                <Input className="h-11 rounded-xl" placeholder="LIC-CONATEL-..." value={formData.numero} onChange={e => setFormData(p => ({ ...p, numero: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Estado</label>
                <Select value={formData.estado} onValueChange={v => setFormData(p => ({ ...p, estado: v }))}>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vigente">Vigente</SelectItem>
                    <SelectItem value="en_tramite">En Trámite</SelectItem>
                    <SelectItem value="en_renovacion">En Renovación</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Fecha de Emisión</label>
                <Input type="date" className="h-11 rounded-xl" value={formData.fechaEmision} onChange={e => setFormData(p => ({ ...p, fechaEmision: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Fecha de Vencimiento</label>
                <Input type="date" className="h-11 rounded-xl" value={formData.fechaVencimiento} onChange={e => setFormData(p => ({ ...p, fechaVencimiento: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Descripción / Notas</label>
              <textarea
                className="w-full min-h-[70px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Detalles adicionales del permiso..."
                value={formData.descripcion}
                onChange={e => setFormData(p => ({ ...p, descripcion: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button type="button" variant="outline" onClick={() => { setSolicitudOpen(false); resetForm(); }} className="rounded-xl">
              Cancelar
            </Button>
            <Button type="button" onClick={handleSolicitar} disabled={saving} className="rounded-xl">
              {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              {saving ? "Guardando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
