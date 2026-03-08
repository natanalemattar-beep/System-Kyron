
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Cpu } from "lucide-react";

export default function LoginInformaticaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Proyectos Técnicos" 
            portalDescription="Ingeniería, presupuestos y soporte técnico de infraestructura."
            redirectPath="/dashboard-informatica"
            icon={Cpu}
            demoUsername="it.admin"
            demoPassword="password123"
            features={[
                "Generador de Planos con IA",
                "Control de Presupuestos de Obra",
                "Soporte Técnico de Misión Crítica"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Portal Maestro" }
            }}
        />
    );
}
