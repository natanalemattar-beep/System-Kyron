import { generateJSON } from '@/ai/providers';

export interface InvestigacionNovedad {
  titulo: string;
  resumen: string;
  fuente_probable: string;
  impacto: 'alto' | 'medio' | 'bajo';
  categoria: 'laboral' | 'fiscal' | 'cambiario' | 'otro';
  accion_recomendada: string;
}

export async function investigarNovedadesRegulatorias(): Promise<InvestigacionNovedad[]> {
  const hoy = new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const system = `Eres el Agente de Investigación de System Kyron. Tu misión es analizar el panorama regulatorio de Venezuela.
Hoy es ${hoy}. 
Debes identificar posibles cambios legales, anuncios económicos o ajustes en tasas que suelen ocurrir en fechas clave (como el 1 de mayo o inicios de mes).
Genera un informe de investigación proactiva.`;

  const prompt = `Analiza la situación económica y legal en Venezuela para la fecha actual (${hoy}).
Considera:
1. Anuncios presidenciales (Salario Mínimo, Bonos, Cestaticket).
2. Reformas tributarias del SENIAT.
3. Providencias de la SUNDDE o BCV.

Responde con un array de objetos JSON con la estructura:
{
  "titulo": string,
  "resumen": string,
  "fuente_probable": string,
  "impacto": "alto" | "medio" | "bajo",
  "categoria": "laboral" | "fiscal" | "cambiario" | "otro",
  "accion_recomendada": string
}`;

  try {
    return await generateJSON<InvestigacionNovedad[]>(
      ['gemini'],
      { system, prompt, temperature: 0.8 },
      'ai-investigator'
    );
  } catch (err) {
    console.error('[AI-Investigator] Falló la investigación proactiva:', err);
    return [];
  }
}
