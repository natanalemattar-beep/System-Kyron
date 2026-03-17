
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Smartphone } from "lucide-react";

export default function LoginLineaPersonalPage() {
    return (
        <SpecializedLoginCard 
            portalName="Mi Línea Personal" 
            portalDescription="Gestión individual de tu línea móvil, recargas y consumo de datos."
            redirectPath="/mi-linea"
            icon={Smartphone}
            demoUsername="carlos@kyron.com"
            demoPassword="password123"
            features={[
                "Activación de eSIM Individual",
                "Recargas de Saldo Prepago",
                "Monitor de Consumo 5G"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver al selector de portales" }
            }}
        />
    );
}
