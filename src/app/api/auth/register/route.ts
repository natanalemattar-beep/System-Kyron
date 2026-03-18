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
    const { nombre, apellido, cedula, telefono, email, password } = body as Record<string, string>;

    if (!email || !password || !nombre || !cedula) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const existing = await queryOne('SELECT id FROM users WHERE email = $1', [email]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (email, password_hash, nombre, apellido, cedula, telefono, tipo)
         VALUES ($1, $2, $3, $4, $5, $6, 'natural')
         RETURNING id, email`,
        [email, password_hash, nombre, apellido ?? '', cedula, telefono ?? '']
    );

    const token = await createToken({
        userId: user.id,
        email: user.email,
        tipo: 'natural',
        nombre: nombre,
    });

    const cookie = setSessionCookie(token);
    const res = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, tipo: 'natural', nombre },
    });
    res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);
    return res;
}

async function registerJuridico(body: Record<string, unknown>) {
    const {
        razonSocial, rif, telefono, direccion,
        repNombre, repCedula, repEmail, password,
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

    const password_hash = await bcrypt.hash(password as string, 12);

    const [user] = await query<{ id: number; email: string }>(
        `INSERT INTO users (
            email, password_hash, tipo,
            razon_social, rif, telefono, direccion,
            rep_nombre, rep_cedula, rep_email, nombre
         )
         VALUES ($1, $2, 'juridico', $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id, email`,
        [
            email, password_hash,
            razonSocial, rif, telefono, direccion,
            repNombre, repCedula, repEmail,
            repNombre,
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
