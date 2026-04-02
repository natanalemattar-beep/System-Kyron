import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
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
    hostname: hostname ? `${hostname.substring(0, 20)}...` : 'NOT SET',
    hasReplIdentity: !!replIdentity,
    replIdentityLength: replIdentity?.length ?? 0,
    hasWebReplRenewal: !!webReplRenewal,
    tokenPrefix: xReplitToken ? xReplitToken.substring(0, 10) + '...' : 'NONE',
  };

  if (!xReplitToken || !hostname) {
    return NextResponse.json({ ...info, error: 'Missing env vars' });
  }

  try {
    const url = 'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=' + connector;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    });

    info.connectorStatus = res.status;
    info.connectorStatusText = res.statusText;

    if (!res.ok) {
      const body = await res.text();
      info.connectorErrorBody = body.substring(0, 300);
      return NextResponse.json(info);
    }

    const data = await res.json();
    const conn = data.items?.[0];
    info.connectionFound = !!conn;
    info.connectionStatus = conn?.status;
    info.hasAccessToken = !!conn?.settings?.access_token;
    info.hasOAuthToken = !!conn?.settings?.oauth?.credentials?.access_token;
    info.expiresAt = conn?.settings?.expires_at;
    info.settingsKeys = conn?.settings ? Object.keys(conn.settings) : [];

    if (conn?.settings?.access_token) {
      const { google } = await import('googleapis');
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: conn.settings.access_token });
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      try {
        const profile = await gmail.users.getProfile({ userId: 'me' });
        info.gmailEmail = profile.data.emailAddress;
        info.gmailWorking = true;
      } catch (gmailErr) {
        info.gmailWorking = false;
        info.gmailError = String(gmailErr).substring(0, 200);
      }
    }

    return NextResponse.json(info);
  } catch (err) {
    info.fetchError = String(err).substring(0, 200);
    return NextResponse.json(info);
  }
}
