
"use client";

import { LoginForm } from "@/components/auth/login-form";
import { User } from "lucide-react";

export default function LoginPage() {
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
      mainLink: { href: "/register/natural", label: "Crea una cuenta aquí" },
    }
  };

  return <LoginForm {...loginProps} />;
}
