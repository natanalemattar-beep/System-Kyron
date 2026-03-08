
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Users } from "lucide-react";

export default function LoginSociosPage() {
    return (
        <SpecializedLoginCard 
            portalName="Socios y Directivos" 
            portalDescription="Dashboard estratégico para la supervisión de resultados y rentabilidad."
            redirectPath="/dashboard-socios"
            icon={Users}
            demoUsername="socio.maestro"
            demoPassword="password123"
            features={[
                "Simulador Estratégico (Gemelo Digital)",
                "Reparto de Beneficios y Dividendos",
                "Auditoría de Holding Consolidada"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Acceso Corporativo" }
            }}
        />
    );
}
