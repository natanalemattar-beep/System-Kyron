
"use client";

import { Briefcase } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginRrhhPage() {
  const loginProps = {
    icon: Briefcase,
    title: "Acceso RR.HH.",
    description: "Inicia sesión con tu usuario de Recursos Humanos.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.rrhh", defaultValue: "usuario.rrhh" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard-rrhh",
    credentials: { user: "usuario.rrhh", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/rrhh", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-rrhh')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
