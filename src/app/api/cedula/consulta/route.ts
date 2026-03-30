import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validarFormatoCedula, normalizarCedula } from '@/lib/validacion-venezuela';

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

  const rawCedula = req.nextUrl.searchParams.get('cedula')?.trim().toUpperCase();

  if (!rawCedula) {
    return NextResponse.json(
      { error: 'Cédula requerida' },
      { status: 400 }
    );
  }

  const validacion = validarFormatoCedula(rawCedula);
  if (!validacion.valid) {
    return NextResponse.json(
      { error: validacion.error, valid: false },
      { status: 400 }
    );
  }

  const cedula = normalizarCedula(rawCedula);

  const civilMap: Record<string, string> = {
    'Soltero': 'Soltero/a', 'Soltera': 'Soltero/a',
    'Casado': 'Casado/a', 'Casada': 'Casado/a',
    'Divorciado': 'Divorciado/a', 'Divorciada': 'Divorciado/a',
    'Viudo': 'Viudo/a', 'Viuda': 'Viudo/a',
  };

  try {
    const users = await query(
      `SELECT nombre, apellido, estado_residencia, municipio, telefono
       FROM users
       WHERE cedula = $1
       LIMIT 1`,
      [cedula]
    );

    if (users.length > 0) {
      const row = users[0] as Record<string, string>;
      if (row.nombre) {
        return NextResponse.json({
          found: true,
          source: 'kyron_db',
          validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
          data: {
            nombre: row.nombre,
            apellido: row.apellido || '',
            estado: row.estado_residencia,
            municipio: row.municipio,
          },
        });
      }
    }

    const empleados = await query(
      `SELECT e.nombre, e.apellido, u.estado_residencia, u.municipio
       FROM empleados e
       LEFT JOIN users u ON e.user_id = u.id
       WHERE e.cedula = $1
       LIMIT 1`,
      [cedula]
    );

    if (empleados.length > 0) {
      const row = empleados[0] as Record<string, string>;
      if (row.nombre) {
        return NextResponse.json({
          found: true,
          source: 'empleados_db',
          validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
          data: {
            nombre: row.nombre,
            apellido: row.apellido || '',
            estado: row.estado_residencia,
            municipio: row.municipio,
          },
        });
      }
    }

    const saimeResult = await query(
      `SELECT primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
              fecha_nacimiento, sexo, estado_civil, estado, municipio, parroquia,
              lugar_nacimiento, estatus, fecha_emision, fecha_vencimiento, nacionalidad
       FROM saime_registros
       WHERE cedula = $1 AND estatus = 'VIGENTE' AND (source IS NULL OR source != 'ia')
       LIMIT 1`,
      [cedula]
    );

    if (saimeResult.length > 0) {
      const s = saimeResult[0] as Record<string, string>;
      const nombreCompleto = [s.primer_nombre, s.segundo_nombre].filter(Boolean).join(' ');
      const apellidoCompleto = [s.primer_apellido, s.segundo_apellido].filter(Boolean).join(' ');

      return NextResponse.json({
        found: true,
        source: 'saime',
        validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
        data: {
          nombre: nombreCompleto,
          apellido: apellidoCompleto,
          primerNombre: s.primer_nombre,
          segundoNombre: s.segundo_nombre || null,
          primerApellido: s.primer_apellido,
          segundoApellido: s.segundo_apellido || null,
          fechaNacimiento: s.fecha_nacimiento,
          sexo: s.sexo === 'M' ? 'Masculino' : s.sexo === 'F' ? 'Femenino' : null,
          estadoCivil: civilMap[s.estado_civil] || s.estado_civil,
          estado: s.estado,
          municipio: s.municipio,
          parroquia: s.parroquia,
          lugarNacimiento: s.lugar_nacimiento,
          nacionalidad: s.nacionalidad === 'V' ? 'Venezolano(a)' : 'Extranjero(a)',
          estatus: s.estatus,
          fechaEmision: s.fecha_emision,
          fechaVencimiento: s.fecha_vencimiento,
        },
      });
    }

    return NextResponse.json({
      found: false,
      validacion: {
        formatoValido: true,
        nacionalidad: validacion.nacionalidad,
        cedulaNormalizada: cedula,
      },
      message: 'Cédula con formato válido. No se encontraron datos registrados en el sistema.',
      data: null,
    });
  } catch (error) {
    console.error('Error en consulta cédula:', error);
    return NextResponse.json(
      { error: 'Error al consultar la cédula' },
      { status: 500 }
    );
  }
}
