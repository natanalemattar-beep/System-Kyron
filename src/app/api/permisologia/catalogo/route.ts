import { NextRequest, NextResponse } from 'next/server';
import { organismos, tiposPermiso, type Organismo, type PermisoTipo } from '@/lib/permisologia-data';

export const dynamic = 'force-dynamic';

function getOrganismoTipo(org: Organismo): string {
  if (org.tipo === 'seniat') return 'seniat';
  if (org.tipo === 'ministerio') return 'ministerio';
  if (org.tipo === 'gobernacion') return 'gobernacion';
  if (org.tipo === 'alcaldia') return 'alcaldia';
  if (org.tipo === 'ente_autonomo' || org.tipo === 'instituto') return 'regulador';
  return 'otro';
}

export type CatalogoItem = {
  org: Organismo;
  permiso: PermisoTipo;
  tipoOrg: string;
};

export type CatalogoResponse = {
  items: CatalogoItem[];
  total: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tipoOrg = searchParams.get('tipoOrg') || 'todos';
  const organismo = searchParams.get('organismo') || 'todos';
  const sector = searchParams.get('sector') || 'todos';
  const q = searchParams.get('q') || '';
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

  const items: CatalogoItem[] = [];

  for (const org of organismos) {
    const t = getOrganismoTipo(org);
    if (tipoOrg !== 'todos' && t !== tipoOrg) continue;

    for (const p of tiposPermiso) {
      if (p.organismoId !== org.id) continue;
      if (organismo !== 'todos' && org.id !== organismo) continue;
      if (sector !== 'todos' && !p.aplica.includes(sector as any) && !p.aplica.includes('todos')) continue;
      if (q) {
        const lq = q.toLowerCase();
        if (!p.nombre.toLowerCase().includes(lq) && !p.descripcion.toLowerCase().includes(lq) && !org.nombre.toLowerCase().includes(lq)) continue;
      }
      items.push({ org, permiso: p, tipoOrg: t });
    }
  }

  const total = items.length;
  const paginated = items.slice(offset, offset + limit);

  return NextResponse.json<CatalogoResponse>({ items: paginated, total });
}
