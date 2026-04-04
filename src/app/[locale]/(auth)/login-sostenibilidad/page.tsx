
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Recycle } from "lucide-react";

export default function LoginSostenibilidadPage() {
    return (
        <SpecializedLoginCard 
            portalName="Sostenibilidad" 
            portalDescription="Gestión de activos verdes y mercado de compensación ambiental."
            redirectPath="/sostenibilidad"
            icon={Recycle}
            accentColor="emerald-800"
            layoutVariant="stacked"
            features={[
                "Telemetría Ameru IA",
                "Exchange de Eco-Créditos",
                "Certificación Carbono Neutral"
            ]}
        />
    );
}
