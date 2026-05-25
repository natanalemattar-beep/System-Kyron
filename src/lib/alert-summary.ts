import { query } from '@/lib/db';
import { AiClient } from '@/lib/ai/client';

interface QueuedAlert {
  id: number;
  user_id: number;
  dedup_key: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  prioridad: string;
  metadata: Record<string, unknown>;
  categoria: string;
  created_at: string;
}

export async function generateWeeklySummary(): Promise<{ user_id: number; summary: string; count: number }[]> {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const users = await query<{ user_id: number }>(
    `SELECT DISTINCT user_id FROM alert_queue WHERE created_at >= $1 ORDER BY user_id`,
    [cutoff]
  );

  if (users.length === 0) return [];

  const ai = new AiClient();
  const summaries: { user_id: number; summary: string; count: number }[] = [];

  for (const { user_id } of users) {
    try {
      const alerts = await query<QueuedAlert>(
        `SELECT * FROM alert_queue WHERE user_id = $1 AND created_at >= $2 ORDER BY created_at DESC`,
        [user_id, cutoff]
      );

      if (alerts.length === 0) continue;

      const grouped = groupAlerts(alerts);
      const summary = await generateAiSummary(ai, grouped, alerts.length);

      await query(
        `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
         VALUES ($1, 'info', 'Resumen semanal de alertas', $2, 'normal', 'app', $3)`,
        [
          user_id,
          summary,
          JSON.stringify({
            generated_by: 'alert_summary_ai',
            total_alertas: alerts.length,
            categorias: Object.keys(grouped),
            generated_at: new Date().toISOString(),
          }),
        ]
      );

      summaries.push({ user_id, summary, count: alerts.length });
    } catch (err) {
      console.error(`[alert-summary] Error generando resumen para user ${user_id}:`, err);
    }
  }

  await query(
    `DELETE FROM alert_queue WHERE created_at >= $1`,
    [cutoff]
  );

  return summaries;
}

function groupAlerts(alerts: QueuedAlert[]): Record<string, QueuedAlert[]> {
  const grouped: Record<string, QueuedAlert[]> = {};
  for (const alert of alerts) {
    const cat = alert.categoria || 'general';
    if (!grouped[cat]) grouped[cat] = [];
    if (grouped[cat].length < 5) grouped[cat].push(alert);
  }
  return grouped;
}

async function generateAiSummary(
  ai: AiClient,
  grouped: Record<string, QueuedAlert[]>,
  totalCount: number
): Promise<string> {
  const sections: string[] = [];

  for (const [categoria, alerts] of Object.entries(grouped)) {
    const lines = alerts.map(a => `• ${a.titulo}: ${a.mensaje}`).join('\n');
    sections.push(`=== ${categoria.toUpperCase()} ===\n${lines}`);
  }

  const prompt = `Eres un asistente que resume alertas de negocio para emprendedores venezolanos.

Estas son las alertas no urgentes de la semana (${totalCount} en total):

${sections.join('\n\n')}

Escribe un resumen en español, natural y conversacional, como si le hablaras al dueño del negocio. Menciona los temas más importantes sin enumerar uno por uno. Sé breve (máximo 4 líneas). No uses viñetas ni markdown.`;

  try {
    const response = await ai.generateText(prompt, {
      temperature: 0.4,
      maxTokens: 300,
    });

    const cleaned = response.trim().replace(/^["']|["']$/g, '');
    return cleaned || fallbackSummary(grouped, totalCount);
  } catch {
    return fallbackSummary(grouped, totalCount);
  }
}

function fallbackSummary(grouped: Record<string, QueuedAlert[]>, totalCount: number): string {
  const cats = Object.keys(grouped);
  return `Tienes ${totalCount} alerta(s) de la semana en ${cats.length} área(s): ${cats.join(', ')}. Revisa tu buzón para más detalle.`;
}
