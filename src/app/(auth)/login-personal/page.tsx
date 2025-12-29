
"use client";

import { LoginCard } from "@/components/auth/login-card";

export default function LoginPersonalPage() {
    const loginProps = {
        portalName: "Acceso Personal",
        portalDescription: "Portal para clientes individuales y trámites personales.",
        redirectPath: "/dashboard-empresa",
        footerLinks: {
            primary: { href: "/recover-personal", text: "¿Olvidaste tu contraseña?" },
            secondaryLinks: {
                title: "¿No tienes una cuenta?",
                links: [{ href: "/register/natural", text: "Crear cuenta personal" }]
            }
        }
    };
    
    return <LoginCard {...loginProps} />;
}
