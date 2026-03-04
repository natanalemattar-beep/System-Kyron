"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PoliticaPrivacidadPage() {
  const lastUpdatedDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-8 max-w-4xl w-full p-6 md:p-12">
      <header className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20">
            <Shield className="h-3.5 w-3.5" /> Seguridad de Datos
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">Política de Privacidad</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
          Última actualización: {lastUpdatedDate}
        </p>
      </header>

      <Card className="bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <CardContent className="p-10 md:p-16 prose prose-sm dark:prose-invert max-w-none text-justify space-y-8 text-white/70">
            <section>
                <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">1. Protocolo de Identidad</h4>
                <p>
                    Bienvenido a System Kyron. Nos comprometemos a proteger la integridad de su información bajo estándares de cifrado militar. Esta política detalla la captura y el sellado inmutable de sus activos digitales.
                </p>
            </section>

            <section>
                <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">2. Captura de Activos</h4>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Datos Fiscales:</strong> RIF, Razón Social y registros transaccionales sellados en Blockchain.</li>
                    <li><strong>Identidad Biométrica:</strong> Patrones de acceso para la ID Digital 3D.</li>
                    <li><strong>Telemetría:</strong> Registros de conectividad 5G y uso de nodos eSIM.</li>
                </ul>
            </section>

            <section>
                <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">3. Contacto Maestro</h4>
                <p>
                    Para auditorías de datos o solicitudes de eliminación, puede contactar al nodo central en: <br/>
                    <a href="mailto:systemkyronofficial@gmail.com" className="text-primary font-black underline decoration-primary/30">systemkyronofficial@gmail.com</a>
                </p>
            </section>
        </CardContent>
      </Card>
    </div>
  );
}
