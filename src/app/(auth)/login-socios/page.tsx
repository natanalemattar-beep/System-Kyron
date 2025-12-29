
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginSociosPage() {
    return (
        <LoginCard 
            portalName="Portal de Socios" 
            portalDescription="Dashboard de supervisión para socios y junta directiva."
            redirectPath="/dashboard-socios"
        />
    );
}
