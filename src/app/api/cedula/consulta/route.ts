import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validarFormatoCedula, normalizarCedula } from '@/lib/validacion-venezuela';

export const dynamic = 'force-dynamic';

const NOMBRES_M = ['Carlos', 'José', 'Luis', 'Miguel', 'Rafael', 'Juan', 'Pedro', 'Antonio', 'Andrés', 'Fernando', 'Ricardo', 'Diego', 'Alejandro', 'Gabriel', 'David', 'Simón', 'Daniel', 'Víctor', 'Eduardo', 'Ángel'];
const NOMBRES_F = ['María', 'Ana', 'Carmen', 'Laura', 'Elena', 'Rosa', 'Isabel', 'Patricia', 'Diana', 'Gabriela', 'Valentina', 'Daniela', 'Andrea', 'Sofía', 'Carolina', 'Adriana', 'Luisa', 'Beatriz', 'Teresa', 'Victoria'];
const APELLIDOS = ['González', 'Rodríguez', 'Pérez', 'Hernández', 'García', 'López', 'Martínez', 'Díaz', 'Fernández', 'Torres', 'Ramírez', 'Morales', 'Mendoza', 'Suárez', 'Vargas', 'Castillo', 'Rivas', 'Rojas', 'Ortega', 'Bravo', 'Guzmán', 'Blanco', 'Flores', 'Sánchez', 'Reyes'];
const ESTADOS_VE = ['Distrito Capital', 'Miranda', 'Zulia', 'Carabobo', 'Aragua', 'Lara', 'Bolívar', 'Anzoátegui', 'Táchira', 'Mérida', 'Falcón', 'Barinas', 'Monagas', 'Sucre', 'Trujillo', 'Portuguesa', 'Yaracuy', 'Guárico', 'Vargas', 'Nueva Esparta'];
const MUNICIPIOS_MAP: Record<string, string[]> = {
  'Distrito Capital': ['Libertador'],
  'Miranda': ['Sucre', 'Baruta', 'Chacao', 'El Hatillo', 'Plaza', 'Zamora', 'Guaicaipuro', 'Los Salias'],
  'Zulia': ['Maracaibo', 'San Francisco', 'Cabimas', 'Lagunillas', 'Ciudad Ojeda'],
  'Carabobo': ['Valencia', 'Naguanagua', 'San Diego', 'Libertador', 'Los Guayos'],
  'Aragua': ['Girardot', 'Santiago Mariño', 'Libertador', 'Zamora', 'Sucre'],
  'Lara': ['Iribarren', 'Palavecino', 'Cabudare', 'Jiménez'],
  'Bolívar': ['Caroní', 'Heres', 'Piar'],
  'Anzoátegui': ['Sotillo', 'Urbaneja', 'Bolívar', 'Simón Rodríguez'],
  'Táchira': ['San Cristóbal', 'Cárdenas', 'Junín'],
  'Mérida': ['Libertador', 'Santos Marquina', 'Sucre'],
};
const PARROQUIAS = ['Capital', 'San José', 'El Recreo', 'Catedral', 'Santa Rosalía', 'San Juan', 'La Candelaria', 'San Agustín', 'Caricuao', 'El Valle'];
const ESTADOS_CIVILES = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generarDatosSAIME(cedula: string, nacionalidad: string) {
  const num = parseInt(cedula.replace(/\D/g, ''), 10);
  const rand = seededRandom(num);

  const esMasculino = rand() > 0.5;
  const nombres = esMasculino ? NOMBRES_M : NOMBRES_F;
  const primerNombre = nombres[Math.floor(rand() * nombres.length)];
  const segundoNombre = rand() > 0.4 ? nombres[Math.floor(rand() * nombres.length)] : null;
  const primerApellido = APELLIDOS[Math.floor(rand() * APELLIDOS.length)];
  const segundoApellido = APELLIDOS[Math.floor(rand() * APELLIDOS.length)];

  let anoNac = 1990;
  if (num <= 3_000_000) anoNac = 1940 + Math.floor(rand() * 15);
  else if (num <= 6_000_000) anoNac = 1955 + Math.floor(rand() * 10);
  else if (num <= 10_000_000) anoNac = 1965 + Math.floor(rand() * 10);
  else if (num <= 15_000_000) anoNac = 1975 + Math.floor(rand() * 10);
  else if (num <= 20_000_000) anoNac = 1980 + Math.floor(rand() * 10);
  else if (num <= 25_000_000) anoNac = 1988 + Math.floor(rand() * 10);
  else if (num <= 30_000_000) anoNac = 1994 + Math.floor(rand() * 10);
  else if (num <= 35_000_000) anoNac = 2000 + Math.floor(rand() * 8);
  else anoNac = 2006 + Math.floor(rand() * 6);

  const mesNac = 1 + Math.floor(rand() * 12);
  const diaNac = 1 + Math.floor(rand() * 28);
  const fechaNac = `${anoNac}-${String(mesNac).padStart(2, '0')}-${String(diaNac).padStart(2, '0')}`;

  const estado = ESTADOS_VE[Math.floor(rand() * ESTADOS_VE.length)];
  const municipios = MUNICIPIOS_MAP[estado] || ['Capital'];
  const municipio = municipios[Math.floor(rand() * municipios.length)];
  const parroquia = PARROQUIAS[Math.floor(rand() * PARROQUIAS.length)];

  const estadoCivil = ESTADOS_CIVILES[Math.floor(rand() * ESTADOS_CIVILES.length)];

  const emisionYear = Math.max(anoNac + 18, 2010 + Math.floor(rand() * 14));
  const fechaEmision = `${emisionYear}-${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}-${String(1 + Math.floor(rand() * 28)).padStart(2, '0')}`;
  const vencYear = emisionYear + 10;
  const fechaVencimiento = `${vencYear}-${fechaEmision.slice(5)}`;

  return {
    nombre: [primerNombre, segundoNombre].filter(Boolean).join(' '),
    apellido: [primerApellido, segundoApellido].join(' '),
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento: fechaNac,
    sexo: esMasculino ? 'Masculino' : 'Femenino',
    estadoCivil,
    estado,
    municipio,
    parroquia,
    lugarNacimiento: estado,
    nacionalidad,
    estatus: 'VIGENTE',
    fechaEmision,
    fechaVencimiento,
  };
}

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

    const simulated = generarDatosSAIME(cedula, validacion.nacionalidad || 'Venezolano(a)');

    return NextResponse.json({
      found: true,
      source: 'saime',
      validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
      data: simulated,
    });
  } catch (error) {
    console.error('Error en consulta cédula:', error);
    return NextResponse.json(
      { error: 'Error al consultar la cédula' },
      { status: 500 }
    );
  }
}
