"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bot, Loader2, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";

interface Respuesta {
  id: number;
  trigger: string;
  respuesta: string;
  activa: boolean;
}

interface Mensaje {
  id: number;
  cliente: string;
  numero: string;
  mensaje: string;
  hora: string;
  respondido: boolean;
  canal: string;
}

export default function WhatsappEmpresarialPage() {
  const { toast } = useToast();
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/contabilidad/records?type=whatsapp_respuestas").then((r) => r.ok ? r.json() : { rows: [] }),
      fetch("/api/contabilidad/records?type=whatsapp_mensajes").then((r) => r.ok ? r.json() : { rows: [] }),
    ])
      .then(([resp, msgs]) => {
        setRespuestas(resp.rows ?? []);
        setMensajes(msgs.rows ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const guardar = async () => {
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "whatsapp", subcategoria: "configuracion", descripcion: "Actualización de respuestas automáticas WhatsApp Empresarial" }),
      });
      if (res.ok) {
        toast({ title: "Configuración guardada", description: "Las respuestas automáticas se han actualizado." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la configuración." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-green-500" />
            WhatsApp Empresarial
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Respuestas automáticas inteligentes — Atención al cliente 24/7.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={guardar}>
          Guardar Configuración
        </Button>
      </header>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4">
        <Bot className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
        <p className="text-sm text-green-800">
          El sistema detecta las preguntas de clientes y responde en tiempo real.
          Cuando se requiere atención personalizada, la consulta se redirige a un asesor humano.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
          Respuestas Automáticas
        </h3>
        <Card className="border rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-bold uppercase tracking-widest">Cargando respuestas...</span>
              </div>
            ) : respuestas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                <Inbox className="h-10 w-10" />
                <p className="text-sm font-bold uppercase tracking-widest">Sin respuestas configuradas</p>
                <p className="text-xs text-muted-foreground/70">Configure respuestas automáticas para atender a sus clientes por WhatsApp.</p>
              </div>
            ) : (
              <div className="divide-y">
                {respuestas.map((r) => (
                  <div key={r.id} className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-[8px] uppercase">Trigger</Badge>
                          <p className="text-xs font-bold">{r.trigger}</p>
                        </div>
                        <p className="text-xs text-muted-foreground border-l-2 border-green-500/30 pl-3">{r.respuesta}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className={cn("w-2 h-2 rounded-full", r.activa ? "bg-emerald-500" : "bg-muted-foreground/30")} />
                        <span className="text-[9px] font-bold uppercase text-muted-foreground">{r.activa ? "Activa" : "Inactiva"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
          Conversaciones Recientes
        </h3>
        <Card className="border rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-bold uppercase tracking-widest">Cargando mensajes...</span>
              </div>
            ) : mensajes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                <Inbox className="h-10 w-10" />
                <p className="text-sm font-bold uppercase tracking-widest">Sin conversaciones recientes</p>
                <p className="text-xs text-muted-foreground/70">Las conversaciones de WhatsApp aparecerán aquí al ser recibidas.</p>
              </div>
            ) : (
              <div className="divide-y">
                {mensajes.map((m) => (
                  <div key={m.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs font-bold">{m.cliente}</p>
                        <p className="text-[10px] text-muted-foreground">{m.numero} · {m.hora}</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">"{m.mensaje}"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={m.respondido ? "default" : "secondary"} className="text-[8px] uppercase">
                        {m.respondido ? "Respondido" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
