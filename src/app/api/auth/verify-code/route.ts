import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail } from '@/lib/input-sanitizer';
import { verifyCode, normalizePhone } from '@/lib/verification-codes';
import { encryptIfNotEmpty } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

interface DbUser {
    id: number;
    email: string;
    tipo: 'natural' | 'juridico';
    nombre: string;
    apellido: string | null;
    cedula: string | null;
    razon_social: string | null;
    rif: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`verify:${ip}`, 15, 15 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const body = await req.json();

    
    // Unificar entrada de datos
    const destino = (body.email || body.destino || '').trim().toLowerCase();
    const codigo = (body.code || body.codigo || '').trim();
    const proposito = body.proposito || 'verification';

    if (!destino || !codigo) {
      return NextResponse.json({ error: 'Destino y código son requeridos para la verificación' }, { status: 400 });
    }

    const normalizedDestino = destino.includes('@') ? sanitizeEmail(destino) : normalizePhone(destino);

    
    console.log(`[verify-code] Iniciando validación para: ${normalizedDestino}`);

    const verification = await verifyCode(normalizedDestino, codigo, proposito);

    if (!verification.valid) {
      const isRateLimited = verification.error?.includes('Demasiados');
      return NextResponse.json({ error: verification.error }, { status: isRateLimited ? 429 : 401 });
    }

    const looksLikeEmail = normalizedDestino.includes('@');
    const searchPhone = !looksLikeEmail ? normalizedDestino.replace(/\D/g, '') : null;
    const encryptedPhone = searchPhone ? encryptIfNotEmpty(searchPhone) : null;

    const user = await queryOne<DbUser>(
      `SELECT id, email, tipo, nombre, apellido, cedula, razon_social, rif
       FROM users 
       WHERE email = $1 
          OR telefono = $1 
          OR (telefono IS NOT NULL AND telefono = $2)
          OR ($3 IS NOT NULL AND telefono = $3)`,
      [normalizedDestino, searchPhone, encryptedPhone]
    );

    if (!user || proposito === 'registration') {
      // Si el propósito era login (verification) pero el usuario no existe, es un error de login
      if (proposito === 'verification' && !user) {
        return NextResponse.json({ 
          error: 'No existe una cuenta vinculada a este destino. Por favor, regístrese primero.' 
        }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        verified: true, 
        requiresRegistration: !user,
        message: user ? 'Identidad confirmada.' : 'Identidad confirmada. Proceda con la creación de su cuenta.'
      });
    }


    // Caso B: Usuario existe (Flujo de Login)
    const displayName = user.tipo === 'juridico'
      ? (user.razon_social ?? user.nombre)
      : `${user.nombre} ${user.apellido || ''}`.trim();

    const token = await createToken({
      userId: user.id,
      email: user.email,
      tipo: user.tipo,
      nombre: displayName,
    });

    const cookie = setSessionCookie(token);
    const response = NextResponse.json({
      success: true,
      verified: true,
      user: {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
        nombre: displayName,
        apellido: user.apellido,
        cedula: user.cedula,
        razon_social: user.razon_social,
        rif: user.rif,
      },
    });

    response.cookies.set(cookie.name, cookie.value, cookie.options as any);

    // Registrar actividad de éxito
    await logActivity({
      userId: user.id,
      evento: 'LOGIN_VERIFIED',
      categoria: 'auth',
      descripcion: `Acceso verificado exitosamente para ${displayName}`,
      entidadTipo: 'usuario',
      entidadId: user.id,
      metadata: { method: destino.includes('@') ? 'email' : 'phone', proposito },
    });

    return response;
  } catch (err) {
    console.error('[verify-code] error:', err);
    return NextResponse.json({ error: 'Error al verificar el código.' }, { status: 500 });
  }
}
