
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginRrhhPage() {
    return (
        <LoginCard 
            portalName="Gestión de RR.HH." 
            portalDescription="Portal para la administración del talento humano y nóminas."
            redirectPath="/dashboard-rrhh"
        />
    );
}
