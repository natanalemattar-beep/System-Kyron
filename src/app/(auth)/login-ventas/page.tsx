
"use client";

import { ShoppingCart } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { loginOptions } from "@/lib/login-options";

export default function LoginVentasPage() {
  const loginProps = {
    icon: ShoppingCart,
    title: "Portal de Ventas",
    description: "Acceso para cajeros, vendedores y analistas de ventas.",
    variant: "ventas" as const,
    fields: [
      { id: "username", label: "Usuario (Cajero/Vendedor)", type: "text" as const, placeholder: "cajero.1", defaultValue: "cajero.1" },
      { id: "password", label: "Contraseña", type: "password" as const, placeholder: "••••••••", defaultValue: "password123" },
    ],
    submitButtonText: "Acceder al Portal de Ventas",
    submitButtonHref: "/analisis-ventas",
    credentials: { user: "cajero.1", password: "password123" },
    footerLinks: {
      text: "¿No tienes una cuenta de ventas?",
      mainLink: { href: "/register/ventas", label: "Regístrate aquí" },
      secondaryLinks: {
        title: "Otros Portales",
        links: loginOptions.filter(o => o.href !== '/login-ventas')
      }
    }
  };

  return <LoginCard {...loginProps} />;
}
