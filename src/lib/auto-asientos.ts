import { query } from '@/lib/db';
import { on } from '@/lib/event-bus';
import { updateDocumentStatus } from '@/lib/documents';

export function initAutoAsientos() {
  on<{
    userId: number;
    docId: number;
    datos: Record<string, unknown>;
    modulo: string;
  }>('document:classified:factura', async (payload) => {
    try {
      await updateDocumentStatus(payload.docId, 'analizado', {
        modulo_origen: 'facturacion',
        entidad_tipo: 'factura_pendiente',
      });
    } catch (err) {
      console.error('[auto-asientos] Error linking classified document:', err);
    }
  });
  on<{
    userId: number;
    facturaId: number;
    numero: string;
    tipo: string;
    total: number;
    baseImponible: number;
    iva: number;
    moneda: string;
    items: any[];
  }>('factura:emitida', async (payload) => {
    try {
      const sufijo = payload.tipo === 'NOTA_CREDITO' ? '_NC' : payload.tipo === 'NOTA_DEBITO' ? '_ND' : '';
      const ref = `factura:${payload.facturaId}`;
      const existing = await query(
        `SELECT id FROM libro_diario_asientos WHERE referencia_doc = $1 AND user_id = $2`,
        [ref, payload.userId]
      );
      if (existing.length > 0) return;

      const descripcion = `${payload.tipo} ${payload.numero}`;

      if (payload.tipo === 'NOTA_CREDITO') {
        const debe = [
          { cuenta: `4.01.01${sufijo}`, descripcion, debe: 0, haber: payload.baseImponible, tipo: 'ingreso' },
          { cuenta: `4.01.02${sufijo}`, descripcion, debe: 0, haber: payload.iva, tipo: 'ingreso' },
          { cuenta: `1.03.01${sufijo}`, descripcion, debe: payload.baseImponible + payload.iva, haber: 0, tipo: 'activo' },
        ];
        for (const asiento of debe) {
          await query(
            `INSERT INTO libro_diario_asientos (user_id, fecha, descripcion, cuenta_contable, debe, haber, tipo_cuenta, referencia_doc, referencia_id)
             VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8)`,
            [payload.userId, descripcion, asiento.cuenta, asiento.debe, asiento.haber, asiento.tipo, ref, payload.facturaId]
          );
        }
      } else if (payload.tipo === 'NOTA_DEBITO') {
        const debe = [
          { cuenta: `1.03.01${sufijo}`, descripcion, debe: payload.baseImponible + payload.iva, haber: 0, tipo: 'activo' },
          { cuenta: `4.01.01${sufijo}`, descripcion, debe: 0, haber: payload.baseImponible, tipo: 'ingreso' },
          { cuenta: `4.01.02${sufijo}`, descripcion, debe: 0, haber: payload.iva, tipo: 'ingreso' },
        ];
        for (const asiento of debe) {
          await query(
            `INSERT INTO libro_diario_asientos (user_id, fecha, descripcion, cuenta_contable, debe, haber, tipo_cuenta, referencia_doc, referencia_id)
             VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8)`,
            [payload.userId, descripcion, asiento.cuenta, asiento.debe, asiento.haber, asiento.tipo, ref, payload.facturaId]
          );
        }
      } else {
        const asientos = [
          { cuenta: '1.03.01', descripcion, debe: payload.baseImponible + payload.iva, haber: 0, tipo: 'activo' },
          { cuenta: '4.01.01', descripcion, debe: 0, haber: payload.baseImponible, tipo: 'ingreso' },
          { cuenta: '4.01.02', descripcion, debe: 0, haber: payload.iva, tipo: 'ingreso' },
        ];
        for (const asiento of asientos) {
          await query(
            `INSERT INTO libro_diario_asientos (user_id, fecha, descripcion, cuenta_contable, debe, haber, tipo_cuenta, referencia_doc, referencia_id)
             VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8)`,
            [payload.userId, descripcion, asiento.cuenta, asiento.debe, asiento.haber, asiento.tipo, ref, payload.facturaId]
          );
        }
      }
    } catch (err) {
      console.error('[auto-asientos] Error processing factura:', err);
    }
  });
}
