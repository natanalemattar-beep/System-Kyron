
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Signal } from "lucide-react";

export default function LoginLineaEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Mi Línea Empresa" 
            portalDescription="Centro de control de flota corporativa para la gestión masiva de líneas."
            redirectPath="/flota-empresarial"
            icon={Signal}
            demoUsername="telecom.admin@kyron.com"
            demoPassword="admin123"
            features={[
                "Control de Flota por Departamento",
                "Límites de Consumo por Empleado",
                "Facturación Consolidada"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver al selector de portales" }
            }}
        />
    );
}
