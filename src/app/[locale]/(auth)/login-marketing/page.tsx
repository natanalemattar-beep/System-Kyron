
"use client";

import { SpecializedLoginCard } from "@/components/auth/specialized-login-card";
import { Megaphone, TrendingUp, BarChart2 } from "lucide-react";

export default function LoginMarketingPage() {
    return (
        <SpecializedLoginCard 
            portalName="Marketing IA" 
            portalDescription="Estrategias comerciales, alertas de inversión y análisis de mercado en tiempo real."
            redirectPath="/marketing"
            icon={Megaphone}
            accentColor="primary"
            bgPattern={
                <div className="flex flex-col gap-16 p-16 opacity-15">
                    <Megaphone className="h-20 w-20" />
                    <TrendingUp className="h-20 w-20 ml-20" />
                    <BarChart2 className="h-20 w-20" />
                </div>
            }
            features={[
                "Alertas de Inversión en Tiempo Real",
                "Análisis Bursátil e Índices de Mercado",
                "Bienes Inmuebles y Alternativas de Crédito"
            ]}
            footerLinks={{
              primary: { href: "/login", text: "Volver al selector de portales" },
            }}
        />
    );
}
