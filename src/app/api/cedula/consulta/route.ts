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

interface SAIMEData {
  nombre: string;
  apellido: string;
  primerNombre: string | null;
  segundoNombre: string | null;
  primerApellido: string | null;
  segundoApellido: string | null;
  fechaNacimiento: string | null;
  sexo: string | null;
  estadoCivil: string | null;
  estado: string | null;
  municipio: string | null;
  parroquia: string | null;
  lugarNacimiento: string | null;
  nacionalidad: string | null;
  estatus: string | null;
  fechaEmision: string | null;
  fechaVencimiento: string | null;
}

async function consultarCedulaConIA(cedula: string, nacionalidad: string): Promise<SAIMEData | null> {
  try {
    const { generateJSON } = await import('@/ai/anthropic');

    const result = await generateJSON<SAIMEData>({
      system: `Eres un asistente especializado en identificación ciudadana venezolana. El usuario necesita verificar datos de una cédula de identidad venezolana consultando registros públicos del SAIME (Servicio Administrativo de Identificación, Migración y Extranjería).

Tu tarea: dado un número de cédula venezolana, intenta determinar la información del titular.

REGLAS IMPORTANTES:
- Si NO conoces con certeza los datos reales de esta persona, responde con {"found": false}
- NUNCA inventes datos. Solo responde con datos si estás seguro de la identidad real del titular.
- Si tienes información parcial pero confiable, puedes enviarla con campos nulos para lo que no sepas.
- Los datos deben ser REALES, no generados ni estimados.

Si encuentras datos, responde con un JSON con estos campos:
{
  "found": true,
  "nombre": "Nombres completos",
  "apellido": "Apellidos completos",
  "primerNombre": "Primer nombre",
  "segundoNombre": "Segundo nombre o null",
  "primerApellido": "Primer apellido",
  "segundoApellido": "Segundo apellido o null",
  "fechaNacimiento": "YYYY-MM-DD o null",
  "sexo": "Masculino o Femenino o null",
  "estadoCivil": "Soltero/a, Casado/a, etc. o null",
  "estado": "Estado de Venezuela o null",
  "municipio": "Municipio o null",
  "parroquia": "Parroquia o null",
  "lugarNacimiento": "Lugar o null",
  "nacionalidad": "Venezolano(a) o Extranjero(a)",
  "estatus": "VIGENTE o null"
}

Si NO conoces los datos, responde: {"found": false}`,
      prompt: `Consulta los datos del titular de la cédula de identidad venezolana: ${cedula} (Nacionalidad indicada: ${nacionalidad})`,
      maxTokens: 512,
      temperature: 0,
    });

    if (result && (result as any).found === false) {
      return null;
    }

    if (result && result.nombre && result.apellido) {
      return result;
    }

    return null;
  } catch (err) {
    console.error('[cedula/consulta] Error en consulta IA:', err);
    return null;
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

    const iaResult = await consultarCedulaConIA(
      cedula,
      validacion.nacionalidad || 'Venezolano(a)'
    );

    if (iaResult) {
      try {
        const nac = cedula.split('-')[0] || 'V';
        await query(
          `INSERT INTO saime_registros (
            cedula, nacionalidad, primer_nombre, segundo_nombre,
            primer_apellido, segundo_apellido, fecha_nacimiento,
            sexo, estado_civil, estado, municipio, parroquia,
            lugar_nacimiento, estatus, source
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'ia')
          ON CONFLICT (cedula) DO UPDATE SET
            primer_nombre = EXCLUDED.primer_nombre,
            segundo_nombre = EXCLUDED.segundo_nombre,
            primer_apellido = EXCLUDED.primer_apellido,
            segundo_apellido = EXCLUDED.segundo_apellido,
            source = 'ia'`,
          [
            cedula,
            nac,
            iaResult.primerNombre || iaResult.nombre?.split(' ')[0] || '',
            iaResult.segundoNombre || iaResult.nombre?.split(' ').slice(1).join(' ') || null,
            iaResult.primerApellido || iaResult.apellido?.split(' ')[0] || '',
            iaResult.segundoApellido || iaResult.apellido?.split(' ').slice(1).join(' ') || null,
            iaResult.fechaNacimiento || null,
            iaResult.sexo === 'Masculino' ? 'M' : iaResult.sexo === 'Femenino' ? 'F' : null,
            iaResult.estadoCivil || null,
            iaResult.estado || null,
            iaResult.municipio || null,
            iaResult.parroquia || null,
            iaResult.lugarNacimiento || null,
            iaResult.estatus || 'VIGENTE',
          ]
        );
      } catch (cacheErr) {
        console.error('[cedula/consulta] Error caching IA result:', cacheErr);
      }

      return NextResponse.json({
        found: true,
        source: 'ia',
        validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
        data: iaResult,
      });
    }

    return NextResponse.json({
      found: false,
      source: 'none',
      validacion: { formatoValido: true, nacionalidad: validacion.nacionalidad },
      message: 'No se encontraron datos para esta cédula. Ingresa tus datos manualmente.',
    });
  } catch (error) {
    console.error('Error en consulta cédula:', error);
    return NextResponse.json(
      { error: 'Error al consultar la cédula' },
      { status: 500 }
    );
  }
}
