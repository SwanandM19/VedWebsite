import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Same orange-on-ink palette as the booking notification, built with nested
// tables and inline styles only so it survives every mail client.
const ACID = "#ff6900";
const INK = "#16181d";

function renderHtml(email: string, received: string) {
  const safe = escapeHtml(email);
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New subscriber</title></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New mailing list signup: ${safe}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${INK};border-radius:14px;overflow:hidden;">
          <tr><td style="height:5px;background-color:${ACID};font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:32px 28px 24px 28px;">
              <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${ACID};font-weight:bold;">Veloc Media &middot; New Subscriber</p>
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:bold;">Someone joined the mailing list</h1>
              <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8b9098;">Received ${escapeHtml(received)} IST</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #2a2d34;">
                <tr>
                  <td style="padding:18px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8b9098;width:90px;vertical-align:top;">Email</td>
                  <td style="padding:18px 0;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.5;vertical-align:top;">
                    <a href="mailto:${encodeURIComponent(email)}" style="color:${ACID};text-decoration:none;font-weight:bold;">${safe}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background-color:#101216;border-top:1px solid #2a2d34;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6b7078;">Sent automatically from the Veloc Media website footer signup. Reply directly to this email to reach them.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Footer mailing-list signup. Email only — unlike the booking form this does
 * not write to the Google Sheet, and it collects nothing but the address.
 */
export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email || "").trim().slice(0, 200);
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
    console.warn("[subscribe] Email skipped: set SMTP_HOST, SMTP_USER, SMTP_PASS and ADMIN_EMAIL to enable.");
    // Nothing is configured locally, so report success rather than showing the
    // visitor an error for a server-side gap they cannot act on.
    return NextResponse.json({ ok: true });
  }

  const received = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Veloc Media Website" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New subscriber — ${email}`,
      text: `VELOC MEDIA — NEW SUBSCRIBER\n\nEmail: ${email}\nReceived: ${received} IST`,
      html: renderHtml(email, received),
    });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't sign you up right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
