
"use client";

import { Gavel, User, Building, ShoppingCart, Briefcase, Users, Megaphone, Cpu } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginEscritorioJuridicoPage() {
  const loginProps = {
    icon: Gavel,
    title: "Escritorio Jurídico",
    description: "Acceso exclusivo para el departamento legal y socios.",
    fields: [
      { id: "username", label: "Usuario Legal", type: "text" as const, placeholder: "legal.user", defaultValue: "legal.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
      { id: "remember-me", label: "Recordar este dispositivo", type: "checkbox" as const, rememberMe: true, link: { href: "/recover-legal", label: "¿Olvidó su credencial?" } }
    ],
    submitButtonText: "Verificar Credenciales",
    submitButtonHref: "/legal/dashboard-juridico",
    credentials: { user: "legal.user", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/juridico", label: "Solicita acceso aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: [
            { href: "/login", label: "Personal", icon: User },
            { href: "/login-fintech", label: "FinTech", icon: Building },
            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
            { href: "/login-rrhh", label: "RR.HH.", icon: Briefcase },
            { href: "/login-socios", label: "Socios", icon: Users },
            { href: "/login-marketing", label: "Marketing", icon: Megaphone },
            { href: "/login-informatica", label: "Informática", icon: Cpu },
        ]
      }
    }
  };

  return <LoginForm {...loginProps} />;
}
