export class AiError extends Error {
  constructor(
    message: string,
    public code: 'CONFIG_ERROR' | 'QUOTA_EXCEEDED' | 'SAFETY_BLOCK' | 'API_ERROR' | 'NETWORK_ERROR' | 'TIMEOUT'
  ) {
    super(message);
    this.name = 'AiError';
  }

  static isQuotaError(err: unknown): boolean {
    const msg = err instanceof Error ? err.message : String(err);
    return msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED');
  }

  static isSafetyBlock(err: unknown): boolean {
    const msg = err instanceof Error ? err.message : String(err);
    return msg.includes('SAFETY') || msg.includes('blocked');
  }

  static isApiKeyError(err: unknown): boolean {
    const msg = err instanceof Error ? err.message : String(err);
    return msg.includes('API_KEY') || msg.includes('API key') || msg.includes('not valid') || msg.includes('403');
  }

  static isNetworkError(err: unknown): boolean {
    const msg = err instanceof Error ? err.message : String(err);
    return msg.includes('fetch') || msg.includes('network') || msg.includes('ENOTFOUND') || msg.includes('ECONNREFUSED');
  }

  static from(err: unknown): AiError {
    if (AiError.isQuotaError(err)) {
      return new AiError('Cuota de API agotada. Espera unos minutos e inténtalo de nuevo.', 'QUOTA_EXCEEDED');
    }
    if (AiError.isSafetyBlock(err)) {
      return new AiError('Mensaje bloqueado por políticas de seguridad. Reformula tu consulta.', 'SAFETY_BLOCK');
    }
    if (AiError.isApiKeyError(err)) {
      return new AiError('La API Key de Gemini no es válida. Verifica GOOGLE_GENERATIVE_AI_API_KEY.', 'CONFIG_ERROR');
    }
    if (AiError.isNetworkError(err)) {
      return new AiError('Error de conexión con el servicio de IA. Verifica tu conexión a internet.', 'NETWORK_ERROR');
    }
    return new AiError(err instanceof Error ? err.message : 'Error desconocido del servicio de IA', 'API_ERROR');
  }
}
