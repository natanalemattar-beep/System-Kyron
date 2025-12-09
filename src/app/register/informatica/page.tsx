
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Cpu } from "lucide-react";

export default function RegisterInformaticaPage() {
    const registerProps = {
        icon: Cpu,
        title: "Registro de Ingeniería e Informática",
        description: "Crea tu cuenta para el personal de tecnología y seguridad.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "dev.user", required: true, defaultValue: "dev.user" },
            { id: "email", label: "Correo Electrónico Corporativo", type: "email" as const, placeholder: "dev@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true, defaultValue: "password123" },
        ],
        submitButtonText: "Crear Cuenta de IT",
        footerLinkHref: "/login-informatica",
        footerLinkText: "Inicia sesión aquí",
        credentials: { user: "dev.user", password: "password123" }
    };

  return <RegisterForm {...registerProps} />;
}
