export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResult {
  ok: boolean;
  message: string;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<ContactFormResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      message:
        'Contact form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY in Vercel (see .env.example).',
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
      subject: `New lead — Darex AI website (${payload.name})`,
      from_name: 'Darex AI Website',
      name: payload.name,
      email: payload.email,
      message: payload.message,
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
    message: 'Thank you! Your message was sent. We will get back to you soon.',
  };
}
