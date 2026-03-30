import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { rateLimit, getClientIP, rateLimitResponse } from '@/lib/rate-limiter';
import { sanitizeEmail, isValidEmail, isStrongPassword, sanitizeString } from '@/lib/input-sanitizer';
import { validarRIF, validarFormatoCedula } from '@/lib/validacion-venezuela';

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
    } catch (err) {
        console.error('Register error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
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
    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const cedulaExisting = await queryOne('SELECT id FROM users WHERE cedula = $1', [cedula]);
    if (cedulaExisting) {
        return NextResponse.json({ error: 'Ya existe una cuenta con esa cédula' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const email_verificado = !!(body as Record<string, unknown>).email_verificado;
    const telefono_verificado = !!(body as Record<string, unknown>).telefono_verificado;

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, nombre, apellido, cedula, telefono, telefono_alt,
            fecha_nacimiento, genero, estado_civil,
            estado_residencia, municipio, ciudad, direccion, tipo,
            email_verificado, telefono_verificado, verificado
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'natural', $15, $16, $17)
         RETURNING id, email`,
        [
            normalizedEmail, password_hash,
            nombre, apellido, cedula,
            telefono ?? '', telefono_alt ?? '',
            fecha_nacimiento ?? null, genero ?? '', estado_civil ?? '',
            estado_residencia ?? '', municipio ?? '', ciudad ?? '', direccion ?? '',
            email_verificado, telefono_verificado,
            email_verificado || telefono_verificado,
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
    await logActivity({
        userId: user.id,
        evento: 'REGISTRO_USUARIO',
        categoria: 'auth',
        descripcion: `Nuevo usuario natural registrado: ${nombre} ${apellido} (${email})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email, tipo: 'natural', cedula },
    });
    return res;
}

async function registerJuridico(body: Record<string, unknown>) {
    const {
        razonSocial, rif, tipo_empresa, actividad_economica, codigo_ciiu,
        fecha_constitucion, registro_mercantil, capital_social,
        telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
        repNombre, repCedula, rep_cargo, rep_telefono, repEmail, password,
        modules, plan, plan_monto,
    } = body as Record<string, unknown>;

    if (!repEmail || !password || !razonSocial || !rif) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const VALID_PLANS: Record<string, number> = {
        basico: 12, profesional: 28, empresarial: 52, premium: 95,
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

    const email = repEmail as string;
    if (!isValidEmail(email)) {
        return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
    }

    const pwCheck = isStrongPassword(password as string);
    if (!pwCheck.valid) {
        return NextResponse.json({ error: pwCheck.reason }, { status: 400 });
    }

    const normalizedEmail = sanitizeEmail(email);
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
            plan, plan_monto
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21,
                 $22, $23)
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
            sanitizeString((telefono ?? '') as string, 20),
            sanitizeString((telefono_alt ?? '') as string, 20),
            sanitizeString((estado_empresa ?? '') as string, 100),
            sanitizeString((municipio_empresa ?? '') as string, 100),
            sanitizeString((direccion ?? '') as string, 500),
            repNombreStr,
            sanitizeString((repCedula ?? '') as string, 20),
            email,
            sanitizeString((rep_cargo ?? '') as string, 100),
            sanitizeString((rep_telefono ?? '') as string, 20),
            validatedPlan,
            validatedPlanMonto,
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
    await logActivity({
        userId: user.id,
        evento: 'REGISTRO_USUARIO',
        categoria: 'auth',
        descripcion: `Nueva empresa registrada: ${razonSocial as string} (RIF: ${rif as string})`,
        entidadTipo: 'usuario',
        entidadId: user.id,
        metadata: { email, tipo: 'juridico', rif, razon_social: razonSocial },
    });
    return res;
}
