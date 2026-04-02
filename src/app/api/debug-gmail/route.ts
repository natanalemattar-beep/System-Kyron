import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const connector = searchParams.get('connector') || 'google-mail';

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const replIdentity = process.env.REPL_IDENTITY;
  const webReplRenewal = process.env.WEB_REPL_RENEWAL;

  const xReplitToken = replIdentity
    ? 'repl ' + replIdentity
    : webReplRenewal
    ? 'depl ' + webReplRenewal
    : null;

  const info: Record<string, unknown> = {
    hasReplIdentity: !!replIdentity,
    hasWebReplRenewal: !!webReplRenewal,
  };

  if (!xReplitToken || !hostname) {
    return NextResponse.json({ ...info, error: 'Missing env vars' });
  }

  try {
    const url = 'https://' + hostname + '/api/v2/connection?include_secrets=true';
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    });

    info.connectorStatus = res.status;

    if (!res.ok) {
      info.error = 'Connector API error';
      return NextResponse.json(info);
    }

    const data = await res.json();
    const conn = data.items?.find((item: any) => item.connector_name === connector);
    info.totalConnections = data.items?.length ?? 0;
    info.connectionFound = !!conn;
    info.connectionStatus = conn?.status;
    info.hasAccessToken = !!conn?.settings?.access_token;
    info.hasOAuthToken = !!conn?.settings?.oauth?.credentials?.access_token;
    info.expiresAt = conn?.settings?.expires_at || conn?.settings?.oauth?.credentials?.expires_at;

    if (connector === 'outlook' && (conn?.settings?.access_token || conn?.settings?.oauth?.credentials?.access_token)) {
      info.outlookWorking = true;
    }

    return NextResponse.json(info);
  } catch (err) {
    info.error = 'Fetch failed';
    return NextResponse.json(info);
  }
}
