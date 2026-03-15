"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Banknote } from "lucide-react";

export default function LoginEmpresaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Contabilidad" 
            portalDescription="Gestión financiera, impuestos y balances automatizados para empresas."
            redirectPath="/resumen-negocio"
            icon={Banknote}
            demoUsername="admin"
            demoPassword="kyron2026"
            features={[
                "Automatización Fiscal (IVA/ISLR)",
                "Balances Generales en Tiempo Real",
                "Conciliación Bancaria Inteligente"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Ver otros portales de acceso" }
            }}
        />
    );
}
