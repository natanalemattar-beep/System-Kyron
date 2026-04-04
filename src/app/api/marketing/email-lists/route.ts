import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const lists = await query(
            `SELECT * FROM email_lists WHERE user_id = $1 ORDER BY nombre ASC`,
            [session.userId]
        );
        return NextResponse.json({ lists });
    } catch (err) {
        console.error('[marketing/email-lists] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener listas' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { nombre, total, activos } = body;

        if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

        const safeTotal = Math.max(0, parseInt(total) || 0);
        const safeActivos = Math.max(0, parseInt(activos) || 0);

        const [list] = await query(
            `INSERT INTO email_lists (user_id, nombre, total, activos) VALUES ($1,$2,$3,$4) RETURNING *`,
            [session.userId, nombre, safeTotal, safeActivos]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_EMAIL_LIST',
            categoria: 'marketing',
            descripcion: `Lista de email creada: ${nombre}`,
            entidadTipo: 'email_list',
            entidadId: (list as { id: number }).id,
        });

        return NextResponse.json({ success: true, list });
    } catch (err) {
        console.error('[marketing/email-lists] POST error:', err);
        return NextResponse.json({ error: 'Error al crear lista' }, { status: 500 });
    }
}
