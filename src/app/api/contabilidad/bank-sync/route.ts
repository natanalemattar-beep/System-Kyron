import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, transaction } from '@/lib/db';
import { getUncachableGmailClient } from '@/lib/gmail-client';

export const dynamic = 'force-dynamic';

const BANCOS_VE: Record<string, { nombre: string; codigo: string; emailPatterns: string[]; subjectPatterns: string[] }> = {
  banesco: {
    nombre: 'Banesco',
    codigo: '0134',
    emailPatterns: ['@banesco.com', 'notificaciones@banesco.com', 'alertas@banesco.com'],
    subjectPatterns: ['banesco', 'notificación de transacción', 'movimiento de cuenta'],
  },
  mercantil: {
    nombre: 'Mercantil',
    codigo: '0105',
    emailPatterns: ['@mercantilbanco.com', '@bancomercantil.com', 'notificaciones@mercantilbanco.com'],
    subjectPatterns: ['mercantil', 'notificación', 'alerta de movimiento'],
  },
  provincial: {
    nombre: 'Provincial (BBVA)',
    codigo: '0108',
    emailPatterns: ['@provincial.com', '@bbvaprovincial.com', 'notificaciones@provincial.com'],
    subjectPatterns: ['provincial', 'bbva', 'alerta', 'notificación de operación'],
  },
  venezuela: {
    nombre: 'Banco de Venezuela',
    codigo: '0102',
    emailPatterns: ['@bancodevenezuela.com', '@bdv.com.ve', 'notificaciones@bancodevenezuela.com'],
    subjectPatterns: ['banco de venezuela', 'bdv', 'alerta de movimiento'],
  },
  bnc: {
    nombre: 'BNC',
    codigo: '0191',
    emailPatterns: ['@bnc.com.ve', 'notificaciones@bnc.com.ve'],
    subjectPatterns: ['bnc', 'bicentenario', 'notificación'],
  },
  bod: {
    nombre: 'BOD',
    codigo: '0116',
    emailPatterns: ['@bod.com.ve', 'notificaciones@bod.com.ve'],
    subjectPatterns: ['bod', 'occidental de descuento'],
  },
  exterior: {
    nombre: 'Banco Exterior',
    codigo: '0115',
    emailPatterns: ['@bancoexterior.com', 'notificaciones@bancoexterior.com'],
    subjectPatterns: ['exterior', 'banco exterior'],
  },
  fondo_comun: {
    nombre: 'Banco Fondo Común (BFC)',
    codigo: '0151',
    emailPatterns: ['@bfc.com.ve', 'notificaciones@bfc.com.ve'],
    subjectPatterns: ['bfc', 'fondo común', 'fondo comun'],
  },
  bancaribe: {
    nombre: 'Bancaribe',
    codigo: '0114',
    emailPatterns: ['@bancaribe.com.ve', 'notificaciones@bancaribe.com.ve'],
    subjectPatterns: ['bancaribe'],
  },
  sofitasa: {
    nombre: 'Sofitasa',
    codigo: '0137',
    emailPatterns: ['@sofitasa.com', 'notificaciones@sofitasa.com'],
    subjectPatterns: ['sofitasa'],
  },
};

function parseTransactionFromEmail(body: string, subject: string): { monto: number; tipo: string; referencia: string; concepto: string; fecha: string | null } | null {
  const cleanBody = body.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  const combined = (subject + ' ' + cleanBody).toLowerCase();

  const montoPatterns = [
    /(?:monto|amount|bs\.?|bsf?\.?|ves|bolivares?)\s*[:\s]*([0-9]{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/i,
    /([0-9]{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))\s*(?:bs\.?|bsf?\.?|ves|bolivares?)/i,
    /monto\s*[:\s]*\$?\s*([0-9]{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/i,
    /([0-9]+(?:[.,]\d{2}))\s*(?:bs|ves)/i,
  ];

  let monto = 0;
  for (const pattern of montoPatterns) {
    const match = combined.match(pattern);
    if (match) {
      let raw = match[1];
      if (/\d\.\d{3}/.test(raw)) {
        raw = raw.replace(/\./g, '').replace(',', '.');
      } else {
        raw = raw.replace(/,/g, '');
      }
      monto = parseFloat(raw);
      if (!isNaN(monto) && monto > 0) break;
      monto = 0;
    }
  }

  if (monto <= 0) return null;

  let tipo = 'credito';
  const debitKeywords = ['débito', 'debito', 'cargo', 'retiro', 'pago', 'transferencia enviada', 'egreso', 'compra', 'punto de venta', 'pos'];
  const creditKeywords = ['crédito', 'credito', 'abono', 'depósito', 'deposito', 'transferencia recibida', 'ingreso'];
  for (const kw of debitKeywords) {
    if (combined.includes(kw)) { tipo = 'debito'; break; }
  }
  for (const kw of creditKeywords) {
    if (combined.includes(kw)) { tipo = 'credito'; break; }
  }

  const refPatterns = [
    /(?:referencia|ref\.?|nro\.?\s*ref|comprobante)\s*[:\s#]*([A-Z0-9\-]{4,20})/i,
    /(?:referencia|ref)\s*[:\s]*(\d{6,20})/i,
  ];
  let referencia = '';
  for (const p of refPatterns) {
    const m = combined.match(p);
    if (m) { referencia = m[1].trim(); break; }
  }

  const fechaPatterns = [
    /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/,
    /(\d{4})-(\d{2})-(\d{2})/,
  ];
  let fecha: string | null = null;
  for (const p of fechaPatterns) {
    const m = combined.match(p);
    if (m) {
      if (m[1].length === 4) {
        fecha = `${m[1]}-${m[2]}-${m[3]}`;
      } else {
        const y = m[3].length === 2 ? '20' + m[3] : m[3];
        fecha = `${y}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
      }
      break;
    }
  }

  const conceptoMatch = cleanBody.match(/(?:concepto|descripci[oó]n|detalle|motivo)\s*[:\s]*([^\n.]{5,80})/i);
  const concepto = conceptoMatch ? conceptoMatch[1].trim() : (subject.length > 5 ? subject.substring(0, 100) : 'Movimiento bancario');

  return { monto, tipo, referencia: referencia || null!, concepto, fecha };
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  return NextResponse.json({ bancos: Object.entries(BANCOS_VE).map(([key, b]) => ({ key, nombre: b.nombre, codigo: b.codigo })) });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'sync') {
      const { cuenta_id, banco_key } = body;
      const banco = BANCOS_VE[banco_key];
      if (!banco) {
        return NextResponse.json({ error: 'Banco no reconocido' }, { status: 400 });
      }

      let cuentaId: number | null = null;
      if (cuenta_id) {
        const check = await query('SELECT id FROM cuentas_bancarias WHERE id = $1 AND user_id = $2', [cuenta_id, session.userId]);
        if (!check.length) {
          return NextResponse.json({ error: 'Cuenta bancaria no encontrada' }, { status: 404 });
        }
        cuentaId = cuenta_id;
      }

      let gmail;
      try {
        gmail = await getUncachableGmailClient();
      } catch {
        return NextResponse.json({
          error: 'No se pudo conectar con Gmail. Verifique que la integración de Google Mail esté activa.',
          requiere_integracion: true,
        }, { status: 503 });
      }

      const fromQuery = banco.emailPatterns.map(p => `from:${p}`).join(' OR ');
      const subjectQuery = banco.subjectPatterns.map(s => `subject:"${s}"`).join(' OR ');
      const searchQuery = `(${fromQuery} OR ${subjectQuery}) newer_than:30d`;

      let messageIds: string[] = [];
      try {
        const listRes = await gmail.users.messages.list({
          userId: 'me',
          q: searchQuery,
          maxResults: 100,
        });
        messageIds = (listRes.data.messages || []).map((m: any) => m.id).filter(Boolean);
      } catch (err: any) {
        console.error('[bank-sync] Gmail search error:', err.message);
        return NextResponse.json({
          error: 'Error al buscar correos bancarios. Intente de nuevo.',
          detalle: err.message,
        }, { status: 500 });
      }

      if (messageIds.length === 0) {
        return NextResponse.json({
          success: true,
          importados: 0,
          mensaje: `No se encontraron correos de ${banco.nombre} en los últimos 30 días.`,
          busqueda: searchQuery,
        });
      }

      const existingRefs = new Set<string>();
      const existingRows = await query(
        'SELECT referencia FROM movimientos_bancarios WHERE user_id = $1 AND referencia IS NOT NULL AND referencia != \'\'',
        [session.userId]
      );
      for (const r of existingRows) {
        if (r.referencia) existingRefs.add(r.referencia.toLowerCase());
      }

      const movimientos: { fecha_operacion: string; concepto: string; monto: number; tipo: string; referencia: string | null; }[] = [];
      const errores: string[] = [];

      for (const msgId of messageIds.slice(0, 50)) {
        try {
          const msg = await gmail.users.messages.get({
            userId: 'me',
            id: msgId,
            format: 'full',
          });

          const headers = msg.data.payload?.headers || [];
          const subject = headers.find((h: any) => h.name?.toLowerCase() === 'subject')?.value || '';

          let bodyText = '';
          const parts = msg.data.payload?.parts || [];
          if (parts.length > 0) {
            for (const part of parts) {
              if (part.mimeType === 'text/plain' && part.body?.data) {
                bodyText += Buffer.from(part.body.data, 'base64').toString('utf-8');
              } else if (part.mimeType === 'text/html' && part.body?.data && !bodyText) {
                bodyText += Buffer.from(part.body.data, 'base64').toString('utf-8');
              }
            }
          } else if (msg.data.payload?.body?.data) {
            bodyText = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
          }

          if (!bodyText && !subject) continue;

          const parsed = parseTransactionFromEmail(bodyText, subject);
          if (!parsed) {
            errores.push(`No se pudo extraer datos del correo: "${subject.substring(0, 50)}"`);
            continue;
          }

          if (parsed.referencia && existingRefs.has(parsed.referencia.toLowerCase())) {
            continue;
          }

          const fecha = parsed.fecha || new Date(parseInt(msg.data.internalDate || '0')).toISOString().split('T')[0];

          movimientos.push({
            fecha_operacion: fecha,
            concepto: parsed.concepto,
            monto: parsed.monto,
            tipo: parsed.tipo,
            referencia: parsed.referencia,
          });

          if (parsed.referencia) existingRefs.add(parsed.referencia.toLowerCase());
        } catch (err: any) {
          errores.push(`Error leyendo correo ${msgId}: ${err.message}`);
        }
      }

      if (movimientos.length === 0) {
        return NextResponse.json({
          success: true,
          importados: 0,
          correos_encontrados: messageIds.length,
          mensaje: 'Se encontraron correos pero no se pudieron extraer movimientos válidos, o ya estaban registrados.',
          errores: errores.slice(0, 10),
        });
      }

      const insertedCount = await transaction(async (client) => {
        let count = 0;
        for (const mov of movimientos) {
          await client.query(
            `INSERT INTO movimientos_bancarios (user_id, cuenta_id, fecha_operacion, concepto, monto, tipo, referencia, categoria)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [session.userId, cuentaId, mov.fecha_operacion, mov.concepto, mov.monto, mov.tipo, mov.referencia, banco.nombre]
          );
          count++;
        }

        if (cuentaId) {
          await client.query(
            'UPDATE cuentas_bancarias SET ultima_sincronizacion = NOW() WHERE id = $1 AND user_id = $2',
            [cuentaId, session.userId]
          );
        }

        return count;
      });

      return NextResponse.json({
        success: true,
        importados: insertedCount,
        correos_encontrados: messageIds.length,
        errores: errores.length,
        detalle_errores: errores.slice(0, 10),
        banco: banco.nombre,
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err: any) {
    console.error('[bank-sync] Error:', err);
    return NextResponse.json({ error: 'Error en la sincronización bancaria' }, { status: 500 });
  }
}
