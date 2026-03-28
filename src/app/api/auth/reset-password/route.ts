import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { action, email, code, newPassword } = await req.json();

    if (action === 'find-account') {
      if (!email) {
        return NextResponse.json({ error: 'Ingresa tu correo electrónico' }, { status: 400 });
      }
      const normalizedEmail = email.trim().toLowerCase();
      const user = await queryOne<{ id: number; email: string; nombre: string; tipo: string }>(
        `SELECT id, email, nombre, tipo FROM users WHERE email = $1`,
        [normalizedEmail]
      );
      return NextResponse.json({
        success: true,
        found: true,
        nombre: user ? user.nombre : 'Usuario',
        tipo: user ? user.tipo : 'natural',
        maskedEmail: maskEmail(normalizedEmail),
      });
    }

    if (action === 'reset') {
      if (!email || !code || !newPassword) {
        return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const recentFailures = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM verification_codes
         WHERE destino = $1 AND tipo = 'email' AND intentos >= 5 AND created_at > NOW() - INTERVAL '15 minutes'`,
        [normalizedEmail]
      );
      if (parseInt(recentFailures?.count ?? '0') > 0) {
        return NextResponse.json({ error: 'Demasiados intentos fallidos. Espera 15 minutos.' }, { status: 429 });
      }

      const codeRow = await queryOne<{ id: number; codigo: string; intentos: number }>(
        `SELECT id, codigo, COALESCE(intentos, 0) as intentos FROM verification_codes
         WHERE destino = $1 AND tipo = 'email' AND usado = false AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1`,
        [normalizedEmail]
      );

      if (!codeRow || codeRow.codigo !== code) {
        if (codeRow) {
          await query(`UPDATE verification_codes SET intentos = COALESCE(intentos, 0) + 1 WHERE id = $1`, [codeRow.id]);
        }
        return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });
      }

      if (codeRow.intentos >= 5) {
        return NextResponse.json({ error: 'Código bloqueado por demasiados intentos.' }, { status: 429 });
      }

      const user = await queryOne<{ id: number }>(
        `SELECT id FROM users WHERE email = $1`, [normalizedEmail]
      );
      if (!user) {
        return NextResponse.json({ error: 'No se pudo actualizar la contraseña' }, { status: 400 });
      }

      const hash = await bcrypt.hash(newPassword, 12);
      await query(`UPDATE users SET password_hash = $1 WHERE email = $2`, [hash, normalizedEmail]);
      await query(`UPDATE verification_codes SET usado = true WHERE id = $1`, [codeRow.id]);

      return NextResponse.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('[reset-password] error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${local[1]}${'*'.repeat(Math.min(local.length - 2, 6))}@${domain}`;
}
