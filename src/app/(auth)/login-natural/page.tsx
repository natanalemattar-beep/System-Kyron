
"use client";

import { User, Building, Briefcase, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginNaturalPage() {
  const loginProps = {
    icon: User,
    title: "Acceso Personal",
    description: "Inicia sesión con tu documento de identidad.",
    fields: [
      { id: "country", label: "País", type: "select" as const },
      { id: "idValue", label: "Cédula de Identidad", type: "text" as const },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder",
    submitButtonHref: "/dashboard",
    credentials: { user: "V-12345678", password: "password123" },
    footerContent: (
      <>
        <p className="text-muted-foreground">¿No eres el tipo de usuario correcto?</p>
        <div className="flex justify-center gap-4">
          <Link href="/login-fintech" className="font-medium text-primary hover:underline flex items-center gap-1">
            <Building className="h-4 w-4" /> FinTech
          </Link>
          <Link href="/login-ventas" className="font-medium text-primary hover:underline flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" /> Ventas
          </Link>
          <Link href="/login-rrhh" className="font-medium text-primary hover:underline flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> RR.HH.
          </Link>
        </div>
        <Separator className="my-2" />
        <Link href="/register/natural" className="font-medium text-primary hover:underline">
          Crear una cuenta nueva
        </Link>
      </>
    )
  };

  return <LoginForm {...loginProps} />;
}
