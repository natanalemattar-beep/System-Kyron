import { Client } from '@microsoft/microsoft-graph-client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token
      || connectionSettings.settings?.oauth?.credentials?.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('Outlook: X-Replit-Token not found');
  }

  if (!hostname) {
    throw new Error('Outlook: REPLIT_CONNECTORS_HOSTNAME not set');
  }

  const res = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=outlook',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`[outlook-client] Connector API returned ${res.status}: ${body.substring(0, 300)}`);
    throw new Error(`Outlook connector API error: ${res.status}`);
  }

  const data = await res.json();
  connectionSettings = data.items?.[0];

  const accessToken = connectionSettings?.settings?.access_token
    || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Outlook not connected');
  }

  if (!connectionSettings.settings.expires_at && connectionSettings.settings?.oauth?.credentials?.expires_at) {
    connectionSettings.settings.expires_at = connectionSettings.settings.oauth.credentials.expires_at;
  }
  if (!connectionSettings.settings.access_token && accessToken) {
    connectionSettings.settings.access_token = accessToken;
  }

  return accessToken;
}

export async function getUncachableOutlookClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken,
    },
  });
}
