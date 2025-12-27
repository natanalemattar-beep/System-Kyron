
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Signal } from "lucide-react";

export default function RegisterTelecomPage() {
    const registerProps = {
        icon: Signal,
        title: "Registro de Telecomunicaciones",
        description: "Crea tu cuenta para el portal de gestión de redes y servicios.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.telecom", required: true },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "telecom@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
        ],
        submitButtonText: "Crear Cuenta de Telecom",
        footerLinkHref: "/login-telecom",
        footerLinkText: "Inicia sesión aquí"
    };

  return <RegisterForm {...registerProps} />;
}
