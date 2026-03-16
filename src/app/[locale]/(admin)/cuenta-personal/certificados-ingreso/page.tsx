
import { CertificadoManager } from "@/components/certificados/certificado-manager";
import { User } from "lucide-react";

export default function CertificadosIngresoPersonalPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <User className="h-3 w-3" /> MI BÓVEDA CIVIL
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Mis <span className="text-primary italic">Certificados de Ingreso</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Atestiguamiento de Ingresos • Firma Digital Certificada 2026</p>
      </header>

      <CertificadoManager mode="personal" />
    </div>
  );
}
