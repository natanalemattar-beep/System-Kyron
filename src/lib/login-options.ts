
import { User, Building, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Cpu, Banknote, Signal } from "lucide-react";

export const loginOptions = [
    { href: "/login", label: "Acceso Personal", icon: User, description: "Para clientes individuales y gestión de trámites personales." },
    { href: "/login-fintech", label: "Centro de Contabilidad", icon: Banknote, description: "Dashboard principal de la empresa." },
    { href: "/login-escritorio-juridico", label: "Escritorio Jurídico", icon: Gavel, description: "Portal para el departamento legal." },
    { href: "/login-ventas", label: "Ventas y Facturación", icon: ShoppingCart, description: "Acceso para cajeros y vendedores." },
    { href: "/login-rrhh", label: "Acceso RR.HH.", icon: Briefcase, description: "Portal para gestión de personal." },
    { href: "/login-socios", label: "Acceso Socios", icon: Users, description: "Dashboard para socios y directivos." },
    { href: "/login-marketing", label: "Productos y Marketing", icon: Megaphone, description: "Portal de marketing y asesoría." },
    { href: "/login-telecom", label: "Telecomunicaciones", icon: Signal, description: "Gestión de redes y servicios." },
    { href: "/login-informatica", label: "Ingeniería e Informática", icon: Cpu, description: "Acceso para el equipo de IT." },
];
