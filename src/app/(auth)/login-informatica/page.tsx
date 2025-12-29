
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginInformaticaPage() {
    return (
        <LoginCard 
            portalName="Ingeniería e IT" 
            portalDescription="Control de infraestructura, seguridad y desarrollo."
            redirectPath="/dashboard-informatica"
        />
    );
}
