# Form backend setup

Contact-form inquiries and newsletter sign-ups are saved to a Google Sheet, and the
emails (auto-reply to the visitor, notification to you, welcome email to subscribers)
are sent from your Google account.

## 1. Create the sheet and script
1. Create a blank Google Sheet named "Readmi Website Data".
2. Extensions → Apps Script.
3. Replace everything with the contents of `backend/google-apps-script.gs`.
4. Edit the top three lines: `SECRET` (30+ random characters, same as WEBHOOK_SECRET),
   `OWNER_EMAIL` (your inbox), `BRAND` (leave as is). Save.

## 2. Turn on email (do this once)
1. In the Apps Script editor, pick `sendTestEmail` in the function dropdown and click ▶ Run.
2. Google asks for permission. Approve it, including **"Send email as you"**.
   If you see "unverified app": Advanced → Go to project (it's your own script).
3. You should get a test email at OWNER_EMAIL within a minute.

If you skip this, the sheet rows still appear but no emails are sent.

## 3. Deploy (or redeploy) the web app
- First time: Deploy → New deployment → gear → **Web app**. Execute as: **Me**.
  Who has access: **Anyone**. Copy the URL ending in `/exec`.
- After ANY change to the script: Deploy → Manage deployments → pencil →
  Version: **New version** → Deploy. The URL stays the same. Without this, the old code keeps running.

## 4. Give the website the URL and secret
Local: `.env` with `WEBHOOK_URL` and `WEBHOOK_SECRET`, then restart `npm run dev`.
Vercel: Settings → Environment Variables → same two → Redeploy.

## 5. What you'll see in the sheet
**Inquiries** tab: Date, Name, Email, Company, Service, Project details, Status,
Auto-reply to visitor, Owner notified, Page.
**Subscribers** tab: Date, Email, Status, Welcome email, Page, Last updated.

The email columns show `Sent` or `Failed: <reason>`, so you can see exactly what happened.
Existing tabs get the new columns added automatically on the next submission.

The sheet also gets a **Readmi** menu (reload the sheet once): "Send me a test email"
and "Emails left today".

## Unsubscribes
Welcome emails include an unsubscribe link. Clicking it sets Status to `Unsubscribed`.
You can also change Status by hand. If that person subscribes again, they're re-subscribed
and get a new welcome email.

## Troubleshooting: rows appear but no email
- Check the `Auto-reply to visitor` / `Welcome email` column for the reason.
- "You do not have permission to call MailApp.sendEmail" → do step 2, then redeploy (step 3).
- Column is blank / nothing changed → you didn't create a **New version** in step 3.
- Testing with the same address twice → the second sign-up is treated as "already subscribed"
  and no welcome email is sent (by design). Use a different address, or delete the row.
- Check spam. Mail from a brand-new script often lands there the first few times.

## Limits
- Free Gmail: about 100 emails/day; Google Workspace: about 1,500.
  One inquiry = 2 emails, one new subscriber = 1.
- Emails come from your Google address. Once you have the domain mailbox, you can move to a
  transactional service (e.g. Resend) by changing only `src/lib/forms.server.ts`.
