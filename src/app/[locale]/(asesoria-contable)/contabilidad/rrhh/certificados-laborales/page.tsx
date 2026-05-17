"use client";

import { CertificadoManager } from "@/components/certificados/certificado-manager";
import { Briefcase } from "lucide-react";
import { BackButton } from "@/components/back-button";

export default function CertificadosLaboralesRRHHPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-primary" />
          Certificados Laborales
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Emisión de constancias y certificados laborales para el personal.
        </p>
      </header>

      <CertificadoManager mode="hr" />
    </div>
  );
}
