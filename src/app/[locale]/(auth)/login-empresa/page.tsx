
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Calculator } from "lucide-react";

export default function LoginEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Contabilidad" 
            portalDescription="Gestión financiera de alto nivel con automatización de tributos y balances corporativos."
            redirectPath="/resumen-negocio"
            icon={Calculator}
            accentColor="primary"
            layoutVariant="split-left"
            features={[
                "Auditoría Forense con IA",
                "Conciliación Bancaria T+0",
                "Protocolo RIPF Automatizado"
            ]}
        />
    );
}
