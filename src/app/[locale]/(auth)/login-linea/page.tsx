
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Smartphone } from "lucide-react";

/**
 * @fileOverview Portal de Acceso para Mi Línea 5G.
 * Implementa el protocolo de autenticación para la gestión de conectividad ciudadana.
 */

export default function LoginLineaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Mi Línea 5G" 
            portalDescription="Gestión de conectividad, recargas de saldo y aprovisionamiento de perfiles eSIM."
            redirectPath="/mi-linea"
            icon={Smartphone}
            demoUsername="carlos@kyron.com"
            demoPassword="password123"
            features={[
                "Activación Remota de eSIM",
                "Telemetría de Datos en Tiempo Real",
                "Gestión Multi-Línea Unificada",
                "Recargas de Saldo con Cripto/VES"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver a la selección de portal" }
            }}
        />
    );
}
