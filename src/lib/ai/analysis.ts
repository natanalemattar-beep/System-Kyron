import { AiClient } from './client';
import type { AiAnalysisRequest } from './types';

const ANALYSIS_SYSTEM_PROMPT = 'Eres Kyron Analytics, especialista en dashboards contables bajo normas VEN-NIF y venezolanas. Analiza KPIs, identifica riesgos fiscales y sugiere acciones. Responde en markdown con: ## Diagnóstico, ## Riesgos, ## Recomendaciones. Máximo 800 palabras.';

export async function analyzeDashboard(request: AiAnalysisRequest): Promise<string> {
  const client = new AiClient();
  if (!client.isConfigured()) return 'IA no configurada.';
  const kpiSummary = Object.entries(request.data)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => '- ' + k + ': ' + (typeof v === 'number' ? (v >= 1000 ? v.toLocaleString('es-VE') : v.toFixed(2)) : String(v)))
    .join('\n');
  const prompt = (request.context ? 'Contexto: ' + request.context + '\n\n' : '') +
    'Módulo: ' + (request.module || 'Contabilidad VEN-NIF') + '\n\nKPIs:\n' + (kpiSummary || 'Sin KPIs.') +
    '\n\nFecha: ' + new Date().toLocaleDateString('es-VE') + '\n\nGenera análisis ejecutivo.';
  return client.generateWithSystem(prompt, ANALYSIS_SYSTEM_PROMPT, { temperature: 0.3, topP: 0.7, topK: 30, maxOutputTokens: 2048 });
}

export async function* analyzeDashboardStream(request: AiAnalysisRequest): AsyncGenerator<string> {
  const client = new AiClient();
  if (!client.isConfigured()) { yield 'IA no configurada'; return; }
  const kpiSummary = Object.entries(request.data)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => '- ' + k + ': ' + (typeof v === 'number' ? (v >= 1000 ? v.toLocaleString('es-VE') : v.toFixed(2)) : String(v)))
    .join('\n');
  const prompt = (request.context ? 'Contexto: ' + request.context + '\n\n' : '') +
    'Módulo: ' + (request.module || 'Contabilidad') + '\n\nKPIs:\n' + (kpiSummary || 'Sin KPIs.') + '\n\nGenera análisis.';
  const stream = client.generateStream(prompt, { temperature: 0.3, maxOutputTokens: 2048 });
  for await (const chunk of stream) { yield chunk; }
}
