import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validarRIF, normalizarRIF } from '@/lib/validacion-venezuela';

export const dynamic = 'force-dynamic';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta en un minuto.' },
      { status: 429 }
    );
  }

  const rawRif = req.nextUrl.searchParams.get('rif')?.trim().toUpperCase();

  if (!rawRif) {
    return NextResponse.json(
      { error: 'RIF requerido' },
      { status: 400 }
    );
  }

  const validacion = validarRIF(rawRif);

  if (!validacion.valid) {
    return NextResponse.json({
      error: validacion.error,
      valid: false,
      tipo: validacion.tipo || null,
      digitoVerificadorCorrecto: validacion.digitoVerificador ?? null,
    }, { status: 400 });
  }

  const rif = normalizarRIF(rawRif);

  try {
    const users = await query(
      `SELECT razon_social, tipo_empresa, actividad_economica, estado_empresa, municipio_empresa, direccion, telefono
       FROM users 
       WHERE rif = $1 AND tipo = 'juridico'
       LIMIT 1`,
      [rif]
    );

    if (users.length > 0) {
      const row = users[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'kyron_db',
        validacion: {
          formatoValido: true,
          digitoVerificadorValido: true,
          tipo: validacion.tipo,
          rifNormalizado: validacion.rifNormalizado,
        },
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.tipo_empresa,
          actividadEconomica: row.actividad_economica,
          estado: row.estado_empresa,
          municipio: row.municipio_empresa,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    const clientes = await query(
      `SELECT razon_social, tipo, direccion, estado, municipio, telefono, email
       FROM clientes 
       WHERE rif = $1
       LIMIT 1`,
      [rif]
    );

    if (clientes.length > 0) {
      const row = clientes[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'clientes_db',
        validacion: {
          formatoValido: true,
          digitoVerificadorValido: true,
          tipo: validacion.tipo,
          rifNormalizado: validacion.rifNormalizado,
        },
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.tipo,
          estado: row.estado,
          municipio: row.municipio,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    const proveedores = await query(
      `SELECT razon_social, categoria, direccion, estado, municipio, telefono
       FROM proveedores 
       WHERE rif = $1
       LIMIT 1`,
      [rif]
    );

    if (proveedores.length > 0) {
      const row = proveedores[0] as Record<string, string>;
      return NextResponse.json({
        found: true,
        source: 'proveedores_db',
        validacion: {
          formatoValido: true,
          digitoVerificadorValido: true,
          tipo: validacion.tipo,
          rifNormalizado: validacion.rifNormalizado,
        },
        data: {
          razonSocial: row.razon_social,
          tipoEmpresa: row.categoria,
          estado: row.estado,
          municipio: row.municipio,
          direccion: row.direccion,
          telefono: row.telefono,
        },
      });
    }

    return NextResponse.json({
      found: false,
      validacion: {
        formatoValido: true,
        digitoVerificadorValido: true,
        tipo: validacion.tipo,
        rifNormalizado: validacion.rifNormalizado,
      },
      message: 'RIF con formato y dígito verificador válidos. No se encontraron datos registrados en el sistema.',
      data: null,
    });
  } catch (error) {
    console.error('Error en consulta RIF:', error);
    return NextResponse.json(
      { error: 'Error al consultar el RIF' },
      { status: 500 }
    );
  }
}
