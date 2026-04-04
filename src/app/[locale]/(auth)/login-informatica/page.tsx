"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Cpu } from "lucide-react";

export default function LoginInformaticaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Informática" 
            portalDescription="Centro de control tecnológico: infraestructura, ciberseguridad, soporte y respaldos empresariales."
            redirectPath="/dashboard-it"
            icon={Cpu}
            accentColor="cyan-700"
            layoutVariant="dark-immersive"
            features={[
                "Monitoreo de Infraestructura 24/7",
                "Ciberseguridad ISO 27001",
                "Respaldos Automatizados 3-2-1"
            ]}
        />
    );
}
