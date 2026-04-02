import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse, checkBruteForce, recordLoginFailure, clearLoginFailures } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail } from '@/lib/input-sanitizer';
import { generateCode, storeCode, generateMagicToken, storeMagicToken } from '@/lib/verification-codes';
import { sendEmail, buildKyronEmailTemplate } from '@/lib/email-service';
import { createLoginChallenge } from '@/lib/login-challenge';

interface DbUser {
    id: number;
    email: string;
    password_hash: string;
    tipo: 'natural' | 'juridico' | 'admin';
    nombre: string;
    apellido: string | null;
    cedula: string | null;
    razon_social: string | null;
    rif: string | null;
    access_key_hash: string | null;
    telefono: string | null;
    telefono_verificado: boolean;
}

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIP(req);
        const rl = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
        if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs);

        const { email, password, accessKey } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
        }

        const normalizedEmail = sanitizeEmail(email);

        const emailRl = rateLimit(`login:email:${normalizedEmail}`, 5, 15 * 60 * 1000);
        if (!emailRl.allowed) return rateLimitResponse(emailRl.retryAfterMs);

        const bruteCheck = checkBruteForce(`bf:${normalizedEmail}`);
        if (bruteCheck.locked) {
            const mins = Math.ceil(bruteCheck.retryAfterMs / 60000);
            return NextResponse.json(
                { error: `Cuenta temporalmente bloqueada por múltiples intentos fallidos. Intenta de nuevo en ${mins} minuto${mins > 1 ? 's' : ''}.` },
                { status: 423 }
            );
        }

        const user = await queryOne<DbUser>(
            `SELECT id, email, password_hash, tipo, nombre, apellido, cedula, razon_social, rif, access_key_hash, telefono, COALESCE(telefono_verificado, false) as telefono_verificado
             FROM users WHERE email = $1`,
            [normalizedEmail]
        );

        if (!user) {
            await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            const bruteResult = recordLoginFailure(`bf:${normalizedEmail}`);
            await logActivity({
                userId: user.id,
                evento: 'LOGIN_FALLIDO',
                categoria: 'auth',
                descripcion: `Intento de login fallido: ${user.email}${bruteResult.locked ? ' — cuenta bloqueada temporalmente' : ''}`,
                entidadTipo: 'usuario',
                entidadId: user.id,
                metadata: { ip, accountLocked: bruteResult.locked },
            });
            if (bruteResult.locked) {
                const mins = Math.ceil(bruteResult.lockDurationMs / 60000);
                return NextResponse.json(
                    { error: `Cuenta bloqueada por múltiples intentos fallidos. Intenta de nuevo en ${mins} minuto${mins > 1 ? 's' : ''}.` },
                    { status: 423 }
                );
            }
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        clearLoginFailures(`bf:${normalizedEmail}`);

        const displayName = user.tipo === 'juridico'
            ? (user.razon_social ?? user.nombre)
            : user.nombre;

        if (accessKey && typeof accessKey === 'string' && accessKey.trim().length >= 6 && user.access_key_hash) {
            const accessKeyValid = await bcrypt.compare(accessKey.trim(), user.access_key_hash);
            if (accessKeyValid) {
                const token = await createToken({
                    userId: user.id,
                    email: user.email,
                    tipo: user.tipo,
                    nombre: displayName,
                });

                const cookie = setSessionCookie(token);
                const res = NextResponse.json({
                    success: true,
                    accessKeyUsed: true,
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
                    descripcion: `Inicio de sesión con llave de acceso: ${displayName} (${user.email})`,
                    entidadTipo: 'usuario',
                    entidadId: user.id,
                    metadata: { email: user.email, tipo: user.tipo, metodo: 'access_key' },
                });

                return res;
            }
        }

        const code = generateCode();
        await storeCode(normalizedEmail, code, user.id);

        const magicToken = generateMagicToken();
        await storeMagicToken(normalizedEmail, magicToken, user.id);

        const baseUrl = process.env.REPLIT_DEV_DOMAIN
          ? `https://${process.env.REPLIT_DEV_DOMAIN}`
          : (process.env.REPLIT_DEPLOYMENT_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://system-kyron.replit.app');
        const magicLinkUrl = `${baseUrl}/es/verify-link/${magicToken}`;

        const maskedEmail = normalizedEmail.replace(
            /^(.{2})(.*)(@.*)$/,
            (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 6)) + c
        );

        const hasPhone = !!(user.telefono && user.telefono.length >= 7 && user.telefono_verificado);
        let maskedPhone = '';
        if (hasPhone && user.telefono) {
            const cleaned = user.telefono.replace(/[\s\-\(\)]/g, '');
            maskedPhone = cleaned.length > 4
                ? '•'.repeat(cleaned.length - 4) + cleaned.slice(-4)
                : '•••' + cleaned.slice(-2);
        }

        const emailResult = await sendEmail({
            to: normalizedEmail,
            subject: `${code} — Código de verificación · System Kyron`,
            html: buildKyronEmailTemplate({
                title: 'Verificación de identidad',
                body: `Hola <strong>${displayName}</strong>, alguien está intentando acceder a tu cuenta. Usa el código o haz clic en el botón para verificar tu identidad.`,
                code,
                magicLink: magicLinkUrl,
                footer: 'Si no solicitaste este acceso, ignora este mensaje. Nunca compartas tu código con nadie.',
            }),
            module: 'auth',
            purpose: 'verification',
        }).catch(err => {
            console.error('[login] Error sending verification email:', err);
            return { success: false, error: String(err) };
        });

        const challengeToken = createLoginChallenge(normalizedEmail, user.id);

        const isDev = !process.env.REPLIT_DEPLOYMENT_URL;

        if (emailResult && !emailResult.success) {
            console.error('[login] Verification email failed:', emailResult.error);
            if (isDev) {
                console.log(`[login][DEV] Código de verificación para ${normalizedEmail}: ${code}`);
                return NextResponse.json({
                    requiresVerification: true,
                    maskedEmail,
                    nombre: displayName,
                    hasAccessKey: !!user.access_key_hash,
                    hasPhone,
                    maskedPhone,
                    challengeToken,
                    emailFailed: true,
                    devCode: code,
                    devMessage: 'Email no disponible. Código mostrado en pantalla (solo desarrollo).',
                });
            }
            if (hasPhone) {
                return NextResponse.json({
                    requiresVerification: true,
                    maskedEmail,
                    nombre: displayName,
                    hasAccessKey: !!user.access_key_hash,
                    hasPhone,
                    maskedPhone,
                    challengeToken,
                    emailFailed: true,
                    emailFailedMessage: 'No pudimos enviar el código por correo. Usa SMS o WhatsApp.',
                });
            }
            return NextResponse.json({
                error: 'No pudimos enviar el código de verificación a tu correo. Por favor intenta de nuevo en unos momentos.',
                emailDeliveryFailed: true,
                maskedEmail,
            }, { status: 503 });
        }

        return NextResponse.json({
            requiresVerification: true,
            maskedEmail,
            nombre: displayName,
            hasAccessKey: !!user.access_key_hash,
            hasPhone,
            maskedPhone,
            challengeToken,
        });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
