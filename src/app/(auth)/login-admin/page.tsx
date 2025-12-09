
"use client";

import { Banknote, Building, Briefcase, ShoppingCart } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginAdminPage() {
   const loginProps = {
    icon: Banknote,
    title: "FinTech y Banca Digital",
    description: "Acceso al panel de control principal de la empresa.",
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "username", label: "Usuario (Admin)", type: "text" as const, placeholder: "admin.user", defaultValue: "admin.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
      { id: "remember-me", label: "Recuérdame", type: "checkbox" as const, rememberMe: true, link: { href: "#", label: "¿Olvidaste tu contraseña?" } }
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard-empresa",
    credentials: { user: "admin.user", password: "password123" },
  };

  return <LoginForm {...loginProps} />;
}
