// Server-only: sends form data to the Google Apps Script web app,
// which saves it to a Google Sheet and sends the emails.
export type WebhookResult = { ok?: boolean; error?: string; mailed?: boolean; duplicate?: boolean };

export async function postToWebhook(payload: Record<string, unknown>): Promise<WebhookResult> {
  const url = process.env.WEBHOOK_URL;
  const secret = process.env.WEBHOOK_SECRET;
  if (!url || !secret) {
    throw new Error("Form backend is not configured (WEBHOOK_URL / WEBHOOK_SECRET missing)");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, secret }),
    redirect: "follow",
  });
  const json = (await res.json().catch(() => null)) as WebhookResult | null;
  if (!res.ok || !json?.ok) {
    throw new Error(`Webhook failed: ${res.status} ${json?.error ?? ""}`);
  }
  return json;
}
