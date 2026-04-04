import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { queryOne, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const uid = session.userId;

    const [
      lineasTotal,
      lineasActivas,
      gastoMensual,
      consumoTotal,
      distribucionDepto,
      tendenciaMensual,
    ] = await Promise.all([
      queryOne<{ count: string; gasto: string }>(
        `SELECT COUNT(*)::text AS count,
                COALESCE(SUM(monto_plan), 0)::text AS gasto
         FROM lineas_telecom WHERE user_id = $1`,
        [uid]
      ).catch(() => null),
      queryOne<{ count: string }>(
        `SELECT COUNT(*)::text AS count FROM lineas_telecom WHERE user_id = $1 AND activa = true`,
        [uid]
      ).catch(() => null),
      queryOne<{ total: string }>(
        `SELECT COALESCE(SUM(monto_plan), 0)::text AS total
         FROM lineas_telecom
         WHERE user_id = $1 AND activa = true`,
        [uid]
      ).catch(() => null),
      queryOne<{ total_gb: string }>(
        `SELECT COALESCE(SUM(uso_datos_gb), 0)::text AS total_gb
         FROM lineas_telecom WHERE user_id = $1 AND activa = true`,
        [uid]
      ).catch(() => null),
      query<{ departamento: string; lineas: string; costo: string; consumo: string }>(
        `SELECT
           COALESCE(titular, 'Sin Asignar') AS departamento,
           COUNT(*)::text AS lineas,
           COALESCE(SUM(monto_plan), 0)::text AS costo,
           COALESCE(SUM(uso_datos_gb), 0)::text AS consumo
         FROM lineas_telecom
         WHERE user_id = $1 AND activa = true
         GROUP BY titular
         ORDER BY SUM(monto_plan) DESC
         LIMIT 6`,
        [uid]
      ).catch(() => []),
      query<{ mes: string; gasto: string; lineas: string }>(
        `SELECT
           TO_CHAR(gs.mes, 'Mon') AS mes,
           COALESCE(
             (SELECT SUM(lt.monto_plan)
              FROM lineas_telecom lt
              WHERE lt.user_id = $1
                AND (lt.fecha_activacion IS NULL OR lt.fecha_activacion <= (gs.mes + INTERVAL '1 month - 1 day')::date)
                AND (lt.fecha_vencimiento IS NULL OR lt.fecha_vencimiento >= gs.mes::date)
             ), 0
           )::text AS gasto,
           COALESCE(
             (SELECT COUNT(*)
              FROM lineas_telecom lt
              WHERE lt.user_id = $1
                AND (lt.fecha_activacion IS NULL OR lt.fecha_activacion <= (gs.mes + INTERVAL '1 month - 1 day')::date)
                AND (lt.fecha_vencimiento IS NULL OR lt.fecha_vencimiento >= gs.mes::date)
             ), 0
           )::text AS lineas
         FROM generate_series(
           date_trunc('month', CURRENT_DATE) - INTERVAL '5 months',
           date_trunc('month', CURRENT_DATE),
           '1 month'
         ) AS gs(mes)
         ORDER BY gs.mes ASC`,
        [uid]
      ).catch(() => []),
    ]);

    const totalLineas = parseInt(lineasTotal?.count ?? '0', 10);
    const activasCount = parseInt(lineasActivas?.count ?? '0', 10);
    const gastoNum = parseFloat(gastoMensual?.total ?? '0');
    const consumoNum = parseFloat(consumoTotal?.total_gb ?? '0');

    return NextResponse.json({
      lineas: {
        total: totalLineas,
        activas: activasCount,
        gasto_mensual: gastoNum,
        consumo_gb: consumoNum,
        promedio_por_linea: activasCount > 0 ? (consumoNum / activasCount) : 0,
      },
      distribucion: distribucionDepto.map((d, i) => ({
        depto: d.departamento,
        lineas: parseInt(d.lineas, 10),
        costo: parseFloat(d.costo),
        consumo: parseFloat(d.consumo),
        pct: activasCount > 0 ? Math.round((parseInt(d.lineas, 10) / activasCount) * 100) : 0,
        color: ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-violet-500', 'bg-cyan-500'][i % 6],
      })),
      tendencia: tendenciaMensual.map(m => ({
        mes: m.mes,
        costo: parseFloat(m.gasto),
        lineas: parseInt(m.lineas, 10),
      })),
    });
  } catch (err) {
    console.error('[telecom-dashboard] GET error:', err);
    return NextResponse.json({ error: 'Error al obtener datos del dashboard telecom' }, { status: 500 });
  }
}
