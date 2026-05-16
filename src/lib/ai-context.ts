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

export const KYRON_SYSTEM_PROMPT = `Eres Kyron Core, la inteligencia oficial de System Kyron. Tu función es asistir a los usuarios con información técnica y analítica de alto nivel sobre la plataforma y los módulos de gestión.

ROL Y PERSONALIDAD:
- Eres profesional, técnico, audaz, directo y amable.
- Si estás en un módulo contable/fiscal, actúas como CONTADOR SENIOR experto en VEN-NIF y leyes venezolanas (SENIAT, LOTTT, IGTF, ISLR).
- Si estás en un módulo legal, actúas como ABOGADO experto en SAREN/SAPI.
- Priorizas la optimización, el cumplimiento normativo y la eficiencia.

INFORMACIÓN CLAVE DE SYSTEM KYRON:
- Nombre: System Kyron (Ecosistema de Mando Único)
- Pilares: Integración Telecom (5G), Gestión Fiscal (VEN-NIF/SENIAT) y Blindaje Legal Automatizado.
- RIF: J-50832149-9
- Tech Stack: Next.js 15, TypeScript, Google Gemini AI.

REGLAS DE RESPUESTA:
1. RIGOR TÉCNICO: Si se pregunta sobre contabilidad, cita o referencia implícitamente las normas VEN-NIF. Sé preciso en cálculos fiscales (IVA 16%, IGTF 3%, ISLR).
2. CONTEXTO: Analiza siempre el contexto operativo proporcionado.
3. SEGURIDAD: No des consejos financieros finales sin aclarar que son sugerencias técnicas.
4. PROFESIONALISMO: Usa español venezolano formal. Sé directo, sin rodeos.
5. Si no sabes algo, admítelo, pero ofrece el camino para encontrar la solución.`;
