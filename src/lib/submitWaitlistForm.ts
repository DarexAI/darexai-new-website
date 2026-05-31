export interface WaitlistFormPayload {
  name: string;
  email: string;
  phone: string;
}

export interface WaitlistFormResult {
  ok: boolean;
  message: string;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function submitWaitlistForm(
  payload: WaitlistFormPayload
): Promise<WaitlistFormResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      message:
        'Waitlist form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY in Vercel (see .env.example).',
    };
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Real Estate AI Employee Waitlist Sign-up — ${payload.name}`,
      from_name: 'Darex AI Waitlist',
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: `Lead has joined the waitlist for the AI Employee for Real Estate. Phone number: ${payload.phone}`,
      replyto: payload.email,
    }),
  });

  const data = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !data.success) {
    return {
      ok: false,
      message: data.message ?? 'Something went wrong. Please email hello@darexai.com directly.',
    };
  }

  return {
    ok: true,
    message: 'Thank you! You have been successfully added to the waitlist. We will reach out shortly.',
  };
}
