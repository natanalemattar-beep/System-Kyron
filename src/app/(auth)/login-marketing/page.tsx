
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginMarketingPage() {
    return (
        <LoginCard 
            portalName="Marketing y Crecimiento" 
            portalDescription="Herramientas de análisis y gestión de campañas."
            redirectPath="/analisis-mercado"
        />
    );
}
