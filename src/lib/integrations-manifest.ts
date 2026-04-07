/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           SYSTEM KYRON — INTEGRATIONS MANIFEST v1.0            ║
 * ║                                                                ║
 * ║  This file is the single source of truth for ALL external      ║
 * ║  integrations required by the platform. When migrating to a    ║
 * ║  new environment, connect each integration listed below.       ║
 * ║                                                                ║
 * ║  Runtime: getIntegrationStatus() returns live connectivity     ║
 * ║  for each service — call /api/integrations-health to verify.   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * MIGRATION CHECKLIST:
 * ────────────────────
 * 1. AI Providers (3):  Anthropic, OpenAI, Google Gemini
 * 2. Email:             Gmail (OAuth via Replit connector)
 * 3. Email (alt):       Outlook (OAuth via Replit connector)
 * 4. SMS/WhatsApp:      Twilio (API keys or Replit connector)
 * 5. Calendar:          Google Calendar (OAuth via Replit connector)
 * 6. Database:          PostgreSQL (Replit managed or DATABASE_URL)
 *
 * HOW INTEGRATIONS WORK:
 * ──────────────────────
 * On Replit: Integrations are installed via the Integrations panel.
 *   - AI providers inject AI_INTEGRATIONS_*_API_KEY env vars automatically.
 *   - OAuth services (Gmail, Outlook, Calendar) use the Replit Connector
 *     pattern: fetch tokens from REPLIT_CONNECTORS_HOSTNAME at runtime.
 *   - Twilio checks env vars first, then falls back to the connector.
 *
 * Outside Replit: Set the fallback env vars listed below manually.
 */

export interface IntegrationDef {
  id: string;
  name: string;
  category: 'ai' | 'email' | 'sms' | 'calendar' | 'database';
  required: boolean;
  clientFile: string;
  envVars: {
    replit: string[];
    fallback: string[];
  };
  connectorName?: string;
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
    envVars: {
      replit: ['AI_INTEGRATIONS_ANTHROPIC_API_KEY', 'AI_INTEGRATIONS_ANTHROPIC_BASE_URL'],
      fallback: ['ANTHROPIC_API_KEY'],
    },
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts — Kyron Chat (business/admin portals)',
      'src/app/api/ai/analyze-dashboard/route.ts — Dashboard AI analysis',
      'src/app/api/ai/fiscal-chat/route.ts — Fiscal assistant chat',
      'src/app/api/admin/kyron-mail-ai/route.ts — AI-powered email assistant',
    ],
    models: ['claude-sonnet-4-6'],
    notes: 'Primary AI for chat, document analysis, and legal generation. Supports text + vision.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    required: true,
    clientFile: 'src/ai/openai.ts',
    envVars: {
      replit: ['AI_INTEGRATIONS_OPENAI_API_KEY', 'AI_INTEGRATIONS_OPENAI_BASE_URL'],
      fallback: ['OPENAI_API_KEY'],
    },
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts — Kyron Chat (strategic analysis mode)',
      'src/app/api/ai/analyze-dashboard/route.ts — Dashboard AI analysis',
    ],
    models: ['gpt-4o-mini'],
    notes: 'Used for business analysis, predictions, and strategic insights.',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'ai',
    required: true,
    clientFile: 'src/ai/gemini.ts',
    envVars: {
      replit: ['AI_INTEGRATIONS_GEMINI_API_KEY', 'AI_INTEGRATIONS_GEMINI_BASE_URL'],
      fallback: ['GEMINI_API_KEY'],
    },
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts — Kyron Chat (personal portals)',
      'src/app/api/ai/kyron-chat-personal/route.ts — Personal portal chat',
    ],
    models: ['gemini-2.5-flash'],
    notes: 'Default for personal portal chat. Fast model for document processing.',
  },

  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'ai',
    required: false,
    clientFile: 'src/ai/deepseek.ts',
    envVars: {
      replit: [],
      fallback: ['DEEPSEEK_API_KEY'],
    },
    usedBy: [
      'src/app/api/ai/kyron-chat/route.ts — Kyron Chat (fallback provider)',
    ],
    models: ['deepseek-chat', 'deepseek-reasoner'],
    notes: 'OpenAI-compatible API. Used as additional fallback in chat. Base URL: https://api.deepseek.com',
  },

  // ── EMAIL ─────────────────────────────────────────────────────
  {
    id: 'gmail',
    name: 'Gmail (Google Mail)',
    category: 'email',
    required: true,
    clientFile: 'src/lib/gmail-client.ts',
    envVars: {
      replit: ['REPLIT_CONNECTORS_HOSTNAME', 'REPL_IDENTITY'],
      fallback: ['GMAIL_USER'],
    },
    connectorName: 'google-mail',
    usedBy: [
      'src/lib/email-service.ts — All outbound emails (verification codes, alerts, notifications)',
      'src/app/api/auth/send-code/route.ts — 2FA verification codes (6-digit OTP + magic link)',
      'src/app/api/auth/reset-password/route.ts — Password reset emails',
      'src/app/api/auth/register/route.ts — Registration verification',
      'src/app/api/admin/kyron-mail/route.ts — Admin email sending',
      'src/app/api/email/send/route.ts — General email endpoint',
    ],
    notes: 'OAuth2 via Replit connector. Sends branded HTML emails with System Kyron template. Always call getUncachableGmailClient() fresh — never cache the client instance.',
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    category: 'email',
    required: false,
    clientFile: 'src/lib/outlook-client.ts',
    envVars: {
      replit: ['REPLIT_CONNECTORS_HOSTNAME', 'REPL_IDENTITY'],
      fallback: [],
    },
    connectorName: 'outlook',
    usedBy: [
      'src/lib/outlook-client.ts — Alternative email provider (future use)',
    ],
    notes: 'OAuth2 via Replit connector. Uses Microsoft Graph API. Currently configured but Gmail is the primary sender.',
  },

  // ── SMS / WHATSAPP ────────────────────────────────────────────
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'sms',
    required: false,
    clientFile: 'src/lib/twilio-client.ts',
    envVars: {
      replit: ['REPLIT_CONNECTORS_HOSTNAME', 'REPL_IDENTITY'],
      fallback: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER', 'TWILIO_MESSAGING_SERVICE_SID'],
    },
    connectorName: 'twilio',
    usedBy: [
      'src/lib/sms-service.ts — SMS delivery service',
      'src/lib/whatsapp-service.ts — WhatsApp delivery (uses TWILIO_WHATSAPP_FROM)',
      'src/app/api/auth/send-code/route.ts — SMS/WhatsApp verification codes',
      'src/app/api/auth/login-phone/route.ts — Phone login verification',
      'src/app/api/notificaciones/route.ts — Multi-channel notifications',
      'src/lib/document-notifications.ts — Document status notifications',
    ],
    notes: 'Checks env vars first, then falls back to Replit connector. Supports SMS (TWILIO_PHONE_NUMBER) and WhatsApp (TWILIO_WHATSAPP_FROM). Also uses TWILIO_MESSAGING_SERVICE_SID for high-throughput.',
  },

  // ── CALENDAR ──────────────────────────────────────────────────
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'calendar',
    required: false,
    clientFile: 'N/A — connector installed, not yet consumed in code',
    envVars: {
      replit: ['REPLIT_CONNECTORS_HOSTNAME', 'REPL_IDENTITY'],
      fallback: [],
    },
    connectorName: 'google-calendar',
    usedBy: [],
    notes: 'Installed via Replit integration. Available for future calendar sync features (tax deadlines, legal hearings, HR events).',
  },

  // ── DATABASE ──────────────────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    required: true,
    clientFile: 'src/lib/db.ts',
    envVars: {
      replit: ['DATABASE_URL'],
      fallback: ['DATABASE_URL'],
    },
    usedBy: [
      'src/lib/db.ts — Connection pool (pg)',
      'src/lib/db-schema.ts — Auto-migration on startup (95+ tables)',
    ],
    notes: 'Replit provides a managed PostgreSQL instance. Schema auto-initializes on first boot via instrumentation.ts. Connection pool: max 10 connections, 30s idle timeout.',
  },
];

export function getIntegrationStatus(): Record<string, { configured: boolean; source: string }> {
  const status: Record<string, { configured: boolean; source: string }> = {};

  for (const integ of INTEGRATIONS) {
    if (integ.category === 'ai') {
      const apiKey = integ.envVars.replit.find(k => k.endsWith('_API_KEY') && !!process.env[k]);
      const fallbackKey = integ.envVars.fallback.find(k => !!process.env[k]);
      if (apiKey) {
        status[integ.id] = { configured: true, source: 'replit_integration' };
      } else if (fallbackKey) {
        status[integ.id] = { configured: true, source: 'env_var' };
      } else {
        status[integ.id] = { configured: false, source: 'none' };
      }
    } else if (integ.category === 'database') {
      status[integ.id] = { configured: !!process.env.DATABASE_URL, source: process.env.DATABASE_URL ? 'env_var' : 'none' };
    } else if (integ.connectorName) {
      const hasConnector = !!process.env.REPLIT_CONNECTORS_HOSTNAME && !!(process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL);
      const hasFallback = integ.envVars.fallback.length > 0 && integ.envVars.fallback.every(k => !!process.env[k]);
      if (hasFallback) {
        status[integ.id] = { configured: true, source: 'env_var' };
      } else if (hasConnector) {
        status[integ.id] = { configured: true, source: 'replit_connector' };
      } else {
        status[integ.id] = { configured: false, source: 'none' };
      }
    } else {
      status[integ.id] = { configured: false, source: 'none' };
    }
  }

  return status;
}

export function getMigrationChecklist(): string[] {
  return INTEGRATIONS
    .filter(i => i.required)
    .map(i => {
      const vars = i.envVars.fallback.length
        ? i.envVars.fallback.join(', ')
        : `Replit connector: ${i.connectorName}`;
      return `[${i.category.toUpperCase()}] ${i.name} → ${vars} (${i.clientFile})`;
    });
}
