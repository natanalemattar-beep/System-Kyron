
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Signal } from "lucide-react";

export default function LoginTelecomPage() {
    return (
        <SpecializedLoginCard 
            portalName="Telecomunicaciones" 
            portalDescription="Gestión de líneas 5G, planes de datos y aprovisionamiento eSIM."
            redirectPath="/dashboard-telecom"
            icon={Signal}
            demoUsername="telecom.admin"
            demoPassword="password123"
            features={[
                "Activación Remota de eSIM",
                "Control de Consumo en Tiempo Real",
                "Gestión de Flota de Datos 5G"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Ver otros servicios" }
            }}
        />
    );
}
