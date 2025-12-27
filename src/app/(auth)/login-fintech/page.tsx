
"use client";

import { Banknote } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginFintechPage() {
   const loginProps = {
    icon: Banknote,
    title: "Centro de Contabilidad",
    description: "Acceso al dashboard contable y reportes financieros.",
    variant: "fintech" as const,
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "username", label: "Usuario (Contador/Admin)", type: "text" as const, placeholder: "admin.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••" },
      { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "/recover-fintech", label: "¿Olvidaste tu contraseña?" } }
    ],
    submitButtonText: "Acceder al Centro de Contabilidad",
    submitButtonHref: "/contabilidad",
    footerLinks: {
      text: "¿No tienes una cuenta de empresa?",
      mainLink: { href: "/register/juridica", label: "Regístra tu empresa aquí" },
       secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-fintech')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
