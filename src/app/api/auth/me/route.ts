import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

interface DbUser {
    id: number;
    email: string;
    tipo: 'natural' | 'juridico' | 'admin';
    nombre: string;
    apellido: string | null;
    cedula: string | null;
    razon_social: string | null;
    rif: string | null;
    plan: string | null;
    plan_monto: number | null;
}

interface DbModule {
    module_id: string;
}

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await queryOne<DbUser>(
        `SELECT id, email, tipo, nombre, apellido, cedula, razon_social, rif, plan, plan_monto
         FROM users WHERE id = $1`,
        [session.userId]
    );

    if (!user) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const modules = await query<DbModule>(
        `SELECT module_id FROM user_modules WHERE user_id = $1 AND activo = true`,
        [user.id]
    );

    return NextResponse.json({
        user: {
            ...user,
            modules: modules.map(m => m.module_id),
        },
    });
}
