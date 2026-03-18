import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { createToken, setSessionCookie } from '@/lib/auth';

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
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
        }

        const user = await queryOne<DbUser>(
            `SELECT id, email, password_hash, tipo, nombre, apellido, cedula, razon_social, rif
             FROM users WHERE email = $1`,
            [email]
        );

        if (!user) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
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
        return res;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
