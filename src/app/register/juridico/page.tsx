
"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Building } from "lucide-react";

export default function RegisterJuridicoPage() {
    const registerProps = {
        icon: Building,
        title: "Registro de Persona Jurídica",
        description: "Crea la cuenta principal de tu empresa.",
        fields: [
            { id: "razonSocial", label: "Razón Social", type: "text" as const, placeholder: "Tu Empresa, C.A.", required: true },
            { id: "rif", label: "RIF de la Empresa", type: "text" as const, placeholder: "J-12345678-9", required: true },
            { id: "direccion", label: "Dirección Fiscal", type: "text" as const, placeholder: "Av. Principal, Edificio Centro, Piso 1, Caracas", required: true },
            { id: "legalName", label: "Nombres y Apellidos del Representante Legal", type: "text" as const, placeholder: "Juan Pérez", required: true },
            { id: "legalCi", label: "Cédula del Representante", type: "text" as const, placeholder: "V-12.345.678", required: true },
            { id: "email", label: "Correo Electrónico (Admin)", type: "email" as const, placeholder: "admin@tuempresa.com", required: true },
            { id: "password", label: "Contraseña Maestra", type: "password" as const, placeholder: "••••••••", required: true },
        ],
        submitButtonText: "Crear Cuenta Jurídica",
        footerLinkHref: "/login-fintech",
        footerLinkText: "Inicia sesión aquí",
    };

    return <RegisterForm {...registerProps} />;
}
