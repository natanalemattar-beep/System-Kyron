import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface BCVRateData {
  fecha: string;
  tasa_usd_ves: number;
  tasa_eur_ves: number | null;
}

async function fetchFromExchangeRateAPI(): Promise<BCVRateData | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.result !== 'success' || !data.rates?.VES) return null;

    const today = new Date().toISOString().split('T')[0];
    return {
      fecha: today,
      tasa_usd_ves: data.rates.VES,
      tasa_eur_ves: data.rates.EUR ? data.rates.VES / data.rates.EUR : null,
    };
  } catch {
    return null;
  }
}

async function fetchFromPyDolarAPI(): Promise<BCVRateData | null> {
  try {
    const res = await fetch('https://pydolarve.org/api/v1/dollar?page=bcv', {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    const bcvMonitor = data?.monitors?.usd;
    if (!bcvMonitor?.price) return null;

    const today = new Date().toISOString().split('T')[0];
    return {
      fecha: today,
      tasa_usd_ves: parseFloat(bcvMonitor.price),
      tasa_eur_ves: data?.monitors?.eur?.price ? parseFloat(data.monitors.eur.price) : null,
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get('x-cron-secret');
  const validCronSecret = process.env.CRON_SECRET;

  if (cronSecret && validCronSecret && cronSecret === validCronSecret) {
    // Authorized via cron secret
  } else {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const existing = await queryOne<{ id: number }>(
      `SELECT id FROM tasas_bcv WHERE fecha = $1`,
      [today]
    );

    if (existing) {
      const current = await queryOne(
        `SELECT id, fecha, tasa_usd_ves::text, tasa_eur_ves::text, fuente, created_at
         FROM tasas_bcv WHERE fecha = $1`,
        [today]
      );
      return NextResponse.json({
        updated: false,
        message: 'Tasa del día ya existe',
        tasa: current,
      });
    }

    let rateData = await fetchFromPyDolarAPI();
    let fuente = 'pydolar-bcv';

    if (!rateData) {
      rateData = await fetchFromExchangeRateAPI();
      fuente = 'exchangerate-api';
    }

    if (!rateData) {
      return NextResponse.json(
        { updated: false, error: 'No se pudo obtener la tasa de ninguna fuente' },
        { status: 502 }
      );
    }

    const [tasa] = await query(
      `INSERT INTO tasas_bcv (fecha, tasa_usd_ves, tasa_eur_ves, fuente)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (fecha) DO UPDATE
         SET tasa_usd_ves = EXCLUDED.tasa_usd_ves,
             tasa_eur_ves = EXCLUDED.tasa_eur_ves,
             fuente = EXCLUDED.fuente
       RETURNING id, fecha, tasa_usd_ves::text, tasa_eur_ves::text, fuente`,
      [rateData.fecha, rateData.tasa_usd_ves, rateData.tasa_eur_ves, fuente]
    );

    console.log(`[tasas-bcv] Auto-fetch: ${rateData.tasa_usd_ves} VES/USD from ${fuente}`);

    return NextResponse.json({
      updated: true,
      fuente,
      tasa,
    });
  } catch (err) {
    console.error('[tasas-bcv/auto-fetch] error:', err);
    return NextResponse.json({ error: 'Error al actualizar tasa BCV' }, { status: 500 });
  }
}
