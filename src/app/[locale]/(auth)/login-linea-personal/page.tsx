
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Smartphone, Wifi, Signal } from "lucide-react";

export default function LoginLineaPersonalPage() {
    return (
        <SpecializedLoginCard 
            portalName="Mi Línea Personal" 
            portalDescription="Gestión individual de tu línea móvil, recargas y consumo de datos 5G."
            redirectPath="/mi-linea"
            icon={Smartphone}
            accentColor="primary"
            demoUsername="carlos@kyron.com"
            demoPassword="password123"
            bgPattern={
                <div className="flex flex-col gap-16 p-16 opacity-15">
                    <Wifi className="h-20 w-20" />
                    <Smartphone className="h-20 w-20 ml-20" />
                    <Signal className="h-20 w-20" />
                </div>
            }
            features={[
                "Activación de eSIM Individual",
                "Recargas de Saldo Prepago",
                "Monitor de Consumo 5G"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver al selector de portales" },
              secondaryLinks: {
                title: "¿Eres una empresa?",
                links: [{ href: "/login-linea-empresa", text: "Ir a Gestión de Flota" }]
              }
            }}
        />
    );
}
