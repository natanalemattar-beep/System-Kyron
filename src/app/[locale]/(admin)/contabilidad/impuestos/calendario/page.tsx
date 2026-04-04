"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface EventoFiscal {
  id: number;
  titulo: string;
  fecha: string;
  urgencia: string;
  descripcion: string;
}

export default function CalendarioFiscalPage() {
  const [rows, setRows] = useState<EventoFiscal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=calendario_fiscal")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const urgencyColor = (u: string) => {
    if (u === "critical") return "bg-rose-500";
    if (u === "high") return "bg-amber-500";
    return "bg-blue-500";
  };

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-emerald-600" />
            Calendario Fiscal
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Cronograma de vencimientos y obligaciones tributarias.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-4">
        <CalendarIcon className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800">
          Los vencimientos fiscales están sujetos a las fechas establecidas por el
          SENIAT y los entes municipales. Verifique siempre con la Gaceta Oficial
          las modificaciones al calendario tributario.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold uppercase tracking-widest">Cargando calendario...</span>
        </div>
      ) : rows.length === 0 ? (
        <Card className="border rounded-2xl shadow-sm">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin eventos fiscales programados</p>
              <p className="text-xs text-muted-foreground/70">Los vencimientos y obligaciones tributarias aparecerán aquí al ser configurados.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {rows.map((event) => (
              <Card key={event.id} className="border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="flex">
                  <div className={cn("w-2", urgencyColor(event.urgencia))} />
                  <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-black uppercase tracking-tight">{event.titulo}</h3>
                        <Badge
                          variant={event.urgencia === "critical" ? "destructive" : "secondary"}
                          className="text-[8px] font-bold uppercase"
                        >
                          {event.urgencia}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.descripcion}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Fecha Límite</p>
                      <p className="text-lg font-black">{event.fecha}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border rounded-2xl shadow-sm p-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                Guía de Prioridad
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-xs text-muted-foreground">Crítico: Menos de 48h</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-xs text-muted-foreground">Alto: Próxima semana</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Normal: En agenda</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
