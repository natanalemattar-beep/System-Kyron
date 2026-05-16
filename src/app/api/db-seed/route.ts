import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { seedDemoData } from '@/lib/db-seed';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const result = await seedDemoData(session.user.id);
        return NextResponse.json({
            success: true,
            message: `Datos de demostraciÃ³n cargados: ${result.seeded.length} mÃ³dulos.`,
            ...result,
        });
    } catch (err) {
        console.error('[db-seed] Error:', err);
        return NextResponse.json(
            { error: 'Error al cargar datos de demostraciÃ³n' },
            { status: 500 }
        );
    }
}
