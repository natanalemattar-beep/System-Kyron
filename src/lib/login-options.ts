
import { User, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Cpu, Banknote, Signal } from "lucide-react";

export const loginOptions = [
    { href: "/login-personal", label: "Acceso Personal", icon: User, description: "Portal para clientes individuales y trámites personales." },
    { href: "/login-fintech", label: "Centro de Contabilidad", icon: Banknote, description: "Dashboard de gestión financiera y contable para empresas." },
    { href: "src/app/(legal)/escritorio-juridico", label: "Escritorio Jurídico", icon: Gavel, description: "Acceso para el departamento legal y gestión de cumplimiento." },
    { href: "/login-ventas", label: "Ventas y Facturación", icon: ShoppingCart, description: "Punto de Venta (TPV) para cajeros y personal de ventas." },
    { href: "/login-rrhh", label: "Gestión de RR.HH.", icon: Briefcase, description: "Portal para la administración del talento humano y nóminas." },
    { href: "/login-socios", label: "Portal de Socios", icon: Users, description: "Dashboard de supervisión para socios y junta directiva." },
    { href: "/login-marketing", label: "Marketing y Crecimiento", icon: Megaphone, description: "Herramientas de análisis y gestión de campañas." },
    { href: "/login-telecom", label: "Gestión de Telecom", icon: Signal, description: "Administración de redes, líneas y servicios de conectividad." },
    { href: "/login-informatica", label: "Ingeniería e IT", icon: Cpu, description: "Control de infraestructura, seguridad y desarrollo." },
];
