import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

let cachedRate: { rate: number; date: string; fetchedAt: number } | null = null;
const CACHE_DURATION_MS = 30 * 60 * 1000;

async function fetchBcvRate(): Promise<{ rate: number; date: string }> {
  try {
    const res = await fetch('https://pydolarve.org/api/v2/dollar?monitor=bcv', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const data = await res.json();
      const price = data?.monitors?.usd?.price;
      const lastUpdate = data?.monitors?.usd?.last_update;
      if (price) {
        return { rate: parseFloat(String(price).replace(',', '.')), date: lastUpdate || new Date().toLocaleDateString('es-VE') };
      }
    }
  } catch {}

  try {
    const res2 = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      signal: AbortSignal.timeout(8000),
    });
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2?.promedio) {
        return { rate: data2.promedio, date: data2.fechaActualizacion || new Date().toLocaleDateString('es-VE') };
      }
    }
  } catch {}

  return { rate: 0, date: '' };
}

export async function GET() {
  try {
    if (cachedRate && (Date.now() - cachedRate.fetchedAt) < CACHE_DURATION_MS) {
      return NextResponse.json({ rate: cachedRate.rate, date: cachedRate.date, cached: true });
    }

    const result = await fetchBcvRate();
    if (result.rate > 0) {
      cachedRate = { ...result, fetchedAt: Date.now() };
    }

    return NextResponse.json({ rate: result.rate, date: result.date, cached: false });
  } catch {
    return NextResponse.json({ rate: cachedRate?.rate || 0, date: cachedRate?.date || '', error: true });
  }
}
