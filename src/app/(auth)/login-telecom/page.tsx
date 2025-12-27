
"use client";

import { Signal } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginTelecomPage() {
  const loginProps = {
    icon: Signal,
    title: "Gestión de Telecom",
    description: "Acceso al portal de administración de redes y servicios de conectividad.",
    variant: "tecnologia" as const,
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.telecom" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••" },
    ],
    submitButtonText: "Acceder al Dashboard",
    submitButtonHref: "/dashboard-telecom",
    footerLinks: {
      text: "¿No tienes una cuenta de Telecom?",
      mainLink: { href: "/register/telecom", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-telecom')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
