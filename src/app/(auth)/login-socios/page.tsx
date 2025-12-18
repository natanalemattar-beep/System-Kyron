
"use client";

import { Users } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginSociosPage() {
  const loginProps = {
    icon: Users,
    title: "Portal de Socios",
    description: "Acceso para socios, directivos e inversores del holding.",
    variant: "fintech" as const,
    fields: [
      { id: "username", label: "Correo Electrónico", type: "email" as const, placeholder: "socio@kyron.com", defaultValue: "socio@kyron.com" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder al Centro de Mando",
    submitButtonHref: "/socios/dashboard-socios",
    credentials: { user: "socio@kyron.com", password: "password123" },
    footerLinks: {
      text: "¿Aún no tienes acceso?",
      mainLink: { href: "/register/socios", label: "Usa tu código de invitación" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-socios')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
