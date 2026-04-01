"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Cpu, Server, Shield, Monitor } from "lucide-react";

export default function LoginInformaticaPage() {
    return (
        <SpecializedLoginCard 
            portalName="Informática" 
            portalDescription="Centro de control tecnológico: infraestructura, ciberseguridad, soporte y respaldos empresariales."
            redirectPath="/dashboard-it"
            icon={Cpu}
            accentColor="primary"
            bgPattern={
                <div className="grid grid-cols-4 gap-10 p-10 opacity-20">
                    <Cpu className="h-20 w-20" />
                    <Server className="h-20 w-20" />
                    <Shield className="h-20 w-20" />
                    <Monitor className="h-20 w-20" />
                </div>
            }
            features={[
                "Monitoreo de Infraestructura 24/7",
                "Ciberseguridad ISO 27001",
                "Respaldos Automatizados 3-2-1"
            ]}
        />
    );
}
