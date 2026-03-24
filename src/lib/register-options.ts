
import { User, Gavel, ShoppingCart, Briefcase, Users, Cpu, Banknote, Signal, Recycle, Megaphone } from "lucide-react";

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
        label: "Contabilidad",
        icon: Banknote,
        description: "Registro empresarial con acceso a gestión financiera, impuestos y balances.",
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
        href: "/register/rrhh",
        label: "Recursos Humanos",
        icon: Briefcase,
        description: "Administración de nóminas, beneficios y expedientes de personal.",
        badge: "RRHH",
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
    {
        href: "/register/juridico",
        label: "Ingeniería e IT",
        icon: Cpu,
        description: "Control de infraestructura tecnológica, planos y presupuestos técnicos.",
        badge: "IT",
    },
    {
        href: "/register/juridico",
        label: "Marketing IA",
        icon: Megaphone,
        description: "Estrategias comerciales, alertas de inversión y análisis de mercado potenciados por IA.",
        badge: "Marketing",
    },
];
