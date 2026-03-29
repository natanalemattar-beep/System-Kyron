
import { User, Gavel, ShoppingCart, Users, Banknote, Signal, Recycle } from "lucide-react";

export const loginOptions = [
    { 
        href: "/login-personal", 
        label: "Cuenta Personal", 
        icon: User, 
        description: "Acceso a sus documentos de identidad, trámites civiles y servicios de salud." 
    },
    { 
        href: "/login-linea", 
        label: "Mis Líneas", 
        icon: Signal, 
        description: "Portal unificado para gestionar tu línea personal y la flota corporativa de empresa." 
    },
    { 
        href: "/login-empresa", 
        label: "Asesoría Contable", 
        icon: Banknote, 
        description: "Contabilidad, nómina, RRHH, ingeniería y marketing integrados en un solo módulo." 
    },
    { 
        href: "/login-escritorio-juridico", 
        label: "Asesoría Legal", 
        icon: Gavel, 
        description: "Control de contratos, documentos legales y trámites ante registros." 
    },
    { 
        href: "/login-ventas", 
        label: "Facturación", 
        icon: ShoppingCart, 
        description: "Punto de venta para cobros rápidos, control de inventario y ventas." 
    },
    { 
        href: "/login-socios", 
        label: "Socios y Directivos", 
        icon: Users, 
        description: "Supervisión estratégica, reparto de beneficios y análisis de rentabilidad." 
    },
    { 
        href: "/login-sostenibilidad", 
        label: "Sostenibilidad", 
        icon: Recycle, 
        description: "Gestión ambiental, Eco-Créditos y tecnología de reciclaje inteligente." 
    },
];
