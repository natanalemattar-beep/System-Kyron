/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           SYSTEM KYRON — INTEGRATIONS MANIFEST v2.0            ║
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
  category: 'core' | 'email' | 'sms' | 'calendar' | 'database';
  required: boolean;
  clientFile: string;
  envVars: string[];
  usedBy: string[];
  models?: string[];
  notes?: string;
}

export const INTEGRATIONS: IntegrationDef[] = [
  // ── CORE ENGINE ──────────────────────────────────────────────
  {
    id: 'kyron_core',
    name: 'Kyron Core Engine',
    category: 'core',
    required: true,
    clientFile: 'src/lib/document-verifier.ts',
    envVars: [],
    usedBy: [
      'src/app/api/core/engine-query/route.ts',
      'src/lib/document-verifier.ts',
    ],
    notes: 'Primary deterministic engine for audit and verification.',
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
