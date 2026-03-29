import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
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

    let destino: string;
    let codigo: string;

    if (body.destino && body.codigo) {
      destino = body.destino;
      codigo = body.codigo;
    } else {
      return NextResponse.json({ error: 'Datos de verificación incompletos' }, { status: 400 });
    }

    if (!destino || !codigo) {
      return NextResponse.json({ error: 'Destino y código son requeridos' }, { status: 400 });
    }

    const record = await queryOne<{ id: number; usado: boolean; expires_at: string; intentos: number }>(
      `SELECT id, usado, expires_at, intentos FROM verification_codes
       WHERE destino = $1 AND codigo = $2
       ORDER BY created_at DESC LIMIT 1`,
      [destino, codigo.trim()]
    );

    if (!record) {
      const latestCode = await queryOne<{ id: number }>(
        `SELECT id FROM verification_codes
         WHERE destino = $1 AND usado = false AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [destino]
      );
      if (latestCode) {
        await query(
          `UPDATE verification_codes SET intentos = intentos + 1 WHERE id = $1`,
          [latestCode.id]
        );
      }
      return NextResponse.json({ error: 'Código incorrecto. Verifica e intenta de nuevo.' }, { status: 400 });
    }

    if (record.intentos >= 5) {
      return NextResponse.json({ error: 'Demasiados intentos fallidos. Solicita un nuevo código.' }, { status: 429 });
    }

    if (record.usado) {
      return NextResponse.json({ error: 'Este código ya fue utilizado. Solicita uno nuevo.' }, { status: 400 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'El código ha expirado. Solicita uno nuevo.' }, { status: 400 });
    }

    await query(`UPDATE verification_codes SET usado = true WHERE id = $1`, [record.id]);

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error('[verify-code] error:', err);
    return NextResponse.json({ error: 'Error al verificar el código.' }, { status: 500 });
  }
}
