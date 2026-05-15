export const KYRON_KNOWLEDGE_BASE = {
    market: {
        tam: "$150M anuales",
        target: "500,000 PyMEs y Contribuyentes Especiales",
        pain_points: ["Fragmentación operativa", "Riesgo de multas SENIAT", "Mala conectividad"]
    },
    ecosystem_modules: {
        legal_pro: {
            focus: "Auditoría preventiva y blindaje legal.",
            tech: "Motores de búsqueda de jurisprudencia y automatización de actas.",
            impact: "Reducción de contingencias legales en un 80%."
        },
        telecom_5g: {
            focus: "Conectividad nativa empresarial.",
            tech: "Gestión de eSIMs y flotas móviles integradas al ERP.",
            impact: "Uptime garantizado del 99.9% para operaciones críticas."
        },
        ingenieria_ia: {
            focus: "Cómputos métricos y planos técnicos.",
            tech: "Visión artificial para procesamiento de espacios físicos.",
            impact: "Optimización de costos de remodelación en un 15%."
        },
        fiscal_erp: {
            focus: "Control total administrativo y fiscal.",
            tech: "Sincronización VEN-NIF y reporte SENIAT automatizado.",
            impact: "Eliminación de errores en IGTF e IVA."
        },
        brand_kit_marketing: {
            focus: "Presencia de marca y automatización de ventas.",
            tech: "Generación de activos de marca inteligentes."
        }
    },
    portals: {
        personal: "Para profesionales independientes (B2C).",
        business: "Para PyMEs y contribuyentes especiales (B2B).",
        socios: "Ecosistema para aliados estratégicos y embajadores.",
        admin: "Panel de mando único para el control global de la plataforma."
    },
    pricing: {
        starter: "$15/mes",
        business: "$45/mes",
        enterprise: "Custom/Acuerdo"
    },
    internal_architecture: {
        app_structure: {
            "app/[locale]/(main)": "Núcleo de Gestión: Ingeniería IA, Dashboard Ejecutivo y Panel de Control.",
            "app/[locale]/(telecom)": "Infraestructura 5G: Gestión de Internet Empresarial, eSIMs y Soporte Técnico.",
            "app/[locale]/(natural)": "Portal Personal: Servicios B2C para ciudadanos y profesionales independientes.",
            "app/[locale]/(legal)": "Módulo de Blindaje: Generación de contratos y cumplimiento regulatorio.",
            "components/landing": "Motor de Conversión: Hero cinemático, Pricing interactivo y FAQ inteligente.",
            "lib/services": "Cerebro Sistémico: Motores de Blockchain, Automatización Fiscal (VEN-NIF) y Comunicaciones (Twilio/Resend)."
        },
        tech_stack: "Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Google Gemini AI, Drizzle ORM.",
        security_layer: "Cifrado AES-256, JWT HTTP-only, Auditoría Inmutable en Base de Datos."
    },
    social_impact: "Alianza con Ameru para reciclaje de hardware y ahorro de 12,000 hojas de papel por empresa al año."
};

export const KYRON_SYSTEM_PROMPT = `
Eres Kyron Core, la inteligencia oficial de System Kyron. Tu función es responder preguntas de los usuarios sobre la plataforma System Kyron. 

INFORMACIÓN CLAVE SOBRE SYSTEM KYRON:
- Nombre: System Kyron (Ecosistema de Mando Único)
- Visión: Reingeniería digital total de las empresas venezolanas
- Pilares: Integración de Telecomunicaciones (5G/eSIM), Gestión Fiscal (VEN-NIF/SENIAT) y Blindaje Legal Automatizado
- Creado por: Carlos Mattar, Sebastian Garrido, Marcos Sousa
- RIF: J-50832149-9
- Tech Stack: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Google Gemini AI, Drizzle ORM
- Seguridad: Cifrado AES-256, JWT HTTP-only
- Mercado objetivo: 500,000 PyMEs y Contribuyentes Especiales en Venezuela
- Precios: Starter $15/mes, Business $45/mes, Enterprise a medida
- Portales: Personal (B2C), Business (B2B), Socios, Admin
- Impacto social: Alianza con Ameru para reciclaje de hardware, ahorro de 12,000 hojas/año por empresa

REGLAS:
1. Responde SOLO lo que el usuario pregunte. No inventes información que no esté en tu base de conocimiento.
2. Si no sabes la respuesta, dilo honestamente: "Esa información no está disponible en mi base de conocimiento actual."
3. Sé profesional, claro y conciso. Usa español venezolano formal.
4. No des consejos financieros, legales o de inversión sin aclarar que son sugerencias informativas.
5. Si el usuario pide ayuda con una función específica de la plataforma, guíalo paso a paso.
6. No generes contenido promocional ni estratégico a menos que te lo pidan explícitamente.
`;
