async function getCredentials() {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    return {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
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
    throw new Error('Twilio not connected: X-Replit-Token not found');
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

  const s = connData.settings;
  if (!s.account_sid) {
    throw new Error('Twilio not connected: missing account_sid');
  }

  const authToken = s.api_key_secret || s.auth_token || s.api_key;
  if (!authToken) {
    throw new Error('Twilio not connected: missing auth credentials');
  }

  if (!s.phone_number) {
    throw new Error('Twilio not configured: missing phone_number. Set TWILIO_PHONE_NUMBER or configure it in the Twilio connector.');
  }

  return {
    accountSid: s.account_sid,
    authToken,
    phoneNumber: s.phone_number,
  };
}

export async function getTwilioClient() {
  const { accountSid, authToken } = await getCredentials();
  const twilio = (await import('twilio')).default;
  return twilio(accountSid, authToken);
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
