import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { generateCode, storeCode } from '@/lib/verification-codes';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';

interface DbUser {
    id: number;
    email: string;
    password_hash: string;
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
        const rl = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
        if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
        }

        const normalizedEmail = sanitizeEmail(email);

        const emailRl = rateLimit(`login:email:${normalizedEmail}`, 5, 15 * 60 * 1000);
        if (!emailRl.allowed) return rateLimitResponse(emailRl.retryAfterMs);

        const user = await queryOne<DbUser>(
            `SELECT id, email, password_hash, tipo, nombre, apellido, cedula, razon_social, rif
             FROM users WHERE email = $1`,
            [normalizedEmail]
        );

        if (!user) {
            await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            await logActivity({
                userId: user.id,
                evento: 'LOGIN_FALLIDO',
                categoria: 'auth',
                descripcion: `Intento de login fallido: ${user.email}`,
                entidadTipo: 'usuario',
                entidadId: user.id,
                metadata: { ip },
            });
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const code = generateCode();
        storeCode(normalizedEmail, code, user.id);

        const displayName = user.tipo === 'juridico'
            ? (user.razon_social ?? user.nombre)
            : user.nombre;

        const maskedEmail = normalizedEmail.replace(
            /^(.{2})(.*)(@.*)$/,
            (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 6)) + c
        );

        sendEmail({
            to: normalizedEmail,
            subject: `${code} — Código de verificación · System Kyron`,
            html: buildKyronEmailTemplate({
                title: 'Verificación de identidad',
                body: `Hola <strong>${displayName}</strong>, alguien está intentando acceder a tu cuenta. Ingresa el siguiente código para confirmar que eres tú.`,
                code,
                footer: 'Si no solicitaste este código, ignora este mensaje. Nunca compartas tu código con nadie.',
            }),
            module: 'auth',
            purpose: 'verification',
        }).catch(err => console.error('[login] Error sending verification email:', err));

        return NextResponse.json({
            requiresVerification: true,
            maskedEmail,
            nombre: displayName,
        });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
