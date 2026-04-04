import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { verifyDocument, VerificationResult } from '@/lib/document-verifier';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  try {
    const body = await req.json();
    const { filePath, originalName, mimeType, docCategory, documentoId } = body;

    if (!filePath || !originalName || !mimeType) {
      return NextResponse.json({ error: 'Datos del archivo incompletos' }, { status: 400 });
    }

    const normalizedPath = String(filePath).replace(/\\/g, '/');
    if (
      !normalizedPath.startsWith('/uploads/') ||
      normalizedPath.includes('..') ||
      normalizedPath.includes('\0') ||
      /[^a-zA-Z0-9._\-\/]/.test(normalizedPath.replace('/uploads/', ''))
    ) {
      return NextResponse.json({ error: 'Ruta de archivo no válida' }, { status: 400 });
    }

    const existing = await queryOne(
      `SELECT id, veredicto, puntaje_total, resultado FROM verificaciones_documentos
       WHERE user_id = $1 AND archivo_path = $2 AND created_at > NOW() - INTERVAL '24 hours'
       ORDER BY created_at DESC LIMIT 1`,
      [session.userId, filePath]
    );

    if (existing) {
      const prev = existing as { id: number; veredicto: string; puntaje_total: number; resultado: unknown };
      return NextResponse.json({
        cached: true,
        verificacion_id: prev.id,
        resultado: prev.resultado,
      });
    }

    const resultado = await verifyDocument(filePath, originalName, mimeType, docCategory || 'general');

    const [row] = await query(
      `INSERT INTO verificaciones_documentos
       (user_id, documento_id, archivo_path, archivo_nombre, tipo_mime, categoria, hash_sha256,
        veredicto, confianza, puntaje_total, resultado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [
        session.userId,
        documentoId ?? null,
        filePath,
        originalName,
        mimeType,
        docCategory || 'general',
        resultado.hash_sha256,
        resultado.veredicto,
        resultado.confianza,
        resultado.puntaje_total,
        JSON.stringify(resultado),
      ]
    );

    await logActivity({
      userId: session.userId,
      evento: 'DOCUMENTO_VERIFICADO',
      categoria: 'seguridad',
      descripcion: `Verificación: ${originalName} → ${resultado.veredicto.toUpperCase()} (${resultado.puntaje_total}%)`,
      entidadTipo: 'verificacion_documento',
      entidadId: (row as { id: number }).id,
      metadata: {
        veredicto: resultado.veredicto,
        puntaje: resultado.puntaje_total,
        alertas: resultado.alertas.length,
        hash: resultado.hash_sha256.substring(0, 16),
      },
    });

    return NextResponse.json({
      cached: false,
      verificacion_id: (row as { id: number }).id,
      resultado,
    });
  } catch (err) {
    console.error('[verificar-documento] Error:', err);
    return NextResponse.json({ error: 'Error al verificar el documento' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const documentoId = searchParams.get('documento_id');
  const archivoPath = searchParams.get('archivo_path');

  let rows;
  if (documentoId) {
    rows = await query(
      `SELECT id, archivo_nombre, categoria, veredicto, confianza, puntaje_total, resultado, created_at
       FROM verificaciones_documentos WHERE user_id = $1 AND documento_id = $2
       ORDER BY created_at DESC LIMIT 5`,
      [session.userId, documentoId]
    );
  } else if (archivoPath) {
    rows = await query(
      `SELECT id, archivo_nombre, categoria, veredicto, confianza, puntaje_total, resultado, created_at
       FROM verificaciones_documentos WHERE user_id = $1 AND archivo_path = $2
       ORDER BY created_at DESC LIMIT 5`,
      [session.userId, archivoPath]
    );
  } else {
    rows = await query(
      `SELECT id, archivo_nombre, categoria, veredicto, confianza, puntaje_total, created_at
       FROM verificaciones_documentos WHERE user_id = $1
       ORDER BY created_at DESC LIMIT 20`,
      [session.userId]
    );
  }

  return NextResponse.json({ verificaciones: rows });
}
