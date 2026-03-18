import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const [usersResult, juridicosResult] = await Promise.all([
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users`),
            query<{ total: string }>(`SELECT COUNT(*) AS total FROM users WHERE tipo = 'juridico'`),
        ]);

        const totalUsuarios = parseInt(usersResult[0]?.total ?? '0', 10);
        const totalEmpresas = parseInt(juridicosResult[0]?.total ?? '0', 10);

        return NextResponse.json({
            totalUsuarios,
            totalEmpresas,
            cumplimiento: 100,
            erroresFiscales: 0,
        });
    } catch {
        return NextResponse.json({
            totalUsuarios: 0,
            totalEmpresas: 0,
            cumplimiento: 100,
            erroresFiscales: 0,
        });
    }
}
