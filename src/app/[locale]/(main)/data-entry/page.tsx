
"use client";

import { DataEntryForm } from "@/components/data-entry/data-entry-form";
import { Sparkles, FileScan } from "lucide-react";

export default function DataEntryPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
                <FileScan className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Entrada de Datos por IA</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Digitaliza tus facturas y recibos al instante. Nuestro motor de IA extrae automáticamente montos, fechas y proveedores para tu contabilidad.
        </p>
      </header>

      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3 mb-8">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <p className="text-xs font-semibold text-primary uppercase tracking-widest">Tecnología de Visión Artificial Activa</p>
      </div>

      <DataEntryForm />
    </div>
  );
}
