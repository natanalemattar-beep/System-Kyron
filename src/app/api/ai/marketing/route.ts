import { NextRequest, NextResponse } from "next/server";
import { marketingAgent } from "@/lib/ai/agents/marketing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, request, count, sequence, keywords } = body;

    if (!request && action !== "none") {
      return NextResponse.json(
        { error: "Falta request de marketing" },
        { status: 400 }
      );
    }

    switch (action) {
      case "content":
        const content = await marketingAgent.generateContent(request);
        return NextResponse.json(content);

      case "social":
        const posts = await marketingAgent.generateSocialPosts(
          request,
          count || 5
        );
        return NextResponse.json({ posts });

      case "email":
        if (!sequence) {
          return NextResponse.json(
            { error: "Falta tipo de secuencia (welcome, nurture, sales, reengagement)" },
            { status: 400 }
          );
        }
        const email = await marketingAgent.generateEmailCampaign(request, sequence);
        return NextResponse.json(email);

      case "seo":
        if (!keywords || !Array.isArray(keywords)) {
          return NextResponse.json(
            { error: "Faltan keywords para SEO" },
            { status: 400 }
          );
        }
        const seoContent = await marketingAgent.generateSEOContent(request, keywords);
        return NextResponse.json(seoContent);

      case "adcopy":
        if (!body.platform) {
          return NextResponse.json(
            { error: "Falta plataforma (google_ads, facebook_ads, linkedin_ads)" },
            { status: 400 }
          );
        }
        const adCopy = await marketingAgent.generateAdCopy(request, body.platform);
        return NextResponse.json(adCopy);

      default:
        return NextResponse.json(
          { error: "Acción no válida. Use: content, social, email, seo, adcopy" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Marketing AI Error:", error);
    return NextResponse.json(
      { error: "Error interno del agente" },
      { status: 500 }
    );
  }
}
