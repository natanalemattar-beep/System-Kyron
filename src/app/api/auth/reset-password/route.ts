import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail, isStrongPassword } from '@/lib/input-sanitizer';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

export const dynamic = 'force-dynamic';

function generateResetCode(): string {
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  return Array.from(array, b => (b % 10).toString()).join('');
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimit(`reset-pwd:${ip}`, 5, 15 * 60 * 1000);
    if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

    const { action, email, code, newPassword } = await req.json();

    if (action === 'find-account') {
      const { identifier } = await Promise.resolve({ identifier: email });

      if (!identifier || !String(identifier).trim()) {
        return NextResponse.json({ error: 'Ingresa tu correo electrónico, cédula o RIF' }, { status: 400 });
      }

      const input = String(identifier).trim();

      await new Promise(r => setTimeout(r, 150 + Math.random() * 200));

      let user: { id: number; nombre: string; email: string } | null = null;

      if (isValidEmail(input)) {
        const normalizedEmail = sanitizeEmail(input);
        user = await queryOne<{ id: number; nombre: string; email: string }>(
          `SELECT id, nombre, email FROM users WHERE email = $1`,
          [normalizedEmail]
        );
      } else {
        const cleaned = input.toUpperCase().replace(/\s/g, '');
        user = await queryOne<{ id: number; nombre: string; email: string }>(
          `SELECT id, nombre, email FROM users WHERE UPPER(cedula) = $1 OR UPPER(rif) = $1`,
          [cleaned]
        );
      }

      if (!user) {
        return NextResponse.json({
          success: false,
          found: false,
          error: 'No encontramos una cuenta asociada a este dato. Verifica que esté bien escrito o intenta con otro identificador (correo, cédula o RIF).',
        }, { status: 404 });
      }

      if (!user.email) {
        return NextResponse.json({
          success: false,
          found: true,
          noEmail: true,
          error: 'Esta cuenta no tiene un correo electrónico asociado. Contacta al administrador para recuperar tu acceso.',
        }, { status: 400 });
      }

      const codigo = generateResetCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await query(
        `INSERT INTO verification_codes (destino, tipo, codigo, expires_at, proposito) VALUES ($1, 'email', $2, $3, 'password-reset')`,
        [user.email, codigo, expiresAt]
      );

      await sendEmail({
        to: user.email,
        subject: `${codigo} — Recuperar contraseña · System Kyron`,
        html: buildKyronEmailTemplate({
          title: 'Recuperación de Contraseña',
          body: `Hola <strong>${user.nombre}</strong>, recibimos una solicitud para restablecer tu contraseña. Usa el siguiente código para continuar.`,
          code: codigo,
          footer: 'Si no solicitaste este cambio, ignora este correo. Tu contraseña permanecerá igual.',
        }),
        module: 'auth',
        purpose: 'password-reset',
      }).catch(err => console.error('[reset-password] Email failed:', err));

      return NextResponse.json({
        success: true,
        found: true,
        maskedEmail: maskEmail(user.email),
      });
    }

    if (action === 'reset') {
      if (!email || !code || !newPassword) {
        return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
      }

      const pwCheck = isStrongPassword(newPassword);
      if (!pwCheck.valid) {
        return NextResponse.json({ error: pwCheck.reason }, { status: 400 });
      }

      const normalizedEmail = sanitizeEmail(email);

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
         AND COALESCE(proposito, 'password-reset') = 'password-reset'
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
