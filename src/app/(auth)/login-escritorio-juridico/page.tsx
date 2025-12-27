
"use client";

import { Gavel } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginEscritorioJuridicoPage() {
    const loginProps = {
        icon: Gavel,
        title: "Escritorio Jurídico",
        variant: "juridico" as const,
        description: "Acceso seguro para el departamento legal y socios.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "legal.user" },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••" },
            { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "/recover-legal", label: "¿Olvidaste tu contraseña?" } }
        ],
        submitButtonText: "Acceder al Escritorio Jurídico",
        submitButtonHref: "/login-legal-2fa",
        footerLinks: {
            text: "¿Necesitas acceso?",
            mainLink: { href: "/solicitud-acceso-legal", label: "Solicita tu cuenta aquí" },
            secondaryLinks: {
                title: "Otros Portales",
                links: loginOptions.filter(o => o.href !== '/login-escritorio-juridico')
            }
        }
    };

    return <LoginCard {...loginProps} />;
}
