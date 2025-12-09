
"use client";

import { ShoppingCart, User, Briefcase, Building, Users, Megaphone, Cpu, Gavel } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginVentasPage() {
  const loginProps = {
    icon: ShoppingCart,
    title: "Acceso a Ventas",
    description: "Inicia sesión con tu usuario de cajero o vendedor.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "cajero.1", defaultValue: "cajero.1" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder al Dashboard de Ventas",
    submitButtonHref: "/analisis-ventas",
    credentials: { user: "cajero.1", password: "password123" },
    footerLinks: {
      text: "¿No eres vendedor? Accede a otro portal:",
      mainLink: { href: "", label: "" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
          { href: "/login", label: "Personal", icon: User },
          { href: "/login-fintech", label: "FinTech", icon: Building },
          { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
          { href: "/login-socios", label: "Socios", icon: Users },
          { href: "/login-marketing", label: "Marketing", icon: Megaphone },
          { href: "/login-informatica", label: "IT", icon: Cpu },
          { href: "/login-juridico", label: "Jurídico", icon: Gavel },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
