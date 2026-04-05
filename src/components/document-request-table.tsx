"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import {
  Eye, FileDown, Plus, Send, CircleCheck, Clock, XCircle, Archive,
  ChevronRight, MapPin, Calendar, Hash, BookOpen, User, FileText,
  Sparkles, ShieldCheck, QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type Solicitud = {
    id: string;
    fecha: string;
    nombres: string;
    estado: "Aprobado" | "En Proceso" | "Rechazado" | "Archivado" | "Activo";
    motivoRechazo?: string;
    tipo: string;
    detalles: {
      acta: string;
      folio: string;
      tomo: string;
      registro: string;
      ano: number;
      tribunal?: string;
      sala?: string;
      juez?: string;
    }
};

type DocumentRequestTableProps = {
    solicitudes: Solicitud[];
    getDocumentContent: (solicitud: Solicitud) => string;
    docTypeForDownload: string;
    docTypeLabel?: string;
};

const statusConfig: Record<string, { icon: typeof CircleCheck; color: string; bg: string; border: string; label: string }> = {
  Aprobado: { icon: CircleCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", label: "Aprobado" },
  "En Proceso": { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "En Proceso" },
  Rechazado: { icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", label: "Rechazado" },
  Archivado: { icon: Archive, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20", label: "Archivado" },
  Activo: { icon: Sparkles, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Activo" },
};

const ESTADOS_VE = [
    'Amazonas','Anzoátegui','Apure','Aragua','Barinas','Bolívar','Carabobo',
    'Cojedes','Delta Amacuro','Distrito Capital','Falcón','Guárico','Lara',
    'Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa','Sucre',
    'Táchira','Trujillo','La Guaira','Yaracuy','Zulia',
];

function StatusBadge({ estado }: { estado: string }) {
  const config = statusConfig[estado] || statusConfig.Activo;
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border", config.bg, config.color, config.border)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  if (!value || value === 'N/A' || value === 'Pendiente') return null;
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/20">
      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-3.5 w-3.5 text-primary/60" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">{label}</p>
        <p className="text-sm font-semibold text-foreground/80 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function SolicitudCard({ solicitud, onDownload }: { solicitud: Solicitud; onDownload: (s: Solicitud) => void }) {
  const config = statusConfig[solicitud.estado] || statusConfig.Activo;
  const canDownload = solicitud.estado === "Aprobado" || solicitud.estado === "Archivado";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl border border-border/30 bg-card hover:border-border/50 transition-all duration-300 overflow-hidden hover:shadow-lg"
    >
      <div className={cn("absolute top-0 left-0 right-0 h-[2px]",
        solicitud.estado === 'Aprobado' && "bg-gradient-to-r from-emerald-500/60 via-emerald-500/30 to-transparent",
        solicitud.estado === 'En Proceso' && "bg-gradient-to-r from-amber-500/60 via-amber-500/30 to-transparent",
        solicitud.estado === 'Rechazado' && "bg-gradient-to-r from-rose-500/60 via-rose-500/30 to-transparent",
        (!['Aprobado', 'En Proceso', 'Rechazado'].includes(solicitud.estado)) && "bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
      )} />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 tabular-nums">{solicitud.id}</span>
            </div>
            <h3 className="text-base font-bold text-foreground/90 truncate">{solicitud.nombres}</h3>
          </div>
          <StatusBadge estado={solicitud.estado} />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground/60 font-medium mb-5">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {solicitud.fecha}</span>
          {solicitud.detalles.registro !== 'N/A' && (
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {solicitud.detalles.registro}</span>
          )}
          {solicitud.detalles.ano > 0 && (
            <span className="inline-flex items-center gap-1.5"><Hash className="h-3 w-3" /> {solicitud.detalles.ano}</span>
          )}
        </div>

        {solicitud.estado === 'Rechazado' && solicitud.motivoRechazo && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 mb-4">
            <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-[12px] text-rose-500/80 font-medium">{solicitud.motivoRechazo}</p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-3 border-t border-border/20">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary gap-1.5 flex-1">
                <Eye className="h-3.5 w-3.5" /> Ver Detalles
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-2xl border-border/30">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-base font-bold">{solicitud.id}</DialogTitle>
                    <DialogDescription className="text-[11px] font-semibold">{solicitud.nombres}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-4 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/20">
                  <StatusBadge estado={solicitud.estado} />
                  <span className="text-[11px] text-muted-foreground font-medium ml-auto">Solicitado el {solicitud.fecha}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <DetailItem icon={Hash} label="Nro. Acta" value={solicitud.detalles.acta} />
                  <DetailItem icon={BookOpen} label="Folio" value={solicitud.detalles.folio} />
                  <DetailItem icon={FileText} label="Tomo" value={solicitud.detalles.tomo} />
                  <DetailItem icon={Calendar} label="Año" value={solicitud.detalles.ano?.toString()} />
                  <div className="col-span-2">
                    <DetailItem icon={MapPin} label="Registro Civil" value={solicitud.detalles.registro} />
                  </div>
                  {solicitud.detalles.tribunal && (
                    <div className="col-span-2">
                      <DetailItem icon={ShieldCheck} label="Tribunal" value={solicitud.detalles.tribunal} />
                    </div>
                  )}
                  {solicitud.detalles.juez && (
                    <DetailItem icon={User} label="Juez" value={solicitud.detalles.juez} />
                  )}
                </div>

                <div className="flex justify-center pt-3">
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/20">
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=doc-${solicitud.tipo}-${solicitud.id}`} alt={`QR ${solicitud.id}`} width={80} height={80} className="rounded-lg" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30 text-center mt-2">Verificación QR</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl text-[10px] font-bold uppercase tracking-widest">Cerrar</Button>
                </DialogClose>
                {canDownload && (
                  <Button onClick={() => onDownload(solicitud)} className="rounded-xl text-[10px] font-bold uppercase tracking-widest gap-1.5 bg-primary">
                    <FileDown className="h-3.5 w-3.5" /> Descargar PDF
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {canDownload && (
            <Button variant="ghost" size="sm" onClick={() => onDownload(solicitud)}
              className="h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-500 hover:bg-emerald-500/5 gap-1.5 flex-1">
              <FileDown className="h-3.5 w-3.5" /> Descargar
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function DocumentRequestTable({ solicitudes: initialSolicitudes, getDocumentContent, docTypeForDownload, docTypeLabel }: DocumentRequestTableProps) {
    const { toast } = useToast();
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);

    useEffect(() => {
        setSolicitudes(initialSolicitudes);
    }, [initialSolicitudes]);
    const [showNewForm, setShowNewForm] = useState(false);
    const [formData, setFormData] = useState({
        nombres: '',
        cedula: '',
        estado: '',
        municipio: '',
        registro: '',
        motivo: '',
    });

    const handleDownload = (solicitud: Solicitud) => {
        const content = getDocumentContent(solicitud);
        const header = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Documento</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(sourceHTML);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { 
                printWindow.print();
                printWindow.close();
            }, 500);
            toast({
                title: "Preparando Descarga",
                description: "Se ha abierto el diálogo de impresión. Selecciona 'Guardar como PDF' para descargar."
            });
        } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo abrir la ventana de impresión. Revisa la configuración de tu navegador."
            });
        }
    };

    const [submitting, setSubmitting] = useState(false);

    const handleNewRequest = async () => {
        if (!formData.nombres || !formData.cedula || !formData.estado) {
            toast({ variant: "destructive", title: "Campos requeridos", description: "Completa nombre, cédula y estado." });
            return;
        }
        setSubmitting(true);
        try {
            const tipoDoc = docTypeForDownload.toLowerCase().includes('judicial') ? 'otro'
                : docTypeForDownload.toLowerCase().includes('matrimonio') ? 'partida_matrimonio'
                : 'otro';
            const res = await fetch('/api/solicitudes-civiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: tipoDoc,
                    nombres: formData.nombres,
                    cedula: formData.cedula,
                    estado_ve: formData.estado,
                    municipio: formData.municipio,
                    registro: formData.registro || `Registro Civil ${formData.municipio}, ${formData.estado}`,
                    motivo: formData.motivo,
                }),
            });
            if (!res.ok) throw new Error('Error del servidor');
            const data = await res.json();
            const solicitudId = data.id ?? (data.solicitud as Record<string, unknown>)?.id;
            const newSolicitud: Solicitud = {
                id: `#${solicitudId}`,
                fecha: new Date().toLocaleDateString('es-VE'),
                nombres: formData.nombres,
                estado: "En Proceso",
                tipo: docTypeForDownload.toLowerCase().replace(/_/g, '-'),
                detalles: {
                    acta: "Pendiente",
                    folio: "Pendiente",
                    tomo: "Pendiente",
                    registro: formData.registro || `Registro Civil ${formData.municipio}, ${formData.estado}`,
                    ano: new Date().getFullYear(),
                }
            };
            setSolicitudes(prev => [newSolicitud, ...prev]);
            setShowNewForm(false);
            setFormData({ nombres: '', cedula: '', estado: '', municipio: '', registro: '', motivo: '' });
            toast({ title: "Solicitud Enviada", description: `Tu solicitud ha sido registrada exitosamente.` });
        } catch {
            toast({ variant: "destructive", title: "Error", description: "No se pudo registrar la solicitud." });
        } finally {
            setSubmitting(false);
        }
    };

    const label = docTypeLabel || docTypeForDownload.replace(/_/g, ' ');
    const approved = solicitudes.filter(s => s.estado === 'Aprobado').length;
    const pending = solicitudes.filter(s => s.estado === 'En Proceso').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/20 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <FileText className="h-3 w-3" /> {solicitudes.length} Total
                    </span>
                    {approved > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                        <CircleCheck className="h-3 w-3" /> {approved} Aprobadas
                      </span>
                    )}
                    {pending > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/5 border border-amber-500/15 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                        <Clock className="h-3 w-3" /> {pending} Pendientes
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setShowNewForm(!showNewForm)}
                  className={cn(
                    "h-10 rounded-xl text-[10px] font-semibold uppercase tracking-widest gap-2 transition-all",
                    showNewForm ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
                  )}
                >
                  <Plus className={cn("h-3.5 w-3.5 transition-transform", showNewForm && "rotate-45")} />
                  {showNewForm ? 'Cancelar' : 'Nueva Solicitud'}
                </Button>
            </div>

            <AnimatePresence>
              {showNewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.03] to-transparent space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Nueva Solicitud de {label}</h3>
                        <p className="text-[11px] text-muted-foreground">Completa los datos para iniciar tu trámite</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Nombre(s) completo(s) *</Label>
                            <Input placeholder="Ej: Juan Alberto Pérez" value={formData.nombres} onChange={e => setFormData(p => ({ ...p, nombres: e.target.value }))} className="h-11 rounded-xl text-sm border-border/30 bg-background focus-visible:ring-primary/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Cédula de Identidad *</Label>
                            <Input placeholder="V-12345678" value={formData.cedula} onChange={e => setFormData(p => ({ ...p, cedula: e.target.value }))} className="h-11 rounded-xl text-sm border-border/30 bg-background focus-visible:ring-primary/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Estado *</Label>
                            <Select value={formData.estado} onValueChange={v => setFormData(p => ({ ...p, estado: v }))}>
                                <SelectTrigger className="h-11 rounded-xl text-sm border-border/30"><SelectValue placeholder="Seleccionar estado..." /></SelectTrigger>
                                <SelectContent>
                                    {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Municipio</Label>
                            <Input placeholder="Ej: Libertador" value={formData.municipio} onChange={e => setFormData(p => ({ ...p, municipio: e.target.value }))} className="h-11 rounded-xl text-sm border-border/30 bg-background focus-visible:ring-primary/30" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Registro Civil / Oficina</Label>
                            <Input placeholder="Ej: Registro Civil Parroquia El Valle" value={formData.registro} onChange={e => setFormData(p => ({ ...p, registro: e.target.value }))} className="h-11 rounded-xl text-sm border-border/30 bg-background focus-visible:ring-primary/30" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Motivo de la solicitud</Label>
                            <Input placeholder="Ej: Copia certificada para trámite legal" value={formData.motivo} onChange={e => setFormData(p => ({ ...p, motivo: e.target.value }))} className="h-11 rounded-xl text-sm border-border/30 bg-background focus-visible:ring-primary/30" />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="outline" className="h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest border-border/30" onClick={() => setShowNewForm(false)}>Cancelar</Button>
                        <Button className="h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 bg-primary shadow-lg" onClick={handleNewRequest} disabled={submitting}>
                          <Send className="h-3.5 w-3.5" /> {submitting ? "Enviando..." : "Enviar Solicitud"}
                        </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {solicitudes.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {solicitudes.map((solicitud, i) => (
                  <SolicitudCard key={solicitud.id} solicitud={solicitud} onDownload={handleDownload} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-border/30 bg-muted/10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/30 border border-border/20 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-muted-foreground/30" />
                </div>
                <h3 className="text-sm font-bold text-foreground/60 mb-1">Sin solicitudes</h3>
                <p className="text-[12px] text-muted-foreground/50 max-w-xs mx-auto">
                  No tienes solicitudes registradas aún. Haz clic en "Nueva Solicitud" para crear tu primera.
                </p>
              </div>
            )}
        </div>
    );
}
