import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

async function ensureTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS pitch_sessions (
      id SERIAL PRIMARY KEY,
      tipo TEXT NOT NULL DEFAULT 'pitch_ia',
      titulo TEXT,
      contenido TEXT,
      usuario_ip TEXT,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS document_records (
      id SERIAL PRIMARY KEY,
      tipo_documento TEXT NOT NULL,
      descripcion TEXT,
      generado_por TEXT DEFAULT 'IA Gemini',
      usuario_ip TEXT,
      metadata JSONB,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS page_events (
      id SERIAL PRIMARY KEY,
      evento TEXT NOT NULL,
      dato TEXT,
      usuario_ip TEXT,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function POST(req: Request) {
  try {
    await ensureTables();
    const body = await req.json().catch(() => ({}));
    const { evento, dato } = body as { evento: string; dato?: string };
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    if (!evento) return NextResponse.json({ error: 'evento requerido' }, { status: 400 });

    await query(
      `INSERT INTO page_events (evento, dato, usuario_ip) VALUES ($1, $2, $3)`,
      [evento, dato ?? null, ip]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[pitch-analytics POST]', err);
    return NextResponse.json({ error: 'Error registrando evento' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureTables();

    const [statsVisitas, statsPitchIA, statsPPTX, statsImpresiones, statsCopias, statsSecciones] =
      await Promise.all([
        query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_events WHERE evento = 'page_view'`),
        query<{ total: string }>(`SELECT COUNT(*) AS total FROM pitch_sessions`),
        query<{ total: string }>(`SELECT COUNT(*) AS total FROM document_records WHERE tipo_documento = 'PPTX_PRESENTACION'`),
        query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_events WHERE evento = 'imprimir'`),
        query<{ total: string }>(`SELECT COUNT(*) AS total FROM page_events WHERE evento = 'copiar_pitch'`),
        query<{ dato: string; total: string }>(`
          SELECT dato, COUNT(*) AS total FROM page_events
          WHERE evento = 'seccion_abierta' AND dato IS NOT NULL
          GROUP BY dato ORDER BY total DESC LIMIT 5
        `),
      ]);

    const stats = {
      visitas:      parseInt(statsVisitas[0]?.total  ?? '0'),
      pitchsIA:     parseInt(statsPitchIA[0]?.total  ?? '0'),
      pptxGenerados: parseInt(statsPPTX[0]?.total    ?? '0'),
      impresiones:  parseInt(statsImpresiones[0]?.total ?? '0'),
      copias:       parseInt(statsCopias[0]?.total   ?? '0'),
      seccionesTop: statsSecciones,
    };

    const actividad = await query<{
      id: number; tipo: string; titulo: string; dato: string | null; creado_en: string;
    }>(`
      SELECT id, 'pitch_ia' AS tipo, titulo, NULL AS dato, creado_en FROM pitch_sessions
      UNION ALL
      SELECT id, tipo_documento AS tipo, descripcion AS titulo, generado_por AS dato, creado_en FROM document_records
      UNION ALL
      SELECT id, evento AS tipo,
        CASE evento
          WHEN 'page_view'       THEN 'Visita a la página'
          WHEN 'imprimir'        THEN 'Impresión del guión'
          WHEN 'copiar_pitch'    THEN 'Copia del Pitch IA'
          WHEN 'seccion_abierta' THEN CONCAT('Sección abierta: ', COALESCE(dato, ''))
          ELSE evento
        END AS titulo,
        dato, creado_en
      FROM page_events
      ORDER BY creado_en DESC
      LIMIT 50
    `);

    return NextResponse.json({ stats, actividad });
  } catch (err) {
    console.error('[pitch-analytics GET]', err);
    return NextResponse.json({ error: 'Error obteniendo estadísticas' }, { status: 500 });
  }
}
