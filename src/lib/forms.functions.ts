import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { postToWebhook } from "./forms.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(150).default(""),
  service: z.string().trim().max(150).default(""),
  brief: z.string().trim().min(1).max(4000),
  website: z.string().max(200).optional(), // honeypot: real people leave this empty
  page: z.string().max(200).optional(), // which page the form was sent from
});

const subscribeSchema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().max(200).optional(), // honeypot
  page: z.string().max(200).optional(),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot: pretend success, do nothing
    try {
      const res = await postToWebhook({ type: "contact", ...data, website: undefined });
      if (res.mailed === false) console.warn("[contact] saved, but auto-reply failed. See the sheet's 'Auto-reply' column.");
    } catch (err) {
      console.error("[contact] failed:", err);
      throw new Error("Could not send your message. Please try again.");
    }
    return { ok: true };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator(subscribeSchema)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, duplicate: false };
    try {
      const res = await postToWebhook({ type: "subscribe", email: data.email, page: data.page });
      if (!res.duplicate && res.mailed === false) console.warn("[subscribe] saved, but welcome email failed. See the sheet's 'Welcome email' column.");
      return { ok: true, duplicate: Boolean(res.duplicate) };
    } catch (err) {
      console.error("[subscribe] failed:", err);
      throw new Error("Could not subscribe. Please try again.");
    }
  });
