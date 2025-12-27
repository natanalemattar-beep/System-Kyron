
"use client";

import { User } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginPersonalPage() {
    const loginProps = {
        icon: User,
        title: "Acceso Personal",
        variant: "default" as const,
        description: "Acceso para clientes individuales y gestión de trámites personales.",
        fields: [
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "tu@correo.com", defaultValue: "usuario@kyron.com" },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
            { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "/recover-personal", label: "¿Olvidaste tu contraseña?" } }
        ],
        submitButtonText: "Acceder al Portal Personal",
        submitButtonHref: "/dashboard",
        credentials: { user: "usuario@kyron.com", password: "password123" },
        footerLinks: {
            text: "¿No tienes una cuenta?",
            mainLink: { href: "/register/natural", label: "Regístrate aquí" },
             secondaryLinks: {
                title: "Otros Portales",
                links: loginOptions.filter(o => o.href !== '/login-personal')
            }
        }
    };

    return <LoginCard {...loginProps} />;
}

    