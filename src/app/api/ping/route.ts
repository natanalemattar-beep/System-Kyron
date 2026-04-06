export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function HEAD() {
  return new Response(null, { status: 200 });
}

export async function GET() {
  return Response.json({ ok: true });
}
