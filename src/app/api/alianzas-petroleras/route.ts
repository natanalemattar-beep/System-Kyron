import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const solicitudes = await query(
        `SELECT id, empresa_solicitante, rif_solicitante, nombre_contacto, email_contacto,
                tipo_alianza, area_operacion, descripcion, estado, created_at
         FROM alianzas_petroleras
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [session.userId]
    );

    return NextResponse.json({ solicitudes });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const {
        empresa_solicitante, rif_solicitante, nombre_contacto, cargo_contacto,
        email_contacto, telefono, tipo_alianza, area_operacion, descripcion, servicios_ofrecidos
    } = body;

    if (!tipo_alianza || !nombre_contacto || !email_contacto) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const [sol] = await query(
        `INSERT INTO alianzas_petroleras
         (user_id, empresa_solicitante, rif_solicitante, nombre_contacto, cargo_contacto,
          email_contacto, telefono, tipo_alianza, area_operacion, descripcion, servicios_ofrecidos)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING id, tipo_alianza, estado, created_at`,
        [
            session.userId,
            empresa_solicitante ?? null,
            rif_solicitante ?? null,
            nombre_contacto,
            cargo_contacto ?? null,
            email_contacto,
            telefono ?? null,
            tipo_alianza,
            area_operacion ?? null,
            descripcion ?? null,
            servicios_ofrecidos ? `{${(servicios_ofrecidos as string[]).map(s => `"${s}"`).join(',')}}` : null,
        ]
    );

    return NextResponse.json({ success: true, solicitud: sol });
}
