import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail, isStrongPassword, sanitizeString } from '@/lib/input-sanitizer';
import { validarRIF, validarFormatoCedula } from '@/lib/validacion-venezuela';
import { encryptIfNotEmpty } from '@/lib/encryption';

async function verificarCodigoUsado(destino: string): Promise<boolean> {
    const record = await queryOne<{ id: number }>(
        `SELECT id FROM verification_codes
         WHERE destino = $1 AND usado = true AND created_at > NOW() - INTERVAL '60 minutes'
         ORDER BY created_at DESC LIMIT 1`,
        [destino]
    );
    return !!record;
}

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIP(req);
        const rl = rateLimit(`register:${ip}`, 5, 15 * 60 * 1000);
        if (!rl.allowed) return rateLimitResponse(rl.retryAfterMs) as unknown as NextResponse;

        const body = await req.json();
        const { tipo } = body;

        if (tipo === 'natural') {
            return await registerNatural(body);
        } else if (tipo === 'juridico') {
            return await registerJuridico(body);
        }

        return NextResponse.json({ error: 'Tipo de registro inválido' }, { status: 400 });
    } catch (err: any) {
        console.error('Register error:', err);
        return NextResponse.json({ 
            error: 'Error interno del servidor', 
            debugError: err.message || String(err)
        }, { status: 500 });
    }
}

async function registerNatural(body: Record<string, unknown>) {
    const {
        nombre, apellido, cedula, telefono, telefono_alt,
        fecha_nacimiento, genero, estado_civil,
        estado_residencia, municipio, ciudad, direccion,
        email, password,
    } = body as Record<string, string>;

    if (!email || !password || !nombre || !apellido || !cedula) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const cedulaValidacion = validarFormatoCedula(String(cedula).trim());
    if (!cedulaValidacion.valid) {
        return NextResponse.json({ error: cedulaValidacion.error || 'Cédula inválida' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
        return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
    }

    const pwCheck = isStrongPassword(password);
    if (!pwCheck.valid) {
        return NextResponse.json({ error: pwCheck.reason }, { status: 400 });
    }

    const normalizedEmail = sanitizeEmail(email);

    const emailVerified = await verificarCodigoUsado(normalizedEmail);
    const phoneVerified = telefono ? await verificarCodigoUsado(telefono) : false;

    if (!emailVerified && !phoneVerified) {
        return NextResponse.json({
            error: 'Debes verificar tu correo electrónico o teléfono antes de registrarte. Completa el paso de verificación.',
        }, { status: 403 });
    }

    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const cedulaExisting = await queryOne('SELECT id FROM users WHERE cedula = $1', [cedula]);
    if (cedulaExisting) {
        return NextResponse.json({ error: 'Ya existe una cuenta con esa cédula' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const encTelefono = encryptIfNotEmpty(telefono);
    const encTelefonoAlt = encryptIfNotEmpty(telefono_alt);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, nombre, apellido, cedula, telefono, telefono_alt,
            fecha_nacimiento, genero, estado_civil,
            estado_residencia, municipio, ciudad, direccion, tipo,
            verificado
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'natural', $15)
         RETURNING id, email`,
        [
            normalizedEmail, password_hash,
            nombre, apellido, cedula,
            encTelefono, encTelefonoAlt,
            fecha_nacimiento ?? null, genero ?? '', estado_civil ?? '',
            estado_residencia ?? '', municipio ?? '', ciudad ?? '', direccion ?? '',
            emailVerified || phoneVerified,
        ]
    );

    const token = await createToken({
        userId: user.id,
        email: user.email,
        tipo: 'natural',
        nombre: `${nombre} ${apellido}`,
    });

    const cookie = setSessionCookie(token);
    const res = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, tipo: 'natural', nombre: `${nombre} ${apellido}` },
    });
    res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);

    sendWelcomeEmail(normalizedEmail, `${nombre} ${apellido}`).catch(() => {});

    await logActivity({
        userId: user.id,
        evento: 'REGISTRO_USUARIO',
        categoria: 'auth',
        descripcion: `Nuevo usuario natural registrado: ${nombre} ${apellido} (${email})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email, tipo: 'natural', cedula, email_verificado: emailVerified, telefono_verificado: phoneVerified },
    });
    return res;
}

async function registerJuridico(body: Record<string, unknown>) {
    const {
        razonSocial, rif, tipo_empresa, actividad_economica, codigo_ciiu,
        fecha_constitucion, registro_mercantil, capital_social,
        telefono, telefono_alt, estado_empresa, municipio_empresa, direccion, parroquia,
        repNombre, repCedula, rep_cargo, rep_telefono, repEmail, password,
        modules, plan, plan_monto, regimen_iva,
    } = body as Record<string, unknown>;
    const resolvedDireccion = direccion || parroquia || '';

    if (!repEmail || !password || !razonSocial || !rif) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const email = repEmail as string;
    if (!isValidEmail(email)) {
        return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
    }

    const normalizedEmail = sanitizeEmail(email);

    const emailVerified = await verificarCodigoUsado(normalizedEmail);
    const phoneVerified = telefono ? await verificarCodigoUsado(String(telefono)) : false;

    if (!emailVerified && !phoneVerified) {
        return NextResponse.json({
            error: 'Debes verificar tu correo electrónico o teléfono antes de registrarte. Completa el paso de verificación.',
        }, { status: 403 });
    }

    const VALID_PLANS: Record<string, number> = {
        contable_esencial: 8, contable_profesional: 18, contable_avanzado: 35, contable_max: 60,
        basico_2gb: 3, conecta_5gb: 5, plus_10gb: 8, global_25gb: 14, ultra_50gb: 22, infinite: 35,
        juridica_basico: 15, juridica_plus: 35, juridica_pro: 65, juridica_max: 120,
        legal_basico: 5, legal_profesional: 15, legal_escritorio: 30, legal_max: 50,
        fact_basico: 6, fact_comercial: 15, fact_enterprise: 30, fact_max: 50,
        socios_basico: 10, socios_profesional: 25, socios_enterprise: 45,
    };
    let validatedPlan: string | null = null;
    let validatedPlanMonto: number | null = null;
    if (plan && typeof plan === 'string') {
        const planKey = plan.toLowerCase().trim();
        if (planKey in VALID_PLANS) {
            validatedPlan = planKey;
            validatedPlanMonto = VALID_PLANS[planKey];
        }
    }

    if (typeof razonSocial !== 'string' || (razonSocial as string).trim().length < 3) {
        return NextResponse.json({ error: 'La razón social debe tener al menos 3 caracteres' }, { status: 400 });
    }

    const rifValidacion = validarRIF((rif as string).trim());
    if (!rifValidacion.valid) {
        return NextResponse.json({ error: rifValidacion.error || 'RIF inválido' }, { status: 400 });
    }
    if (rifValidacion.warning) {
        console.log(`[register] RIF warning for ${(rif as string).trim()}: ${rifValidacion.warning}`);
    }

    if (codigo_ciiu !== undefined && codigo_ciiu !== null && codigo_ciiu !== '') {
        if (typeof codigo_ciiu !== 'string' || !/^\d{4,6}$/.test((codigo_ciiu as string).trim())) {
            return NextResponse.json({ error: 'El código CIIU debe ser un número de 4 a 6 dígitos' }, { status: 400 });
        }
    }

    if (capital_social !== undefined && capital_social !== null && capital_social !== '') {
        const capitalStr = String(capital_social).replace(/[Bs.\s,]/g, '').replace(',', '.');
        const capitalNum = parseFloat(capitalStr);
        if (isNaN(capitalNum) || capitalNum < 0) {
            return NextResponse.json({ error: 'El capital social debe ser un valor numérico válido' }, { status: 400 });
        }
    }

    const pwCheck = isStrongPassword(password as string);
    if (!pwCheck.valid) {
        return NextResponse.json({ error: pwCheck.reason }, { status: 400 });
    }

    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const rifExisting = await queryOne('SELECT id FROM users WHERE rif = $1', [(rif as string).trim()]);
    if (rifExisting) {
        return NextResponse.json({ error: 'Ya existe una empresa registrada con ese RIF' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password as string, 12);
    const sanitizedRazonSocial = sanitizeString(razonSocial as string, 200);
    const sanitizedCapitalSocial = capital_social ? sanitizeString(String(capital_social), 50) : '';
    const sanitizedCodigoCiiu = codigo_ciiu ? sanitizeString(String(codigo_ciiu), 10) : '';
    const repNombreStr = sanitizeString((repNombre ?? '') as string, 200);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, tipo,
            nombre, razon_social, rif, tipo_empresa, actividad_economica, codigo_ciiu,
            fecha_constitucion, registro_mercantil, capital_social,
            telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
            rep_nombre, rep_cedula, rep_email, rep_cargo, rep_telefono,
            plan, plan_monto,
            verificado
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21,
                 $22, $23,
                 $24)
         RETURNING id, email`,
        [
            normalizedEmail, password_hash,
            repNombreStr || sanitizedRazonSocial,
            sanitizedRazonSocial,
            (rif as string).trim(),
            sanitizeString((tipo_empresa ?? '') as string, 100),
            sanitizeString((actividad_economica ?? '') as string, 500),
            sanitizedCodigoCiiu,
            fecha_constitucion ? sanitizeString(fecha_constitucion as string, 20) : null,
            sanitizeString((registro_mercantil ?? '') as string, 100),
            sanitizedCapitalSocial,
            encryptIfNotEmpty(sanitizeString((telefono ?? '') as string, 20)),
            encryptIfNotEmpty(sanitizeString((telefono_alt ?? '') as string, 20)),
            sanitizeString((estado_empresa ?? '') as string, 100),
            sanitizeString((municipio_empresa ?? '') as string, 100),
            encryptIfNotEmpty(sanitizeString((resolvedDireccion ?? '') as string, 500)),
            repNombreStr,
            encryptIfNotEmpty(sanitizeString((repCedula ?? '') as string, 20)),
            email,
            sanitizeString((rep_cargo ?? '') as string, 100),
            encryptIfNotEmpty(sanitizeString((rep_telefono ?? '') as string, 20)),
            validatedPlan,
            validatedPlanMonto,
            emailVerified || phoneVerified,
        ]
    );

    if (Array.isArray(modules) && modules.length > 0) {
        for (const mod of modules as Array<{ id: string; label: string }>) {
            await query(
                `INSERT INTO user_modules (user_id, module_id, module_label)
                 VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
                [user.id, mod.id, mod.label]
            );
        }
    }

    const token = await createToken({
        userId: user.id,
        email: user.email,
        tipo: 'juridico',
        nombre: razonSocial as string,
    });

    const cookie = setSessionCookie(token);
    const res = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, tipo: 'juridico', nombre: razonSocial },
    });
    res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);

    sendWelcomeEmail(email as string, razonSocial as string).catch(() => {});

    await logActivity({
        userId: user.id,
        evento: 'REGISTRO_USUARIO',
        categoria: 'auth',
        descripcion: `Nueva empresa registrada: ${razonSocial as string} (RIF: ${rif as string})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email, tipo: 'juridico', rif, razon_social: razonSocial, email_verificado: emailVerified, telefono_verificado: phoneVerified },
    });
    return res;
}

async function sendWelcomeEmail(email: string, nombre: string) {
    try {
        const { sendEmail, buildKyronEmailTemplate } = await import('@/lib/email-service');
        const html = buildKyronEmailTemplate({
            title: `Bienvenido a System Kyron, ${nombre}`,
            body: `
                <p style="margin: 0 0 16px 0;">Tu cuenta ha sido creada exitosamente. Ahora tienes acceso a la plataforma de inteligencia corporativa más avanzada de Venezuela.</p>
                <p style="margin: 0 0 8px 0;"><strong style="color: #0EA5E9;">Lo que puedes hacer ahora:</strong></p>
                <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                    <li style="margin-bottom: 6px;">Configurar tu perfil y datos fiscales</li>
                    <li style="margin-bottom: 6px;">Explorar los 7+ módulos integrados</li>
                    <li style="margin-bottom: 6px;">Activar Kyron AI para asistencia inteligente</li>
                    <li style="margin-bottom: 6px;">Generar tu primera factura con IVA y tasa BCV automática</li>
                </ul>
                <p style="margin: 0;">Tu cuenta incluye cifrado AES-256 y auditoría inmutable desde el primer momento.</p>
            `,
            footer: 'Este email fue enviado porque te registraste en System Kyron. Si no fuiste tú, ignora este mensaje.',
        });
        await sendEmail({
            to: email,
            subject: `Bienvenido a System Kyron, ${nombre}`,
            html,
            module: 'auth',
            purpose: 'general',
        });
    } catch (err) {
        console.error('[register] Welcome email failed:', err);
    }
}
