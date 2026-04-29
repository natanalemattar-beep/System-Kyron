
"use client";

import { ReportsView } from "@/components/reports/reports-view";
import { ChartBar as BarChart3, Download, Printer, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
                <BarChart3 className="h-3 w-3" /> CENTRO ANALÍTICO
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Centro de <span className="text-primary italic">Inteligencia</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Reportes Principales • Auditoría Consolidada 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Printer className="mr-2 h-4 w-4" /> Imprimir Todo
            </Button>
            <Button className="h-12 px-10 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg">
                <Download className="mr-2 h-4 w-4" /> DESCARGAR DOSSIER
            </Button>
        </div>
      </header>

      <div className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
        <ReportsView />
      </div>
    </div>
  );
}
