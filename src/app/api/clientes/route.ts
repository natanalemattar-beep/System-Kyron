import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const clientes = await query(
            `SELECT id, tipo, razon_social, rif, nombre_contacto, cedula_contacto,
                    telefono, email, direccion, estado, municipio, activo, created_at
             FROM clientes WHERE user_id = $1 ORDER BY razon_social ASC NULLS LAST`,
            [session.userId]
        );

        return NextResponse.json({ clientes });
    } catch (err) {
        console.error('[clientes] GET error:', err);
        return NextResponse.json({ error: 'Error al obtener clientes' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    try {
        const body = await req.json();
        const { tipo, razon_social, rif, nombre_contacto, cedula_contacto, telefono, email, direccion, estado, municipio } = body;

        if (!razon_social && !nombre_contacto) {
            return NextResponse.json({ error: 'Se requiere razón social o nombre del contacto' }, { status: 400 });
        }

        if (rif) {
            const exists = await queryOne(`SELECT id FROM clientes WHERE user_id = $1 AND rif = $2`, [session.userId, rif]);
            if (exists) return NextResponse.json({ error: 'Ya existe un cliente con ese RIF' }, { status: 409 });
        }

        const [cliente] = await query(
            `INSERT INTO clientes (user_id, tipo, razon_social, rif, nombre_contacto, cedula_contacto, telefono, email, direccion, estado, municipio)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
             RETURNING id, razon_social, rif, nombre_contacto`,
            [
                session.userId,
                tipo ?? 'juridico',
                razon_social ?? null,
                rif ?? null,
                nombre_contacto ?? null,
                cedula_contacto ?? null,
                telefono ?? null,
                email ?? null,
                direccion ?? null,
                estado ?? null,
                municipio ?? null,
            ]
        );

        await logActivity({
            userId: session.userId,
            evento: 'NUEVO_CLIENTE',
            categoria: 'clientes',
            descripcion: `Cliente registrado: ${(cliente as { razon_social?: string; nombre_contacto?: string }).razon_social ?? (cliente as { razon_social?: string; nombre_contacto?: string }).nombre_contacto ?? 'Sin nombre'}`,
            entidadTipo: 'cliente',
            entidadId: (cliente as { id: number }).id,
            metadata: { tipo: tipo ?? 'juridico', rif: rif ?? null },
        });
        return NextResponse.json({ success: true, cliente });
    } catch (err) {
        console.error('[clientes] POST error:', err);
        return NextResponse.json({ error: 'Error al registrar cliente' }, { status: 500 });
    }
}
