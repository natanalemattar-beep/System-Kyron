
import { CertificadoManager } from "@/components/certificados/certificado-manager";
import { Briefcase, FileSignature } from "lucide-react";

/**
 * @fileOverview Módulo de Gestión de Certificados Laborales (Vista Administrativa).
 */

export default function CertificadosLaboralesRRHHPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-secondary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
            <Briefcase className="h-3 w-3" /> NODO DE PERSONAL
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Certificados <span className="text-secondary italic">Laborales</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Emisión de Constancias Masivas • Gestión de Talento 2026</p>
      </header>

      <CertificadoManager mode="hr" />
    </div>
  );
}
