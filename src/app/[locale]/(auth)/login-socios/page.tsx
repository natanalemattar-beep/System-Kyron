
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Users } from "lucide-react";

export default function LoginSociosPage() {
    return (
        <SpecializedLoginCard 
            portalName="Portal de Socios" 
            portalDescription="Dashboard de supervisión para socios y junta directiva."
            redirectPath="/dashboard-socios"
            icon={Users}
            demoUsername="socio.principal"
            demoPassword="password123"
        />
    );
}
