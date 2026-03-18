import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const empleados = await query(
        `SELECT id, nombre, apellido, cedula, cargo, departamento,
                fecha_ingreso, salario_base::text, tipo_contrato, activo,
                telefono, email, cuenta_banco, numero_cuenta, created_at
         FROM empleados WHERE user_id = $1 ORDER BY apellido, nombre`,
        [session.userId]
    );

    return NextResponse.json({ empleados });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const body = await req.json();
    const { nombre, apellido, cedula, cargo, departamento, fecha_ingreso, salario_base, tipo_contrato, telefono, email, cuenta_banco, numero_cuenta } = body;

    if (!nombre || !apellido || !cedula) {
        return NextResponse.json({ error: 'Nombre, apellido y cédula son requeridos' }, { status: 400 });
    }

    const existing = await queryOne(`SELECT id FROM empleados WHERE cedula = $1`, [cedula]);
    if (existing) {
        return NextResponse.json({ error: 'Ya existe un empleado con esa cédula' }, { status: 409 });
    }

    const [empleado] = await query(
        `INSERT INTO empleados (user_id, nombre, apellido, cedula, cargo, departamento, fecha_ingreso, salario_base, tipo_contrato, telefono, email, cuenta_banco, numero_cuenta)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         RETURNING id, nombre, apellido, cedula, cargo, departamento`,
        [
            session.userId,
            nombre, apellido, cedula,
            cargo ?? null,
            departamento ?? null,
            fecha_ingreso ?? null,
            parseFloat(salario_base ?? '0'),
            tipo_contrato ?? null,
            telefono ?? null,
            email ?? null,
            cuenta_banco ?? null,
            numero_cuenta ?? null,
        ]
    );

    return NextResponse.json({ success: true, empleado });
}
