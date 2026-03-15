
"use client";

import { ReportsView } from "@/components/reports/reports-view";
import { BarChart3, Download, Printer, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <BarChart3 className="h-3 w-3" /> NODO ANALÍTICO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-primary italic">Inteligencia</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Reportes Maestros • Auditoría Consolidada 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Printer className="mr-2 h-4 w-4" /> Imprimir Todo
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <Download className="mr-2 h-4 w-4" /> DESCARGAR DOSSIER
            </Button>
        </div>
      </header>

      <div className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <ReportsView />
      </div>
    </div>
  );
}
