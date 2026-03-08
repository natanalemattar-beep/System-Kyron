
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Megaphone } from "lucide-react";

export default function LoginMarketingPage() {
    return (
        <SpecializedLoginCard 
            portalName="Marketing IA" 
            portalDescription="Estrategias comerciales y análisis de mercado potenciados por IA."
            redirectPath="/analisis-ventas"
            icon={Megaphone}
            demoUsername="marketing.user"
            demoPassword="password123"
            features={[
                "Generador de Estrategias de Venta",
                "Análisis de Competencia en Vivo",
                "Optimización de Campañas Digitales"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver" }
            }}
        />
    );
}
