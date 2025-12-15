
"use client";

import { Megaphone, Building, ShoppingCart, Briefcase, Users, Cpu, Gavel, User } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginMarketingPage() {
  const loginProps = {
    icon: Megaphone,
    title: "Productos y Marketing",
    description: "Accede al portal de gestión de marketing y asesoría.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.marketing", defaultValue: "usuario.marketing" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/asesoria-publicidad",
    credentials: { user: "usuario.marketing", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/marketing", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login", label: "Personal", icon: User },
            { href: "/login-admin", label: "Admin", icon: Building },
            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
            { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
            { href: "/login-socios", label: "Socios", icon: Users },
            { href: "/login-informatica", label: "IT", icon: Cpu },
            { href: "/login-escritorio-juridico", label: "Jurídico", icon: Gavel },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
