import { Client } from '@microsoft/microsoft-graph-client';

/**
 * SYSTEM KYRON — OUTLOOK CLIENT (Standard Migration)
 * Removed Replit Connector dependency.
 * To use Outlook, configure OUTLOOK_ACCESS_TOKEN in your environment.
 */

async function getAccessToken() {
  const token = process.env.OUTLOOK_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Outlook: OUTLOOK_ACCESS_TOKEN not configured in environment.');
  }
  return token;
}

export async function getUncachableOutlookClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken,
    },
  });
}
