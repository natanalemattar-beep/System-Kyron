
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Users } from "lucide-react";

export default function LoginSociosPage() {
    return (
        <SpecializedLoginCard 
            portalName="Socios" 
            portalDescription="Consola ejecutiva para la supervisión de resultados y rentabilidad del holding."
            redirectPath="/dashboard-socios"
            icon={Users}
            accentColor="indigo-950"
            layoutVariant="minimal"
            features={[
                "Simulador Gemelo Digital",
                "Reparto de Dividendos",
                "Consolidación Multi-Sede"
            ]}
        />
    );
}
