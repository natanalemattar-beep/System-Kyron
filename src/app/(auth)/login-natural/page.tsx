
"use client";

import { User, Building, Briefcase, ShoppingCart } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginNaturalPage() {
  const loginProps = {
    icon: User,
    title: "Acceso Personal",
    description: "Inicia sesión con tu documento de identidad.",
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "idValue", label: "Cédula de Identidad", type: "text" as const },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
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
