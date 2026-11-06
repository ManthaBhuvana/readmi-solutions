/**
 * Readmi Solutions — form backend (Google Apps Script, bound to the Google Sheet)
 *
 *  - "contact"   : logs the inquiry in the "Inquiries" tab, emails the owner,
 *                  and sends the visitor an automatic reply.
 *  - "subscribe" : logs the address in the "Subscribers" tab (no duplicates)
 *                  and sends a welcome email with a one-click unsubscribe link.
 *
 * Every email result (Sent / Failed: reason) is written into the sheet, so you
 * can always see what happened. Setup and troubleshooting: backend/SETUP.md
 */

// ====== EDIT THESE THREE LINES ======
const SECRET = 'poiuytrewqasdfghjklmnbvcxz'; // must match WEBHOOK_SECRET in the website's env
const OWNER_EMAIL = 'info@readmisolutions.com';             // where new inquiries are sent
const BRAND = 'Readmi Solutions';
// ====================================

const BRAND_COLOR = '#D01B22';

const INQUIRY_HEADERS = ['Date', 'Name', 'Email', 'Company', 'Service', 'Project details', 'Status',
  'Auto-reply to visitor', 'Owner notified', 'Page'];
const SUBSCRIBER_HEADERS = ['Date', 'Email', 'Status', 'Welcome email', 'Page', 'Last updated'];

// ---------------- web endpoints ----------------

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });
    if (data.type === 'contact') return json_(handleContact_(data));
    if (data.type === 'subscribe') return json_(handleSubscribe_(data));
    return json_({ ok: false, error: 'unknown type' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// GET: health check, or the unsubscribe link from the welcome email.
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'unsubscribe') return unsubscribePage_(p.email, p.token);
  return json_({ ok: true, service: BRAND + ' form backend' });
}

// ---------------- contact form ----------------

function handleContact_(d) {
  const name = clean_(d.name), email = clean_(d.email).toLowerCase();
  const company = clean_(d.company), service = clean_(d.service), brief = clean_(d.brief);
  const page = clean_(d.page);

  const sheet = getSheet_('Inquiries', INQUIRY_HEADERS);
  sheet.appendRow([new Date(), name, email, company, service, brief, 'New', 'Sending…', 'Sending…', page]);
  const row = sheet.getLastRow();

  // 1) Auto-reply to the visitor (sent first, and independently of the owner email)
  const reply = trySend_({
    to: email,
    replyTo: OWNER_EMAIL,
    name: BRAND,
    subject: 'We received your inquiry — ' + BRAND,
    htmlBody: layout_(
      '<p>Hi ' + esc_(name.split(' ')[0] || 'there') + ',</p>' +
      '<p>Thank you for reaching out to ' + esc_(BRAND) + '. We have received your inquiry and ' +
      'a member of our team will get back to you within one business day.</p>' +
      '<p>Here is what you sent us:</p>' +
      '<blockquote style="margin:0;padding:12px 16px;background:#f7f7f4;border-left:3px solid ' + BRAND_COLOR + '">' +
      esc_(brief).replace(/\n/g, '<br>') + '</blockquote>' +
      '<p>If you need to add anything, just reply to this email.</p>' +
      '<p>Powering Your Digital Growth. Built with a Human Touch.<br><b>The ' + esc_(BRAND) + ' team</b></p>'
    ),
  });

  // 2) Notification to you
  const notify = trySend_({
    to: OWNER_EMAIL,
    replyTo: email,
    name: BRAND + ' website',
    subject: 'New inquiry from ' + name + (company ? ' (' + company + ')' : ''),
    htmlBody:
      '<p><b>New website inquiry</b></p>' +
      '<p><b>Name:</b> ' + esc_(name) + '<br><b>Email:</b> ' + esc_(email) +
      '<br><b>Company:</b> ' + esc_(company) + '<br><b>Service:</b> ' + esc_(service) +
      (page ? '<br><b>Page:</b> ' + esc_(page) : '') + '</p>' +
      '<p><b>Project details:</b><br>' + esc_(brief).replace(/\n/g, '<br>') + '</p>' +
      '<p style="color:#888">Hit “Reply” to answer ' + esc_(name) + ' directly. ' +
      'All inquiries: <a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">open the sheet</a></p>',
  });

  sheet.getRange(row, 8, 1, 2).setValues([[reply, notify]]);
  return { ok: true, mailed: reply === 'Sent' };
}

// ---------------- newsletter ----------------

function handleSubscribe_(d) {
  const email = clean_(d.email).toLowerCase();
  const page = clean_(d.page);
  const sheet = getSheet_('Subscribers', SUBSCRIBER_HEADERS);

  const found = findSubscriber_(sheet, email);
  let row;
  if (found && found.status !== 'Unsubscribed' && found.welcome === 'Sent') {
    sheet.getRange(found.row, 6).setValue(new Date());
    return { ok: true, duplicate: true, mailed: false }; // already on the list, don't email again
  }
  if (found) {
    row = found.row; // re-subscribe, or retry a welcome email that failed earlier
    sheet.getRange(row, 3).setValue('Subscribed');
  } else {
    sheet.appendRow([new Date(), email, 'Subscribed', 'Sending…', page, new Date()]);
    row = sheet.getLastRow();
  }

  const result = trySend_({
    to: email,
    replyTo: OWNER_EMAIL,
    name: BRAND,
    subject: 'Welcome to ' + BRAND,
    htmlBody: layout_(
      '<p>Hi there,</p>' +
      '<p>Thanks for subscribing to ' + esc_(BRAND) + '. You will hear from us with practical ideas on ' +
      'websites, SEO, social media and e-mail marketing — no spam.</p>' +
      '<p>Powering Your Digital Growth. Built with a Human Touch.<br><b>The ' + esc_(BRAND) + ' team</b></p>' +
      '<p style="font-size:12px;color:#888">Don’t want these emails? ' +
      '<a href="' + unsubscribeUrl_(email) + '" style="color:#888">Unsubscribe</a> at any time.</p>'
    ),
  });

  sheet.getRange(row, 4).setValue(result);
  sheet.getRange(row, 6).setValue(new Date());
  return { ok: true, duplicate: false, mailed: result === 'Sent' };
}

function findSubscriber_(sheet, email) {
  const last = sheet.getLastRow();
  if (last < 2) return null;
  const rows = sheet.getRange(2, 2, last - 1, 3).getValues(); // [email, status, welcome]
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).toLowerCase() === email) {
      return { row: i + 2, status: String(rows[i][1]), welcome: String(rows[i][2]) };
    }
  }
  return null;
}

// ---------------- unsubscribe ----------------

function unsubscribeUrl_(email) {
  const base = ScriptApp.getService().getUrl();
  if (!base) return 'mailto:' + OWNER_EMAIL + '?subject=Unsubscribe';
  return base + '?action=unsubscribe&email=' + encodeURIComponent(email) + '&token=' + token_(email);
}

function token_(email) {
  const sig = Utilities.computeHmacSha256Signature(String(email).toLowerCase(), SECRET);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 24);
}

function unsubscribePage_(email, token) {
  email = String(email || '').toLowerCase();
  let msg = 'This unsubscribe link is not valid. Reply to any of our emails and we will remove you.';
  if (email && token === token_(email)) {
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      const sheet = getSheet_('Subscribers', SUBSCRIBER_HEADERS);
      const found = findSubscriber_(sheet, email);
      if (found) {
        sheet.getRange(found.row, 3).setValue('Unsubscribed');
        sheet.getRange(found.row, 6).setValue(new Date());
      }
    } finally {
      lock.releaseLock();
    }
    msg = esc_(email) + ' has been unsubscribed. You will not receive any more emails from us.';
  }
  return HtmlService.createHtmlOutput(layout_('<h2>' + esc_(BRAND) + '</h2><p>' + msg + '</p>'))
    .setTitle('Unsubscribe — ' + BRAND);
}

// ---------------- sheet menu & test tools ----------------

// Adds a "Readmi" menu to the spreadsheet.
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Readmi')
    .addItem('Send me a test email', 'sendTestEmail')
    .addItem('Emails left today', 'showQuota')
    .addToUi();
}

// Run this once from the Apps Script editor (select it, click ▶ Run).
// It asks Google for permission to send email and proves that sending works.
function sendTestEmail() {
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    name: BRAND,
    subject: 'Test email from your ' + BRAND + ' website backend',
    htmlBody: layout_('<p>Email sending works. Left today: ' + MailApp.getRemainingDailyQuota() + '.</p>'),
  });
  notify_('Test email sent to ' + OWNER_EMAIL + '. Check that inbox (and spam).');
}

function showQuota() {
  notify_('Emails you can still send today: ' + MailApp.getRemainingDailyQuota());
}

function notify_(text) {
  try { SpreadsheetApp.getUi().alert(text); } catch (e) { Logger.log(text); }
}

// ---------------- helpers ----------------

function trySend_(opts) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) return 'Failed: daily email limit reached';
    MailApp.sendEmail(opts);
    return 'Sent';
  } catch (err) {
    return 'Failed: ' + String(err).slice(0, 120);
  }
}

// Creates the tab if missing and keeps the header row up to date
// (existing tabs from the earlier version get the new columns added on the right).
function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const current = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
  if (current.length < headers.length || current[0] !== headers[0]) {
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    else sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// trims, caps length, and stops spreadsheet-formula injection (=, +, -, @)
function clean_(v) {
  let s = String(v == null ? '' : v).trim().slice(0, 5000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function layout_(inner) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#36383D;line-height:1.6">' +
    '<div style="height:4px;background:' + BRAND_COLOR + '"></div>' + inner + '</div>';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
