/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           SYSTEM KYRON — INTEGRATIONS MANIFEST v1.0            ║
 * ║                                                                ║
 * ║  This file is the single source of truth for ALL external      ║
 * ║  integrations required by the platform.                        ║
 * ║                                                                ║
 * ║  Runtime: getIntegrationStatus() returns live connectivity     ║
 * ║  for each service — call /api/integrations-health to verify.   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

export interface IntegrationDef {
  id: string;
  name: string;
  category: 'ai' | 'email' | 'sms' | 'calendar' | 'database';
  required: boolean;
  clientFile: string;
  envVars: string[];
  usedBy: string[];
  models?: string[];
  notes?: string;
}

export const INTEGRATIONS: IntegrationDef[] = [
  // ── AI PROVIDERS ──────────────────────────────────────────────
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    category: 'ai',
    required: true,
    clientFile: 'src/ai/anthropic.ts',
    envVars: ['ANTHROPIC_API_KEY'],
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts',
      'src/app/api/ai/analyze-dashboard/route.ts',
      'src/app/api/ai/fiscal-chat/route.ts',
    ],
    models: ['claude-3-5-sonnet-latest'],
    notes: 'Primary AI for chat and document analysis.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    required: true,
    clientFile: 'src/ai/openai.ts',
    envVars: ['OPENAI_API_KEY'],
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts',
      'src/app/api/ai/analyze-dashboard/route.ts',
    ],
    models: ['gpt-4o', 'gpt-4o-mini'],
    notes: 'Used for strategic insights and DALL-E image generation.',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'ai',
    required: true,
    clientFile: 'src/ai/gemini.ts',
    envVars: ['GEMINI_API_KEY'],
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts',
    ],
    models: ['gemini-1.5-flash', 'gemini-1.5-pro'],
    notes: 'Fast model for document processing.',
  },

  // ── EMAIL ─────────────────────────────────────────────────────
  {
    id: 'gmail',
    name: 'Gmail / SMTP',
    category: 'email',
    required: true,
    clientFile: 'src/lib/gmail-client.ts',
    envVars: ['GMAIL_USER', 'GMAIL_APP_PASSWORD'],
    usedBy: [
      'src/lib/email-service.ts',
      'src/app/api/auth/send-code/route.ts',
    ],
    notes: 'Standard SMTP integration for outbound emails.',
  },

  // ── SMS / WHATSAPP ────────────────────────────────────────────
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'sms',
    required: false,
    clientFile: 'src/lib/twilio-client.ts',
    envVars: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER'],
    usedBy: [
      'src/lib/sms-service.ts',
      'src/app/api/auth/send-code/route.ts',
    ],
    notes: 'Standard Twilio API integration.',
  },

  // ── DATABASE ──────────────────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    required: true,
    clientFile: 'src/lib/db.ts',
    envVars: ['DATABASE_URL'],
    usedBy: [
      'src/lib/db.ts',
      'src/lib/db-schema.ts',
    ],
    notes: 'Managed PostgreSQL instance connection string.',
  },
];

export function getIntegrationStatus(): Record<string, { configured: boolean; source: string }> {
  const status: Record<string, { configured: boolean; source: string }> = {};

  for (const integ of INTEGRATIONS) {
    const isConfigured = integ.envVars.every(v => !!process.env[v]);
    status[integ.id] = { 
      configured: isConfigured, 
      source: isConfigured ? 'env_var' : 'none' 
    };
  }

  return status;
}

export function getMigrationChecklist(): string[] {
  return INTEGRATIONS
    .filter(i => i.required)
    .map(i => {
      return `[${i.category.toUpperCase()}] ${i.name} → ${i.envVars.join(', ')} (${i.clientFile})`;
    });
}
