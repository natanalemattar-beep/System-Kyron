
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Cpu } from "lucide-react";

export default function RegisterInformaticaPage() {
    const registerProps = {
        icon: Cpu,
        title: "Registro de Ingeniería e Informática",
        description: "Crea tu cuenta para el portal de gestión de IT.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "usuario.it", required: true, defaultValue: "usuario.it" },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "it@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true, defaultValue: "password123" },
        ],
        submitButtonText: "Crear Cuenta de IT",
        footerLinkHref: "/login-informatica",
        footerLinkText: "Inicia sesión aquí",
        credentials: { user: "usuario.it", password: "password123" }
    };

  return <RegisterForm {...registerProps} />;
}
