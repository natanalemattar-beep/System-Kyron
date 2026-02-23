
import { User, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Cpu, Banknote, Signal } from "lucide-react";

export const loginOptions = [
    { 
        href: "/login-personal", 
        label: "Acceso Personal", 
        icon: User, 
        description: "Bóveda digital ciudadana para gestionar documentos de identidad, trámites civiles y servicios de salud integrados de forma segura." 
    },
    { 
        href: "/login-empresa", 
        label: "Centro de Contabilidad", 
        icon: Banknote, 
        description: "Dashboard de gestión financiera integral con automatización contable, cumplimiento fiscal SENIAT y auditoría predictiva continua." 
    },
    { 
        href: "/login-escritorio-juridico", 
        label: "Escritorio Jurídico", 
        icon: Gavel, 
        description: "Gestión legal corporativa avanzada para el control de contratos, poderes de representación y monitoreo de cumplimiento normativo." 
    },
    { 
        href: "/login-ventas", 
        label: "Ventas y Facturación", 
        icon: ShoppingCart, 
        description: "Punto de Venta (TPV) inteligente con sincronización de inventario en tiempo real, facturación fiscal y procesamiento de pagos multimoneda." 
    },
    { 
        href: "/login-rrhh", 
        label: "Gestión de RR.HH.", 
        icon: Briefcase, 
        description: "Portal de talento humano para la administración de nóminas, beneficios laborales, reclutamiento y expedientes de personal automatizados." 
    },
    { 
        href: "/login-socios", 
        label: "Portal de Socios", 
        icon: Users, 
        description: "Centro de mando ejecutivo para la supervisión de holdings, análisis de rentabilidad del grupo y toma de decisiones estratégicas basadas en datos." 
    },
    { 
        href: "/login-marketing", 
        label: "Marketing y Crecimiento", 
        icon: Megaphone, 
        description: "Herramientas de Business Intelligence para análisis de competencia, generación de estrategias de venta con IA y fidelización de clientes." 
    },
    { 
        href: "/login-telecom", 
        label: "Gestión de Telecom", 
        icon: Signal, 
        description: "Administración operativa de infraestructura de redes, cumplimiento ante CONATEL y sistemas de activación de líneas de comunicación." 
    },
    { 
        href: "/login-informatica", 
        label: "Ingeniería e IT", 
        icon: Cpu, 
        description: "Control de infraestructura tecnológica, arquitectura de software, ciberseguridad avanzada y despliegue de soluciones de IA aplicadas." 
    },
];
