import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get('categoria');

    const params: unknown[] = [session.userId];
    let where = 'user_id = $1';
    if (categoria) { where += ' AND categoria = $2'; params.push(categoria); }

    const solicitudes = await query(
        `SELECT id, categoria, subcategoria, empresa_solicitante, rif, descripcion,
                ciiu_codigo, estado_operacion, municipio, personal_requerido,
                presupuesto_estimado::text, moneda, estado, created_at
         FROM sector_solicitudes WHERE ${where} ORDER BY created_at DESC LIMIT 50`,
        params
    );

    return NextResponse.json({ solicitudes });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const {
        categoria, subcategoria, empresa_solicitante, rif, descripcion,
        ciiu_codigo, estado_operacion, municipio, personal_requerido,
        presupuesto_estimado, moneda
    } = body;

    if (!categoria) {
        return NextResponse.json({ error: 'La categoría es requerida' }, { status: 400 });
    }

    const [sol] = await query(
        `INSERT INTO sector_solicitudes
         (user_id, categoria, subcategoria, empresa_solicitante, rif, descripcion,
          ciiu_codigo, estado_operacion, municipio, personal_requerido, presupuesto_estimado, moneda)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         RETURNING id, categoria, estado, created_at`,
        [
            session.userId, categoria, subcategoria ?? null,
            empresa_solicitante ?? null, rif ?? null, descripcion ?? null,
            ciiu_codigo ?? null, estado_operacion ?? null, municipio ?? null,
            personal_requerido ? parseInt(personal_requerido) : null,
            presupuesto_estimado ? parseFloat(presupuesto_estimado) : null,
            moneda ?? 'USD',
        ]
    );

    return NextResponse.json({ success: true, solicitud: sol });
}
