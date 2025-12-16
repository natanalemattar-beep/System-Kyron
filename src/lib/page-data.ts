
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
        question: "¿Cómo garantizan el cumplimiento con las normativas del SENIAT?",
        answer: "Nuestra plataforma está diseñada específicamente para el entorno fiscal venezolano. Mantenemos una comunicación constante con el SENIAT para asegurar que cada factura, retención y libro contable cumpla con las últimas providencias administrativas. Nuestro sistema valida los datos en tiempo real y está homologado, dándote la tranquilidad de que tu empresa opera 100% en regla."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos una amplia variedad de métodos de pago para tu comodidad. Para pagos en Bolívares (VES), puedes usar transferencias bancarias y Pago Móvil. Para pagos en Dólares (USD) o otras divisas, aceptamos Zelle, transferencias internacionales y tarjetas de crédito a través de nuestra pasarela de pago segura."
    },
    {
        question: "¿Ofrecen soporte técnico y de implementación?",
        answer: "¡Sí! El éxito de nuestros clientes es nuestro éxito. Ofrecemos un proceso de 'onboarding' guiado para asegurar una implementación fluida. Además, todos nuestros planes incluyen soporte. El Plan Profesional y Corporativo cuentan con soporte prioritario vía WhatsApp y teléfono para resolver cualquier duda al instante."
    },
    {
        question: "¿Puedo probar la plataforma antes de comprometerme?",
        answer: "Por supuesto. Creemos en el valor de nuestra plataforma y queremos que lo compruebes por ti mismo. Ofrecemos una demostración gratuita y personalizada donde uno de nuestros especialistas te guiará a través de las funcionalidades clave y responderá todas tus preguntas. Solicita tu demo en la sección de contacto."
    },
    {
        question: "¿Es seguro subir mis datos fiscales y contables a la plataforma?",
        answer: "La seguridad es nuestra máxima prioridad. Utilizamos cifrado de nivel bancario para toda la información, tanto en tránsito como en reposo. Además, implementamos autenticación de dos factores (2FA) y auditorías de seguridad constantes para garantizar que tus datos estén siempre protegidos contra accesos no autorizados."
    },
    {
        question: "¿Qué sucede si cambia la legislación fiscal en Venezuela?",
        answer: "Esa es una de nuestras mayores fortalezas. Nuestro equipo legal y de desarrollo monitorea constantemente cualquier cambio en la legislación. Actualizamos la plataforma de forma proactiva para adaptarnos a nuevas leyes, gacetas o providencias, asegurando que tu empresa siempre esté al día sin que tú tengas que preocuparte."
    }
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
