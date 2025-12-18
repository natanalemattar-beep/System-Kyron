
"use client";

import { Cpu } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginInformaticaPage() {
  const loginProps = {
    icon: Cpu,
    title: "Ingeniería e Informática",
    description: "Acceso al dashboard de gestión de infraestructura y desarrollo.",
    variant: "tecnologia" as const,
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.it", defaultValue: "usuario.it" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder al Dashboard de IT",
    submitButtonHref: "/dashboard-informatica",
    credentials: { user: "usuario.it", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta de IT?",
      mainLink: { href: "/register/informatica", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-informatica')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
