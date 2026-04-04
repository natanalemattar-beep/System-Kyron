import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const embudos = await query(
            `SELECT * FROM embudos_ventas WHERE user_id = $1 ORDER BY created_at DESC`,
            [session.userId]
        );

        const embudoIds = (embudos as { id: number }[]).map(e => e.id);
        let etapas: unknown[] = [];
        if (embudoIds.length > 0) {
            etapas = await query(
                `SELECT * FROM etapas_embudo WHERE embudo_id = ANY($1) ORDER BY orden ASC`,
                [embudoIds]
            );
        }

        const result = (embudos as Record<string, unknown>[]).map(e => ({
            ...e,
            etapas: (etapas as { embudo_id: number }[]).filter(et => et.embudo_id === (e as { id: number }).id),
        }));

        return NextResponse.json({ embudos: result });
    } catch (err) {
        console.error('[marketing/embudos] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener embudos' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { nombre, estado, leads, conversion_global, ticket_promedio, ingreso_estimado, etapas } = body;

        if (!nombre) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

        const safeLeads = Math.max(0, parseInt(leads) || 0);
        const safeConversion = parseFloat(conversion_global) || 0;
        const safeTicket = Math.max(0, parseFloat(ticket_promedio) || 0);
        const safeIngreso = Math.max(0, parseFloat(ingreso_estimado) || 0);

        const [embudo] = await query(
            `INSERT INTO embudos_ventas (user_id, nombre, estado, leads, conversion_global, ticket_promedio, ingreso_estimado)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [
                session.userId,
                nombre,
                estado ?? 'activo',
                safeLeads,
                safeConversion,
                safeTicket,
                safeIngreso,
            ]
        );

        const embudoId = (embudo as { id: number }).id;

        if (Array.isArray(etapas)) {
            for (let i = 0; i < etapas.length; i++) {
                const et = etapas[i];
                await query(
                    `INSERT INTO etapas_embudo (embudo_id, nombre, total, orden, color, bg)
                     VALUES ($1,$2,$3,$4,$5,$6)`,
                    [embudoId, et.nombre, Math.max(0, parseInt(et.total) || 0), i, et.color ?? 'text-primary', et.bg ?? 'bg-primary/10']
                );
            }
        }

        await logActivity({
            userId: session.userId,
            evento: 'NUEVO_EMBUDO',
            categoria: 'marketing',
            descripcion: `Embudo creado: ${nombre}`,
            entidadTipo: 'embudo_ventas',
            entidadId: embudoId,
        });

        return NextResponse.json({ success: true, embudo });
    } catch (err) {
        console.error('[marketing/embudos] POST error:', err);
        return NextResponse.json({ error: 'Error al crear embudo' }, { status: 500 });
    }
}
