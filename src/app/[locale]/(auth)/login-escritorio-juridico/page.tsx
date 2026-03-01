
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Gavel } from "lucide-react";

export default function LoginEscritorioJuridicoPage() {
    return (
        <SpecializedLoginCard 
            portalName="Escritorio Jurídico" 
            portalDescription="Acceso para el departamento legal y gestión de cumplimiento."
            redirectPath="/escritorio-juridico"
            icon={Gavel}
            demoUsername="legal.admin"
            demoPassword="password123"
            footerLinks={{
              primary: { href: "/recover-legal", text: "¿Problemas para acceder?" },
              secondaryLinks: {
                title: "¿No tienes una cuenta?",
                links: [{ href: "/solicitud-acceso-legal", text: "Solicitar Acceso" }]
              }
            }}
        />
    );
}
