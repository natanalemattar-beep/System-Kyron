import { AiClient } from './client';
import type { AiSearchRequest, AiSearchResult } from './types';

const SEARCH_PROMPT = 'Eres un asistente de búsqueda inteligente. Analiza documentos y extrae información relevante para la consulta. Sé conciso.';

export async function searchDocuments(request: AiSearchRequest): Promise<string> {
  const client = new AiClient();
  if (!client.isConfigured()) return 'IA no configurada.';
  const docsText = request.documents.map((doc, i) => '[Documento ' + (i + 1) + ']:\n' + doc.slice(0, 3000)).join('\n\n');
  const prompt = 'CONSULTA: ' + request.query + '\n\nDOCUMENTOS:\n' + docsText + '\n\nResponde con la información más relevante.';
  return client.generateWithSystem(prompt, SEARCH_PROMPT, { temperature: 0.1, maxOutputTokens: 1024 });
}

export async function searchWithRelevance(request: AiSearchRequest): Promise<AiSearchResult[]> {
  const client = new AiClient();
  if (!client.isConfigured()) return [];
  const results: AiSearchResult[] = [];
  for (let i = 0; i < Math.min(request.documents.length, request.maxResults || 5); i++) {
    const doc = request.documents[i];
    const prompt = 'Relevancia (0-100) para: "' + request.query + '"\n\nDocumento:\n' + doc.slice(0, 2000) + '\n\nResponde SOLO con un número.';
    try {
      const scoreText = await client.generate(prompt, { temperature: 0, maxOutputTokens: 10 });
      const score = parseInt(scoreText.trim(), 10);
      const relevance = isNaN(score) ? 0 : Math.min(100, Math.max(0, score));
      if (relevance > 30) {
        results.push({ content: doc.slice(0, 1000), relevance: relevance / 100, source: 'Documento ' + (i + 1) });
      }
    } catch { continue; }
  }
  return results.sort((a, b) => b.relevance - a.relevance);
}
