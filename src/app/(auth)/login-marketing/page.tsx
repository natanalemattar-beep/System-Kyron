
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Megaphone } from "lucide-react";

export default function LoginMarketingPage() {
    return (
        <SpecializedLoginCard 
            portalName="Marketing y Crecimiento" 
            portalDescription="Herramientas de análisis y gestión de campañas."
            redirectPath="/analisis-mercado"
            icon={Megaphone}
            demoUsername="marketing.user"
            demoPassword="password123"
        />
    );
}
