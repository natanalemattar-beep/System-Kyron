import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail } from '@/lib/input-sanitizer';
import { verifyCode } from '@/lib/verification-codes';

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

    if (body.email && body.code) {
      const normalizedEmail = sanitizeEmail(body.email);
      const result = await verifyCode(normalizedEmail, body.code.trim());

      if (!result.valid) {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }

      const user = await queryOne<DbUser>(
        `SELECT id, email, tipo, nombre, apellido, cedula, razon_social, rif
         FROM users WHERE id = $1`,
        [result.userId]
      );

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }

      const displayName = user.tipo === 'juridico'
        ? (user.razon_social ?? user.nombre)
        : user.nombre;

      const token = await createToken({
        userId: user.id,
        email: user.email,
        tipo: user.tipo,
        nombre: displayName,
      });

      const cookie = setSessionCookie(token);
      const res = NextResponse.json({
        success: true,
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
      res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);

      await logActivity({
        userId: user.id,
        evento: 'LOGIN',
        categoria: 'auth',
        descripcion: `Inicio de sesión verificado: ${displayName} (${user.email})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email: user.email, tipo: user.tipo, verificado: true },
      });

      return res;
    }

    if (body.destino && body.codigo) {
      const destino = body.destino;
      const codigo = body.codigo;

      if (!destino || !codigo) {
        return NextResponse.json({ error: 'Destino y código son requeridos' }, { status: 400 });
      }

      const result = await verifyCode(destino, codigo.trim());

      if (!result.valid) {
        const status = result.error?.includes('Demasiados') ? 429 : 400;
        return NextResponse.json({ error: result.error }, { status });
      }

      return NextResponse.json({ success: true, verified: true });
    }

    return NextResponse.json({ error: 'Datos de verificación incompletos' }, { status: 400 });
  } catch (err) {
    console.error('[verify-code] error:', err);
    return NextResponse.json({ error: 'Error al verificar el código.' }, { status: 500 });
  }
}
