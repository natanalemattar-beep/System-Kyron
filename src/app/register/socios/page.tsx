
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Users } from "lucide-react";

export default function RegisterSociosPage() {
  const registerProps = {
    icon: Users,
    title: "Registro de Socios",
    description: "Crea tu cuenta para el portal de socios y directivos.",
    fields: [
        { id: "inviteCode", label: "Código de Invitación del Holding", type: "text" as const, placeholder: "Código exclusivo para socios", required: true },
        { id: "fullName", label: "Nombres y Apellidos", type: "text" as const, placeholder: "Ej: Ana Pérez", required: true },
        { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "socio@tuempresa.com", required: true },
        { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
    ],
    submitButtonText: "Crear Cuenta de Socio",
    footerLinkHref: "/login-socios",
    footerLinkText: "Inicia sesión aquí"
  };

  return <RegisterForm {...registerProps} />;
}
