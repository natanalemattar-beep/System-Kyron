"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LifeBuoy, Plus, Search, Clock, CheckCircle, AlertTriangle, User, Calendar, MessageSquare, Zap, Loader2, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: number;
  titulo: string;
  descripcion: string | null;
  categoria: string;
  prioridad: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  abierto: { label: "Abierto", badge: "bg-amber-500/10 text-amber-500", icon: <Clock className="h-3 w-3" /> },
  en_proceso: { label: "En Progreso", badge: "bg-primary/10 text-primary", icon: <Zap className="h-3 w-3" /> },
  resuelto: { label: "Resuelto", badge: "bg-emerald-500/10 text-emerald-500", icon: <CheckCircle className="h-3 w-3" /> },
  cerrado: { label: "Cerrado", badge: "bg-slate-500/10 text-slate-400", icon: <CheckCircle className="h-3 w-3" /> },
};

function formatFecha(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function HelpdeskPage() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadTickets = useCallback(() => {
    setLoading(true);
    fetch('/api/helpdesk?limit=50')
      .then(r => r.ok ? r.json() : { tickets: [] })
      .then(d => setTickets(d.tickets ?? []))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadTickets(); }, [loadTickets]);

  const handleNuevoTicket = async () => {
    const titulo = prompt("Título del problema:");
    if (!titulo) return;
    const descripcion = prompt("Describe el problema:");
    try {
      const res = await fetch('/api/helpdesk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion: descripcion ?? '', categoria: 'soporte', prioridad: 'media' }),
      });
      if (res.ok) {
        toast({ title: "Ticket creado", description: "Tu solicitud fue registrada y será atendida pronto." });
        loadTickets();
      } else {
        toast({ title: "Error", variant: "destructive", description: "No se pudo crear el ticket." });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
  };

  const filtered = tickets.filter(t => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return t.titulo.toLowerCase().includes(q) || (t.descripcion ?? '').toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q);
  });

  const abiertos = tickets.filter(t => t.estado === 'abierto').length;
  const enProgreso = tickets.filter(t => t.estado === 'en_proceso').length;
  const resueltos = tickets.filter(t => t.estado === 'resuelto' || t.estado === 'cerrado').length;

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <LifeBuoy className="h-3 w-3" /> MESA DE AYUDA
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Help <span className="text-primary italic">Desk</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Tickets • SLA • Escalamiento • Base de Conocimiento
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2" onClick={handleNuevoTicket}>
          <Plus className="h-4 w-4" /> NUEVO TICKET
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Abiertos", val: loading ? "—" : String(abiertos), icon: Clock, color: "text-amber-500" },
          { label: "En Progreso", val: loading ? "—" : String(enProgreso), icon: Zap, color: "text-primary" },
          { label: "Resueltos", val: loading ? "—" : String(resueltos), icon: CheckCircle, color: "text-emerald-500" },
          { label: "Total Tickets", val: loading ? "—" : String(tickets.length), icon: AlertTriangle, color: "text-cyan-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar ticket por descripción, categoría..."
          className="pl-10 h-11 rounded-xl"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold uppercase tracking-widest">Cargando tickets...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
          <Inbox className="h-12 w-12 opacity-30" />
          <p className="text-sm font-semibold uppercase tracking-widest">Sin tickets registrados</p>
          <p className="text-xs text-center max-w-sm text-muted-foreground/60">
            {searchTerm ? "Ningún ticket coincide con la búsqueda." : "No hay tickets de soporte IT registrados. Crea el primero."}
          </p>
          {!searchTerm && (
            <Button size="sm" className="mt-2 rounded-xl" onClick={handleNuevoTicket}>
              <Plus className="mr-2 h-3.5 w-3.5" /> Crear Ticket
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket, i) => {
            const est = estadoConfig[ticket.estado] ?? estadoConfig.abierto;
            return (
              <motion.div key={ticket.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4 p-5">
                    <div className="shrink-0 mt-0.5">{est.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[10px] font-bold text-primary">IT-{String(ticket.id).padStart(4, '0')}</span>
                        <Badge className={cn("text-[10px] font-bold gap-1", est.badge)}>{est.icon} {est.label}</Badge>
                        <Badge className="text-[10px] font-bold bg-muted/30">{ticket.categoria}</Badge>
                        <Badge className="text-[10px] font-bold bg-muted/20">{ticket.prioridad}</Badge>
                      </div>
                      <p className="text-sm font-bold">{ticket.titulo}</p>
                      {ticket.descripcion && <p className="text-xs text-muted-foreground mt-0.5">{ticket.descripcion}</p>}
                      <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> Informática</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatFecha(ticket.created_at)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5" onClick={() => toast({ title: "Respuesta registrada" })}>
                        <MessageSquare className="h-3 w-3" /> Responder
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
