
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { ShoppingCart } from "lucide-react";

export default function RegisterVentasPage() {
    const registerProps = {
        icon: ShoppingCart,
        title: "Registro de Ventas",
        description: "Crea tu cuenta de cajero o vendedor.",
        fields: [
            { id: "username", label: "Usuario", type: "text" as const, placeholder: "cajero.1", required: true },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "cajero1@tuempresa.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", required: true },
        ],
        submitButtonText: "Crear Cuenta de Ventas",
        footerLinkHref: "/login-ventas",
        footerLinkText: "Inicia sesión aquí"
    };

  return <RegisterForm {...registerProps} />;
}
