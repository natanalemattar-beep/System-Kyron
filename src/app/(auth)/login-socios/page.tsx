
"use client";

import { Users, Building, ShoppingCart, Briefcase, Megaphone, Cpu, Gavel, User } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginSociosPage() {
  const loginProps = {
    icon: Users,
    title: "Portal de Socios",
    description: "Acceso exclusivo para socios y directivos.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.socio", defaultValue: "usuario.socio" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard-socios",
    credentials: { user: "usuario.socio", password: "password123" },
    footerLinks: {
      text: "¿No eres socio? Accede a otro portal:",
      mainLink: { href: "", label: "" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
          { href: "/login", label: "Personal", icon: User },
          { href: "/login-admin", label: "Admin", icon: Building },
          { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
          { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
          { href: "/login-marketing", label: "Marketing", icon: Megaphone },
          { href: "/login-informatica", label: "IT", icon: Cpu },
          { href: "/login-juridico", label: "Jurídico", icon: Gavel },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
