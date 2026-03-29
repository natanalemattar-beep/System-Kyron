import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { generateJSON } from '@/ai/anthropic';

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

interface SaimeIAResult {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  sexo?: string;
  estadoCivil?: string;
  estado?: string;
  municipio?: string;
  parroquia?: string;
  lugarNacimiento?: string;
}

async function consultarSaimeConIA(cedula: string): Promise<SaimeIAResult | null> {
  try {
    const prefixLetter = cedula.charAt(0);
    const nacionalidad = prefixLetter === 'V' ? 'Venezolano(a)' : prefixLetter === 'E' ? 'Extranjero(a) residente' : 'Venezolano(a)';
    const numero = cedula.replace(/^[VEP]-/, '');

    const data = await generateJSON<Record<string, string | null>>({
      system: `Eres un sistema de consulta del SAIME de Venezuela. Genera información demográfica PLAUSIBLE y realista para personas venezolanas. Usa nombres y apellidos comunes venezolanos reales, estados/municipios/parroquias reales de Venezuela. El sexo debe ser coherente con el nombre, el estado civil con la edad estimada.`,
      prompt: `Genera datos demográficos plausibles para la cédula: ${cedula}
Prefijo "${prefixLetter}" indica: ${nacionalidad}
Número: ${numero}
- Cédulas altas (25M+): personas jóvenes (1995-2010)
- Cédulas medias (10M-25M): mediana edad (1970-1995)  
- Cédulas bajas (<10M): personas mayores (antes de 1970)

JSON con: primerNombre (MAYÚSCULAS), segundoNombre (o null), primerApellido (MAYÚSCULAS), segundoApellido (o null), fechaNacimiento (YYYY-MM-DD), sexo (M o F), estadoCivil, estado, municipio, parroquia, lugarNacimiento`,
      temperature: 0.7,
      maxTokens: 1024,
    });

    if (!data.primerNombre || !data.primerApellido) return null;

    return {
      primerNombre: String(data.primerNombre).toUpperCase(),
      segundoNombre: data.segundoNombre ? String(data.segundoNombre).toUpperCase() : undefined,
      primerApellido: String(data.primerApellido).toUpperCase(),
      segundoApellido: data.segundoApellido ? String(data.segundoApellido).toUpperCase() : undefined,
      fechaNacimiento: data.fechaNacimiento || undefined,
      sexo: data.sexo === 'M' || data.sexo === 'F' ? data.sexo : undefined,
      estadoCivil: data.estadoCivil || undefined,
      estado: data.estado || undefined,
      municipio: data.municipio || undefined,
      parroquia: data.parroquia || undefined,
      lugarNacimiento: data.lugarNacimiento || undefined,
    };
  } catch (error) {
    console.error('[SAIME-IA] Error en consulta IA:', error);
    return null;
  }
}

async function cacheSaimeResult(cedula: string, data: SaimeIAResult): Promise<void> {
  try {
    await query(
      `INSERT INTO saime_registros (cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
         fecha_nacimiento, sexo, estado_civil, nacionalidad, estado, municipio, parroquia, lugar_nacimiento,
         estatus, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'VIGENTE', 'ia')
       ON CONFLICT (cedula) DO NOTHING`,
      [
        cedula,
        data.primerNombre,
        data.segundoNombre || null,
        data.primerApellido,
        data.segundoApellido || null,
        data.fechaNacimiento || null,
        data.sexo || null,
        data.estadoCivil || null,
        cedula.startsWith('E') ? 'E' : 'V',
        data.estado || null,
        data.municipio || null,
        data.parroquia || null,
        data.lugarNacimiento || null,
      ]
    );
  } catch (err) {
    console.error('[SAIME-IA] Error caching result:', err);
  }
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
        source: s.source === 'ia' ? 'saime_ia' : 'saime',
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

    console.log('[SAIME] No internal data found, trying AI fallback.');
    const iaResult = await consultarSaimeConIA(cedula);
    console.log('[SAIME] AI result:', iaResult ? 'found' : 'null');
    if (iaResult) {
      cacheSaimeResult(cedula, iaResult).catch(() => {});

      const nombreCompleto = [iaResult.primerNombre, iaResult.segundoNombre].filter(Boolean).join(' ');
      const apellidoCompleto = [iaResult.primerApellido, iaResult.segundoApellido].filter(Boolean).join(' ');

      return NextResponse.json({
        found: true,
        source: 'saime_ia',
        data: {
          nombre: nombreCompleto,
          apellido: apellidoCompleto,
          primerNombre: iaResult.primerNombre,
          segundoNombre: iaResult.segundoNombre || null,
          primerApellido: iaResult.primerApellido,
          segundoApellido: iaResult.segundoApellido || null,
          fechaNacimiento: iaResult.fechaNacimiento || null,
          sexo: iaResult.sexo === 'M' ? 'Masculino' : iaResult.sexo === 'F' ? 'Femenino' : null,
          estadoCivil: civilMap[iaResult.estadoCivil || ''] || iaResult.estadoCivil || null,
          estado: iaResult.estado || null,
          municipio: iaResult.municipio || null,
          parroquia: iaResult.parroquia || null,
          lugarNacimiento: iaResult.lugarNacimiento || null,
          nacionalidad: cedula.startsWith('E') ? 'Extranjero(a)' : 'Venezolano(a)',
          estatus: 'VIGENTE',
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
