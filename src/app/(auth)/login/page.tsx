

"use client";

import { User, Building, Briefcase, ShoppingCart } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const loginProps = {
    icon: User,
    title: "Acceso Personal",
    description: "Inicia sesión con tu documento de identidad y contraseña.",
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "idValue", label: "Cédula de Identidad", type: "text" as const, placeholder: "V-12345678", defaultValue: "V-12345678" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
      { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "/recover", label: "¿Olvidaste tu contraseña?" } }
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard",
    credentials: { user: "V-12345678", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/natural", label: "Crear una cuenta nueva" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login-fintech", label: "FinTech", icon: Building },
            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
            { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
