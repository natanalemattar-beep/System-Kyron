import { query } from '@/lib/db';
import { emit } from '@/lib/event-bus';
import { decryptFile } from '@/lib/file-crypto';
import { readFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface DocumentRecord {
  id: number;
  user_id: number;
  nombre_original: string;
  nombre_almacenado: string;
  tipo_mime: string;
  tamano_bytes: number;
  hash_sha256: string;
  estatus: string;
  clasificacion: string | null;
  metadata: Record<string, unknown>;
  datos_extraidos: Record<string, unknown>;
  modulo_origen: string | null;
  entidad_id: number | null;
  entidad_tipo: string | null;
  created_at: string;
  processed_at: string | null;
}

export async function registerUpload({
  userId, originalName, storedName, mimeType, size, hash,
}: {
  userId: number;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  hash: string;
}): Promise<DocumentRecord> {
  const [doc] = await query<DocumentRecord>(
    `INSERT INTO documentos_recibidos (user_id, nombre_original, nombre_almacenado, tipo_mime, tamano_bytes, hash_sha256)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [userId, originalName, storedName, mimeType, size, hash]
  );
  emit('document:uploaded', { userId, docId: doc.id });
  return doc;
}

export async function updateDocumentStatus(
  id: number,
  estatus: DocumentRecord['estatus'],
  extra?: Partial<Pick<DocumentRecord, 'clasificacion' | 'metadata' | 'datos_extraidos' | 'modulo_origen' | 'entidad_id' | 'entidad_tipo'>>
) {
  const sets: string[] = ['estatus = $2'];
  const params: unknown[] = [id, estatus];
  let idx = 3;
  if (extra?.clasificacion !== undefined) { sets.push(`clasificacion = $${idx++}`); params.push(extra.clasificacion); }
  if (extra?.metadata !== undefined) { sets.push(`metadata = $${idx++}::jsonb`); params.push(JSON.stringify(extra.metadata)); }
  if (extra?.datos_extraidos !== undefined) { sets.push(`datos_extraidos = $${idx++}::jsonb`); params.push(JSON.stringify(extra.datos_extraidos)); }
  if (extra?.modulo_origen !== undefined) { sets.push(`modulo_origen = $${idx++}`); params.push(extra.modulo_origen); }
  if (extra?.entidad_id !== undefined) { sets.push(`entidad_id = $${idx++}`); params.push(extra.entidad_id); }
  if (extra?.entidad_tipo !== undefined) { sets.push(`entidad_tipo = $${idx++}`); params.push(extra.entidad_tipo); }
  if (estatus === 'analizado' || estatus === 'error') { sets.push(`processed_at = NOW()`); }
  await query(`UPDATE documentos_recibidos SET ${sets.join(', ')} WHERE id = $1`, params);
}

export async function processDocument(docId: number): Promise<void> {
  const [doc] = await query<DocumentRecord>(
    `SELECT * FROM documentos_recibidos WHERE id = $1`,
    [docId]
  );
  if (!doc) return;
  await updateDocumentStatus(docId, 'procesando');
  try {
    const filePath = path.join(process.cwd(), 'data', 'uploads', doc.nombre_almacenado);
    const encrypted = await readFile(filePath);
    const decrypted = decryptFile(encrypted);
    const text = decrypted.toString('utf-8').slice(0, 5000);
    const isImage = doc.tipo_mime.startsWith('image/');
    let clasificacion = 'general';
    let datos: Record<string, unknown> = {};
    let modulo: string | undefined;
    if (!isImage && text.length > 20) {
      const lower = text.toLowerCase();
      if (lower.includes('factura') || lower.includes('rif') || lower.includes('iva')) {
        clasificacion = 'factura';
        modulo = 'facturacion';
        const rifMatch = text.match(/[VJEPGvjepg]-?\d{6,8}-?\d/);
        const totalMatch = text.match(/total[:\s]*([\d,]+\.?\d*)/i);
        const fechaMatch = text.match(/\d{2}[-/]\d{2}[-/]\d{4}/);
        if (rifMatch) datos.rif = rifMatch[0];
        if (totalMatch) datos.total = totalMatch[1];
        if (fechaMatch) datos.fecha = fechaMatch[0];
      } else if (lower.includes('nomina') || lower.includes('sueldo') || lower.includes('empleado')) {
        clasificacion = 'nomina';
        modulo = 'rrhh';
      } else if (lower.includes('contrato') || lower.includes('clausula')) {
        clasificacion = 'contrato';
        modulo = 'juridico';
      }
    }
    await updateDocumentStatus(docId, 'clasificado', { clasificacion, datos_extraidos: datos, modulo_origen: modulo });
    if (clasificacion === 'factura' && modulo) {
      emit('document:classified:factura', { userId: doc.user_id, docId: doc.id, datos, modulo });
    }
    await updateDocumentStatus(docId, 'analizado');
  } catch (err) {
    console.error(`[documents] Error processing ${docId}:`, err);
    await updateDocumentStatus(docId, 'error');
  }
}
