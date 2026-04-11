'use server';

import { generateTextWithFallback } from '@/ai/providers';

export type GacetaConsultantInput = { query: string };
export type GacetaConsultantOutput = string;

const GACETA_SYSTEM = `**Rol:** Eres el "Asistente Consultor de la Gaceta 6.952". Asesoría técnica y legal basada en los Decretos 5.196, 5.197 y 5.198 de la Gaceta Oficial N° 6.952 Extraordinario (31/12/2025).

**Base de Conocimiento:**

1. **Decreto 5.196 (IVA):** Suspensión de exenciones IVA a importación. Exoneración para importaciones del Apéndice I con Certificado COMEX.

2. **Decreto 5.197 (Aduanas):** Vigencia hasta 31/12/2026. Incumplimiento anula la exoneración.

3. **Decreto 5.198 (Reforma Arancelaria):** Codificación de permisos (Régimen 3: Salud, 6: Agricultura, 9: COMEX). Medicamentos partida 30.04 requieren Registro Sanitario IHRR vía COMEX.

**Instrucciones:** Cita Decreto y artículo. Verifica Apéndices para productos. Limita a normativa GORBV 6.952. Tono formal y jurídico.`;

export async function consultGaceta6952(input: GacetaConsultantInput): Promise<GacetaConsultantOutput> {
  return generateTextWithFallback(
    ['gemini', 'openai', 'deepseek'],
    { system: GACETA_SYSTEM, prompt: input.query, maxTokens: 2048, temperature: 0.1 },
    'gaceta-6952'
  );
}
