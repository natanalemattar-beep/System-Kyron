
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Briefcase } from "lucide-react";

export default function RegisterRrhhPage() {
    const registerProps = {
        icon: Briefcase,
        title: "Registro de RR.HH.",
        description: "Crea tu cuenta para el portal de gestión de talento humano.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.rrhh", required: true, defaultValue: "usuario.rrhh" },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "rrhh@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true, defaultValue: "password123" },
        ],
        submitButtonText: "Crear Cuenta de RR.HH.",
        footerLinkHref: "/login-rrhh",
        footerLinkText: "Inicia sesión aquí",
        credentials: { user: "usuario.rrhh", password: "password123" }
    };

  return <RegisterForm {...registerProps} />;
}
