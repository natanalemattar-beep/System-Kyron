export interface AiMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface AiConfig {
  model?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
}

export interface AiChatRequest {
  messages: AiMessage[];
  context?: string;
  systemPrompt?: string;
  config?: AiConfig;
  stream?: boolean;
}

export interface AiChatResponse {
  content: string;
  provider: string;
  status: 'success' | 'error' | 'offline';
  error?: string;
}

export interface AiAnalysisRequest {
  module: string;
  data: Record<string, unknown>;
  context?: string;
  stream?: boolean;
}

export interface AiSearchRequest {
  query: string;
  documents: string[];
  maxResults?: number;
}

export interface AiSearchResult {
  content: string;
  relevance: number;
  source?: string;
}

export type AiIdentity = 'kyron-master' | 'fiscal' | 'legal' | 'telecom' | 'verde' | 'rrhh' | 'support' | 'personal';

export const AI_IDENTITY_CONFIG: Record<AiIdentity, { name: string; systemPrompt: string }> = {
  'kyron-master': { name: 'Kyron Master', systemPrompt: 'Eres Kyron Core, la inteligencia oficial de System Kyron.' },
  fiscal: { name: 'Asesor Fiscal', systemPrompt: 'Eres un contador senior experto en VEN-NIF, SENIAT, IVA (16%), IGTF (3%), ISLR y normativa fiscal venezolana.' },
  legal: { name: 'Asesor Legal', systemPrompt: 'Eres un abogado experto en SAREN, SAPI, contratos y derecho corporativo venezolano.' },
  telecom: { name: 'Especialista Telecom', systemPrompt: 'Eres un ingeniero de telecomunicaciones experto en 5G, CONATEL, gestión de eSIM y redes empresariales.' },
  verde: { name: 'Kyron Verde', systemPrompt: 'Eres un consultor de sostenibilidad. Tu enfoque es la responsabilidad social, reciclaje de hardware y reducción de huella de carbono.' },
  rrhh: { name: 'Especialista RRHH', systemPrompt: 'Eres un especialista en recursos humanos experto en LOTTT, nómina, contratos laborales y administración de personal.' },
  support: { name: 'Soporte Kyron', systemPrompt: 'Eres un agente de soporte de System Kyron. Ayudas con problemas técnicos y preguntas sobre la plataforma.' },
  personal: { name: 'Asistente Personal', systemPrompt: 'Eres un asistente personal para ciudadanos. Ayudas con trámites, documentos, citas y servicios públicos.' },
};
