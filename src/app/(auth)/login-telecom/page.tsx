
"use client";

import { Signal } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginTelecomPage() {
  const loginProps = {
    icon: Signal,
    title: "Portal de Telecomunicaciones",
    description: "Acceso para la gestión de redes y servicios.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "telecom.user", defaultValue: "telecom.user" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard-telecom",
    credentials: { user: "telecom.user", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta?",
      mainLink: { href: "/register/telecom", label: "Regístrate aquí" },
    }
  };

  return <LoginForm {...loginProps} />;
}
