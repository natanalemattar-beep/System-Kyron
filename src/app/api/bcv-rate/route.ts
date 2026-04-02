import { NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

let cachedRate: { rate: number; date: string; fetchedAt: number } | null = null;
const CACHE_DURATION_MS = 15 * 60 * 1000;

async function fetchFromPyDolar(): Promise<{ rate: number; date: string } | null> {
  try {
    const res = await fetch('https://pydolarve.org/api/v2/dollar?monitor=bcv', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const price = data?.monitors?.usd?.price;
    const lastUpdate = data?.monitors?.usd?.last_update;
    if (price) {
      return { rate: parseFloat(String(price).replace(',', '.')), date: lastUpdate || new Date().toLocaleDateString('es-VE') };
    }
  } catch {}
  return null;
}

async function fetchFromDolarApi(): Promise<{ rate: number; date: string } | null> {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.promedio) {
      const fecha = data.fechaActualizacion
        ? new Date(data.fechaActualizacion).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : new Date().toLocaleDateString('es-VE');
      return { rate: data.promedio, date: fecha };
    }
  } catch {}
  return null;
}

async function fetchFromExchangeRateApi(): Promise<{ rate: number; date: string } | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.result === 'success' && data?.rates?.VES) {
      return {
        rate: data.rates.VES,
        date: new Date().toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      };
    }
  } catch {}
  return null;
}

async function fetchFromDb(): Promise<{ rate: number; date: string } | null> {
  try {
    const row = await queryOne<{ tasa_usd_ves: string; fecha: string }>(
      `SELECT tasa_usd_ves::text, fecha::text FROM tasas_bcv ORDER BY fecha DESC LIMIT 1`
    );
    if (row && parseFloat(row.tasa_usd_ves) > 0) {
      return {
        rate: parseFloat(row.tasa_usd_ves),
        date: new Date(row.fecha).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      };
    }
  } catch {}
  return null;
}

async function saveToDB(rate: number, fuente: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    await query(
      `INSERT INTO tasas_bcv (fecha, tasa_usd_ves, fuente)
       VALUES ($1, $2, $3)
       ON CONFLICT (fecha) DO UPDATE SET tasa_usd_ves = EXCLUDED.tasa_usd_ves, fuente = EXCLUDED.fuente`,
      [today, rate, fuente]
    );
  } catch {}
}

async function fetchBcvRate(): Promise<{ rate: number; date: string; fuente: string }> {
  const sources: Array<{ fn: () => Promise<{ rate: number; date: string } | null>; name: string }> = [
    { fn: fetchFromPyDolar, name: 'pydolar-bcv' },
    { fn: fetchFromDolarApi, name: 'dolarapi' },
    { fn: fetchFromExchangeRateApi, name: 'exchangerate-api' },
  ];

  for (const source of sources) {
    const result = await source.fn();
    if (result && result.rate > 0) {
      saveToDB(result.rate, source.name).catch(() => {});
      return { ...result, fuente: source.name };
    }
  }

  const dbResult = await fetchFromDb();
  if (dbResult) {
    return { ...dbResult, fuente: 'db-cache' };
  }

  return { rate: 0, date: '', fuente: 'none' };
}

export async function GET() {
  try {
    if (cachedRate && (Date.now() - cachedRate.fetchedAt) < CACHE_DURATION_MS) {
      return NextResponse.json({ rate: cachedRate.rate, date: cachedRate.date, cached: true });
    }

    const result = await fetchBcvRate();
    if (result.rate > 0) {
      cachedRate = { rate: result.rate, date: result.date, fetchedAt: Date.now() };
      console.log(`[bcv-rate] ${result.rate} Bs/$ via ${result.fuente} (${result.date})`);
    }

    return NextResponse.json({ rate: result.rate, date: result.date, cached: false });
  } catch {
    return NextResponse.json({ rate: cachedRate?.rate || 0, date: cachedRate?.date || '', error: true });
  }
}
