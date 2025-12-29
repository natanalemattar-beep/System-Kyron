
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Briefcase } from "lucide-react";

export default function LoginRrhhPage() {
    return (
        <SpecializedLoginCard 
            portalName="Gestión de RR.HH." 
            portalDescription="Portal para la administración del talento humano y nóminas."
            redirectPath="/dashboard-rrhh"
            icon={Briefcase}
            demoUsername="rrhh.admin"
            demoPassword="password123"
        />
    );
}
