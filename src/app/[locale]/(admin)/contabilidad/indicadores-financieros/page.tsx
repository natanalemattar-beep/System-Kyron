"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ShieldCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface Ratio {
  nombre: string;
  formula: string;
  valor: string;
  optimo: string;
  estado: string;
  interpretacion: string;
}

interface GrupoIndicador {
  categoria: string;
  color: string;
  bg: string;
  border: string;
  ratios: Ratio[];
}

const estadoColors: Record<string, { badge: string; icon: React.ReactNode }> = {
  excelente: { badge: "bg-emerald-500/10 text-emerald-500", icon: <ArrowUpRight className="h-3 w-3 text-emerald-500" /> },
  bueno: { badge: "bg-primary/10 text-primary", icon: <ShieldCheck className="h-3 w-3 text-primary" /> },
  alerta: { badge: "bg-amber-500/10 text-amber-500", icon: <AlertTriangle className="h-3 w-3 text-amber-500" /> },
  critico: { badge: "bg-rose-500/10 text-rose-500", icon: <ArrowDownRight className="h-3 w-3 text-rose-500" /> },
};

export default function IndicadoresFinancierosPage() {
  const [grupos, setGrupos] = useState<GrupoIndicador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=indicadores_financieros")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setGrupos(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Indicadores Financieros
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Ratios de Liquidez, Rentabilidad, Endeudamiento y Eficiencia Operativa.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold uppercase tracking-widest">Cargando indicadores...</span>
        </div>
      ) : grupos.length === 0 ? (
        <Card className="border rounded-2xl shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Inbox className="h-10 w-10" />
            <p className="text-sm font-bold uppercase tracking-widest">Sin indicadores calculados</p>
            <p className="text-xs text-muted-foreground/70">
              Los indicadores financieros se calcularán automáticamente cuando existan estados financieros registrados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {grupos.map((grupo, gi) => (
            <Card key={gi} className={cn("rounded-2xl overflow-hidden border", grupo.border)}>
              <CardHeader className={cn("p-5 border-b", grupo.bg)}>
                <CardTitle className={cn("text-sm font-black uppercase tracking-[0.2em]", grupo.color)}>
                  {grupo.categoria}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {grupo.ratios.map((ratio, ri) => {
                  const est = estadoColors[ratio.estado] || estadoColors.bueno;
                  return (
                    <div key={ri} className="flex items-start gap-4 p-5 border-b border-border/30 last:border-none hover:bg-muted/10 transition-colors">
                      <div className="shrink-0 mt-1">{est.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold">{ratio.nombre}</p>
                          <Badge className={cn("text-[8px] font-bold uppercase", est.badge)}>{ratio.estado}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-mono">{ratio.formula}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{ratio.interpretacion}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={cn("text-lg font-black", grupo.color)}>{ratio.valor}</p>
                        <p className="text-[9px] text-muted-foreground">Óptimo: {ratio.optimo}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
