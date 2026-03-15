"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Gavel } from "lucide-react";

export default function LoginEscritorioJuridicoPage() {
    return (
        <SpecializedLoginCard 
            portalName="Asesoría Legal" 
            portalDescription="Gestión de contratos, trámites mercantiles y cumplimiento regulatorio."
            redirectPath="/escritorio-juridico"
            icon={Gavel}
            demoUsername="admin"
            demoPassword="kyron2026"
            features={[
                "Generador de Contratos con IA",
                "Bóveda de Documentos Certificados",
                "Control de Vencimientos de Poderes"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver" }
            }}
        />
    );
}
