import { query } from '@/lib/db';
import { sendNotificationEmail } from '@/lib/alert-email-service';
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';
import { sendSmsNotification } from '@/lib/sms-service';

const READY_STATES: Record<string, string[]> = {
  solicitud_civil: ['aprobado', 'entregado'],
  documento_juridico: ['vigente', 'firmado'],
  permiso_legal: ['vigente', 'aprobado'],
  factura: ['emitida', 'cobrada', 'pagada'],
  documento_ia: ['completado'],
};

const STATUS_LABELS: Record<string, string> = {
  aprobado: 'Aprobado',
  entregado: 'Entregado',
  vigente: 'Vigente',
  firmado: 'Firmado',
  emitida: 'Emitida',
  cobrada: 'Cobrada',
  pagada: 'Pagada',
  completado: 'Completado',
};

interface DocumentNotifyParams {
  userId: number;
  documentType: keyof typeof READY_STATES;
  documentTitle: string;
  newStatus: string;
  documentId: number;
  actionUrl?: string;
}

export async function notifyDocumentReady({
  userId,
  documentType,
  documentTitle,
  newStatus,
  documentId,
  actionUrl,
}: DocumentNotifyParams): Promise<void> {
  const readyStates = READY_STATES[documentType];
  if (!readyStates || !readyStates.includes(newStatus)) {
    return;
  }

  const statusLabel = STATUS_LABELS[newStatus] || newStatus;
  const titulo = `Documento listo: ${documentTitle}`;
  const mensaje = `Su documento "${documentTitle}" ha cambiado al estado: ${statusLabel}. Ya puede revisarlo en la plataforma.`;

  try {
    await query(
      `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, accion_url, metadata)
       VALUES ($1, 'exito', $2, $3, $4, $5)`,
      [
        userId,
        titulo,
        mensaje,
        actionUrl ?? null,
        JSON.stringify({ documentType, documentId, newStatus }),
      ]
    );

    const notification = { tipo: 'exito', titulo, mensaje, accion_url: actionUrl };

    await Promise.allSettled([
      sendNotificationEmail(userId, notification),
      sendWhatsAppNotification(userId, notification),
      sendSmsNotification(userId, notification),
    ]);
  } catch (err) {
    console.error('[document-notifications] Error:', err);
  }
}
