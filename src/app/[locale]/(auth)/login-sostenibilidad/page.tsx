
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Recycle } from "lucide-react";

export default function LoginSostenibilidadPage() {
    return (
        <SpecializedLoginCard 
            portalName="Sostenibilidad" 
            portalDescription="Gestión de activos verdes, telemetría de Smart Bins y mercado de Eco-Créditos."
            redirectPath="/sostenibilidad"
            icon={Recycle}
            demoUsername="eco.manager"
            demoPassword="password123"
            features={[
                "Control de Puntos de Reciclaje",
                "Exchange de Bonos de Carbono",
                "Emisión de Certificados Ambientales"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Ver otros portales" }
            }}
        />
    );
}
