
"use client";

import { Megaphone } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginMarketingPage() {
  const loginProps = {
    icon: Megaphone,
    title: "Marketing y Crecimiento",
    description: "Accede al dashboard de gestión de campañas y análisis de mercado.",
    variant: "ventas" as const,
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.marketing", defaultValue: "usuario.marketing" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder al Portal de Marketing",
    submitButtonHref: "/asesoria-publicidad",
    credentials: { user: "usuario.marketing", password: "password123" },
    footerLinks: {
      text: "¿No tienes acceso?",
      mainLink: { href: "/register/marketing", label: "Crea una cuenta aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-marketing')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
