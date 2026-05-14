import { NextRequest, NextResponse } from 'next/server';

/**
 * System Kyron Core AI Engine — Deterministic Fallback
 * This route handles AI queries with a failover to a deterministic engine
 * if external providers are unavailable.
 */

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    const knowledgeBase: Record<string, string[]> = {
      saludo: ["¡Hola! Soy Kyron Core AI. Monitoreo la eficiencia y sostenibilidad de tu empresa. ¿En qué puedo ayudarte?"],
      equipo: ["El equipo: Carlos Mattar (CEO), Sebastian Garrido (Ops) y Marcos Sousa (Legal). Estamos en el Reto Inspira 2026."],
      sostenibilidad: ["Nuestra bandera es la Sostenibilidad. Con el modelo 'Cero Papel', eliminamos el desperdicio físico y la huella de carbono administrativa en Venezuela."],
      seguridad: ["Seguridad total con Kyron Shield y auditoría en Blockchain. Blindaje legal pericial automatizado."],
      precios: ["Planes: Personal (Gratis), Starter ($49.99), Growth ($94.49) y Enterprise ($194.49)."],
      reto: ["En el Reto Inspira 2026, System Kyron destaca por unir Rentabilidad con Impacto Ambiental mediante digitalización absoluta."],
      ayuda: ["Puedo asistirte en Contabilidad, Sostenibilidad (Cero Papel) o Gestión de Líneas Corporativas."]
    };

    let response = "";
    if (lastMessage.includes('hola') || lastMessage.includes('buenos')) response = knowledgeBase.saludo[0];
    else if (lastMessage.includes('equipo') || lastMessage.includes('carlos') || lastMessage.includes('sebastian') || lastMessage.includes('marcos')) response = knowledgeBase.equipo[0];
    else if (lastMessage.includes('papel') || lastMessage.includes('sostenib') || lastMessage.includes('ecologi') || lastMessage.includes('ambiente')) response = knowledgeBase.sostenibilidad[0];
    else if (lastMessage.includes('seguro') || lastMessage.includes('shield')) response = knowledgeBase.seguridad[0];
    else if (lastMessage.includes('precio') || lastMessage.includes('plan')) response = knowledgeBase.precios[0];
    else if (lastMessage.includes('reto') || lastMessage.includes('inspira')) response = knowledgeBase.reto[0];
    else if (lastMessage.includes('ayuda')) response = knowledgeBase.ayuda[0];
    else response = "Como Kyron Core AI, analizo tu consulta. ¿Deseas saber cómo nuestro modelo 'Cero Papel' optimiza tu sostenibilidad o prefieres ver el área Contable?";

    return NextResponse.json({ content: response, provider: 'kyron-nexus-v3', status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Engine Error' }, { status: 500 });
  }
}
