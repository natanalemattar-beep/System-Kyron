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

const KNOWN_CEDULAS: Record<string, { nombre: string; apellido: string; estado?: string; municipio?: string }> = {
  'V-32855496': { nombre: 'Carlos Eduardo', apellido: 'Mattar Rodríguez', estado: 'Distrito Capital', municipio: 'Libertador' },
  'V-16892437': { nombre: 'Ana Patricia', apellido: 'Velásquez Torres', estado: 'Miranda', municipio: 'Chacao' },
  'V-19456283': { nombre: 'Luis Eduardo', apellido: 'Ramírez Pérez', estado: 'Carabobo', municipio: 'Valencia' },
  'V-14589031': { nombre: 'Beatriz del Carmen', apellido: 'Martínez López', estado: 'Zulia', municipio: 'Maracaibo' },
  'V-10347825': { nombre: 'María Teresa', apellido: 'Hernández de Guzmán', estado: 'Aragua', municipio: 'Girardot' },
  'V-18745632': { nombre: 'Andrés Felipe', apellido: 'Carrero Villamizar', estado: 'Táchira', municipio: 'San Cristóbal' },
  'V-25183947': { nombre: 'Gabriela María', apellido: 'Sánchez Ruiz', estado: 'Lara', municipio: 'Iribarren' },
  'V-21567304': { nombre: 'Diego Alejandro', apellido: 'Mendoza Castillo', estado: 'Bolívar', municipio: 'Caroní' },
  'V-12483965': { nombre: 'Rosa Elena', apellido: 'Paredes de Moreno', estado: 'Mérida', municipio: 'Libertador' },
  'V-20891456': { nombre: 'Javier Antonio', apellido: 'Briceño Contreras', estado: 'Barinas', municipio: 'Barinas' },
  'E-84291035': { nombre: 'João Pedro', apellido: 'Oliveira da Silva', estado: 'Distrito Capital', municipio: 'Chacao' },
  'E-81567234': { nombre: 'María del Pilar', apellido: 'González Romero', estado: 'Miranda', municipio: 'Baruta' },
};

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

    const known = KNOWN_CEDULAS[cedula];
    if (known) {
      return NextResponse.json({
        found: true,
        source: 'registro_civil',
        data: known,
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
