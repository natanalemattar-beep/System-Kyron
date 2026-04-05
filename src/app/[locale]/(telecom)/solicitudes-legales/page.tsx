"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
  Gavel, Shield, FileText, Plus, Clock, CircleCheck,
  Eye, Search, Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SolicitudLegal {
  id: string;
  tipo: "interceptacion" | "datos_trafico" | "bloqueo" | "preservacion";
  numeroOficio: string;
  tribunalOrigen: string;
  fechaRecepcion: string;
  fechaRespuesta: string | null;
  estado: "recibida" | "en_proceso" | "respondida" | "archivada";
  lineaAfectada: string;
  descripcion: string;
  responsable: string;
}

const MOCK_SOLICITUDES: SolicitudLegal[] = [
  { id: "SL-001", tipo: "interceptacion", numeroOficio: "OFI-2026-03-0234", tribunalOrigen: "Tribunal 5° Control — Caracas", fechaRecepcion: "15/03/2026", fechaRespuesta: "16/03/2026", estado: "respondida", lineaAfectada: "+58 412-****567", descripcion: "Orden judicial de interceptación lícita conforme al COPP Art. 283", responsable: "Dir. Legal" },
  { id: "SL-002", tipo: "datos_trafico", numeroOficio: "OFI-2026-02-0178", tribunalOrigen: "Fiscalía 12° — Maracaibo", fechaRecepcion: "22/02/2026", fechaRespuesta: "25/02/2026", estado: "respondida", lineaAfectada: "+58 414-****321", descripcion: "Solicitud de registros de tráfico de datos últimos 6 meses", responsable: "Dir. Legal" },
  { id: "SL-003", tipo: "preservacion", numeroOficio: "OFI-2026-03-0312", tribunalOrigen: "CICPC — Div. Delitos Informáticos", fechaRecepcion: "28/03/2026", fechaRespuesta: null, estado: "en_proceso", lineaAfectada: "+58 416-****543", descripcion: "Preservación inmediata de datos de comunicaciones por 90 días", responsable: "Coord. Cumplimiento" },
  { id: "SL-004", tipo: "bloqueo", numeroOficio: "OFI-2026-01-0089", tribunalOrigen: "CONATEL — Div. Seguridad", fechaRecepcion: "10/01/2026", fechaRespuesta: "10/01/2026", estado: "archivada", lineaAfectada: "IMEI 3534****2345", descripcion: "Bloqueo de IMEI reportado como robado en base GSMA", responsable: "Ops. Red" },
];

const TIPO_CONFIG = {
  interceptacion: { label: "Interceptación Lícita", color: "text-rose-500", bg: "bg-rose-500/10" },
  datos_trafico: { label: "Datos de Tráfico", color: "text-blue-500", bg: "bg-blue-500/10" },
  bloqueo: { label: "Bloqueo IMEI/Línea", color: "text-amber-500", bg: "bg-amber-500/10" },
  preservacion: { label: "Preservación de Datos", color: "text-violet-500", bg: "bg-violet-500/10" },
};

const ESTADO_CONFIG = {
  recibida: { label: "Recibida", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  en_proceso: { label: "En Proceso", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  respondida: { label: "Respondida", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  archivada: { label: "Archivada", color: "text-muted-foreground", bg: "bg-muted/20", border: "border-border" },
};

const emptyForm = {
  tipo: "interceptacion" as SolicitudLegal["tipo"],
  numeroOficio: "",
  tribunalOrigen: "",
  lineaAfectada: "",
  descripcion: "",
  fechaRecepcion: "",
};

export default function SolicitudesLegalesPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [solicitudes, setSolicitudes] = useState<SolicitudLegal[]>(MOCK_SOLICITUDES);
  const [form, setForm] = useState(emptyForm);

  const filtradas = solicitudes.filter(s =>
    s.numeroOficio.toLowerCase().includes(search.toLowerCase()) ||
    s.tribunalOrigen.toLowerCase().includes(search.toLowerCase()) ||
    s.lineaAfectada.includes(search)
  );

  const handleRegistrar = () => {
    if (!form.numeroOficio.trim() || !form.tribunalOrigen.trim()) {
      toast({ title: "Campos requeridos", description: "Ingrese el número de oficio y tribunal de origen.", variant: "destructive" });
      return;
    }
    const now = new Date();
    const fechaStr = form.fechaRecepcion
      ? new Date(form.fechaRecepcion).toLocaleDateString("es-VE")
      : now.toLocaleDateString("es-VE");
    const newId = `SL-${String(solicitudes.length + 1).padStart(3, "0")}`;
    const nuevaSolicitud: SolicitudLegal = {
      id: newId,
      tipo: form.tipo,
      numeroOficio: form.numeroOficio.trim(),
      tribunalOrigen: form.tribunalOrigen.trim(),
      fechaRecepcion: fechaStr,
      fechaRespuesta: null,
      estado: "recibida",
      lineaAfectada: form.lineaAfectada.trim() || "—",
      descripcion: form.descripcion.trim() || "Sin descripción",
      responsable: "Coord. Cumplimiento",
    };
    setSolicitudes(prev => [nuevaSolicitud, ...prev]);
    setShowForm(false);
    setForm(emptyForm);
    toast({
      title: "Solicitud Registrada",
      description: `${newId} — Registrada en log auditable el ${now.toLocaleDateString("es-VE")} a las ${now.toLocaleTimeString("es-VE")}.`,
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gavel className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Cumplimiento Legal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Solicitudes Legales</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Registro auditable de solicitudes judiciales y órdenes de interceptación lícita.</p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar Solicitud
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Solicitudes", val: `${solicitudes.length}`, icon: FileText, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "En Proceso", val: `${solicitudes.filter(s => s.estado === 'en_proceso' || s.estado === 'recibida').length}`, icon: Clock, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Respondidas", val: `${solicitudes.filter(s => s.estado === 'respondida').length}`, icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Interceptaciones", val: `${solicitudes.filter(s => s.tipo === 'interceptacion').length}`, icon: Lock, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Shield className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Log Auditable</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Registro inmutable con marca de tiempo</CardDescription>
            </div>
          </div>
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
            <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="h-8 pl-9 rounded-lg text-xs" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                  <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nº Oficio</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Origen</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Línea/IMEI</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Recepción</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Respuesta</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtradas.map((s) => {
                  const tipoConf = TIPO_CONFIG[s.tipo];
                  const estadoConf = ESTADO_CONFIG[s.estado];
                  return (
                    <TableRow key={s.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                      <TableCell className="pl-5 py-3">
                        <p className="text-xs font-mono font-semibold text-foreground">{s.numeroOficio}</p>
                        <p className="text-[11px] text-muted-foreground">{s.id}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-[11px] px-2 py-0.5", tipoConf.bg, tipoConf.color)}>
                          {tipoConf.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{s.tribunalOrigen}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{s.lineaAfectada}</TableCell>
                      <TableCell className="text-center text-[11px] text-muted-foreground">{s.fechaRecepcion}</TableCell>
                      <TableCell className="text-center text-[11px] text-muted-foreground">{s.fechaRespuesta || "—"}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("text-[11px] px-2 py-0.5", estadoConf.bg, estadoConf.color, estadoConf.border)}>
                          {estadoConf.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-5">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start gap-3">
        <Lock className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-rose-500">Protocolo de Respuesta ante Orden Judicial</p>
          <ol className="text-[10px] text-muted-foreground mt-1 space-y-0.5 list-decimal list-inside">
            <li>Recepción y verificación de autenticidad del oficio judicial</li>
            <li>Registro inmediato en el log auditable con marca de tiempo</li>
            <li>Notificación a la Dirección Legal y Coordinación de Cumplimiento</li>
            <li>Verificación de competencia del tribunal y alcance de la orden</li>
            <li>Ejecución técnica conforme a los parámetros establecidos</li>
            <li>Documentación del proceso y respuesta formal al tribunal</li>
            <li>Archivo seguro con retención mínima de 5 años (LOTEL Art. 190)</li>
          </ol>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-card border-border rounded-xl max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground">Registrar Solicitud Legal</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Registre una nueva solicitud judicial o requerimiento legal
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px]">Tipo de Solicitud</Label>
              <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v as SolicitudLegal["tipo"] }))}>
                <SelectTrigger className="h-9 rounded-lg"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="interceptacion">Interceptación Lícita</SelectItem>
                  <SelectItem value="datos_trafico">Datos de Tráfico</SelectItem>
                  <SelectItem value="bloqueo">Bloqueo IMEI/Línea</SelectItem>
                  <SelectItem value="preservacion">Preservación de Datos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px]">Nº de Oficio *</Label>
                <Input placeholder="OFI-2026-XX-XXXX" value={form.numeroOficio} onChange={e => setForm(f => ({ ...f, numeroOficio: e.target.value }))} className="h-9 rounded-lg text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px]">Fecha de Recepción</Label>
                <Input type="date" value={form.fechaRecepcion} onChange={e => setForm(f => ({ ...f, fechaRecepcion: e.target.value }))} className="h-9 rounded-lg text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px]">Tribunal/Organismo de Origen *</Label>
              <Input placeholder="Tribunal, Fiscalía o ente solicitante" value={form.tribunalOrigen} onChange={e => setForm(f => ({ ...f, tribunalOrigen: e.target.value }))} className="h-9 rounded-lg text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px]">Línea/IMEI Afectado</Label>
              <Input placeholder="+58 4XX-XXXXXXX o IMEI" value={form.lineaAfectada} onChange={e => setForm(f => ({ ...f, lineaAfectada: e.target.value }))} className="h-9 rounded-lg text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px]">Descripción</Label>
              <Textarea placeholder="Detalle de la solicitud..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} className="rounded-lg text-sm min-h-[80px]" />
            </div>
          </div>
          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)} className="rounded-lg">Cancelar</Button>
            <Button size="sm" onClick={handleRegistrar} className="rounded-lg text-xs font-semibold">
              <Shield className="mr-1.5 h-3.5 w-3.5" /> Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
