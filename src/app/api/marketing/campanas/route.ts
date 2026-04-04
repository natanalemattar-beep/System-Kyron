import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const campanas = await query(
            `SELECT * FROM campanas_marketing WHERE user_id = $1 ORDER BY created_at DESC`,
            [session.userId]
        );
        return NextResponse.json({ campanas });
    } catch (err) {
        console.error('[marketing/campanas] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener campañas' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { nombre, tipo, canales, estado, fecha_inicio, fecha_fin, presupuesto, gastado, alcance, impresiones, clicks, conversiones, roi, notas } = body;

        if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

        const safeBudget = Math.max(0, parseFloat(presupuesto) || 0);
        const safeGastado = Math.max(0, parseFloat(gastado) || 0);
        const safeAlcance = Math.max(0, parseInt(alcance) || 0);
        const safeImpresiones = Math.max(0, parseInt(impresiones) || 0);
        const safeClicks = Math.max(0, parseInt(clicks) || 0);
        const safeConversiones = Math.max(0, parseInt(conversiones) || 0);
        const safeRoi = parseFloat(roi) || 0;

        const [campana] = await query(
            `INSERT INTO campanas_marketing (user_id, nombre, tipo, canales, estado, fecha_inicio, fecha_fin, presupuesto, gastado, alcance, impresiones, clicks, conversiones, roi, notas)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
             RETURNING *`,
            [
                session.userId,
                nombre,
                tipo ?? 'Digital',
                canales ?? [],
                estado ?? 'borrador',
                fecha_inicio ?? null,
                fecha_fin ?? null,
                safeBudget,
                safeGastado,
                safeAlcance,
                safeImpresiones,
                safeClicks,
                safeConversiones,
                safeRoi,
                notas ?? null,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_CAMPANA',
            categoria: 'marketing',
            descripcion: `Campaña creada: ${nombre}`,
            entidadTipo: 'campana_marketing',
            entidadId: (campana as { id: number }).id,
        });

        return NextResponse.json({ success: true, campana });
    } catch (err) {
        console.error('[marketing/campanas] POST error:', err);
        return NextResponse.json({ error: 'Error al crear campaña' }, { status: 500 });
    }
}
