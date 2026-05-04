import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || session.userTipo !== 'admin') {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const results = await query(`
            SELECT id, answers, ip_address, created_at 
            FROM feedback_responses 
            ORDER BY created_at DESC 
            LIMIT 100
        `);

        return NextResponse.json(results);
    } catch (error) {
        console.error('[API_ADMIN_FEEDBACK] Error:', error);
        return NextResponse.json({ error: 'Falla al obtener respuestas' }, { status: 500 });
    }
}
