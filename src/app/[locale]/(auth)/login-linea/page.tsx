
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Smartphone } from "lucide-react";

export default function LoginLineaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Gestión de Línea 5G" 
            portalDescription="Portal de autogestión para usuarios de telefonía y datos Kyron."
            redirectPath="/mi-linea"
            icon={Smartphone}
            demoUsername="usuario.5g"
            demoPassword="password123"
            features={[
                "Monitor de Consumo en Tiempo Real",
                "Recargas Inmediatas Multimoneda",
                "Activación de Servicios Roaming"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Ver otros portales" }
            }}
        />
    );
}
