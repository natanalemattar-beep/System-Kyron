import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { createToken, setSessionCookie, insertUserSession } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail, isStrongPassword, sanitizeString } from '@/lib/input-sanitizer';
import { validarRIF, validarFormatoCedula } from '@/lib/validacion-venezuela';
import { encryptIfNotEmpty, generateSearchHash } from '@/lib/encryption';
import { normalizePhone } from '@/lib/verification-codes';

async function verificarCodigoUsado(destino: string, proposito: string = 'registration'): Promise<boolean> {
    const record = await queryOne<{ id: number }>(
        `SELECT id FROM verification_codes
         WHERE destino = $1 
           AND proposito = $2
           AND (
             (usado = true AND created_at > NOW() - INTERVAL '60 minutes')
             OR
             (codigo = 'MAGIC_VERIFIED' AND expires_at > NOW())
           )
         ORDER BY created_at DESC LIMIT 1`,
        [destino, proposito]
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
        const userAgent = req.headers.get('user-agent') || undefined;

        if (tipo === 'natural') {
            return await registerNatural(body, ip, userAgent);
        } else if (tipo === 'juridico') {
            return await registerJuridico(body, ip, userAgent);
        }

        return NextResponse.json({ error: 'Tipo de registro inválido' }, { status: 400 });
    } catch (err: any) {
        // Use structured logger and avoid leaking full error objects to console in production.
        // Keep the original behavior of hiding DB internals from the client.
        const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
        logger.error('Register error', { error: String(err) });
        const msg = err?.message || String(err);
        // Hide raw DB errors from clients
        const isSchemaError = msg.includes('column') || msg.includes('relation') || msg.includes('violates');
        return NextResponse.json({ 
            error: isSchemaError 
                ? 'Error interno de base de datos. Contacta soporte.' 
                : (msg || 'Error al procesar el registro'), 
        }, { status: 500 });
    }
}

async function registerNatural(body: Record<string, unknown>, ip: string = '0.0.0.0', userAgent?: string) {
    const {
        nombre, apellido, cedula, telefono, telefono_alt,
        fecha_nacimiento, genero, estado_civil,
        estado_residencia, municipio, ciudad, direccion,
        email, password, plan, modules,
    } = body as Record<string, any>;

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
    const normalizedPhone = telefono ? normalizePhone(telefono) : '';
    const normalizedPhoneAlt = telefono_alt ? normalizePhone(telefono_alt) : '';

    const emailVerified = await verificarCodigoUsado(normalizedEmail, 'registration');
    const phoneVerified = normalizedPhone ? await verificarCodigoUsado(normalizedPhone, 'registration') : false;


    if (!emailVerified && !phoneVerified) {
        return NextResponse.json({
            error: 'Debes verificar tu correo electrónico o teléfono antes de registrarte. Completa el paso de verificación.',
        }, { status: 403 });
    }

    if (!normalizedPhone && !normalizedPhoneAlt) {
        return NextResponse.json({ error: 'Debes proporcionar al menos un número de teléfono' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const cedulaHash = generateSearchHash(cedula);

    const existingUser = await queryOne<{ id: number }>(
        `SELECT id FROM users WHERE email = $1 OR cedula_hash = $2 LIMIT 1`,
        [normalizedEmail, cedulaHash]
    );
    if (existingUser) {
        return NextResponse.json({
            error: 'Ya existe una cuenta con este correo o cédula. Inicia sesión o utiliza otro correo.',
        }, { status: 409 });
    }

    const encCedula = encryptIfNotEmpty(cedula);
    const encTelefono = encryptIfNotEmpty(normalizedPhone);
    const encTelefonoAlt = encryptIfNotEmpty(normalizedPhoneAlt);
    const telefonoHash = generateSearchHash(normalizedPhone);

    const moduloNatural = (Array.isArray(modules) && modules.length > 0)
        ? String((modules[0] as { id: string }).id) : '';

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, nombre, apellido, cedula, telefono, telefono_alt,
            fecha_nacimiento, genero, estado_civil,
            estado_residencia, municipio, ciudad, direccion, tipo,
            verificado, email_verificado, telefono_verificado, telefono_hash, cedula_hash,
            modulo_origen
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'natural', $15, $16, $17, $18, $19, $20)
         RETURNING id, email`,
        [
            normalizedEmail, password_hash,
            nombre, apellido, encCedula,
            encTelefono, encTelefonoAlt,
            fecha_nacimiento ?? null, genero ?? '', estado_civil ?? '',
            estado_residencia ?? '', municipio ?? '', ciudad ?? '', direccion ?? '',
            emailVerified || phoneVerified,
            emailVerified,
            phoneVerified,
            telefonoHash,
            cedulaHash,
            moduloNatural
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

    await insertUserSession(token, user.id, ip, userAgent);

    sendWelcomeEmail(normalizedEmail, `${nombre} ${apellido}`, moduloNatural).catch(() => {});
    createWelcomeNotification(user.id, moduloNatural).catch(() => {});

    if (Array.isArray(modules) && modules.length > 0) {
        try {
            for (const mod of modules as Array<{ id: string; label: string }>) {
                await query(
                    `INSERT INTO user_modules (user_id, module_id, module_label)
                     VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
                    [Number(user.id), String(mod.id), mod.label ?? '']
                );
            }
        } catch (modErr) {
            const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
            logger.error('[register] Fallo al insertar módulos para natural', { error: String(modErr) });
        }
    }

    if (plan && typeof plan === 'string') {
        try {
            await query(
                `UPDATE users SET plan = $1 WHERE id = $2`,
                [plan, user.id]
            );
        } catch (planErr) {
            const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
            logger.error('[register] Fallo al actualizar plan para natural', { error: String(planErr) });
        }
    }

    const documentos = body.documentos as Record<string, { name: string; storedName: string; url: string; size: number; type: string; docType: string }> | undefined;
    if (documentos && typeof documentos === 'object' && Object.keys(documentos).length > 0) {
        const CATEGORY_MAP: Record<string, string> = {
            cedula_frontal: 'identidad',
            cedula_reverso: 'identidad',
            rif: 'fiscal',
        };
        try {
            for (const [docId, doc] of Object.entries(documentos)) {
                if (!doc) continue;
                await query(
                    `INSERT INTO documentos_personales
                     (user_id, categoria, nombre, tipo_archivo, tamano_kb, url_storage, descripcion)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [
                        user.id,
                        CATEGORY_MAP[docId] || 'otro',
                        doc.name || docId,
                        doc.type?.startsWith('image/') ? 'IMAGEN' : 'PDF',
                        Math.round((doc.size || 0) / 1024),
                        doc.url || '',
                        `Subido durante registro — ${docId}`,
                    ]
                );
            }
        } catch (docErr) {
            const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
            logger.error('[register] Fallo al insertar documentos personales', { error: String(docErr) });
        }
    }

    await logActivity({
        userId: user.id,
        evento: 'REGISTRO_USUARIO',
        categoria: 'auth',
        descripcion: `Nuevo usuario natural registrado: ${nombre} ${apellido} (${email})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email, tipo: 'natural', cedula, email_verificado: emailVerified, telefono_verificado: phoneVerified, plan, modules },
    });
    return res;
}

async function registerJuridico(body: Record<string, unknown>, ip: string = '0.0.0.0', userAgent?: string) {
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
    const normalizedPhoneJuridico = telefono ? normalizePhone(String(telefono)) : '';
    const normalizedPhoneAltJuridico = telefono_alt ? normalizePhone(String(telefono_alt)) : '';

    const emailVerified = await verificarCodigoUsado(normalizedEmail, 'registration');
    const phoneVerified = normalizedPhoneJuridico ? await verificarCodigoUsado(normalizedPhoneJuridico, 'registration') : false;


    if (!emailVerified && !phoneVerified) {
        return NextResponse.json({
            error: 'Debes verificar tu correo electrónico o teléfono antes de registrarte. Completa el paso de verificación.',
        }, { status: 403 });
    }

    const { VALID_PLANS_MAP } = await import('@/lib/planes-kyron');
    let validatedPlan: string | null = null;
    let validatedPlanMonto: number | null = null;
    if (plan && typeof plan === 'string') {
        const planKey = plan.toLowerCase().trim();
        if (planKey in VALID_PLANS_MAP) {
            validatedPlan = planKey;
            validatedPlanMonto = VALID_PLANS_MAP[planKey];
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
        if (process.env.NODE_ENV !== 'production') console.info('[register] RIF warning', { rif: (rif as string).trim(), warning: rifValidacion.warning });
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

    const password_hash = await bcrypt.hash(password as string, 12);
    const rifClean = (rif as string).trim();
    const rifHash = generateSearchHash(rifClean);

    const existingJuridico = await queryOne<{ id: number }>(
        `SELECT id FROM users WHERE email = $1 OR rif_hash = $2 LIMIT 1`,
        [normalizedEmail, rifHash]
    );
    if (existingJuridico) {
        return NextResponse.json({
            error: 'Ya existe una cuenta con este correo o RIF. Inicia sesión o utiliza otro correo.',
        }, { status: 409 });
    }

    const sanitizedRazonSocial = sanitizeString(razonSocial as string, 200);
    const sanitizedCapitalSocial = capital_social ? sanitizeString(String(capital_social), 50) : '';
    const sanitizedCodigoCiiu = codigo_ciiu ? sanitizeString(String(codigo_ciiu), 10) : '';
    const repNombreStr = sanitizeString((repNombre ?? '') as string, 200);
    const telefonoHash = generateSearchHash(normalizedPhoneJuridico);
    const repCedulaHash = generateSearchHash(repCedula as string);
    const encRif = encryptIfNotEmpty(rifClean);


    const moduloJuridico = (Array.isArray(modules) && modules.length > 0)
        ? String((modules[0] as { id: string }).id) : '';

    const results = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, tipo,
            nombre, razon_social, rif, tipo_empresa, actividad_economica, codigo_ciiu,
            fecha_constitucion, registro_mercantil, capital_social,
            telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
            rep_nombre, rep_cedula, rep_email, rep_cargo, rep_telefono,
            plan, plan_monto,
            verificado, email_verificado, telefono_verificado,
            telefono_hash, rif_hash, rep_cedula_hash,
            modulo_origen
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21,
                 $22, $23,
                 $24, $25, $26,
                 $27, $28, $29, $30)
         RETURNING id, email`,
        [
            normalizedEmail, password_hash,
            repNombreStr || sanitizedRazonSocial,
            sanitizedRazonSocial,
            encRif,
            sanitizeString((tipo_empresa ?? '') as string, 100),
            sanitizeString((actividad_economica ?? '') as string, 500),
            sanitizedCodigoCiiu,
            fecha_constitucion ? sanitizeString(fecha_constitucion as string, 20) : null,
            sanitizeString((registro_mercantil ?? '') as string, 100),
            sanitizedCapitalSocial,
            encryptIfNotEmpty(sanitizeString(normalizedPhoneJuridico, 20)),
            encryptIfNotEmpty(sanitizeString(normalizedPhoneAltJuridico, 20)),
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
            emailVerified,
            phoneVerified,
            telefonoHash,
            rifHash,
            repCedulaHash,
            moduloJuridico
        ]
    );

    if (!results || results.length === 0) {
        throw new Error('No se pudo crear el usuario jurídico (INSERT retornó vacío)');
    }
    const user = results[0];

    if (Array.isArray(modules) && modules.length > 0) {
        try {
            for (const mod of modules as Array<{ id: string; label: string }>) {
                await query(
                    `INSERT INTO user_modules (user_id, module_id, module_label)
                     VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
                    [Number(user.id), String(mod.id), mod.label]
                );
            }
        } catch (modErr) {
            const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
            logger.error('[register] Fallo al insertar módulos', { error: String(modErr) });
            const retryDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    await retryDelay(attempt * 500);
                    for (const mod of modules as Array<{ id: string; label: string }>) {
                        await query(
                            `INSERT INTO user_modules (user_id, module_id, module_label)
                             VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
                            [Number(user.id), String(mod.id), mod.label]
                        );
                    }
                    console.info('[register] Módulos insertados exitosamente en intento', attempt);
                    break;
                } catch (retryErr) {
                    const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
                    logger.error(`[register] Reintento ${attempt} fallido`, { error: String(retryErr) });
                    if (attempt === 3) {
                        logger.error('[register] Todos los reintentos fallaron. Los módulos no se registraron.');
                    }
                }
            }
        }
    }

    const token = await createToken({
        userId: Number(user.id),
        email: user.email,
        tipo: 'juridico',
        nombre: razonSocial as string,
    });

    const cookie = setSessionCookie(token);
    const res = NextResponse.json({
        success: true,
        user: { id: Number(user.id), email: user.email, tipo: 'juridico', nombre: razonSocial },
    });
    res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);

    await insertUserSession(token, Number(user.id), ip, userAgent);

    sendWelcomeEmail(email as string, razonSocial as string, moduloJuridico).catch(() => {});
    createWelcomeNotification(user.id, moduloJuridico).catch(() => {});
    
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

async function sendWelcomeEmail(email: string, nombre: string, moduloOrigen: string = 'personal') {
    try {
        const { getModuleConfig } = await import('@/lib/register-modules');
        const config = getModuleConfig(moduloOrigen);
        const { sendEmail, buildKyronEmailTemplate } = await import('@/lib/email-service');
        const html = buildKyronEmailTemplate({
            title: `Bienvenido a ${config.label}, ${nombre}`,
            body: config.welcomeEmailBody,
            footer: 'Este email fue enviado porque te registraste en System Kyron. Si no fuiste tú, ignora este mensaje.',
        });
        await sendEmail({
            to: email,
            subject: config.welcomeEmailSubject,
            html,
            module: 'auth',
            purpose: 'general',
        });
    } catch (err) {
        const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
        logger.error('[register] Welcome email failed', { error: String(err) });
    }
}

async function createWelcomeNotification(userId: number, moduloOrigen: string = 'personal') {
    try {
        const { getModuleConfig } = await import('@/lib/register-modules');
        const config = getModuleConfig(moduloOrigen);
        await query(
            `INSERT INTO notificaciones (user_id, tipo, titulo, mensaje, prioridad, canal, metadata)
             VALUES ($1, 'bienvenida', $2, $3, 'normal', 'app', $4)`,
            [
                userId,
                `¡Bienvenido a ${config.label}!`,
                config.welcomeDescription,
                JSON.stringify({ modulo: moduloOrigen, tipo_bienvenida: 'registro' }),
            ]
        );
    } catch (err) {
        const logger = await import('@/lib/logger').then(m => m.logger).catch(() => console);
        logger.error('[register] Welcome notification failed', { error: String(err) });
    }
}
