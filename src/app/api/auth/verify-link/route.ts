import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { verifyMagicToken } from '@/lib/verification-codes';

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
    const rl = rateLimit(`verify-link:${ip}`, 15, 15 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

    const { token } = await req.json();

    if (!token || typeof token !== 'string' || token.length < 32) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
    }

    const result = await verifyMagicToken(token);

    if (!result.valid) {
      return NextResponse.json({ error: result.error || 'Enlace inválido o expirado.' }, { status: 401 });
    }

    if (!result.email) {
      return NextResponse.json({ error: 'Enlace inválido.' }, { status: 401 });
    }

    const user = result.userId
      ? await queryOne<DbUser>(
          `SELECT id, email, tipo, nombre, apellido, cedula, razon_social, rif
           FROM users WHERE id = $1`,
          [result.userId]
        )
      : await queryOne<DbUser>(
          `SELECT id, email, tipo, nombre, apellido, cedula, razon_social, rif
           FROM users WHERE email = $1`,
          [result.email]
        );

    if (!user) {
      await query(
        `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito, usado)
         VALUES ($1, 'email', 'MAGIC_VERIFIED', NOW() + INTERVAL '30 minutes', 'registration', true)`,
        [result.email.toLowerCase()]
      );


      return NextResponse.json({
        success: true,
        verified: true,
        registrationMode: true,
        email: result.email,
        message: 'Correo verificado. Puedes continuar con tu registro.',
      });
    }

    const displayName = user.tipo === 'juridico'
      ? (user.razon_social ?? user.nombre)
      : `${user.nombre} ${user.apellido || ''}`.trim();

    const sessionToken = await createToken({
      userId: user.id,
      email: user.email,
      tipo: user.tipo,
      nombre: displayName,
    });

    const cookie = setSessionCookie(sessionToken);
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
      descripcion: `Inicio de sesión con enlace mágico: ${displayName} (${user.email})`,
      entidadTipo: 'usuario',
      entidadId: user.id,
      metadata: { email: user.email, tipo: user.tipo, metodo: 'magic_link' },
    });

    return res;
  } catch (err) {
    console.error('[verify-link] error:', err);
    return NextResponse.json({ error: 'Error al verificar el enlace.' }, { status: 500 });
  }
}
