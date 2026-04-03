import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface BCVRateData {
  fecha: string;
  tasa_usd_ves: number;
  tasa_eur_ves: number | null;
}

async function fetchBCVHtml(): Promise<string | null> {
  const https = await import('https');
  return new Promise((resolve) => {
    const req = https.request('https://www.bcv.org.ve/', {
      method: 'GET',
      rejectUnauthorized: false,
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-VE,es;q=0.9,en;q=0.5',
      },
    }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectReq = https.request(res.headers.location, {
          method: 'GET',
          rejectUnauthorized: false,
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        }, (rRes) => {
          let data = '';
          rRes.on('data', (chunk: Buffer) => { data += chunk.toString(); });
          rRes.on('end', () => resolve(data));
        });
        redirectReq.on('error', () => resolve(null));
        redirectReq.on('timeout', () => { redirectReq.destroy(); resolve(null); });
        redirectReq.end();
        return;
      }
      let data = '';
      res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
      res.on('end', () => resolve(data));
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.end();
  });
}

async function fetchFromBCVDirect(): Promise<BCVRateData | null> {
  try {
    const html = await fetchBCVHtml();
    if (!html) return null;

    const dolarSection = html.match(/id="dolar"[\s\S]*?<strong>\s*([\d.,]+)\s*<\/strong>/i);
    let usdVal: number | null = null;

    if (dolarSection) {
      usdVal = parseFloat(dolarSection[1].replace(/\./g, '').replace(',', '.'));
    }

    if (!usdVal || isNaN(usdVal) || usdVal < 1) {
      const usdSection = html.match(/USD\s*<\/span>[\s\S]*?<strong>\s*([\d.,]+)\s*<\/strong>/i)
        || html.match(/dollar[\s\S]*?<strong>\s*([\d.,]+)\s*<\/strong>/i);
      if (usdSection) {
        usdVal = parseFloat(usdSection[1].replace(/\./g, '').replace(',', '.'));
      }
    }

    if (!usdVal || isNaN(usdVal) || usdVal < 1) return null;

    const euroSection = html.match(/id="euro"[\s\S]*?<strong>\s*([\d.,]+)\s*<\/strong>/i)
      || html.match(/EUR\s*<\/span>[\s\S]*?<strong>\s*([\d.,]+)\s*<\/strong>/i);
    let eurRate: number | null = null;
    if (euroSection) {
      eurRate = parseFloat(euroSection[1].replace(/\./g, '').replace(',', '.'));
      if (isNaN(eurRate)) eurRate = null;
    }

    const today = new Date().toISOString().split('T')[0];
    console.log(`[bcv-direct] Tasa obtenida directamente del BCV: USD=${usdVal}, EUR=${eurRate}`);
    return { fecha: today, tasa_usd_ves: usdVal, tasa_eur_ves: eurRate };
  } catch (e) {
    console.error('[bcv-direct] Error scraping BCV:', e);
    return null;
  }
}

async function fetchFromPyDolarAPI(): Promise<BCVRateData | null> {
  try {
    const res = await fetch('https://pydolarve.org/api/v2/dollar?monitor=bcv', {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const usd = data?.monitors?.usd;
    if (!usd?.price) return null;
    const today = new Date().toISOString().split('T')[0];
    return {
      fecha: today,
      tasa_usd_ves: parseFloat(String(usd.price).replace(',', '.')),
      tasa_eur_ves: data?.monitors?.eur?.price ? parseFloat(String(data.monitors.eur.price).replace(',', '.')) : null,
    };
  } catch {
    return null;
  }
}

async function fetchFromDolarAPI(): Promise<BCVRateData | null> {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.promedio) return null;
    const today = new Date().toISOString().split('T')[0];
    return {
      fecha: today,
      tasa_usd_ves: data.promedio,
      tasa_eur_ves: null,
    };
  } catch {
    return null;
  }
}

async function fetchFromExchangeRateAPI(): Promise<BCVRateData | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(8000),
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

const SOURCE_PRIORITY: Record<string, number> = {
  'bcv-directo': 10,
  'pydolar-bcv': 5,
  'dolarapi': 3,
  'exchangerate-api': 1,
};

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get('x-cron-secret');
  const validCronSecret = process.env.CRON_SECRET;
  const isInternal = req.headers.get('x-internal-fetch') === 'true';

  if (!isInternal && !(cronSecret && validCronSecret && cronSecret === validCronSecret)) {
    const { getSession } = await import('@/lib/auth');
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const existing = await queryOne<{ id: number; tasa_usd_ves: string; fuente: string }>(
      `SELECT id, tasa_usd_ves::text, fuente FROM tasas_bcv WHERE fecha = $1`,
      [today]
    );

    const sources: Array<{ fn: () => Promise<BCVRateData | null>; name: string }> = [
      { fn: fetchFromBCVDirect, name: 'bcv-directo' },
      { fn: fetchFromPyDolarAPI, name: 'pydolar-bcv' },
      { fn: fetchFromDolarAPI, name: 'dolarapi' },
      { fn: fetchFromExchangeRateAPI, name: 'exchangerate-api' },
    ];

    if (existing) {
      const existingPriority = SOURCE_PRIORITY[existing.fuente] || 0;

      if (existingPriority >= 10) {
        console.log(`[bcv-rate] Tasa del día ya existe (fuente oficial): ${existing.tasa_usd_ves} Bs/$`);
        return NextResponse.json({
          updated: false,
          message: 'Tasa del día ya existe (fuente oficial BCV)',
          tasa: existing,
        });
      }

      for (const source of sources) {
        const newPriority = SOURCE_PRIORITY[source.name] || 0;
        if (newPriority <= existingPriority) continue;

        const rateData = await source.fn();
        if (rateData && rateData.tasa_usd_ves > 0) {
          const [tasa] = await query(
            `UPDATE tasas_bcv SET tasa_usd_ves = $1, tasa_eur_ves = $2, fuente = $3
             WHERE fecha = $4
             RETURNING id, fecha, tasa_usd_ves::text, tasa_eur_ves::text, fuente`,
            [rateData.tasa_usd_ves, rateData.tasa_eur_ves, source.name, today]
          );
          console.log(`[bcv-rate] Tasa actualizada de ${existing.fuente} → ${source.name}: ${rateData.tasa_usd_ves} Bs/$`);
          return NextResponse.json({ updated: true, fuente: source.name, tasa, upgraded: true });
        }
      }

      console.log(`[bcv-rate] Tasa del día ya existe: ${existing.tasa_usd_ves} Bs/$`);
      return NextResponse.json({
        updated: false,
        message: 'Tasa del día ya existe',
        tasa: existing,
      });
    }

    let rateData: BCVRateData | null = null;
    let fuente = '';

    for (const source of sources) {
      rateData = await source.fn();
      if (rateData) {
        fuente = source.name;
        break;
      }
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

    return NextResponse.json({ updated: true, fuente, tasa });
  } catch (err) {
    console.error('[tasas-bcv/auto-fetch] error:', err);
    return NextResponse.json({ error: 'Error al actualizar tasa BCV' }, { status: 500 });
  }
}
