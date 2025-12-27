
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Briefcase } from "lucide-react";

export default function RegisterRrhhPage() {
    const registerProps = {
        icon: Briefcase,
        title: "Registro de RR.HH.",
        description: "Crea tu cuenta para el portal de gestión de talento humano.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.rrhh", required: true },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "rrhh@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
        ],
        submitButtonText: "Crear Cuenta de RR.HH.",
        footerLinkHref: "/login-rrhh",
        footerLinkText: "Inicia sesión aquí"
    };

  return <RegisterForm {...registerProps} />;
}
