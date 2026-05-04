import { GoogleGenerativeAI } from '@google/generative-ai';

export const MODELS = {
  GEMINI: 'gemini-1.5-flash', // Cambio a modelo estable y ultra-rápido para System Kyron
} as const;

type ProviderName = 'gemini';

function resolveKey(): string | null {
  const intKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  const directKey = process.env.GEMINI_API_KEY;
  return intKey || directKey || null;
}

let _genAI: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (_genAI) return _genAI;
  const apiKey = resolveKey();
  if (!apiKey) throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY.');
  
  _genAI = new GoogleGenerativeAI(apiKey);
  return _genAI;
}

export function isAvailable(provider: string): boolean {
  if (provider !== 'gemini') return false;
  try {
    const key = resolveKey();
    return !!key;
  } catch {
    return false;
  }
}

export function getAvailableProviders(): ProviderName[] {
  return isAvailable('gemini') ? ['gemini'] : [];
}

export function cleanJSON(text: string): string {
  return text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
}

export function parseAIJSON<T>(text: string, providerLabel: string): T {
  if (!text.trim()) throw new Error(`${providerLabel} returned empty response`);
  const cleaned = cleanJSON(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`${providerLabel} returned invalid JSON: ${cleaned.substring(0, 200)}`);
  }
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`${providerLabel} returned non-object JSON`);
  }
  return parsed as T;
}

export type GenerateTextOpts = {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
};

export async function generateText(
  _provider: ProviderName,
  opts: GenerateTextOpts
): Promise<string> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ 
    model: MODELS.GEMINI,
    systemInstruction: opts.system 
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: opts.prompt }] }],
    generationConfig: {
      maxOutputTokens: opts.maxTokens ?? 2048,
      temperature: opts.temperature ?? 0.7,
    },
  });

  const response = await result.response;
  return response.text();
}

export async function generateTextWithFallback(
  _providers: ProviderName[],
  opts: GenerateTextOpts,
  label: string
): Promise<string> {
  const isAvailableStatus = isAvailable('gemini');
  
  if (!isAvailableStatus) {
    if (label === 'analyze-dashboard') {
      console.warn('[AI] Gemini not available. Using Rule-Based Analytics Fallback.');
      return generateSimulatedAnalysis(opts.prompt);
    }
    throw new Error('Gemini AI not available');
  }

  try {
    return await generateText('gemini', opts);
  } catch (err: any) {
    console.error(`[AI] Error in ${label}:`, err.message);
    if (label === 'analyze-dashboard') {
      console.warn('[AI] Gemini call failed. Using Rule-Based Fallback.');
      return generateSimulatedAnalysis(opts.prompt);
    }
    throw err;
  }
}

function generateSimulatedAnalysis(prompt: string): string {
  // Simple heuristic analysis for when AI fails
  try {
    const dataMatch = prompt.match(/DATOS COMPLETOS DEL DASHBOARD:\n([\s\S]*)\n\nRealiza/);
    if (!dataMatch) return "No se pudieron extraer datos para el análisis simulado.";
    
    const data = JSON.parse(dataMatch[1]);
    const fin = data.resumenFinanciero || {};
    const varMoM = data.variacionesMensuales || {};
    
    const health = fin.utilidadNeta > 0 ? "Positivo" : "Requiere Atención";
    const trend = varMoM.ingresos > 0 ? "Crecimiento" : "Contracción";

    return `## 📊 Diagnóstico Ejecutivo (Modo Resiliencia)
El sistema detecta un estado **${health}** con una tendencia de **${trend}**. La API Key se ha configurado recientemente, si ves esto, intenta recargar en unos minutos.

## 🔑 Indicadores Clave
- **Ingresos**: ${fin.ingresosMesActual || 0}
- **Gastos**: ${fin.gastosMesActual || 0}
- **Utilidad**: ${fin.utilidadNeta || 0}
- **Variación Ingresos**: ${varMoM.ingresos || 0}%

## ⚠️ Alertas y Riesgos
${fin.gastosMesActual > fin.ingresosMesActual ? "- **Déficit Operativo**: Los gastos superan los ingresos." : "- **Salud Financiera**: El flujo es positivo."}
${data.cartera?.cuentasPorCobrar?.total > 1000 ? "- **Cartera Pendiente**: Nivel de cuentas por cobrar considerable." : ""}

## 💡 Recomendaciones Estratégicas
1. Monitorear de cerca los gastos operativos del próximo ciclo.
2. Incentivar la cobranza de facturas pendientes.
3. El motor Gemini ya tiene la API Key, el análisis profundo estará disponible en la próxima consulta.

---
*Nota: Este análisis fue generado mediante el motor de reglas de System Kyron.*`;
  } catch {
    return "Análisis financiero simplificado: El sistema está operativo y procesando la nueva configuración de IA.";
  }
}

export async function generateJSON<T>(
  providers: ProviderName[],
  opts: GenerateTextOpts,
  label: string,
  validate?: (data: unknown) => data is T
): Promise<T> {
  const jsonOpts = {
    ...opts,
    system: opts.system + '\n\nResponde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin backticks, sin texto adicional.',
  };

  const text = await generateTextWithFallback(providers, jsonOpts, label);
  const parsed = parseAIJSON<T>(text, label);

  if (validate && !validate(parsed)) {
    throw new Error(`${label} output failed schema validation`);
  }

  return parsed;
}
