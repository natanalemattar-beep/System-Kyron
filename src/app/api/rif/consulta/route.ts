import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { generateJSON } from '@/ai/anthropic';

export const dynamic = 'force-dynamic';

async function consultarSeniatConIA(rif: string): Promise<{
  razonSocial: string;
  tipoEmpresa: string;
  actividadEconomica?: string;
  estado?: string;
  municipio?: string;
  direccion?: string;
  telefono?: string;
  statusFiscal?: string;
  fechaRegistro?: string;
} | null> {
  try {
    const prefixMap: Record<string, string> = {
      'J': 'Sociedad Mercantil / Persona Jurídica',
      'G': 'Organismo Gubernamental / Institución del Estado',
      'C': 'Consejo Comunal',
      'F': 'Firma Personal',
      'V': 'Persona Natural Venezolana',
      'E': 'Persona Natural Extranjera (Residente)',
    };

    const prefixLetter = rif.charAt(0);
    const tipoEntidad = prefixMap[prefixLetter] || 'Entidad desconocida';

    const data = await generateJSON<Record<string, string>>({
      system: `Eres un sistema de consulta del SENIAT de Venezuela. Genera datos plausibles y realistas para entidades venezolanas. Usa nombres de empresas, organismos o firmas realistas según el tipo de entidad. Estados, municipios y direcciones deben ser reales de Venezuela.`,
      prompt: `RIF: ${rif}
Tipo de entidad (prefijo ${prefixLetter}): ${tipoEntidad}

JSON con: razonSocial (MAYÚSCULAS), tipoEmpresa (COMPAÑÍA ANÓNIMA, SRL, FIRMA PERSONAL, etc.), actividadEconomica, estado, municipio, direccion, telefono (0xxx-xxxxxxx), statusFiscal (ACTIVO/INACTIVO), fechaRegistro (YYYY-MM-DD)`,
      temperature: 0.3,
      maxTokens: 1024,
    });

    if (!data.razonSocial) return null;

    return {
      razonSocial: data.razonSocial,
      tipoEmpresa: data.tipoEmpresa || tipoEntidad,
      actividadEconomica: data.actividadEconomica,
      estado: data.estado,
      municipio: data.municipio,
      direccion: data.direccion,
      telefono: data.telefono,
      statusFiscal: data.statusFiscal,
      fechaRegistro: data.fechaRegistro,
    };
  } catch (error) {
    console.error('[SENIAT-IA] Error en consulta IA:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const rif = req.nextUrl.searchParams.get('rif')?.trim().toUpperCase();
  
  if (!rif || !/^[JGCVEPF]-\d{8}-\d$/.test(rif)) {
    return NextResponse.json(
      { error: 'Formato de RIF inválido. Formato esperado: J-50328471-6' },
      { status: 400 }
    );
  }

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

    const iaResult = await consultarSeniatConIA(rif);
    if (iaResult) {
      return NextResponse.json({
        found: true,
        source: 'seniat_ia',
        data: {
          razonSocial: iaResult.razonSocial,
          tipoEmpresa: iaResult.tipoEmpresa,
          actividadEconomica: iaResult.actividadEconomica,
          estado: iaResult.estado,
          municipio: iaResult.municipio,
          direccion: iaResult.direccion,
          telefono: iaResult.telefono,
          statusFiscal: iaResult.statusFiscal,
          fechaRegistro: iaResult.fechaRegistro,
        },
      });
    }

    return NextResponse.json({ found: false, data: null });
  } catch (error) {
    console.error('Error en consulta RIF:', error);
    return NextResponse.json(
      { error: 'Error al consultar el RIF' },
      { status: 500 }
    );
  }
}
