
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Gavel } from "lucide-react";

export default function RegisterJuridicoPage() {
    const registerProps = {
        icon: Gavel,
        title: "Registro Jurídico",
        description: "Crea tu cuenta para el escritorio legal y de cumplimiento.",
        fields: [
            { id: "username", label: "Usuario (Legal)", type: "text" as const, placeholder: "legal.user", required: true, defaultValue: "legal.user" },
            { id: "email", label: "Correo Electrónico Corporativo", type: "email" as const, placeholder: "legal@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true, defaultValue: "password123" },
        ],
        submitButtonText: "Crear Cuenta Jurídica",
        footerLinkHref: "/login-juridico",
        footerLinkText: "Inicia sesión aquí",
        credentials: { user: "legal.user", password: "password123" }
    };

  return <RegisterForm {...registerProps} />;
}
