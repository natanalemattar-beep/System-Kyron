
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginTelecomPage() {
    return (
        <LoginCard 
            portalName="Gestión de Telecom" 
            portalDescription="Administración de redes, líneas y servicios de conectividad."
            redirectPath="/dashboard-telecom"
        />
    );
}
