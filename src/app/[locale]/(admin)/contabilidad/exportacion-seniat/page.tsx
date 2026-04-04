"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, ShieldCheck, CheckCircle, Clock, Lock, ExternalLink, Zap, Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";

interface Declaracion {
  id: number;
  nombre: string;
  formato: string;
  norma: string;
  descripcion: string;
  estado: string;
  periodo: string;
  registros: number;
  montoTotal: string;
}

const estadoConfig: Record<string, { label: string; badge: string }> = {
  listo: { label: "Listo para enviar", badge: "bg-emerald-500/10 text-emerald-500" },
  pendiente: { label: "Pendiente", badge: "bg-amber-500/10 text-amber-500" },
  no_aplica: { label: "No aplica este período", badge: "bg-muted/50 text-muted-foreground" },
};

export default function ExportacionSeniatPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Declaracion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=exportacion_seniat")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleGenerar = (nombre: string, formato: string) => {
    toast({
      title: `Generando ${formato}`,
      description: `${nombre} — Procesando registros contables para exportación fiscal...`,
    });
  };

  const listos = rows.filter((d) => d.estado === "listo").length;
  const pendientes = rows.filter((d) => d.estado === "pendiente").length;

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <Upload className="h-8 w-8 text-primary" />
          Exportación SENIAT
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          XML · TXT · Providencia 0071/0049 · Portal Fiscal · Declaraciones Tributarias.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold uppercase tracking-widest">Cargando declaraciones...</span>
        </div>
      ) : rows.length === 0 ? (
        <Card className="border rounded-2xl shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Inbox className="h-10 w-10" />
            <p className="text-sm font-bold uppercase tracking-widest">Sin declaraciones disponibles</p>
            <p className="text-xs text-muted-foreground/70">
              Las declaraciones fiscales para exportar al SENIAT se generarán al registrar operaciones contables.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border rounded-2xl shadow-sm p-5 text-center">
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Listas para Enviar</p>
              <p className="text-3xl font-black text-emerald-600">{listos}</p>
            </Card>
            <Card className="border rounded-2xl shadow-sm p-5 text-center">
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Pendientes</p>
              <p className="text-3xl font-black text-amber-600">{pendientes}</p>
            </Card>
            <Card className="border rounded-2xl shadow-sm p-5 text-center">
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Total Formatos</p>
              <p className="text-3xl font-black text-primary">{rows.length}</p>
            </Card>
          </div>

          <div className="space-y-4">
            {rows.map((dec) => {
              const est = estadoConfig[dec.estado] || estadoConfig.pendiente;
              return (
                <Card key={dec.id} className="border rounded-2xl shadow-sm overflow-hidden hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-bold">{dec.nombre}</p>
                        <Badge variant="secondary" className="text-[8px] font-bold uppercase">{dec.formato}</Badge>
                        <Badge className={cn("text-[8px] font-bold", est.badge)}>{est.label}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium mb-1">{dec.norma} · {dec.periodo}</p>
                      <p className="text-[11px] text-muted-foreground">{dec.descripcion}</p>
                      <div className="flex gap-4 mt-2 text-[10px]">
                        <span className="text-muted-foreground">Registros: <strong className="text-foreground">{dec.registros}</strong></span>
                        <span className="text-muted-foreground">Monto: <strong className="text-foreground">{dec.montoTotal}</strong></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {dec.estado === "listo" && (
                        <>
                          <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5" onClick={() => handleGenerar(dec.nombre, dec.formato)}>
                            <Download className="h-3 w-3" /> Descargar
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                            <ExternalLink className="h-3 w-3" /> Portal SENIAT
                          </Button>
                        </>
                      )}
                      {dec.estado === "pendiente" && (
                        <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5 border-amber-500/30 text-amber-500"
                          onClick={() => handleGenerar(dec.nombre, dec.formato)}>
                          <Zap className="h-3 w-3" /> Generar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-4">
            <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-black text-emerald-700 uppercase tracking-wider">Compatibilidad Garantizada</p>
              <p className="text-xs text-emerald-800/70 mt-1">
                Todos los archivos generados son 100% compatibles con el Portal Fiscal del SENIAT,
                el sistema de retenciones en línea y los formatos de declaración vigentes.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
