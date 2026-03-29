import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { tiposPermiso, getOrganismoById, generarCartaSolicitud } from '@/lib/permisologia-data';
import { companyData } from '@/lib/permisos-data';
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

  const carta = generarCartaSolicitud(permiso, companyData, tipoCarta);

  await logActivity({
    userId: session.userId,
    evento: 'CARTA_PERMISOLOGIA',
    categoria: 'legal',
    descripcion: `Carta de ${tipoCarta} generada: ${permiso.nombre} — ${getOrganismoById(permiso.organismoId)?.nombre}`,
    entidadTipo: 'permiso_legal',
  });

  return NextResponse.json({ carta, permiso: permiso.nombre, organismo: getOrganismoById(permiso.organismoId)?.nombre });
}
