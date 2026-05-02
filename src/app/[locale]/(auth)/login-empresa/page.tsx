
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Calculator } from "lucide-react";

export default function LoginEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Asesoría Contable" 
            portalDescription="Inteligencia financiera avanzada y auditoría forense para la nueva economía venezolana."
            redirectPath="/resumen-negocio"
            icon={Calculator}
            accentColor="primary"
            layoutVariant="accounting-premium"
            features={[
                "Auditoría Forense con IA",
                "Conciliación Bancaria T+0",
                "Protocolo RIPF Automatizado",
                "Gestión Multimoneda BCV"
            ]}
        />
    );
}
