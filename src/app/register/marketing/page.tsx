
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Megaphone } from "lucide-react";

export default function RegisterMarketingPage() {
  const registerProps = {
    icon: Megaphone,
    title: "Registro de Productos y Marketing",
    description: "Crea tu cuenta para el portal de gestión de marketing y asesoría.",
    fields: [
      { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.marketing", required: true },
      { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "marketing@tuempresa.com", required: true },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
    ],
    submitButtonText: "Crear Cuenta de Marketing",
    footerLinkHref: "/login-marketing",
    footerLinkText: "Inicia sesión aquí"
  };

  return <RegisterForm {...registerProps} />;
}
