

"use client";

import { Banknote, User } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginFintechPage() {
   const loginProps = {
    icon: Banknote,
    title: "Centro de Contabilidad",
    description: "Acceso al dashboard contable y reportes financieros.",
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "username", label: "Usuario (Contador/Admin)", type: "text" as const, placeholder: "admin.user", defaultValue: "admin.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
      { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "/recover-fintech", label: "¿Olvidaste tu contraseña?" } }
    ],
    submitButtonText: "Acceder al Centro de Contabilidad",
    submitButtonHref: "/contabilidad",
    credentials: { user: "admin.user", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta de empresa?",
      mainLink: { href: "/register/juridica", label: "Regístra tu empresa aquí" },
       secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login", label: "Personal", icon: User },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
