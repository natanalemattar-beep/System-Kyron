
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Gavel } from "lucide-react";

export default function RegisterJuridicoPage() {
    const registerProps = {
        icon: Gavel,
        title: "Registro de Escritorio Jurídico",
        description: "Este portal es de acceso restringido. Por favor, solicita acceso a través del formulario correspondiente.",
        fields: [],
        submitButtonText: "Solicitar Acceso al Portal",
        footerLinkHref: "/login-escritorio-juridico",
        footerLinkText: "Si ya tienes una cuenta, inicia sesión aquí"
    };

  return <RegisterForm {...registerProps} />;
}
