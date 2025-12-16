
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

export const businessFraudStrategies = {
    "Controles Financieros y Contables": [
        "Segregación de Funciones: Dividir tareas para que ninguna persona maneje sola un ciclo financiero completo (autorización, pago, conciliación).",
        "Rotación de Personal: Rotar las responsabilidades financieras y de inventario periódicamente para desalentar esquemas a largo plazo.",
        "Conciliaciones Frecuentes: Realizar conciliaciones bancarias diarias o semanales para detectar transacciones no autorizadas rápidamente.",
        "Doble Firma/Aprobación: Exigir dos aprobaciones para pagos que superen un monto preestablecido.",
        "Auditorías Sorpresa: Realizar auditorías internas o recuentos de caja sin previo aviso."
    ],
    "Prevención de Fraude con Clientes": [
        "Autenticación Fuerte (MFA): Implementar autenticación multifactor para el acceso de clientes a sus cuentas.",
        "Análisis Transaccional con IA: Utilizar herramientas para detectar patrones de compra inusuales, cambios de dirección o uso de múltiples tarjetas desde la misma IP.",
        "Verificación de Identidad (KYC): Exigir y validar documentos de identidad para la aprobación de créditos.",
        "Capacitación en Punto de Venta: Entrenar al personal para reconocer tarjetas alteradas y seguir protocolos de verificación.",
        "Cámaras de Seguridad: Instalar cámaras de alta resolución en cajas y áreas de inventario."
    ],
    "Seguridad de Datos y Tecnología": [
        "Cifrado de Datos: Asegurar que toda la información sensible esté cifrada, tanto en reposo como en tránsito.",
        "Acceso Restringido: Limitar el acceso a información confidencial solo al personal estrictamente necesario.",
        "Actualización de Software: Mantener todos los sistemas y firewalls actualizados.",
        "Backups Seguros: Realizar copias de seguridad de datos críticos y guardarlas en una ubicación separada."
    ],
    "Cultura de Prevención y Ética": [
        "Política Clara de Fraude: Comunicar una política de tolerancia cero hacia el fraude y sus consecuencias.",
        "Línea de Denuncia Anónima: Establecer un canal confidencial para que los empleados reporten actividades sospechosas.",
        "Capacitación Anti-Phishing: Entrenar al personal para reconocer correos, llamadas y mensajes fraudulentos."
    ]
};

export const personalFraudStrategies = {
    "Protección de Información y Dispositivos": [
        "Usa contraseñas robustas y únicas para cada cuenta.",
        "Activa siempre el Doble Factor de Autenticación (2FA/MFA).",
        "Opera a través de la aplicación oficial de tu banco en lugar del navegador.",
        "Mantén tu sistema operativo y antivirus actualizados.",
        "Evita hacer transacciones financieras en redes Wi-Fi públicas.",
        "Destruye documentos bancarios físicos que ya no necesites."
    ],
    "Detección de Estafas Digitales (Phishing)": [
        "No hagas clic en enlaces de correos o SMS sospechosos.",
        "Desconfía de llamadas que te presionen. Tu banco nunca te pedirá claves completas.",
        "Nunca compartas códigos de verificación (OTP) que recibas.",
        "Desconfía de ofertas de dinero fácil o premios que requieran tus datos bancarios.",
        "Denuncia inmediatamente cualquier intento de fraude a tu banco."
    ],
    "Estrategias de Uso y Pago": [
        "Monitorea tus cuentas y tarjetas con frecuencia.",
        "Utiliza cuentas con saldo limitado para tus gastos diarios.",
        "Considera usar tarjetas prepagadas o virtuales para compras en línea.",
        "Verifica que los sitios web de compra sean seguros (https:// y candado verde)."
    ]
};
