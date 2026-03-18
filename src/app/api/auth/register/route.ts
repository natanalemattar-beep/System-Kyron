import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
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

    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [email]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const cedulaExisting = await queryOne('SELECT id FROM users WHERE cedula = $1', [cedula]);
    if (cedulaExisting) {
        return NextResponse.json({ error: 'Ya existe una cuenta con esa cédula' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, nombre, apellido, cedula, telefono, telefono_alt,
            fecha_nacimiento, genero, estado_civil,
            estado_residencia, municipio, ciudad, direccion, tipo
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'natural')
         RETURNING id, email`,
        [
            email, password_hash,
            nombre, apellido, cedula,
            telefono ?? '', telefono_alt ?? '',
            fecha_nacimiento ?? null, genero ?? '', estado_civil ?? '',
            estado_residencia ?? '', municipio ?? '', ciudad ?? '', direccion ?? '',
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
    return res;
}

async function registerJuridico(body: Record<string, unknown>) {
    const {
        razonSocial, rif, tipo_empresa, actividad_economica, codigo_ciiu,
        fecha_constitucion, registro_mercantil, capital_social,
        telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
        repNombre, repCedula, rep_cargo, rep_telefono, repEmail, password,
        modules,
    } = body as Record<string, unknown>;

    if (!repEmail || !password || !razonSocial || !rif) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const email = repEmail as string;
    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [email]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const rifExisting = await queryOne('SELECT id FROM users WHERE rif = $1', [rif]);
    if (rifExisting) {
        return NextResponse.json({ error: 'Ya existe una empresa registrada con ese RIF' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password as string, 12);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, tipo,
            nombre, razon_social, rif, tipo_empresa, actividad_economica, codigo_ciiu,
            fecha_constitucion, registro_mercantil, capital_social,
            telefono, telefono_alt, estado_empresa, municipio_empresa, direccion,
            rep_nombre, rep_cedula, rep_email, rep_cargo, rep_telefono
         )
         VALUES ($1, $2, 'juridico',
                 $3, $4, $5, $6, $7, $8,
                 $9, $10, $11,
                 $12, $13, $14, $15, $16,
                 $17, $18, $19, $20, $21)
         RETURNING id, email`,
        [
            email, password_hash,
            razonSocial as string,
            razonSocial as string,
            rif as string,
            (tipo_empresa ?? '') as string,
            (actividad_economica ?? '') as string,
            (codigo_ciiu ?? '') as string,
            fecha_constitucion ? (fecha_constitucion as string) : null,
            (registro_mercantil ?? '') as string,
            (capital_social ?? '') as string,
            (telefono ?? '') as string,
            (telefono_alt ?? '') as string,
            (estado_empresa ?? '') as string,
            (municipio_empresa ?? '') as string,
            (direccion ?? '') as string,
            (repNombre ?? '') as string,
            (repCedula ?? '') as string,
            email,
            (rep_cargo ?? '') as string,
            (rep_telefono ?? '') as string,
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
    return res;
}
