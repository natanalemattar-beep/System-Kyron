
"use client";

import { Briefcase, User, Building, ShoppingCart, Users, Megaphone, Cpu } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

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
      text: "¿No perteneces a RR.HH.?",
      mainLink: { href: "", label: "" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login", label: "Personal", icon: User },
            { href: "/login-fintech", label: "FinTech", icon: Building },
            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
            { href: "/login-socios", label: "Socios", icon: Users },
            { href: "/login-marketing", label: "Marketing", icon: Megaphone },
            { href: "/login-informatica", label: "IT", icon: Cpu },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
