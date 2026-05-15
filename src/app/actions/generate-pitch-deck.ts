"use server";

import pptxgen from "pptxgenjs";

export type TemplateStyle = "startup" | "corporate" | "investor" | "tech" | "minimal";
export type PitchLength = "short" | "medium" | "long";

interface PitchData {
    title: string;
    subtitle?: string;
    presenter?: string;
    contact?: string;
}

const TEMPLATES = {
    startup: {
        bg: "0F172A",
        accent: "3B82F6",
        text: "FFFFFF",
        subtitle: "3B82F6",
        bullet: "CBD5E1",
    },
    corporate: {
        bg: "0F172A", 
        accent: "10B981",
        text: "FFFFFF",
        subtitle: "10B981", 
        bullet: "94A3B8",
    },
    investor: {
        bg: "000000",
        accent: "F59E0B",
        text: "FFFFFF",
        subtitle: "F59E0B",
        bullet: "D1D5DB",
    },
    tech: {
        bg: "18181B",
        accent: "8B5CF6",
        text: "FFFFFF",
        subtitle: "8B5CF6",
        bullet: "A1A1AA",
    },
    minimal: {
        bg: "FFFFFF",
        accent: "000000",
        text: "000000",
        subtitle: "6B7280",
        bullet: "4B5563",
    },
};

const SLIDE_CONTENT = {
    short: [
        { title: "COVER", content: "title" },
        { title: "PROBLEM", content: "problem" },
        { title: "SOLUTION", content: "solution" },
        { title: "MARKET", content: "market" },
        { title: "MODEL", content: "model" },
        { title: "TEAM", content: "team" },
        { title: "ASK", content: "ask" },
    ],
    medium: [
        { title: "COVER", content: "title" },
        { title: "PROBLEM", content: "problem" },
        { title: "PAIN", content: "pain" },
        { title: "SOLUTION", content: "solution" },
        { title: "PRODUCT", content: "product" },
        { title: "MARKET", content: "market" },
        { title: "COMPETITION", content: "competition" },
        { title: "MODEL", content: "model" },
        { title: "TRACTION", content: "traction" },
        { title: "TEAM", content: "team" },
        { title: "ROADMAP", content: "roadmap" },
        { title: "ASK", content: "ask" },
    ],
    long: [
        { title: "COVER", content: "title" },
        { title: "AGENDA", content: "agenda" },
        { title: "PROBLEM", content: "problem" },
        { title: "PAIN", content: "pain" },
        { title: "SOLUTION", content: "solution" },
        { title: "PRODUCT", content: "product" },
        { title: "TECH", content: "tech" },
        { title: "MARKET", content: "market" },
        { title: "COMPETITION", content: "competition" },
        { title: "MODEL", content: "model" },
        { title: "METRICS", content: "metrics" },
        { title: "TRACTION", content: "traction" },
        { title: "TEAM", content: "team" },
        { title: "ALLIES", content: "allies" },
        { title: "RISKS", content: "risks" },
        { title: "ROADMAP", content: "roadmap" },
        { title: "FINANCIALS", content: "financials" },
        { title: "ASK", content: "ask" },
        { title: "CONTACT", content: "contact" },
    ],
};

const CONTENT_DATA: Record<string, any> = {
    title: {
        title: "SYSTEM KYRON",
        subtitle: "El ecosistema que protege tu línea, tu negocio y el ambiente",
        body: "Todo homologado: desde el IMEI hasta la contabilidad, desde el reciclaje hasta la facturación.",
    },
    problem: {
        title: "El Problema",
        subtitle: "Triple crisis empresarial",
        body: "Las PyMEs en Venezuela enfrentan un caos triple:\n• Falta de conectividad confiable\n• Multas por incumplimiento SENIAT\n• Nula gestión de residuos electrónicos",
    },
    pain: {
        title: "Dolores del Mercado",
        body: "• 68% de exclusión financiera\n• 15 horas/mes perdidas por fallas de conexión\n• $1200 promedio en multas fiscales anuales\n• 0% recycling de electrónicos",
    },
    solution: {
        title: "La Solución: System Kyron",
        body: "Unificamos 5G corporativo + contabilidad automatizada + reciclaje inteligente.\nTodo homologado para un blindaje total.",
    },
    product: {
        title: "Producto",
        body: "• App móvil con dashboard en tiempo real\n• Portal web para gestión empresarial\n• API para integraciones\n• Hardware fiscal certified",
    },
    tech: {
        title: "Tecnología",
        body: "• Network Slicing sobre 5G\n• IA Gemini para análisis predictivo\n• Blockchain para auditoría inmutable\n• Blind Index para seguridad",
    },
    market: {
        title: "Mercado",
        body: "Venezuela: 500K+ PyMEs\nTAM: $2.5B\nSAM: $500M\nSOM: $50M (año 1)",
    },
    competition: {
        title: "Competencia",
        body: "Ventajas vs. competidores tradicionales:\n• Integración total vs. silos\n• AI nativo vs. procesos manuales\n• Pricing flexible vs. paquetes rígidos",
    },
    model: {
        title: "Modelo de Ingresos",
        body: "SaaS B2B con módulos:\n• Básico: $9/mes (1 usuario)\n• Pro: $29/mes (5 usuarios)\n• Enterprise: $99/mes (ileimitado)\n+ Líneas 5G: $15-45/mes",
    },
    metrics: {
        title: "Métricas Clave",
        body: "• MRR: $12,500 (actual)\n• CAC: $180\n• LTV: $2,400\n• Churn: 3.2%\n• ROI cliente: 187%",
    },
    traction: {
        title: "Traction",
        body: "• 45 clientes piloto activos\n• 12 empresas en waitlist\n• Alianzas: Coca-Cola FEMSA, HKA Factory, Ameru.AI\n• Pitch validado en Reto Inspira 2026",
    },
    team: {
        title: "Equipo",
        body: "Carlos Mattar - CEO & Lead Architecture\nSebastián Garrido - Co-founder & Network\nMarcos Sousa - Co-founder & Operations",
    },
    allies: {
        title: "Alianzas Estratégicas",
        body: "Coca-Cola FEMSA - Logística\nHKA Factory - Hardware SENIAT\nAmeru.AI - Sustainability AI",
    },
    risks: {
        title: "Riesgos y Mitigación",
        body: "Riesgo: Regulaciones cambiantes\nMitigación: Team legal activo, lobbying gremial\n\nRiesgo: Inflación\nMitigación: Pricing en USD, contratos largos",
    },
    roadmap: {
        title: "Roadmap",
        body: "2026: Lanzamiento Caracas\n2027: Expansión Colombia/Panamá\n2028: México y USA",
    },
    financials: {
        title: "Proyecciones",
        body: "Año 1: $150K revenue\nAño 2: $450K revenue\nAño 3: $1.2M revenue\nBreak-even: Mes 14",
    },
    ask: {
        title: "La Pregunta",
        body: "Buscamos $500K en ronda seed\nPara: Nodos 5G propios, AI ops, marketing\nEquity: 10%\nValuación: $5M",
    },
    contact: {
        title: "Contacto",
        body: "Carlos Mattar\ncarlos@systemkyron.com\n+58 412-000-0000",
    },
    agenda: {
        title: "Agenda",
        body: "1. Problema\n2. Solución\n3. Mercado\n4. Modelo\n5. Equipo\n6. financials\n7. Pregunta",
    },
};

export async function generatePitchDeck(
    template: TemplateStyle,
    length: PitchLength,
    data: PitchData
): Promise<Buffer> {
    const style = TEMPLATES[template];
    const slidesConfig = SLIDE_CONTENT[length];

    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    pres.author = data.presenter || "Carlos Mattar";
    pres.title = data.title || "System Kyron Pitch";
    pres.subject = "Pitch Deck";

    for (const slideConfig of slidesConfig) {
        const content = CONTENT_DATA[slideConfig.content];
        const slide = pres.addSlide();

        slide.background = { color: style.bg };

        if (slideConfig.content === "title") {
            slide.addText(data.title || "SYSTEM KYRON", {
                x: 0.5,
                y: 2,
                w: "90%",
                fontSize: 54,
                fontBold: true,
                color: style.text,
            });
            slide.addText(data.subtitle || "El ecosistema integral para Venezuela", {
                x: 0.5,
                y: 3.5,
                w: "90%",
                fontSize: 24,
                color: style.subtitle,
            });
            if (data.presenter) {
                slide.addText(`Presentado por ${data.presenter}`, {
                    x: 0.5,
                    y: 6,
                    w: "90%",
                    fontSize: 14,
                    color: style.bullet,
                });
            }
            continue;
        }

        if (slideConfig.content === "contact") {
            slide.addText(content.title, {
                x: 0.5,
                y: 0.5,
                w: "90%",
                fontSize: 40,
                fontBold: true,
                color: style.text,
            });
            slide.addText(content.body, {
                x: 0.5,
                y: 2,
                w: "90%",
                fontSize: 20,
                color: style.subtitle,
            });
            continue;
        }

        slide.addText(content.title, {
            x: 0.5,
            y: 0.4,
            w: "90%",
            fontSize: 36,
            fontBold: true,
            color: style.text,
        });

        if (content.subtitle) {
            slide.addText(content.subtitle, {
                x: 0.5,
                y: 1.3,
                w: "90%",
                fontSize: 18,
                color: style.subtitle,
                fontBold: true,
            });
            slide.addText(content.body, {
                x: 0.5,
                y: 2,
                w: "90%",
                fontSize: 18,
                color: style.bullet,
                bullet: true,
            });
        } else {
            slide.addText(content.body, {
                x: 0.5,
                y: 1.5,
                w: "90%",
                fontSize: 20,
                color: style.bullet,
                bullet: true,
            });
        }

        const accentLine = slide.addShape(pres.ShapeType.rect, {
            x: 0.5,
            y: 0.3,
            w: 1.5,
            h: 0.04,
            fill: { color: style.accent },
        });
    }

    const buffer = await pres.write({ outputType: "buffer" });
    return buffer;
}