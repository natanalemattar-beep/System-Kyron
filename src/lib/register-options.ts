
import { User, Gavel, ShoppingCart, Users, Banknote, Signal, Recycle } from "lucide-react";

export const registerOptions = [
    {
        href: "/register/natural",
        label: "Cuenta Personal",
        icon: User,
        description: "Registro individual para ciudadanos. Accede al portal personal con tu cédula de identidad.",
        badge: "Ciudadano",
    },
    {
        href: "/register/telecom",
        label: "Mis Líneas",
        icon: Signal,
        description: "Registro para gestionar tu línea personal y la flota corporativa de empresa.",
        badge: "Telecom",
    },
    {
        href: "/register/contabilidad",
        label: "Asesoría Contable",
        icon: Banknote,
        description: "Contabilidad, nómina, RRHH, ingeniería y marketing integrados en un solo módulo.",
        badge: "Empresa",
    },
    {
        href: "/register/juridico",
        label: "Asesoría Legal",
        icon: Gavel,
        description: "Registro para control de contratos, documentos legales y trámites ante registros.",
        badge: "Legal",
    },
    {
        href: "/register/juridico",
        label: "Facturación",
        icon: ShoppingCart,
        description: "Acceso al punto de venta para cobros rápidos, control de inventario y ventas.",
        badge: "Ventas",
    },
    {
        href: "/register/juridico",
        label: "Socios y Directivos",
        icon: Users,
        description: "Supervisión estratégica, reparto de beneficios y análisis de rentabilidad.",
        badge: "Directivos",
    },
    {
        href: "/register/sostenibilidad",
        label: "Sostenibilidad",
        icon: Recycle,
        description: "Gestión ambiental, Eco-Créditos y tecnología de reciclaje inteligente.",
        badge: "Ambiental",
    },
];
