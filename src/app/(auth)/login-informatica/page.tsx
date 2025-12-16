
"use client";

import { Cpu, Building, ShoppingCart, Briefcase, Users, Megaphone, User, Gavel } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginInformaticaPage() {
  const loginProps = {
    icon: Cpu,
    title: "Ingeniería e Informática",
    description: "Acceso para el personal de tecnología y seguridad.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "dev.user", defaultValue: "dev.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard-informatica",
    credentials: { user: "dev.user", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/informatica", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login", label: "Personal", icon: User },
            { href: "/login-admin", label: "Admin", icon: Building },
            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
            { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
            { href: "/login-socios", label: "Socios", icon: Users },
            { href: "/login-marketing", label: "Marketing", icon: Megaphone },
            { href: "/login-escritorio-juridico", label: "Jurídico", icon: Gavel },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}

    