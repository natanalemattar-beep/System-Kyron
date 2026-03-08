
import { User, Gavel, ShoppingCart, Briefcase, Users, Cpu, Banknote, Signal, Smartphone } from "lucide-react";

export const loginOptions = [
    { 
        href: "/login-personal", 
        label: "Cuenta Personal", 
        icon: User, 
        description: "Acceso a sus documentos de identidad, trámites civiles y servicios de salud." 
    },
    { 
        href: "/login-linea", 
        label: "Mi Línea 5G", 
        icon: Smartphone, 
        description: "Control de consumo de datos, recargas de saldo y gestión de perfiles eSIM." 
    },
    { 
        href: "/login-empresa", 
        label: "Contabilidad", 
        icon: Banknote, 
        description: "Gestión financiera de su negocio con automatización de impuestos y balances." 
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
        href: "/login-rrhh", 
        label: "Recursos Humanos", 
        icon: Briefcase, 
        description: "Administración de nóminas, beneficios y expedientes de personal." 
    },
    { 
        href: "/login-socios", 
        label: "Socios y Directivos", 
        icon: Users, 
        description: "Supervisión estratégica, reparto de beneficios y análisis de rentabilidad." 
    },
    { 
        href: "/login-telecom", 
        label: "Administración de Red", 
        icon: Signal, 
        description: "Gestión técnica de infraestructura, radiobases y provisión masiva." 
    },
    { 
        href: "/login-informatica", 
        label: "Ingeniería e IT", 
        icon: Cpu, 
        description: "Control de infraestructura tecnológica, planos y presupuestos técnicos." 
    },
];
