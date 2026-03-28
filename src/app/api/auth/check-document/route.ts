import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const field = searchParams.get('field');
        const value = searchParams.get('value');

        if (!field || !value || !['cedula', 'rif'].includes(field)) {
            return NextResponse.json({ exists: false });
        }

        const row = await queryOne(
            `SELECT id FROM users WHERE ${field} = $1 LIMIT 1`,
            [value]
        );

        if (row) {
            return NextResponse.json({ exists: true });
        }

        return NextResponse.json({ exists: false });
    } catch {
        return NextResponse.json({ exists: false });
    }
}
