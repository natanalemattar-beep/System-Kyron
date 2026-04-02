import { google } from 'googleapis';

async function fetchConnectionSettings() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('Gmail: X-Replit-Token not available (no REPL_IDENTITY or WEB_REPL_RENEWAL)');
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
    throw new Error(`Gmail: connector API returned ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const connection = data.items?.[0];

  if (!connection) {
    throw new Error('Gmail: no google-mail connection found. Please connect Gmail in the Integrations panel.');
  }

  const accessToken =
    connection.settings?.access_token ||
    connection.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error('Gmail: connection found but no access_token available. The token may have expired — please reconnect Gmail.');
  }

  return { accessToken, email: connection.settings?.email || connection.metadata?.email };
}

export async function getUncachableGmailClient() {
  const { accessToken } = await fetchConnectionSettings();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function getGmailSenderAddress(): Promise<string> {
  try {
    const { email } = await fetchConnectionSettings();
    if (email) return email;

    const gmail = await getUncachableGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.emailAddress || 'noreplysystemkyron@gmail.com';
  } catch {
    return 'noreplysystemkyron@gmail.com';
  }
}
