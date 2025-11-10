const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.N8N_WEBHOOK_URL : undefined);

type ForwardResult = { ok: true } | { ok: false; error: string };

export async function sendToN8n(payload: Record<string, unknown>): Promise<ForwardResult> {
  if (!WEBHOOK_URL) {
    const error = 'N8N webhook URL missing. Set N8N_WEBHOOK_URL in your environment.';
    console.error(error);
    return { ok: false, error };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = `n8n webhook error: ${response.status} ${errorText}`;
      console.error(error);
      return { ok: false, error };
    }

    return { ok: true };
  } catch (error) {
    console.error('Failed to reach n8n webhook:', error);
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown n8n error' };
  }
}
