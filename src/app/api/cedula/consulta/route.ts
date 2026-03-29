import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

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

  const cedula = req.nextUrl.searchParams.get('cedula')?.trim().toUpperCase();

  if (!cedula || !/^[VEP]-\d{5,10}$/.test(cedula)) {
    return NextResponse.json(
      { error: 'Formato de cédula inválido. Formato esperado: V-18745632' },
      { status: 400 }
    );
  }

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
       WHERE cedula = $1 AND estatus = 'VIGENTE'
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
        data: {
          nombre: nombreCompleto,
          apellido: apellidoCompleto,
          primerNombre: s.primer_nombre,
          segundoNombre: s.segundo_nombre || null,
          primerApellido: s.primer_apellido,
          segundoApellido: s.segundo_apellido || null,
          fechaNacimiento: s.fecha_nacimiento,
          sexo: s.sexo === 'M' ? 'Masculino' : s.sexo === 'F' ? 'Femenino' : null,
          estadoCivil: s.estado_civil,
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

    return NextResponse.json({ found: false, data: null });
  } catch (error) {
    console.error('Error en consulta cédula:', error);
    return NextResponse.json(
      { error: 'Error al consultar la cédula' },
      { status: 500 }
    );
  }
}
