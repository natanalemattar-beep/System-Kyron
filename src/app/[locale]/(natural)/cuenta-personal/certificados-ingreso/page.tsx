import { CertificadoManager } from "@/components/certificados/certificado-manager";
import { FileText } from "lucide-react";

export default function CertificadosIngresoPersonalPage() {
  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-primary/[0.04] via-card to-card p-6 sm:p-8 mt-6">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Certificados de Ingreso</h1>
            <p className="text-sm text-muted-foreground font-medium max-w-lg">
              Genera constancias de ingresos con validez institucional, sellado digital inmutable y código QR de verificación.
            </p>
          </div>
        </div>
      </div>

      <CertificadoManager mode="personal" />
    </div>
  );
}
