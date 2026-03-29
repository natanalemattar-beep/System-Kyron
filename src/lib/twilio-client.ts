let cachedSettings: { account_sid: string; api_key: string; api_key_secret: string; phone_number: string } | null = null;

async function getCredentials() {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    return {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      apiKey: process.env.TWILIO_AUTH_TOKEN,
      apiKeySecret: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    };
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X-Replit-Token not found for repl/depl');
  }

  const connData = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=twilio',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connData || !connData.settings) {
    throw new Error('Twilio not connected');
  }

  cachedSettings = connData.settings;

  const s = connData.settings;
  if (!s.account_sid || !s.api_key || !s.api_key_secret) {
    throw new Error('Twilio not connected: missing credentials');
  }

  return {
    accountSid: s.account_sid,
    apiKey: s.api_key,
    apiKeySecret: s.api_key_secret,
    phoneNumber: s.phone_number || '',
  };
}

export async function getTwilioClient() {
  const { accountSid, apiKey, apiKeySecret } = await getCredentials();
  const twilio = (await import('twilio')).default;
  return twilio(apiKey, apiKeySecret, { accountSid });
}

export async function getTwilioFromPhoneNumber() {
  const { phoneNumber } = await getCredentials();
  return phoneNumber;
}

export async function sendSms(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const client = await getTwilioClient();
    const from = await getTwilioFromPhoneNumber();

    const message = await client.messages.create({
      body,
      from,
      to,
    });

    return { success: true, sid: message.sid };
  } catch (err) {
    console.error('[twilio] SMS send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
