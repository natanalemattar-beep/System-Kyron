
import { User, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Cpu, Banknote, Signal, Recycle } from "lucide-react";

export const loginOptions = [
    { 
        href: "/login-personal", 
        label: "Mi Cuenta Personal", 
        icon: User, 
        description: "Acceso a sus documentos de identidad, trámites civiles y servicios de salud en un entorno seguro." 
    },
    { 
        href: "/login-empresa", 
        label: "Contabilidad", 
        icon: Banknote, 
        description: "Gestión financiera de su negocio con automatización de impuestos y reportes bancarios." 
    },
    { 
        href: "/login-escritorio-juridico", 
        label: "Asesoría Legal", 
        icon: Gavel, 
        description: "Control de contratos, documentos legales y trámites ante registros y notarías." 
    },
    { 
        href: "/login-ventas", 
        label: "Facturación y Ventas", 
        icon: ShoppingCart, 
        description: "Punto de venta para cobros, control de inventario y pagos multimoneda." 
    },
    { 
        href: "/login-rrhh", 
        label: "Recursos Humanos", 
        icon: Briefcase, 
        description: "Administración de nóminas, beneficios, vacaciones y expedientes de personal." 
    },
    { 
        href: "/login-socios", 
        label: "Socios y Directivos", 
        icon: Users, 
        description: "Supervisión de empresas, reparto de beneficios y análisis de rentabilidad estratégica." 
    },
    { 
        href: "/login-marketing", 
        label: "Marketing", 
        icon: Megaphone, 
        description: "Mejora de rendimiento comercial mediante análisis de mercado y estrategias con IA." 
    },
    { 
        href: "/login-telecom", 
        label: "Líneas y Conectividad", 
        icon: Signal, 
        description: "Gestión de líneas telefónicas, planes de datos y servicios de comunicación 5G." 
    },
    { 
        href: "/login-informatica", 
        label: "Proyectos Técnicos", 
        icon: Cpu, 
        description: "Control de infraestructura tecnológica, planos, presupuestos y soporte técnico." 
    },
];
