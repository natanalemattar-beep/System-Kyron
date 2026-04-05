import { google } from 'googleapis';

let connectionSettings: any;
let _tokenFetchPromise: Promise<string> | null = null;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token
      || connectionSettings.settings?.oauth?.credentials?.access_token;
  }

  if (_tokenFetchPromise) return _tokenFetchPromise;

  _tokenFetchPromise = _fetchAccessToken();
  try {
    return await _tokenFetchPromise;
  } finally {
    _tokenFetchPromise = null;
  }
}

async function _fetchAccessToken(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('Gmail: X-Replit-Token not found');
  }

  if (!hostname) {
    throw new Error('Gmail: REPLIT_CONNECTORS_HOSTNAME not set');
  }

  const res = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`[gmail-client] Connector API returned ${res.status}: ${body.substring(0, 300)}`);
    throw new Error(`Gmail connector API error: ${res.status}`);
  }

  const data = await res.json();
  connectionSettings = data.items?.[0];

  const accessToken = connectionSettings?.settings?.access_token
    || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }

  if (!connectionSettings.settings.expires_at && connectionSettings.settings?.oauth?.credentials?.expires_at) {
    connectionSettings.settings.expires_at = connectionSettings.settings.oauth.credentials.expires_at;
  }
  if (!connectionSettings.settings.access_token && accessToken) {
    connectionSettings.settings.access_token = accessToken;
  }

  return accessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function getGmailSenderAddress(): Promise<string> {
  try {
    if (process.env.GMAIL_USER) return process.env.GMAIL_USER;
    await getAccessToken();
    const email = connectionSettings?.settings?.email || connectionSettings?.metadata?.email;
    if (email) return email;

    const gmail = await getUncachableGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.emailAddress || 'noreplysystemkyron@gmail.com';
  } catch {
    return 'noreplysystemkyron@gmail.com';  
  }
}
