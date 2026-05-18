import { ai } from "../client";
import type { MarketingContent } from "../types";

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
      `Genera contenido de marketing con:
- Producto/Servicio: ${request.product}
- Audiencia objetivo: ${request.targetAudience}
- Objetivo: ${request.goal}
- Tono: ${request.tone}
- Idioma: ${request.language}
- Plataforma: ${request.platform || "general"}

Genera:
- content: contenido principal
- variants: 3 variaciones del contenido
- targetAudience: descripción de la audiencia
- keywords: 5-8 keywords relevantes
- cta: call-to-action efectivo

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un experto en marketing digital. Creas contenido persuasivo, optimizado para conversión y adaptado a cada plataforma.",
        temperature: 0.7,
      }
    );

    return content;
  }

  async generateSocialPosts(
    request: MarketingRequest,
    count: number = 5
  ): Promise<string[]> {
    const posts = await ai.generateJson<string[]>(
      `Genera ${count} posts para redes sociales sobre:
- Producto: ${request.product}
- Audiencia: ${request.targetAudience}
- Objetivo: ${request.goal}
- Tono: ${request.tone}
- Plataforma: ${request.platform || "general"}

Cada post debe ser único, con hashtags relevantes y optimizado para engagement. Responde solo con JSON array de strings.`,
      {
        systemInstruction:
          "Eres un social media manager experto. Creas posts virales y engagement-driven.",
        temperature: 0.8,
      }
    );

    return posts;
  }

  async generateEmailCampaign(
    request: MarketingRequest,
    sequence: "welcome" | "nurture" | "sales" | "reengagement"
  ): Promise<{ subject: string; body: string; preview: string }> {
    const email = await ai.generateJson<{
      subject: string;
      body: string;
      preview: string;
    }>(
      `Genera un email de campaña tipo "${sequence}":
- Producto: ${request.product}
- Audiencia: ${request.targetAudience}
- Objetivo: ${request.goal}
- Tono: ${request.tone}

Incluir:
- subject: asunto compelling (máx 50 caracteres)
- body: cuerpo del email con estructura clara
- preview: texto preview (máx 100 caracteres)

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un copywriter de email marketing experto. Creas emails que convierten.",
        temperature: 0.6,
      }
    );

    return email;
  }

  async generateSEOContent(
    request: MarketingRequest,
    keywords: string[]
  ): Promise<{ title: string; metaDescription: string; content: string; headings: string[] }> {
    const seo = await ai.generateJson<{
      title: string;
      metaDescription: string;
      content: string;
      headings: string[];
    }>(
      `Genera contenido SEO optimizado:
- Producto: ${request.product}
- Keywords principales: ${keywords.join(", ")}
- Audiencia: ${request.targetAudience}
- Objetivo: ${request.goal}

Incluir:
- title: título SEO (máx 60 caracteres)
- metaDescription: descripción meta (máx 160 caracteres)
- content: artículo completo (800-1200 palabras)
- headings: estructura de headings H2/H3

Responde solo con JSON.`,
      {
        systemInstruction:
          "Eres un experto en SEO y content marketing. Creas contenido optimizado para buscadores y usuarios.",
        temperature: 0.6,
      }
    );

    return seo;
  }
}

export const marketingAgent = new MarketingAgent();
