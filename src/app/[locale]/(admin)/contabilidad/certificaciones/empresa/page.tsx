"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { Building2, ShieldCheck, Loader2, Inbox, TriangleAlert, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Certificacion {
  id: string;
  name: string;
  issuer: string;
  status: string;
  date: string;
  expiry: string;
}

export default function CertificacionesEmpresaPage() {
  const { toast } = useToast();
  const [certs, setCerts] = useState<Certificacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=certificaciones_empresa')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setCerts(d.rows ?? []))
      .catch(() => setCerts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSolicitar = async () => {
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria: 'contabilidad', subcategoria: 'certificacion_empresa', descripcion: 'Solicitud de nueva certificación de empresa' }),
      });
      if (res.ok) toast({ title: "Solicitud registrada", description: "Se ha solicitado una nueva certificación de empresa." });
      else toast({ variant: "destructive", title: "Error", description: "No se pudo registrar la solicitud." });
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Centro de Cumplimiento
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Certificaciones <span className="text-primary">de Empresa</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Dossier Integral · Validación de entidad · Solvencias corporativas</p>
          </div>
          <Button onClick={handleSolicitar} className="rounded-xl">Solicitar Nueva</Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando certificaciones...</span>
        </div>
      ) : certs.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin certificaciones de empresa</p>
              <p className="text-xs text-muted-foreground/70">Las certificaciones aparecerán aquí al ser registradas o solicitadas.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certs.map(cert => (
            <Card key={cert.id} className="rounded-2xl border p-6 space-y-4 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <Badge className={cn("text-[10px] font-semibold border-none",
                  cert.status === 'Vigente' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                )}>{cert.status}</Badge>
              </div>
              <div>
                <h3 className="text-sm font-bold">{cert.issuer}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{cert.name}</p>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Emitido:</span>
                  <span>{cert.date}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Vence:</span>
                  <span className="text-rose-500">{cert.expiry}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Las certificaciones de empresa incluyen solvencias fiscales (SENIAT), solvencias laborales (IVSS/Ministerio del Trabajo) y licencias de actividad económica municipales. Mantenga actualizado el expediente para licitaciones y trámites bancarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
