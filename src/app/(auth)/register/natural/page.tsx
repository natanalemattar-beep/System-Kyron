

"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { User } from "lucide-react";

export default function RegisterNaturalPage() {
    const registerProps = {
        icon: User,
        title: "Registro Personal",
        description: "Crea tu cuenta para gestionar tus trámites personales.",
        fields: [
            { id: "country", label: "País", type: "select" as const, required: true },
            { id: "idNumber", label: "Identificación", type: "text" as const, required: true },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "tu@correo.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
        ],
        submitButtonText: "Crear Cuenta",
        footerLinkHref: "/login",
        footerLinkText: "Inicia sesión aquí",
        credentials: { user: "V-12345678", password: "password123" }
    };

    return <RegisterForm {...registerProps} />;
}
