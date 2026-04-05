"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Headphones, Plus, CircleCheck, Clock, MessageSquare,
  Signal, AlertTriangle, Search, RefreshCw, Send, FileText, Wifi
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Ticket {
  id: string;
  titulo: string;
  categoria: string;
  prioridad: "baja" | "media" | "alta" | "critica";
  estado: "abierto" | "en_progreso" | "resuelto" | "cerrado";
  fechaCreacion: string;
  ultimaActualizacion: string;
  mensajes: number;
}

const MOCK_TICKETS: Ticket[] = [
  { id: "TK-2026-0145", titulo: "Caída de señal en zona sur de Caracas", categoria: "Señal", prioridad: "alta", estado: "en_progreso", fechaCreacion: "02/04/2026", ultimaActualizacion: "03/04/2026", mensajes: 4 },
  { id: "TK-2026-0138", titulo: "Velocidad 5G inferior a la contratada", categoria: "Velocidad", prioridad: "media", estado: "abierto", fechaCreacion: "29/03/2026", ultimaActualizacion: "01/04/2026", mensajes: 2 },
  { id: "TK-2026-0122", titulo: "eSIM no se activa en iPhone 15", categoria: "eSIM", prioridad: "media", estado: "resuelto", fechaCreacion: "20/03/2026", ultimaActualizacion: "22/03/2026", mensajes: 6 },
  { id: "TK-2026-0098", titulo: "Cobro duplicado en factura de febrero", categoria: "Facturación", prioridad: "alta", estado: "cerrado", fechaCreacion: "05/03/2026", ultimaActualizacion: "12/03/2026", mensajes: 8 },
];

const PRIORIDAD_CONFIG = {
  baja: { label: "Baja", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  media: { label: "Media", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  alta: { label: "Alta", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  critica: { label: "Crítica", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

const ESTADO_CONFIG = {
  abierto: { label: "Abierto", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  en_progreso: { label: "En Progreso", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  resuelto: { label: "Resuelto", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  cerrado: { label: "Cerrado", color: "text-muted-foreground", bg: "bg-muted/20", border: "border-border" },
};

export default function SoporteTecnicoPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const handleCrearTicket = () => {
    setShowForm(false);
    toast({
      title: "Ticket Creado",
      description: "Tu ticket de soporte ha sido registrado. Recibirás una respuesta en las próximas 2 horas.",
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Headphones className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Centro de Soporte</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Reporta problemas, abre tickets y haz seguimiento en tiempo real.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Nuevo Ticket
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Tickets Abiertos", val: `${MOCK_TICKETS.filter(t => t.estado === 'abierto' || t.estado === 'en_progreso').length}`, icon: MessageSquare, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "En Progreso", val: `${MOCK_TICKETS.filter(t => t.estado === 'en_progreso').length}`, icon: RefreshCw, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Resueltos", val: `${MOCK_TICKETS.filter(t => t.estado === 'resuelto' || t.estado === 'cerrado').length}`, icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Calidad de Red", val: "98.5%", icon: Signal, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
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

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card/60 border border-primary/20 rounded-xl overflow-hidden">
            <CardHeader className="px-5 py-4 border-b border-border/50">
              <CardTitle className="text-sm font-semibold text-foreground">Nuevo Ticket de Soporte</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Categoría</label>
                  <Select defaultValue="senal">
                    <SelectTrigger className="h-9 rounded-lg text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senal">Problemas de Señal</SelectItem>
                      <SelectItem value="velocidad">Velocidad</SelectItem>
                      <SelectItem value="esim">eSIM</SelectItem>
                      <SelectItem value="facturacion">Facturación</SelectItem>
                      <SelectItem value="equipo">Equipo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Prioridad</label>
                  <Select defaultValue="media">
                    <SelectTrigger className="h-9 rounded-lg text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="critica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asunto</label>
                <Input placeholder="Describe brevemente el problema..." className="h-9 rounded-lg text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Descripción detallada</label>
                <Textarea placeholder="Proporciona todos los detalles del problema..." className="rounded-lg text-sm min-h-[80px]" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowForm(false)} className="rounded-lg text-xs">Cancelar</Button>
                <Button size="sm" onClick={handleCrearTicket} className="rounded-lg text-xs font-semibold">
                  <Send className="mr-1.5 h-3 w-3" /> Enviar Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><FileText className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Mis Tickets</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{MOCK_TICKETS.length} tickets registrados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {MOCK_TICKETS.map((ticket) => {
            const prioConf = PRIORIDAD_CONFIG[ticket.prioridad];
            const estadoConf = ESTADO_CONFIG[ticket.estado];
            return (
              <div key={ticket.id} className="flex items-center justify-between px-5 py-4 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{ticket.id}</span>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5", prioConf.bg, prioConf.color, prioConf.border)}>
                      {prioConf.label}
                    </Badge>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5", estadoConf.bg, estadoConf.color, estadoConf.border)}>
                      {estadoConf.label}
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-foreground">{ticket.titulo}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {ticket.categoria} · Creado: {ticket.fechaCreacion} · {ticket.mensajes} mensajes
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px]">
                  <MessageSquare className="mr-1 h-3 w-3" /> Ver
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: Signal, title: "Reportar Señal", desc: "Problemas de cobertura o caídas de red", action: "Reportar" },
          { icon: Wifi, title: "Test de Velocidad", desc: "Mide la velocidad de tu conexión actual", action: "Iniciar Test" },
          { icon: Headphones, title: "Chat en Vivo", desc: "Habla con un agente de soporte ahora", action: "Iniciar Chat" },
        ].map((item, i) => (
          <Card key={i} className="bg-card/60 border border-border/50 rounded-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            onClick={() => toast({ title: item.title, description: `Función de ${item.title.toLowerCase()} iniciada.` })}>
            <CardContent className="p-5 flex items-start gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{item.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
