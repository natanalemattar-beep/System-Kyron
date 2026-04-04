import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const campaigns = await query(
            `SELECT * FROM email_campaigns WHERE user_id = $1 ORDER BY created_at DESC`,
            [session.userId]
        );
        const lists = await query(
            `SELECT * FROM email_lists WHERE user_id = $1 ORDER BY nombre ASC`,
            [session.userId]
        );
        return NextResponse.json({ campaigns, lists });
    } catch (err) {
        console.error('[marketing/email-campaigns] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener campañas de email' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { type } = body;

        if (type === 'list') {
            const { nombre, total, activos } = body;
            if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
            const safeTotal = Math.max(0, parseInt(total) || 0);
            const safeActivos = Math.max(0, parseInt(activos) || 0);
            const [list] = await query(
                `INSERT INTO email_lists (user_id, nombre, total, activos) VALUES ($1,$2,$3,$4) RETURNING *`,
                [session.userId, nombre, safeTotal, safeActivos]
            );
            return NextResponse.json({ success: true, list });
        }

        const { nombre, estado, fecha, destinatarios, entregados, abiertos, clicks, bajas } = body;
        if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

        const safeDestinatarios = Math.max(0, parseInt(destinatarios) || 0);
        const safeEntregados = Math.max(0, parseInt(entregados) || 0);
        const safeAbiertos = Math.max(0, parseInt(abiertos) || 0);
        const safeClicks = Math.max(0, parseInt(clicks) || 0);
        const safeBajas = Math.max(0, parseInt(bajas) || 0);

        const [campaign] = await query(
            `INSERT INTO email_campaigns (user_id, nombre, estado, fecha, destinatarios, entregados, abiertos, clicks, bajas)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
             RETURNING *`,
            [
                session.userId,
                nombre,
                estado ?? 'borrador',
                fecha ?? null,
                safeDestinatarios,
                safeEntregados,
                safeAbiertos,
                safeClicks,
                safeBajas,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVA_EMAIL_CAMPAIGN',
            categoria: 'marketing',
            descripcion: `Campaña email creada: ${nombre}`,
            entidadTipo: 'email_campaign',
            entidadId: (campaign as { id: number }).id,
        });

        return NextResponse.json({ success: true, campaign });
    } catch (err) {
        console.error('[marketing/email-campaigns] POST error:', err);
        return NextResponse.json({ error: 'Error al crear campaña de email' }, { status: 500 });
    }
}
