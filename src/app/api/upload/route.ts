import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { encryptFile } from '@/lib/file-crypto';
import { getSession } from '@/lib/auth';
import { registerUpload, processDocument } from '@/lib/documents';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/heic', 'image/heif',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv',
];

const ALLOWED_EXTENSIONS = [
  '.pdf', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.heic', '.heif',
  '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.txt', '.csv',
];

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const ip = getClientIP(req);
    const rl = rateLimit(`upload:${ip}`, 20, 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const docType = formData.get('docType') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `El archivo excede el tamaño máximo de ${MAX_FILE_SIZE / (1024 * 1024)} MB` }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(path.extname(file.name).toLowerCase())) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido. Formatos aceptados: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, WEBP, HEIC, TXT, CSV' }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: 'Extensión de archivo no permitida' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uniqueId = crypto.randomBytes(8).toString('hex');
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_{2,}/g, '_');
    const fileName = `${uniqueId}_${sanitizedName}`;

    const encrypted = encryptFile(buffer);

    const uploadDir = path.join(process.cwd(), 'data', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, encrypted);

    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    const docRecord = await registerUpload({
      userId: session.user.id,
      originalName: file.name,
      storedName: fileName,
      mimeType: file.type || `application/${ext.replace('.', '')}`,
      size: file.size,
      hash,
    });

    processDocument(docRecord.id).catch(err =>
      console.error(`[upload] Background processing error for doc ${docRecord.id}:`, err)
    );

    return NextResponse.json({
      success: true,
      documentId: docRecord.id,
      file: {
        name: file.name,
        storedName: fileName,
        url: `/api/files/${fileName}`,
        size: file.size,
        type: file.type || `application/${ext.replace('.', '')}`,
        docType: docType || 'general',
      },
    });
  } catch (err) {
    console.error('[upload] Error:', err);
    return NextResponse.json({ error: 'Error al subir el archivo' }, { status: 500 });
  }
}
