
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Briefcase } from "lucide-react";

export default function LoginRrhhPage() {
    return (
        <SpecializedLoginCard 
            portalName="Recursos Humanos" 
            portalDescription="Administración de nóminas, beneficios y expedientes de personal."
            redirectPath="/dashboard-rrhh"
            icon={Briefcase}
            demoUsername="rrhh.admin"
            demoPassword="password123"
            features={[
                "Cálculo Automático de Nóminas",
                "Gestión de Prestaciones Sociales",
                "Portal de Reclutamiento IA"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver a la selección de portal" }
            }}
        />
    );
}
