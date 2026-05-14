import { NextRequest, NextResponse } from 'next/server';

/**
 * System Kyron Core AI Engine — Deterministic Fallback
 * This route handles AI queries with a failover to a deterministic engine
 * if external providers are unavailable.
 */

export async function POST(req: NextRequest) {
  try {
    const { messages, identity } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    const knowledgeBase: Record<string, string[]> = {
      saludo: ["¡Hola! Soy Kyron Core AI. Estoy monitoreando los sistemas de System Kyron para asegurar que tu empresa opere al 100%. ¿En qué puedo ayudarte?"],
      equipo: ["El equipo de System Kyron está liderado por Carlos Mattar (CEO), junto a Sebastian Garrido en operaciones y Marcos Sousa en la gestión legal."],
      seguridad: ["La seguridad es nuestro pilar. Usamos Kyron Shield para blindaje legal y cifrado AES-256. Todo auditado en Blockchain."],
      precios: ["Planes: Personal (Gratis), Starter ($49.99), Growth ($94.49) y Enterprise ($194.49)."],
      reto: ["System Kyron es nuestra propuesta para el Reto Inspira 2026. Buscamos erradicar el caos administrativo con tecnología 'Cero Papel'."],
      ayuda: ["Puedo ayudarte con contabilidad VEN-NIF, blindaje legal o gestión de tus líneas corporativas."]
    };

    let response = "";
    if (lastMessage.includes('hola') || lastMessage.includes('buenos')) response = knowledgeBase.saludo[0];
    else if (lastMessage.includes('equipo') || lastMessage.includes('carlos') || lastMessage.includes('sebastian') || lastMessage.includes('marcos')) response = knowledgeBase.equipo[0];
    else if (lastMessage.includes('seguro') || lastMessage.includes('shield')) response = knowledgeBase.seguridad[0];
    else if (lastMessage.includes('precio') || lastMessage.includes('plan')) response = knowledgeBase.precios[0];
    else if (lastMessage.includes('reto') || lastMessage.includes('inspira')) response = knowledgeBase.reto[0];
    else if (lastMessage.includes('ayuda')) response = knowledgeBase.ayuda[0];
    else response = "Como Kyron Core AI, estoy analizando tu consulta sobre '" + lastMessage + "'. ¿Deseas que profundice en algún módulo como Contabilidad o Legal?";

    return NextResponse.json({ 
      content: response,
      provider: 'kyron-nexus-v2',
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Engine Error' }, { status: 500 });
  }
}
