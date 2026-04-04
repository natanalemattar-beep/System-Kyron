import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const redes = await query(
            `SELECT * FROM redes_sociales WHERE user_id = $1 ORDER BY seguidores DESC`,
            [session.userId]
        );
        return NextResponse.json({ redes });
    } catch (err) {
        console.error('[marketing/redes-sociales] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener redes sociales' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { nombre, handle, seguidores, crecimiento, alcance, engagement, publicaciones, mejor_post, color, bg, border_color } = body;

        if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

        const safeSeguidores = Math.max(0, parseInt(seguidores) || 0);
        const safeCrecimiento = parseFloat(crecimiento) || 0;
        const safeAlcance = Math.max(0, parseInt(alcance) || 0);
        const safeEngagement = Math.max(0, parseFloat(engagement) || 0);
        const safePubs = Math.max(0, parseInt(publicaciones) || 0);

        const [red] = await query(
            `INSERT INTO redes_sociales (user_id, nombre, handle, seguidores, crecimiento, alcance, engagement, publicaciones, mejor_post, color, bg, border_color)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
             RETURNING *`,
            [
                session.userId,
                nombre,
                handle ?? null,
                safeSeguidores,
                safeCrecimiento,
                safeAlcance,
                safeEngagement,
                safePubs,
                mejor_post ?? null,
                color ?? 'text-primary',
                bg ?? 'bg-primary/10',
                border_color ?? 'border-primary/20',
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_RED_SOCIAL',
            categoria: 'marketing',
            descripcion: `Red social añadida: ${nombre}`,
            entidadTipo: 'red_social',
            entidadId: (red as { id: number }).id,
        });

        return NextResponse.json({ success: true, red });
    } catch (err) {
        console.error('[marketing/redes-sociales] POST error:', err);
        return NextResponse.json({ error: 'Error al crear red social' }, { status: 500 });
    }
}
