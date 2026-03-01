
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Cpu } from "lucide-react";

export default function LoginInformaticaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Ingeniería e IT" 
            portalDescription="Control de infraestructura, seguridad y desarrollo."
            redirectPath="/dashboard-informatica"
            icon={Cpu}
            demoUsername="it.admin"
            demoPassword="password123"
        />
    );
}
