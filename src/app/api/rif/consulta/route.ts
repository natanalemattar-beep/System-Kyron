import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

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

    return NextResponse.json({ found: false, data: null });
  } catch (error) {
    console.error('Error en consulta RIF:', error);
    return NextResponse.json(
      { error: 'Error al consultar el RIF' },
      { status: 500 }
    );
  }
}
