import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    let response = "Bienvenido a la prueba gratuita de System Kyron. " + 
                   "Esta es una demostración limitada de nuestro motor determinista. " +
                   "Para acceso completo a la IA cuántica y legal, por favor regístrate.";

    if (lastMessage.includes('hola')) {
      response = "¡Hola! Soy la versión de prueba de System Kyron. ¿En qué puedo ayudarte hoy?";
    }

    return NextResponse.json({ 
      content: response,
      provider: 'kyron-trial-engine',
      status: 'success' 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Trial Engine Error' }, { status: 500 });
  }
}
