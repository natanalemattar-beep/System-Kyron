"use client";

import React, { useState, useEffect } from "react";
import { Award, FileText, Download, ShieldCheck, User, Calendar, CheckCircle, Pen, BookOpen, Printer, Eye, Loader2, Inbox, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Informe {
  id: string;
  tipo: string;
  subtipo: string;
  desc: string;
  estado: string;
  fecha: string;
  auditor: string;
  colegio: string;
}

const estadoConfig: Record<string, { label: string; badge: string }> = {
  vigente: { label: "Vigente", badge: "bg-emerald-500/10 text-emerald-500" },
  en_proceso: { label: "En Proceso", badge: "bg-amber-500/10 text-amber-500" },
  vencido: { label: "Vencido", badge: "bg-rose-500/10 text-rose-500" },
};

const deberesFormalesPlantilla = [
  "Libros de Compra y Venta al día",
  "Facturación conforme Providencia 0071",
  "Retenciones IVA enteradas oportunamente",
  "Retenciones ISLR enteradas oportunamente",
  "Declaraciones IVA mensuales presentadas",
  "Declaración ISLR anual presentada",
  "RIF actualizado y vigente",
  "Libros contables legalizados",
  "Registro de Activos Revaluados (RAR)",
  "IGTF declarado y pagado",
];

export default function DictamenContadorPage() {
  const { toast } = useToast();
  const [informes, setInformes] = useState<Informe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=dictamenes')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setInformes(d.rows ?? []))
      .catch(() => setInformes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNuevo = async () => {
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria: 'contabilidad', subcategoria: 'dictamen_contador', descripcion: 'Solicitud de nuevo informe/dictamen' }),
      });
      if (res.ok) toast({ title: "Solicitud registrada", description: "Se ha solicitado un nuevo dictamen." });
      else toast({ variant: "destructive", title: "Error" });
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <Award className="h-3.5 w-3.5" /> Dictamen Profesional
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Dictamen del <span className="text-primary">Contador</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Opinión CPC · Informes de auditoría · Certificaciones · Cumplimiento FCCPV</p>
          </div>
          <Button onClick={handleNuevo} className="rounded-xl">
            <Pen className="mr-2 h-4 w-4" /> Nuevo Informe
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando informes...</span>
        </div>
      ) : informes.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin dictámenes registrados</p>
              <p className="text-xs text-muted-foreground/70">Los dictámenes e informes del CPC aparecerán aquí al ser emitidos.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {informes.map((informe) => {
            const est = estadoConfig[informe.estado] || estadoConfig.vigente;
            return (
              <Card key={informe.id} className="rounded-2xl border overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold">{informe.tipo}</p>
                      <Badge className={cn("text-[9px] font-bold border-none", est.badge)}>{est.label}</Badge>
                    </div>
                    <p className="text-[11px] font-medium text-primary mb-1">{informe.subtipo}</p>
                    <p className="text-[11px] text-muted-foreground">{informe.desc}</p>
                    <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
                      <span><Calendar className="h-3 w-3 inline mr-1" />Fecha: {informe.fecha}</span>
                      <span><User className="h-3 w-3 inline mr-1" />{informe.auditor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="rounded-xl text-xs">
                      <Eye className="mr-1 h-3 w-3" /> Ver
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-xs">
                      <Download className="mr-1 h-3 w-3" /> PDF
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="rounded-2xl border overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold">Deberes Formales Tributarios</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {deberesFormalesPlantilla.map((deber, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/10 border border-border/30">
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                <span className="text-xs text-muted-foreground">{deber}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-4">El estado de cumplimiento se actualiza al registrar dictámenes.</p>
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-primary">Normativa Aplicable</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Los dictámenes e informes se emiten conforme a las NIA/ISA, las NAGA-VE, los VEN-NIF y las regulaciones de la FCCPV. La plataforma facilita la generación de la información base requerida por el auditor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
