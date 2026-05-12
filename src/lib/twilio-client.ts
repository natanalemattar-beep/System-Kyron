/**
 * SYSTEM KYRON — TWILIO CLIENT (Standard Migration)
 * Removed Replit Connector dependency.
 */

async function getCredentials() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    throw new Error('Twilio: Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN in environment.');
  }

  return {
    accountSid,
    authToken,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || '',
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
    const creds = await getCredentials();

    const msgOpts: any = { body, to };

    if (creds.messagingServiceSid) {
      msgOpts.messagingServiceSid = creds.messagingServiceSid;
    } else if (creds.phoneNumber) {
      msgOpts.from = creds.phoneNumber;
    } else {
      return { success: false, error: 'No Twilio phone number or Messaging Service configured' };
    }

    const message = await client.messages.create(msgOpts);

    return { success: true, sid: message.sid };
  } catch (err) {
    console.error('[twilio] SMS send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
