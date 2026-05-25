import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';
import { decryptFile } from '@/lib/file-crypto';

const MIME_MAP: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp',
  '.gif': 'image/gif', '.bmp': 'image/bmp',
  '.heic': 'image/heic', '.heif': 'image/heif',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { path: pathSegments } = await params;
    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: 'Archivo no especificado' }, { status: 400 });
    }

    const fileName = pathSegments.join('/');
    if (fileName.includes('..') || fileName.includes('\0')) {
      return NextResponse.json({ error: 'Ruta inválida' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', 'uploads', fileName);
    const encrypted = await readFile(filePath);

    const decrypted = decryptFile(encrypted);

    const ext = path.extname(fileName).toLowerCase();
    const mimeType = MIME_MAP[ext] || 'application/octet-stream';

    return new NextResponse(decrypted, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `inline; filename="${fileName.replace(/^[0-9a-f]+_/, '')}"`,
        'Cache-Control': 'private, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err: any) {
    if (err?.code === 'ENOENT') {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }
    console.error('[files] Error al servir archivo:', err);
    return NextResponse.json({ error: 'Error al leer el archivo' }, { status: 500 });
  }
}
