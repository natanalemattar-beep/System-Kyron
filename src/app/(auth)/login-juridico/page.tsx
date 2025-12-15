
"use client";

import { Gavel, Building, ShoppingCart, Briefcase, Users, Megaphone, Cpu, User, Banknote } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginJuridicoPage() {
  const loginProps = {
    icon: Gavel,
    title: "Escritorio Jurídico",
    description: "Acceso para el departamento legal y de cumplimiento.",
    fields: [
      { id: "username", label: "Usuario (Legal)", type: "text" as const, placeholder: "legal.user", defaultValue: "legal.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/escritorio-juridico",
    credentials: { user: "legal.user", password: "password123" },
    footerLinks: {
      text: "¿No eres del departamento legal? Accede a otro portal:",
      secondaryLinks: {
        title: "Otros Portales",
        links: [
          { href: "/login", label: "Personal", icon: User },
          { href: "/login-fintech", label: "FinTech/Admin", icon: Banknote },
          { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
          { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
          { href: "/login-socios", label: "Socios", icon: Users },
          { href: "/login-marketing", label: "Marketing", icon: Megaphone },
          { href: "/login-informatica", label: "IT", icon: Cpu },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
