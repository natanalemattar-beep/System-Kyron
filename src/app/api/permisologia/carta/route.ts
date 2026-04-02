import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { tiposPermiso, getOrganismoById, generarCartaSolicitud, EmpresaCarta } from '@/lib/permisologia-data';
import { queryOne, query } from '@/lib/db';
import { logActivity } from '@/lib/activity-logger';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const body = await req.json();
  const { tipoPermisoId, tipoCarta } = body;

  if (!tipoPermisoId || !tipoCarta) {
    return NextResponse.json({ error: 'tipoPermisoId y tipoCarta son requeridos' }, { status: 400 });
  }

  const permiso = tiposPermiso.find(p => p.id === tipoPermisoId);
  if (!permiso) {
    return NextResponse.json({ error: 'Tipo de permiso no encontrado' }, { status: 404 });
  }

  const user = await queryOne<{
    razon_social: string | null;
    rif: string | null;
    direccion: string | null;
    telefono: string | null;
    nombre: string | null;
    apellido: string | null;
    cedula: string | null;
    rep_nombre: string | null;
    rep_cedula: string | null;
    rep_cargo: string | null;
    estado_empresa: string | null;
    municipio_empresa: string | null;
    actividad_economica: string | null;
  }>(
    `SELECT razon_social, rif, direccion, telefono, nombre, apellido, cedula,
            rep_nombre, rep_cedula, rep_cargo, estado_empresa, municipio_empresa, actividad_economica
     FROM users WHERE id = $1`,
    [session.userId]
  );

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const socio = await queryOne<{ nombre: string; cedula_rif: string | null; cargo: string | null }>(
    `SELECT nombre, cedula_rif, cargo FROM socios WHERE user_id = $1 ORDER BY porcentaje_participacion DESC, id ASC LIMIT 1`,
    [session.userId]
  );

  const repNombre = user.rep_nombre || socio?.nombre || `${user.nombre || ''} ${user.apellido || ''}`.trim() || 'REPRESENTANTE LEGAL';
  const repCedula = user.rep_cedula || socio?.cedula_rif || user.cedula || 'V-00.000.000';
  const repCargo = user.rep_cargo || socio?.cargo || 'Representante Legal';

  let direccionCompleta = user.direccion || '';
  if (user.municipio_empresa && !direccionCompleta.includes(user.municipio_empresa)) {
    direccionCompleta += direccionCompleta ? `, ${user.municipio_empresa}` : user.municipio_empresa;
  }
  if (user.estado_empresa && !direccionCompleta.includes(user.estado_empresa)) {
    direccionCompleta += direccionCompleta ? `, Estado ${user.estado_empresa}` : `Estado ${user.estado_empresa}`;
  }

  const empresaData: EmpresaCarta = {
    denominacion: user.razon_social || `${user.nombre || ''} ${user.apellido || ''}`.trim() || 'Mi Empresa',
    rif: user.rif || 'Sin RIF registrado',
    direccion: direccionCompleta || 'Dirección no registrada',
    telefono: user.telefono || undefined,
    representante: {
      nombre: repNombre,
      cedula: repCedula,
      cargo: repCargo,
    },
    objetoSocial: user.actividad_economica || undefined,
  };

  const carta = generarCartaSolicitud(permiso, empresaData, tipoCarta);

  await logActivity({
    userId: session.userId,
    evento: 'CARTA_PERMISOLOGIA',
    categoria: 'legal',
    descripcion: `Carta de ${tipoCarta} generada: ${permiso.nombre} — ${getOrganismoById(permiso.organismoId)?.nombre}`,
    entidadTipo: 'permiso_legal',
  });

  return NextResponse.json({ carta, permiso: permiso.nombre, organismo: getOrganismoById(permiso.organismoId)?.nombre });
}
