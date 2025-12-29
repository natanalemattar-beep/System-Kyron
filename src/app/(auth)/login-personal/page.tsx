
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginPersonalPage() {
    return (
        <LoginCard 
            portalName="Acceso Personal" 
            portalDescription="Portal para clientes individuales y trámites personales."
            redirectPath="/dashboard"
        />
    );
}
