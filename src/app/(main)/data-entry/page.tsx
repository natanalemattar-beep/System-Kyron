
"use client";

import { DataEntryForm } from "@/components/data-entry/data-entry-form";

export default function DataEntryPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Extracción Automática de Datos</h1>
        <p className="text-muted-foreground mt-2">
          Sube una foto de una factura o recibo y deja que nuestra IA extraiga la información por ti.
        </p>
      </header>
      <DataEntryForm />
    </div>
  );
}
