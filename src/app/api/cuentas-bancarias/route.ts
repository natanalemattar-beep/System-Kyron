import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const cuentas = await query(
        `SELECT id, banco, codigo_banco, numero_cuenta, tipo_cuenta, titular,
                activa, saldo_actual::text, saldo_disponible::text, ultima_sincronizacion, created_at
         FROM cuentas_bancarias WHERE user_id = $1 ORDER BY banco ASC`,
        [session.userId]
    );

    return NextResponse.json({ cuentas });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const { banco, codigo_banco, numero_cuenta, tipo_cuenta, titular, saldo_actual } = body;

    if (!banco || !codigo_banco || !numero_cuenta) {
        return NextResponse.json({ error: 'Banco, código y número de cuenta son requeridos' }, { status: 400 });
    }

    const existing = await queryOne(
        `SELECT id FROM cuentas_bancarias WHERE user_id = $1 AND numero_cuenta = $2`,
        [session.userId, numero_cuenta]
    );
    if (existing) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese número' }, { status: 409 });
    }

    const [cuenta] = await query(
        `INSERT INTO cuentas_bancarias (user_id, banco, codigo_banco, numero_cuenta, tipo_cuenta, titular, saldo_actual, saldo_disponible)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
         RETURNING id, banco, codigo_banco, numero_cuenta, tipo_cuenta, titular, saldo_actual::text`,
        [session.userId, banco, codigo_banco, numero_cuenta, tipo_cuenta ?? 'corriente', titular ?? '', parseFloat(saldo_actual ?? '0')]
    );

    await logActivity({
        userId: session.userId,
        evento: 'NUEVA_CUENTA_BANCARIA',
        categoria: 'banco',
        descripcion: `Cuenta bancaria registrada: ${banco} Nº ${numero_cuenta} (${tipo_cuenta ?? 'corriente'})`,
        entidadTipo: 'cuenta_bancaria',
        entidadId: (cuenta as { id: number }).id,
        metadata: { banco, codigo_banco, numero_cuenta, tipo_cuenta: tipo_cuenta ?? 'corriente', titular: titular ?? null },
    });
    return NextResponse.json({ success: true, cuenta });
}
