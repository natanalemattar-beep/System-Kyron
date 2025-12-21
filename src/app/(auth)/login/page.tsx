"use client";

import { User } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginPage() {
    const loginProps = {
        icon: User,
        title: "Acceso Personal",
        description: "Accede a tu portal para gestionar tus trámites y documentos personales.",
        fields: [
            { id: "country", label: "País", type: "select" as const, required: true },
            { id: "idValue", label: "Identificación Personal", type: "text" as const, placeholder: "V-12345678", defaultValue: "V-12345678" },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
        ],
        submitButtonText: "Acceder al Portal Personal",
        submitButtonHref: "/dashboard",
        credentials: { user: "V-12345678", password: "password123" },
        footerLinks: {
            text: "¿No tienes una cuenta?",
            mainLink: { href: "/register/natural", label: "Regístrate aquí" },
            secondaryLinks: {
                title: "Acceso a Otros Portales",
                links: loginOptions.filter(o => o.href !== '/login')
            }
        }
    };

    return <LoginCard {...loginProps} />;
}
