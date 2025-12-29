
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginEscritorioJuridicoPage() {
    return (
        <LoginCard 
            portalName="Escritorio Jurídico" 
            portalDescription="Acceso para el departamento legal y gestión de cumplimiento."
            redirectPath="/dashboard-juridico"
        />
    );
}
