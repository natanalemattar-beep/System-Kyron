
import { User, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Cpu, Banknote, Signal, Recycle } from "lucide-react";

export const loginOptions = [
    { 
        href: "/login-personal", 
        label: "Mi Cuenta Personal", 
        icon: User, 
        description: "Accede a tus documentos de identidad, trámites civiles y servicios de salud en un solo lugar seguro." 
    },
    { 
        href: "/login-empresa", 
        label: "Contabilidad", 
        icon: Banknote, 
        description: "Gestiona las finanzas de tu negocio, impuestos y reportes bancarios de forma automática." 
    },
    { 
        href: "/login-escritorio-juridico", 
        label: "Asesoría Legal", 
        icon: Gavel, 
        description: "Control total de tus contratos, documentos legales y trámites ante registros y notarías." 
    },
    { 
        href: "/login-ventas", 
        label: "Facturación y Ventas", 
        icon: ShoppingCart, 
        description: "Tu punto de venta para cobrar, controlar el inventario y recibir pagos en cualquier moneda." 
    },
    { 
        href: "/login-rrhh", 
        label: "Recursos Humanos", 
        icon: Briefcase, 
        description: "Administra el pago de nóminas, beneficios, vacaciones y expedientes de todo tu equipo." 
    },
    { 
        href: "/login-socios", 
        label: "Socios y Directivos", 
        icon: Users, 
        description: "Supervisión de empresas, reparto de ganancias y análisis de crecimiento para dueños y directivos." 
    },
    { 
        href: "/login-marketing", 
        label: "Marketing", 
        icon: Megaphone, 
        description: "Mejora tus ventas con análisis de clientes, publicidad y estrategias inteligentes." 
    },
    { 
        href: "/login-telecom", 
        label: "Líneas y Conectividad", 
        icon: Signal, 
        description: "Gestiona tus líneas telefónicas, planes de datos 5G y equipos de comunicación." 
    },
    { 
        href: "/login-informatica", 
        label: "Proyectos Técnicos", 
        icon: Cpu, 
        description: "Control de infraestructura tecnológica, planos, presupuestos y soporte técnico avanzado." 
    },
];
