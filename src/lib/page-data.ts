
import { CheckCircle, Shield, KeyRound, ShieldCheck, FileScan, ListTree, BrainCircuit } from "lucide-react";

export const planes = [
    {
        nombre: "Plan Básico",
        precio: "Bs. 1.500",
        periodo: "/mes",
        descripcion: "Ideal para emprendedores y pequeñas empresas que inician.",
        features: [
            "Módulo de Facturación",
            "Gestión de Cuentas por Cobrar/Pagar",
            "Libro de Compras y Ventas",
            "Soporte por correo electrónico",
        ],
        popular: false,
    },
    {
        nombre: "Plan Profesional",
        precio: "Bs. 4.000",
        periodo: "/mes",
        descripcion: "La solución completa para empresas en crecimiento.",
        features: [
            "Todo lo del Plan Básico",
            "Gestión de Nómina Completa",
            "Módulo de Inventario",
            "Declaración de IVA e ISLR",
            "Soporte Prioritario (WhatsApp)",
        ],
        popular: true,
    },
    {
        nombre: "Plan Corporativo",
        precio: "Contáctanos",
        periodo: "",
        descripcion: "Soluciones a medida para grandes empresas con necesidades específicas.",
        features: [
            "Todo lo del Plan Profesional",
            "Integraciones personalizadas (API)",
            "Análisis con IA y Reportes Avanzados",
            "Oficial de Cumplimiento dedicado",
            "Soporte 24/7 y SLA garantizado",
        ],
        popular: false,
    },
];

export const faqItems = [
    {
        question: "¿Puedo cambiar de plan en cualquier momento?",
        answer: "Sí, puedes mejorar o ajustar tu plan en cualquier momento desde el panel de tu cuenta. La facturación se ajustará de forma prorrateada."
    },
    {
        question: "¿El sistema está homologado por el SENIAT?",
        answer: "Absolutamente. Nuestro sistema de facturación cumple con todas las providencias administrativas vigentes del SENIAT, garantizando tu tranquilidad fiscal."
    },
    {
        question: "¿Qué tipo de soporte técnico ofrecen?",
        answer: "Ofrecemos soporte por correo electrónico para el Plan Básico y soporte prioritario vía WhatsApp y teléfono para los planes Profesional y Corporativo."
    },
     {
        question: "¿Mis datos están seguros en la plataforma?",
        answer: "La seguridad es nuestra máxima prioridad. Utilizamos cifrado de extremo a extremo, autenticación de dos factores y auditorías constantes para proteger tu información."
    },
     {
        question: "¿Kyron funciona para cualquier tipo de empresa?",
        answer: "Sí, Kyron es una plataforma modular diseñada para adaptarse a una amplia gama de sectores, desde pequeños comercios y PYMES hasta grandes corporaciones y empresas de servicios."
    },
];

export const securityFeatures = [
    {
        title: "Verificación en Dos Pasos (2FA)",
        description: "Añade una capa extra de seguridad. Se te pedirá un código de una app de autenticación para iniciar sesión.",
        icon: ShieldCheck
    },
    {
        title: "Cifrado de Extremo a Extremo",
        description: "Toda tu información está cifrada, tanto en reposo como en tránsito, utilizando los algoritmos más robustos del mercado.",
        icon: KeyRound
    },
    {
        title: "Monitoreo de Sesiones Activas",
        description: "Visualiza y controla todos los dispositivos donde tu cuenta ha iniciado sesión y cierra sesiones sospechosas de forma remota.",
        icon: Shield
    }
];

export const zeroRiskGuarantees = [
    {
        id: 'guarantee-001',
        type: 'insurance',
        provider: 'Global Fiscal Protection Inc.',
        amount: 5000000,
        coverage: 'Cobertura total por multas y sanciones',
        status: 'active',
        expiration: new Date('2025-12-31'),
    },
    {
        id: 'guarantee-002',
        type: 'bond',
        provider: 'International Bond Corporation',
        amount: 2000000,
        coverage: 'Garantía fiduciaria para cumplimiento',
        status: 'active',
        expiration: new Date('2025-06-30'),
    },
];

export const iaSolutions = [
    {
        title: "Extracción Automática de Datos",
        description: "Sube facturas, recibos o cualquier documento y nuestra IA extraerá la información clave por ti.",
        icon: FileScan,
        href: "/data-entry"
    },
    {
        title: "Categorización de Transacciones",
        description: "La IA categorizará automáticamente tus ingresos y gastos para un análisis financiero claro.",
        icon: ListTree,
        href: "/transactions"
    },
     {
        title: "Análisis de Sentimiento",
        description: "Pega una reseña de un cliente y la IA te dirá si la opinión es positiva, negativa o neutral.",
        icon: BrainCircuit,
        href: "/soluciones-ia"
    },
];
