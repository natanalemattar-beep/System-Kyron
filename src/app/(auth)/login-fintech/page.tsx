
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginFintechPage() {
    return (
        <LoginCard 
            portalName="Centro de Contabilidad" 
            portalDescription="Dashboard de gestión financiera y contable para empresas."
            redirectPath="/contabilidad"
        />
    );
}
