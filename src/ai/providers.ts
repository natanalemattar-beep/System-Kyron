import { GoogleGenAI } from '@google/genai';

export const MODELS = {
  GEMINI: 'gemini-1.5-flash',
} as const;

type ProviderName = 'gemini';

function resolveKey(): { apiKey: string; baseURL?: string } | null {
  const intKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  const intBase = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
  const directKey = process.env.GEMINI_API_KEY;

  if (intKey && intBase) return { apiKey: intKey, baseURL: intBase };
  if (directKey) return { apiKey: directKey };
  return null;
}

let _gemini: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (_gemini) return _gemini;
  const cfg = resolveKey();
  if (!cfg) throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY.');
  
  _gemini = new GoogleGenAI(cfg.apiKey);
  return _gemini;
}

export function isAvailable(provider: string): boolean {
  if (provider !== 'gemini') return false;
  try {
    getGeminiClient();
    return true;
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
  const client = getGeminiClient();
  const res = await client.models.generateContent({
    model: MODELS.GEMINI,
    contents: opts.prompt,
    config: {
      systemInstruction: opts.system,
      maxOutputTokens: opts.maxTokens ?? 2048,
      temperature: opts.temperature,
    },
  });
  return res.text ?? '';
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
    if (label === 'analyze-dashboard') {
      console.warn('[AI] Gemini call failed. Using Rule-Based Fallback. Error:', err.message);
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
El sistema detecta un estado **${health}** con una tendencia de **${trend}**. El análisis inteligente completo requiere la configuración de la API Key en el servidor.

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
3. Configurar la API Key de Gemini para obtener recomendaciones avanzadas basadas en IA.

---
*Nota: Este análisis fue generado mediante el motor de reglas de System Kyron debido a la indisponibilidad temporal del proveedor de IA.*`;
  } catch {
    return "Análisis financiero simplificado: El sistema está operativo pero requiere configuración de IA para detalles profundos.";
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
