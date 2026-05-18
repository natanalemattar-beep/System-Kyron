import { ai } from "../client";
import type { MarketingContent, EmailCampaignResult, SeoResult } from "../types";

export interface MarketingRequest {
  product: string;
  targetAudience: string;
  goal: string;
  tone: "professional" | "casual" | "persuasive" | "informative";
  language: string;
  platform?: "linkedin" | "twitter" | "instagram" | "email" | "web" | "general";
}

export class MarketingAgent {
  async generateContent(
    request: MarketingRequest
  ): Promise<MarketingContent> {
    const content = await ai.generateJson<MarketingContent>(
      `GENERAR CONTENIDO DE MARKETING

PRODUCTO/SERVICIO: ${request.product}
AUDIENCIA OBJETIVO: ${request.targetAudience}
OBJETIVO: ${request.goal}
TONO: ${request.tone}
IDIOMA: ${request.language}
PLATAFORMA: ${request.platform || "general"}

INSTRUCCIONES:
1. Genera contenido principal persuasivo y optimizado para conversión
2. Crea 3 variaciones del contenido para testing A/B
3. Define la audiencia objetivo con detalle
4. Genera 5-8 keywords relevantes para SEO
5. Crea un call-to-action efectivo

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "type": "social_post|email_campaign|seo_article|ad_copy",
  "content": "Contenido principal completo",
  "variants": ["Variación 1", "Variación 2", "Variación 3"],
  "targetAudience": "Descripción detallada de la audiencia",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "cta": "Call-to-action efectivo"
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un experto en marketing digital. Creas contenido persuasivo, optimizado para conversión y adaptado a cada plataforma. SIEMPRE respondes con el formato JSON especificado.",
        temperature: 0.7,
      },
      {
        type: "social_post",
        content: "",
        variants: [],
        targetAudience: request.targetAudience,
        keywords: [],
        cta: "",
      }
    );

    return content;
  }

  async generateSocialPosts(
    request: MarketingRequest,
    count: number = 5
  ): Promise<string[]> {
    const posts = await ai.generateJson<string[]>(
      `GENERAR POSTS PARA REDES SOCIALES

PRODUCTO: ${request.product}
AUDIENCIA: ${request.targetAudience}
OBJETIVO: ${request.goal}
TONO: ${request.tone}
PLATAFORMA: ${request.platform || "general"}
CANTIDAD: ${count} posts

REQUISITOS:
- Cada post debe ser único y diferente
- Incluir hashtags relevantes
- Optimizado para engagement
- Adaptado a la plataforma especificada
- Longitud apropiada para la plataforma

FORMATO: JSON array de strings, cada string es un post completo.
Responde SOLO con el JSON array.`,
      {
        systemInstruction:
          "Eres un social media manager experto. Creas posts virales y engagement-driven adaptados a cada plataforma.",
        temperature: 0.8,
      },
      []
    );

    return Array.isArray(posts) ? posts : [];
  }

  async generateEmailCampaign(
    request: MarketingRequest,
    sequence: "welcome" | "nurture" | "sales" | "reengagement"
  ): Promise<EmailCampaignResult> {
    const email = await ai.generateJson<EmailCampaignResult>(
      `GENERAR EMAIL DE CAMPAÑA

TIPO DE SECUENCIA: ${sequence}
PRODUCTO: ${request.product}
AUDIENCIA: ${request.targetAudience}
OBJETIVO: ${request.goal}
TONO: ${request.tone}

REQUISITOS POR TIPO:
- welcome: Email de bienvenida, presentar la marca, establecer expectativas
- nurture: Email educativo, aportar valor, construir confianza
- sales: Email de venta directa, urgencia, oferta clara
- reengagement: Email de reactivación, recordatorio de valor, incentivo

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "subject": "Asunto compelling (máx 50 caracteres)",
  "body": "Cuerpo completo del email con estructura clara",
  "preview": "Texto preview para inbox (máx 100 caracteres)"
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un copywriter de email marketing experto. Creas emails que convierten con asuntos compelling y cuerpos persuasivos.",
        temperature: 0.6,
      },
      { subject: "", body: "", preview: "" }
    );

    return email;
  }

  async generateSEOContent(
    request: MarketingRequest,
    keywords: string[]
  ): Promise<SeoResult> {
    const seo = await ai.generateJson<SeoResult>(
      `GENERAR CONTENIDO SEO OPTIMIZADO

PRODUCTO: ${request.product}
KEYWORDS PRINCIPALES: ${keywords.join(", ")}
AUDIENCIA: ${request.targetAudience}
OBJETIVO: ${request.goal}

REQUISITOS:
- Título SEO optimizado (máx 60 caracteres)
- Meta description compelling (máx 160 caracteres)
- Artículo completo de 800-1200 palabras
- Estructura de headings H2/H3 lógica
- Keywords integradas naturalmente
- Contenido útil y original

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "title": "Título SEO optimizado",
  "metaDescription": "Descripción meta compelling",
  "content": "Artículo completo con headings y párrafos",
  "headings": ["H2: Sección 1", "H3: Subsección 1.1", "H2: Sección 2"]
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un experto en SEO y content marketing. Creas contenido optimizado para buscadores y usuarios que convierte.",
        temperature: 0.6,
      },
      { title: "", metaDescription: "", content: "", headings: [] }
    );

    return seo;
  }

  async generateAdCopy(
    request: MarketingRequest,
    platform: "google_ads" | "facebook_ads" | "linkedin_ads"
  ): Promise<{ headlines: string[]; descriptions: string[]; cta: string }> {
    const adCopy = await ai.generateJson<{
      headlines: string[];
      descriptions: string[];
      cta: string;
    }>(
      `GENERAR COPY PARA ANUNCIOS PAGADOS

PLATAFORMA: ${platform}
PRODUCTO: ${request.product}
AUDIENCIA: ${request.targetAudience}
OBJETIVO: ${request.goal}

REQUISITOS POR PLATAFORMA:
- google_ads: Headlines máx 30 chars, descriptions máx 90 chars
- facebook_ads: Headlines máx 40 chars, descriptions máx 125 chars
- linkedin_ads: Headlines máx 70 chars, descriptions máx 150 chars

Genera 5 headlines y 3 descriptions variations.

FORMATO DE RESPUESTA OBLIGATORIO:
{
  "headlines": ["headline 1", "headline 2", "headline 3", "headline 4", "headline 5"],
  "descriptions": ["description 1", "description 2", "description 3"],
  "cta": "Call-to-action para el anuncio"
}

Responde SOLO con el JSON.`,
      {
        systemInstruction:
          "Eres un experto en publicidad digital. Creas copy para anuncios pagados que maximiza CTR y conversiones.",
        temperature: 0.7,
      },
      { headlines: [], descriptions: [], cta: "" }
    );

    return adCopy;
  }
}

export const marketingAgent = new MarketingAgent();
