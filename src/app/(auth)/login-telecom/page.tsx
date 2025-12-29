
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Signal } from "lucide-react";


export default function LoginTelecomPage() {
    return (
        <SpecializedLoginCard 
            portalName="Gestión de Telecom" 
            portalDescription="Administración de redes, líneas y servicios de conectividad."
            redirectPath="/dashboard-telecom"
            icon={Signal}
            demoUsername="telecom.noc"
            demoPassword="password123"
        />
    );
}
