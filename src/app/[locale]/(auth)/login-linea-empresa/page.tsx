
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Signal, Radio, Network, Globe } from "lucide-react";

export default function LoginLineaEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Mi Línea Empresa" 
            portalDescription="Centro de control de flota corporativa para la gestión masiva de líneas."
            redirectPath="/flota-empresarial"
            icon={Signal}
            accentColor="amber-600"
            demoUsername="telecom.admin@kyron.com"
            demoPassword="admin123"
            bgPattern={
                <div className="grid grid-cols-2 gap-12 p-12 opacity-10">
                    <Radio className="h-24 w-24 animate-pulse" />
                    <Network className="h-24 w-24" />
                    <Globe className="h-24 w-24" />
                    <Signal className="h-24 w-24" />
                </div>
            }
            features={[
                "Control de Flota por Departamento",
                "Límites de Consumo por Empleado",
                "Facturación Consolidada"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver al selector de portales" },
              secondaryLinks: {
                title: "¿Uso personal?",
                links: [{ href: "/login-linea-personal", text: "Ir a Línea Personal" }]
              }
            }}
        />
    );
}
